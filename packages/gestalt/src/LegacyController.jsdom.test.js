// @flow strict
import { create } from 'react-test-renderer';
import Controller from './LegacyController';

test('Controller renders', () => {
  const element = document.createElement('div');
  const component = create(
    <Controller
      anchor={element}
      bgColor="darkGray"
      id=""
      onDismiss={() => {}}
      positionRelativeToAnchor
      role={undefined}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
