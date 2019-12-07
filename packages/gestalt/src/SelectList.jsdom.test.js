// @flow
import React from 'react';
import { render } from '@testing-library/react';
import SelectList from './SelectList.js';

const options = [
  { label: 'option1', value: 'value1' },
  { label: 'option2', value: 'value2' },
  { label: 'option3', value: 'value3' },
];

it('Renders an FormErrorMessage if an error message is passed in', () => {
  const { getByText } = render(
    <SelectList
      errorMessage="Error message"
      id="test"
      onChange={jest.fn()}
      options={options}
    />
  );

  expect(getByText('Error message')).toBeVisible();
});

it('SelectList with name', () => {
  const { container } = render(
    <SelectList
      name="select_name"
      id="select_id"
      onChange={jest.fn()}
      options={options}
    />
  );
  expect(container.querySelector('[name="select_name"]')).toBeVisible();
});

it('SelectList with errorMessage prop change', () => {
  const handleChange = jest.fn();
  const { getByText, rerender } = render(
    <SelectList id="test" onChange={handleChange} options={options} />
  );
  expect(() => {
    getByText('Error message');
  }).toThrow('Unable to find an element with the text: Error message');
  rerender(
    <SelectList
      id="test"
      onChange={handleChange}
      options={options}
      errorMessage="Error message"
    />
  );
  expect(getByText('Error message')).toBeVisible();
});

it('SelectList with disabled', () => {
  const { container } = render(
    <SelectList disabled id="test" onChange={jest.fn()} options={options} />
  );
  expect(container.querySelector('select[disabled]')).toBeVisible();
});

it('SelectList with placeholder', () => {
  const { container } = render(
    <SelectList
      id="test"
      onChange={jest.fn()}
      options={options}
      placeholder={options[0].label}
    />
  );
  expect(container.querySelector('option')).toBeDisabled();
});
