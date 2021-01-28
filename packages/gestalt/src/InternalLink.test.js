// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import InternalLink from './InternalLink.js';

it('default', () =>
  expect(
    renderer
      .create(
        <InternalLink wrappedComponent="button" href="https://example.com" tabIndex={0}>
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('inline', () =>
  expect(
    renderer
      .create(
        <InternalLink wrappedComponent="button" href="https://example.com" inline tabIndex={0}>
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target null', () =>
  expect(
    renderer
      .create(
        <InternalLink
          wrappedComponent="button"
          href="https://example.com"
          target={null}
          tabIndex={0}
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target self', () =>
  expect(
    renderer
      .create(
        <InternalLink
          wrappedComponent="button"
          href="https://example.com"
          target="self"
          tabIndex={0}
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target blank', () =>
  expect(
    renderer
      .create(
        <InternalLink
          wrappedComponent="button"
          href="https://example.com"
          target="blank"
          tabIndex={0}
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with nofollow', () =>
  expect(
    renderer
      .create(
        <InternalLink
          wrappedComponent="button"
          href="https://example.com"
          rel="nofollow"
          tabIndex={0}
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with onTap', () =>
  expect(
    renderer
      .create(
        <InternalLink
          wrappedComponent="button"
          href="https://example.com"
          onClick={() => {}}
          tabIndex={0}
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());
