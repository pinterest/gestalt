// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);
function Changelog() {
  return (
    <Box>
      <PageHeader name="How to work with us" showSourceLink={false} />
      <Flex alignItems="start" direction="column" gap={4}>
        <Text>
          Guidelines on how to engage the Gestalt team, when to work with us, and how to contribute
        </Text>
        <Heading size="md">What goes into Gestalt?</Heading>
        <Text>
          The goal of Gestalt is to create a shared library of design best practices, React
          components, and documentation. Therefore, the best contenders for addition to Gestalt are
          designs or components that benefit multiple teams and are used regularly throughout our
          products.
        </Text>
        <Heading size="md">What is the process to request new additions or changes?</Heading>
        <Text>
          What we build into Gestalt comes from the teams across Pinterest, so we’d love to pair
          with you early and often! The process starts in the design phase. Seeing early mocks,
          wireframes or even product roadmaps in our partnership meetings to learn where your
          project may be going helps inform our team OKRs. The earlier we see the work, the better
          we’re able to plan and the higher the likelihood we’ll be able to help.
        </Text>
        <Text>
          We ask that any ideas that change the functionality of an existing Gestalt component or
          introduce a net-new component go through the following process:
        </Text>
        <Heading size="md">How can you contribute to Gestalt as an engineer?</Heading>
        <Text />
        <Heading size="md">Other ways to contribute</Heading>
        <Text />
        <Heading size="md">What kind of support can you expect from the team?</Heading>
        <Text />
        <Heading size="md">Resources, Slack, and Meetings - oh my!</Heading>

        <Heading size="sm">Meetings and Events </Heading>
        <Text>
          Our meetings, events, and timelines can be found on our{' '}
          <Link
            inline
            target="blank"
            href="https://calendar.google.com/calendar/u/0?cid=Y19ubnVsdjdjNGRsY3RxbG1jcHVlOWVyaHFuc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
          >
            Gestalt Event Calendar
          </Link>
          .
        </Text>

        <Heading size="sm">Dashboards, JIRA, and OKRs</Heading>
        <Text>
          If you’re curious what we’re working on, you can check out our Gestalt{' '}
          <Link inline target="blank" href="">
            Sprint Dashboard
          </Link>
          , our full backlog, and our Bugs Dashboard. You can also reference our go/GestaltTracker
          to see the immediate, larger component changes that are in the pipeline.
        </Text>
        <Text>
          To see the bigger picture, you can view our OKRs to understand our roadmap and priorities
          for each quarter. These priorities are determined through our partnership meetings, which
          we use to learn about component needs and coordinate with designers to determine the
          timelines.
        </Text>

        <Heading size="sm">Slack Channels</Heading>
        <Text>
          Before reaching out, take a look at our{' '}
          <Link inline target="blank" href="http://gestalt.netlifyapp.com/">
            documentation
          </Link>{' '}
          to see if it answers your question, because it will likely get you the fastest answer.
          Still need help? Try searching Slack for your question, and then feel free to ask if your
          question hasn’t been answered in the past. You can also reference our{' '}
          <Link inline target="blank" href="https://paper.dropbox.com/doc/2CXysUNfbx9mq0b6ge53Y">
            Communication Guidelines
          </Link>{' '}
          for more info.
        </Text>
        <Text>
          <Link inline target="blank" href="https://pinterest.slack.com/archives/C0HUV5J93">
            #gestalt-design
          </Link>{' '}
          is the best way to reach the Gestalt design team for design focused questions.
        </Text>
        <Text>
          <Link inline target="blank" href="https://pinterest.slack.com/archives/C13KLG5P0">
            #gestalt-web
          </Link>{' '}
          is for more engineering-focused questions.{' '}
        </Text>

        <Heading size="sm">Meetings and Events</Heading>
        <Text>
          We offer two different meetings for the community to come with questions, comments, ideas,
          and feedback.
          <ul>
            <li>
              Business Component Crit: Geared toward design work for our business products.{' '}
              <Link
                inline
                target="blank"
                href="https://paper.dropbox.com/doc/Meeting-notes-Ads-Design-Component-Crit--A0OnUFBJPWygCqBU2aMrhAaGAQ-9bkQ0frWwmRxkYRRq5fOm"
              >
                Sign up sheet and notes
              </Link>
            </li>
            <li>
              Design System Office Hours: Open space for discussing designs and getting feedback on
              component usage within the Pinner product.{' '}
              <Link
                inline
                target="blank"
                href="https://paper.dropbox.com/doc/Design-systems-office-hours-signup-sheet--BGF2OO1W31I96Pss5qFZ1Pz1Ag-oBkTKg5JUNO0POAzPxNl6"
              >
                Sign up sheet
              </Link>
            </li>
          </ul>
        </Text>
      </Flex>
    </Box>
  );
}

card(<Changelog />);

export default cards;
