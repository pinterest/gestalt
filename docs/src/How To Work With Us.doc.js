// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import Markdown from './components/Markdown.js';
import PageHeader from './components/PageHeader.js';
import pageContent from './how-to-work-with-us.md';

const cards: Array<Node> = [];

const card = (c) => cards.push(c);
function HowToWorkWithUs() {
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    fetch(pageContent)
      .then((res) => res.text())
      .then((md) => {
        setContent(md);
      });
  });

  return (
    <Box>
      <PageHeader name="How to work with us" showSourceLink={false} />

      <Markdown text={content} />

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
          we’re able to plan and the higher the likelihood we’ll be able to help. We ask that any
          ideas that change the functionality of an existing Gestalt component or introduce a
          net-new component go through the following process:
          <ol>
            <li>
              <strong>Present work early in our partnership meetings</strong>
              <ul>
                <li>
                  Explain project goals and show multiple options explored with and without Gestalt
                  components to help us understand your needs. This does not need to be a polished
                  presentation, but should have enough detail that we understand the ask and why it
                  is needed.
                </li>
                <li>
                  Coordinate with other designers if there are overlapping needs to help us better
                  prioritize in our roadmap.
                </li>
                <li>
                  Be able to explain how this component should be used or not used. This helps us in
                  testing the component against existing components and product surfaces.
                </li>
                <li>
                  Have a rough project timeline available. This allows us to determine if we’re able
                  to accommodate the work.
                </li>
              </ul>
            </li>

            <li>
              <strong>Iterate on solutions</strong>
              <br />
              We love to see more iteration from the product designer asking for the component, if
              they have the time. If not, the component will follow our prioritization process.
              After an initial crit, the designer (product designer or Gestalt designer) must ensure
              all edge cases have been considered and come back to component crit as needed. Some
              things to finalize before we can build the component:
              <ul>
                <li>Empty states</li>
                <li>Focus states</li>
                <li>Truncation/internationalization options</li>
                <li>Responsive behavior</li>
                <li>Dark mode support</li>
              </ul>
            </li>

            <li>
              <strong>Prioritization by the Gestalt team</strong>
              <br />
              <p>
                If our team takes on the work, we will add it to our backlog and prioritize it
                appropriately. Typically the determining factor for taking on work is capacity: if
                your designers or engineers have the capacity, we’d love for them to contribute to
                Gestalt with our support. Otherwise, the Gestalt designers and engineers will
                prioritize the work against our current workload based on the following criteria.
                Some questions we ask ourselves when prioritizing:
              </p>
              <strong>How many products/surfaces will benefit?</strong>
              <ul>
                <li>
                  Ideally, we build things into Gestalt that 2 or more teams need with more teams
                  meaning higher priority.
                </li>
              </ul>
              <strong>How easy or difficult is it to build?</strong>
              <ul>
                <li>How many engineering hours will it take to build?</li>
                <li>Are there accessibility concerns that should ideally be handled by Gestalt?</li>
              </ul>
              <strong>Is it a dependency to other future work we need to do within Gestalt?</strong>
              <ul>
                <li>Will this unlock additional functionality that other teams need?</li>
              </ul>
              <p>
                We prioritize work following the same cycles as product teams within Pinterest.
                Knowing other teams needs before prioritization starts will help inform our roadmap.
                If we do no have capacity for the work, but believe we should add it to Gestalt, we
                may ask if a product team can continue the work. Otherwise, it will go into our
                backlog.
              </p>
            </li>

            <li>
              <strong>Build or follow along</strong>
              <br />
              Our engineering team will pair directly with your engineer if they are the ones who
              will be taking on the work and help them follow the process below. If the Gestalt team
              is building the component, we will take on the work and follow the same process. As we
              develop the documentation, Figma files, and code for the updated or new component,
              we’d love for you to help review and be part of a final sanity check.
            </li>
          </ol>
        </Text>
        <Text>
          We ask that any ideas that change the functionality of an existing Gestalt component or
          introduce a net-new component go through the following process:
        </Text>
        <Heading size="md">How can you contribute to Gestalt as an engineer?</Heading>
        <Text>
          We always appreciate the help and contributions of other engineers across Pinterest. It
          could be new variants, simple bug fixes or building out entire components. Before any code
          happens though, be sure to follow our request process.
          <ol>
            <li>
              <strong>Talk to your designer:</strong>
              <br />
              Checking in with your designers and assure that changes have been approved by the
              Gestalt team, via the request process. We don’t recommend starting a PR on new
              functionality, no matter how small, without confirming this, as you may spend time on
              changes that won’t be approved to merge into Gestalt.
            </li>

            <li>
              <strong>Tech Design Doc:</strong>
              <br />
              Create a technical design doc (TDD), using this template, for any net-new components
              or component additions/updates within Gestalt. This allows everyone to discuss the
              component API and functionality before starting to build.
            </li>

            <li>
              <strong>Pull request:</strong>
              <br />
              Once the TDD has been finalized, make a pull request for your changes by following the
              development guidelines. Your changes will be reviewed by the gestalt-core GitHub Team
              and a Gestalt designer. We ensure each component is built to spec, accessible,
              performant and works well with other components.
            </li>

            <li>
              <strong>Release:</strong>
              <br />
              Now the fun part - releasing your component! After someone from the Gestalt team
              merges your change, feel free to announce it on the #gestalt-web slack channel.
            </li>
          </ol>
        </Text>
        <Heading size="md">Other ways to contribute</Heading>
        <Heading size="sm">Bugs</Heading>
        <Text>
          If you think you’ve found a bug with Gestalt components or documentation, first check our
          Gestalt Bugs Dashboard to see if it’s already been reported. If it hasn’t, please file a
          bug within the Bugs JIRA project and set the component=”gestalt”. We are not actively
          using GitHub issues, so the best way to file is through JIRA.
        </Text>
        <Heading size="sm">Surveys</Heading>
        <Text>
          The Gestalt team sends out surveys to the design and engineering orgs. Filling out this
          survey is one way to help inform our team on what is working and what is not working about
          out design system.
        </Text>

        <Heading size="md">What kind of support can you expect from the team?</Heading>
        <Text>
          We are always happy to help answer questions regarding Gestalt component design and usage,
          design system best practices, accessibility, Icons and colors. Essentially, if it’s part
          of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll
          try our best to answer and/or point you to the person who can.
        </Text>
        <Text>
          We also offer documentation on this site (
          <Link inline target="blank" href="https://gestalt.netlify.app/">
            go/GestaltWeb
          </Link>
          ) and a{' '}
          <Link
            inline
            target="blank"
            href="https://www.figma.com/file/vjhfBsOtHw0wVg67vqwz1v/01.-Web-Sticker-Sheet?node-id=2219%3A5757"
          >
            Figma library
          </Link>{' '}
          of components that exist within Gestalt.
        </Text>
        <Text />
        <Heading size="sm">Resources, Slack, and Meetings - oh my!</Heading>
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
          <Link
            inline
            target="blank"
            href="https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29640"
          >
            Sprint Dashboard
          </Link>
          , our{' '}
          <Link
            inline
            target="blank"
            href="https://jira.pinadmin.com/secure/RapidBoard.jspa?rapidView=1936&projectKey=PDS&view=planning.nodetail&issueLimit=100"
          >
            full backlog
          </Link>
          , and our{' '}
          <Link
            inline
            target="blank"
            href="https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29639"
          >
            Bugs Dashboard
          </Link>
          . You can also reference our{' '}
          <Link
            inline
            target="blank"
            href="https://docs.google.com/spreadsheets/d/10-s5BfpbesIpRTUhJSGH4tAriI-gdXHsT-eKDCtaMQk/edit#gid=1725470630"
          >
            go/GestaltTracker
          </Link>
          to see the immediate, larger component changes that are in the pipeline.
        </Text>
        <Text>
          To see the bigger picture, you can view our{' '}
          <Link
            inline
            target="blank"
            href="https://coda.io/d/Pinterest-2021-EPD-OKR-Tracker_de-g0jv4ClO/Gestalt-Design_suAbV#_luyId"
          >
            OKRs
          </Link>{' '}
          to understand our roadmap and priorities for each quarter. These priorities are determined
          through our{' '}
          <Link
            inline
            target="blank"
            href="https://paper.dropbox.com/doc/How-to-Work-with-Us--BGVO2I8uo7TY0t~zzbc5PAY7Ag-KSFgsi7Me5kEqhC7sR2VA#:h2=Meetings-and-Events"
          >
            partnership meetings
          </Link>
          , which we use to learn about component needs and coordinate with designers to determine
          the timelines.
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

card(<HowToWorkWithUs />);

export default cards;
