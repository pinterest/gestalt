import renderer from 'react-test-renderer';
import Container from './Container';

test('Container renders', () => {
  const component = renderer.create(<Container />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('validate data test id Container', () => {
  const component = renderer.create(<Container dataTestId="test" />);
  const testInstance = component.root.find(
    (instance: any) => instance.props['data-test-id'] === 'test',
  );
  expect(testInstance).not.toBeNull();
});
