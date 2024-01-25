// @flow strict
import { create } from 'react-test-renderer';
import BannerUpsellForm from './BannerUpsellForm';
import TextField from './TextField';

describe('BannerUpsellForm', () => {
  it('renders', () => {
    const tree = create(
      <BannerUpsellForm
        onSubmit={() => {}}
        submitButtonText="Submit"
        submitButtonAccessibilityLabel="Submit button"
      >
        <TextField id="name" placeholder="Name" onChange={() => {}} />
      </BannerUpsellForm>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
