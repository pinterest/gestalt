import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";
import { getComponentType } from "./get-component-type";

export function componentsWithSpreads(
  path: NodePath<t.Node>,
  propArgumentName: string,
  ignoredNodes: string[] = []
) {
  const componentsWithSpreads: t.TSType[] = [];
  const restPatterns: Record<string, string> = {};
  const ignoredAttributes: string[] = [];
  path.traverse(
    {
      JSXOpeningElement(openingElementPath) {
        if (this.restName === "") {
          return;
        }

        const { node } = openingElementPath;

        const elementState = {
          restName: this.restName,
          isSpread: false,
          omittedAttributes: [] as string[],
        };

        if (!t.isJSXIdentifier(node.name)) {
          return;
        }

        if (ignoredNodes.indexOf(node.name.name) !== -1) {
          return;
        }

        ignoredNodes.push(node.name.name);

        openingElementPath.traverse(
          {
            JSXSpreadAttribute({ node }) {
              if (
                t.isIdentifier(node.argument) &&
                node.argument.name === this.restName
              ) {
                this.isSpread = true;
              }
            },
            JSXAttribute({ node }) {
              if (t.isJSXIdentifier(node.name)) {
                this.omittedAttributes.push(node.name.name);
              }
            },
          },
          elementState
        );
        if (elementState.isSpread && t.isJSXIdentifier(node.name)) {
          const namePropsType = getComponentType(node.name.name);

          let updatedComponentProps;
          if (elementState.omittedAttributes.length > 0) {
            updatedComponentProps = t.tsTypeReference(
              t.identifier("Omit"),
              t.tsTypeParameterInstantiation([
                namePropsType,
                t.tsUnionType(
                  elementState.omittedAttributes.map((attr) =>
                    t.tsLiteralType(t.stringLiteral(attr))
                  )
                ),
              ])
            );
          } else {
            updatedComponentProps = namePropsType;
          }

          this.componentsWithSpreads.push(updatedComponentProps);
        }
      },

      VariableDeclarator({ node }) {
        const { id, init } = node;

        if (t.isIdentifier(id)) {
          ignoredNodes.push(id.name);
        }

        if (!t.isObjectPattern(id)) {
          return;
        }

        const restPattern = id.properties.find((node) => t.isRestElement(node));

        if (!restPattern || !t.isRestElement(restPattern)) {
          return;
        }

        let initName = null;
        if (
          init?.type === "MemberExpression" &&
          init.object.type === "ThisExpression" &&
          init.property.type === "Identifier" &&
          init.property.name === "props"
        ) {
          initName = "this.props";
        } else if (init?.type === "Identifier") {
          initName = init.name;
        }

        if (
          initName === this.propArgumentName &&
          t.isIdentifier(restPattern.argument)
        ) {
          this.restName = restPattern.argument.name;
        }
      },
    },
    {
      componentsWithSpreads,
      restPatterns,
      propArgumentName,
      restName: "",
      ignoredAttributes,
      ignoredNodes,
    }
  );

  return componentsWithSpreads;
}
