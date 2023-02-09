import { hasJSX } from "./utils/common";
import { addImports } from "./add-imports";
import { addWatermark } from "./add-watermark";
import { transformJSX } from "./jsx";
import { transformDeclarations } from "./declarations";
import { transformExpressions } from "./expressions";
import { transformJsxSpread } from "./jsx-spread/jsx-spread";
import { transformPatterns } from "./patterns";
import { transformPrivateTypes } from "./private-types";
import { TransformerInput, Transformer } from "./transformer";
import { transformTypeAnnotations } from "./type-annotations";
import { removeFlowComments } from "./remove-flow-comments";
import { annotateNoFlow } from "./annotate-no-flow";

const standardTransformRunnerFactory = (transformer: Transformer) => {
  return (transformerInput: TransformerInput) => {
    return transformer(transformerInput);
  };
};

export const hasJsxTransformRunner: Transformer<void> = (
  transformerInput: TransformerInput
) => {
  transformerInput.state.hasJsx = hasJSX(transformerInput);
};

export const privateTypeTransformRunner: Transformer =
  standardTransformRunnerFactory(transformPrivateTypes);

export const expressionTransformRunner: Transformer =
  standardTransformRunnerFactory(transformExpressions);

export const jsxTransformRunner: Transformer =
  standardTransformRunnerFactory(transformJSX);

export const declarationsTransformRunner: Transformer = async (
  transformerInput: TransformerInput
) => {
  await transformDeclarations(transformerInput);
};

export const typeAnnotationTransformRunner: Transformer =
  standardTransformRunnerFactory(transformTypeAnnotations);

export const patternTransformRunner: Transformer =
  standardTransformRunnerFactory(transformPatterns);

export const importTransformRunner: Transformer =
  standardTransformRunnerFactory(addImports);

export const watermarkTransformRunner: Transformer =
  standardTransformRunnerFactory(addWatermark);

export const jsxSpreadTransformRunner: Transformer =
  standardTransformRunnerFactory(transformJsxSpread);

export const removeFlowCommentTransformRunner: Transformer =
  standardTransformRunnerFactory(removeFlowComments);

export const annotateNoFlowTransformRunner: Transformer =
  standardTransformRunnerFactory(annotateNoFlow);
