// @flow strict
import React from 'react';
import { create } from 'react-test-renderer';
import TextField from './TextField.js';
import UpsellForm from './UpsellForm.js';

describe('UpsellForm', () => {
  it('renders', () => {
    const tree = create(
      <UpsellForm
        onSubmit={() => {}}
        submitButtonText="Submit"
        submitButtonAccessibilityLabel="Submit button"
      >
        <TextField id="name" placeholder="Name" onChange={() => {}} />
      </UpsellForm>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
