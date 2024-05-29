import { act, render, screen } from '@testing-library/react';
import HelpButton from './HelpButton';

describe('HelpButton', () => {
  it('renders a icon', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    const svgElement = screen.getByText(
      (content: any, element: any) => element?.tagName.toLowerCase() === 'svg',
    );

    expect(svgElement).not.toBeNull();
  });

  it('renders a button with sequential keyboard navigation and forwards a ref to the innermost <button> element', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    expect(screen.getByRole('button').tabIndex).toEqual(0);
  });

  it('renders default accessibility label on button', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    const element = screen.getByRole('button');

    expect(element.getAttribute('aria-label')).toEqual('Click to learn more about Pinterest');
  });

  it('renders content based on text prop', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    const element = screen.getByText('Good test');

    expect(element).not.toBeNull();
  });

  it('renders popover with provided accessibility label', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    const element = screen.getByRole('dialog');

    expect(element.getAttribute('aria-label')).toEqual('Expanded information about Pinterest');
  });

  it('renders popover with new zIndex', () => {
    const zIndexStub = {
      index: () => 100,
    } as const;
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
        zIndex={zIndexStub}
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    // GetByClassName
    const element = screen.getByText((_: any, el: any) => el?.className === 'layer');

    expect(element.getAttribute('style')).toEqual('z-index: 101;');
  });

  it('popover opens', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    expect(screen.getByRole('dialog')).not.toBeNull();
  });

  it('renders a link', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{ href: 'https://www.pinterest.com', text: 'Good test' }}
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    expect(screen.getByRole('link')).not.toBeNull();
  });

  it('renders a link without default label', () => {
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{
          href: 'https://www.pinterest.com',
          accessibilityLabel: 'Good test',
          text: 'New link text',
        }}
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    const element = screen.getByRole('link');
    // @ts-expect-error - TS2339 - Property 'text' does not exist on type 'HTMLElement'.
    expect(element.text).toEqual('New link text');
  });

  it('renders a link spying the link trigger', () => {
    const spy = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    render(
      <HelpButton
        accessibilityLabel="Click to learn more about Pinterest"
        accessibilityPopoverLabel="Expanded information about Pinterest"
        link={{
          href: 'https://www.pinterest.com',
          text: 'Good test',
          onClick: spy,
        }}
        text="Good test"
      />,
    );

    act(() => {
      screen.getByRole('button').click();
    });

    act(() => {
      screen.getByRole('link').click();
    });

    expect(spy).toHaveBeenCalled();
  });
});
