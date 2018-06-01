// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import SegmentedControl from '../SegmentedControl';
import Icon from '../../Icon/Icon';
import Text from '../../Text/Text';

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
        <Icon key="icon1" accessibilityLabel="" icon="pin" color="red" />,
        <Icon key="icon2" accessibilityLabel="" icon="pin" color="red" />,
      ]}
      selectedItemIndex={0}
      onChange={() => {}}
    />
  );
  expect(wrapper.find(Text)).toHaveLength(3);
  expect(wrapper.find(Icon)).toHaveLength(2);
});
