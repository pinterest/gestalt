// @flow strict
import { create } from 'react-test-renderer';
import PopoverEducational from './PopoverEducational.js';

test('PopoverEducational renders', () => {
  const element = document.createElement('div');
  const component = create(
    <PopoverEducational
      accessibilityLabel="test"
      anchor={element}
      onDismiss={jest.fn()}
      size="sm"
      message="text"
      primaryAction={{ text: 'next' }}
    />,
    {
      createNodeMock: () => true,
    },
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
