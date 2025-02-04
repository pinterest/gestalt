import { ComponentProps, createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AvatarGroup from './AvatarGroup';
import Box from './Box';

describe('AvatarGroup', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const renderCmp = ({
    addCollaborators = false,
    collaborators,
    href,
    onClick,
    role,
    size = 'md',
    avatarRef,
  }: {
    addCollaborators?: ComponentProps<typeof AvatarGroup>['addCollaborators'];
    collaborators: ComponentProps<typeof AvatarGroup>['collaborators'];
    href?: ComponentProps<typeof AvatarGroup>['href'];
    onClick?: ComponentProps<typeof AvatarGroup>['onClick'];
    role?: ComponentProps<typeof AvatarGroup>['role'];
    size?: ComponentProps<typeof AvatarGroup>['size'];
    avatarRef?: ComponentProps<typeof AvatarGroup>['ref'];
  }) =>
    render(
      size === 'fit' ? (
        <Box width={200}>
          <AvatarGroup
            ref={avatarRef}
            accessibilityLabel="test"
            addCollaborators={addCollaborators}
            collaborators={collaborators}
            href={href}
            onClick={onClick}
            role={role}
            size={size}
          />
        </Box>
      ) : (
        <AvatarGroup
          ref={avatarRef}
          accessibilityLabel="test"
          addCollaborators={addCollaborators}
          collaborators={collaborators}
          href={href}
          onClick={onClick}
          role={role}
          size={size}
        />
      ),
    );

  it('renders xs display-only AvatarGroup with image', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      size: 'xs',
    });
    expect(error.mock.calls[0]![0]).toEqual(
      expect.stringContaining('Warning: React does not recognize the `%s` prop on a DOM element'),
    );
    expect(error.mock.calls[0]![1]).toEqual(expect.stringContaining('fetchPriority'));
    expect(baseElement).toMatchSnapshot();
  });

  it('renders sm display-only AvatarGroup with image', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      size: 'sm',
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders md display-only AvatarGroup with image', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders fit display-only AvatarGroup with image', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      size: 'fit',
      role: 'button',
      onClick: jest.fn(),
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders display-only AvatarGroup without image', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
        },
      ],
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders display-only AvatarGroup with counter', () => {
    const { baseElement } = renderCmp({
      collaborators: Array(5).fill({
        name: 'Keerthi',
        src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
      }),
    });
    expect(screen.getByText('3')).toBeVisible();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders display-only 99+ counter over 101 collaborators', () => {
    renderCmp({
      collaborators: Array(102).fill({
        name: 'Keerthi',
        src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
      }),
    });
    expect(screen.queryAllByAltText('Keerthi')).toHaveLength(2);
    expect(screen.getByText('99+')).toBeVisible();
  });

  it('renders AvatarGroup button with addCollaborators button', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      addCollaborators: true,
      role: 'button',
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('renders AvatarGroup link with addCollaborators button', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      addCollaborators: true,
      role: 'link',
      href: 'www.pinterest.com',
    });
    expect(baseElement).toMatchSnapshot();
  });

  it('should render clickable TapArea with button role and ref', () => {
    const onClickMock = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const ref = createRef<HTMLDivElement>();
    renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      onClick: onClickMock,
      role: 'button',
      avatarRef: ref,
    });
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    fireEvent.click(screen.getByAltText('Keerthi'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render clickable TapArea with link role and ref', () => {
    const onClickMock = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    const ref = createRef<HTMLDivElement>();
    renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      onClick: onClickMock,
      role: 'link',
      href: 'http://www.pinterest.com',
      avatarRef: ref,
    });
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    fireEvent.click(screen.getByAltText('Keerthi'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should not call onClick when clicked on display-only role', () => {
    const onClickMock = jest.fn<
      [
        {
          dangerouslyDisableOnNavigation: () => void;
          event:
            | React.MouseEvent<HTMLDivElement>
            | React.KeyboardEvent<HTMLDivElement>
            | React.MouseEvent<HTMLAnchorElement>
            | React.KeyboardEvent<HTMLAnchorElement>;
        },
      ],
      // @ts-expect-error - TS2344 - Type 'undefined' does not satisfy the constraint 'any[]'.
      undefined
    >();
    renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      onClick: onClickMock,
    });
    fireEvent.click(screen.getByAltText('Keerthi'));
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
