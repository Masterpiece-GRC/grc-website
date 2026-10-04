"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  contactPreferenceOptions,
  enquiryServiceOptions,
  marketingConsentLabel,
  privacyAcknowledgement,
  sectorOptions,
  timeframeOptions,
} from "@/content/contact";
import { submitEnquiry } from "@/app/contact/actions";
import { initialEnquiryState } from "@/app/contact/enquiry-state";

/*
 * The form sits on white glass, so its controls are pinned to the light side of
 * the palette rather than to the semantic tokens — the glass panel is white
 * whichever tone the surrounding section carries, and a control that inherited
 * a dark-tone `--foreground` would render light text on a white field.
 */
const control =
  "w-full rounded-lg border border-[oklch(0.178_0.018_300/16%)] bg-[oklch(1_0_0/70%)] px-4 py-3 text-sm text-ink shadow-[inset_0_1px_2px_oklch(0.178_0.018_300/4%)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 ease-[var(--ease-calm)] placeholder:text-ash-soft hover:border-violet/35 focus:border-violet/60 focus:bg-[oklch(1_0_0)] aria-[invalid=true]:border-destructive/70";

function Field({
  id,
  label,
  hint,
  required = false,
  errors,
  className,
  children,
}: {
  id: string;
  label: string;
  hint?: string | undefined;
  required?: boolean | undefined;
  errors?: string[] | undefined;
  className?: string | undefined;
  children: (props: {
    id: string;
    required: boolean;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
  }) => ReactNode;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-violet">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-ash">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs leading-relaxed text-ash">
          {hint}
        </p>
      ) : null}
      {children({
        id,
        required,
        "aria-invalid": errors?.length ? true : undefined,
        "aria-describedby": describedBy,
      })}
      {errors?.length ? (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Enquiry form.
 *
 * Submits through a Server Action, so it works without client-side JavaScript
 * and every value is validated on the server. Nothing here is a security
 * control: the `required` attributes and input types exist to help the visitor
 * get it right first time, and the server revalidates all of it.
 */
export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialEnquiryState);
  const renderedAt = useRef<HTMLInputElement>(null);

  // Set after hydration so the server-rendered HTML stays deterministic.
  useEffect(() => {
    if (renderedAt.current) renderedAt.current.value = String(Date.now());
  }, []);

  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="rounded-2xl glass p-7 md:p-10">
      <p className="text-xs text-ash">
        Fields marked <span className="text-violet">*</span> are required.
      </p>

      {/* Anti-spam honeypot. Hidden from sight and from assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={renderedAt} type="hidden" name="renderedAt" defaultValue="" />

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <Field id="fullName" label="Full name" required errors={errors.fullName}>
          {(props) => (
            <input {...props} name="fullName" type="text" autoComplete="name" className={control} />
          )}
        </Field>

        <Field id="email" label="Work email address" required errors={errors.email}>
          {(props) => (
            <input {...props} name="email" type="email" autoComplete="email" className={control} />
          )}
        </Field>

        <Field id="organisation" label="Organisation" required errors={errors.organisation}>
          {(props) => (
            <input
              {...props}
              name="organisation"
              type="text"
              autoComplete="organization"
              className={control}
            />
          )}
        </Field>

        <Field id="role" label="Job title or role" errors={errors.role}>
          {(props) => (
            <input
              {...props}
              name="role"
              type="text"
              autoComplete="organization-title"
              className={control}
            />
          )}
        </Field>

        <Field
          id="telephone"
          label="Telephone"
          hint="Only needed if you would prefer us to call."
          errors={errors.telephone}
        >
          {(props) => (
            <input {...props} name="telephone" type="tel" autoComplete="tel" className={control} />
          )}
        </Field>

        <Field id="sector" label="Sector" required errors={errors.sector}>
          {(props) => (
            <select {...props} name="sector" defaultValue="" className={control}>
              <option value="" disabled>
                Select a sector
              </option>
              {sectorOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id="service"
          label="Area you would like to discuss"
          required
          errors={errors.service}
          className="sm:col-span-2"
        >
          {(props) => (
            <select {...props} name="service" defaultValue="" className={control}>
              <option value="" disabled>
                Select an area
              </option>
              {enquiryServiceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id="contactPreference"
          label="Preferred way to be contacted"
          errors={errors.contactPreference}
        >
          {(props) => (
            <select {...props} name="contactPreference" defaultValue="" className={control}>
              <option value="">No preference</option>
              {contactPreferenceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field id="timeframe" label="Indicative timeframe" errors={errors.timeframe}>
          {(props) => (
            <select {...props} name="timeframe" defaultValue="" className={control}>
              <option value="">No fixed timeframe</option>
              {timeframeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id="message"
          label="How can we help?"
          required
          hint="The obligation, risk, audit or assurance gap you are dealing with, and any deadline you are working to."
          errors={errors.message}
          className="sm:col-span-2"
        >
          {(props) => (
            <textarea {...props} name="message" rows={6} maxLength={2000} className={control} />
          )}
        </Field>
      </div>

      <span aria-hidden="true" className="my-8 block rule-fine" />

      {/* Consent. The enquiry acknowledgement and the marketing opt-in are
          separate controls, and the marketing box is never pre-ticked. */}
      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3.5">
            <input
              id="privacyAck"
              name="privacyAck"
              type="checkbox"
              value="on"
              required
              aria-invalid={errors.privacyAck?.length ? true : undefined}
              aria-describedby={errors.privacyAck?.length ? "privacyAck-error" : undefined}
              className="mt-0.5 size-4.5 shrink-0 cursor-pointer rounded-[4px] accent-violet"
            />
            <label htmlFor="privacyAck" className="text-sm leading-relaxed text-ash">
              {privacyAcknowledgement}{" "}
              <Link
                href="/privacy-notice"
                className="font-medium text-violet underline decoration-violet/35 underline-offset-2 transition-colors duration-300 hover:decoration-violet"
              >
                Read the Privacy Notice
              </Link>
              .
              <span aria-hidden="true" className="ml-1 text-violet">
                *
              </span>
            </label>
          </div>
          {errors.privacyAck?.length ? (
            <p id="privacyAck-error" className="text-xs font-medium text-destructive">
              {errors.privacyAck[0]}
            </p>
          ) : null}
        </div>

        <div className="flex items-start gap-3.5">
          <input
            id="marketingOptIn"
            name="marketingOptIn"
            type="checkbox"
            value="on"
            className="mt-0.5 size-4.5 shrink-0 cursor-pointer rounded-[4px] accent-violet"
          />
          <label htmlFor="marketingOptIn" className="text-sm leading-relaxed text-ash">
            {marketingConsentLabel}
          </label>
        </div>
      </div>

      {/* Form-level status. aria-live so it is announced without moving focus. */}
      <div aria-live="polite" className="mt-8 empty:mt-0">
        {state.status === "error" && state.formError ? (
          <p className="rounded-lg border border-destructive/30 bg-[oklch(0.58_0.2_26/6%)] px-4 py-3 text-sm text-destructive">
            {state.formError}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-lg sheen-violet px-6 py-3.5 text-sm font-medium tracking-wide transition-[box-shadow,transform,opacity] duration-300 ease-[var(--ease-calm)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)] disabled:cursor-progress disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {pending ? "Sending…" : "Send Enquiry"}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <p className="text-xs leading-relaxed text-ash">
          We aim to acknowledge enquiries within one working day.
        </p>
      </div>
    </form>
  );
}