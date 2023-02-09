import { jsxTransformRunner, hasJsxTransformRunner } from "./transform-runners";
import { Transformer } from "./transformer";

export const noFlowTransformerChain: readonly Transformer[] = [
  hasJsxTransformRunner,
  jsxTransformRunner,
];
