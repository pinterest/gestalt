// @flow strict
import { create } from 'react-test-renderer';
import TextField from './TextField';
import UpsellForm from './UpsellForm';

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
