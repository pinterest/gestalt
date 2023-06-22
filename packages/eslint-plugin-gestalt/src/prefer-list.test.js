// @flow strict
import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers.js';
import rule from './prefer-list.js';

const ruleTester = new RuleTester({ parserOptions });

const validCode = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-list/valid/valid.js'),
  'utf-8',
);

const noGestaltListOl = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-list/invalid/no-gestalt-list-ol.js'),
  'utf-8',
);

const noGestaltListUl = readFileSync(
  path.resolve(__dirname, './__fixtures__/prefer-list/invalid/no-gestalt-list-ul.js'),
  'utf-8',
);

const messageList = `Use List from Gestalt, <List><List.Item text=""/></List>\n`;

ruleTester.run('prefer-list', rule, {
  valid: [{ code: validCode }],
  invalid: [
    [noGestaltListOl, messageList],
    [noGestaltListUl, messageList],
  ].map(([input]) => ({ code: input, errors: [{ messageId: 'messageList' }] })),
});
