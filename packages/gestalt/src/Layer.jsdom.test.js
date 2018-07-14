// @flow
import React from 'react';
import { createPortal } from 'react-dom';
import { shallow } from 'enzyme';
import Layer from './Layer.js';

jest.mock('react-dom', () => ({
  createPortal: jest.fn(children => children),
}));

test('Layer appends itself to body on mount', () => {
  const body = document.getElementsByTagName('body')[0];
  const wrapper = shallow(<Layer>content</Layer>);
  const element = wrapper.instance().el;
  expect(body.contains(element)).toBeTruthy();
});

test('Layer removes itself from body on unmount', () => {
  const body = document.getElementsByTagName('body')[0];
  const wrapper = shallow(<Layer>content</Layer>);
  const element = wrapper.instance().el;
  wrapper.unmount();
  expect(body.contains(element)).toBeFalsy();
});

test('Layer renders through createPortal', () => {
  const wrapper = shallow(<Layer>content</Layer>);
  const element = wrapper.instance().el;
  expect(createPortal).toHaveBeenCalledWith('content', element);
  expect(wrapper.text()).toBe('content');
});
