// flow-typed signature: 2b0527816b2a1d32ff43775789595b02
// flow-typed version: c6154227d1/@testing-library/jest-dom_v4.x.x/flow_>=v0.104.x

declare module '@testing-library/jest-dom' {
  declare type JestMatcherResult = {
    message?: string | (() => string),
    pass: boolean,
    ...
  };

  declare type Result = JestMatcherResult | Promise<JestMatcherResult>;

  declare module.exports: {|
    /**
     * @deprecated
     */
    toBeInTheDOM(container?: HTMLElement): Result,

    toBeInTheDocument(): Result,
    toBeVisible(): Result,
    toBeEmpty(): Result,
    toBeDisabled(): Result,
    toBeEnabled(): Result,
    toBeInvalid(): Result,
    toBeRequired(): Result,
    toBeValid(): Result,
    toContainElement(element: HTMLElement | null): Result,
    toContainHTML(htmlText: string): Result,
    toHaveAttribute(attr: string, value?: any): Result,
    toHaveClass(...classNames: string[]): Result,
    toHaveFocus(): Result,
    toHaveFormValues(expectedValues: { [name: string]: any, ... }): Result,
    toHaveStyle(css: string): Result,
    toHaveTextContent(
      text: string | RegExp,
      options?: { normalizeWhitespace: boolean, ... }
    ): Result,
    toHaveValue(value?: string | string[] | number): Result,
  |};
}

declare module '@testing-library/jest-dom/extend-expect' {
  declare module.exports: any;
}
