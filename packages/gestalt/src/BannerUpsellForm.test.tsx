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
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'form')
        .filter((node) => node.props['data-test-id'] === 'test'),
    ).toHaveLength(1);
  });
});
