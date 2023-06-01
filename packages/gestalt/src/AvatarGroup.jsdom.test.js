// @flow strict
import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import AvatarGroup from './AvatarGroup.js';
import Box from './Box.js';

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
  }: {|
    addCollaborators?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'addCollaborators'>,
    collaborators: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'collaborators'>,
    href?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'href'>,
    onClick?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'onClick'>,
    role?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'role'>,
    size?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'size'>,
    avatarRef?: $ElementType<React$ElementConfig<typeof AvatarGroup>, 'ref'>,
  |}) =>
    render(
      size === 'fit' ? (
        <Box width={200}>
          <AvatarGroup
            accessibilityLabel="test"
            addCollaborators={addCollaborators}
            collaborators={collaborators}
            href={href}
            onClick={onClick}
            role={role}
            // $FlowFixMe[incompatible-type]
            ref={avatarRef}
            size={size}
          />
        </Box>
      ) : (
        <AvatarGroup
          accessibilityLabel="test"
          addCollaborators={addCollaborators}
          collaborators={collaborators}
          href={href}
          onClick={onClick}
          role={role}
          // $FlowFixMe[incompatible-type]
          ref={avatarRef}
          size={size}
        />
      ),
    );

  it('renders xs display-only AvatarGroup with image', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      size: 'xs',
    });
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
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    const ref = createRef<mixed>();
    renderCmp({
      collaborators: [
        {
          name: 'Keerthi',
          src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
        },
      ],
      onClick: onClickMock,
      role: 'button',
      // $FlowFixMe[incompatible-call]
      avatarRef: ref,
    });
    expect(ref.current instanceof HTMLDivElement).toEqual(true);
    fireEvent.click(screen.getByAltText('Keerthi'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should render clickable TapArea with link role and ref', () => {
    const onClickMock = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
    >();
    const ref = createRef<mixed>();
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
      // $FlowFixMe[incompatible-call]
      avatarRef: ref,
    });
    expect(ref.current instanceof HTMLAnchorElement).toEqual(true);
    fireEvent.click(screen.getByAltText('Keerthi'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should not call onClick when clicked on display-only role', () => {
    const onClickMock = jest.fn<
      [
        {|
          dangerouslyDisableOnNavigation: () => void,
          event:
            | SyntheticMouseEvent<HTMLDivElement>
            | SyntheticKeyboardEvent<HTMLDivElement>
            | SyntheticMouseEvent<HTMLAnchorElement>
            | SyntheticKeyboardEvent<HTMLAnchorElement>,
        |},
      ],
      void,
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
