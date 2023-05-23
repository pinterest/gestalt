// @flow strict
import { type Node, useRef, useEffect, useState } from 'react';
import { TapArea, Box, Flex, Mask, Image, Text, PopoverEducational, Icon } from 'gestalt';

export default function Example(): Node {
  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);

  const anchorRefA = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);
  const anchorRefB = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setOpenA(true);
    setOpenB(true);
  }, []);

  return (
    <Box width="100%" height="100%" padding={12}>
      <Flex direction="column" justifyContent="between" alignItems="start" height="100%">
        <Box>
          <TapArea ref={anchorRefA} rounding={3} fullWidth={false}>
            <Box padding={3} color="secondary" height={75} width={200} rounding={3}>
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
              idealDirection="right"
              anchor={anchorRefA.current}
              onDismiss={() => {}}
              message="Tap to tag a product to see product details"
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
