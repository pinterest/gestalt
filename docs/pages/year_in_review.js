/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-html-link-for-pages */
// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Heading, Icon, Text } from 'gestalt';
// $FlowExpectedError[untyped-import]
import Lottie from 'lottie-react';
import DiscoBall from '../graphics/year-in-review/disco.svg';
import Pencil from '../graphics/year-in-review/pencil.svg';
import Tokens from '../graphics/year-in-review/tokens.svg';
import Figma from '../graphics/year-in-review/figma.svg';
import DSD from '../graphics/year-in-review/dsd.svg';
import TheYear from '../graphics/year-in-review/theYear.svg';
import Vibes from '../graphics/year-in-review/vibes.svg';
// $FlowExpectedError[untyped-import]
import discoStars from '../graphics/year-in-review/discoStars.json';
import GestaltLogo from '../docs-components/GestaltLogo.js';

type PostProps = {|
  description: string,
  number: string,
  direction?: 'column' | 'row',
|};

function StatsItem({ number, description, direction = 'row' }: PostProps): Node {
  return (
    <Flex
      gap={direction === 'column' ? 2 : 8}
      direction={direction}
      alignItems={direction === 'column' ? 'start' : 'center'}
    >
      <p className="statsNumber">{number} </p>
      <Flex.Item maxWidth={direction === 'column' ? '250px' : undefined}>
        <Text size="400">{description}</Text>
      </Flex.Item>
    </Flex>
  );
}

export default function Blog(): Node {
  return (
    <div className="year-in-review">
      <Flex flex="grow" direction="column">
        <Box position="fixed" top left padding={4} mdPadding={8}>
          <a className="backButton" href="/home">
            <Icon icon="home" color="dark" accessibilityLabel="Home" size={28} />
            <GestaltLogo height={50} width={50} />
          </a>
        </Box>
        <Box
          width="100%"
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: 'var(--color-blue-skycicle-450)' },
          }}
        >
          <Flex direction="column" alignItems="center">
            <DiscoBall width="500px" />
            <Box position="absolute" dangerouslySetInlineStyle={{ __style: { top: '135px' } }}>
              <Lottie animationData={discoStars} loop={5} />
            </Box>
            <Heading align="center" accessibilityLevel={2} color="light">
              Gestalt 2022
            </Heading>
            <h1 className="h1Font">Year in Review</h1>
          </Flex>
        </Box>
        <Flex direction="column" alignItems="center">
          <div className="halfAndHalf">
            <Box
              color="light"
              padding={12}
              maxWidth="660px"
              dangerouslySetInlineStyle={{
                __style: {
                  border: '4px solid #111111',
                },
              }}
              margin={4}
            >
              <Flex gap={4} direction="column">
                <Text size="400">
                  It’s that time again. The days are getting shorter and so we’re obligated to share
                  what we did for the past year. Everybody’s doing it and who are we to buck
                  convention?
                </Text>
                <Text size="400">
                  The Gestalt team had high ambitions and even higher hopes for 2022. “This is the
                  year,” was said a few times and—spoiler alert— it was. This year exceeded nearly
                  all our expectations, and we’re going to cover exactly why that’s the case.
                </Text>
                <Text size="400">
                  We know your time’s precious, so we promise to keep this short, sweet and awesome.
                </Text>
              </Flex>
            </Box>
          </div>
        </Flex>
        <Box
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: 'var(--color-purple-mysticool-200)' },
          }}
          paddingY={12}
          paddingX={8}
        >
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Heading accessibilityLevel={2} align="center">
              Document revitalization
            </Heading>
            <Box maxWidth="760px" width="100%" marginBottom={6}>
              <Pencil />
            </Box>
            <Flex gap={4} maxWidth="660px" direction="column">
              <Text size="400">
                Documentation got tons of attention in 2021, and we doubled down this year. The
                biggest highlight of 2022 was the complete redesign of our site, not for funsies,
                but to expand its content. The site is lookin’ sharper than ever and has a whole
                library of foundational guidelines, a revamped icon library viewer, and
                brand-spankin’ new component guidelines for Android and iOS.{' '}
              </Text>
              <Text size="400">
                What has this work led to? Well, a whole lot more traffic. 186% unique users, 169%
                sessions and 142% page views. Higher satisfaction too: 86% overall docs satisfaction
                (46% giving the highest marks) and 73% of designers saying they view our docs at
                least weekly—that’s up 59 from the first half of 2020!
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Box color="light" margin={12} display="flex" justifyContent="center">
          <Flex alignItems="center" justifyContent="between" gap={12} maxWidth="660px" flex="grow">
            <StatsItem
              direction="column"
              number="73%"
              description="Of designers viewing our docs at least weekly"
            />
            <StatsItem
              direction="column"
              number="186%"
              description="Users who visited our docs compared to 2021"
            />
          </Flex>
        </Box>
        <Box>
          <Tokens />
          <Box paddingY={12} paddingX={8}>
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box marginBottom={8} paddingX={8}>
                <Heading align="center" accessibilityLevel={2}>
                  Component + token highlights
                </Heading>
              </Box>
              <Flex gap={4} direction="column" maxWidth="660px">
                <Text size="400">
                  Shocking as it may sound, our team worked on components and tokens this year. We
                  shipped 31 component additions/updates including some big guns like the PageHeader
                  overhaul and the brand new SideNavigation.
                </Text>
                <Text size="400">
                  Our components continue to be used more and more. 2022 saw a 11% bump in overall
                  Gestalt instances in the Web codebase. More excitingly, we saw a 28% increase in
                  non-primitive components (think SlimBanner as opposed to Text).
                </Text>
                <Text size="400">
                  We added 3 new token families to Gestalt, specifically data visualization colors,
                  elevation and opacity. That’s cool, but the highlight for 2022 was what we did
                  with tokens we already had. Nothing big, we just shipped a tokenized dark mode for
                  mobile web in 4 engineering days and revamped our type treatments on the Web
                  platform across the entire product. You know, whatevs.
                </Text>
                <Text size="400">
                  We took accessibility literally and made 12 component improvements to Gestalt.
                  These included things like{' '}
                  <Text weight="bold" inline size="400">
                    more accessible error messages in our form fields, a more semantic-friendly
                    Image and an accessibility-friendly RadioGroup component
                  </Text>
                  . 12 may not seem like a big number, so here’s a bigger one: 2,000. That’s roughly
                  the number of accessibility improvements our 12 updates made in product.
                </Text>
                <Text size="400">
                  Speaking of in-product improvements, we found the time to replace legacy custom
                  components with Gestalt equivalents. This work improved overall product
                  consistency AND gave us permission to remove stuff. There’s nothing more joyous
                  than that! There were 8,342 lines in our Web codebase that didn’t spark joy. You
                  can guess what happened next...
                </Text>
              </Flex>
              <Box paddingY={8} width="75%">
                <hr />
              </Box>
              <Flex direction="column" gap={4}>
                <StatsItem
                  number="28%"
                  description="Increase in higher-order Gestalt component instances"
                />
                <StatsItem number="~1.5k" description="In-product accessibility enhancements" />
                <StatsItem
                  number="8.3k"
                  description="Lines of code removed due to Gestalt adoption"
                />
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: 'var(--color-teal-spabattical-100)' },
          }}
        >
          <Figma />
          <Box paddingX={8}>
            <Flex direction="column" alignItems="center" justifyContent="center">
              <Box marginBottom={8}>
                <Heading align="center" accessibilityLevel={2}>
                  Extreme makeover: Figma edition
                </Heading>
              </Box>
              <Flex gap={4} direction="column" maxWidth="660px">
                <Text size="400">
                  That covers engineering, but what about design? 2022 was intended to be our
                  love-letter to our amazing designers—starting with our Figma libraries. And, oof,
                  they needed work. Honestly, if we covered everything we did, we’d need another
                  year-in-review altogether. So here’s the gist:{' '}
                </Text>
                <Text size="400">
                  We completely restructured and simplified all our libraries. We used Figma’s fancy
                  new component properties to cut total variants by a silly amount. Dark mode
                  variants were added to all mobile components and we shipped a complete rethink of
                  our Pin component. Pin is literally in our company name, so we should probably get
                  that one right...
                </Text>
                <Text size="400">
                  The results? Massive. Specifically, 1.92 MILLION inserts in these past 12 months.
                  The detaches? Paltry. Specifically, 0.56% of all inserts. The feedback? Rad. A 86%
                  satisfaction from designers, which is nice, but given that’s a 21% bump from the
                  last year, it turns nice to niceeeeeee.
                </Text>
                <Text size="400">
                  We also saw a Gestalt Figma component adoption high of 45% this year which was
                  roughly a 15% improvement from when we started tracking in this Spring. “Wait”,
                  you say. “How are you measuring adoption rates of your Figma components?” Because
                  we friggin’ built the ability to track adoption of our components within designs
                  in near real time! Yes, it’s very exciting. Yes, it changes everything. And yes,
                  we will be talking much more about this soon.{' '}
                </Text>
              </Flex>
              <Box paddingY={12}>
                <Flex direction="column" gap={4}>
                  <StatsItem number="1.92M" description="Total Gestalt Figma component insert" />
                  <StatsItem number="0.56%" description="Component detach rate" />
                  <StatsItem number="45%" description="Peak design adoption rate" />
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box marginBottom={12}>
          <DSD />
          <Box paddingX={8}>
            <Flex alignItems="center" justifyContent="center" direction="column">
              <Box paddingY={12}>
                <Heading align="center" accessibilityLevel={2}>
                  Design Systems Day-um!
                </Heading>
              </Box>
              <Flex alignItems="center" justifyContent="center" gap={12} maxWidth="660px" wrap>
                <Flex.Item>
                  <Flex direction="column" gap={4} flex="shrink">
                    <Text size="400">
                      Next, filed under “Things that make the Gestalt team awesome” was our first
                      conference,{' '}
                      <Text size="400" weight="bold" inline>
                        Design Systems Day
                      </Text>
                      . And while we may think design systems deserve more than a day, it was one
                      hell of a day. We had 6 sessions which included 8 external speakers from{' '}
                      <Text size="400" weight="bold" inline>
                        Meta, Procter & Gamble and Spotify
                      </Text>
                      . Roughly 90 people attended the conference, which ain’t shabby for our first
                      time out the gate.
                    </Text>
                    <Text size="400">
                      The upshot is that 88% of attendees responded they gained helpful information
                      to improve product quality. That seems well worth a day (or five) in our book.
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex gap={12}>
                  <StatsItem
                    direction="column"
                    number="88%"
                    description="Attendees responded the conference helped them learn how to improve product quality"
                  />
                  <StatsItem
                    direction="column"
                    number="90"
                    description="Total conference attendees"
                  />
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: 'var(--color-purple-mysticool-200)' },
          }}
          paddingY={12}
          paddingX={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Box maxWidth="890px" width="100%" marginBottom={6}>
            <Vibes />
          </Box>
          <Flex direction="column" gap={12}>
            <Heading align="center" accessibilityLevel={2}>
              Lastly, vibes
            </Heading>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              gap={4}
              maxWidth="660px"
            >
              <Text size="400">
                We left customer feedback for last to end with a bang. Our core engineering
                customers gave us a 96% overall satisfaction rating (+2 from last year) with 70% of
                giving us highest marks (+13 from last year). And design? We saw a 95% overall
                satisfaction rating (+33 from last year) with 23% of giving us highest marks—+12
                from last year!
              </Text>
              <Text size="400">
                90% of product designers responded that Gestalt speeds up their workflow with 35%
                giving highest marks. And if that isn’t bonkers enough, 100% of engineers in our
                core customer base responded that Gestalt speeds up their workflow (66% giving us
                highest marks). In this day and age, we can’t agree on anything, but it turns out we
                all agree Gestalt helps you work faster.{' '}
                <Text size="400" weight="bold" inline>
                  #gestalt2024
                </Text>
              </Text>
            </Flex>
            <Flex justifyContent="between" gap={12}>
              <StatsItem
                direction="column"
                number="95.5%"
                description="Design sentiment compared to the second half of 2021—a “paltry” 32 point increase!"
              />
              <StatsItem
                direction="column"
                number="100%"
                description="Engineers responded that Gestalt speeds up their workflow."
              />
            </Flex>
          </Flex>
        </Box>
        <Box
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: 'var(--color-teal-spabattical-700)' },
          }}
          paddingY={12}
        >
          <Flex direction="column" alignItems="center" justifyContent="center">
            <Box>
              <Heading align="center" accessibilityLevel={2} color="light">
                This was truly the year
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
                gap={4}
                maxWidth="550px"
                alignItems="center"
                mdAlignItems="start"
              >
                <Text color="light" size="400">
                  Years from now, when we look back at the history of Gestalt and relish how it’s
                  become everything we ever wanted it to be, we’ll say that 2022 was the turning
                  point. This year has been hard—exhaustingly hard. But what this small-yet-mighty
                  team has accomplished is, well, an accomplishment. And we’re going to ride that
                  high into 2023 where we think some real Merlin-level magic can begin to take
                  shape. So, stay tuned, stay frosty and stay excellent. We’ll see you next year.
                </Text>
                <Button role="link" href="/home" text="Head back to Gestalt" />
              </Flex>
              <Box margin={2}>
                <TheYear width="300px" />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
