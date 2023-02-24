// @flow strict
import renderer from 'react-test-renderer';
import WashAnimated from './WashAnimated.js';

it('renders an empty WashAnimated', () =>
  expect(renderer.create(<WashAnimated />).toJSON()).toMatchSnapshot());
it('renders a WashAnimated with text', () =>
  expect(renderer.create(<WashAnimated>Chris Lloyd</WashAnimated>).toJSON()).toMatchSnapshot());
it('renders a WashAnimated with wash shown', () =>
  expect(
    renderer.create(<WashAnimated active>Chris Lloyd</WashAnimated>).toJSON(),
  ).toMatchSnapshot());
it('renders a WashAnimated with wash hidden', () =>
  expect(
    renderer.create(<WashAnimated active={false}>Chris Lloyd</WashAnimated>).toJSON(),
  ).toMatchSnapshot());
it('renders a WashAnimated with an image', () =>
  expect(
    renderer
      .create(
        <WashAnimated active={false} image="Avatar">
          Chris Lloyd
        </WashAnimated>,
      )
      .toJSON(),
  ).toMatchSnapshot());
