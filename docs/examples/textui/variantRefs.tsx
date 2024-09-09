import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Label, Link, Switch, TextUI } from 'gestalt';

export default function Example() {
  const [showLongText, setShowLongText] = useState(false);
  const [applyTruncationDetection, setApplyTruncationDetection] = useState(false);

  const text = 'Tag brand partners in your Idea Pins with the paid partnership tool.';

  const veryLongText =
    'Tag brand partners in your Idea Pins with the paid partnership tool. Just make an Idea Pin in the app, add the paid partnership label and tag your partner brand. Once they approve the request, their brand name will show up on your Idea Pin. Brands can also choose to promote your Idea Pins as ads, boosting your reach to even more people. When you use the paid partnership tool, you work directly with brands to define the payment terms and process. Pinterest will not be directly involved in payment.';

  const textRef = useRef<null | HTMLDivElement>(null);
  const [ellipsisActive, setEllipsisActive] = useState(false);

  const isEllipsisActive = (element: HTMLDivElement) =>
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
      <Flex direction="column" gap={8} width="90%">
        <Flex direction="column" gap={2}>
          <Box alignItems="center" display="flex">
            <Box paddingX={2}>
              <Label htmlFor="longText">
                <TextUI>Show long text</TextUI>
              </Label>
            </Box>
            <Switch
              id="longText"
              onChange={() => setShowLongText(!showLongText)}
              switched={showLongText}
            />
          </Box>
          <Box alignItems="center" display="flex">
            <Box paddingX={2}>
              <Label htmlFor="truncation">
                <TextUI>Apply truncation detection</TextUI>
              </Label>
            </Box>
            <Switch
              id="truncation"
              onChange={() => setApplyTruncationDetection(!applyTruncationDetection)}
              switched={applyTruncationDetection}
            />
          </Box>
        </Flex>
        <Flex direction="column">
          <TextUI
            ref={textRef}
            align="start"
            inline
            lineClamp={2}
            title={ellipsisActive && typeof veryLongText === 'string' ? veryLongText : undefined}
          >
            {showLongText ? veryLongText : text}{' '}
            <TextUI inline>
              <Link accessibilityLabel="Visit our Help Site" display="inline" href="#">
                Visit our Help Site
              </Link>
            </TextUI>
          </TextUI>
          {ellipsisActive && applyTruncationDetection ? (
            <TextUI>
              <Link accessibilityLabel="Visit our Help Site" display="inline" href="#">
                Visit our Help Site
              </Link>
            </TextUI>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
}
