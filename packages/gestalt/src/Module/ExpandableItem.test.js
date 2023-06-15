// @flow strict
import renderer from 'react-test-renderer';
import ModuleExpandableItem from './ExpandableItem.js';
import IconButton from '../IconButton.js';

describe('ModuleExpandableItem', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed
          type="info"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with icon', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed
          icon="lock"
          iconAccessibilityLabel="lock icon label"
          type="info"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with badge', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          badge={{ text: 'Try it out!' }}
          id="uniqueTestID"
          isCollapsed
          onModuleClicked={() => {}}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with icon button', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed
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
          type="info"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with summary', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed
          summary={['summary1', 'summary2', 'summary3']}
          type="info"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          iconAccessibilityLabel="there is an error"
          isCollapsed
          type="error"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with children', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed
          type="info"
          onModuleClicked={() => {}}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with when expanded', () => {
    const tree = renderer
      .create(
        <ModuleExpandableItem
          id="uniqueTestID"
          accessibilityExpandLabel="click to expand"
          accessibilityCollapseLabel="click to collapse"
          title="test title"
          isCollapsed={false}
          summary={['summary1', 'summary2', 'summary3']}
          type="info"
          onModuleClicked={() => {}}
        >
          <div>test children</div>
        </ModuleExpandableItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
