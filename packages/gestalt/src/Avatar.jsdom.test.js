// @flow strict
import { fireEvent, render } from '@testing-library/react';
import Avatar from './Avatar.js';

describe('Avatar', () => {
  it('renders multi-byte character initial', () => {
    const { container } = render(<Avatar name="💩 astral" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with an empty name shows default icon', () => {
    const { container } = render(<Avatar name="" />);
    expect(container).toMatchSnapshot();
  });

  it('renders an outline', () => {
    const { container } = render(<Avatar name="Jenny" outline />);
    expect(container).toMatchSnapshot();
  });

  it('renders the verified icon', () => {
    const { container } = render(<Avatar name="Jammy" verified />);
    expect(container).toMatchSnapshot();
  });

  it('renders the correct src', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the correct size - xs', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="xs" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the correct size - sm', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="sm" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the correct size - md', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="md" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the correct size - lg', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="lg" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the correct size - xl', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="xs" />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the checkmark on verified default', () => {
    const { container } = render(
      <Avatar name="Strava" src="http://pinterest.com/img/strave.png" size="md" verified />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Avatar handles Image error by rendering the default avatar', () => {
    const { getByAltText, getByText } = render(<Avatar name="Name" src="example.com" />);
    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    fireEvent.error(getByAltText('Name'));

    // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
    expect(getByText('N')).toBeTruthy();
    expect(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries -- Please fix the next time this file is touched!
      getByText('T');
    }).toThrow('Unable to find an element with the text: T');
  });
});
