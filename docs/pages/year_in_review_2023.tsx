import { Fragment, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import {
  Box,
  ButtonLink,
  ColorSchemeProvider,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  Icon,
  Link,
  List,
  Text,
  useReducedMotion,
} from 'gestalt';
import {
  TOKEN_COLOR_BACKGROUND_DEFAULT,
  TOKEN_COLOR_BLUE_SKYCICLE_100,
  TOKEN_COLOR_GREEN_MATCHACADO_100,
  TOKEN_COLOR_PINK_FLAMINGLOW_100,
  TOKEN_COLOR_PINK_FLAMINGLOW_200,
  TOKEN_COLOR_WHITE_MOCHIMALIST_0,
} from 'gestalt-design-tokens';
import GestaltLogo from '../docs-components/GestaltLogo';
import Docs from '../graphics/year-in-review-2023/lottie/yir-2023-docs.json';
import DSD from '../graphics/year-in-review-2023/lottie/yir-2023-dsd.json';
import EndGraphic from '../graphics/year-in-review-2023/lottie/yir-2023-footer.json';
import PeoplesChoice from '../graphics/year-in-review-2023/lottie/yir-2023-peoples-choice.json';
import Smiley from '../graphics/year-in-review-2023/lottie/yir-2023-smiley.json';
import Tokens from '../graphics/year-in-review-2023/lottie/yir-2023-tokens.json';
import Twinkle from '../graphics/year-in-review-2023/lottie/yir-2023-twinkle.json';
import VariablesGraphic from '../graphics/year-in-review-2023/lottie/yir-2023-variables.json';
// SVGs
import HeroSVG from '../graphics/year-in-review-2023/yir-2023-intro-hero.svg';
import Quote from '../graphics/year-in-review-2023/yir-2023-quote.svg';
import IntroLine from '../graphics/year-in-review-2023/yir-2023-single-line-intro.svg';

const INTRO_ZINDEX = new FixedZIndex(10);
const BUTTON_ZINDEX = new CompositeZIndex([INTRO_ZINDEX]);
const SIDE_GAP = 8;
const MAX_CONTENT_WIDTH = 660;

type GridProps = {
  description: string;
  number: string;
};

function StatsGrid({ number, description }: GridProps) {
  return (
    <Fragment>
      <p className="statsNumber">{number}</p>
      <p className="statsDescription">{description}</p>
    </Fragment>
  );
}
type AnimationProps = {
  shouldReduceMotion: boolean;
};

function HeroAnimation({ shouldReduceMotion }: AnimationProps) {
  const [animationData, setAnimationData] = useState<null | Record<any, any>>(null);
  useEffect(() => {
    import(`../graphics/year-in-review-2023/lottie/yir-2023-intro-hero.json`).then((res) =>
      setAnimationData(res.default),
    );
  }, []);
  if (!animationData) return <HeroSVG />;
  return <Lottie animationData={animationData} autoplay={!shouldReduceMotion} />;
}

export default function YearInReview2023() {
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    if (document) {
      document.title = `2023 Year in review - Gestalt`;
    }
  }, []);

  return (
    <div className="year-in-review-2023">
      <ColorSchemeProvider colorScheme="light" id="gestalt-yir">
        <Flex direction="column" flex="grow">
          <Box
            left
            mdPadding={8}
            padding={4}
            position="fixed"
            role="navigation"
            top
            zIndex={BUTTON_ZINDEX}
          >
            <Link href="/home">
              <div aria-label="Back to Gestalt Home" className="backButton" role="link">
                <Icon accessibilityLabel="Home" color="dark" icon="home" size={28} />
                <GestaltLogo height={50} width={50} />
              </div>
            </Link>
          </Box>

          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_BACKGROUND_DEFAULT },
            }}
            position="relative"
            width="100%"
          >
            <Flex alignItems="center" direction="column">
              <Box column={6} marginBottom={4} marginTop={12} mdColumn={3}>
                <HeroAnimation shouldReduceMotion={shouldReduceMotion} />
              </Box>
              <Box marginBottom={4}>
                <h1 className="h1Font2023">Year in review</h1>
              </Box>
              <Box marginBottom={8} marginTop={-2}>
                <Flex alignItems="center" gap={3} justifyContent="center">
                  <Box opacity={0}>
                    <Lottie animationData={Twinkle} autoplay={!shouldReduceMotion} />
                  </Box>
                  <Box>
                    <h2 className="gestalt2023">Gestalt 2023 recap</h2>
                  </Box>
                  <Box>
                    <Lottie animationData={Twinkle} autoplay={!shouldReduceMotion} />
                  </Box>
                </Flex>
              </Box>
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    bottom: '1%',
                    right: '-1%',
                  },
                }}
                marginStart={10}
                position="absolute"
                width="50%"
              >
                <IntroLine className="introLineIn" width="100%" />
              </Box>
            </Flex>
          </Box>
          <Flex alignItems="center" direction="column">
            <div className="halfAndHalf">
              <Box
                color="light"
                dangerouslySetInlineStyle={{
                  __style: {
                    border: '4px solid #111111',
                  },
                }}
                margin={4}
                marginTop={8}
                maxWidth={MAX_CONTENT_WIDTH}
                padding={12}
                zIndex={INTRO_ZINDEX}
              >
                <Flex direction="column" gap={4}>
                  <Text size="400">
                    It&apos;s 2024 and everyone at Pinterest Gestalt headquarters is currently
                    gearing up to drive more adoption while improving our governance and
                    contribution models. But our latest initiatives depend heavily on what we
                    accomplished in 2023. So, let&apos;s take one more quick look at all of our 2023
                    highlights so that we feel even better about what&apos;s to come in 2024.{' '}
                    <Text inline size="400" weight="bold">
                      Hint:
                    </Text>{' '}
                    2023 was a winner!
                  </Text>
                </Flex>
              </Box>
            </div>
          </Flex>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_BLUE_SKYCICLE_100 },
            }}
            paddingX={SIDE_GAP}
            paddingY={12}
            position="relative"
          >
            <Flex alignItems="center" direction="column" justifyContent="center">
              <Box lgMarginTop={8}>
                <Heading accessibilityLevel={2} align="center">
                  The people&apos;s choice
                </Heading>
              </Box>
              <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                <Box
                  column={6}
                  display="inlineBlock"
                  justifyContent="center"
                  marginBottom={2}
                  marginTop={12}
                  maxWidth={665}
                  mdColumn={3}
                  overflow="hidden"
                  width="100%"
                >
                  <Lottie animationData={PeoplesChoice} autoplay={!shouldReduceMotion} />
                </Box>

                <Box paddingX={SIDE_GAP} paddingY={12} position="relative">
                  <Text size="400">
                    2023 ushered in Zeroheight&apos;s first-ever{' '}
                    <Link
                      display="inline"
                      externalLinkIcon="default"
                      href="https://zeroheight.com/events/design-system-awards/winners/"
                      rel="nofollow"
                      target="blank"
                    >
                      Design System Awards
                    </Link>
                    . Gestalt was a finalist in five categories and won three awards:{' '}
                    <Text inline size="400" weight="bold">
                      Best Article
                    </Text>{' '}
                    (
                    <Link
                      display="inline"
                      externalLinkIcon="default"
                      href="https://www.figma.com/blog/how-pinterests-design-systems-team-measures-adoption/"
                      rel="nofollow"
                      target="blank"
                    >
                      How Gestalt measures adoption
                    </Link>{' '}
                    by Ravi Lingineni),{' '}
                    <Text inline size="400" weight="bold">
                      Best Collaboration
                    </Text>{' '}
                    and{' '}
                    <Text inline size="400" weight="bold">
                      People&apos;s Choice
                    </Text>
                    . It was great being honored with other amazing design systems teams in the
                    industry. The three awards track with our current internal initiatives: more
                    adoption, more contributions and even more collaboration.
                  </Text>
                  <Text size="400">
                    Want to see proof of our commitment to the people? Check out what some of our
                    design and engineering colleagues have to say!
                  </Text>
                </Box>
              </Flex>
              <Box
                color="light"
                dangerouslySetInlineStyle={{
                  __style: {
                    border: '4px solid #111111',
                  },
                }}
                display="inlineBlock"
                marginBottom={12}
                marginTop={10}
                maxWidth={894}
                padding={8}
              >
                <Box marginBottom={2} maxWidth={56} padding={3}>
                  <Quote />
                </Box>
                <Box maxWidth={644} padding={4}>
                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      I enjoy that I&apos;m able to explore multiple explorations quickly with our
                      Figma library. I&apos;m able to cut the time and effort.
                      <Text align="end" size="400">
                        —Product Designer
                      </Text>
                    </Text>
                  </Box>

                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      Gestalt is always my favorite team to collaborate with!
                      <Text align="end" size="400">
                        —Software Engineer
                      </Text>
                    </Text>
                  </Box>
                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      You are all rockstars and it&apos;s always a great time getting all of your
                      guidance! Thank you for all you do in making sure our product is accessible to
                      everyone.
                      <Text align="end" size="400">
                        —Product Designer
                      </Text>
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_PINK_FLAMINGLOW_200 },
            }}
          >
            <Box paddingX={SIDE_GAP} paddingY={12} position="relative">
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Box marginBottom={8} marginTop={8} paddingX={SIDE_GAP}>
                  <Heading accessibilityLevel={2} align="center">
                    The doc is in
                  </Heading>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_WHITE_MOCHIMALIST_0 },
            }}
          >
            <Box paddingX={SIDE_GAP} paddingY={12} position="relative">
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    2023 was another big year for Gestalt documentation—contributions and
                    collaboration were the name of the game there as well. Our guidelines on{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/foundations/forms/overview"
                      target="blank"
                    >
                      Form patterns
                    </Link>
                    , for example, came as a direct contribution from our colleagues in Advertising
                    design. Similarly, our comprehensive guidelines for{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/foundations/data_visualization/overview"
                    >
                      data visualization
                    </Link>{' '}
                    leveraged research and work done by our Measurement Design teammates.
                  </Text>
                  <Text size="400">
                    A collaboration with our Pinner Design Team yielded solid guidance, specs and
                    Figma components for{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/ios/card/card">
                      Cards and Preview blocks
                    </Link>
                    . We also leaned on our Brand colleagues to release{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/foundations/illustration"
                    >
                      Illustration guidelines
                    </Link>{' '}
                    and assets. This resulted in internal teams using our illustration assets and
                    tips to create delightful moments for their specific surfaces.
                  </Text>
                  <Text size="400">
                    Finally, as we continue to make Pinterest more inclusive, we published guidance
                    on{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/foundations/international_design/about_international_design"
                    >
                      International design
                    </Link>
                    , courtesy of our Pinterest Internationalization Team. This includes in-depth
                    tips and best practices for right-to-left and bi-directional languages.
                  </Text>
                  <Text size="400">
                    But, how can anyone find these things and contribute? Well, in 2023, we also
                    dramatically improved the relevance of our search results. By the second
                    quarter, we&apos;d seen a 27% increase in total queries and a 9% increase in
                    total people performing searches. We also made it easier for people to
                    contribute with a new section on{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/team_support/contributions"
                    >
                      Contributions
                    </Link>{' '}
                    and{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/team_support/overview"
                    >
                      Team support
                    </Link>
                    . In addition, we now provide a Figma toolkit and guidelines for{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/team_support/design_file_hygiene/naming_convention"
                    >
                      file hygiene
                    </Link>{' '}
                    to streamline the contribution and handoff process.
                  </Text>
                </Flex>

                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                      backgroundColor: TOKEN_COLOR_PINK_FLAMINGLOW_100,
                    },
                  }}
                  display="flex"
                  marginBottom={9}
                  marginEnd={12}
                  marginStart={12}
                  marginTop={10}
                  maxWidth={894}
                  minWidth={300}
                  padding={12}
                >
                  <Flex gap={4}>
                    <div className="statsGrid">
                      <StatsGrid description="increase in total search queries" number="27%" />
                      <StatsGrid description="In-product accessibility enhancements" number="9%" />
                      <StatsGrid
                        description="net new foundations, components, and pattern guidelines"
                        number="16"
                      />
                    </div>
                    <Box>
                      <Lottie
                        animationData={Docs}
                        autoplay={!shouldReduceMotion}
                        className="docsGraphic"
                      />
                    </Box>
                  </Flex>
                </Box>
                <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                  <Box marginBottom={8}>
                    <Text size="400">
                      The documentation experience improved for our engineering audience as well. We
                      introduced and migrated to an improved solution for rendering code examples.
                      Code examples can also be seen in dark mode and right-to-left mode. How cool
                      is that?
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: TOKEN_COLOR_GREEN_MATCHACADO_100,
              },
            }}
          >
            <Box marginBottom={12} paddingX={SIDE_GAP} position="relative">
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Box marginBottom={8} marginTop={12} width="75%">
                  <Heading accessibilityLevel={2} align="center">
                    There&apos;s still room for components and tokens
                  </Heading>
                </Box>
                <Box
                  column={6}
                  display="inlineBlock"
                  justifyContent="center"
                  marginBottom={12}
                  marginTop={4}
                  maxWidth={665}
                  mdColumn={3}
                  overflow="hidden"
                  width="100%"
                >
                  <Lottie animationData={Tokens} autoplay={!shouldReduceMotion} />
                </Box>
                <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    If people are the salt and pepper of design systems, then components and tokens
                    are the potatoes and butter? Whatever the case may be, we had plenty of time to
                    continue to add to our components, foundations and token libraries in 2023.
                    There was a significant increase in the amount of native mobile components:
                    <Box marginBottom={4} marginTop={4}>
                      {/* @ts-expect-error - TS2322 - Type '{ children: Element[]; size: string; type: "unordered"; }' is not assignable to type 'IntrinsicAttributes & ListProps & { children?: ReactNode; }'. */}
                      <List size="400" type="unordered">
                        <List.Item text="Fourteen native Android components are readily available in both Figma and code—more soon to follow!" />
                        <List.Item
                          text="Nineteen components documented for iOS, with three
                      currently being adopted in code and five more coded components on the way."
                        />
                      </List>
                    </Box>
                  </Text>
                  <Text size="400">
                    2023 was also a big year for Web components.{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/web/chartgraph">
                      Bar and line graphs
                    </Link>{' '}
                    manipulated by{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/web/tiledata">
                      tiles
                    </Link>{' '}
                    and{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/web/tagdata">
                      tags
                    </Link>
                    !{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/web/sheetmobile">
                      Mobile sheets
                    </Link>{' '}
                    or{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/web/banneroverlay"
                    >
                      overlay banners
                    </Link>
                    —pick the one best suited for you! You want TypesScript support? We have it!
                  </Text>
                  <Text size="400">
                    We also addressed requests from our enterprise and internal tools customers and
                    re-did our spacing tokens to allow for more data density. This prepares us for
                    future theming for those who need denser interfaces and for those who need
                    larger tap areas for AAA accessibility. As part of the deal, we added small,
                    medium and large variants to 3 components:{' '}
                    <Link display="inline" href="https://gestalt.pinterest.systems/web/tag#Size">
                      Tag
                    </Link>
                    ,{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/web/accordion#Sizes"
                    >
                      Accordion
                    </Link>{' '}
                    and{' '}
                    <Link
                      display="inline"
                      href="https://gestalt.pinterest.systems/web/segmentedcontrol#Size"
                    >
                      SegmentedControl
                    </Link>
                    . We hope to continue to provide more components with density variants in 2024.
                  </Text>
                </Flex>
                <Box
                  alignSelf="center"
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                      backgroundColor: TOKEN_COLOR_WHITE_MOCHIMALIST_0,
                    },
                  }}
                  display="inlineBlock"
                  marginBottom={12}
                  marginTop={8}
                  maxWidth={894}
                  padding={10}
                >
                  <Flex alignItems="center" gap={8}>
                    <div className="statsGrid">
                      <StatsGrid description="icons added to our central library" number="39" />
                      <StatsGrid description="native mobile components added" number=" 17" />
                      <StatsGrid description="web components added" number="10" />
                      <StatsGrid description="component fixes and updates" number="231" />
                    </div>
                    <Box>
                      <Lottie animationData={Smiley} autoplay={!shouldReduceMotion} />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box color="light" marginBottom={12}>
            <Box paddingX={SIDE_GAP}>
              <Flex alignItems="center" direction="column" justifyContent="center">
                {/* @ts-expect-error - TS2322 - Type '{ children: Element[]; align: string; paddingY: 12; }' is not assignable to type 'IntrinsicAttributes & Omit<BoxProps, "ref"> & RefAttributes<HTMLDivElement>'. */}
                <Box align="center" paddingY={12}>
                  <Box
                    column={6}
                    display="inlineBlock"
                    justifyContent="center"
                    marginBottom={12}
                    marginTop={12}
                    maxWidth={665}
                    mdColumn={3}
                    overflow="hidden"
                    width="100%"
                  >
                    <Lottie animationData={VariablesGraphic} autoplay={!shouldReduceMotion} />
                  </Box>
                  <Heading accessibilityLevel={2} align="center">
                    From styles to Variables!
                  </Heading>
                </Box>
                <Flex alignItems="start" gap={12} justifyContent="center" wrap>
                  <Flex.Item flexBasis={600}>
                    <Flex direction="column" gap={4}>
                      <Text size="400">
                        While we improved coded components and docs, we also added significant
                        improvements to our Figma libraries. The big one was transforming our Figma
                        libraries to be compatible with the recently-released Figma variables. This
                        makes it easier for designers to convert designs from light mode to dark
                        mode. It also helps them leverage all our density tokens—spacing and
                        corner-rounding can now be applied to components in Figma.
                      </Text>
                      <Text size="400">
                        As always, every new component, token and icon in code was matched by a new
                        component in Figma. But, this year, we also took the time to go back and
                        refine existing components. We updated 26 Figma components to align them
                        with components in our codebase. Finally, we updated our image library to be
                        more inclusive.
                      </Text>
                    </Flex>
                  </Flex.Item>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_BLUE_SKYCICLE_100 },
            }}
            direction="column"
            display="flex"
            justifyContent="center"
            marginTop={8}
            paddingX={SIDE_GAP}
            paddingY={12}
          >
            <Box position="relative" width="100%">
              <Flex alignItems="center" direction="column" gap={12}>
                <Heading accessibilityLevel={2} align="center">
                  Design System Day—yum!
                </Heading>
                <Box
                  column={6}
                  display="inlineBlock"
                  justifyContent="center"
                  marginBottom={12}
                  marginTop={4}
                  maxWidth={665}
                  mdColumn={3}
                  overflow="hidden"
                  width="100%"
                >
                  <Lottie animationData={DSD} autoplay={!shouldReduceMotion} />
                </Box>

                <Flex
                  alignItems="center"
                  direction="column"
                  gap={4}
                  justifyContent="center"
                  maxWidth={MAX_CONTENT_WIDTH}
                >
                  <Text size="400">
                    Our second-annual Design System Day was better than ever. For the first time, we
                    welcomed design professionals from outside Pinterest to our beautiful San
                    Francisco headquarters. They learned and discussed all of your favorite systems
                    and design topics—tokens, accessibility, shifting perspectives and more!
                  </Text>
                  <Text size="400">
                    You can read all about it on our{' '}
                    <Link
                      display="inline"
                      externalLinkIcon="default"
                      href="https://pinterest.design/why-we-host-an-internal-design-systems-conference-3bb6017c6ca2"
                      target="blank"
                    >
                      Pinterest Design blog
                    </Link>
                    . But let&apos;s just leave you with some choice quotes about this awesome event
                    loved by both internal and external participants.
                  </Text>
                </Flex>
                <Box
                  color="light"
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                    },
                  }}
                  display="inlineBlock"
                  marginBottom={12}
                  marginTop={10}
                  maxWidth={894}
                  padding={8}
                >
                  <Box marginBottom={2} maxWidth={56} padding={3}>
                    <Quote />
                  </Box>
                  <Box maxWidth={644} padding={4}>
                    <Box marginBottom={8}>
                      <Text size="400" weight="bold">
                        Only Pinterest can make an online event this much fun! This Design System
                        conference was an example of inspiration and new trends. I met a lot of
                        people and learnt a lot at the event; it felt like I was there in person.
                        Please continue to make it happen every year!
                        <Text align="end" size="400">
                          —UX/UI Designer @ Pinterest
                        </Text>
                      </Text>
                    </Box>

                    <Box marginBottom={8}>
                      <Text size="400" weight="bold">
                        The space was encouraging and I felt very welcomed. It&apos;s really moving
                        to be surrounded by so many people who genuinely care about accessibility
                        and inclusion. I love this community!
                        <Text align="end" size="400">
                          —Software Engineer @ external company
                        </Text>
                      </Text>
                    </Box>
                    <Box marginBottom={8}>
                      <Text size="400" weight="bold">
                        Events like Design System Day are very important as the design system
                        community evolves. It was great to connect with like-minded folks and hear
                        their perspectives on inclusive design, accessibility, and design at scale.
                        Sharing our struggles and victories makes us stronger!
                        <Text align="end" size="400">
                          —Design System Day speaker
                        </Text>
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_WHITE_MOCHIMALIST_0 },
            }}
            paddingX={4}
            paddingY={12}
          >
            <Flex alignItems="center" direction="column" justifyContent="center">
              <Box paddingX={10}>
                <Heading accessibilityLevel={2} align="center" color="default">
                  No, really, THIS was the year
                </Heading>
              </Box>

              <Box
                alignItems="center"
                dangerouslySetInlineStyle={{
                  __style: { flexWrap: 'wrap-reverse' },
                }}
                display="flex"
                justifyContent="center"
                margin={4}
              >
                <Flex
                  alignItems="center"
                  direction="column"
                  gap={12}
                  maxWidth="550px"
                  mdAlignItems="start"
                  minWidth="320px"
                >
                  <Box margin={12} minWidth="300px">
                    <Box marginBottom={12}>
                      <Text color="default" size="400">
                        It&apos;s a good sign when, after saying last year was the year, we have to
                        come back and say, “actually this was the year!” It was a lot of hard work
                        that was sometimes exhausting. But it also felt great to improve the design
                        system so that our customers can make Pinterest the home of positivity and
                        inspiration. We&apos;re ready to keep it going for another year so that, in
                        2024 we can say “seriously, THIS was the best year!” Hope your 2024 is off
                        to a great start as well!
                      </Text>
                    </Box>
                    <ButtonLink href="/home" text="Head back to Gestalt" />
                  </Box>
                </Flex>
                <Box margin={12} maxWidth="312px">
                  <Lottie animationData={EndGraphic} autoplay={!shouldReduceMotion} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </ColorSchemeProvider>
    </div>
  );
}
