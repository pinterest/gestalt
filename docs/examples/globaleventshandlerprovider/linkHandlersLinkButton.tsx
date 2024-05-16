import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  Box,
  ButtonLink,
  Divider,
  Flex,
  GlobalEventsHandlerProvider,
  IconButtonLink,
  Image,
  Link,
  Mask,
  RadioGroup,
  TapAreaLink,
  Text,
} from 'gestalt';

export default function Example() {
  const [onNavigationMode, setOnNavigationMode] = useState<'default' | 'custom'>('default');

  const useOnNavigation = useCallback(
    ({
      href,
    }: {
      href: ComponentProps<typeof Link>['href'];
      target?: ComponentProps<typeof Link>['target'];
    }) => {
      const onNavigationClick = ({ event }: { readonly event: React.SyntheticEvent }) => {
        event.preventDefault();
        // eslint-disable-next-line no-alert
        alert(`Disabled link: ${href}. Opening help.pinterest.com instead.`);
      };

      return onNavigationClick;
    },
    [],
  );

  const linkHandlers = useMemo(
    () => ({
      onNavigation: onNavigationMode === 'custom' ? useOnNavigation : undefined,
    }),
    [onNavigationMode, useOnNavigation],
  );

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <GlobalEventsHandlerProvider linkHandlers={linkHandlers}>
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
                label="Custom GlobalEventsHandlerProvider Navigation"
                name="custom"
                onChange={() => setOnNavigationMode('custom')}
                value="custom"
              />
            </RadioGroup>
            <Divider />
          </Flex>

          <Flex alignItems="center" gap={4}>
            <Text>
              <Link href="#">Visit pinterest.com</Link>
            </Text>

            <ButtonLink href="#" text="Visit pinterest.com" />

            <IconButtonLink
              accessibilityLabel="Link IconButton"
              href="#"
              icon="visit"
              iconColor="darkGray"
              size="lg"
            />

            <Box width={100}>
              <TapAreaLink href="#" rounding={2}>
                <Box borderStyle="sm" color="tertiary" rounding={4}>
                  <Mask rounding={2}>
                    <Image
                      alt="Antelope Canyon"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://i.ibb.co/DwYrGy6/stock14.jpg"
                    />
                  </Mask>
                </Box>
              </TapAreaLink>
            </Box>
          </Flex>
        </Flex>
      </GlobalEventsHandlerProvider>
    </Flex>
  );
}
