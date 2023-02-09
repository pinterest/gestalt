# Notes
## React.Node -> React.ReactElement

One issue we encountered was most codemods convert `React.Node` to `React.ReactNode` when they're a function return type. While the names are similar, they behave [differently](https://stackoverflow.com/questions/58123398/when-to-use-jsx-element-vs-reactnode-vs-reactelement?rq=1). In TypeScript, `React.ReactNode` is primarily used to type things that can be children of a React node, and it includes things like booleans or null. When we return `React.Node`, we're usually annotating a functional component that can be instantiated in JSX (`<Component />`). In TypeScript that's inferred [as React.ReactElement or JSX.Element](https://github.com/TypeScript-cheatsheets/react#function-components). This also needs to be done for the `render` method of class components as well, despite some of the [React types](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L3087) suggesting otherwise. If you leave it as `React.ReactNode` you'll receive the error `'Component' cannot be used as a JSX component`. In addition, if the function returns `null`, we have to add a `| null` to allow it. Strings and numbers will throw an error if returned in TS.

[TS Playground](https://www.TypeScriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4Aoc4AOxiSk3STgAUcwBnOAb3Ln7gcA-AC5BMKDQDmFAL6UkAD0iw4aCNQ7wAKki0BGOAF44ACgCUxgHw8+AojACuUanAA8AE2AA3K3S1uAPRevuTy5Eoq8OqaOnowAEzGZmDsHGJsEJyWRja8AnDAmClpAHQclvkF9khOLu4hVtypWRzlskGNdvzyBQ7OrtSOADbDYQrK0NEaWnC6WgDMyaYtnBlp5mLI6DCl2xgAchAezLm2BUUlreWV3dX99Z4+TattHB3Bz3e9NXWDI2NwpEpmoZnEtAAWZavdatTaIYi7fYwACiwyQICQtDgAB84ENRtZzgJLisyhVidU4A9XE9fM1yR8ugUfvwafiAXJKJQYrNMBAIMkAEIC9EoaimfTmCjkNDDFAcLjzGAAVjgSjo1A8XGRpQAwrhINQsfAqmysScoBYtoi9oi0RiTZTqqT+RBLOzTHS4IErNK7n1agMOaMKCy5DK5QqlfEAGzqxSa7UInb6w0aJ1m6kW+jWlMYO07B2Y7F4gnDZ0XYqmN0eoP1L0hH1+sNU7N-EPDVs9CM8sFwPUACyQaAA1sscnk7p6AwI3FZZ1S3MrDL7F9Vl-Ekmu2xvlUsd7u58qoYej+5lWqz0fN1p49eCkE-eNyEA)

## {\[KeyType\]: ValueType} -> Partial<Record<KeyType, ValueType>>
Object index types work pretty differently between Flow and TypeScript. Flow allows any type to be an index, while TypeScript supports only strings and numbers. One other difference I found is Flow marks all of the keys of the object as optional by default. To get this same behavior, we have to wrap the object in `Partial`.

You can read more about this in the [Airtable codemod docs](https://github.com/Airtable/TypeScript-migration-codemod#object-index-types-other-than-string-or-number), and see my tests in the [TS Playground](https://www.TypeScriptlang.org/play?#code/C4TwDgpgBAkgxgewHYBVzQLxQEQCcECuSAJtlAD44DOAjgQIa4RkDcAsAFCiRQDKAbgHM0PLNjBJBZStgBWkKew6dESKsFiqqAMQA2CAO4AuKAAVGwAJb1dAHgDeAbQDSUS0k3IREALomBwugAvgB8UFj2QUrwyDr6Bo54hCTYPuE4EoqcMWp6hom0DEyp6dgARvSk0Vp5CeWVJWL4RFWcKrEaOVQm5rhWNrYAShCIuMS2Od4ANHxC3iFhEVHZWonNKWlimdjVsQV0jMybOBWtHF2Jp40461VAA).

## Annotate empty object assignments with `Record<string, any>`

Flow allows developers to quickly and easily create empty objects that get indexed however the developer wants. 
TypeScript does not have extra inference from this, and therefore reports type errors. We add an annotation with the most common object shape to account for this.

```ts
// flow
const myVariable = {};

// TypeScript
const myVariable: Record<string, any> = {};
```

## React$Context<T> / React$Element<T> / etc.
In Flow it's common to reference internal "private" React types with a `$` instead of a `.`. In TypeScript these are denoted with `.`, and the codemod assumes types are in this format before conversion. To fix this, I added a `private-types` transform, which performs this conversion before running the other transforms.

## as const
In Flow, we sometimes declare objects that we later use as a type. For example the size of an Icon:

```ts
export const IconSizes = {
  '8': 8,
  '12': 12,
  '14': 14,
};

export type IconSize = typeof IconSizes[keyof typeof IconSizes];
```
In Flow, where IconSize uses `$Values`, each of the possible values are included. In TypeScript, the values just get typed as `number`. To fix this, we need to use TypeScript [const assertions](https://www.TypeScriptlang.org/docs/handbook/release-notes/TypeScript-3-4.html#const-assertions), which let it know that the whole object will not change and can be used as a type. I've added in some logic for automatically adding `as const` to exported objects and arrays that are not already typed.

## React ypes

Some of the React types like `React.Portal` become `React.ReactPortal` in TypeScript. We created a mapping file we can use to define some of these mappings from third-party packages. We found many of these comparing the [React type definitions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts), but there may be more we have to improve here. These types are transformed when under the React namespace, as well as in in imports.
```ts
// Imports
// Flow
import type {Fragment} from 'react';
// TS
import {ReactFragment} from 'react';


// React namespace
import * as React from 'react';
// Flow
function f(): React.Fragment {}
// TS
function f(): React.ReactFragment {};
```

## Moment types

Similar to React, we've added some mappings for the popular `moment` library types.
## Synthetic event types

Synthetic event types have a different naming convention between Flow and TypeScript. React uses its own "Synthetic" event system built on top of the normal DOM events format. In Flow, these types are declared as global types like `SyntheticMouseEvent`. In TypeScript, they're part of the React types like `React.MouseEvent`. We maintain a mapping of event names for conversion.

There are some other differences, like TypeScript does not support `SyntheticInputEvent` since it's not fully standardized. Instead they use `React.FormEvent` in the [React type declarations](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L1201). In practice, however, we've found that the `SyntheticInputEvent` was being used to type `onChange` instead of `ChangeEvent<HTMLInputElement>`. One other confusion is the difference between the TS DOM events like `MouseEvent` and the React equivalent `React.MouseEvent`, which share similar attributes can sometimes work interchangably. The main difference in usage is that the React types are generic, and can take more specific element types such as `React.MouseEvent<HTMLButtonElement>`.

[Example of onInput](https://www.TypeScriptlang.org/play?ts=4.4.2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKCqrQgDsBneACxXoBMAbJOAXjgAKJAC5ExGADoAwm3oBzJAFEAbknowAPAAkAKgFkAMgEl6YAK4wlPEOpgA+AJT97cAN5U4cIjHNR6cEiSMChQilIqKFzmSBSUAL40lHRM8KYW8AKawGaWcAzplnxuctxI8XAA9PakQA)

## Flow.Utils

In cases where we need utility types, we created a `flow.d.ts` file for this package which allows you to import the utility types like so:

```ts
import {Flow} from 'flow-to-typescript-codemod';
Flow.Diff<A, B>;
```

All of the types are imported and namespaced, and the codemod automatically adds the import when it uses utility types. The first main type supported by this is:

## React.AbstractComponent

[AbstractComponent](https://flow.org/en/docs/react/types/#toc-react-abstractcomponent) is a Flow type that helps you construct higher order components, and there is no direct TypeScript equivalent. The identical type is a `ComponentType` with the type of `ref` modified. That is a lot more verbose, so we added the `Flow.AbstractComponent` utility to keep things concise.

## export type * from './foo`

In many cases, it's ideal to keep `type` imports when TypeScript supports it. These reduce the number of `isolatedModules` errors, since Babel knows what is a type. We've added support for different kinds of imports to make them all convert cleanly.

## Global types

We've encountered some global Flow types like [`TimeoutID`](https://github.com/facebook/flow/issues/5627) that needed conversions.


## React.ElementConfig -> JSX.LibraryManagedAttributes

Flow has a utility type which gets the props from a component. [TypeScript has a similar type](https://github.com/Microsoft/TypeScript/issues/26704) called `JSX.LibraryManagedAttributes` but there's some extra conversion needed to make the type parameters work.

[TS Playground example](https://www.TypeScriptlang.org/play?ts=4.4.2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4BYAKCuADsYkpN0k4AFHMAZzgG8q4cGAE8ANowBccAEYQI4lLQqUAvlSppRKLjwAqSLvCQAPBrQAmPZOhgA6AMK5ItJPQA8HCNwB8fAXDQIWkMoAFcMaAAKME4uKU9uAEo-SkFBLlCwRmjYxOVBNWpUuCILbMSpawxbKpgAOQhzVn5iwSIYUKhaOEj-NLg3c2AANzgAem8+uDz-QsL1SjoGJhY4R3Ag13gWwRivLgB+KUVhZXnKESy4fUMEngBeOAApAGUADVsAGWBpKBQoYQAWUUKAA5khzABBGAwKA-UIMLhuG4wAA01wMMAA2gAiPbcHEAXW8ykurF0YkYcEeKLuWPwInEUHwhNIQA)

## Utility types

Flow has a lot of built in [utility types](https://flow.org/en/docs/types/utilities), which can either have simple or very verbose TypeScript equivalents.
### $Exact<T> -> T
In Flow, objects are not exact-by-default so this utility is useful for enforcing explicit properties. In TypeScript, objects are exact by default so this utility has no effect. 

### $Diff<A, B> and $Rest<A, B>

Two utility types for finding the difference between two interface types. They are similar when objects are exact by default in TypeScript, so we can convert them both to a utility type called `Flow.Diff`. The primary difference between `$Diff` and `$Rest` is that `$Rest` properties are inexact, so we wrap `Flow.diff` with `Partial` for `$Rest`.

### [$Call](https://flow.org/en/docs/types/utilities/#toc-call)

`$Call` is a Flow utility that essentially runs a function as part of the type check to use it as a type. For simple cases with one argument, this is identical to TypeScripts `ReturnType`. With 2+ arguments, it tries to infer what the function will return given a different type which isn't something that can be easily represented in TypeScript. To address this we basically have to try to shim `$Call` into `ReturnType` regardless of the parameters. [utility-types](https://github.com/piotrwitek/utility-types/blob/df2502ef504c4ba8bd9de81a45baef112b7921d0/src/utility-types.ts#L118) has a more complicated custom type, but it also doesn't support multiple parameters.

[TS Playground](https://www.TypeScriptlang.org/play?#code/KYDwDg9gTgLgBDAnmYcAkBhAhgGxwHgDEA7OUGYYgEwGc4AKAOmaygHMaAuOLYxAbQC6ASjgBeAHw8+UsXBJkQFanXoBYAFBwe7br0SbRkuAEtiAM2BQ4AJQAqm7QH5bDrXG7FgANysBuR204QO0AYwhiGngsKipxBiwAWwgAV2IYTxTEgCMrIyl6AG8EZGBuAHIAQQARavKeOira8oAaODAsRBwIGL1ktPgAX2EA920kFDhK2MrQmBMI+JtgGBSoYjtS-AngCHMeWIk-OAB6E7hinYqauuOOrp6qTJyrOEHNENPzgFEQJLAcMA6IkTGwoFgKHFzFAIIl5N0AO5wKgQUI0T47OC-GDguYABRhYE2KHwdkUyloF3ahL0fDesgSujgdnyzP45TAhPKglGQRKkwA8tkAFbxYqciBgZ65ayDXlBTEEyXE1ByZardYq-DY3EwJVErZC4USI5fODELIyj5jfmoHVYObqtYbLZk8iUSn0Vn6Bn0Vhsbgs8RSJ2a11HDGleSkORe4Pmy3+SOTEihl2TNUrZ1a+2OrNhkkkE3HM4Jl5Qa180sAcRW82IbDgUHzpB2XE05jScwWpDYK0IJigUQAargUsB8MOJPRElgpXAALJz-BRKBmNhtKfCbhOYcXQLmaAMcKReD8ADWwEQbW8Y+Agjgezgs7AjEoOJMQK9okKn2bGtIW8cHHeV3ncf9nQTPBRjAzRSwAVRodd0GwPA2gRVBQl4OA+3gGAAAtUAdVZcCbFtbUffYCNQTtiG7RYsGyCBfHQkwCNSeAsLwZC2J4eAoAGExEjKTRMVHYDVRQ3ACB2J9cIHIcYHE8c2iXMAVw-Bs2gtcti2tegAFZuGU4ARk0egcXHYy7xGbRS2+KAYSgayJNMOgsDgAADHSZU8604POAB1TDUhwOI+y8cEcBMAAvVBeM7WBCOc0So1rGA1JM-AF1kQJMGk7ZSjk-tBxHO9VIjDRzKMuB0syu9suXVd120xMoBNMyNAsgSylqlZ6okxr1OarS4CYiBAV4DrRm6qy+oyucsrUjS11GnyrGmuyfkc6BuCA8c3J4Lz1qgTygA)
### [Class](https://flow.org/en/docs/types/utilities/#toc-class)

Class represents the type of the constructor of a JavaScript `class`.

### React.ChildrenArray

TypeScript does not have as strict of a type checking of React child components as Flow did. So rather than having the `React.ChildrenArray<T>` type, in TypeScript you treat `children` as any other React prop. For converted code, this means we want to convert it to either an array of `T` or `T` itself.
### [$NonMaybeType<T>](https://flow.org/en/docs/types/utilities/#toc-nonmaybe) -> NonNullable<T>

`$NonMaybeType<T>` converts a type T to a non-maybe type. In other words, the values of `$NonMaybeType<T>` are the values of T except for null and undefined. In TypeScript, this can be expressed as `NonNullable<T>`.

### `<T>(arg: T) => {arg};` -> `<T extends unknown>(arg: T) => {arg};`
TypeScript has a [known limitation](https://github.com/Microsoft/TypeScript/issues/4922) where inside of a `.tsx` file it has a hard time determining if an arrow function has a type parameter or is surrounded by a JSX tag. If it sees the `extends` keyword, it correctly interprets that the tag is a type parameter. We add an [`extends unknown`](https://www.carlrippon.com/generic-arrow-functions/), because any type can extend from `unknown` while still being type safe.

[TS Playground example](https://www.TypeScriptlang.org/play?ts=4.4.2#code/LAKAlgtgDg9gTgFwAQCUCmBDAxsgZnGCJAcjkx2IG5RQsYA7AZzyQF4kAeAFQEYk0AHgjT0AJoyQBXegGt6MAO70AfAAoMcAOY8AXEl4BKNss5cATPyEjxSAN4BfNRs1m95o6xO3QSX2QSScPR2SM48ADShWhb21CD2NCB0THgW7Nw8Tlq6+jweJtxmWS5uZvl2Pn5oAUEhYZHOMXH2QA);

### [CallExpression](https://open-rpc.github.io/typings/interfaces/callexpression.html) `React.useRef<boolean>(false)`

In both Flow and TypeScript you can add type arguments to a function call. In a React project you often see these used for hooks like `useRef` and `useState`. The difficult part of converting these nodes was discovering that you need to use `typeArguments` on the node for Flow and `typeParameters` on the node for TypeScript. In addition, the `babel` flow parser doesn't appear to parse these nodes unless a `// @flow` is present in the file, so our tests needed to also include this. If you omit the Flow comment, recast Flow parser returns `BinaryExpression` instead of `CallExpression`.

### `window` namespace
In Flow, `window` is typed as [any](https://github.com/facebook/flow/blob/v0.111.3/lib/bom.js#L36), and `window` was being used as a work around for accessing properties on event targets. We are converting `window` by checking if the property on `window` is a known type, and providing that, otherwise it will be typed as any.
```
// Known window type
type FlowType = window.HTMLInputElement;
type TSType = HTMLInputElement;

// Unknown window type
type FlowType = window.UnknownHtmlElement;
type TSType = any;
```
## Type inference

TypeScriptify originally attempted to provide inferred types from the Flow Compiler for all function parameters that were missing types. These function parameter types are required by TypeScript when the TypeScript compiler cannot safely infer them.

```ts
// Bad - TypeScript cannot safely interpret type of `a` and throws an error
function addOne(a) {
  return a + 1;
}

// Good - TypeScript can infer parameter types safely
const onePlus = [1, 2, 3].map(function addOne(a) { return a + 1 })
```
These attempts to always add inferred types added noise, and also occasionally resulted in worse typing than if TypeScript just inferred the types. This inference behavior was changed to only apply the inferred types when required by TypeScript, i.e when functions are defined outside of Call Expressions (as parameters to other functions).
```ts
// Flow before conversion
function addOne(a) {
  return a + 1;
}

// TypeScript after conversion (inferred string type - just an example. Actual result may vary.)
function addOne(a: number) {
  return a + 1;
}

// Flow before conversion
const onePlus = [1, 2, 3].map(function addOne(a) { return a + 1 })

// TypeScript after conversion (no inference required! TypeScript understands `a` will be a number)
const onePlus = [1, 2, 3].map(function addOne(a) { return a + 1 })
```

There are however, many more cases where TypeScript can infer types but it is not guaranteed, however we assume it to work. Essentially, if a variable already has a type we assume TypeScript can infer that type. Here are some examples:

```ts
// Here b and c are typed so we assume num1 and num2 can be inferred by TypeScript
const b: Type = function (num1, num2) {

}
const c: Type = (arg1, arg2) => {}

// JSX elements usually have types they expect, we don't need to type the args here
<Element onClick={(event) => {}} />

// Like JSX call expressions that have a function defined in them should have their types inferred as well
c(() => {})

// Lastly type assertions declare a type as something and therefore we assume that type forces specific param types
const add = (((num1, num2) => num1 + num2): Type);
```


### Async function typing
Flow was more permissive about async functions than TypeScript is. In TypeScript the return type of all async functions must be Promise<TYPE>. However, in Flow this type can be just a `TYPE` return. 

In the codemod we warn and enforce the TypeScript convention. However there are ways this could also be incorrect:

```
type MyPromiseType = Promise<User>;
async function myAsyncFunction(): MyPromiseType {}
```

If you notice this in the dry run we recommend rolling back the type alias and using the type explicitly.

## Optional parameters

In Flow an optional parameter is interpreted as allowing null/undefined to be passed in as a parameter. In TS however, it merely means you can omit passing any parameter at this position. Given that narrower definition, in TS it is illegal to have a non-optional parameter occur after an optional one.

```ts
// Flow before conversion
function doStuff(a: ?number, b: string) {
  ...
}

// TypeScript equivalent
function doStuff(a: number | null | undefined, b: string) {
  ...
}
```

If there are no required parameters after the optional parameter in the Flow code, TypeScript will leave all of the parameters as optional:

```ts
// Flow before conversion
function doStuff(a: number, b: ?string, c? string, d? number) {
  ...
}

// TypeScript equivalent
function doStuff(a: number, b?: string, c?: string, d?: number) {
  ...
}
```

This conversion will also work for Flow's optional syntax:
```ts
// Flow before conversion
function doStuff(a?: number, b: string) {
  ...
}

// Resulting TypeScript
function doStuff(a: number | null | undefined, b: string) {
  ...
}
```

## Spread attributes

In Flow, React Props are open by default. This means that you can pass parameters to a React component that are not defined on the prop's type. This leads to a pattern where you can easily provide additional props to a component, and then have that component spread any unrecognized props to a different underlying component.

Unfortunately, this pattern does not work well in TypeScript at all. This can lead to a large number of errors in a codebase if the pattern of spreading unused props to an additional component is used. `--handleSpreadReactProps` attempts to automatically fix this.

```ts
// Flow before conversion
type MyProps = {
  a: number
}
function MyComponent(props: MyProps) {
  const { a, ...rest } = props;
  return <AnotherComponent num={a} {...rest} />
}

// Resulting TypeScript
type MyProps = {
  a: number
}
function MyComponent(props: MyProps & Omit<Omit<Flow.ComponentProps<typeof AnotherComponent>, 'num'>, keyof MyProps>) {
  const { a, ...rest } = props;
  return <AnotherComponent num={a} {...rest} />
}
```

## Try catch blocks

JavaScript [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch#unconditional_catch-block) blocks allow you to specify a parameter for the caught exception, which in practice can be almost anything.

```js
try {
  throw 42; // generates an exception
} catch (e) {
  // statements to handle any exceptions
}
```

In Flow, the `exception` parameter is always type `empty`, and adding a type annotation is [unsupported](https://github.com/facebook/flow/blob/e522fba2c88f7e8235e05b6a96939d56c7610b88/src/typing/errors/error_message.ml#L2317). The `empty` type is [not well documented](https://github.com/facebook/flow/issues/4090), but for errors essentially acts as `any`. Trying to access any properties, such as `e.foo` will not throw an error.

Historically, this behavior was identical in TypeScript. You were not able to provide a type annotation, and the default type was `any`. In TypeScript version 4.0, they added the ability to type catch parameters as either `any` or `unknown`, with `unknown` being more strict and requiring you to check the error's type. In TypeScript version 4.4, `unknown` [became the default type when using `strict` mode](https://devblogs.microsoft.com/TypeScript/announcing-TypeScript-4-4/#use-unknown-catch-variables). This means that TypeScript will end up generating a lot more errors than Flow did if you have `strict` enabled. 

To fix this, we decided to have the codemod automatically add `any` type annotations to each `catch` block. During conversion, this makes the types equivalent in Flow and TypeScript. It also allows you to keep `strict` mode enabled, so future code will get `unknown` as the type and be more strict.
## Void types
In Flow, `void` represents the `undefined` primitive. In TypeScript, `void` represents a type that can only have other types written to it, and `undefined` is defined seperately.
This means that for return types, `void` can be translated accurately, however for most parameters or type coercions, `undefined` is a more accurate
type than `void` in TypeScript. 

## Non-literal types
During conversion we found some cases where developers were using `String` or `Number` as a type instead of `string` or `number`. In all of the cases, this was a mistake and Flow allowed them to be used interchangably. In TypeScript these will usually cause [type errors](https://stackoverflow.com/questions/14727044/what-is-the-difference-between-types-string-and-string) or [lint errors](https://github.com/TypeScript-eslint/TypeScript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-types.md#-incorrect). The codemod will log a warning if it encounters these types, and will migrate them to literal types during conversion.

## Untyped useState
In React, it's common to set up a call to state but pass in a null default value. 

```jsx
const [state, setState] = React.useState(null);
```
In Flow, this would often get the type inferred as `empty`, which then behaves like `any`. In TypeScript it gets inferred as `null`, because a type annotation is needed to know what this will be assigned to. We've added a warning for this case so it can easily be found and annotated.

## File extensions
In many Flow projects, files are imported without the file extension. This is ideal for conversion since the extensions will be changing. In cases where the extension is included in the import, we log a warning to let you know the import will have an error. We also have a `dropImportExtensions` flag, which will drop the extension to resolve the error. Doing so does slightly change the import behavior, so double-check your imports before enabling this feature.

## Unescaped greater than

Flow and Babel will [allow you](https://flow.org/try/#0PQKgBAAgZgNg9gdzCYAoVBLAtgBzgJwBcwAlAUwEMBjYqfOLMAcn0pqYG50q4A7AZ2IAVMgA9iAXjAAeACYYAbgD4A4qwqEy+MAAolARgAMxgJTTg85UA) to have unescaped '>' symbols in your JSX text.

```tsx
const Text = <div>Greater (>1000)</div>
```

However, this will produce an unexpected token error in TypeScript. To fix this we automatically esccape the character using `{'>'}`. The less than symbol will produce an error in both parsers.
## Incorrectly typed array deconstruction

```js
function fn([a: A, b: B]) {}
```

In this case, the function is declaring what the types would be (rather than the right hand side) and therefore the codemod will try to add types. 

```js
function fn([a, b]: [A, B]) {}
```

## Declaration files

We've encountered some errors trying to convert [Flow declaration files](https://flow.org/en/docs/declarations/). Since some of the syntax between Flow and TypeScript overlaps, this can confuse Babel and produce parsing errors. In addition, some declarations like `declare export type` and `declare export function` appear to not be supported in the Babel Flow plugin. In most cases Flow declarations in our codebases were just declaring types for third party packages which have TS declarations, so converting them isn't beneficial. To address this, the codemod will ignore declaration files and provide a warning when it finds one.


## NoFlow

Flow supports a `@noflow` annotation which will prevent the compiler from type checking a specific file. When the codemod encounters `@noflow`, by default it will replace `@noflow` with `@ts-nocheck`, and change the file extension to `.ts`. These files will still be processed by the codemod to convert Flow Syntax to TS syntax. 
This behaviour is useful in migrations, but some files such as scripts and configuration files may not work correctly with a `.ts` extension. These files can be ignored, or the codemod can be run in these directories safely with the --skipNoFlow flag. 

## Untyped array reduce

Flow will try to infer the return type of `Array.prototype.reduce` when it is not explicitly typed. TypeScript will not infer the return type of `Array.prototype.reduce` when it is not explicitly typed. This can cause errors when using `Array.prototype.reduce` in TypeScript. Therefore, we have added a warning when this happens and the codemod will add a type annotation to the function.