#!/usr/bin/env node

/* eslint-env node */
/* eslint no-console:0 */

const PRELUDE = `/*
This file was generated by running

  $ ${process.argv.join(' ')}

*/`;

const BOINT_SIZE_PX = 4;
const SCALE_LENGTH = 12;
const SCALE = new Array(SCALE_LENGTH).fill().map((_, i) => i + 1);

// --

const bt = n => `calc(var(--bt) * ${n})`;
const block = str =>
  [
    '{',
    str
      .split('\n')
      .map(line => (line.length === 0 ? '' : `  ${line}`))
      .join('\n'),
    '}',
  ].join('\n');

const Declaration = ({ property, value }) => `${property}: ${value};`;

const Ruleset = ({ selector, declarations }) =>
  `${selector} ${block(
    Object.keys(declarations)
      .map(property => Declaration({ property, value: declarations[property] }))
      .join('\n')
  )}`;

const AtRule = ({ query, rulesets }) =>
  `@media (${query}) ${block(rulesets.map(Ruleset).join('\n\n'))}`;

const Statement = obj => {
  switch (obj.kind) {
    case 'ruleset':
      return Ruleset(obj);
    case 'atrule':
      return AtRule({ query: obj.query, rulesets: obj.rulesets });
    default:
      throw new Error(`Unexpected statement kind ${obj.kind}`);
  }
};

const Stylesheet = statements =>
  [PRELUDE].concat(statements.map(Statement)).join('\n\n');

// --

const ruleset = (selector, declarations) => ({
  kind: 'ruleset',
  selector,
  declarations,
});

const atrule = (query, rulesets) => ({
  kind: 'atrule',
  query,
  rulesets,
});

const capitalize = str =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length)}`;
const classname = (namespace, className) =>
  namespace ? `.${namespace}${capitalize(className)}` : `.${className}`;

const rules = (i, prefix) => [
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginStart${i}`)}`, {
    'margin-left': bt(i),
  }),
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginEnd${i}`)}`, {
    'margin-right': bt(i),
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginStart${i}`)}`, {
    'margin-right': bt(i),
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginEnd${i}`)}`, {
    'margin-left': bt(i),
  }),
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginStartN${i}`)}`, {
    'margin-left': bt(-i),
  }),
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginEndN${i}`)}`, {
    'margin-right': bt(-i),
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginStartN${i}`)}`, {
    'margin-right': bt(-i),
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginEndN${i}`)}`, {
    'margin-left': bt(-i),
  }),
  ruleset(classname(prefix, `marginTop${i}`), {
    'margin-top': bt(i),
  }),
  ruleset(classname(prefix, `marginRight${i}`), {
    'margin-right': bt(i),
  }),
  ruleset(classname(prefix, `marginBottom${i}`), {
    'margin-bottom': bt(i),
  }),
  ruleset(classname(prefix, `marginLeft${i}`), {
    'margin-left': bt(i),
  }),

  ruleset(classname(prefix, `marginTopN${i}`), {
    'margin-top': bt(-i),
  }),
  ruleset(classname(prefix, `marginRightN${i}`), {
    'margin-right': bt(-i),
  }),
  ruleset(classname(prefix, `marginBottomN${i}`), {
    'margin-bottom': bt(-i),
  }),
  ruleset(classname(prefix, `marginLeftN${i}`), {
    'margin-left': bt(-i),
  }),

  ruleset(classname(prefix, `paddingY${i}`), {
    'padding-bottom': bt(i),
    'padding-top': bt(i),
  }),

  ruleset(classname(prefix, `paddingX${i}`), {
    'padding-left': bt(i),
    'padding-right': bt(i),
  }),
];

const autoRules = prefix => [
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginStartAuto`)}`, {
    'margin-left': 'auto',
  }),
  ruleset(`html:not([dir="rtl"]) ${classname(prefix, `marginEndAuto`)}`, {
    'margin-right': 'auto',
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginStartAuto`)}`, {
    'margin-right': 'auto',
  }),
  ruleset(`html[dir="rtl"] ${classname(prefix, `marginEndAuto`)}`, {
    'margin-left': 'auto',
  }),
  ruleset(classname(prefix, `marginTopAuto`), {
    'margin-top': 'auto',
  }),
  ruleset(classname(prefix, `marginRightAuto`), {
    'margin-right': 'auto',
  }),
  ruleset(classname(prefix, `marginBottomAuto`), {
    'margin-bottom': 'auto',
  }),
  ruleset(classname(prefix, `marginLeftAuto`), {
    'margin-left': 'auto',
  }),
];

console.log(
  Stylesheet([
    ruleset(':root', {
      '--bt': `${BOINT_SIZE_PX}px`,
    }),

    // Add margin/padding for boints -12 through 12
    ...SCALE.reduce((arr, i) => arr.concat(rules(i)), []),
    atrule(
      '--sm',
      SCALE.reduce((arr, i) => arr.concat(rules(i, 'sm')), [])
    ),
    atrule(
      '--md',
      SCALE.reduce((arr, i) => arr.concat(rules(i, 'md')), [])
    ),
    atrule(
      '--lg',
      SCALE.reduce((arr, i) => arr.concat(rules(i, 'lg')), [])
    ),

    // Add margin auto
    ...autoRules(),
    atrule('--sm', autoRules('sm')),
    atrule('--md', autoRules('md')),
    atrule('--lg', autoRules('lg')),
  ])
);
