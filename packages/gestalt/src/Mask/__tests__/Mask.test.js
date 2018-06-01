// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Mask from '../Mask';

test('Mask renders', () => {
  const component = renderer.create(
    <Mask>
      <img alt="Painting" src="https://pinterest.com/img/painting.png" />
    </Mask>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Mask has the correct width', () => {
  const component = renderer.create(
    <Mask width={400}>
      <img alt="Painting" src="https://pinterest.com/img/painting.png" />
    </Mask>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
