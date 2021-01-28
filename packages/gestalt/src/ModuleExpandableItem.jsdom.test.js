// @flow strict
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ModuleExpandableItem from './ModuleExpandableItem.js';

describe('ModuleExpandableItem', () => {
  const baseProps = {
    id: 'uniqueTestID',
    accessibilityExpandLabel: 'click to expand',
    accessibilityCollapseLabel: 'click to collapse',
    title: 'test title',
    summary: ['summary1', 'summary2', 'summary3'],
    isCollapsed: true,
    onModuleClicked: jest.fn(),
    type: 'info',
  };

  it('should render the collapsed state correctly', () => {
    render(<ModuleExpandableItem {...baseProps}>Children</ModuleExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();

    const expandButton = screen.getByRole('button', {
      name: /click to expand/i,
    });
    fireEvent.click(expandButton);
    expect(baseProps.onModuleClicked).toHaveBeenCalledWith(false);
  });

  it('should render icon correctly', () => {
    const props = {
      ...baseProps,
      icon: 'lock',
      iconAccessibilityLabel: 'test label',
    };
    render(<ModuleExpandableItem {...props}>Children</ModuleExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /test label/i })).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });

  it('should render the expanded state correctly', () => {
    const props = {
      ...baseProps,
      isCollapsed: false,
    };
    render(<ModuleExpandableItem {...props}>Children</ModuleExpandableItem>);
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.queryByText(/summary1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Children/i)).toBeInTheDocument();

    const expandButton = screen.getByRole('button', {
      name: /click to collapse/i,
    });
    fireEvent.click(expandButton);
    expect(props.onModuleClicked).toHaveBeenCalledWith(true);
  });

  it('should render the error state correctly', () => {
    const props = {
      ...baseProps,
      type: 'error',
      iconAccessibilityLabel: 'error icon label',
      isCollapsed: true,
    };
    render(<ModuleExpandableItem {...props}>Children</ModuleExpandableItem>);
    expect(screen.getByRole('img', { name: /Error icon/i })).toBeInTheDocument();
    expect(screen.getByText(/test title/i)).toBeInTheDocument();
    expect(screen.getByText(/summary1/i)).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeNull();
  });
});
