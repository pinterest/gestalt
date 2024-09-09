import { create } from 'react-test-renderer';
import FormErrorMessage from './FormErrorMessage';

describe('FormErrorMessage', () => {
  it('with errorMessage', () => {
    const tree = create(<FormErrorMessage id="test" text="some error message" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('with no errorMessage', () => {
    const tree = create(<FormErrorMessage id="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('validate data test id', () => {
    const component = create(
      <FormErrorMessage dataTestId="test-error" id="test" text="some error message" />,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'svg')
        .filter((node) => node.props['data-test-id'] === 'test-error-icon'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test-error'),
    ).toHaveLength(1);
  });
});
