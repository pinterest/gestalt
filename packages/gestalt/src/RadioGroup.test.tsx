import { create } from 'react-test-renderer';
import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
  it('renders', () => {
    const tree = create(
      <RadioGroup id="testing-example" legend="testing">
        <RadioGroup.RadioButton id="choice-1" name="choice" onChange={() => {}} value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a hidden legend', () => {
    const tree = create(
      <RadioGroup id="hiddenEx" legend="testing" legendDisplay="hidden">
        <RadioGroup.RadioButton id="choice-1" name="choice" onChange={() => {}} value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders in different direction', () => {
    const tree = create(
      <RadioGroup direction="row" id="hiddenEx" legend="testing" legendDisplay="hidden">
        <RadioGroup.RadioButton id="choice-1" name="choice" onChange={() => {}} value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an error', () => {
    const tree = create(
      <RadioGroup errorMessage="please pick one" id="testingErrorEx" legend="testing">
        <RadioGroup.RadioButton id="choice-1" name="choice" onChange={() => {}} value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders radios with dataTestId', () => {
    const component = create(
      <RadioGroup
        direction="row"
        id="radioGroup"
        legend="testing"
        legendDisplay="hidden"
        dataTestId="radio-group-test-id"
      >
        <RadioGroup.RadioButton
          id="choice-1"
          name="choice"
          onChange={() => {}}
          value="choice-1"
          dataTestId="radio-button-test-id"
        />
      </RadioGroup>,
    );
    const testInstance = component.root;
    const radioGroupElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'radio-group-test-id',
    );
    const radioButtonElement = testInstance.find(
      (instance: any) => instance.props['data-test-id'] === 'radio-button-test-id',
    );
    expect(radioGroupElement).not.toBeNull();
    expect(radioButtonElement).not.toBeNull();
  });
});
