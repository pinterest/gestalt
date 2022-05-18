// @flow strict
import { create } from 'react-test-renderer';
import RadioGroup from './RadioGroup.js';
import RadioButton from './RadioButton.js';

describe('RadioGroup', () => {
  it('renders', () => {
    const tree = create(
      <RadioGroup legend="testing" id="testing-example">
        <RadioButton id="choice-1" onChange={() => {}} name="choice" value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a hidden legend', () => {
    const tree = create(
      <RadioGroup legend="testing" legendDisplay="hidden" id="hiddenEx">
        <RadioButton id="choice-1" onChange={() => {}} name="choice" value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders an error', () => {
    const tree = create(
      <RadioGroup legend="testing" errorMessage="please pick one" id="testingErrorEx">
        <RadioButton id="choice-1" onChange={() => {}} name="choice" value="choice-1" />
      </RadioGroup>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
