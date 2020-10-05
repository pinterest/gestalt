// @flow strict
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExpandableModuleBase from './ExpandableModuleBase.js';

describe('ExpandableModuleBase', () => {
  const baseProps = {
    title: 'test title',
    summary: ['summary1', 'summary2', 'summary3'],
    isCollapsed: true,
    onModuleClicked: jest.fn(),
    type: 'info',
    arrowIconAccessibilityLabel: 'arrow icon to expand or collapse the module',
  };

  it('should render the collapsed state correctly', () => {
    render(
      <ExpandableModuleBase {...baseProps}>Children</ExpandableModuleBase>
    );
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();

    const expandButton = screen.getByRole('button', {
      name: /arrow icon to expand or collapse the module/i,
    });
    fireEvent.click(expandButton);
    expect(baseProps.onModuleClicked).toHaveBeenCalledWith(false);
  });

  it('should render icon correctly', () => {
    const props = {
      ...baseProps,
      icon: 'lock',
      titleIconAccessibilityLabel: 'test label',
    };
    render(<ExpandableModuleBase {...props}>Children</ExpandableModuleBase>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /test label/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });

  it('should render the expanded state correctly', () => {
    const props = {
      ...baseProps,
      isCollapsed: false,
    };
    render(<ExpandableModuleBase {...props}>Children</ExpandableModuleBase>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Children/i)).toBeInTheDocument();

    const expandButton = screen.getByRole('button', {
      name: /arrow icon to expand or collapse the module/i,
    });
    fireEvent.click(expandButton);
    expect(props.onModuleClicked).toHaveBeenCalledWith(true);
  });

  it('should render the error state correctly', () => {
    const props = {
      ...baseProps,
      type: 'error',
      isCollapsed: true,
    };
    render(<ExpandableModuleBase {...props}>Children</ExpandableModuleBase>);
    expect(
      screen.getByRole('img', { name: /Error icon/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });
});
