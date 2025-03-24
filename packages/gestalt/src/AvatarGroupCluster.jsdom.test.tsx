import { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import AvatarGroupCluster from './AvatarGroupCluster';

describe('AvatarGroup', () => {
  const renderCmp = ({
    collaborators,
    size,
  }: {
    collaborators: ComponentProps<typeof AvatarGroupCluster>['collaborators'];
    size?: ComponentProps<typeof AvatarGroupCluster>['size'];
  }) => render(<AvatarGroupCluster collaborators={collaborators} size={size} />);

  it('renders null for a single collaborator', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
          src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
        },
      ],
      size: 'sm',
    });

    expect(screen.queryByRole('img', { name: 'A' })).not.toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders null for none collaborators', () => {
    const { baseElement } = renderCmp({
      collaborators: [],
      size: 'sm',
    });

    expect(screen.queryByRole('img')).not.toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders sm AvatarGroupCluster with 2 collaborators images', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
          src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
        },
        {
          name: 'B',
          color: 2,
          src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
        },
      ],
      size: 'sm',
    });

    expect(screen.getByRole('img', { name: 'A' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'B' })).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders md AvatarGroupCluster with 2 collaborators initial', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
        },
        {
          name: 'B',
          color: 2,
        },
      ],
      size: 'sm',
    });
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img', { name: 'A' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'B' })).not.toBeTruthy();
    expect(screen.getAllByText('A')).toBeTruthy();
    expect(screen.getAllByText('B')).toBeTruthy();
  });

  it('renders sm AvatarGroupCluster with 3 collaborators images', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
          src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
        },
        {
          name: 'B',
          color: 2,
          src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
        },
        {
          name: 'C',
          color: 3,
          src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
        },
      ],
      size: 'sm',
    });

    expect(screen.getByRole('img', { name: 'A' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'B' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'C' })).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders md AvatarGroupCluster with 3 collaborators initial', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
        },
        {
          name: 'B',
          color: 2,
        },
        {
          name: 'C',
          color: 3,
        },
      ],
      size: 'sm',
    });
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img', { name: 'A' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'B' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'C' })).not.toBeTruthy();
    expect(screen.getAllByText('A')).toBeTruthy();
    expect(screen.getAllByText('B')).toBeTruthy();
    expect(screen.getAllByText('C')).toBeTruthy();
  });

  it('renders sm AvatarGroupCluster with 4 collaborators images', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
          src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
        },
        {
          name: 'B',
          color: 2,
          src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
        },
        {
          name: 'C',
          color: 3,
          src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
        },
        { name: 'D', color: 4, src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg' },
      ],
      size: 'sm',
    });

    expect(screen.getByRole('img', { name: 'A' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'B' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'C' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'D' })).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders md AvatarGroupCluster with 4 collaborators initial', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
        },
        {
          name: 'B',
          color: 2,
        },
        {
          name: 'C',
          color: 3,
        },
        {
          name: 'D',
          color: 4,
        },
      ],
      size: 'sm',
    });
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img', { name: 'A' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'B' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'C' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'D' })).not.toBeTruthy();
    expect(screen.getAllByText('A')).toBeTruthy();
    expect(screen.getAllByText('B')).toBeTruthy();
    expect(screen.getAllByText('C')).toBeTruthy();
    expect(screen.getAllByText('D')).toBeTruthy();
  });

  it('renders md AvatarGroupCluster with +4 collaborators', () => {
    const { baseElement } = renderCmp({
      collaborators: [
        {
          name: 'A',
          color: 1,
        },
        {
          name: 'B',
          color: 2,
        },
        {
          name: 'C',
          color: 3,
        },
        {
          name: 'D',
          color: 4,
        },
        {
          name: 'E',
          color: 5,
        },
      ],
      size: 'sm',
    });
    expect(baseElement).toMatchSnapshot();
    expect(screen.queryByRole('img', { name: 'A' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'B' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'C' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'D' })).not.toBeTruthy();
    expect(screen.queryByRole('img', { name: 'E' })).not.toBeTruthy();
    expect(screen.getAllByText('A')).toBeTruthy();
    expect(screen.getAllByText('B')).toBeTruthy();
    expect(screen.getAllByText('C')).toBeTruthy();
    expect(screen.queryAllByText('D')).not.toBeTruthy();
    expect(screen.queryAllByText('E')).not.toBeTruthy();
  });
});
