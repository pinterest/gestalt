import { NodePath } from "@babel/traverse";
import t from "@babel/types";

export interface MetaData {
  returnType?: boolean;
  path?: NodePath<t.Node>;
  isInterfaceBody?: boolean;
  isTypeParameter?: boolean;
}
