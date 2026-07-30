import { vi } from "vitest";

// ---------------------------------------------------------------------------
// Manual mock for @stellar/freighter-api v6
//
// This mock provides typed vi.fn() exports that match the real module's
// exported shape, so vi.mocked(fn) works without type errors in tests.
// ---------------------------------------------------------------------------

export const isConnected = vi.fn(() => Promise.resolve({ isConnected: false }));
export const isAllowed = vi.fn(() => Promise.resolve({ isAllowed: false }));
export const getAddress = vi.fn(() => Promise.resolve({ address: "" }));
export const getNetworkDetails = vi.fn(() =>
  Promise.resolve({ network: "", networkUrl: "", networkPassphrase: "" }),
);
export const getNetwork = vi.fn(() =>
  Promise.resolve({ network: "", networkPassphrase: "" }),
);
export const requestAccess = vi.fn(() => Promise.resolve({ address: "" }));
export const signTransaction = vi.fn(() =>
  Promise.resolve({ signedTxXdr: "signed-xdr", signerAddress: "" }),
);
export const signAuthEntry = vi.fn(() =>
  Promise.resolve({ signedAuthEntry: "signed-entry", signerAddress: "" }),
);
export const signMessage = vi.fn(() =>
  Promise.resolve({ signedMessage: "signed-blob", signerAddress: "" }),
);
export const signBlob = signMessage;
export const setAllowed = vi.fn(() => Promise.resolve({ isAllowed: false }));
export const addToken = vi.fn(() => Promise.resolve({ contractId: "" }));
export const isBrowser = false;

export const WatchWalletChanges = {
  watch: vi.fn(),
  stop: vi.fn(),
};

// Default export matches the real module's default export
const _default = {
  getAddress,
  addToken,
  signTransaction,
  signMessage,
  signAuthEntry,
  isConnected,
  getNetwork,
  getNetworkDetails,
  isAllowed,
  setAllowed,
  requestAccess,
  WatchWalletChanges,
};
export default _default;

// ─── Test helpers ─────────────────────────────────────────────────────────

export function resetFreighterMocks() {
  isConnected.mockReset();
  isConnected.mockResolvedValue({ isConnected: false });
  isAllowed.mockReset();
  isAllowed.mockResolvedValue({ isAllowed: false });
  getAddress.mockReset();
  getAddress.mockResolvedValue({ address: "" });
  getNetworkDetails.mockReset();
  getNetworkDetails.mockResolvedValue({ network: "", networkUrl: "", networkPassphrase: "" });
  requestAccess.mockReset();
  requestAccess.mockResolvedValue({ address: "" });
  signTransaction.mockReset();
  signTransaction.mockResolvedValue({ signedTxXdr: "signed-xdr", signerAddress: "" });
  signAuthEntry.mockReset();
  signAuthEntry.mockResolvedValue({ signedAuthEntry: "signed-entry", signerAddress: "" });
  signMessage.mockReset();
  signMessage.mockResolvedValue({ signedMessage: "signed-blob", signerAddress: "" });
}

export function mockFreighterConnected(
  publicKey = "GAAZI4BCE7Y5L7S25K2LJKBJHW7X2UHLW4XY5R2DZPHFBUHE5PQ7L2UQ",
  network = "TESTNET",
  networkPassphrase = "Test SDF Network ; September 2015",
) {
  isConnected.mockResolvedValue({ isConnected: true });
  getAddress.mockResolvedValue({ address: publicKey });
  getNetworkDetails.mockResolvedValue({ network, networkUrl: "", networkPassphrase });
}

export function mockFreighterInstalled() {
  isConnected.mockResolvedValue({ isConnected: true });
  getAddress.mockResolvedValue({ address: "" });
  getNetworkDetails.mockResolvedValue({ network: "", networkUrl: "", networkPassphrase: "" });
}

export function mockFreighterError(message = "Freighter error") {
  isConnected.mockResolvedValue({ isConnected: true });
  getAddress.mockRejectedValue(new Error(message));
}
