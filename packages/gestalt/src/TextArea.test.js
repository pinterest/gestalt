// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextArea from './TextArea.js';
import Flyout from './Flyout.js';

describe('TextArea', () => {
  it('Renders a Flyout if an error message is passed in', () => {
    const wrapper = shallow(
      <TextArea errorMessage="test" id="test" onChange={jest.fn()} />
    );
    wrapper.instance().setState({ errorIsOpen: true });
    wrapper.simulate('focus');
    expect(wrapper.find(Flyout)).toHaveLength(1);
  });

  it('Does not render a Flyout when errorMessage is null', () => {
    const wrapper = shallow(<TextArea id="test" onChange={jest.fn()} />);
    expect(wrapper.find(Flyout)).toHaveLength(0);
  });

  it('TextArea normal', () => {
    const tree = create(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with error', () => {
    const tree = shallow(
      <TextArea
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with hasError', () => {
    const wrapper = shallow(
      <TextArea
        hasError
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(wrapper.find(Flyout)).toHaveLength(0);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('TextArea with rows', () => {
    const tree = create(
      <TextArea id="test" onChange={jest.fn()} rows={5} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextArea with errorMessage prop change', () => {
    const tree = shallow(
      <TextArea
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
    expect(tree.find(Flyout)).toHaveLength(0);
    tree.setProps({
      errorMessage: 'error message',
    });
    expect(tree.find(Flyout)).toHaveLength(1);
  });
});
