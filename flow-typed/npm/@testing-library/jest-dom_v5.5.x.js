// flow-typed signature: 5291c1af24f46ab1b593d2626cfbb310
// flow-typed version: 7ad57fc095/@testing-library/jest-dom_v5.5.x/flow_>=v0.104.x

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
    toHaveStyle(css: string | { [name: string]: any, ... }): Result,
    toHaveTextContent(
      text: string | RegExp,
      options?: {| normalizeWhitespace: boolean |}
    ): Result,
    toHaveValue(value?: string | string[] | number): Result,
    toHaveDisplayValue(value: string | string[]): Result,
    toBeChecked(): Result,
  |};
}

declare module '@testing-library/jest-dom/extend-expect' {
  declare module.exports: any;
}
