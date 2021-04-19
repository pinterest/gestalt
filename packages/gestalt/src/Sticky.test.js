// @flow strict
import { create } from 'react-test-renderer';
import Sticky from './Sticky.js';

test('Sticky renders', () => {
  const tree = create(<Sticky top={1}>Sticky</Sticky>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets thresholds for number values', () => {
  const tree = create(
    <Sticky bottom={1} left={2} right={3} top={4}>
      Sticky
    </Sticky>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets thresholds for string values', () => {
  const tree = create(
    <Sticky bottom="50%" left="25%" right="25%" top="50%">
      Sticky
    </Sticky>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets height', () => {
  const tree = create(
    <Sticky top={1} height={100}>
      Sticky
    </Sticky>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Sticky correctly sets zIndex', () => {
  const zIndexStub = {
    index() {
      return 100;
    },
  };
  const tree = create(
    <Sticky top={1} zIndex={zIndexStub}>
      Sticky
    </Sticky>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
