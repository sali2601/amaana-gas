declare module "@/supabaseUtils" {
  export function addContactMessage(messageData: Record<string, string>): Promise<unknown>;
  export function getContactMessages(): Promise<unknown>;
}
