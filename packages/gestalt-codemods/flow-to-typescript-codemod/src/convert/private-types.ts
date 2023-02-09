import * as t from "@babel/types";
import traverse from "@babel/traverse";
import { replaceWith } from "./utils/common";
import { TransformerInput } from "./transformer";

/**
 * Flow commonly uses `$` to denote private type members like React$Node.
 * This syntax is hard to account for everywhere, so we convert it to `.` at the start.
 */
export function transformPrivateTypes({
  file,
  state,
  reporter,
}: TransformerInput) {
  traverse(file, {
    Identifier(path) {
      const id = path.node;
      const hasPrivateType =
        /\w\$\w/.test(id.name) && !state.config.keepPrivateTypes;
      const privateReactType = id.name.startsWith("React$");
      const privateFlowType = id.name.startsWith("$FlowFixMe");
      const isTypeAnnotation = path.parentPath.type === "GenericTypeAnnotation";
      if ((hasPrivateType || privateReactType) && isTypeAnnotation) {
        const [qualification, name] = id.name.split("$");
        replaceWith(
          path,
          t.qualifiedTypeIdentifier(
            t.identifier(name),
            t.identifier(qualification)
          ),
          state.config.filePath,
          reporter
        );
      } else if (privateFlowType && isTypeAnnotation) {
        // Using t.tsAnyKeyword() here eventually collides w/ another transformer that makes this "unknown"
        replaceWith(path, t.identifier("any"), state.config.filePath, reporter);
      }
    },
  });
}
