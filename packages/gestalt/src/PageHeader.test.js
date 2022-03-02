// @flow strict
import { create } from 'react-test-renderer';
import PageHeader from './PageHeader.js';
import Button from './Button.js';
import Link from './Link.js';

describe('PageHeader', () => {
  it('renders', () => {
    const tree = create(<PageHeader title="Settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders subtext', () => {
    const tree = create(<PageHeader title="Settings" subtext="5 followers" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders within a max width', () => {
    const tree = create(
      <PageHeader title="Settings" subtext="5 followers" maxWidth="60%" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders primary action', () => {
    const tree = create(
      <PageHeader
        title="Settings"
        primaryAction={<Button size="lg" color="red" text="Create" />}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary action', () => {
    const tree = create(
      <PageHeader
        title="Settings"
        primaryAction={<Button size="lg" color="red" text="Create" />}
        secondaryAction={<Link href="www.pinterest.com">Help center</Link>}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
