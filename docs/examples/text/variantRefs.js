// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Flex, Label, Link, Switch, Text } from 'gestalt';

export default function Example(): Node {
  const [showLongText, setShowLongText] = useState(false);
  const [applyTruncationDetection, setApplyTruncationDetection] = useState(false);

  const text = 'Tag brand partners in your Idea Pins with the paid partnership tool.';

  const veryLongText =
    'Tag brand partners in your Idea Pins with the paid partnership tool. Just make an Idea Pin in the app, add the paid partnership label and tag your partner brand. Once they approve the request, their brand name will show up on your Idea Pin. Brands can also choose to promote your Idea Pins as ads, boosting your reach to even more people. When you use the paid partnership tool, you work directly with brands to define the payment terms and process. Pinterest will not be directly involved in payment.';

  const textRef = useRef<null | HTMLElement>(null);
  const [ellipsisActive, setEllipsisActive] = useState(false);

  const isEllipsisActive = (element: HTMLElement) =>
    element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;

  useEffect(() => {
    const checkEllipsisActive = () => {
      if (textRef.current) {
        if (!ellipsisActive && isEllipsisActive(textRef.current)) {
          setEllipsisActive(true);
        } else if (ellipsisActive && !isEllipsisActive(textRef.current)) {
          setEllipsisActive(false);
        }
      }
    };
    checkEllipsisActive();
    window.addEventListener('resize', checkEllipsisActive);
    return () => {
      window.removeEventListener('resize', checkEllipsisActive);
    };
  });

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex gap={8} direction="column" width="90%">
        <Flex gap={2} direction="column">
          <Box display="flex" alignItems="center">
            <Box paddingX={2} WIDTH>
              <Label htmlFor="longText">
                <Text>Show long text</Text>
              </Label>
            </Box>
            <Switch
              onChange={() => setShowLongText(!showLongText)}
              id="longText"
              switched={showLongText}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <Box paddingX={2}>
              <Label htmlFor="truncation">
                <Text>Apply truncation detection</Text>
              </Label>
            </Box>
            <Switch
              onChange={() => setApplyTruncationDetection(!applyTruncationDetection)}
              id="truncation"
              switched={applyTruncationDetection}
            />
          </Box>
        </Flex>
        <Flex direction="column">
          <Text
            inline
            align="start"
            lineClamp={2}
            ref={textRef}
            title={ellipsisActive && typeof veryLongText === 'string' ? veryLongText : undefined}
          >
            {showLongText ? veryLongText : text}{' '}
            <Text inline>
              <Link accessibilityLabel="Visit our Help Site" href="#" display="inline">
                Visit our Help Site
              </Link>
            </Text>
          </Text>
          {ellipsisActive && applyTruncationDetection ? (
            <Text>
              <Link accessibilityLabel="Visit our Help Site" href="#" display="inline">
                Visit our Help Site
              </Link>
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
