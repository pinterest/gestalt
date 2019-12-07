// @flow
import React from 'react';
import { create } from 'react-test-renderer';
import SelectList from './SelectList.js';

const options = [
  { label: 'option1', value: 'value1' },
  { label: 'option2', value: 'value2' },
  { label: 'option3', value: 'value3' },
];

describe('SelectList', () => {
  it('Renders an FormErrorMessage if an error message is passed in', () => {
    const component = create(
      <SelectList
        errorMessage="Error message"
        id="test"
        onChange={jest.fn()}
        options={options}
      />
    );

    expect(JSON.stringify(component.toJSON())).toContain('Error message');
  });

  it('Does not render an FormErrorMessage when errorMessage is null', () => {
    const component = create(
      <SelectList id="test" onChange={jest.fn()} options={options} />
    );
    expect(JSON.stringify(component.toJSON())).not.toContain('Error message');
  });

  it('SelectList normal', () => {
    const tree = create(
      <SelectList id="test" onChange={jest.fn()} options={options} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
