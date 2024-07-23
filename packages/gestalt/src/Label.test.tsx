import renderer from 'react-test-renderer';
import Label from './Label';

test('Label renders', () => {
  const component = renderer.create(<Label htmlFor="email">Email</Label>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Label renders with dataTestId', () => {
  const idName = 'data-test-id-csoft';
  const instance = renderer.create(
    <Label dataTestId={idName} htmlFor="email">
      Email
    </Label>,
  ).root;
  expect(instance.find((element: any) => element.type === 'label').props['data-test-id']).toContain(
    idName,
  );
});
