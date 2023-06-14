// @flow strict
import { type Node } from 'react';
import Lottie from 'lottie-react';
import { Box, Button, Flex, Heading, TapArea, Text, useReducedMotion } from 'gestalt';
import Asterisk from '../graphics/year-in-review/asteriskFilled.svg';
import DonutHalf from '../graphics/year-in-review/donutHalf.svg';
import discoStars from '../graphics/year-in-review/lottie/discoStars.json';

export default function YearInReviewBanner(): Node {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div role="banner" aria-label="Check out the 2022 Gestalt Recap">
      <TapArea role="link" href="/year_in_review_2022" accessibilityLabel="2022 Year In Review">
        <Box
          color="infoWeak"
          dangerouslySetInlineStyle={{
            __style: {
              border: '2px solid var(--color-border-default)',
            },
          }}
          width="100%"
          minHeight="140px"
          paddingX={12}
          paddingY={4}
          display="flex"
          alignItems="center"
          justifyContent="around"
          overflow="hidden"
        >
          <Flex alignItems="center" justifyContent="end" flex="grow" wrap gap={6}>
            <Box display="none" mdDisplay="block" height="100%" position="relative">
              <Flex alignItems="end">
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      transform: 'rotate(-45deg)',
                    },
                  }}
                >
                  <DonutHalf width="50px" height="50px" />
                </Box>
                <Box width="200px" height="160px" marginTop={-6} display="none" mdDisplay="block">
                  <Lottie animationData={discoStars} autoplay={!shouldReduceMotion} />
                </Box>
                <Asterisk width="40px" height="40px" />
              </Flex>
            </Box>
            <Flex.Item flex="grow">
              <Flex direction="column" gap={2} flex="grow">
                <Heading accessibilityLevel={2} size="500">
                  Hey! Check out our 2022 recap.
                </Heading>
                <Text>We’ve done so much this year and can’t wait to share it with you.</Text>
              </Flex>
            </Flex.Item>
            {/* $FlowExpectedError[incompatible-type] */}
            <Button
              selected
              role="link"
              href="/year_in_review_2022"
              text="View the recap"
              iconEnd="directional-arrow-right"
              size="lg"
            />
          </Flex>
        </Box>
      </TapArea>
    </div>
  );
}
