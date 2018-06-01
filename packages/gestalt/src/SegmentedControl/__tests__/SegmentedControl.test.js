// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import SegmentedControl from '../SegmentedControl';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';
import { shallow } from 'enzyme';

test('SegmentedControl renders', () => {
  const tree = create(
    <SegmentedControl
      items={['News', 'You', 'Messages']}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('SegmentedControl renders component items', () => {
  const wrapper = shallow(
    <SegmentedControl
      items={[
        'News',
        'You',
        'Messages',
        <Icon accessibilityLabel="" icon="pin" color="red" />,
        <Icon accessibilityLabel="" icon="pin" color="red" />,
      ]}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  );
  expect(wrapper.find(Text)).toHaveLength(3);
  expect(wrapper.find(Icon)).toHaveLength(2);
});
