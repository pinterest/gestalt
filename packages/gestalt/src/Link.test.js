// @flow strict
import renderer from 'react-test-renderer';
import Link from './Link.js';

it('default', () =>
  expect(renderer.create(<Link href="https://example.com">Link</Link>).toJSON()).toMatchSnapshot());

it('regular', () =>
  expect(renderer.create(<Link href="https://example.com">Link</Link>).toJSON()).toMatchSnapshot());

it('inline', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" inline>
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target null', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target={null}>
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target self', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target="self">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('target blank', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" target="blank">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with nofollow', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" rel="nofollow">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with onTap', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" onClick={() => {}}>
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with custom rounding, hoverColor, hoverStyle, and tapStyle', () =>
  expect(
    renderer
      .create(
        <Link
          href="https://example.com"
          rounding="pill"
          hoverColor="red"
          hoverStyle="none"
          tapStyle="compress"
        >
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with accessibilitySelected and role', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" accessibilitySelected role="tab">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());
