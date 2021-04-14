// @flow strict
import renderer from 'react-test-renderer';
import Module from './Module.js';
import Text from './Text.js';

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

  test('renders an error correctly', () => {
    const tree = renderer
      .create(
        <Module
          id="module-test"
          title="Testing"
          icon="lock"
          iconAccessibilityLabel="locked"
          type="error"
        >
          <Text>Testing</Text>
        </Module>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
