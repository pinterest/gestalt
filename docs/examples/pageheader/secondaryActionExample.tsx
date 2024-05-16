import {Fragment, ReactNode, useRef, useState} from 'react';
import { Button, Divider, Dropdown, Flex, IconButton, PageHeader, Tooltip } from 'gestalt';

export default function SecondaryActionsExample() {
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
        dropdownAccessibilityLabel="Additional options"
        primaryAction={{
          component: <Button color="red" size="lg" text="Create product group" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-product-group"
              onSelect={() => {}}
              option={{
                value: 'Create product group',
                label: 'Create product group',
              }}
            />,
          ],
        }}
        secondaryAction={{
          component: <Button size="lg" text="Promote" />,
          dropdownItems: [
            <Dropdown.Item
              key="promote"
              onSelect={() => {}}
              option={{ value: 'Promote', label: 'Promote' }}
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
          component: <Button color="red" size="lg" text="Create new report" />,
          dropdownItems: [
            <Dropdown.Item
              key="create-new-report"
              onSelect={() => {}}
              option={{
                value: 'Create new report',
                label: 'Create new report',
              }}
            />,
          ],
        }}
        secondaryAction={{
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
                    key="share-report"
                    onSelect={handleSelect}
                    option={{
                      value: 'Share report',
                      label: 'Share report',
                    }}
                    selected={selected}
                  />
                  <Dropdown.Item
                    onSelect={handleSelect}
                    option={{ value: 'Help center', label: 'Help center' }}
                    selected={selected}
                  />
                  <Dropdown.Item
                    badge={{ text: 'New' }}
                    onSelect={handleSelect}
                    option={{
                      value: 'Delete',
                      label: 'Delete',
                    }}
                    selected={selected}
                  />
                </Dropdown>
              )}
            </Fragment>
          ),
          dropdownItems: [
            <Dropdown.Item
              key="share-report"
              onSelect={() => {}}
              option={{ value: 'Share report', label: 'Share report' }}
            />,
            <Dropdown.Link
              key="visit-help-center"
              href=""
              isExternal
              option={{
                value: 'Visit help center',
                label: 'Visit help center',
              }}
            />,
            <Dropdown.Item
              key="delete-report"
              onSelect={() => {}}
              option={{ value: 'Delete report', label: 'Delete report' }}
            />,
          ],
        }}
        title="Custom reports"
      />
    </Flex>
  );
}
