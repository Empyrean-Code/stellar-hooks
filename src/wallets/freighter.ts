import {
  signTransaction as freighterSignTx,
} from "@stellar/freighter-api";
import {
  normalizeIsConnected,
  normalizeRequestAccess,
} from "./freighter-normalization";
import type { WalletAdapter } from "./types";

export function createFreighterAdapter(): WalletAdapter {
  return {
    id: "freighter",
    name: "Freighter",

    isInstalled(): boolean {
      return typeof window !== "undefined" && !!(window as unknown as { __FREIGHTER__?: unknown }).__FREIGHTER__;
    },

    async connect(): Promise<string> {
      const { address, error } = await normalizeRequestAccess();
      if (error) throw error;
      if (!address) throw new Error("No address returned from Freighter");
      return address;
    },

    disconnect(): void {
      // Freighter does not expose a programmatic disconnect
    },

    async signTransaction(xdr: string, opts?: { networkPassphrase?: string }): Promise<string> {
      const { signedTxXdr, error } = await freighterSignTx(xdr, {
        ...(opts?.networkPassphrase && { networkPassphrase: opts.networkPassphrase }),
      });
      if (error) throw new Error(error.message);
      return signedTxXdr;
    },
  };
}

export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const { isConnected: connected } = await normalizeIsConnected();
    return !!connected;
  } catch {
    return false;
  }
}
