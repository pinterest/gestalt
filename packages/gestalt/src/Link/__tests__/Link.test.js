// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link';

const snapshot = component => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

it('default', () => snapshot(<Link href="https://example.com">Link</Link>));
it('regular', () => snapshot(<Link href="https://example.com">Link</Link>));
it('inline', () =>
  snapshot(
    <Link href="https://example.com" inline>
      Link
    </Link>
  ));

it('target null', () =>
  snapshot(
    <Link href="https://example.com" target={null}>
      Link
    </Link>
  ));

it('target self', () =>
  snapshot(
    <Link href="https://example.com" target="self">
      Link
    </Link>
  ));

it('target blank', () =>
  snapshot(
    <Link href="https://example.com" target="blank">
      Link
    </Link>
  ));

it('with onClick', () =>
  snapshot(
    <Link href="https://example.com" onClick={() => {}}>
      Link
    </Link>
  ));
