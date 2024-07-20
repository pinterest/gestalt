import renderer from 'react-test-renderer';
import Mask from './Mask';

test('Mask renders', () => {
  const component = renderer.create(
    <Mask>
      <img alt="Painting" src="https://pinterest.com/img/painting.png" />
    </Mask>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Mask has the correct width', () => {
  const component = renderer.create(
    <Mask width={400}>
      <img alt="Painting" src="https://pinterest.com/img/painting.png" />
    </Mask>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Mask renders with dataTestId', () => {
  const component = renderer.create(
    <Mask dataTestId='some-test-id'>
      <img alt="Painting" src="https://pinterest.com/img/painting.png" />
    </Mask>,
  );
  const testInstance = component.root;
  const maskElement = testInstance.find((instance:any) => instance.props['data-test-id'] === 'some-test-id');
  expect(maskElement).not.toBeNull();
});
