import { getWalletServer, } from "@/features/wallet/actions.server";
import { WalletDto } from "@/features/wallet/type";
import { Eye } from "lucide-react";

const MastercardLogo = () => (
  <svg width="48" height="28" viewBox="0 0 48 28" fill="none">
    <circle cx="17" cy="14" r="11" fill="#EB001B" />
    <circle cx="31" cy="14" r="11" fill="#F79E1B" />
    <ellipse cx="24" cy="14" rx="11" ry="11" fill="#FF5F00" />
  </svg>
);

export default async function WalletCard({ data: wallet }: { data: WalletDto }) {
  

  return (
    <div
      className="rounded-3xl shadow-xl"
      style={{
        background: "linear-gradient(120deg, #1447ff 0%, #1796ff 100%)",
        width: 420,
        height: 230,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "2.2rem 2.5rem 1.4rem",
        boxSizing: "border-box",
      }}
    >
      {/* Entête carte */}
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-white font-black text-3xl tracking-tight drop-shadow"
          style={{ letterSpacing: "-1px" }}
        >
          Flexitel Wallet
        </span>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-white/90 rounded-full p-1.5 shadow-md">
            <MastercardLogo />
          </div>
          <span className="bg-white/30 text-white px-4 py-1 text-sm rounded-full font-medium shadow">
            Débit
          </span>
        </div>
      </div>

      {/* Solde */}
      <div className="flex flex-col items-start mb-2">
        <span className="text-white text-[1.8rem] font-semibold leading-7 tracking-wide">
          {wallet.balance?.toFixed(2)} €
        </span>
        <span className="text-white/80 text-xs font-medium mt-0.5">
          Solde disponible
        </span>
      </div>

      {/* Masque numéro */}
      <div className="flex items-center gap-4">
        <span className="tracking-widest text-white text-lg font-mono">
          ************
        </span>
        <Eye className="w-5 h-5 text-white/80" />
      </div>

      {/* Bas de carte */}
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-base">
          {wallet.firstName} {wallet.lastName}
        </span>
        <span className="text-white/50 text-sm">FlexiTel Wallet</span>
      </div>
    </div>
  );
}
