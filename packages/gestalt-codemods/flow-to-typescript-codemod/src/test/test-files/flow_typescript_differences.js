// @flow
// Examples taken from https://github.com/niieani/typescript-vs-flowtype

// bounded polymorphism
function fooGood<T: {x: number}>(obj: T): T {
  console.log(Math.abs(obj.x));
  return obj;
}

// Maybe and nullable
let a: ?string;

// Optional params
function fnOptional(x?: number) {}

// Casting
(1 + 1: number);

// Exact/partial types
type ExactUser = {|name: string, age: number|};
type User = {name: string, age: number};
type OptionalUser = $Shape<User>;

// Mixed
function stringifyNum(num: number) {
  // Do stuff
}

function stringify(value: mixed) {
  if (typeof value === 'string') {
    return '' + value; // Works!
  }
  if (typeof value === 'number') {
    return stringifyNum(value); // Works!
  }
  return '';
}

// Class types
class Test {}
type TestType = typeof Test;

const instance = new Test();
type TestTypeFromInstance = Class<typeof instance>;

// Keys
var props = {
  foo: 1,
  bar: 'two',
  baz: 'three',
};

function fnUnion(x: number | void) {}

// Type inference
function addOne(a) {
  return a + 1;
}
const addOneArrow = (a) => a + 1;

const onePlus = [1, 2, 3].map(function addOne(a) {
  return a + 1;
});

const onePlusArrow = [1, 2, 3].map((a) => a + 1);

// Lookup types
type A = {
  thing: string,
};

// when the property is a string constant use $PropertyType (i.e. you know it when typing)
type lookedUpThing = $PropertyType<A, 'thing'>;

// when you want the property to be dynamic use $ElementType (since Flow 0.49)
// Fix me
// function getProperty<T : Object, Key : string>(obj: T, key: Key): $ElementType<T, Key> {
//     return obj[key];
// }+

// Type narrowing
// Fix me
// function isNil(value: mixed): boolean %checks {
//   return value == null;
// }

// const thing = null;

// if (!isNil(thing)) {
//   const another = thing.something;
// }

// Call
type Fn1 = <T>(T) => T;
type E = $Call<Fn1, number>;

declare var e: E; // E is number
(42: E); // OK

// Mapped types
type InputType = {hello: string};

type MappedType = $ObjMap<InputType, () => number>;

type FormFieldDef<T> = {|
  label: string,
  description?: string,
  default: T | (() => T),
|};

type ExtractShape = <T>(T) => FormFieldDef<T>;

type FormFields<T> = $ObjMap<T, ExtractShape>;

// // Overloading
// Fix me
// declare function add(x: string, y: string): string;
// declare function add(x: number, y: number): number;

declare class Adder {
  add(x: string, y: string): string;
  add(x: number, y: number): number;
}

// Readonly
type B = {
  +b: string,
};

let b: B = {b: 'something'};

// Difference
type C = $Diff<{a: string, b: number}, {a: string}>;

// Rest
type Props = {name: string, age: number};

const propsRest: Props = {name: 'Jon', age: 42};
const {age, ...otherProps} = propsRest;
(otherProps: $Rest<Props, {|age: number|}>);

// Same
type F = {
  (): string,
};
const f: F = () => 'hello';
const hello: string = f();
