// @flow strict
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpandableModule from './ExpandableModule.js';

describe('ExpandableModule', () => {
  const props = {
    items: [
      {
        title: 'Title1',
        icon: 'lock',
        iconAccessibilityLabel: 'lock icon label',
        tapAccessibilityLabel: 'tap to expand or collapse the module',
        summary: ['summary1'],
        children: 'Children1',
      },
      {
        title: 'Title2',
        summary: ['summary2'],
        children: 'Children2',
        tapAccessibilityLabel: 'tap to expand or collapse the module',
      },
      {
        title: 'Title3',
        summary: ['summary3'],
        children: 'Children3',
        iconAccessibilityLabel: 'error icon label',
        tapAccessibilityLabel: 'tap to expand or collapse the module',
        type: 'error',
      },
    ],
  };

  it('should render the collapsed state correctly', () => {
    render(<ExpandableModule {...props} />);

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
    render(<ExpandableModule {...props} />);
    const expandButtons = screen.getAllByRole('button', {
      name: /tap to expand or collapse the module/i,
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
});
