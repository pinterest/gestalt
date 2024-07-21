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
      dataTestId="some-test-id"
      items={['News', 'You', 'Messages', <div key="dummy" />]}
      onChange={() => {}}
      selectedItemIndex={0}
    />,
  );
  const testInstance = component.root;
  const segmentedControlElement = testInstance.find(
    (instance: any) => instance.props['data-test-id'] === 'some-test-id',
  );
  expect(segmentedControlElement).not.toBeNull();
});
