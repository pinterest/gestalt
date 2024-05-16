import {ReactNode, useEffect, useRef, useState} from 'react';
import { Box, Flex, Icon, Image, Mask, PopoverEducational, TapArea, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TapArea fullWidth={false} rounding={3}>
        <Box borderStyle="shadow" padding={3} rounding={3} width={400}>
          <Flex direction="column" gap={3}>
            <Flex>
              <Flex.Item flex="grow">
                <Flex direction="column" gap={1}>
                  <Text size="100">Ideas for you</Text>
                  <Box display="flex">
                    <Text ref={anchorRef} inline weight="bold">
                      <Box marginEnd={2}>Small tattoos</Box>
                    </Text>
                  </Box>
                </Flex>
              </Flex.Item>
              <Flex.Item flex="none">
                <Icon accessibilityLabel="" icon="arrow-forward" />
              </Flex.Item>
            </Flex>
            <Box aria-hidden width="100%">
              <Mask rounding={1} wash>
                <Image
                  alt=""
                  color="rgb(231, 186, 176)"
                  loading="lazy"
                  naturalHeight={181}
                  naturalWidth={698}
                  src="https://i.ibb.co/DWJFWkV/Screenshot-2023-02-24-at-2-27-59-PM.png"
                />
              </Mask>
            </Box>
          </Flex>
        </Box>
      </TapArea>
      {open && (
        <PopoverEducational
          accessibilityLabel={`Description of new "More ideas" feature`}
          anchor={anchorRef.current}
          idealDirection="right"
          message="Explore your recent searches in more details"
          onDismiss={() => {}}
        />
      )}
    </Flex>
  );
}
