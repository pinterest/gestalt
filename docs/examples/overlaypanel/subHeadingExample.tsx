import { Fragment, useRef, useState } from 'react';
import {
  Box,
  Button,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Layer,
  List,
  OverlayPanel,
  Tabs,
  Text,
} from 'gestalt';

export default function SubheadingExample() {
  const [showComponent, setShowComponent] = useState(true);
  const HEADER_ZINDEX = new FixedZIndex(10);
  const sheetZIndex = new CompositeZIndex([HEADER_ZINDEX]);

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const enRef = useRef<null | HTMLElement>(null);
  const esRef = useRef<null | HTMLElement>(null);
  const ptRef = useRef<null | HTMLElement>(null);
  const chRef = useRef<null | HTMLElement>(null);
  const refs = [enRef, esRef, ptRef, chRef];

  const handleChangeTab = ({
    activeTabIndex: activeTabIndexLocal,
    event,
  }: {
    readonly activeTabIndex: number;
    dangerouslyDisableOnNavigation: () => void;
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
  }) => {
    event.preventDefault();
    setActiveTabIndex(activeTabIndexLocal);
    refs[activeTabIndexLocal]?.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <Fragment>
      <Box padding={8}>
        <Button onClick={() => setShowComponent(true)} text="View subheading example" />
      </Box>
      {showComponent && (
        <Layer zIndex={sheetZIndex}>
          <OverlayPanel
            accessibilityDismissButtonLabel="Close"
            accessibilityLabel="Example overlay panel to demonstrate subHeading"
            footer={
              <Flex justifyContent="end">
                <Button color="red" text="Apply changes" />
              </Flex>
            }
            heading="OverlayPanel with subHeading"
            onDismiss={() => setShowComponent(false)}
            size="md"
            subHeading={
              <Box marginBottom={4} marginEnd={8} marginStart={8}>
                <Tabs
                  activeTabIndex={activeTabIndex}
                  onChange={handleChangeTab}
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
                />
              </Box>
            }
          >
            <Flex direction="column" gap={2}>
              <Box ref={enRef}>
                <List label={<Text weight="bold">English</Text>}>
                  <List.Item text="One" />
                  <List.Item text="Two" />
                  <List.Item text="Three" />
                  <List.Item text="Four" />
                  <List.Item text="Five" />
                  <List.Item text="Six" />
                  <List.Item text="Seven" />
                  <List.Item text="Eight" />
                  <List.Item text="Nine" />
                  <List.Item text="Ten" />
                </List>
              </Box>

              <Box ref={esRef}>
                <List label={<Text weight="bold">Español</Text>}>
                  <List.Item text="Dos" />
                  <List.Item text="Tres" />
                  <List.Item text="Cuatro" />
                  <List.Item text="Cinco" />
                  <List.Item text="Seis" />
                  <List.Item text="Siete" />
                  <List.Item text="Ocho" />
                  <List.Item text="Nueve" />
                  <List.Item text="Diez" />
                </List>
              </Box>

              <Box ref={ptRef}>
                <List label={<Text weight="bold">Português</Text>}>
                  <List.Item text="Um" />
                  <List.Item text="Dois" />
                  <List.Item text="Três" />
                  <List.Item text="Quatro" />
                  <List.Item text="Cinco" />
                  <List.Item text="Seis" />
                  <List.Item text="Sete" />
                  <List.Item text="Oito" />
                  <List.Item text="Nove" />
                  <List.Item text="Dez" />
                </List>
              </Box>

              <Box ref={chRef}>
                <List label={<Text weight="bold">普通话</Text>}>
                  <List.Item text="一" />
                  <List.Item text="二" />
                  <List.Item text="三" />
                  <List.Item text="四" />
                  <List.Item text="五" />
                  <List.Item text="六" />
                  <List.Item text="七" />
                  <List.Item text="八" />
                  <List.Item text="九" />
                  <List.Item text="十" />
                </List>
              </Box>
            </Flex>
          </OverlayPanel>
        </Layer>
      )}
    </Fragment>
  );
}
