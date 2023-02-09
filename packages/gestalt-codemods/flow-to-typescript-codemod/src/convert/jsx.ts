import traverse from "@babel/traverse";
import { TransformerInput } from "./transformer";
import { getLoc } from "./utils/common";

/**
 * Scan JSX nodes, and update text that will not work in TS
 */
export function transformJSX({ file, reporter, state }: TransformerInput) {
  traverse(file, {
    // Flow/Babel are fine with having unescaped greater than ('>') symbols in JSX (less than produces a syntax error)
    // TypeScript, however, will always produce an error
    // To fix this we automatically escape the character.
    // https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKCrQgDsBneAFSQA94BeOAHgBNgANwB8AcSIoYSKHAAUwgIwAGFQEoeAegEia9JnFYcAzHG78hYiVJmyA3vmH4AvsrWbtwoA
    JSXText(path) {
      const rawValue = path.node.extra?.raw as string | undefined;
      if (rawValue && rawValue.includes(">")) {
        path.node.value = path.node.value.replace(/>/g, "{'>'}");
        reporter.unescapedGreaterThan(state.config.filePath, getLoc(path.node));
      }
    },
  });
}
