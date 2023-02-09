import traverse from "@babel/traverse";
import { types } from "recast";
import * as t from "@babel/types";
import { TransformerInput } from "./transformer";
import {
  addCommentsAtHeadOfNode,
  addEmptyLineInProgramPath,
} from "./utils/common";

/**
 * Adds a watermark at the top of a file
 * @param state
 * @param file
 */
export function addWatermark({ state, file }: TransformerInput) {
  traverse(file, {
    Program(path) {
      addEmptyLineInProgramPath(path);

      // Handles empty files where no node is present
      if (path.node.body.length === 0) {
        path.node.body.push(t.emptyStatement());
      }

      const rootNode: types.namedTypes.Node = path.node.body[0];

      addCommentsAtHeadOfNode(rootNode, [
        {
          leading: true,
          trailing: false,
          value: `* ${state.config.watermark} `,
          type: "CommentBlock",
        },
        {
          leading: true,
          trailing: false,
          value: `* ${state.config.watermarkMessage}`,
          type: "CommentBlock",
        },
      ]);
    },
  });
}
