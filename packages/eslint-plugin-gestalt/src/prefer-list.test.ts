import { readFileSync } from 'fs';
import path from 'path';
import { RuleTester } from 'eslint';
import { parserOptions } from './helpers/testHelpers';
import rule from './prefer-list';

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
  ].map(([input]: [any]) => ({ code: input, errors: [{ messageId: 'messageList' }] })),
});
