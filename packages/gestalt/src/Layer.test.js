// @flow
import React from 'react';
import { createPortal } from 'react-dom';
import { shallow } from 'enzyme';
import Layer from './Layer.js';

jest.mock('react-dom', () => ({
  createPortal: jest.fn(children => children),
}));

describe('Layer in server render', () => {
  if (typeof document === 'undefined') {
    it('does not use createPortal or render content', () => {
      const wrapper = shallow(<Layer>content</Layer>);
      expect(wrapper.instance().el).toBeUndefined();
      expect(createPortal).not.toHaveBeenCalled();
      expect(wrapper.text()).toBe('');
    });
  }
});

describe('Layer in browser render', () => {
  if (typeof document !== 'undefined') {
    it('appends itself to body on mount', () => {
      const body = document.getElementsByTagName('body')[0];
      const wrapper = shallow(<Layer>content</Layer>);
      const element = wrapper.instance().el;
      expect(body.contains(element)).toBeTruthy();
    });

    it('removes itself from body on unmount', () => {
      const body = document.getElementsByTagName('body')[0];
      const wrapper = shallow(<Layer>content</Layer>);
      const element = wrapper.instance().el;
      wrapper.unmount();
      expect(body.contains(element)).toBeFalsy();
    });

    it('renders through createPortal', () => {
      const wrapper = shallow(<Layer>content</Layer>);
      const element = wrapper.instance().el;
      expect(createPortal).toHaveBeenCalledWith('content', element);
      expect(wrapper.text()).toBe('content');
    });
  }
});
