// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextField from './TextField.js';
import Flyout from './Flyout.js';

describe('TextField', () => {
  it('Renders a Flyout if an error message is passed in', () => {
    const wrapper = shallow(
      <TextField errorMessage="test" id="test" onChange={jest.fn()} />
    );
    wrapper.instance().setState({ errorIsOpen: true });
    wrapper.simulate('focus');
    expect(wrapper.find(Flyout)).toHaveLength(1);
  });

  it('Does not render a Flyout when errorMessage is null', () => {
    const wrapper = shallow(<TextField id="test" onChange={jest.fn()} />);
    expect(wrapper.find(Flyout)).toHaveLength(0);
  });

  it('TextField normal', () => {
    const tree = create(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with error', () => {
    const tree = shallow(
      <TextField
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with hasError', () => {
    const wrapper = shallow(
      <TextField
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

  it('TextField with name', () => {
    const tree = shallow(
      <TextField
        name="email"
        id="email"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with autocomplete', () => {
    const tree = shallow(
      <TextField
        autoComplete="on"
        id="email"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('TextField with errorMessage prop change', () => {
    const tree = shallow(
      <TextField
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

  it('TextField with type number', () => {
    const tree = shallow(
      <TextField
        id="test"
        onChange={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        type="number"
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('handles blur events', () => {
    const mockBlur = jest.fn();
    const tree = shallow(
      <TextField id="test" onBlur={mockBlur} onChange={jest.fn()} />
    );
    tree
      .find('input')
      .simulate('blur', { currentTarget: { value: 'fake value' } });
    expect(mockBlur).toHaveBeenCalledWith({
      event: { currentTarget: { value: 'fake value' } },
      value: 'fake value',
    });
  });

  it('handles change events', () => {
    const mockChange = jest.fn();
    const tree = shallow(<TextField id="test" onChange={mockChange} />);
    tree
      .find('input')
      .simulate('change', { currentTarget: { value: 'fake value' } });
    expect(mockChange).toHaveBeenCalledWith({
      event: { currentTarget: { value: 'fake value' } },
      value: 'fake value',
    });
  });

  it('handles focus events', () => {
    const mockFocus = jest.fn();
    const tree = shallow(
      <TextField id="test" onChange={jest.fn()} onFocus={mockFocus} />
    );
    tree
      .find('input')
      .simulate('focus', { currentTarget: { value: 'fake value' } });
    expect(mockFocus).toHaveBeenCalledWith({
      event: { currentTarget: { value: 'fake value' } },
      value: 'fake value',
    });
  });

  it('handles key down events', () => {
    const mockKeyDown = jest.fn();
    const tree = shallow(
      <TextField id="test" onChange={jest.fn()} onKeyDown={mockKeyDown} />
    );
    tree
      .find('input')
      .simulate('keyDown', { currentTarget: { value: 'fake value' } });
    expect(mockKeyDown).toHaveBeenCalledWith({
      event: { currentTarget: { value: 'fake value' } },
      value: 'fake value',
    });
  });
});
