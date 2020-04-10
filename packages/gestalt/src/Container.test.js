// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Container from './Container.js';

describe('Container', () => {
  test('Renders with no props', () => {
    const component = renderer.create(<Container />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders with children', () => {
    const component = renderer.create(
      <Container>
        <div />
      </Container>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Renders with maxWidth', () => {
    const component = renderer.create(
      <Container maxWidth={400}>
        <div />
      </Container>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
