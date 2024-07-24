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
        dataTestId="radio-group-test-id"
        direction="row"
        id="radioGroup"
        legend="testing"
        legendDisplay="hidden"
      >
        <RadioGroup.RadioButton
          dataTestId="radio-button-test-id"
          id="choice-1"
          name="choice"
          onChange={() => {}}
          value="choice-1"
        />
      </RadioGroup>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'radio-group-test-id'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'radio-button-test-id'),
    ).toHaveLength(1);
  });
});
