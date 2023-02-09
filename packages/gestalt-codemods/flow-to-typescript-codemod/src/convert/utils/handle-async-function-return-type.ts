import * as t from "@babel/types";
import MigrationReporter from "../../runner/migration-reporter";

export function handleAsyncReturnType<
  TNodeType extends
    | t.FunctionExpression
    | t.FunctionDeclaration
    | t.ArrowFunctionExpression
    | t.ClassMethod
>(
  node: TNodeType,
  reporter: MigrationReporter,
  filePath: string,
  loc: t.SourceLocation
) {
  const { returnType } = node;

  if (
    returnType &&
    t.isTypeAnnotation(returnType) &&
    t.isGenericTypeAnnotation(returnType.typeAnnotation) &&
    t.isIdentifier(returnType.typeAnnotation.id) &&
    !(returnType.typeAnnotation.id.name === "Promise")
  ) {
    reporter.asyncFunctionReturnType(
      filePath,
      loc,
      returnType.typeAnnotation.id.name
    );

    const typeAnnotation = t.typeAnnotation(
      t.genericTypeAnnotation(
        t.identifier("Promise"),
        t.typeParameterInstantiation([returnType.typeAnnotation])
      )
    );

    node.returnType = typeAnnotation;
  }
}
