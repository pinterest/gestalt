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
        <Accordion icon="lock" iconAccessibilityLabel="locked" id="accordion-test" title="Testing">
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
          icon="lock"
          iconAccessibilityLabel="there is an error"
          id="accordion-test"
          title="Testing"
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
          iconButton={
            <IconButton
              accessibilityLabel="Get help"
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              onClick={() => {}}
              size="xs"
            />
          }
          id="accordion-test"
          title="Testing"
        >
          <Text>Testing</Text>
        </Accordion>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('validate data test id', () => {
    const component = renderer.create(
      <Accordion
        dataTestId="test-accordion"
        icon="lock"
        iconAccessibilityLabel="there is an error"
        id="accordion-test"
        title="Testing"
        type="error"
      >
        <Text>Testing</Text>
      </Accordion>,
    );
    const testInstance = component.root.find(
      (instance: any) => instance.props['data-test-id'] === 'test-accordion-title',
    );
    expect(testInstance).not.toBeNull();
  });
});
