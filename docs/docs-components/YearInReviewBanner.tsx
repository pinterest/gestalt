import { ReactNode } from 'react';
import Lottie from 'lottie-react';
import { Box, ButtonLink, Flex, Heading, TapAreaLink, Text, useReducedMotion } from 'gestalt';
import { TOKEN_COLOR_BORDER_DEFAULT } from 'gestalt-design-tokens';
import Asterisk from '../graphics/year-in-review/asteriskFilled.svg';
import DonutHalf from '../graphics/year-in-review/donutHalf.svg';
import discoStars from '../graphics/year-in-review/lottie/discoStars.json';

export default function YearInReviewBanner() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-label="Check out the 2022 Gestalt Recap" role="banner">
      <TapAreaLink accessibilityLabel="2022 Year In Review" href="/year_in_review_2022">
        <Box
          alignItems="center"
          color="infoWeak"
          dangerouslySetInlineStyle={{
            __style: {
              border: `2px solid ${TOKEN_COLOR_BORDER_DEFAULT}`,
            },
          }}
          display="flex"
          justifyContent="around"
          minHeight="140px"
          overflow="hidden"
          paddingX={12}
          paddingY={4}
          width="100%"
        >
          <Flex alignItems="center" flex="grow" gap={6} justifyContent="end" wrap>
            <Box display="none" height="100%" mdDisplay="block" position="relative">
              <Flex alignItems="end">
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      transform: 'rotate(-45deg)',
                    },
                  }}
                >
                  <DonutHalf height="50px" width="50px" />
                </Box>
                <Box display="none" height="160px" marginTop={-6} mdDisplay="block" width="200px">
                  <Lottie animationData={discoStars} autoplay={!shouldReduceMotion} />
                </Box>
                <Asterisk height="40px" width="40px" />
              </Flex>
            </Box>
            <Flex.Item flex="grow">
              <Flex direction="column" flex="grow" gap={2}>
                <Heading accessibilityLevel={2} size="500">
                  Hey! Check out our 2022 recap.
                </Heading>
                <Text>We’ve done so much this year and can’t wait to share it with you.</Text>
              </Flex>
            </Flex.Item>
            <ButtonLink
              href="/year_in_review_2022"
              iconEnd="directional-arrow-right"
              size="lg"
              text="View the recap"
            />
          </Flex>
        </Box>
      </TapAreaLink>
    </div>
  );
}
