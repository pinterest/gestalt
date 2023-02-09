import { Diagnostic } from "ts-morph";

export enum CommentType {
  Standard = "Standard",
  Jsx = "Jsx",
}

export interface CommentToMake {
  position: number;
  commentType: CommentType;
  diagnostics: Array<Diagnostic>;
}
