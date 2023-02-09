import { SourceFile } from "ts-morph";

export function getImportNamed(sourceFile: SourceFile, name: string) {
  return sourceFile.getImportDeclaration((declaration) => {
    const defaultImport = declaration.getDefaultImport();

    if (defaultImport?.compilerNode.escapedText === name) {
      return true;
    }
    return declaration.getNamedImports().some((theImport) => {
      return theImport.getName() === name;
    });
  });
}
