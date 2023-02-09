// Testing removing unused

const error1: string = 0;

// Line above suppression
// @ts-expect-error not actually error
export const foo = () => {
  console.log(
    // Other comment
    "foo",
    // @ts-expect-error - TS2345 - Argument of type 'unknown' is not assignable to parameter of type '{ customer: string; ephemeralKey: string; } | null'.
    "bar",
    "baz"
  );

  const error2: string = 0;

  /* @ts-expect-error not actually error */
  return "bar";
};

const error1: string = 0;