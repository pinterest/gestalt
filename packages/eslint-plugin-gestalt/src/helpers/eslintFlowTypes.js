// @flow strict

export type Comment = {
  end: number,
  loc: {
    end: { column: number, line: number },
    start: { column: number, line: number },
  },
  start: number,
};

export type Node = {
  end: number,
  innerComments: ?$ReadOnlyArray<Comment>,
  leadingComments: ?$ReadOnlyArray<Comment>,
  loc: {
    end: { column: number, line: number },
    start: { column: number, line: number },
  },
  start: number,
  trailingComments: ?$ReadOnlyArray<Comment>,
};

export type ESLintRuleMetaData = {
  docs: {
    /**
     * provides the short description of the rule in the [rules index](https://eslint.org/docs/rules/)
     */
    description: string,

    /**
     * specifies the heading under which the rule is listed in the [rules index](https://eslint.org/docs/rules/)
     */
    category?: string,

    /**
     * is whether the `"extends": "eslint:recommended"` property in a [configuration file](https://eslint.org/docs/user-guide/configuring#extending-configuration-files) enables the rule
     */
    recommended?: boolean,

    /**
     * specifies the URL at which the full documentation can be accessed
     */
    url?: string,

    /**
     * specifies whether rules can return suggestions (defaults to false if omitted)
     */
    suggestion?: boolean,
  },
  messages?: {
    [messageId: string]: string,
  },
  fixable?: 'code' | 'whitespace',
  // $FlowFixMe[unclear-type]
  schema?: any,
  deprecated?: boolean,
  type?: 'problem' | 'suggestion' | 'layout',
  hasSuggestions?: boolean,
};

export type ESLintRule = {
  // $FlowFixMe[unclear-type]
  create(context: any): any,
  meta?: ESLintRuleMetaData,
};
