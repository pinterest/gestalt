// @flow strict
import renderer from 'react-test-renderer';
import Accordion from './Accordion';
import IconButton from './IconButton';
import Text from './Text';

describe('Accordion', () => {
  test('renders the base correctly', () => {
    const tree = renderer.create(<Accordion id="accordion-test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a title correctly', () => {
    const tree = renderer.create(<Accordion id="accordion-test" title="Accordion Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders content correctly', () => {
    const tree = renderer
      .create(
        <Accordion id="accordion-test">
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an icon correctly', () => {
    const tree = renderer
      .create(
        <Accordion id="accordion-test" title="Testing" icon="lock" iconAccessibilityLabel="locked">
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a badge correctly', () => {
    const tree = renderer
      .create(
        <Accordion badge={{ text: 'Try it out!' }} id="accordion-test" title="Testing">
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an error correctly', () => {
    const tree = renderer
      .create(
        <Accordion
          id="accordion-test"
          title="Testing"
          icon="lock"
          iconAccessibilityLabel="there is an error"
          type="error"
        >
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an icon button correctly', () => {
    const tree = renderer
      .create(
        <Accordion
          id="accordion-test"
          title="Testing"
          iconButton={
            <IconButton
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              accessibilityLabel="Get help"
              size="xs"
              onClick={() => {}}
            />
          }
        >
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
