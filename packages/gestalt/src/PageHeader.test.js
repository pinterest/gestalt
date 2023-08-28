// @flow strict
import { create } from 'react-test-renderer';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import Link from './Link.js';
import PageHeader from './PageHeader.js';

describe('PageHeader', () => {
  it('renders', () => {
    const tree = create(<PageHeader title="Settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders subtext', () => {
    const tree = create(<PageHeader title="Settings" subtext="5 followers" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders badge with type', () => {
    const tree = create(
      <PageHeader title="Settings" badge={{ text: 'Needs attention', type: 'warning' }} />,
    ).toJSON();
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
        primaryAction={{
          component: <Button size="lg" color="red" text="Create" />,
          dropdownItems: [
            <Dropdown.Item
              key="Create"
              option={{ value: 'Create', label: 'Create' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="test"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary action', () => {
    const tree = create(
      <PageHeader
        title="Settings"
        primaryAction={{
          component: <Button size="lg" color="red" text="Create" />,
          dropdownItems: [
            <Dropdown.Item
              key="Create"
              option={{ value: 'Create', label: 'Create' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Link href="www.pinterest.com">Help center</Link>,
          dropdownItems: [
            <Dropdown.Link
              key="Analytics"
              isExternal
              option={{ value: 'Help center', label: 'Help center' }}
              href="https://pinterest.com"
            />,
          ],
        }}
        dropdownAccessibilityLabel="test"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
