import { create } from 'react-test-renderer';
import SegmentedControl from './SegmentedControl';

test('SegmentedControl renders', () => {
  const tree = create(
    <SegmentedControl
      items={['News', 'You', 'Messages', <div key="dummy" />]}
      onChange={() => {}}
      selectedItemIndex={0}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SegmentedControl with responsive widths renders', () => {
  const tree = create(
    <SegmentedControl
      items={['Short', 'Really really really long title']}
      onChange={() => {}}
      responsive
      selectedItemIndex={0}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SegmentedControl renders with dataTestId', () => {
  const component = create(
    <SegmentedControl
      dataTestId="test"
      items={['News', 'You', 'Messages', <div key="dummy" />]}
      onChange={() => {}}
      selectedItemIndex={0}
    />,
  ).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});
