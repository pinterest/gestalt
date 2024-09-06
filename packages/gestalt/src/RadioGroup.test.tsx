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

  test('validate data test id for radiogroup', () => {
    const component = create(
      <RadioGroup
        dataTestId="test-radio-group"
        errorMessage="please pick one"
        id="testingErrorEx"
        legend="testing"
      >
        <RadioGroup.RadioButton
          dataTestId="test-radio-button-0"
          helperText="Helper"
          id="choice-1"
          label="Choice 1"
          name="choice"
          onChange={() => {}}
          value="choice-1"
        />
        <RadioGroup.RadioButton
          dataTestId="test-radio-button-1"
          id="choice-1"
          label="Choice 2"
          name="choice"
          onChange={() => {}}
          value="choice-2"
        />
      </RadioGroup>,
    ).root;
    expect(
      component
        .findAll((element) => element.type === 'legend')
        .filter((node) => node.props['data-test-id'] === 'test-radio-group-fieldset-legend'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'input')
        .filter((node) => node.props['data-test-id'] === 'test-radio-button-0'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test-radio-button-0-label'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test-radio-button-0-helper-text'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'input')
        .filter((node) => node.props['data-test-id'] === 'test-radio-button-1'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'div')
        .filter((node) => node.props['data-test-id'] === 'test-radio-button-1-label'),
    ).toHaveLength(1);
    expect(
      component
        .findAll((element) => element.type === 'svg')
        .filter((node) => node.props['data-test-id'] === 'test-radio-group-fieldset-error-icon'),
    ).toHaveLength(1);
  });
});
