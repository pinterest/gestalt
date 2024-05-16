import {create} from 'react-test-renderer';
import Pog from './Pog';

test('Pog renders with icon', () => {
  const tree = create(<Pog icon="heart" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog renders with size and default padding', () => {
  const tree = create(<Pog icon="heart" size="xl" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog renders with size and custom padding', () => {
  const tree = create(<Pog icon="heart" padding={1} size="xl" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog renders with accessibilityLabel', () => {
  const tree = create(<Pog accessibilityLabel="Following" icon="people" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog renders with svg', () => {
  const tree = create(<Pog dangerouslySetSvgPath={{ __path: 'M13.00,20.00' }} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog active renders', () => {
  const tree = create(<Pog active icon="heart" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog focused renders', () => {
  const tree = create(<Pog focused icon="heart" />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pog hovered renders', () => {
  const tree = create(<Pog hovered icon="heart" />).toJSON();
  expect(tree).toMatchSnapshot();
});
