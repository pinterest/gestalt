// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);
function Changelog() {
  return (
    <Box>
      <PageHeader name="How We Work" showSourceLink={false} />
      <Flex alignItems="start" direction="column" gap={4}>
        <Text>
          A design system is a collection of reusable components and clear standards to create
          products at scale. Our team is composed of designers and engineers who are passionate
          about building quality products at scale.
        </Text>
        <Heading size="md">Values</Heading>
        <Text>
          <ul>
            <li>We work in service to other teams.</li>
            <li>We enable accessibility within our products.</li>
            <li>We are the floor not the ceiling on product.</li>
            <li>We are the foundation of velocity and product excellence.</li>
          </ul>
        </Text>
        <Heading size="md">Prioritization</Heading>
        <Text>
          We prioritize work following the same cycles as product teams within Pinterest. Knowing
          other teams needs before prioritization starts will help inform our roadmap.
        </Text>
        <Heading size="sm">Some questions we ask ourselves when prioritizing:</Heading>
        <Text>
          <ul>
            <li>How many products/surfaces will benefit?</li>
            <li>How easy or difficult is it to build?</li>
            <li>Is it a dependency to other future work we need to do within Gestalt?</li>
          </ul>
        </Text>
        <Text>
          The more products that benefit, the easier the task and the more functionality we can
          unlock will allow for us to prioritize those changes higher than changes that benefit few
          surfaces, are very difficult or won’t unlock and additional functionality within Gestalt.
        </Text>
        <Heading size="md">Design driven approach</Heading>
        <Text>
          What we build into Gestalt comes from the teams across Pinterest. This begins with the
          design explorations that are brought to Business Component Crit or Design System Office
          Hours. Anything that affects the functionality of a component needs to be reviewed by
          design first.
        </Text>
        <Text>
          <ol>
            <li>
              <strong>Come early to one of these meetings:</strong> Help us understand your needs by
              explaining project goals and showing us multiple options explored with and without
              Gestalt components. Have an idea on what your project timelines are. Coordinate with
              other designers when possible if there are overlapping needs. This helps us prioritize
              in our roadmap your needs when it is a common need with other teams.
            </li>
            <li>
              <strong>Iterate on solutions:</strong> We will better be able to prioritize your needs
              when your designs have been reviewed through multiple crits and have explored all edge
              cases. Some things we need to know for building components: - Empty states -
              Truncation/internationalization - Responsive behavior - Dark mode If our team needs to
              take on the work, we will add it to our backlog and prioritize it appropriately.
            </li>
            <li>
              <strong>Deliver final designs:</strong> Final design specs will be delivered to
              engineering for build. This also means developing documentation, creating Figma
              library files and being part of the code review process. This is something our team
              takes which is why it is important to come early in your design process so we can
              prioritize appropriately.
            </li>
          </ol>
        </Text>
        <Heading size="md">Engineering contribution for new or added functionality</Heading>
        <Text>
          We always appreciate the help and contributions of other engineers across Pinterest. It
          could be simple bug fixes or building out entire components. Anything added to Gestalt
          that is new functionality should come from designs that have been through Business
          Component Crit or Design System Office Hours.
        </Text>
        <Text>
          <ol>
            <li>
              <strong>Talk to your designer:</strong> Checking in with your designers to make sure
              they’ve done their part in reviewing their work with the Gestalt Design Team will
              assure that changes are approved to go into Gestalt. We do not recommend starting a PR
              on new functionality without confirming this as you may spend time on changes that
              won’t be approved to merge into Gestalt.
            </li>
            <li>
              <strong>Tech Design Doc:</strong> We require a tech design doc for most components and
              larger add ons within Gestalt. This allows everyone to discuss the component API and
              functionality before starting to build. We provide a helpful template to start this
              process.
            </li>
            <li>
              <strong>Pull request:</strong> Make a pull request for your changes. Follow the pull
              request guidelines. Your changes will be reviewed the the Gestalt Core Team. We ensure
              each component is accessible, performant and works with other components.
            </li>
            <li>
              <strong>Release:</strong> The fun part is you get to release your component! Feel free
              to announce it on gestalt-web slack channel.
            </li>
          </ol>
        </Text>
        <Heading size="md">Engineering bug fixes</Heading>

        <Heading size="md">Communication</Heading>

        <Text>
          The best way to reach the team is on Slack either{' '}
          <Link inline target="blank" href="https://pinterest.slack.com/archives/C0HUV5J93">
            #gestalt-design
          </Link>{' '}
          or{' '}
          <Link inline target="blank" href="https://pinterest.slack.com/archives/C13KLG5P0">
            #gestalt-web
          </Link>{' '}
          channels. Before reaching out, have a look at our{' '}
          <Link
            inline
            target="blank"
            href="https://paper.dropbox.com/doc/Gestalt-Design-Slack-Communication-Guidelines--BGwCp_OTSWeAEcvTJw0XYDUvAQ-2CXysUNfbx9mq0b6ge53Y"
          >
            Gestalt Design Slack Communication
          </Link>{' '}
          and take a look at our documentation to see if it answers your question.
        </Text>
      </Flex>
    </Box>
  );
}

card(<Changelog />);

export default cards;
