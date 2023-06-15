// @flow strict
import renderer from 'react-test-renderer';
import InternalLink from './InternalLink.js';
import Pog from '../Pog.js';
import Text from '../Text.js';

it('renders IconButton', () =>
  expect(
    renderer
      .create(
        <InternalLink wrappedComponent="iconButton" href="https://example.com" tabIndex={0}>
          <Pog icon="heart" iconColor="red" />
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders TapArea', () =>
  expect(
    renderer
      .create(
        <InternalLink wrappedComponent="tapArea" href="https://example.com" tabIndex={0}>
          <Text>InternalLink</Text>
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders inline Button', () =>
  expect(
    renderer
      .create(
        <InternalLink wrappedComponent="button" href="https://example.com" tabIndex={0}>
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders full-width Button', () =>
  expect(
    renderer
      .create(
        <InternalLink fullWidth wrappedComponent="button" href="https://example.com" tabIndex={0}>
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders Button & target null', () =>
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

it('renders Button & target self', () =>
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

it('renders Button & target blank', () =>
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

it('renders Button with nofollow', () =>
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

it('renders Button with onClick', () =>
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
