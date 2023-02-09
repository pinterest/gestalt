import { Diagnostic, DiagnosticMessageChain } from "ts-morph";

/**
 * Detect chains of errors, vs a single error
 */
function isDiagnosticMessageChain(
  message: string | DiagnosticMessageChain
): message is DiagnosticMessageChain {
  return typeof message !== "string";
}

/**
 * Check if TS error is actually a chain of multiple errors, and return the
 * main error message.
 */
function getDiagnosticMessage(diagnostic: Diagnostic): string {
  const messageText = diagnostic.getMessageText();
  if (isDiagnosticMessageChain(messageText)) {
    return messageText.getMessageText();
  }

  return messageText;
}

/**
 * Format a TS error diagnostic as a formatted description
 */
export function diagnosticToDescription(diagnostic: Diagnostic): string {
  const messageText = getDiagnosticMessage(diagnostic);
  return `TS${diagnostic.getCode()} - ${messageText}`;
}
