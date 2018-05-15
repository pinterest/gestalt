// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Letterbox from '../Letterbox';

test('Letterbox crops tall content', () => {
  const component = renderer.create(
    <Letterbox width={50} height={50} contentAspectRatio={564 / 806} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox crops wide content', () => {
  const component = renderer.create(
    <Letterbox width={50} height={50} contentAspectRatio={564 / 517} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox fits square content', () => {
  const component = renderer.create(
    <Letterbox width={50} height={50} contentAspectRatio={564 / 564} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox covers square content in a vertical frame', () => {
  const component = renderer.create(
    <Letterbox width={50} height={150} contentAspectRatio={564 / 564} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Letterbox covers square content in a horizontal frame', () => {
  const component = renderer.create(
    <Letterbox width={150} height={50} contentAspectRatio={564 / 564} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
