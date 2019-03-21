// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import Tooltip from './Tooltip.js';

test('Tooltip renders', () => {
  const component = create(
    <Tooltip text="This is a tooltip">
      <div>Hi</div>
    </Tooltip>,
    {
      createNodeMock: () => true,
    }
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
