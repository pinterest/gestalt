// @flow strict
import renderer from 'react-test-renderer';
import Module from './Module.js';
import Text from './Text.js';
import IconButton from './IconButton.js';

describe('Module', () => {
  test('renders the base correctly', () => {
    const tree = renderer.create(<Module id="module-test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a title correctly', () => {
    const tree = renderer.create(<Module id="module-test" title="Module Test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders content correctly', () => {
    const tree = renderer
      .create(
        <Module id="module-test">
          <Text>Testing</Text>
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an icon correctly', () => {
    const tree = renderer
      .create(
        <Module id="module-test" title="Testing" icon="lock" iconAccessibilityLabel="locked">
          <Text>Testing</Text>
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders a badge correctly', () => {
    const tree = renderer
      .create(
        <Module badgeText="Try it out!" id="module-test" title="Testing">
          <Text>Testing</Text>
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an error correctly', () => {
    const tree = renderer
      .create(
        <Module
          id="module-test"
          title="Testing"
          icon="lock"
          iconAccessibilityLabel="there is an error"
          type="error"
        >
          <Text>Testing</Text>
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders an icon button correctly', () => {
    const tree = renderer
      .create(
        <Module
          id="module-test"
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
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
