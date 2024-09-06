import { create } from 'react-test-renderer';
import Checkbox from './Checkbox';
import Fieldset from './Fieldset';

describe('Fieldset', () => {
  it('renders', () => {
    const tree = create(
      <Fieldset legend="What is your favorite dog?">
        <Checkbox id="Schnauzer" label="Schnauzer" onChange={() => {}} />
        <Checkbox id="Aussie" label="Aussie" onChange={() => {}} />
      </Fieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a visually hidden legend', () => {
    const tree = create(
      <Fieldset legend="What is your favorite dog?" legendDisplay="hidden">
        <Checkbox id="Schnauzer" label="Schnauzer" onChange={() => {}} />
        <Checkbox id="Aussie" label="Aussie" onChange={() => {}} />
      </Fieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with errorMessage', () => {
    const tree = create(
      <Fieldset
        errorMessage="At least 1 item must be selected"
        id="fieldset-with-error"
        legend="What is your favorite dog?"
        legendDisplay="hidden"
      >
        <Checkbox id="Schnauzer" label="Schnauzer" onChange={() => {}} />
        <Checkbox id="Aussie" label="Aussie" onChange={() => {}} />
      </Fieldset>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('validate data test id for fieldset', () => {
    const component = create(
      <Fieldset
        dataTestId="test-fieldset"
        errorMessage="At least 1 item must be selected"
        id="fieldset-with-error"
        legend="What is your favorite dog?"
      >
        <Checkbox dataTestId="schnauzer" id="Schnauzer" label="Schnauzer" onChange={() => {}} />
        <Checkbox dataTestId="aussie" id="Aussie" label="Aussie" onChange={() => {}} />
      </Fieldset>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'fieldset')
        .filter((node) => node.props['data-test-id'] === 'test-fieldset'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'legend')
        .filter((node) => node.props['data-test-id'] === 'test-fieldset-legend'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'svg')
        .filter((node) => node.props['data-test-id'] === 'test-fieldset-error-icon'),
    ).toHaveLength(1);
  });
});
