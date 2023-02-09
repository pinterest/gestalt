import { Diagnostic, DiagnosticMessageChain } from "ts-morph";

function isDiagnosticMessageChain(
  diagnostic: Diagnostic | DiagnosticMessageChain
): diagnostic is DiagnosticMessageChain {
  return "getNext" in diagnostic;
}

export const buildDiagnosticFilter = (targetedErrorMessage: string) =>
  function diagnosticFilter(
    diagnostic: Diagnostic | DiagnosticMessageChain
  ): boolean {
    const messageText = diagnostic.getMessageText();

    if (typeof messageText !== "string") {
      return diagnosticFilter(messageText);
    }

    if (messageText.includes(targetedErrorMessage)) {
      return true;
    }

    if (isDiagnosticMessageChain(diagnostic)) {
      const nextDiagnostic = diagnostic.getNext();
      if (!nextDiagnostic) {
        return false;
      }
      if (
        nextDiagnostic.some((diagnostic) => {
          return diagnosticFilter(diagnostic);
        })
      ) {
        return true;
      }
    }

    return false;
  };
