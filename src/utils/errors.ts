/**
 * @file errors.ts
 * @description Standardized error structures for all stellar-hooks.
 * @package stellar-hooks
 * @license MIT
 */

/**
 * Standardized error class thrown or returned by all hooks in the library.
 * Replaces raw generic Error objects to provide predictable shape: { message, code, cause, context }
 */
export class StellarHookError extends Error {
  public code?: string;
  public context?: Record<string, unknown>;

  constructor(
    message: string,
    options?: { code?: string; cause?: unknown; context?: Record<string, unknown> }
  ) {
    // Pass message and cause to the native Error constructor (cause is supported in modern JS)
    super(message, options?.cause ? { cause: options.cause } : undefined);
    
    this.name = 'StellarHookError';
    this.code = options?.code;
    this.context = options?.context;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, StellarHookError);
    }
  }

  /**
   * Helper to wrap unknown caught errors into a StellarHookError
   */
  static from(err: unknown, fallbackMessage = "An unknown error occurred", additionalContext?: Record<string, unknown>): StellarHookError {
    if (err instanceof StellarHookError) {
      if (additionalContext) {
        err.context = { ...err.context, ...additionalContext };
      }
      return err;
    }

    const message = err instanceof Error ? err.message : typeof err === 'string' ? err : fallbackMessage;
    const code = err instanceof Error && 'code' in err ? String((err as any).code) : undefined;
    
    return new StellarHookError(message, {
      cause: err,
      code,
      context: additionalContext,
    });
  }
}
