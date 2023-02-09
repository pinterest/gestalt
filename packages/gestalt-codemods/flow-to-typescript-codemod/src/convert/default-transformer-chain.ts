import {
  declarationsTransformRunner,
  expressionTransformRunner,
  jsxTransformRunner,
  hasJsxTransformRunner,
  importTransformRunner,
  jsxSpreadTransformRunner,
  patternTransformRunner,
  privateTypeTransformRunner,
  typeAnnotationTransformRunner,
  removeFlowCommentTransformRunner,
} from "./transform-runners";
import { Transformer } from "./transformer";

/**
 * Default chain of babel transforms to run. Order will be preserved.
 */
export const defaultTransformerChain: readonly Transformer[] = [
  hasJsxTransformRunner,
  jsxTransformRunner,
  privateTypeTransformRunner,
  expressionTransformRunner,
  declarationsTransformRunner,
  typeAnnotationTransformRunner,
  patternTransformRunner,
  jsxSpreadTransformRunner,
  importTransformRunner,
  removeFlowCommentTransformRunner,
];
