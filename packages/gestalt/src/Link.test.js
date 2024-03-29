// @flow strict
import renderer from 'react-test-renderer';
import Link from './Link';

it('default', () =>
  expect(renderer.create(<Link href="https://example.com">Link</Link>).toJSON()).toMatchSnapshot());

it('regular', () =>
  expect(renderer.create(<Link href="https://example.com">Link</Link>).toJSON()).toMatchSnapshot());

it('inline and auto underline', () =>
  expect(
    renderer
      .create(
        <Link display="inlineBlock" href="https://example.com" underline="auto">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('inline and overriden underline="none"', () =>
  expect(
    renderer
      .create(
        <Link display="inlineBlock" href="https://example.com" underline="none">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('inline and overriden underline="hover"', () =>
  expect(
    renderer
      .create(
        <Link display="inlineBlock" href="https://example.com" underline="hover">
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

it('external link with nofollow', () =>
  expect(
    renderer
      .create(
        <Link externalLinkIcon="default" href="https://example.com" rel="nofollow">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with onClick', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" onClick={() => {}}>
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());

it('with custom rounding, and tapStyle', () =>
  expect(
    renderer
      .create(
        <Link href="https://example.com" rounding="pill" tapStyle="compress">
          Link
        </Link>,
      )
      .toJSON(),
  ).toMatchSnapshot());
