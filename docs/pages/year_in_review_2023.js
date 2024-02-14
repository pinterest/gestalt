// @flow strict
import { Fragment, type Node as ReactNode, useEffect, useState } from 'react';
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
  description: string,
  number: string,
};

function StatsGrid({ number, description }: GridProps): ReactNode {
  return (
    <Fragment>
      <p className="statsNumber">{number}</p>
      <p className="statsDescription">{description}</p>
    </Fragment>
  );
}
type AnimationProps = {
  shouldReduceMotion: boolean,
};

function HeroAnimation({ shouldReduceMotion }: AnimationProps): ReactNode {
  const [animationData, setAnimationData] = useState<null | { ... }>(null);
  useEffect(() => {
    import(`../graphics/year-in-review-2023/lottie/yir-2023-intro-hero.json`).then((res) =>
      setAnimationData(res.default),
    );
  }, []);
  if (!animationData) return <HeroSVG />;
  return <Lottie animationData={animationData} autoplay={!shouldReduceMotion} />;
}

export default function YearInReview2023(): ReactNode {
  const shouldReduceMotion = useReducedMotion();
  useEffect(() => {
    if (document) {
      document.title = `2023 Year in review - Gestalt`;
    }
  }, []);

  return (
    <div className="year-in-review-2023">
      <ColorSchemeProvider colorScheme="light" id="gestalt-yir">
        <Flex flex="grow" direction="column">
          <Box
            role="navigation"
            position="fixed"
            top
            left
            padding={4}
            mdPadding={8}
            zIndex={BUTTON_ZINDEX}
          >
            <Link href="/home">
              <div className="backButton" role="link" aria-label="Back to Gestalt Home">
                <Icon icon="home" color="dark" accessibilityLabel="Home" size={28} />
                <GestaltLogo height={50} width={50} />
              </div>
            </Link>
          </Box>

          <Box
            width="100%"
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-background-default)' },
            }}
            position="relative"
          >
            <Flex direction="column" alignItems="center">
              <Box marginTop={12} column={6} mdColumn={3} marginBottom={4}>
                <HeroAnimation shouldReduceMotion={shouldReduceMotion} />
              </Box>
              <Box marginBottom={4}>
                <h1 className="h1Font2023">Year in review</h1>
              </Box>
              <Box marginBottom={8} marginTop={-2}>
                <Flex gap={3} alignItems="center" justifyContent="center">
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
                width="50%"
                position="absolute"
                marginStart={10}
                dangerouslySetInlineStyle={{
                  __style: {
                    bottom: '1%',
                    right: '-1%',
                  },
                }}
              >
                <IntroLine className="introLineIn" width="100%" />
              </Box>
            </Flex>
          </Box>
          <Flex direction="column" alignItems="center">
            <div className="halfAndHalf">
              <Box
                color="light"
                padding={12}
                marginTop={8}
                maxWidth={MAX_CONTENT_WIDTH}
                dangerouslySetInlineStyle={{
                  __style: {
                    border: '4px solid #111111',
                  },
                }}
                margin={4}
                zIndex={INTRO_ZINDEX}
              >
                <Flex gap={4} direction="column">
                  <Text size="400">
                    It&apos;s 2024 and everyone at Pinterest Gestalt headquarters is currently
                    gearing up to drive more adoption while improving our governance and
                    contribution models. But our latest initiatives depend heavily on what we
                    accomplished in 2023. So, let&apos;s take one more quick look at all of our 2023
                    highlights so that we feel even better about what&apos;s to come in 2024.{' '}
                    <Text weight="bold" size="400" inline>
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
              __style: { backgroundColor: 'var(--color-blue-skycicle-100)' },
            }}
            paddingY={12}
            paddingX={SIDE_GAP}
            position="relative"
          >
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box lgMarginTop={8}>
                <Heading accessibilityLevel={2} align="center">
                  The people&apos;s choice
                </Heading>
              </Box>
              <Flex gap={4} maxWidth={MAX_CONTENT_WIDTH} direction="column">
                <Box
                  maxWidth={665}
                  marginTop={12}
                  marginBottom={2}
                  width="100%"
                  display="inlineBlock"
                  justifyContent="center"
                  overflow="hidden"
                  column={6}
                  mdColumn={3}
                >
                  <Lottie animationData={PeoplesChoice} autoplay={!shouldReduceMotion} />
                </Box>

                <Box paddingY={12} paddingX={SIDE_GAP} position="relative">
                  <Text size="400">
                    2023 ushered in Zeroheight&apos;s first-ever{' '}
                    <Link
                      href="https://zeroheight.com/events/design-system-awards/winners/"
                      display="inline"
                      target="blank"
                      externalLinkIcon="default"
                      rel="nofollow"
                    >
                      Design System Awards
                    </Link>
                    . Gestalt was a finalist in five categories and won three awards:{' '}
                    <Text weight="bold" size="400" inline>
                      Best Article
                    </Text>{' '}
                    (
                    <Link
                      href="https://www.figma.com/blog/how-pinterests-design-systems-team-measures-adoption/"
                      display="inline"
                      target="blank"
                      rel="nofollow"
                      externalLinkIcon="default"
                    >
                      How Gestalt measures adoption
                    </Link>{' '}
                    by Ravi Lingineni),{' '}
                    <Text weight="bold" size="400" inline>
                      Best Collaboration
                    </Text>{' '}
                    and{' '}
                    <Text weight="bold" size="400" inline>
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
                padding={8}
                marginTop={10}
                marginBottom={12}
                display="inlineBlock"
                maxWidth={894}
                dangerouslySetInlineStyle={{
                  __style: {
                    border: '4px solid #111111',
                  },
                }}
              >
                <Box maxWidth={56} marginBottom={2} padding={3}>
                  <Quote />
                </Box>
                <Box maxWidth={644} padding={4}>
                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      I enjoy that I&apos;m able to explore multiple explorations quickly with our
                      Figma library. I&apos;m able to cut the time and effort.
                      <Text size="400" align="end">
                        —Product Designer
                      </Text>
                    </Text>
                  </Box>

                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      Gestalt is always my favorite team to collaborate with!
                      <Text size="400" align="end">
                        —Software Engineer
                      </Text>
                    </Text>
                  </Box>
                  <Box marginBottom={8}>
                    <Text size="400" weight="bold">
                      You are all rockstars and it&apos;s always a great time getting all of your
                      guidance! Thank you for all you do in making sure our product is accessible to
                      everyone.
                      <Text size="400" align="end">
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
              __style: { backgroundColor: 'var(--color-pink-flaminglow-200)' },
            }}
          >
            <Box paddingY={12} paddingX={SIDE_GAP} position="relative">
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Box marginBottom={8} marginTop={8} paddingX={SIDE_GAP}>
                  <Heading align="center" accessibilityLevel={2}>
                    The doc is in
                  </Heading>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-white-mochimalist-0)' },
            }}
          >
            <Box paddingY={12} paddingX={SIDE_GAP} position="relative">
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Flex gap={4} direction="column" maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    2023 was another big year for Gestalt documentation—contributions and
                    collaboration were the name of the game there as well. Our guidelines on{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/foundations/forms/overview"
                      display="inline"
                      target="blank"
                    >
                      Form patterns
                    </Link>
                    , for example, came as a direct contribution from our colleagues in Advertising
                    design. Similarly, our comprehensive guidelines for{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/foundations/data_visualization/overview"
                      display="inline"
                    >
                      data visualization
                    </Link>{' '}
                    leveraged research and work done by our Measurement Design teammates.
                  </Text>
                  <Text size="400">
                    A collaboration with our Pinner Design Team yielded solid guidance, specs and
                    Figma components for{' '}
                    <Link href="https://gestalt.pinterest.systems/ios/card/card" display="inline">
                      Cards and Preview blocks
                    </Link>
                    . We also leaned on our Brand colleagues to release{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/foundations/illustration"
                      display="inline"
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
                      href="https://gestalt.pinterest.systems/foundations/international_design/about_international_design"
                      display="inline"
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
                      href="https://gestalt.pinterest.systems/team_support/contributions"
                      display="inline"
                    >
                      Contributions
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/team_support/overview"
                      display="inline"
                    >
                      Team support
                    </Link>
                    . In addition, we now provide a Figma toolkit and guidelines for{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/team_support/design_file_hygiene/naming_convention"
                      display="inline"
                    >
                      file hygiene
                    </Link>{' '}
                    to streamline the contribution and handoff process.
                  </Text>
                </Flex>

                <Box
                  padding={12}
                  marginTop={10}
                  marginBottom={9}
                  marginStart={12}
                  marginEnd={12}
                  display="flex"
                  maxWidth={894}
                  minWidth={300}
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                      backgroundColor: 'var(--color-pink-flaminglow-100)',
                    },
                  }}
                >
                  <Flex gap={4}>
                    <div className="statsGrid">
                      <StatsGrid number="27%" description="increase in total search queries" />
                      <StatsGrid number="9%" description="In-product accessibility enhancements" />
                      <StatsGrid
                        number="16"
                        description="net new foundations, components, and pattern guidelines"
                      />
                    </div>
                    <Box>
                      <Lottie
                        className="docsGraphic"
                        animationData={Docs}
                        autoplay={!shouldReduceMotion}
                      />
                    </Box>
                  </Flex>
                </Box>
                <Flex gap={4} direction="column" maxWidth={MAX_CONTENT_WIDTH}>
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
                backgroundColor: 'var(--color-green-matchacado-100)',
              },
            }}
          >
            <Box paddingX={SIDE_GAP} position="relative" marginBottom={12}>
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Box marginBottom={8} marginTop={12} width="75%">
                  <Heading align="center" accessibilityLevel={2}>
                    There&apos;s still room for components and tokens
                  </Heading>
                </Box>
                <Box
                  maxWidth={665}
                  marginTop={4}
                  marginBottom={12}
                  width="100%"
                  display="inlineBlock"
                  justifyContent="center"
                  overflow="hidden"
                  column={6}
                  mdColumn={3}
                >
                  <Lottie animationData={Tokens} autoplay={!shouldReduceMotion} />
                </Box>
                <Flex gap={4} direction="column" maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    If people are the salt and pepper of design systems, then components and tokens
                    are the potatoes and butter? Whatever the case may be, we had plenty of time to
                    continue to add to our components, foundations and token libraries in 2023.
                    There was a significant increase in the amount of native mobile components:
                    <Box marginTop={4} marginBottom={4}>
                      <List type="unordered" size="400">
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
                    <Link href="https://gestalt.pinterest.systems/web/chartgraph" display="inline">
                      Bar and line graphs
                    </Link>{' '}
                    manipulated by{' '}
                    <Link href="https://gestalt.pinterest.systems/web/tiledata" display="inline">
                      tiles
                    </Link>{' '}
                    and{' '}
                    <Link href="https://gestalt.pinterest.systems/web/tagdata" display="inline">
                      tags
                    </Link>
                    !{' '}
                    <Link href="https://gestalt.pinterest.systems/web/sheetmobile" display="inline">
                      Mobile sheets
                    </Link>{' '}
                    or{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/web/banneroverlay"
                      display="inline"
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
                    <Link href="https://gestalt.pinterest.systems/web/tag#Size" display="inline">
                      Tag
                    </Link>
                    ,{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/web/accordion#Sizes"
                      display="inline"
                    >
                      Accordion
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="https://gestalt.pinterest.systems/web/segmentedcontrol#Size"
                      display="inline"
                    >
                      SegmentedControl
                    </Link>
                    . We hope to continue to provide more components with density variants in 2024.
                  </Text>
                </Flex>
                <Box
                  padding={10}
                  marginTop={8}
                  marginBottom={12}
                  display="inlineBlock"
                  alignSelf="center"
                  maxWidth={894}
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                      backgroundColor: 'var(--color-white-mochimalist-0)',
                    },
                  }}
                >
                  <Flex gap={8} alignItems="center">
                    <div className="statsGrid">
                      <StatsGrid number="39" description="icons added to our central library" />
                      <StatsGrid number=" 17" description="native mobile components added" />
                      <StatsGrid number="10" description="web components added" />
                      <StatsGrid number="231" description="component fixes and updates" />
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
              <Flex alignItems="center" justifyContent="center" direction="column">
                <Box paddingY={12} align="center">
                  <Box
                    maxWidth={665}
                    marginTop={12}
                    marginBottom={12}
                    width="100%"
                    display="inlineBlock"
                    justifyContent="center"
                    overflow="hidden"
                    column={6}
                    mdColumn={3}
                  >
                    <Lottie animationData={VariablesGraphic} autoplay={!shouldReduceMotion} />
                  </Box>
                  <Heading align="center" accessibilityLevel={2}>
                    From styles to Variables!
                  </Heading>
                </Box>
                <Flex alignItems="start" justifyContent="center" gap={12} wrap>
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
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-blue-skycicle-100)' },
            }}
            paddingY={12}
            paddingX={SIDE_GAP}
            marginTop={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box position="relative" width="100%">
              <Flex direction="column" gap={12} alignItems="center">
                <Heading align="center" accessibilityLevel={2}>
                  Design System Day—yum!
                </Heading>
                <Box
                  maxWidth={665}
                  marginTop={4}
                  marginBottom={12}
                  width="100%"
                  display="inlineBlock"
                  justifyContent="center"
                  overflow="hidden"
                  column={6}
                  mdColumn={3}
                >
                  <Lottie animationData={DSD} autoplay={!shouldReduceMotion} />
                </Box>

                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={4}
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
                      href="https://pinterest.design/why-we-host-an-internal-design-systems-conference-3bb6017c6ca2"
                      display="inline"
                      target="blank"
                      externalLinkIcon="default"
                    >
                      Pinterest Design blog
                    </Link>
                    . But let&apos;s just leave you with some choice quotes about this awesome event
                    loved by both internal and external participants.
                  </Text>
                </Flex>
                <Box
                  color="light"
                  padding={8}
                  marginTop={10}
                  marginBottom={12}
                  display="inlineBlock"
                  maxWidth={894}
                  dangerouslySetInlineStyle={{
                    __style: {
                      border: '4px solid #111111',
                    },
                  }}
                >
                  <Box maxWidth={56} marginBottom={2} padding={3}>
                    <Quote />
                  </Box>
                  <Box maxWidth={644} padding={4}>
                    <Box marginBottom={8}>
                      <Text size="400" weight="bold">
                        Only Pinterest can make an online event this much fun! This Design System
                        conference was an example of inspiration and new trends. I met a lot of
                        people and learnt a lot at the event; it felt like I was there in person.
                        Please continue to make it happen every year!
                        <Text size="400" align="end">
                          —UX/UI Designer @ Pinterest
                        </Text>
                      </Text>
                    </Box>

                    <Box marginBottom={8}>
                      <Text size="400" weight="bold">
                        The space was encouraging and I felt very welcomed. It&apos;s really moving
                        to be surrounded by so many people who genuinely care about accessibility
                        and inclusion. I love this community!
                        <Text size="400" align="end">
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
                        <Text size="400" align="end">
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
              __style: { backgroundColor: 'var(--color-white-mochimalist-0)' },
            }}
            paddingY={12}
            paddingX={4}
          >
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box paddingX={10}>
                <Heading align="center" accessibilityLevel={2} color="default">
                  No, really, THIS was the year
                </Heading>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                dangerouslySetInlineStyle={{
                  __style: { flexWrap: 'wrap-reverse' },
                }}
                margin={4}
              >
                <Flex
                  direction="column"
                  gap={12}
                  maxWidth="550px"
                  minWidth="320px"
                  alignItems="center"
                  mdAlignItems="start"
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
