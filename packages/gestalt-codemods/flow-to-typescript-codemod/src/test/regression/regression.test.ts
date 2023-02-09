import fs from "fs";
import { anyTypeAnnotation } from "@babel/types";
import * as ts from "typescript";
import dedent from "dedent";
import { flowTypeAtPos } from "../../convert/flow/type-at-pos";
import { transform } from "../../convert/utils/testing";

jest.mock("../../convert/flow/type-at-pos");

const mockedFlowTypeAtPos = <jest.MockedFunction<typeof flowTypeAtPos>>(
  flowTypeAtPos
);
mockedFlowTypeAtPos.mockResolvedValue(anyTypeAnnotation());

function generateTypeScriptErrorMessages(received: ts.Diagnostic[]) {
  const errorMessages = received.map((diagnostic) => {
    const { line, character } = ts.getLineAndCharacterOfPosition(
      diagnostic.file!,
      diagnostic.start!
    );
    const errorMessage = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      "\n"
    );
    return `${diagnostic.file!.fileName} (${line + 1},${
      character + 1
    }): ${errorMessage}`;
  });
  return dedent`Received TypeScript errors:
   ${dedent(
     [...new Set(errorMessages)].reduce(
       (returnMessage, error, n) => `${returnMessage + (n + 1)}. ${error}\n\n`,
       ""
     )
   )}`;
}

// Custom error message for comparing diagnostics from TS
expect.extend({
  toHaveNoTypeScriptErrors(received: ts.Diagnostic[]) {
    if (received.length === 0) {
      return {
        message: () => "Did not receive any TypeScript errors!",
        pass: true,
      };
    } else {
      return {
        message: () => generateTypeScriptErrorMessages(received),
        pass: false,
      };
    }
  },
});

describe("Regression tests", () => {
  test("flow_typescript_differences", async () => {
    const transformedData = await getData(
      `${__dirname}/../test-files/flow_typescript_differences.js`
    );

    expect(transformedData).toMatchSnapshot();

    const transformationResult = compileTypeScriptCode(
      "flow_typescript_differences",
      replaceImports(transformedData),
      ["es2015", "dom"]
    );

    expect(transformationResult.diagnostics).toHaveNoTypeScriptErrors();
    expect(transformationResult.success).toBeTruthy();
  });
});

async function getData(filename: string) {
  const data = fs.readFileSync(filename, {
    encoding: "utf8",
    flag: "r",
  });

  const transformedData = await transform(data.toString());

  // Remove flow annotation for cleanliness
  return transformedData.replace(/\/\/ @flow.*\n+/, "");
}

// The in memory typescript compiler can't seem to find imported modules.
// This hack to replace imports with absolute paths seems to work.
// Don't apply this before the snapshot, or your snapshot will have absoulte paths
function replaceImports(data: string) {
  return data
    .replace(
      /flow-to-typescript-codemod/,
      require.resolve("../../../flow.d").replace(/.d.ts/, "")
    )
    .replace(
      /'react'/gi,
      `'${require.resolve(
        "../../../node_modules/@types/react/index.d"
      )}'`.replace(/.d.ts/, "")
    );
}

function compileTypeScriptCode(
  sourceFileName: string,
  code: string,
  libs: string[]
): {
  success: boolean;
  diagnostics: ts.Diagnostic[];
} {
  const sourceFileNameWithExtension = `${sourceFileName}.ts`;
  const options: ts.CompilerOptions = {
    ...ts.getDefaultCompilerOptions(),
    ...{
      // We set this so we can indicate an error based on whether it emitted or not
      noEmitOnError: true,
      // This makes inputting test samples much easier
      noUnusedLocals: false,
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
    },
  };

  // Real Host is based on the file system
  const fileSystemHost = ts.createCompilerHost(options, true);

  // Create a dummy TS source file based on the input code
  const dummySourceFile = ts.createSourceFile(
    sourceFileNameWithExtension,
    code,
    ts.ScriptTarget.Latest
  );

  // Proxy the functions we care about to allow reading files from memory
  const proxiedMemoryHost: ts.CompilerHost = {
    ...fileSystemHost,
    ...{
      fileExists: (filePath) =>
        filePath === sourceFileNameWithExtension ||
        fileSystemHost.fileExists(filePath),
      getSourceFile: (
        fileName,
        languageVersion,
        onError,
        shouldCreateNewSourceFile
      ) =>
        fileName === sourceFileNameWithExtension
          ? dummySourceFile
          : fileSystemHost.getSourceFile(
              fileName,
              languageVersion,
              onError,
              shouldCreateNewSourceFile
            ),
      readFile: (filePath) =>
        filePath === sourceFileNameWithExtension
          ? code
          : fileSystemHost.readFile(filePath),
      writeFile: () => {
        // Do nothing
      },
    },
  };

  // Load TypeScript Libs
  const rootNames = libs.map((lib) =>
    require.resolve(`typescript/lib/lib.${lib}.d.ts`)
  );
  const program = ts.createProgram(
    rootNames.concat([sourceFileNameWithExtension]),
    options,
    proxiedMemoryHost
  );
  const emitResult = program.emit();
  const diagnostics = ts.getPreEmitDiagnostics(program);
  return {
    success: !emitResult.emitSkipped,
    diagnostics: emitResult.diagnostics.concat(diagnostics),
  };
}
