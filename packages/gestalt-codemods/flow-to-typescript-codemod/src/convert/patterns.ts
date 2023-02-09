import traverse from "@babel/traverse";
import { TransformerInput } from "./transformer";

export function transformPatterns({ file }: TransformerInput) {
  traverse(file, {
    AssignmentPattern(path) {
      // `function f(x?: T = y)` → `function f(x: T = y)`
      if (
        path.node.right &&
        path.node.left.type === "Identifier" &&
        path.node.left.optional
      ) {
        path.node.left.optional = false;
      }
    },
  });
}
