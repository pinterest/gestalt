// @flow strict
import { Fragment, type Node, useRef, useState } from 'react';
import { Button, Dropdown, IconButton, PageHeader, Tooltip } from 'gestalt';

export default function SecondaryActionsExample(): Node {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<
    $ReadOnlyArray<{| label: string, subtext?: string, value: string |}>,
  >([]);
  const anchorRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const handleSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => {
    if (selected.some((selectedItem) => selectedItem.value === item.value)) {
      setSelected((selectedLocal) =>
        selectedLocal.filter((selectedItem) => selectedItem.value !== item.value),
      );
    } else {
      setSelected((selectedLocal) => [...selectedLocal, item]);
    }
  };

  return (
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
          <Fragment>
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
          </Fragment>
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
  );
}
