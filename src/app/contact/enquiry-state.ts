import type { EnquiryState } from "./actions";

// Deliberately NOT a "use server" file. A file with that directive may only
// export async functions — see the error this fixes. This value is client
// state (the starting point for useActionState), not server logic, so it
// never belonged in actions.ts in the first place.
export const initialEnquiryState: EnquiryState = { status: "idle" };