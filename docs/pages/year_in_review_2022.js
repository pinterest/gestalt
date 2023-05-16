// @flow strict
import { type Node, useEffect, useState, Fragment } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  ColorSchemeProvider,
  Icon,
  Text,
  FixedZIndex,
  CompositeZIndex,
  useReducedMotion,
  Link as GestaltLink,
} from 'gestalt';
import Lottie from 'lottie-react';
import Link from 'next/link';
import GestaltLogo from '../docs-components/GestaltLogo.js';
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

type StatsProps = {|
  description: string,
  number: string,
|};

function StatsColumn({ number, description }: StatsProps): Node {
  return (
    <Flex gap={2} alignItems="start" direction="column">
      <p className="statsNumber">{number} </p>
      <Flex.Item maxWidth="250px">
        <p className="statsDescription">{description}</p>
      </Flex.Item>
    </Flex>
  );
}

type GridProps = {|
  description: string,
  number: string,
|};

function StatsGrid({ number, description }: GridProps): Node {
  return (
    <Fragment>
      <p className="statsNumber">{number}</p>
      <p className="statsDescription">{description}</p>
    </Fragment>
  );
}

type AnimationProps = {|
  shouldReduceMotion: boolean,
|};

function DiscoAnimation({ shouldReduceMotion }: AnimationProps): Node {
  const [animationData, setAnimationData] = useState<null | { ... }>(null);
  useEffect(() => {
    import(`../graphics/year-in-review/lottie/discoStars.json`).then((res) =>
      setAnimationData(res.default),
    );
  }, []);

  if (!animationData) return <DiscoSVG />;
  return <Lottie animationData={animationData} autoplay={!shouldReduceMotion} />;
}

export default function YearInReview2022(): Node {
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
              __style: { backgroundColor: 'var(--color-blue-skycicle-450)' },
            }}
            position="relative"
          >
            <Flex direction="column" alignItems="center">
              <Box marginTop={-3} column={6} mdColumn={3}>
                <DiscoAnimation shouldReduceMotion={shouldReduceMotion} />
              </Box>
              <h2 className="gestalt2022">Gestalt 2022</h2>
              <h1 className="h1Font">Year in Review</h1>
            </Flex>
            <Box width="10%" position="absolute" bottom marginStart={10}>
              <KnobShadow width="100%" className="fadeInLeft animate" />
            </Box>
            <Box
              width="10%"
              position="absolute"
              top
              right
              marginStart={10}
              dangerouslySetInlineStyle={{
                __style: {
                  top: '30%',
                  right: '15%',
                },
              }}
            >
              <AsteriskFilled className="introAsterisk" width="100%" />
            </Box>
            <Box
              width="10%"
              position="absolute"
              marginStart={10}
              dangerouslySetInlineStyle={{
                __style: {
                  bottom: '-10%',
                  right: '5%',
                },
              }}
            >
              <DonutHalf className="introHalfDonut" width="100%" />
            </Box>
          </Box>
          <Flex direction="column" alignItems="center">
            <div className="halfAndHalf">
              <Box
                color="light"
                padding={12}
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
              __style: { backgroundColor: 'var(--color-purple-mysticool-200)' },
            }}
            paddingY={6}
            paddingX={SIDE_GAP}
            position="relative"
          >
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Heading accessibilityLevel={2} align="center">
                What&apos;s up, docs?
              </Heading>
              <Box maxWidth={MAX_CONTENT_WIDTH}>
                <Lottie animationData={Pencil} autoplay={!shouldReduceMotion} />
              </Box>
              <Box
                width="10%"
                position="absolute"
                marginStart={10}
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '50%',
                    right: '-5%',
                  },
                }}
              >
                <Donut className="fadeInRight" width="100%" />
              </Box>
              <Flex gap={4} maxWidth={MAX_CONTENT_WIDTH} direction="column">
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
                  width="10%"
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: {
                      bottom: '10%',
                      left: '-5%',
                    },
                  }}
                >
                  <Circle className="fadeInLeft" width="100%" />
                </Box>
              </Flex>
            </Flex>
          </Box>
          <Box
            color="light"
            padding={12}
            display="flex"
            justifyContent="center"
            position="relative"
          >
            <Box
              width="10%"
              maxWidth="175px"
              position="absolute"
              dangerouslySetInlineStyle={{
                __style: {
                  top: '-15%',
                  left: '10%',
                },
              }}
            >
              <DonutShadow className="fadeInLeft" width="100%" />
            </Box>
            <Flex
              alignItems="start"
              justifyContent="around"
              gap={12}
              maxWidth={MAX_CONTENT_WIDTH}
              flex="grow"
            >
              <StatsColumn
                number="192%"
                description="Users who visited our docs compared to 2021"
              />
              <StatsColumn number="73%" description="Designers using docs weekly (or more!)" />
            </Flex>
            <Box
              width="8%"
              maxWidth="175px"
              position="absolute"
              dangerouslySetInlineStyle={{
                __style: {
                  right: '10%',
                  transform: 'rotate(180deg)',
                },
              }}
            >
              <KnobShadow width="100%" className="fadeInRight" />
            </Box>
          </Box>
          <Box color="light">
            <Tokens />
            <Box paddingY={12} paddingX={SIDE_GAP} position="relative">
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Box marginBottom={8} paddingX={SIDE_GAP}>
                  <Heading align="center" accessibilityLevel={2}>
                    Components + tokens
                  </Heading>
                </Box>
                <Box
                  width="10%"
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '25%',
                      right: '5%',
                    },
                  }}
                >
                  <DonutShadow className="fadeInRight" width="100%" />
                </Box>
                <Box
                  width="10%"
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '40%',
                      left: '5%',
                    },
                  }}
                >
                  <Sparkle className="fadeInLeft" width="100%" />
                </Box>
                <Flex gap={4} direction="column" maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    Gestalt shipped 38 component additions and updates this year, including some
                    game-changers like the new{' '}
                    <GestaltLink href="/web/sidenavigation" display="inlineBlock">
                      SideNavigation
                    </GestaltLink>{' '}
                    and our big{' '}
                    <GestaltLink href="/web/pageheader" display="inlineBlock">
                      PageHeader
                    </GestaltLink>{' '}
                    overhaul.
                  </Text>
                  <Text size="400">
                    2022 saw a 11% bump in overall use of Gestalt instances in the Pinterest Web
                    codebase. We were most excited to see a 28% increase in our more complex
                    components (think something like{' '}
                    <GestaltLink href="/web/slimbanner" display="inlineBlock">
                      SlimBanner
                    </GestaltLink>{' '}
                    as opposed to{' '}
                    <GestaltLink href="/web/text" display="inlineBlock">
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
                    number="28%"
                    description="Increase in complex Gestalt component instances"
                  />
                  <StatsGrid number="~2k" description="In-product accessibility enhancements" />
                  <StatsGrid
                    number="8,342"
                    description="Lines of code removed due to Gestalt adoption"
                  />
                </div>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: 'var(--color-teal-spabattical-100)',
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
              <Flex direction="column" alignItems="center" justifyContent="center">
                <Box marginBottom={8}>
                  <Heading align="center" accessibilityLevel={2}>
                    Extreme makeover:
                    <br />
                    Figma edition
                  </Heading>
                </Box>
                <Flex gap={4} direction="column" maxWidth={MAX_CONTENT_WIDTH}>
                  <Text size="400">
                    You’ve seen our engineering achievements, but what about design? 2022 was our
                    love letter to the amazing Pinterest designers—starting with our Figma
                    libraries. And{' '}
                    <Text size="400" inline italic>
                      oof
                    </Text>
                    , they really needed work! If we told you everything we did, we’d be here until
                    2023! So here are some of our faves:
                  </Text>
                  <Text size="400">
                    We completely restructured and simplified all our libraries. We used Figma’s new
                    component properties to cut 500 total variants. Dark mode variants were added to
                    all mobile components and we shipped a complete redesign of our Pin component.{' '}
                    <Text size="400" inline italic>
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
                  width="10%"
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '70%',
                      right: '5%',
                    },
                  }}
                >
                  <SparkleShadow className="fadeInRight" width="100%" />
                </Box>
                <Box
                  width="10%"
                  position="absolute"
                  dangerouslySetInlineStyle={{
                    __style: {
                      top: '30%',
                      left: '5%',
                    },
                  }}
                >
                  <DonutShadow className="fadeInLeft" width="100%" />
                </Box>
                <Box paddingY={12}>
                  <div className="statsGrid">
                    <StatsGrid number="1.92M" description="Total Gestalt Figma component insert" />
                    <StatsGrid number="0.56%" description="Component detach rate" />
                    <StatsGrid number="45%" description="Peak design adoption rate" />
                  </div>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box color="light" marginBottom={12}>
            <DSD />
            <Box paddingX={SIDE_GAP}>
              <Flex alignItems="center" justifyContent="center" direction="column">
                <Box paddingY={12}>
                  <Heading align="center" accessibilityLevel={2}>
                    Design Systems Day-um!
                  </Heading>
                </Box>
                <Flex alignItems="start" justifyContent="center" gap={12} wrap>
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
                    smDirection="row"
                    mdDirection="column"
                    display="flex"
                    justifyContent="between"
                    alignItems="start"
                  >
                    <StatsColumn
                      number="88%"
                      description="Attendees responded the conference helped them learn how to improve product quality"
                    />
                    <Box padding={6} />
                    <StatsColumn number="90" description="Total conference attendees" />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-purple-mysticool-200)' },
            }}
            paddingY={12}
            paddingX={SIDE_GAP}
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Box maxWidth="890px">
              <Lottie animationData={Vibes} autoplay={!shouldReduceMotion} />
            </Box>
            <Box position="relative" width="100%">
              <Box
                width="10%"
                position="absolute"
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '70%',
                    right: '5%',
                  },
                }}
              >
                <CircleShadow className="fadeInRight" width="100%" />
              </Box>
              <Box
                width="8%"
                position="absolute"
                dangerouslySetInlineStyle={{
                  __style: {
                    top: '10%',
                    left: '5%',
                  },
                }}
              >
                <SparkleShadow className="fadeInLeft" width="100%" />
              </Box>
              <Flex direction="column" gap={12} alignItems="center">
                <Heading align="center" accessibilityLevel={2}>
                  Impeccable vibes
                </Heading>

                <Flex
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  gap={4}
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
                <Flex flex="grow" justifyContent="between" gap={12}>
                  <StatsColumn
                    number="95.5%"
                    description="Design sentiment compared to the second half of 2021—a “paltry” 32 point increase!"
                  />
                  <StatsColumn
                    number="100%"
                    description="Engineers in our core customer base responded that Gestalt speeds up their workflow"
                  />
                </Flex>
              </Flex>
            </Box>
          </Box>
          <Box
            dangerouslySetInlineStyle={{
              __style: { backgroundColor: 'var(--color-teal-spabattical-700)' },
            }}
            paddingY={12}
            paddingX={4}
          >
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box paddingX={10}>
                <Heading align="center" accessibilityLevel={2} color="light">
                  This was the year
                </Heading>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                dangerouslySetInlineStyle={{ __style: { flexWrap: 'wrap-reverse' } }}
                margin={4}
              >
                <Flex
                  direction="column"
                  gap={12}
                  maxWidth="550px"
                  alignItems="center"
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
                  <Button role="link" href="/home" text="Head back to Gestalt" />
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
