// @flow strict
import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card.js';

it('renders an empty Card', () =>
  expect(renderer.create(<Card />).toJSON()).toMatchSnapshot());
it('renders a Card with text', () =>
  expect(renderer.create(<Card>Chris Lloyd</Card>).toJSON()).toMatchSnapshot());
it('renders a Card with wash shown', () =>
  expect(
    renderer.create(<Card active>Chris Lloyd</Card>).toJSON()
  ).toMatchSnapshot());
it('renders a Card with wash hidden', () =>
  expect(
    renderer.create(<Card active={false}>Chris Lloyd</Card>).toJSON()
  ).toMatchSnapshot());
it('renders a Card with an image', () =>
  expect(
    renderer
      .create(
        <Card active={false} image="Avatar">
          Chris Lloyd
        </Card>
      )
      .toJSON()
  ).toMatchSnapshot());
