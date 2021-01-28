#!/usr/bin/env node

/* eslint-env node */

const Block = (str) =>
  [
    '{',
    str
      .split('\n')
      .map((line) => (line.length === 0 ? '' : `  ${line}`))
      .join('\n'),
    '}',
  ].join('\n');

const Declaration = ({ property, value }) => `${property}: ${value};`;

const Ruleset = ({ selector, declarations = [] }) =>
  `${selector} ${Block(
    declarations
      .reduce((arr, [property, value]) => arr.concat(Declaration({ property, value })), [])
      .join('\n'),
  )}`;

const AtRule = ({ query, rulesets }) =>
  `@media (${query}) ${Block(rulesets.map(Ruleset).join('\n\n'))}`;

const Statement = (obj) => {
  switch (obj.kind) {
    case 'ruleset':
      return Ruleset(obj);
    case 'atrule':
      return AtRule({ query: obj.query, rulesets: obj.rulesets });
    default:
      throw new Error(`Unexpected statement kind ${obj.kind}`);
  }
};

// --

module.exports = {
  stylesheet: (prelude, statements) => [prelude].concat(statements.map(Statement)).join('\n\n'),
  ruleset: (selector, declarations) => ({
    kind: 'ruleset',
    selector,
    declarations,
  }),
  atrule: (query, rulesets) => ({
    kind: 'atrule',
    query,
    rulesets,
  }),
};
