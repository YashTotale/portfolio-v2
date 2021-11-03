export interface ContactData {
  name: string;
  email: string;
  message: string;
  timestamp: number;
  "g-recaptcha-response": string;
  bugs?: string;
  rating?: number | null;
}
