// @flow
import React from 'react';
import { mount } from 'enzyme';
import Avatar from './Avatar.js';

test('Avatar handles Image error', () => {
  const wrapper = mount(<Avatar name="Name" src="example.com" />);
  wrapper.find('img').simulate('error');
  expect(wrapper.state('isImageLoaded')).toBe(false);
});

test('Avatar resets error after src changes', () => {
  const wrapper = mount(<Avatar name="Name" src="example.com" />);
  wrapper.instance().handleImageError();
  expect(wrapper.state('isImageLoaded')).toBe(false);
  wrapper.setProps({ src: 'example.com/img.jpg' });
  expect(wrapper.state('isImageLoaded')).toBe(true);
});
