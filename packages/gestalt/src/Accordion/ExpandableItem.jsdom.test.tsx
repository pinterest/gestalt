import { fireEvent, render, screen } from '@testing-library/react';
import AccordionExpandableItem from './ExpandableItem';

describe('AccordionExpandableItem', () => {
  const baseProps = {
    id: 'uniqueTestID',
    accessibilityExpandLabel: 'click to expand',
    accessibilityCollapseLabel: 'click to collapse',
    title: 'test title',
    summary: ['summary1', 'summary2', 'summary3'],
    isCollapsed: true,
// @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
    onExpand: jest.fn<[boolean], undefined>(),
    type: 'info',
  } as const;

  it('should render the collapsed state correctly', () => {
    render(<AccordionExpandableItem {...baseProps}>Children</AccordionExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();

    const expandButton = screen.getByRole('button', {
      name: /click to expand/i,
    });
    fireEvent.click(expandButton);
    expect(baseProps.onExpand).toHaveBeenCalledWith(false);
  });

  it('should render icon correctly', () => {
    const props = {
      ...baseProps,
      icon: 'lock',
      iconAccessibilityLabel: 'test label',
    } as const;
    render(<AccordionExpandableItem {...props}>Children</AccordionExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test label/i })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });

  it('should render badge correctly', () => {
    const props = {
      ...baseProps,
      badge: { text: 'badge text' },
    } as const;
    render(<AccordionExpandableItem {...props}>Children</AccordionExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/badge text/i)).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });

  it('should render icon button correctly', () => {
    const props = {
      ...baseProps,
      icon: 'lock',
      iconAccessibilityLabel: 'test label',
    } as const;
    render(<AccordionExpandableItem {...props}>Children</AccordionExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test label/i })).toBeInTheDocument();
    // eslint-disable-next-line testing-library/prefer-presence-queries -- Please fix the next time this file is touched!
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });

  it('should render the expanded state correctly', () => {
    const props = {
      ...baseProps,
      isCollapsed: false,
    } as const;
    render(<AccordionExpandableItem {...props}>Children</AccordionExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Children/i)).toBeInTheDocument();

    const expandButton = screen.getByRole('button', {
      name: /click to collapse/i,
    });
    fireEvent.click(expandButton);
    expect(props.onExpand).toHaveBeenCalledWith(true);
  });

  it('should render the error state correctly', () => {
    const props = {
      ...baseProps,
      type: 'error',
      iconAccessibilityLabel: 'error icon label',
      isCollapsed: true,
    } as const;
    render(<AccordionExpandableItem {...props}>Children</AccordionExpandableItem>);
    expect(screen.getByRole('img', { name: /Error icon/i })).toBeInTheDocument();
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });
});
