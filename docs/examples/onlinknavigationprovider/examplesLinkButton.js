// @flow strict
import { type Node, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Image,
  Link,
  Mask,
  OnLinkNavigationProvider,
  RadioGroup,
  TapArea,
  Text,
} from 'gestalt';

export default function Example(): Node {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');

  const useOnNavigation = ({ href }: {| href: string, target?: null | 'self' | 'blank' |}) => {
    const onNavigationClick = ({ event }: {| +event: SyntheticEvent<> |}) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
    };

    return onNavigationClick;
  };

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <OnLinkNavigationProvider
        onNavigation={onNavigationMode === 'custom' ? useOnNavigation : undefined}
      >
        <Flex direction="column" gap={2}>
          <Flex direction="column" gap={2}>
            <RadioGroup id="navigation-type" legend="Navigation type">
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'default'}
                id="default1"
                label="Default Link Navigation"
                name="default"
                onChange={() => setOnNavigationMode('default')}
                value="default"
              />
              <RadioGroup.RadioButton
                checked={onNavigationMode === 'custom'}
                id="custom1"
                label="Custom OnLinkNavigationProvider Navigation"
                name="custom"
                onChange={() => setOnNavigationMode('custom')}
                value="custom"
              />
            </RadioGroup>
            <Divider />
          </Flex>

          <Flex gap={4} alignItems="center">
            <Text>
              <Link href="#">Visit pinterest.com</Link>
            </Text>

            <Button href="#" role="link" text="Visit pinterest.com" />

            <IconButton
              href="#"
              accessibilityLabel="Link IconButton"
              icon="visit"
              iconColor="darkGray"
              role="link"
              size="lg"
            />

            <Box width={100}>
              <TapArea href="#" role="link" rounding={2}>
                <Box color="tertiary" rounding={4} borderStyle="sm">
                  <Mask rounding={2}>
                    <Image
                      alt="Antelope Canyon"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                    />
                  </Mask>
                </Box>
              </TapArea>
            </Box>
          </Flex>
        </Flex>
      </OnLinkNavigationProvider>
    </Flex>
  );
}
