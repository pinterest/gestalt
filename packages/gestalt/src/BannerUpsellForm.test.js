// @flow strict
import { create } from 'react-test-renderer';
import BannerUpsellForm from './BannerUpsellForm';
import TextField from './TextField';

describe('BannerUpsellForm', () => {
  it('renders', () => {
    const tree = create(
      <BannerUpsellForm
        onSubmit={() => {}}
        submitButtonAccessibilityLabel="Submit button"
        submitButtonText="Submit"
      >
        <TextField id="name" onChange={() => {}} placeholder="Name" />
      </BannerUpsellForm>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
