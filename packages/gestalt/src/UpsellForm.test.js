// @flow strict
import { create } from 'react-test-renderer';
import TextField from './TextField.js';
import UpsellForm from './UpsellForm.js';

jest.mock('./contexts/DefaultLabelProvider.js');

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
