// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Flex, Icon, Image, Mask, PopoverEducational, TapArea, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  const anchorRefA = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);
  const anchorRefB = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <Box height="100%" padding={12} width="100%">
      <Flex alignItems="start" direction="column" height="100%" justifyContent="between">
        <Box>
          <TapArea ref={anchorRefA} fullWidth={false} rounding={3}>
            <Box color="secondary" height={75} padding={3} rounding={3} width={200}>
              <Flex gap={2}>
                <Box aria-hidden width={50}>
                  <Mask rounding={3} wash>
                    <Image
                      alt="Image of a Spanish paella from above. Yellow rice with red peppers and shrimp on top."
                      color="rgb(231, 186, 176)"
                      loading="lazy"
                      naturalHeight={1}
                      naturalWidth={1}
                      src="https://i.ibb.co/d2tpDss/IMG-0494.jpg"
                    />
                  </Mask>
                </Box>
                <Flex direction="column">
                  <Text size="100">More ideas for</Text>
                  <Text weight="bold">Food, Drinks, Snacks</Text>
                </Flex>
              </Flex>
            </Box>
          </TapArea>
          {openA && (
            <PopoverEducational
              accessibilityLabel={`Description of new "More ideas" feature`}
              anchor={anchorRefA.current}
              idealDirection="right"
              message="Tap to tag a product to see product details"
              onDismiss={() => {}}
            />
          )}
        </Box>

        <Box>
          <TapArea fullWidth={false} rounding={3}>
            <Box borderStyle="shadow" padding={3} rounding={3} width={350}>
              <Flex direction="column" gap={3}>
                <Flex>
                  <Flex.Item flex="grow">
                    <Flex direction="column" gap={1}>
                      <Text size="100">Ideas for you</Text>
                      <Box display="flex">
                        <Text ref={anchorRefB} inline weight="bold">
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
          {openB && (
            <PopoverEducational
              accessibilityLabel={`Description of new "Ideas for you" feature`}
              anchor={anchorRefB.current}
              idealDirection="right"
              message="Explore your recent searches in more details"
              onDismiss={() => {}}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
}
