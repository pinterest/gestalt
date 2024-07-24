import renderer from 'react-test-renderer';
import Label from './Label';

test('Label renders', () => {
  const component = renderer.create(<Label htmlFor="email">Email</Label>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Label renders with dataTestId', () => {
  const component = renderer.create(
    <Label dataTestId="test" htmlFor="email">
      Email
    </Label>,
  ).root;
  expect(
    component
      .findAll((element) => element.type === 'label')
      .filter((node) => node.props['data-test-id'] === 'test'),
  ).toHaveLength(1);
});
