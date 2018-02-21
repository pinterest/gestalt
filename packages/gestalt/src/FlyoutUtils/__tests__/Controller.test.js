/* eslint-env jest */
/* eslint import/imports-first: 0 */
jest.unmock('../Controller');

import React from 'react';
import { shallow } from 'enzyme';
import Controller from '../Controller';
import Contents from '../Contents';

describe('Flyout', () => {
  it('does not render Contents when anchor is null', () => {
    const wrapper = shallow(
      <Controller anchor={null} bgColor="white" onDismiss={() => null} />
    );
    expect(wrapper.find(Contents).length).toEqual(0);
  });
});
