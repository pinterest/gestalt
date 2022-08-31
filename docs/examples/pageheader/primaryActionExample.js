// @flow strict
import React, { type Node } from 'react';
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
import LINKS from '../../docs-components/LINK_REPOSITORY.js';

export default function PrimaryActionExample(): Node {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
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
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create group" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-group"
              option={{ value: 'Create group', label: 'Create group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Kitchen Reno Ideas"
        primaryAction={{
          component: (
            <React.Fragment>
              <Tooltip idealDirection="up" text="Board options">
                <IconButton
                  accessibilityControls="page-header-example"
                  accessibilityHaspopup
                  accessibilityExpanded={open}
                  accessibilityLabel="Board options"
                  icon="ellipsis"
                  iconColor="darkGray"
                  selected={open}
                  onClick={() => setOpen((prevVal) => !prevVal)}
                  ref={anchorRef}
                  size="lg"
                />
              </Tooltip>
              {open && (
                <Dropdown
                  id="page-header-example"
                  anchor={anchorRef.current}
                  onDismiss={() => {
                    setOpen(false);
                  }}
                >
                  <Dropdown.Item
                    onSelect={handleSelect}
                    selected={selected}
                    option={{
                      value: 'Edit Board',
                      label: 'Edit Board',
                    }}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    selected={selected}
                    option={{ value: 'Share', label: 'Share' }}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    selected={selected}
                    badge={{ text: 'New' }}
                    option={{
                      value: 'Merge',
                      label: 'Merge',
                    }}
                  />
                </Dropdown>
              )}
            </React.Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              key="edit-board"
              option={{ value: 'Edit board', label: 'Edit board' }}
              onSelect={() => {}}
            />,
            <Dropdown.Item
              key="share-board"
              option={{ value: 'Share board', label: 'Share board' }}
              onSelect={() => {}}
            />,
            <Dropdown.Item
              key="merge-board"
              option={{ value: 'Merge board', label: 'Merge board' }}
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Ads overview"
        primaryAction={{
          component: (
            <Text weight="bold">
              <Link href={LINKS.PINTEREST_CANONICAL}>Switch to quick ad creation</Link>
            </Text>
          ),
          dropdownItems: [
            <Dropdown.Link
              key="Visit"
              href={LINKS.PINTEREST_CANONICAL}
              option={{
                value: 'Switch to quick ad creation',
                label: 'Switch to quick ad creation',
              }}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
    </Flex>
  );
}
