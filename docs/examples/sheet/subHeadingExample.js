// @flow strict
import React, { type Node } from 'react';
import { Box, Button, CompositeZIndex, FixedZIndex, Flex, Layer, Sheet, Tabs, Text } from 'gestalt';

function SheetWithSubheading({ onDismiss }: {| onDismiss: () => void |}) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const enRef = React.useRef();
  const esRef = React.useRef();
  const ptRef = React.useRef();
  const chRef = React.useRef();
  const refs = [enRef, esRef, ptRef, chRef];

  const handleChangeTab = ({ activeTabIndex: activeTabIndexLocal, event }) => {
    event.preventDefault();
    setActiveTabIndex(activeTabIndexLocal);
    refs[activeTabIndexLocal].current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Sheet
      accessibilityDismissButtonLabel="Close"
      accessibilitySheetLabel="Example sheet to demonstrate subHeading"
      heading="Sheet with subHeading"
      onDismiss={onDismiss}
      footer={
        <Flex justifyContent="end">
          <Button color="red" text="Apply changes" />
        </Flex>
      }
      size="md"
      subHeading={
        <Box marginBottom={4} marginStart={8} marginEnd={8}>
          <Tabs
            tabs={[
              {
                text: 'English',
                href: '#',
              },
              {
                text: 'Español',
                href: '#',
              },
              {
                text: 'Português',
                href: '#',
              },
              {
                text: '普通话',
                href: '#',
              },
            ]}
            activeTabIndex={activeTabIndex}
            onChange={handleChangeTab}
          />
        </Box>
      }
    >
      <Box marginBottom={8} ref={enRef}>
        <Text weight="bold">English</Text>
        <Text>
          <ol>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Eight</li>
            <li>Nine</li>
            <li>Ten</li>
          </ol>
        </Text>
      </Box>
      <Box marginBottom={8} ref={esRef}>
        <Text weight="bold">Español</Text>
        <Text>
          <ol>
            <li>Uno</li>
            <li>Dos</li>
            <li>Tres</li>
            <li>Cuatro</li>
            <li>Cinco</li>
            <li>Seis</li>
            <li>Siete</li>
            <li>Ocho</li>
            <li>Nueve</li>
            <li>Diez</li>
          </ol>
        </Text>
      </Box>
      <Box marginBottom={8} ref={ptRef}>
        <Text weight="bold">Português</Text>
        <Text>
          <ol>
            <li>Um</li>
            <li>Dois</li>
            <li>Três</li>
            <li>Quatro</li>
            <li>Cinco</li>
            <li>Seis</li>
            <li>Sete</li>
            <li>Oito</li>
            <li>Nove</li>
            <li>Dez</li>
          </ol>
        </Text>
      </Box>
      <Box marginBottom={8} ref={chRef}>
        <Text weight="bold">普通话</Text>
        <Text>
          <ol>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
            <li>七</li>
            <li>八</li>
            <li>九</li>
            <li>十</li>
          </ol>
        </Text>
      </Box>
    </Sheet>
  );
}

export default function SubheadingExample(): Node {
  const [shouldShow, setShouldShow] = React.useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  return (
    <React.Fragment>
      <Box padding={8}>
        <Button text="View subheading example" onClick={() => setShouldShow(true)} />
      </Box>
      {shouldShow && (
        <Layer zIndex={sheetZIndex}>
          <SheetWithSubheading onDismiss={() => setShouldShow(false)} />
        </Layer>
      )}
    </React.Fragment>
  );
}
