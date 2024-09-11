import { fireEvent, render, screen } from '@testing-library/react';
import AccordionExpandable from './AccordionExpandable';
import IconButton from './IconButton';

describe('AccordionExpandable', () => {
  const props = {
    id: 'uniqueTestID',
    items: [
      {
        title: 'Title1',
        icon: 'lock',
        iconAccessibilityLabel: 'lock icon label',
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
        iconAccessibilityLabel: 'error icon label',
        type: 'error',
      },
      {
        title: 'Title4',
        summary: ['summary4'],
        children: 'Children4',
        badge: { text: 'badge text' },
      },
      {
        title: 'Title5',
        summary: ['summary5'],
        children: 'Children5',
        iconButton: (
          <IconButton
            accessibilityLabel="Get help"
            bgColor="lightGray"
            icon="question-mark"
            iconColor="darkGray"
            onClick={() => {}}
            size="xs"
          />
        ),
      },
    ],
  } as const;

  it('should render the collapsed state correctly', () => {
    render(<AccordionExpandable {...props} />);

    expect(screen.getByText(/Title1/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /lock icon label/i })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children1/i)).toBeNull();

    expect(screen.getByText(/Title2/i)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();

    expect(screen.getByText(/Title3/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Error icon/i })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children3/i)).toBeNull();

    expect(screen.getByText(/Title4/i)).toBeInTheDocument();
    expect(screen.getByText(/badge text/i)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary4/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children4/i)).toBeNull();

    expect(screen.getByText(/Title5/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Get help/i })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary5/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children5/i)).toBeNull();
  });

  it('should expand the accordion correctly when clicked', () => {
    render(<AccordionExpandable {...props} />);
    const expandButtons = screen.getAllByRole('button', {
      name: /Expand section/i,
    });

    if (expandButtons[0]) {
      fireEvent.click(expandButtons[0]);
    }
    expect(screen.getByText(/Children1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.queryByText(/Children3/i)).toBeNull();
    expect(screen.queryByText(/Children4/i)).toBeNull();
    expect(screen.queryByText(/Children5/i)).toBeNull();

    if (expandButtons[1]) {
      fireEvent.click(expandButtons[1]);
    }
    expect(screen.queryByText(/Children1/i)).toBeNull();
    expect(screen.getByText(/Children2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children3/i)).toBeNull();
    expect(screen.queryByText(/Children4/i)).toBeNull();
    expect(screen.queryByText(/Children5/i)).toBeNull();

    if (expandButtons[2]) {
      fireEvent.click(expandButtons[2]);
    }
    expect(screen.queryByText(/Children1/i)).toBeNull();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.getByText(/Children3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children4/i)).toBeNull();
    expect(screen.queryByText(/Children5/i)).toBeNull();
  });

  it('should expand the accordion correctly with expandedId', () => {
    const newProps = {
      ...props,
      expandedIndex: 0,
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      onExpandedChange: jest.fn<[number | null | undefined], undefined>(),
    } as const;
    render(<AccordionExpandable {...newProps} />);

    // Item with index 0 is default to be expanded
    expect(screen.getByText(/Children1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.queryByText(/Children3/i)).toBeNull();
    expect(screen.queryByText(/Children4/i)).toBeNull();
    expect(screen.queryByText(/Children5/i)).toBeNull();

    // Click on Item with index 0 to collapse the item
    const button1 = screen.getByRole('button', {
      name: /Collapse section/i,
    });
    fireEvent.click(button1);
    expect(newProps.onExpandedChange).toHaveBeenCalledWith(null);

    // Click on with index 1 to expand it
    const expandButtons = screen.getAllByRole('button', {
      name: /Expand section/i,
    });
    expect(expandButtons).toHaveLength(5);
    if (expandButtons[1]) {
      fireEvent.click(expandButtons[1]);
    }
    expect(newProps.onExpandedChange).toHaveBeenCalledWith(1);
  });
});
