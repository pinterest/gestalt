import {Fragment, ReactNode, useRef, useState} from 'react';
import {
  Button,
  Divider,
  Dropdown,
  Flex,
  IconButton,
  Link,
  PageHeader,
  Text,
  Tooltip,
} from 'gestalt';

export default function PrimaryActionExample() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ReadonlyArray<{
    label: string,
    subtext?: string,
    value: string
  }>>([]);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const handleSelect = ({
    item,
  }: {
    event: React.ChangeEvent<HTMLInputElement>,
    item: {
      label: string,
      subtext?: string,
      value: string
    }
  }) => {
    if (selected.some((selectedItem) => selectedItem.value === item.value)) {
      setSelected((localSelected) =>
        localSelected.filter((selectedItem) => selectedItem.value !== item.value),
      );
    } else {
      setSelected((localSelected) => [...localSelected, item]);
    }
  };

  return (
    <Flex direction="column" flex="grow">
      <PageHeader
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-group"
              onSelect={() => {}}
              option={{ value: 'Create group', label: 'Create group' }}
            />,
          ],
        }}
        subtext="S. E. All products USD"
        title="Product groups"
      />
      <Divider />
      <PageHeader
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: (
            <Fragment>
              <Tooltip idealDirection="up" text="Board options">
                <IconButton
                  ref={anchorRef}
                  accessibilityControls="page-header-example"
                  accessibilityExpanded={open}
                  accessibilityHaspopup
                  accessibilityLabel="Board options"
                  icon="ellipsis"
                  iconColor="darkGray"
                  onClick={() => setOpen((prevVal) => !prevVal)}
                  selected={open}
                  size="lg"
                />
              </Tooltip>
              {open && (
                <Dropdown
                  anchor={anchorRef.current}
                  id="page-header-example"
                  onDismiss={() => {
                    setOpen(false);
                  }}
                >
                  <Dropdown.Item
                    onSelect={handleSelect}
                    option={{
                      value: 'Edit Board',
                      label: 'Edit Board',
                    }}
                    selected={selected}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    option={{ value: 'Share', label: 'Share' }}
                    selected={selected}
                  />
                  <Dropdown.Item
                    badge={{ text: 'New' }}
                    onSelect={handleSelect}
                    option={{
                      value: 'Merge',
                      label: 'Merge',
                    }}
                    selected={selected}
                  />
                </Dropdown>
              )}
            </Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              key="edit-board"
              onSelect={() => {}}
              option={{ value: 'Edit board', label: 'Edit board' }}
            />,
            <Dropdown.Item
              key="share-board"
              onSelect={() => {}}
              option={{ value: 'Share board', label: 'Share board' }}
            />,
            <Dropdown.Item
              key="merge-board"
              onSelect={() => {}}
              option={{ value: 'Merge board', label: 'Merge board' }}
            />,
          ],
        }}
        title="Kitchen Reno Ideas"
      />
      <Divider />
      <PageHeader
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: (
            <Text weight="bold">
              <Link href="https://www.pinterest.com">Switch to quick ad creation</Link>
            </Text>
          ),
          dropdownItems: [
            <Dropdown.Link
              key="Visit"
              href="https://www.pinterest.com"
              option={{
                value: 'Switch to quick ad creation',
                label: 'Switch to quick ad creation',
              }}
            />,
          ],
        }}
        title="Ads overview"
      />
    </Flex>
  );
}
