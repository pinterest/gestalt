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
  const component = renderer.create(<Pulsar dataTestId="test" />).root;
  expect(
    component
      .findAll((element) => element.type === 'div')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});
