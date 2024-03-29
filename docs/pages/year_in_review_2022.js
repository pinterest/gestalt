// @flow strict
import { Fragment, type Node as ReactNode, useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import {
  Box,
  ButtonLink,
  ColorSchemeProvider,
  CompositeZIndex,
  FixedZIndex,
  Flex,
  Heading,
  Icon,
  Link as GestaltLink,
  Text,
  useReducedMotion,
} from 'gestalt';
import {
  TOKEN_COLOR_BLUE_SKYCICLE_450,
  TOKEN_COLOR_PURPLE_MYSTICOOL_200,
  TOKEN_COLOR_TEAL_SPABATTICAL_100,
  TOKEN_COLOR_TEAL_SPABATTICAL_700,
} from 'gestalt-design-tokens';
import GestaltLogo from '../docs-components/GestaltLogo';
// SVGs
import AsteriskFilled from '../graphics/year-in-review/asteriskFilled.svg';
import Circle from '../graphics/year-in-review/circle.svg';
import CircleShadow from '../graphics/year-in-review/circleShadow.svg';
import DiscoSVG from '../graphics/year-in-review/disco.svg';
import Donut from '../graphics/year-in-review/donut.svg';
import DonutHalf from '../graphics/year-in-review/donutHalf.svg';
import DonutShadow from '../graphics/year-in-review/donutShadow.svg';
import DSD from '../graphics/year-in-review/dsd.svg';
import FigmaSVG from '../graphics/year-in-review/figma.svg';
import KnobShadow from '../graphics/year-in-review/knobShadow.svg';
import Figma from '../graphics/year-in-review/lottie/figma.json';
import Pencil from '../graphics/year-in-review/lottie/pencil.json';
import Steps from '../graphics/year-in-review/lottie/steps.json';
import Vibes from '../graphics/year-in-review/lottie/vibes.json';
import Sparkle from '../graphics/year-in-review/sparkle.svg';
import SparkleShadow from '../graphics/year-in-review/sparkleShadow.svg';
import Tokens from '../graphics/year-in-review/tokens.svg';

// Lottie animations

const INTRO_ZINDEX = new FixedZIndex(10);
const BUTTON_ZINDEX = new CompositeZIndex([INTRO_ZINDEX]);
const SIDE_GAP = 8;
const MAX_CONTENT_WIDTH = 660;

type StatsProps = {
  description: string,
  number: string,
};

function StatsColumn({ number, description }: StatsProps): ReactNode {
  return (
    <Flex alignItems="start" direction="column" gap={2}>
      <p className="statsNumber">{number} </p>
      <Flex.Item maxWidth="250px">
        <p className="statsDescription">{description}</p>
      </Flex.Item>
    </Flex>
  );
}

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

function DiscoAnimation({ shouldReduceMotion }: AnimationProps): ReactNode {
  const [animationData, setAnimationData] = useState<null | { ... }>(null);
  useEffect(() => {
    import(`../graphics/year-in-review/lottie/discoStars.json`).then((res) =>
      setAnimationData(res.default),
    );
  }, []);

  if (!animationData) return <DiscoSVG />;
  return <Lottie animationData={animationData} autoplay={!shouldReduceMotion} />;
}

export default function YearInReview2022(): ReactNode {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (document) {
      document.title = `2022 Year in Review - Gestalt`;
    }
  }, []);

  useEffect(() => {
    const animatedDecor = [
      ...document.querySelectorAll('.fadeInRight'),
      ...document.querySelectorAll('.fadeInLeft'),
    ];

    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        entry.target?.classList?.add('animate');
      }
    });

    animatedDecor.forEach((obj) => {
      observer.observe(obj);
    });
  }, []);

  return (
    <div className="year-in-review">
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
              __style: { backgroundColor: TOKEN_COLOR_BLUE_SKYCICLE_450 },
            }}
            position="relative"
            width="100%"
          >
            <Flex alignItems="center" direction="column">
              <Box column={6} marginTop={-3} mdColumn={3}>
                <DiscoAnimation shouldReduceMotion={shouldReduceMotion} />
              </Box>
              <h2 className="gestalt2022">Gestalt 2022</h2>
              <h1 className="h1Font">Year in Review</h1>
            </Flex>
            <Box bottom marginStart={10} position="absolute" width="10%">
              <KnobShadow className="fadeInLeft animate" width="100%" />
            </Box>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  top: '30%',
                  right: '15%',
                },
              }}
              marginStart={10}
              position="absolute"
              right
              top
              width="10%"
            >
              <AsteriskFilled className="introAsterisk" width="100%" />
            </Box>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  bottom: '-10%',
                  right: '5%',
                },
              }}
              marginStart={10}
              position="absolute"
              width="10%"
            >
              <DonutHalf className="introHalfDonut" width="100%" />
            </Box>
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
                maxWidth={MAX_CONTENT_WIDTH}
                padding={12}
                zIndex={INTRO_ZINDEX}
              >
                <Flex direction="column" gap={4}>
                  <Text size="400">
                    It’s that time again. The days are getting shorter, the nights are getting
                    longer and people are sending out unsolicited updates on what they did this
                    year. Everybody’s doing it, and, hey, who are we to buck tradition?
                  </Text>
                  <Text size="400">
                    The Gestalt team had lofty ambitions and even loftier hopes for 2022. We said
                    “this is the year” many times and—spoiler alert—it was!
                  </Text>
                  <Text size="400">
                    2022 has exceeded our expectations. Read on for a short and sweet summary of our
                    biggest moments building Pinterest’s design foundations.
                  </Text>
                </Flex>
              </Box>
            </div>
          </Flex>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_PURPLE_MYSTICOOL_200 },
            }}
            paddingX={SIDE_GAP}
            paddingY={6}
            position="relative"
          >
            <Flex alignItems="center" direction="column" justifyContent="center">
              <Heading accessibilityLevel={2} align="center">
                What&apos;s up, docs?
              </Heading>
              <Box maxWidth={MAX_CONTENT_WIDTH}>
                <Lottie animationData={Pencil} autoplay={!shouldReduceMotion} />
              </Box>
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '50%',
                    right: '-5%',
                  },
                }}
                marginStart={10}
                position="absolute"
                width="10%"
              >
                <Donut className="fadeInRight" width="100%" />
              </Box>
              <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                <Text size="400">
                  Documentation got tons of attention in 2021, and we doubled down this year. The
                  biggest highlight of 2022 was the complete redesign of our site, not for funsies,
                  but to expand its content. The site is lookin’ sharper than ever and has a whole
                  library of foundational guidelines, a revamped icon library viewer, and
                  brand-spankin’ new component guidelines for Android and iOS.{' '}
                </Text>
                <Text size="400">
                  What has this work led to? Well, a whole lot more traffic. 192% unique users, 178%
                  sessions and 150% page views. Higher satisfaction too: 86% overall docs
                  satisfaction (46% giving the highest marks) and 73% of designers saying they view
                  our docs at least weekly—that’s up 59 from the first half of 2020!
                </Text>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      bottom: '10%',
                      left: '-5%',
                    },
                  }}
                  position="absolute"
                  width="10%"
                >
                  <Circle className="fadeInLeft" width="100%" />
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box
            color="light"
            display="flex"
            justifyContent="center"
            padding={12}
            position="relative"
          >
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  top: '-15%',
                  left: '10%',
                },
              }}
              maxWidth="175px"
              position="absolute"
              width="10%"
            >
              <DonutShadow className="fadeInLeft" width="100%" />
            </Box>
            <Flex
              alignItems="start"
              flex="grow"
              gap={12}
              justifyContent="around"
              maxWidth={MAX_CONTENT_WIDTH}
            >
              <StatsColumn
                description="Users who visited our docs compared to 2021"
                number="192%"
              />
              <StatsColumn description="Designers using docs weekly (or more!)" number="73%" />
            </Flex>
            <Box
              dangerouslySetInlineStyle={{
                __style: {
                  right: '10%',
                  transform: 'rotate(180deg)',
                },
              }}
              maxWidth="175px"
              position="absolute"
              width="8%"
            >
              <KnobShadow className="fadeInRight" width="100%" />
            </Box>
          </Box>
          <Box color="light">
            <Tokens />
            <Box paddingX={SIDE_GAP} paddingY={12} position="relative">
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Box marginBottom={8} paddingX={SIDE_GAP}>
                  <Heading accessibilityLevel={2} align="center">
                    Components + tokens
                  </Heading>
                </Box>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '25%',
                      right: '5%',
                    },
                  }}
                  position="absolute"
                  width="10%"
                >
                  <DonutShadow className="fadeInRight" width="100%" />
                </Box>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '40%',
                      left: '5%',
                    },
                  }}
                  position="absolute"
                  width="10%"
                >
                  <Sparkle className="fadeInLeft" width="100%" />
                </Box>
                <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    Gestalt shipped 38 component additions and updates this year, including some
                    game-changers like the new{' '}
                    <GestaltLink display="inlineBlock" href="/web/sidenavigation">
                      SideNavigation
                    </GestaltLink>{' '}
                    and our big{' '}
                    <GestaltLink display="inlineBlock" href="/web/pageheader">
                      PageHeader
                    </GestaltLink>{' '}
                    overhaul.
                  </Text>
                  <Text size="400">
                    2022 saw a 11% bump in overall use of Gestalt instances in the Pinterest Web
                    codebase. We were most excited to see a 28% increase in our more complex
                    components (think something like{' '}
                    <GestaltLink display="inlineBlock" href="/web/slimbanner">
                      SlimBanner
                    </GestaltLink>{' '}
                    as opposed to{' '}
                    <GestaltLink display="inlineBlock" href="/web/text">
                      Text
                    </GestaltLink>
                    ).
                  </Text>
                  <Text size="400">
                    We added 3 new token families to Gestalt: data visualization colors, elevation
                    and opacity. We revamped our type treatments on the Web platform across the
                    entire product. Our proudest achievement here? Shipping a tokenized dark mode
                    for mobile web in just four engineering days. You know, no big deal...just
                    kidding, it’s a very big deal!
                  </Text>
                  <Text size="400">
                    We made 12 accessibility improvements to Gestalt because we take the
                    abbreviation A11Y literally. These improvements included more accessible error
                    messages in our form fields, a more semantic-friendly Image and an
                    accessibility-friendly RadioGroup component. 12 may not seem like an impressive
                    number, so here’s a bigger one: 2,000. That’s roughly the number of improvements
                    our Gestalt accessibility updates made in product.
                  </Text>
                  <Text size="400">
                    Speaking of in-product improvements, we found the time to replace legacy custom
                    components with Gestalt equivalents. This work improved overall product
                    consistency and gave us permission to remove 8,342 lines in our Web codebase
                    that didn’t “spark joy.” Don’t worry, we donated them to some engineers in
                    need...
                  </Text>
                </Flex>
                <Box paddingY={8} width="75%">
                  <hr />
                </Box>
                <div className="statsGrid">
                  <StatsGrid
                    description="Increase in complex Gestalt component instances"
                    number="28%"
                  />
                  <StatsGrid description="In-product accessibility enhancements" number="~2k" />
                  <StatsGrid
                    description="Lines of code removed due to Gestalt adoption"
                    number="8,342"
                  />
                </div>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: TOKEN_COLOR_TEAL_SPABATTICAL_100,
                border: '4px solid #111',
                borderBottom: 'none',
              },
            }}
          >
            <Box>
              {shouldReduceMotion ? (
                <FigmaSVG />
              ) : (
                <Lottie animationData={Figma} autoplay={!shouldReduceMotion} />
              )}
            </Box>
            <Box paddingX={SIDE_GAP} position="relative">
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Box marginBottom={8}>
                  <Heading accessibilityLevel={2} align="center">
                    Extreme makeover:
                    <br />
                    Figma edition
                  </Heading>
                </Box>
                <Flex direction="column" gap={4} maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    You’ve seen our engineering achievements, but what about design? 2022 was our
                    love letter to the amazing Pinterest designers—starting with our Figma
                    libraries. And{' '}
                    <Text inline italic size="400">
                      oof
                    </Text>
                    , they really needed work! If we told you everything we did, we’d be here until
                    2023! So here are some of our faves:
                  </Text>
                  <Text size="400">
                    We completely restructured and simplified all our libraries. We used Figma’s new
                    component properties to cut 500 total variants. Dark mode variants were added to
                    all mobile components and we shipped a complete redesign of our Pin component.{' '}
                    <Text inline italic size="400">
                      Pin
                    </Text>{' '}
                    is literally in our company name, so it was really important for us to get that
                    one right.
                  </Text>
                  <Text size="400">
                    The results? Massive. Specifically, 1.92 million inserts in these past 12
                    months. The detaches? Paltry. Specifically, 0.56% of all inserts. The feedback?
                    Rad. A 86% satisfaction from designers, which is a hefty 21% bump from the last
                    year.
                  </Text>
                  <Text size="400">
                    We also saw a Gestalt Figma component adoption high of 45% this year which was
                    roughly a 15% improvement from when we started tracking in Q2. How can we
                    measure adoption rates of Figma components? Because we built the ability to
                    track adoption of our components within designs in near real time! Yes, it’s
                    very exciting. Yes, it changes everything. And yes, we will be talking much more
                    about this in 2023.
                  </Text>
                </Flex>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '70%',
                      right: '5%',
                    },
                  }}
                  position="absolute"
                  width="10%"
                >
                  <SparkleShadow className="fadeInRight" width="100%" />
                </Box>
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '30%',
                      left: '5%',
                    },
                  }}
                  position="absolute"
                  width="10%"
                >
                  <DonutShadow className="fadeInLeft" width="100%" />
                </Box>
                <Box paddingY={12}>
                  <div className="statsGrid">
                    <StatsGrid description="Total Gestalt Figma component insert" number="1.92M" />
                    <StatsGrid description="Component detach rate" number="0.56%" />
                    <StatsGrid description="Peak design adoption rate" number="45%" />
                  </div>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box color="light" marginBottom={12}>
            <DSD />
            <Box paddingX={SIDE_GAP}>
              <Flex alignItems="center" direction="column" justifyContent="center">
                <Box paddingY={12}>
                  <Heading accessibilityLevel={2} align="center">
                    Design Systems Day-um!
                  </Heading>
                </Box>
                <Flex alignItems="start" gap={12} justifyContent="center" wrap>
                  <Flex.Item flexBasis={600}>
                    <Flex direction="column" gap={4}>
                      <Text size="400">
                        File this under “things that make the Gestalt team awesome:” our first
                        conference, Design Systems Day. And while we know design systems programming
                        can fill more than one day, it was one heck of a day! We hosted 6 sessions,
                        which included 8 external speakers from Meta, Procter & Gamble and Spotify
                        alongside some of our Pinterest colleagues. 90 people attended the
                        conference, which ain’t too shabby for our first time out the gate.
                      </Text>
                      <Text size="400">
                        We’re already making plans for our second Design Systems Day in 2023 because
                        88% of attendees told us that they gained helpful information to improve
                        Pinterest product quality—well worth a day (or five) in our book.
                      </Text>
                    </Flex>
                  </Flex.Item>
                  <Box
                    alignItems="start"
                    display="flex"
                    justifyContent="between"
                    mdDirection="column"
                    smDirection="row"
                  >
                    <StatsColumn
                      description="Attendees responded the conference helped them learn how to improve product quality"
                      number="88%"
                    />
                    <Box padding={6} />
                    <StatsColumn description="Total conference attendees" number="90" />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            alignItems="center"
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_PURPLE_MYSTICOOL_200 },
            }}
            direction="column"
            display="flex"
            justifyContent="center"
            paddingX={SIDE_GAP}
            paddingY={12}
          >
            <Box maxWidth="890px">
              <Lottie animationData={Vibes} autoplay={!shouldReduceMotion} />
            </Box>
            <Box position="relative" width="100%">
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '70%',
                    right: '5%',
                  },
                }}
                position="absolute"
                width="10%"
              >
                <CircleShadow className="fadeInRight" width="100%" />
              </Box>
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '10%',
                    left: '5%',
                  },
                }}
                position="absolute"
                width="8%"
              >
                <SparkleShadow className="fadeInLeft" width="100%" />
              </Box>
              <Flex alignItems="center" direction="column" gap={12}>
                <Heading accessibilityLevel={2} align="center">
                  Impeccable vibes
                </Heading>

                <Flex
                  alignItems="center"
                  direction="column"
                  gap={4}
                  justifyContent="center"
                  maxWidth={MAX_CONTENT_WIDTH}
                >
                  <Text size="400">
                    We saved customer feedback for last to end this post (and 2022) with a bang! Our
                    core engineering customers gave us a 96% overall satisfaction rating (+2% from
                    last year) with 70% of giving us highest marks (+13% from last year). And
                    design? We saw a 95% overall satisfaction rating (+33% from last year) with 23%
                    of giving us perfect scores (+12% from last year)!
                  </Text>
                  <Text size="400">
                    90% of product designers responded that Gestalt speeds up their workflow with
                    35% giving highest marks. And if that isn’t impressive enough, 100% of engineers
                    in our core customer base responded that Gestalt speeds up their workflow (with
                    66% giving us perfect scores). Even when it seems like no one can agree on
                    anything, all of us can agree that Gestalt helps us work faster.
                  </Text>
                </Flex>
                <Flex flex="grow" gap={12} justifyContent="between">
                  <StatsColumn
                    description="Design sentiment compared to the second half of 2021—a “paltry” 32 point increase!"
                    number="95.5%"
                  />
                  <StatsColumn
                    description="Engineers in our core customer base responded that Gestalt speeds up their workflow"
                    number="100%"
                  />
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: TOKEN_COLOR_TEAL_SPABATTICAL_700 },
            }}
            paddingX={4}
            paddingY={12}
          >
            <Flex alignItems="center" direction="column" justifyContent="center">
              <Box paddingX={10}>
                <Heading accessibilityLevel={2} align="center" color="light">
                  This was the year
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
                >
                  <Text color="light" size="400">
                    At times, this year has been exhausting and hard. But what our small but mighty
                    team has accomplished is a huge achievement! Years from now, when we look back
                    at the history of Gestalt and relish how it’s finally everything we ever wanted
                    it to be, we’ll pinpoint 2022 as the turning point. Now we’re going to celebrate
                    and ride this high into 2023 so we can work some serious, high-level design
                    systems magic. Stay tuned, stay frosty, stay excellent—we’ll see you next year!
                  </Text>
                  <ButtonLink href="/home" text="Head back to Gestalt" />
                </Flex>
                <Box margin={2} width="300px">
                  <Lottie animationData={Steps} autoplay={!shouldReduceMotion} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </ColorSchemeProvider>
    </div>
  );
}
