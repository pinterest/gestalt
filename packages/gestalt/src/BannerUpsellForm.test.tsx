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

  it('validate data test id', () => {
    const component = create(
      <BannerUpsellForm
        dataTestId="test"
        onSubmit={() => {}}
        submitButtonAccessibilityLabel="Submit button"
        submitButtonText="Submit"
      >
        <TextField id="name" onChange={() => {}} placeholder="Name" />
      </BannerUpsellForm>,
    );
    const testInstance = component.root.find(
      (instance: any) => instance.props['data-test-id'] === 'test',
    );
    expect(testInstance).not.toBeNull();
  });
});
