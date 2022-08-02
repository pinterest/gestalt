// @flow strict
import { type Node } from 'react';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="Dropdown POC">
      <PageHeader
        name="Dropdown"
        description="MaxHeight test"
        badge="pilot"
        defaultCode={`
      function IntroMenuButtonDropdownExample() {
        const [open, setOpen] = React.useState(false);
        const [selected, setSelected] = React.useState(null);
        const anchorRef = React.useRef(null);
        const onSelect = ({ item }) => setSelected(item);

        const fullData = new Array(100).fill(undefined).map((_, index) => ({ value: "item " + index, label: "Item " + index }));

        const fullDropdownItems = fullData.map((item) => (
          <Dropdown.Item
            key={item.value}
            onSelect={onSelect}
            option={item}
            selected={selected}
          />
        ))

        return (
          <Flex justifyContent="center">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              accessibilityControls="demo-dropdown-example"
              accessibilityExpanded={open}
              accessibilityHaspopup
              iconEnd="arrow-down"
              onClick={() => setOpen((prevVal) => !prevVal)}
              ref={anchorRef}
              selected={open}
              size="lg"
              text="Menu"
            />
            {open && (
              <Dropdown anchor={anchorRef.current} id="demo-dropdown-example" onDismiss={() => setOpen(false)} idealDirection="top">
               {fullDropdownItems}
              </Dropdown>
            )}
          </Flex>
        );
      }`}
      />
    </Page>
  );
}
