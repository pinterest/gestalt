import * as t from "@babel/types";
import MigrationReporter from "../../runner/migration-reporter";
import {
  inheritLocAndComments,
  GlobalTypes,
  LiteralTypes,
  hasNullReturn,
} from "../utils/common";
import {
  migrateTypeParameterDeclaration,
  migrateTypeParameterInstantiation,
} from "./type-parameter";
import { migrateQualifiedIdentifier } from "./qualified-identifier";
import { migrateObjectMember } from "./object-members";
import {
  ReactTypes,
  SyntheticEvents,
  MomentTypes,
} from "../utils/type-mappings";
import { State } from "../../runner/state";
import { matchesFullyQualifiedName } from "../utils/matchers";
import { migrateFunctionParameters } from "./function-parameter";
import { MetaData } from "./metadata";

export function migrateType(
  reporter: MigrationReporter,
  state: State,
  flowType: t.FlowType,
  metaData?: MetaData
): t.TSType {
  const tsType = actuallyMigrateType(reporter, state, flowType, metaData);
  inheritLocAndComments(flowType, tsType);
  return tsType;
}

/**
 * This is the core mapping between Flow and TypeScript babel nodes
 * Given a type in Flow, map it over to its TS equivalent
 * Any unknown Flow nodes are reported in the migration reporter
 */
function actuallyMigrateType(
  reporter: MigrationReporter,
  state: State,
  flowType: t.FlowType,
  metaData?: MetaData
): t.TSType {
  switch (flowType.type) {
    case "AnyTypeAnnotation":
      return t.tsAnyKeyword();

    case "ArrayTypeAnnotation":
      return t.tsArrayType(migrateType(reporter, state, flowType.elementType));

    case "BooleanTypeAnnotation":
      return t.tsBooleanKeyword();

    case "BooleanLiteralTypeAnnotation":
      return t.tsLiteralType(t.booleanLiteral(flowType.value));

    case "NullLiteralTypeAnnotation":
      return t.tsNullKeyword();

    case "ExistsTypeAnnotation":
      // The existential type (`*`) in Flow is unsound and basically `any`. The Flow team even
      // deprecated existentials and plans to replace all usages at FB with `any`.
      reporter.usedExistentialAny(
        state.config.filePath,
        flowType.loc as t.SourceLocation
      );
      return t.tsAnyKeyword();

    case "FunctionTypeAnnotation": {
      const typeParams = flowType.typeParameters
        ? migrateTypeParameterDeclaration(
            reporter,
            state,
            flowType.typeParameters
          )
        : null;
      const params = migrateFunctionParameters(reporter, state, flowType);
      return t.tsFunctionType(
        typeParams,
        params,
        t.tsTypeAnnotation(
          migrateType(reporter, state, flowType.returnType, {
            returnType: true,
          })
        )
      );
    }

    case "GenericTypeAnnotation": {
      const id = migrateQualifiedIdentifier(flowType.id);
      const params =
        flowType.typeParameters && flowType.typeParameters.params.length > 0
          ? migrateTypeParameterInstantiation(
              reporter,
              state,
              flowType.typeParameters,
              metaData
            )
          : null;

      // `Object` → flowAnyObjectType
      // Object in Flow translates to any. The codemod is configurable to allow
      // either a loose translation to any, or a stricter semantic interpretation
      if (id.type === "Identifier" && id.name === "Object" && !params) {
        reporter.usedFlowAnyObject(
          state.config.filePath,
          id.loc as t.SourceLocation
        );
        return state.configurableTypeProvider.flowAnyObjectType;
      }

      // `Function` → flowAnyFunctionType
      // Function in Flow translates to any. The codemod is configurable to allow
      // either a loose translation to any, or a stricter semantic interpretation
      if (id.type === "Identifier" && id.name === "Function" && !params) {
        reporter.usedFlowAnyFunction(
          state.config.filePath,
          id.loc as t.SourceLocation
        );
        return state.configurableTypeProvider.flowAnyFunctionType;
      }

      // Emit a warning if someone accidentally used String instead of string (literal type)
      if (id.type === "Identifier" && id.name in LiteralTypes) {
        reporter.nonLiteralFlowType(
          state.config.filePath,
          flowType.loc as t.SourceLocation
        );
        return t.tsTypeReference(
          t.identifier(LiteralTypes[id.name as keyof typeof LiteralTypes])
        );
      }

      // `$ReadOnlyArray<T>` → `ReadonlyArray<T>`
      if (
        id.type === "Identifier" &&
        id.name === "$ReadOnlyArray" &&
        params &&
        params.params.length === 1
      ) {
        return t.tsTypeReference(t.identifier("ReadonlyArray"), params);
      }

      // `$ReadOnly<T>` → `Readonly<T>`
      if (
        id.type === "Identifier" &&
        id.name === "$ReadOnly" &&
        params &&
        params.params.length === 1
      ) {
        return t.tsTypeReference(t.identifier("Readonly"), params);
      }

      // `$Keys<T>` → `keyof T`
      if (
        id.type === "Identifier" &&
        id.name === "$Keys" &&
        params &&
        params.params.length === 1
      ) {
        const typeOperator = t.tsTypeOperator(params.params[0]);
        typeOperator.operator = "keyof";
        return typeOperator;
      }

      // `$Values<T>` → `T[keyof T]`
      if (
        id.type === "Identifier" &&
        id.name === "$Values" &&
        params &&
        params.params.length === 1
      ) {
        const typeOperator = t.tsTypeOperator(params.params[0]);
        typeOperator.operator = "keyof";
        return t.tsIndexedAccessType(params.params[0], typeOperator);
      }

      // `$Shape<T>` → `Partial<T>`
      if (
        id.type === "Identifier" &&
        id.name === "$Shape" &&
        params &&
        params.params.length === 1
      ) {
        return t.tsTypeReference(t.identifier("Partial"), params);
      }

      // `MapOf<T> → `Record<string, T>`
      if (
        id.type === "Identifier" &&
        id.name === "MapOf" &&
        params &&
        params.params.length === 1
      ) {
        return t.tsTypeReference(
          t.identifier("Record"),
          t.tsTypeParameterInstantiation([
            t.tsStringKeyword(),
            params.params[0],
          ])
        );
      }

      // `MapOfWithKeyType<S, T>` → `Record<S, T>`
      if (
        id.type === "Identifier" &&
        id.name === "MapOfWithKeyType" &&
        params &&
        params.params.length === 2
      ) {
        return t.tsTypeReference(
          t.identifier("Record"),
          t.tsTypeParameterInstantiation([params.params[0], params.params[1]])
        );
      }

      // `$Exact<T>` → `T`
      // The $Exact utility marks an object as exact (you can't add other properties)
      // This is the default behavior in TypeScript
      // https://github.com/niieani/typescript-vs-flowtype/blob/master/README.md#exactpartial-object-types
      if (
        id.type === "Identifier" &&
        id.name === "$Exact" &&
        params &&
        params.params.length === 1
      ) {
        return params.params[0];
      }

      // `$ObjMap<O, F>` → `Flow.ObjMap<F>`
      if (
        id.type === "Identifier" &&
        id.name === "$ObjMap" &&
        params &&
        params.params.length === 2
      ) {
        reporter.usedObjMap(
          state.config.filePath,
          flowType.loc as t.SourceLocation
        );
        state.usedUtils = true;
        return t.tsTypeReference(
          t.tsQualifiedName(t.identifier("Flow"), t.identifier("ObjMap")),
          params
        );
      }

      // `$Subtype<T>` → `any`
      //
      // `$Subtype` and `$Supertype` are these weird utilities from Flow which have very
      // little to do with what their names are. They type check in one subtyping direction
      // but are any on the other. So `$Subtype<T> ~> U` is `T ~> U` but `U ~> $Subtype<T>` is
      // `U ~> any` (or the other way around, can’t quite remember).
      //
      // So basically these types are `any` and we will treat them as such in the migration.
      if (
        id.type === "Identifier" &&
        id.name === "$Subtype" &&
        params &&
        params.params.length === 1
      ) {
        reporter.usedFlowSubtype(
          state.config.filePath,
          id.loc as t.SourceLocation
        );
        return t.tsAnyKeyword();
      }

      // `$PropertyType<T, K>` → `T[K]`
      if (
        id.type === "Identifier" &&
        id.name === "$PropertyType" &&
        params &&
        params.params.length === 2
      ) {
        return t.tsIndexedAccessType(params.params[0], params.params[1]);
      }

      // `$ElementType<T, K>` → `T[K]`
      if (
        id.type === "Identifier" &&
        id.name === "$ElementType" &&
        params &&
        params.params.length === 2
      ) {
        return t.tsIndexedAccessType(params.params[0], params.params[1]);
      }

      // `Class<Shape>` → `Flow.Class<Shape>`
      if (
        id.type === "Identifier" &&
        id.name === "Class" &&
        params &&
        params.params.length === 1
      ) {
        state.usedUtils = true;
        return t.tsTypeReference(
          t.tsQualifiedName(t.identifier("Flow"), t.identifier("Class")),
          params
        );
      }

      // `$Diff<A, B>` → `Flow.Diff<A, B>`
      if (
        id.type === "Identifier" &&
        id.name === "$Diff" &&
        params &&
        params.params.length === 2
      ) {
        state.usedUtils = true;
        return t.tsTypeReference(
          t.tsQualifiedName(t.identifier("Flow"), t.identifier("Diff")),
          params
        );
      }
      // `$Rest<A, B>` → `Flow.Diff<A, B>`
      // Rest is the same as diff, but properties may not be defined so we wrap it in partial
      if (
        id.type === "Identifier" &&
        id.name === "$Rest" &&
        params &&
        params.params.length === 2
      ) {
        state.usedUtils = true;
        return t.tsTypeReference(
          t.identifier("Partial"),
          t.tsTypeParameterInstantiation([
            t.tsTypeReference(
              t.tsQualifiedName(t.identifier("Flow"), t.identifier("Diff")),
              params
            ),
          ])
        );
      }

      // `$Call<A, B>` → `ReturnType<A>`
      if (
        id.type === "Identifier" &&
        id.name === "$Call" &&
        params &&
        params.params.length >= 1
      ) {
        // Remove extra type parameters
        params.params = params.params.slice(0, 1);
        return t.tsTypeReference(t.identifier("ReturnType"), params);
      }

      // `$NonMaybeType<A>` → `NonNullable<A>`
      if (
        id.type === "Identifier" &&
        id.name === "$NonMaybeType" &&
        params &&
        params.params.length === 1
      ) {
        return t.tsTypeReference(t.identifier("NonNullable"), params);
      }

      // Global Type Conversions
      // `TimeoutID` → `number` etc
      if (id.type === "Identifier" && id.name in GlobalTypes) {
        return t.tsTypeReference(
          t.identifier(GlobalTypes[id.name as keyof typeof GlobalTypes]),
          params
        );
      }

      // `SyntheticInputEvent` → `React.ChangeEvent<HTMLInputElement>`
      // InputEvent is special, because TypeScript does not support InputEvent by default
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L1309
      // In reality, the best substitute is likely just SyntheticEvent, but TS synthetic events don't return the element from `event.target`.
      // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L1161
      // In practice, we found this makes a lot of type errors, since lots of people use this type for onChange or checking `input.checked`.
      // Since there's no perfect solution, we change it to a change event to cause the least amount of errors.
      // If the event already has an element specified we keep it, otherwise we add input element as the default.
      if (id.type === "Identifier" && id.name === "SyntheticInputEvent") {
        const name = params
          ? t.tsQualifiedName(
              t.identifier("React"),
              t.identifier("ChangeEvent")
            )
          : t.tsQualifiedName(
              t.identifier("React"),
              t.identifier("ChangeEvent<HTMLInputElement>")
            );
        return t.tsTypeReference(name, params);
      }

      // `SyntheticMouseEvent` → `React.MouseEvent`
      if (id.type === "Identifier" && id.name in SyntheticEvents) {
        return t.tsTypeReference(
          t.identifier(
            SyntheticEvents[id.name as keyof typeof SyntheticEvents]
          ),
          params
        );
      }

      // `JestMockFn` → `jest.mockedFunction`
      if (id.type === "Identifier" && id.name === "JestMockFn") {
        const parent = metaData?.path?.parentPath;

        function getFqnForMemberExpression(
          expression: t.MemberExpression
        ): string {
          const fqn: Array<string> = [];
          let currentExpression = expression;

          while (currentExpression.property !== undefined) {
            fqn.push((currentExpression.property as t.Identifier).name);
            currentExpression = currentExpression.object as t.MemberExpression;
          }
          fqn.push((currentExpression as unknown as t.Identifier).name);

          return fqn.reverse().reduce((prev, curr, i) => {
            return `${prev}${i > 0 ? "." : ""}${curr}`;
          }, "");
        }

        // `(test: JestMockFn<any,any>)` → (test as JestMockFn<typeof test>)
        if (
          parent &&
          parent.node.type === "ExpressionStatement" &&
          parent.node.expression &&
          parent.node.expression.type === "TypeCastExpression" &&
          parent.node.expression.expression &&
          parent.node.expression.expression.type === "Identifier"
        ) {
          return t.tsTypeReference(
            t.identifier("jest.MockedFunction"),
            t.tsTypeParameterInstantiation([
              t.tsTypeQuery(
                t.identifier(parent.node.expression.expression.name)
              ),
            ])
          );
          // `(test.a: JestMockFn<any,any>)` → `(test.a as JestMockFn<typeof test.a>)`
        } else if (
          parent &&
          parent.node.type === "ExpressionStatement" &&
          parent.node.expression &&
          parent.node.expression.type === "TypeCastExpression" &&
          parent.node.expression.expression &&
          parent.node.expression.expression.type === "MemberExpression"
        ) {
          try {
            return t.tsTypeReference(
              t.identifier("jest.MockedFunction"),
              t.tsTypeParameterInstantiation([
                t.tsTypeQuery(
                  t.identifier(
                    getFqnForMemberExpression(parent.node.expression.expression)
                  )
                ),
              ])
            );
          } catch (_e) {
            // These are just test functions so return the default if fetching the member expression fails for whatever reason
            return t.tsTypeReference(
              t.identifier("jest.MockedFunction"),
              t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
            );
          }

          // Handle function calls following the cast `(test.a: JestMockFn<any,any>).fnCall()` → `(test.a as JestMockFn<typeof test.a>).fnCall()`
        } else if (
          parent &&
          parent.node.type === "MemberExpression" &&
          parent.node.object.type === "TypeCastExpression"
        ) {
          try {
            return t.tsTypeReference(
              t.identifier("jest.MockedFunction"),
              t.tsTypeParameterInstantiation([
                t.tsTypeQuery(
                  t.identifier(
                    getFqnForMemberExpression(
                      parent.node.object.expression as t.MemberExpression
                    )
                  )
                ),
              ])
            );
          } catch (e) {
            // These are just test functions so return the default if fetching the member expression fails for whatever reason
            return t.tsTypeReference(
              t.identifier("jest.MockedFunction"),
              t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
            );
          }
        } else {
          return t.tsTypeReference(
            t.identifier("jest.MockedFunction"),
            t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
          );
        }
      }

      // `window.SyntheticMouseEvent` → `SyntheticMouseEvent`
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "window"
      ) {
        reporter.usedWindowAsAnyType(
          state.config.filePath,
          id.loc as t.SourceLocation
        );
        return id.right.name.startsWith("HTML")
          ? t.tsTypeReference(t.identifier(id.right.name))
          : t.tsAnyKeyword();
      }

      // `React.Node` → `React.ReactElement`
      // `React.MixedElement` -> React.ReactElement
      // This is a complicated conversion, because of the limitations of functional component returns in TS
      // https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4Aoc4AOxiSk3STgAUcwBnOAb3Ln7gcA-AC5BMKDQDmFAL6UkAD0iw4aCNQ7wAKki0BGOAF44ACgCUxgHw8+AojACuUanAA8AE2AA3K3S1uAPRevuTy5Eoq8OqaOnowAEzGZmDsHGJsEJyWRja8AnDAmClpAHQclvkF9khOLu4hVtypWRzlskGNdvzyBQ7OrtSOADbDYQrK0NEaWnC6WgDMyaYtnBlp5mLI6DCl2xgAchAezLm2BUUlreWV3dX99Z4+TattHB3Bz3e9NXWDI2NwpEpmoZnEtAAWZavdatTaIYi7fYwACiwyQICQtDgAB84ENRtZzgJLisyhVidU4A9XE9fM1yR8ugUfvwafiAXJKJQYrNMBAIMkAEIC9EoaimfTmCjkNDDFAcLjzGAAVjgSjo1A8XGRpQAwrhINQsfAqmysScoBYtoi9oi0RiTZTqqT+RBLOzTHS4IErNK7n1agMOaMKCy5DK5QqlfEAGzqxSa7UInb6w0aJ1m6kW+jWlMYO07B2Y7F4gnDZ0XYqmN0eoP1L0hH1+sNU7N-EPDVs9CM8sFwPUACyQaAA1sscnk7p6AwI3FZZ1S3MrDL7F9Vl-Ekmu2xvlUsd7u58qoYej+5lWqz0fN1p49eCkE-eNyEA
      // When a function is returning React.Node in Flow, it can return a React Element, null, numbers, and strings
      // In TS, if you say a function returns React.ReactNode, it cannot be used as a <JSXElement /> due to conflicts with the JSX types.
      // The best return type appears to be React.ReactElement, and you have to declare null if it also returns null
      // So we check if we're in a function / render function return, and check for a null return in the function, before annotating.
      let isRenderMethodOrNonClassMethodReturnType =
        metaData?.returnType ?? false;

      if (metaData?.path && metaData.path.parentPath) {
        const parent = metaData.path.parentPath;
        if (
          parent.node.type === "ClassMethod" &&
          parent.node.key.type === "Identifier" &&
          parent.node.key.name !== "render" &&
          state.hasJsx
        ) {
          isRenderMethodOrNonClassMethodReturnType = false;
        }
      }
      if (
        ((matchesFullyQualifiedName("React", "Node")(id) &&
          isRenderMethodOrNonClassMethodReturnType) ||
          matchesFullyQualifiedName("React", "MixedElement")(id)) &&
        !params
      ) {
        const parentNode = metaData?.path?.parentPath?.node;
        let hasNull = false;
        if (parentNode && "body" in parentNode) {
          const parentPath = metaData?.path?.parentPath;
          const scope = metaData?.path?.scope;
          hasNull = hasNullReturn(
            parentNode.body as t.BlockStatement,
            scope,
            parentPath
          );
        }
        const reactElement = t.tsTypeReference(
          t.tsQualifiedName(t.identifier("React"), t.identifier("ReactElement"))
        );
        if (hasNull) {
          return t.tsUnionType([reactElement, t.tsNullKeyword()]);
        } else {
          return reactElement;
        }
      }

      // `React.ChildrenArray<T>` -> `Array<T> | T`
      // TypeScript is unable to do as strict of checks on React Children as flow. As a result we need to be able to
      // convert this flow type to something that TypeScript understands so we can get the less strict children
      // prop checking.
      if (
        matchesFullyQualifiedName("React", "ChildrenArray")(id) &&
        params &&
        params.params.length === 1
      ) {
        return t.tsUnionType([
          t.tsTypeReference(t.identifier("Array"), params),
          params.params[0],
        ]);
      }

      // `React.AbstractComponent` → `Flow.AbstractComponent`
      // There is no equivalent of React.AbstractComponent in TypeScript
      // and the type is fairly verbose so we need a utility type for it.
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "React" &&
        id.right.type === "Identifier" &&
        id.right.name === "AbstractComponent"
      ) {
        state.usedUtils = true;
        return t.tsTypeReference(
          t.tsQualifiedName(
            t.identifier("Flow"),
            t.identifier("AbstractComponent")
          ),
          params
        );
      }

      // React.ElementConfig<T> -> JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "React" &&
        id.right.type === "Identifier" &&
        id.right.name === "ElementConfig" &&
        params &&
        params.params.length === 1
      ) {
        const parameter = params.params[0];

        return t.tsTypeReference(
          t.tsQualifiedName(
            t.identifier("JSX"),
            t.identifier("LibraryManagedAttributes")
          ),
          t.tsTypeParameterInstantiation([
            parameter,
            t.tsTypeReference(
              t.tsQualifiedName(
                t.identifier("React"),
                t.identifier("ComponentProps")
              ),
              t.tsTypeParameterInstantiation([parameter])
            ),
          ])
        );
      }

      // React.Config<Props, DefaultProps> -> Props & DefaultProps
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "React" &&
        id.right.type === "Identifier" &&
        id.right.name === "Config" &&
        params &&
        params.params.length === 2
      ) {
        const props = params.params[0];
        const defaultProps = params.params[1];

        return t.tsIntersectionType([props, defaultProps]);
      }

      function isFlowReactElement(id: t.Identifier | t.TSQualifiedName) {
        return (
          (id.type === "TSQualifiedName" &&
            id.left.type === "Identifier" &&
            id.left.name === "React" &&
            id.right.type === "Identifier" &&
            id.right.name === "Element") ||
          (id.type === "Identifier" && id.name === "React$Element")
        );
      }

      // `React.Element<T>` → `React.ReactElement<React.ComponentProps<T>>`
      if (isFlowReactElement(id) && params && params.params.length === 1) {
        const firstParam = params.params[0];
        // @ts-expect-error typeName only from recast
        const { typeName } = firstParam;
        if (
          firstParam.type === "TSAnyKeyword" ||
          (firstParam.type === "TSTypeReference" &&
            typeName.type === "TSQualifiedName" &&
            typeName.left.type === "Identifier" &&
            typeName.left.name === "Flow" &&
            typeName.right.type === "Identifier" &&
            typeName.right.name === "TSAnyKeyword")
        ) {
          return t.tsTypeReference(
            t.tsQualifiedName(
              t.identifier("React"),
              t.identifier("ReactElement")
            ),
            params
          );
        } else {
          return t.tsTypeReference(
            t.tsQualifiedName(
              t.identifier("React"),
              t.identifier("ReactElement")
            ),
            t.tsTypeParameterInstantiation([
              t.tsTypeReference(
                t.tsQualifiedName(
                  t.identifier("React"),
                  t.identifier("ComponentProps")
                ),
                params
              ),
            ])
          );
        }
      }

      // `React.Portal/Children/Etc<T>` → `React.ReactPortal/ReactChildren/Etc`
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "React" &&
        id.right.type === "Identifier" &&
        id.right.name in ReactTypes
      ) {
        return t.tsTypeReference(
          t.tsQualifiedName(
            t.identifier("React"),
            t.identifier(ReactTypes[id.right.name as keyof typeof ReactTypes])
          ),
          params
        );
      }

      // `moment` → `moment.Moment`
      if (id.type === "Identifier" && id.name === "moment") {
        return t.tsTypeReference(
          t.tsQualifiedName(t.identifier("moment"), t.identifier("Moment")),
          params
        );
      }

      // `moment.MomentDuration` → `moment.Duration`
      if (
        id.type === "TSQualifiedName" &&
        id.left.type === "Identifier" &&
        id.left.name === "moment" &&
        id.right.type === "Identifier" &&
        id.right.name in MomentTypes
      ) {
        return t.tsTypeReference(
          t.tsQualifiedName(
            t.identifier("moment"),
            t.identifier(MomentTypes[id.right.name as keyof typeof MomentTypes])
          ),
          params
        );
      }

      return t.tsTypeReference(id, params);
    }

    case "InterfaceTypeAnnotation":
      throw new Error(`Unsupported AST node: ${JSON.stringify(flowType.type)}`);

    case "IntersectionTypeAnnotation":
      return t.tsIntersectionType(
        flowType.types.map((flowMemberType) => {
          const tsMemberType = migrateType(reporter, state, flowMemberType);

          // Function types have weird specificities in intersections/unions. Wrap them in
          // parentheses to preserve the AST specificity.
          return tsMemberType.type === "TSFunctionType"
            ? t.tsParenthesizedType(tsMemberType)
            : tsMemberType;
        })
      );

    case "MixedTypeAnnotation":
      return t.tsUnknownKeyword();

    case "EmptyTypeAnnotation":
      return t.tsNeverKeyword();

    case "NullableTypeAnnotation": {
      return t.tsUnionType([
        migrateType(reporter, state, flowType.typeAnnotation),
        t.tsNullKeyword(),
        t.tsUndefinedKeyword(),
      ]);
    }

    case "NumberLiteralTypeAnnotation":
      return t.tsLiteralType(t.numericLiteral(flowType.value));

    case "NumberTypeAnnotation":
      return t.tsNumberKeyword();

    case "ObjectTypeAnnotation": {
      // We ignore `exact`/`inexact` for Flow object types since that just straight up doesn’t
      // matter in TypeScript.

      // Combine all the members into one array...
      const flowMembers = [
        ...flowType.properties,
        ...(flowType.indexers || []),
        ...(flowType.callProperties || []),
        ...(flowType.internalSlots || []),
      ];

      // class A<P = {}> {} -> class A<P = any> {}
      if (metaData?.isTypeParameter) {
        return t.tsAnyKeyword();
      }

      // function f(): {} {} -> function f(): Record<string, any> {}
      if (flowMembers.length === 0 && !metaData?.isInterfaceBody) {
        return t.tsTypeReference(
          t.identifier("Record"),
          t.tsTypeParameterInstantiation([t.tsAnyKeyword(), t.tsAnyKeyword()])
        );
      }

      // Sort the members by their position in source code...
      flowMembers.sort((a, b) => a.loc!.start.line - b.loc!.start.line);

      // We need to split Flow object type spreads into intersection objects.
      const intersectionTypes: Array<
        | { kind: "literal"; members: Array<t.TSTypeElement> }
        | { kind: "reference"; type: t.TSType }
      > = [];

      for (const flowMember of flowMembers) {
        if (flowMember.type === "ObjectTypeSpreadProperty") {
          // Recast attaches comments to the `loc`. We don’t want to miss comments
          // attached to a spread so wrap with a parenthesized type and attach the spread
          // loc. Prettier should remove unnesecary parentheses.
          const tsArgument = t.tsParenthesizedType(
            migrateType(reporter, state, flowMember.argument)
          );
          inheritLocAndComments(flowMember, tsArgument);
          intersectionTypes.push({ kind: "reference", type: tsArgument });
        } else {
          // Push a migrated member into the last literal object in our intersection types
          // array. If the last type is not an intersection, then add one.
          let members: Array<t.TSTypeElement>;
          const lastIntersectionType =
            intersectionTypes[intersectionTypes.length - 1];
          if (lastIntersectionType && lastIntersectionType.kind === "literal") {
            ({ members } = lastIntersectionType);
          } else {
            members = [];
            const nextIntersectionType = { kind: "literal" as const, members };
            intersectionTypes.push(nextIntersectionType);
          }
          members.push(migrateObjectMember(reporter, state, flowMember));
        }
      }

      if (intersectionTypes.length === 0) {
        return t.tsTypeLiteral([]);
      }

      const types = intersectionTypes.map((intersectionType) => {
        if (intersectionType.kind === "literal") {
          // TypeScript only supports `string` or `number` for `T` in `{[x: T]: U}`.
          // TypeScript also provides `Record<K, V>` as a utility type for arbitrary key
          // types. Convert all objects of that form to `Record`.
          if (intersectionType.members.length === 1) {
            const onlyMember = intersectionType.members[0];
            if (onlyMember.type === "TSIndexSignature") {
              const indexType = onlyMember.parameters[0]
                .typeAnnotation! as t.TSTypeAnnotation;
              if (
                indexType.typeAnnotation.type !== "TSStringKeyword" &&
                indexType.typeAnnotation.type !== "TSNumberKeyword"
              ) {
                const recordType: t.TSType[] = [
                  t.tsTypeReference(
                    t.identifier("Record"),
                    t.tsTypeParameterInstantiation([
                      indexType.typeAnnotation,
                      onlyMember.typeAnnotation!.typeAnnotation,
                    ])
                  ),
                ];
                return t.tsTypeReference(
                  t.identifier("Partial"),
                  t.tsTypeParameterInstantiation(recordType)
                );
              }
            }
          }

          return t.tsTypeLiteral(intersectionType.members);
        } else {
          return intersectionType.type;
        }
      });

      if (types.length === 1) {
        return types[0];
      } else {
        return t.tsIntersectionType(types);
      }
    }

    case "StringLiteralTypeAnnotation":
      return t.tsLiteralType(t.stringLiteral(flowType.value));

    case "StringTypeAnnotation":
      return t.tsStringKeyword();

    case "SymbolTypeAnnotation":
      return t.tsSymbolKeyword();

    case "ThisTypeAnnotation":
      return t.tsThisType();

    case "TupleTypeAnnotation": {
      return t.tsTupleType(
        flowType.types.map((elementType) => {
          return migrateType(reporter, state, elementType);
        })
      );
    }

    case "TypeofTypeAnnotation": {
      const tsType = migrateType(reporter, state, flowType.argument);

      if (tsType.type !== "TSTypeReference")
        throw new Error(`Unexpected AST node: ${JSON.stringify(tsType.type)}`);
      if (tsType.typeParameters)
        throw new Error("Unexpected type parameters on `typeof` argument.");

      return t.tsTypeQuery(tsType.typeName);
    }

    case "UnionTypeAnnotation": {
      let anyMemberIndex: number | null = null;

      const tsUnionType = t.tsUnionType(
        flowType.types.map((flowMemberType, i) => {
          const tsMemberType = migrateType(reporter, state, flowMemberType);

          // If one of the union members is `any` then flatten out the union to just that.
          // This happens fairly frequently for types coming from `flowTypeAtPos()`.
          if (anyMemberIndex !== null && tsMemberType.type === "TSAnyKeyword") {
            anyMemberIndex = i;
          }

          // Function types have weird specificities in intersections/unions. Wrap them in
          // parentheses to preserve the AST specificity.
          return tsMemberType.type === "TSFunctionType"
            ? t.tsParenthesizedType(tsMemberType)
            : tsMemberType;
        })
      );

      return anyMemberIndex !== null
        ? tsUnionType.types[anyMemberIndex]
        : tsUnionType;
    }

    case "VoidTypeAnnotation":
      if (metaData?.returnType) {
        return t.tsVoidKeyword();
      } else if (
        metaData?.path?.findParent(
          (n) =>
            t.isGenericTypeAnnotation(n) &&
            t.isIdentifier(n.id) &&
            n.id.name === "Promise"
        )
      ) {
        return t.tsVoidKeyword();
      }

      return t.tsUndefinedKeyword();

    default: {
      const never: { type: string } = flowType;
      reporter.unhandledFlowInputNode(
        state.config.filePath,
        flowType.loc as t.SourceLocation,
        (flowType as unknown as { name: string }).name ?? "undefined",
        JSON.stringify(never.type)
      );
      return t.tsUnknownKeyword();
    }
  }
}
