// @flow strict
import renderer from 'react-test-renderer';
import AccordionExpandable from './AccordionExpandable';

describe('Module Expandable', () => {
  test('renders correctly with one item', () => {
    const tree = renderer
      .create(
        <AccordionExpandable
          id="uniqueTestID"
          items={[
            {
              title: 'Title',
              summary: ['summary1', 'summary2', 'summary3'],
              children: 'Children',
            },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders correctly with multiple items', () => {
    const tree = renderer
      .create(
        <AccordionExpandable
          id="uniqueTestID"
          items={[
            {
              title: 'Title1',
              summary: ['summary1'],
              children: 'Children1',
            },
            {
              title: 'Title2',
              summary: ['summary2'],
              children: 'Children2',
            },
            {
              title: 'Title3',
              summary: ['summary3'],
              children: 'Children3',
              type: 'error',
            },
          ]}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

test('renders correctly with multiple items with expandedId', () => {
  const tree = renderer
    .create(
      <AccordionExpandable
        accessibilityCollapseLabel="click to collapse"
        accessibilityExpandLabel="click to expand"
        expandedIndex={0}
        id="uniqueTestID"
        items={[
          {
            title: 'Title1',
            summary: ['summary1'],
            children: 'Children1',
          },
          {
            title: 'Title2',
            summary: ['summary2'],
            children: 'Children2',
          },
          {
            title: 'Title3',
            summary: ['summary3'],
            children: 'Children3',
            type: 'error',
          },
        ]}
        onExpandedChange={() => {}}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
