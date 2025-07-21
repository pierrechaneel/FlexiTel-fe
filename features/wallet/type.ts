export type WalletDto = {
  id:        string;
  email:     string;
  firstName: string;
  lastName:  string;
  role:      "USER" | "ADMIN";
  balance:   number;
};