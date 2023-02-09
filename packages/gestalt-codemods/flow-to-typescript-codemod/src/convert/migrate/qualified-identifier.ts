import * as t from "@babel/types";
import { inheritLocAndComments } from "../utils/common";

export function migrateQualifiedIdentifier(
  identifier: t.Identifier | t.QualifiedTypeIdentifier
): t.Identifier | t.TSQualifiedName {
  if (identifier.type === "Identifier") {
    return identifier;
  } else {
    const tsQualifiedName = t.tsQualifiedName(
      migrateQualifiedIdentifier(identifier.qualification),
      identifier.id
    );
    inheritLocAndComments(identifier.qualification, tsQualifiedName);
    return tsQualifiedName;
  }
}
