import { type ReactNode } from 'react';
import { Badge, Box, Flex, Heading, TapAreaLink, Text, WashAnimated } from 'gestalt';
import { MIN_SVG_ILLUSTRATION_WIDTH } from './IllustrationSection';
import illustrations, { type Illustrations } from '../graphics/index';

export type Props = {
  backgroundColor: string;
  description?: string;
  headingLevel: 2 | 3;
  href: string;
  image: ReactNode | Illustrations;
  isNew?: boolean;
  title: string;
};

export default function IllustrationCard({
  backgroundColor,
  description,
  headingLevel,
  href,
  image,
  isNew,
  title,
}: Props) {
  // we either render the svg string, or use our lookup table to render the right illustration component
  const Illustration =
    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ 'avatar-group': any; button: any; dropdown: any; icon: any; popover: any; 'segmented-control': any; overlaypanel: any; tooltip: any; }>'. | TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Readonly<{ 'avatar-group': any; button: any; dropdown: any; icon: any; popover: any; 'segmented-control': any; overlaypanel: any; tooltip: any; }>'.
    typeof image === 'string' && illustrations[image] ? illustrations[image] : undefined;

  return (
    <TapAreaLink accessibilityLabel={`${title} page`} href={href}>
      <Box minWidth={MIN_SVG_ILLUSTRATION_WIDTH}>
        <WashAnimated>
          <Flex direction="column" height={320}>
            <Box
              alignItems="center"
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor,
                },
              }}
              display="flex"
              height="60%"
              justifyContent="center"
              rounding={2}
              width="100%"
            >
              {Illustration ? <Illustration /> : image}
            </Box>
            <Box
              color="default"
              direction="column"
              display="flex"
              height="40%"
              justifyContent="start"
              paddingY={6}
            >
              <Flex
                alignItems="baseline"
                direction="row"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Heading accessibilityLevel={headingLevel} size="400">
                  {title}
                </Heading>
                {isNew && <Badge text="New" />}
              </Flex>
              <Box paddingY={2}>
                <Text>{description}</Text>
              </Box>
            </Box>
          </Flex>
        </WashAnimated>
      </Box>
    </TapAreaLink>
  );
}
