import renderer from 'react-test-renderer';
import AccordionExpandableItem from './ExpandableItem';
import IconButton from '../IconButton';

describe('AccordionExpandableItem', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with icon', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          icon="lock"
          iconAccessibilityLabel="lock icon label"
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with badge', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          badge={{ text: 'Try it out!' }}
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
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
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
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
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with summary', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          summary={['summary1', 'summary2', 'summary3']}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with error', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          iconAccessibilityLabel="there is an error"
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          title="test title"
          type="error"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with children', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          id="uniqueTestID"
          isCollapsed
          onExpand={() => {}}
          title="test title"
          type="info"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with when expanded', () => {
    const tree = renderer
      .create(
        <AccordionExpandableItem
          accessibilityCollapseLabel="click to collapse"
          accessibilityExpandLabel="click to expand"
          id="uniqueTestID"
          isCollapsed={false}
          onExpand={() => {}}
          summary={['summary1', 'summary2', 'summary3']}
          title="test title"
          type="info"
        >
          <div>test children</div>
        </AccordionExpandableItem>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
