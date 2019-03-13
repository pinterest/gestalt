// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import FormErrorMessage from './FormErrorMessage.js';
import SelectList from './SelectList.js';

const options = [
  { label: 'option1', value: 'value1' },
  { label: 'option2', value: 'value2' },
  { label: 'option3', value: 'value3' },
];

describe('SelectList', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const wrapper = shallow(
      <SelectList
        errorMessage="test"
        id="test"
        onChange={jest.fn()}
        options={options}
      />
    );
    expect(wrapper.find(FormErrorMessage)).toHaveLength(1);
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const wrapper = shallow(
      <SelectList id="test" onChange={jest.fn()} options={options} />
    );
    expect(wrapper.find(FormErrorMessage)).toHaveLength(0);
  });

  it('SelectList normal', () => {
    const tree = create(
      <SelectList id="test" onChange={jest.fn()} options={options} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with error', () => {
    const tree = shallow(
      <SelectList
        errorMessage="error message"
        id="test"
        onChange={jest.fn()}
        options={options}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with name', () => {
    const tree = shallow(
      <SelectList
        name="select"
        id="select"
        onChange={jest.fn()}
        options={options}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with errorMessage prop change', () => {
    const tree = shallow(
      <SelectList id="test" onChange={jest.fn()} options={options} />
    );
    expect(tree.find(FormErrorMessage)).toHaveLength(0);
    tree.setProps({
      errorMessage: 'error message',
    });
    expect(tree.find(FormErrorMessage)).toHaveLength(1);
  });

  it('SelectList with disabled', () => {
    const tree = shallow(
      <SelectList disabled id="test" onChange={jest.fn()} options={options} />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with placeholder', () => {
    const tree = shallow(
      <SelectList
        id="test"
        onChange={jest.fn()}
        options={options}
        placeholder={options[0].label}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });

  it('SelectList with value', () => {
    const tree = shallow(
      <SelectList
        id="test"
        onChange={jest.fn()}
        options={options}
        value={options[0].value}
      />
    ).html();
    expect(tree).toMatchSnapshot();
  });
});
