import { ConnectWallet } from "@thirdweb-dev/react";

export default function WalletConnect() {
  return (
    <div className="fixed top-4 right-4">
      <ConnectWallet theme="dark" />
    </div>
  );
}
