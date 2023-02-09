import { Diagnostic, ts } from "ts-morph";

/**
 * This is NOT an exhaustive list. But rather a list of errors that we found
 * that continued to break our TS build even though they were suppressed.
 *
 * Feel free to add additional error codes here as you find them.
 */
export const insuppressibleErrors = new Set([
  1383, 2304, 2306, 2503, 2578, 4025, 6059, 6307,
]);

export function isDiagnosticSuppressible(
  diagnostic: Diagnostic<ts.Diagnostic>
): boolean {
  return !insuppressibleErrors.has(diagnostic.getCode());
}
