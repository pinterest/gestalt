// @flow strict
import { type Node, useRef, useState } from 'react';
import {
  Box,
  Button,
  ComboBox,
  CompositeZIndex,
  Dropdown,
  FixedZIndex,
  Flex,
  Heading,
  Layer,
  Modal,
  OverlayPanel,
  RadioGroup,
  TextField,
} from 'gestalt';

export default function ScrollBoundaryContainerExample(): Node {
  const [showComponent, setShowComponent] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] =
    useState<?{| label: string, subtext?: string, value: string |}>(null);
  const [parentComponent, setParentComponent] = useState('modal');
  const anchorDropdownRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const handleSelect = ({
    item,
  }: {|
    event: SyntheticInputEvent<HTMLInputElement>,
    item: {| label: string, subtext?: string, value: string |},
  |}) => setSelected(item);

  const MODAL_Z_INDEX = new FixedZIndex(11);

  const ANCHORED_Z_INDEX = new CompositeZIndex([MODAL_Z_INDEX]);

  const footer = (
    <Box flex="grow" paddingX={3} paddingY={3}>
      <Box
        justifyContent="end"
        marginStart={-1}
        marginEnd={-1}
        marginTop={-1}
        marginBottom={-1}
        display="flex"
        wrap
      >
        <Box paddingX={1} paddingY={1}>
          <Button text="Cancel" size="lg" onClick={() => setShowComponent(false)} />
        </Box>
        <Box paddingX={1} paddingY={1}>
          <Button
            text="Save"
            color="red"
            size="lg"
            type="submit"
            onClick={() => setShowComponent(false)}
          />
        </Box>
      </Box>
    </Box>
  );

  const children = (
    <Flex justifyContent="center">
      <Box
        direction="column"
        display="flex"
        marginStart={-3}
        marginEnd={-3}
        marginBottom={-3}
        marginTop={-3}
        maxWidth={800}
        width="100%"
        wrap
      >
        <Box display="flex" justifyContent="start" padding={3}>
          <Button
            accessibilityControls="subtext-dropdown-example"
            accessibilityHaspopup
            accessibilityExpanded={open}
            accessibilityLabel="Select Previous Address"
            selected={open}
            iconEnd="arrow-down"
            text="Select Previous Address"
            onClick={() => setOpen((prevVal) => !prevVal)}
            ref={anchorDropdownRef}
          />
          {open && (
            <Dropdown
              anchor={anchorDropdownRef.current}
              id="subtext-dropdown-example"
              onDismiss={() => {
                setOpen(false);
              }}
              zIndex={ANCHORED_Z_INDEX}
            >
              <Dropdown.Item
                onSelect={handleSelect}
                option={{
                  value: 'Headquarters San Francisco',
                  label: 'Headquarters San Francisco',
                  subtext: '321 Inspiration Street, Suite # 12',
                }}
                selected={selected}
              />
              <Dropdown.Item
                onSelect={handleSelect}
                option={{
                  value: 'Headquarters Seattle',
                  label: 'Headquarters Seattle',
                  subtext: '123 Creativity Street, Suite # 21',
                }}
                selected={selected}
              />
            </Dropdown>
          )}
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <Heading accessibilityLevel={2} size="400">
            Billing Address
          </Heading>
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField id="Address_Name" label="Address Name" onChange={() => {}} />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField id="Business_Name" label="Business Name" onChange={() => {}} />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField id="Address_Line_1" label="Address Line 1" onChange={() => {}} />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <TextField id="Address_Line_2" label="Address Line 2" onChange={() => {}} />
        </Box>
        <Box flex="grow" paddingX={3} paddingY={3}>
          <Box display="flex" marginStart={-3} marginEnd={-3} marginBottom={-3} marginTop={-3} wrap>
            <Box flex="grow" paddingX={3} paddingY={3}>
              <TextField id="City" label="City" onChange={() => {}} />
            </Box>
            <Box flex="grow" paddingX={3} paddingY={3}>
              <TextField
                id="State_Province_Region"
                label="State/Province/Region"
                onChange={() => {}}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <ComboBox
          id="Country"
          accessibilityClearButtonLabel="Clear countries"
          options={[
            {
              value: 'United States',
              label: 'United States',
            },
            {
              value: 'Canada',
              label: 'Canada',
            },
            {
              value: 'United Kingdom',
              label: 'United Kingdom',
            },
            {
              value: 'Brazil',
              label: 'Brazil',
            },
            {
              value: 'Japan',
              label: 'Japan',
            },
          ]}
          onChange={() => {}}
          onSelect={() => {}}
          placeholder="Select a Country"
          noResultText="No Results"
          label="Country"
          inputValue="United States"
        />
      </Box>
    </Flex>
  );

  return (
    <Box padding={4} height="100%">
      <RadioGroup id="example" legend="Select Modal or OverlayPanel">
        <RadioGroup.RadioButton
          checked={parentComponent === 'modal'}
          id="modal"
          label="Open Modal"
          name="parentComponent"
          onChange={() => setParentComponent('modal')}
          value="modal"
        />
        <RadioGroup.RadioButton
          checked={parentComponent === 'overlaypanel'}
          id="overlaypanel"
          label="Open OverlayPanel"
          name="parentComponent"
          onChange={() => setParentComponent('overlaypanel')}
          value="overlaypanel"
        />
        <Button text="Update Billing Address" onClick={() => setShowComponent(true)} />
      </RadioGroup>
      {showComponent && (
        <Layer zIndex={MODAL_Z_INDEX}>
          {parentComponent === 'modal' ? (
            <Modal
              accessibilityModalLabel=""
              heading="Billing Information"
              footer={footer}
              onDismiss={() => setShowComponent(false)}
              size="lg"
            >
              {children}
            </Modal>
          ) : (
            <OverlayPanel
              accessibilityDismissButtonLabel="Dismiss Billing Information OverlayPanel"
              accessibilityLabel=""
              heading="Billing Information"
              footer={footer}
              onDismiss={() => setShowComponent(false)}
              size="lg"
            >
              {children}
            </OverlayPanel>
          )}
        </Layer>
      )}
    </Box>
  );
}
