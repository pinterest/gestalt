import * as t from "@babel/types";
import traverse, { VisitNodeFunction } from "@babel/traverse";
import { TransformerInput } from "../transformer";
import { componentsWithSpreads } from "./components-with-spreads";
import { getLoc } from "../utils/common";

const classExtendsReactComponent = ({
  superClass,
  superTypeParameters,
}: t.ClassDeclaration) => {
  return (
    t.isMemberExpression(superClass) &&
    t.isIdentifier(superClass.object) &&
    superClass.object.name === "React" &&
    t.isIdentifier(superClass.property) &&
    superClass.property.name === "Component" &&
    t.isTSTypeParameterInstantiation(superTypeParameters)
  );
};

/**
 * Create a new intersection type between the defined props and the underlying spread component
 */
function getNewPropsType(propParam: t.TSType, componentSpreads: t.TSType[]) {
  const allPropTypes = t.tsIntersectionType(componentSpreads);

  const myKeyOfOperator = t.tsTypeOperator(propParam);
  myKeyOfOperator.operator = "keyof";

  const omittedFromProps = t.tsTypeReference(
    t.identifier("Omit"),
    t.tsTypeParameterInstantiation([allPropTypes, myKeyOfOperator])
  );

  return t.tsIntersectionType([propParam, omittedFromProps]);
}

/**
 * Navigate a functional component to detect spreads
 */
const functionalVisitor: VisitNodeFunction<
  TransformerInput,
  t.FunctionDeclaration | t.ArrowFunctionExpression
> = function (path) {
  const { node } = path;

  if (node.params.length === 0) {
    return;
  }

  const [propsParam] = node.params;

  if (!t.isIdentifier(propsParam)) {
    return;
  }

  if (!t.isTSTypeAnnotation(propsParam.typeAnnotation)) {
    return;
  }

  const localComponentsWithSpreads = componentsWithSpreads(
    path,
    propsParam.name
  );

  if (localComponentsWithSpreads.length === 0) {
    return;
  }

  this.state.usedUtils = true;
  this.reporter.usedJSXSpread(this.state.config.filePath, getLoc(node));

  propsParam.typeAnnotation.typeAnnotation = getNewPropsType(
    propsParam.typeAnnotation.typeAnnotation,
    localComponentsWithSpreads
  );
};

/**
 * In Flow, objects are inexact by default including React component props.
 * This means that any defined props are type-checked, but if you add a prop that isn't defined
 * Flow does no checks and lets you use it wrong.  This causes an error in TypeScript which strictly checks props.
 * In practice, we found that a lot of components spread props onto their HTML component, like a div.
 * In those cases, it was common for teams to add props like className and have it spread through without any
 * Flow checking. This transform finds cases where props are passed through, and adds them to the component
 * automatically so they are strongly typed in TS.
 */
export function transformJsxSpread(transformerInput: TransformerInput) {
  const { state, file } = transformerInput;
  if (!state.config.convertJSXSpreads) {
    return;
  }

  traverse(
    file,
    {
      ClassDeclaration: {
        enter(path) {
          const { node } = path;

          if (!classExtendsReactComponent(node)) {
            return;
          }

          const componentState = {
            componentsWithSpreads: [] as Array<t.TSType>,
          };

          // Look for functions which have React Component Spreads in them...
          path.traverse(
            {
              ClassMethod(path) {
                this.componentsWithSpreads.push(
                  ...componentsWithSpreads(path, "this.props")
                );
              },
            },
            componentState
          );

          if (componentState.componentsWithSpreads.length === 0) {
            return;
          }

          if (!node.superTypeParameters) {
            return;
          }
          const [propParam] = node.superTypeParameters.params;
          if (!propParam) {
            return;
          }
          if (!t.isTSTypeReference(propParam)) {
            return;
          }

          this.state.usedUtils = true;
          this.reporter.usedJSXSpread(this.state.config.filePath, getLoc(node));

          node.superTypeParameters.params[0] = getNewPropsType(
            propParam,
            componentState.componentsWithSpreads
          );
        },
      },
      FunctionDeclaration: functionalVisitor,
      ArrowFunctionExpression: functionalVisitor,
    },
    undefined,
    transformerInput
  );
}
