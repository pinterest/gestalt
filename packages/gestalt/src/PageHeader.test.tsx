import { create } from 'react-test-renderer';
import Button from './Button';
import Dropdown from './Dropdown';
import Link from './Link';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders', () => {
    const tree = create(<PageHeader title="Settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders subtext', () => {
    const tree = create(<PageHeader subtext="5 followers" title="Settings" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders badge with type', () => {
    const tree = create(
      <PageHeader badge={{ text: 'Needs attention', type: 'warning' }} title="Settings" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders within a max width', () => {
    const tree = create(
      <PageHeader maxWidth="60%" subtext="5 followers" title="Settings" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders primary action', () => {
    const tree = create(
      <PageHeader
        dropdownAccessibilityLabel="test"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create" />,
          dropdownItems: [
            <Dropdown.Item
              key="Create"
              onSelect={() => {}}
              option={{ value: 'Create', label: 'Create' }}
            />,
          ],
        }}
        title="Settings"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary action', () => {
    const tree = create(
      <PageHeader
        dropdownAccessibilityLabel="test"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create" />,
          dropdownItems: [
            <Dropdown.Item
              key="Create"
              onSelect={() => {}}
              option={{ value: 'Create', label: 'Create' }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Link href="www.pinterest.com">Help center</Link>,
          dropdownItems: [
            <Dropdown.Link
              key="Analytics"
              href="https://pinterest.com"
              iconEnd="visit"
              option={{ value: 'Help center', label: 'Help center' }}
            />,
          ],
        }}
        title="Settings"
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
