// @flow strict
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
});
