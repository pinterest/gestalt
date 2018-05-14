// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';

const snapshot = component => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
};

it('renders an empty Card', () => snapshot(<Card />));
it('renders a Card with text', () => snapshot(<Card>Chris Lloyd</Card>));
it('renders a Card with wash shown', () =>
  snapshot(<Card active>Chris Lloyd</Card>));
it('renders a Card with wash hidden', () =>
  snapshot(<Card active={false}>Chris Lloyd</Card>));
it('renders a Card with an image', () =>
  snapshot(
    <Card active={false} image="Avatar">
      Chris Lloyd
    </Card>
  ));
