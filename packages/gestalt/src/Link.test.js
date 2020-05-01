// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Link from './Link.js';

it('default', () =>
  expect(
    renderer.create(<Link href="https://example.com">Link</Link>).toJSON()
  ).toMatchSnapshot());
it('regular', () =>
  expect(
    renderer.create(<Link href="https://example.com">Link</Link>).toJSON()
  ).toMatchSnapshot());
it('inline', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" inline>
          Link
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target null', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target={null}>
          Link
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target self', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target="self">
          Link
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target blank', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target="blank">
          Link
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot());

it('with onClick', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" onClick={() => {}}>
          Link
        </Link>
      )
      .toJSON()
  ).toMatchSnapshot());
