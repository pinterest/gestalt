// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import WrapperLink from './WrapperLink.js';

it('default', () =>
  expect(
    renderer
      .create(<WrapperLink href="https://example.com">WrapperLink</WrapperLink>)
      .toJSON()
  ).toMatchSnapshot());

it('inline', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" inline>
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target null', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" target={null}>
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target self', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" target="self">
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());

it('target blank', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" target="blank">
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());

it('with nofollow', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" rel="nofollow">
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());

it('with onTap', () =>
  expect(
    renderer
      .create(
        <WrapperLink href="https://example.com" onClick={() => {}}>
          WrapperLink
        </WrapperLink>
      )
      .toJSON()
  ).toMatchSnapshot());
