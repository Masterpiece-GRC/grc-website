import { createHash } from "node:crypto";

/**
 * Anti-spam controls for the enquiry form (a blueprint security requirement).
 *
 * The limiter is intentionally simple and in-process: it holds a hashed client
 * identifier only, never a raw IP address, and entries expire. On a
 * multi-instance deployment each instance keeps its own window, so this is a
 * deterrent against casual automated submission rather than a distributed rate
 * limiter — which is noted in the launch checklist.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Hashed so no raw IP address is retained in memory. */
export function clientKey(forwardedFor: string | null, realIp: string | null): string {
  const raw = (forwardedFor?.split(",")[0] ?? realIp ?? "unknown").trim();
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  // Opportunistic sweep; the map only ever holds recent submitters.
  for (const [entryKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(entryKey);
  }

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
