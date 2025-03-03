import renderer from 'react-test-renderer';
import InternalLink from './InternalLink';
import Pog from '../Pog';
import Text from '../Text';

it('renders IconButton', () =>
  expect(
    renderer
      .create(
        <InternalLink href="https://example.com" tabIndex={0} wrappedComponent="iconButton">
          <Pog icon="heart" iconColor="red" />
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders TapArea', () =>
  expect(
    renderer
      .create(
        <InternalLink href="https://example.com" tabIndex={0} wrappedComponent="tapArea">
          <Text>InternalLink</Text>
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders inline Button', () =>
  expect(
    renderer
      .create(
        <InternalLink href="https://example.com" tabIndex={0} wrappedComponent="button">
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders full-width Button', () =>
  expect(
    renderer
      .create(
        <InternalLink fullWidth href="https://example.com" tabIndex={0} wrappedComponent="button">
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
          href="https://example.com"
          tabIndex={0}
          target={null}
          wrappedComponent="button"
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
          href="https://example.com"
          tabIndex={0}
          target="self"
          wrappedComponent="button"
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
          href="https://example.com"
          tabIndex={0}
          target="blank"
          wrappedComponent="button"
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
          href="https://example.com"
          rel="nofollow"
          tabIndex={0}
          wrappedComponent="button"
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders with download true', () =>
  expect(
    renderer
      .create(
        <InternalLink
          download
          href="https://example.com"
          rel="nofollow"
          tabIndex={0}
          wrappedComponent="button"
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('renders with download string', () =>
  expect(
    renderer
      .create(
        <InternalLink
          download="file"
          href="https://example.com"
          rel="nofollow"
          tabIndex={0}
          wrappedComponent="button"
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
        href="https://example.com"
        onClick={() => {}}
        tabIndex={0}
        wrappedComponent="button"
        >
          InternalLink
        </InternalLink>,
      )
      .toJSON(),
    ).toMatchSnapshot());

  it('renders with a title prop', () =>
      expect(
        renderer
          .create(
            <InternalLink
              href="https://example.com"
              tabIndex={0}
              title="title with more information"
              wrappedComponent="tapArea"
            >
              InternalLink
            </InternalLink>,
          )
          .toJSON(),
      ).toMatchSnapshot());
