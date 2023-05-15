// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { TapArea, Box, Flex, Mask, Image, Text, PopoverEducational, Icon } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
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
            <Box width="100%" aria-hidden>
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
          idealDirection="right"
          anchor={anchorRef.current}
          onDismiss={() => {}}
          message="Explore your recent searches in more details"
        />
      )}
    </Flex>
  );
}
