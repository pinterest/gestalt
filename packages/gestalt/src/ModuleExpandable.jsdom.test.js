// @flow strict
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModuleExpandable from './ModuleExpandable.js';

describe('ModuleExpandable', () => {
  const props = {
    id: 'uniqueTestID',
    accessibilityExpandLabel: 'click to expand',
    accessibilityCollapseLabel: 'click to collapse',
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
    ],
  };

  it('should render the collapsed state correctly', () => {
    render(<ModuleExpandable {...props} />);

    expect(screen.getByText(/Title1/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /lock icon label/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children1/i)).toBeNull();

    expect(screen.getByText(/Title2/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();

    expect(screen.getByText(/Title3/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Error icon/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/summary3/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children3/i)).toBeNull();
  });

  it('should expand the module correctly when clicked', () => {
    render(<ModuleExpandable {...props} />);
    const expandButtons = screen.getAllByRole('button', {
      name: /click to expand/i,
    });

    fireEvent.click(expandButtons[0]);
    expect(screen.getByText(/Children1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.queryByText(/Children3/i)).toBeNull();

    fireEvent.click(expandButtons[1]);
    expect(screen.queryByText(/Children1/i)).toBeNull();
    expect(screen.getByText(/Children2/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children3/i)).toBeNull();

    fireEvent.click(expandButtons[2]);
    expect(screen.queryByText(/Children1/i)).toBeNull();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.getByText(/Children3/i)).toBeInTheDocument();
  });

  it('should expand the module correctly with expandedId', () => {
    const newProps = {
      ...props,
      expandedId: 'uniqueTestID-0',
      setExpandedId: jest.fn(),
    };
    render(<ModuleExpandable {...newProps} />);

    // Item 1 is default to be expanded
    expect(screen.getByText(/Children1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children2/i)).toBeNull();
    expect(screen.queryByText(/Children3/i)).toBeNull();

    // Click on Item 1 to collapse the item
    const button1 = screen.getByRole('button', {
      name: /click to collapse/i,
    });
    fireEvent.click(button1);
    expect(newProps.setExpandedId).toHaveBeenCalledWith(null);

    // Click on Item 2 to expand it
    const expandButtons = screen.getAllByRole('button', {
      name: /click to expand/i,
    });
    expect(expandButtons).toHaveLength(2);
    fireEvent.click(expandButtons[0]);
    expect(newProps.setExpandedId).toHaveBeenCalledWith('uniqueTestID-1');
  });
});
