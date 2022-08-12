// @flow strict
import React, { type Node } from 'react';
import { Button, Divider, Dropdown, Flex, IconButton, PageHeader, Tooltip } from 'gestalt';

export default function SecondaryActionsExample(): Node {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const anchorRef = React.useRef(null);
  const handleSelect = ({ item }) => {
    if (selected.some((selectedItem) => selectedItem.value === item.value)) {
      setSelected((selectedLocal) =>
        selectedLocal.filter((selectedItem) => selectedItem.value !== item.value),
      );
    } else {
      setSelected((selectedLocal) => [...selectedLocal, item]);
    }
  };

  return (
    <Flex direction="column" flex="grow">
      <PageHeader
        title="Product groups"
        subtext="S. E. All products USD"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create product group" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-product-group"
              option={{ value: 'Create product group', label: 'Create product group' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button text="Promote" size="lg" />,
          dropdownItems: [
            <Dropdown.Item
              option={{ value: 'Promote', label: 'Promote' }}
              key="promote"
              onSelect={() => {}}
            />,
          ],
        }}
        dropdownAccessibilityLabel="Additional options"
      />
      <Divider />
      <PageHeader
        title="Custom reports"
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create new report" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-new-report"
              option={{ value: 'Create new report', label: 'Create new report' }}
              onSelect={() => {}}
            />,
          ],
        }}
        secondaryAction={{
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
                    key="share-report"
                    onSelect={handleSelect}
                    selected={selected}
                    option={{
                      value: 'Share report',
                      label: 'Share report',
                    }}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    selected={selected}
                    option={{ value: 'Help center', label: 'Help center' }}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    selected={selected}
                    badge={{ text: 'New' }}
                    option={{
                      value: 'Delete',
                      label: 'Delete',
                    }}
                  />
                </Dropdown>
              )}
            </React.Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              key="share-report"
              option={{ value: 'Share report', label: 'Share report' }}
              onSelect={() => {}}
            />,
            <Dropdown.Link
              key="visit-help-center"
              href=""
              option={{ value: 'Visit help center', label: 'Visit help center' }}
              isExternal
            />,
            <Dropdown.Item
              key="delete-report"
              option={{ value: 'Delete report', label: 'Delete report' }}
              onSelect={() => {}}
            />,
          ],
        }}
      />
    </Flex>
  );
}
