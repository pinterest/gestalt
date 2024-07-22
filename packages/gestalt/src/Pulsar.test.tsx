import renderer from 'react-test-renderer';
import Pulsar from './Pulsar';

test('Pulsar renders', () => {
  const component = renderer.create(<Pulsar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pulsar is hidden when paused', () => {
  const component = renderer.create(<Pulsar paused />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Pulsar renders with dataTestId', () => {
  const component = renderer.create(<Pulsar dataTestId="some-test-id" />);
  const testInstance = component.root;
  const pulsarElement = testInstance.find(
    (instance: any) => instance.props['data-test-id'] === 'some-test-id',
  );
  expect(pulsarElement).not.toBeNull();
});
