// @flow strict
import type { Node } from 'react';
import MainSection from './components/MainSection.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];

const card = (c) => cards.push(c);

card(
  <PageHeader
    name="How to Work with Us"
    description="Guidelines on how to engage the Gestalt team, when to work with us, and how to contribute"
    showSourceLink={false}
  />,
);

card(
  <MainSection name="What goes into Gestalt?">
    <MainSection.Subsection
      description={`
    The goal of Gestalt is to create a shared library of design best practices, React components, and documentation. Therefore, the best contenders for addition to Gestalt are designs or components that benefit multiple teams and are used regularly throughout our products.
    `}
    />
  </MainSection>,
);

card(
  <MainSection name="What is the process to request new additions or changes?">
    <MainSection.Subsection
      description={`
What we build into Gestalt comes from the teams across Pinterest, so we’d love to pair with you early and often! The process starts in the design phase. Seeing early mocks, wireframes or even product roadmaps in our [**partnership meetings**](#Meetings-and-events) to learn where your project may be going helps inform our team OKRs. The earlier we see the work, the better we’re able to plan and the higher the likelihood we’ll be able to help.

We ask that any ideas that change the functionality of an existing Gestalt component or introduce a net-new component go through the following process:
1. **Present work early in our [partnership meetings](#Meetings-and-events)**
    - Explain project goals and show multiple options explored with and without Gestalt components to help us understand your needs. This does not need to be a polished presentation, but should have enough detail that we understand the ask and why it is needed.
    - Coordinate with other designers if there are overlapping needs to help us better prioritize in our roadmap.
    - Be able to explain how this component should be used or not used. This helps us in testing the component against existing components and product surfaces.
    - Have a rough project timeline available. This allows us to determine if we’re able to accommodate the work.
2. **Iterate on solutions**
    We love to see more iteration from the product designer asking for the component, if they have the time. If not, the component will follow our prioritization process.
    After an initial crit, the designer (product designer or Gestalt designer) must ensure all edge cases have been considered and come back to component crit as needed.

    Some things to finalize before we can build the component:
    - Empty states
    - Focus states
    - Truncation/internationalization options
    - Responsive behavior
    - Dark mode support
3. **Prioritization by the Gestalt team**
  If our team takes on the work, we will add it to our [backlog](https://jira.pinadmin.com/secure/RapidBoard.jspa?rapidView=1936&projectKey=PDS&view=planning.nodetail&issueLimit=100) and prioritize it appropriately. Typically the determining factor for taking on work is capacity: if your designers or engineers have the capacity, we’d love for them to [contribute to Gestalt](#How-can-you-contribute-to-gestalt-as-an-engineer) with our support. Otherwise, the Gestalt designers and engineers will prioritize the work against our current workload based on the following criteria.

  Some questions we ask ourselves when prioritizing:
    1. How many products/surfaces will benefit?
        - Ideally, we build things into Gestalt that 2 or more teams need with more teams meaning higher priority.
    2. How easy or difficult is it to build?
        - How many engineering hours will it take to build?
        - Are there accessibility concerns that should ideally be handled by Gestalt?
    3. Is it a dependency to other future work we need to do within Gestalt?
        - Will this unlock additional functionality that other teams need?

  We prioritize work following the same cycles as product teams within Pinterest. Knowing other teams needs before prioritization starts will help inform our roadmap. If we do no have capacity for the work, but believe we should add it to Gestalt, we may ask if a product team can continue the work. Otherwise, it will go into our [backlog](https://jira.pinadmin.com/secure/RapidBoard.jspa?rapidView=1936&projectKey=PDS&view=planning.nodetail&issueLimit=100).
4. **Build or follow along**
    Our engineering team will pair directly with your engineer if they are the ones who will be taking on the work and help them follow the process below. If the Gestalt team is building the component, we will take on the work and follow the same process. As we develop the documentation, Figma files, and code for the updated or new component, we’d love for you to help review and be part of a final sanity check.`}
    />
  </MainSection>,
);

card(
  <MainSection name="How can you contribute to Gestalt as an engineer?">
    <MainSection.Subsection
      description={`
We always appreciate the help and contributions of other engineers across Pinterest. It could be new variants, simple bug fixes or building out entire components. Before any code happens though, be sure to follow our [request process](#What-is-the-process-to-request-new-additions-or-changes).

1. **Talk to your designer**
   Checking in with your designers and assure that changes have been approved by the Gestalt team, via the [request process](#What-is-the-process-to-request-new-additions-or-changes). We don’t recommend starting a PR on new functionality, no matter how small, without confirming this, as you may spend time on changes that won’t be approved to merge into Gestalt.
2. **Tech Design Doc**
   Create a technical design doc (TDD), using [this template](https://paper.dropbox.com/doc/Gestalt-TDD-ComponentName--BF5cp4OG2JXR_Vo7d5hsnVFEAg-A8wHbLtDhwbGjlyOTIg86), for any net-new components or component additions/updates within Gestalt. This allows everyone to discuss the component API and functionality before starting to build.
3. **Pull request**
   Once the TDD has been finalized, make a pull request for your changes by following the [development guidelines](/Development). Your changes will be reviewed by the gestalt-core GitHub Team and a Gestalt designer. We ensure each component is built to spec, accessible, performant and works well with other components.
4. **Release**
   Now the fun part - releasing your component! After someone from the Gestalt team merges your change, feel free to announce it on the [#gestalt-web](https://app.slack.com/client/T024LJUGB/C13KLG5P0/thread/C014X9LTRCN-1614382923.009100) slack channel.`}
    />
  </MainSection>,
);

card(
  <MainSection name="Other ways to contribute">
    <MainSection.Subsection
      description={`
**Bugs**
If you think you’ve found a bug with Gestalt components or documentation, first check our [Gestalt Bugs Dashboard](https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29639) to see if it’s already been reported. If it hasn’t, please file a bug within the [Bugs](https://jira.pinadmin.com/projects/BUG?selectedItem=com.atlassian.jira.jira-projects-plugin:components-page) JIRA project and set the component=”gestalt”. We are not actively using GitHub issues, so the best way to file is through JIRA.

**Surveys**
The Gestalt team sends out surveys to the design and engineering orgs. Filling out this survey is one way to help inform our team on what is working and what is not working about out design system.
`}
    />
  </MainSection>,
);

card(
  <MainSection name="What kind of support can you expect from the team?">
    <MainSection.Subsection
      description={`
We are always happy to help answer questions regarding Gestalt component design and usage, design system best practices, accessibility, Icons and colors. Essentially, if it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to answer and/or point you to the person who can.

We also offer documentation on this site ([go/GestaltWeb](https://gestalt.netlify.app/)) and a [Figma library](https://www.figma.com/file/vjhfBsOtHw0wVg67vqwz1v/01.-Web-Sticker-Sheet?node-id=2219%3A5757) of components that exist within Gestalt.`}
    />
  </MainSection>,
);

card(
  <MainSection name="Resources, Slack, and Meetings - oh my!">
    <MainSection.Subsection
      title="Dashboards, JIRA, and OKRs"
      description={`
If you’re curious what we’re working on, you can check out our Gestalt [Sprint Dashboard](https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29640), our [full backlog](https://jira.pinadmin.com/secure/RapidBoard.jspa?rapidView=1936&projectKey=PDS&view=planning.nodetail&issueLimit=100), and our [Bugs Dashboard](https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29639). You can also reference our [go/GestaltTracker](https://docs.google.com/spreadsheets/d/10-s5BfpbesIpRTUhJSGH4tAriI-gdXHsT-eKDCtaMQk/edit#gid=1725470630) to see the immediate, larger component changes that are in the pipeline.

To see the bigger picture, you can view our [OKRs](https://coda.io/d/Pinterest-2021-EPD-OKR-Tracker_de-g0jv4ClO/Gestalt-Design_suAbV#_luyId) to understand our roadmap and priorities for each quarter. These priorities are determined through our [partnership meetings](#Meetings-and-events), which we use to learn about component needs and coordinate with designers to determine the timelines.
`}
    />
    <MainSection.Subsection
      title="Slack channels"
      description={`
Before reaching out, take a look at our [documentation](http://gestalt.netlifyapp.com) to see if it answers your question, because it will likely get you the fastest answer. Still need help? Try searching Slack for your question, and then feel free to ask if your question hasn’t been answered in the past. You can also reference our [Communication Guidelines](https://paper.dropbox.com/doc/2CXysUNfbx9mq0b6ge53Y) for more info.

[#gestalt-design](https://pinterest.slack.com/archives/C0HUV5J93) is the best way to reach the Gestalt design team for design focused questions.

[#gestalt-web](https://pinterest.slack.com/archives/C13KLG5P0) is for more engineering-focused questions.`}
    />
    <MainSection.Subsection
      title="Meetings and events"
      description={`
Our meetings, events, and timelines can be found on our [Gestalt Event Calendar](https://calendar.google.com/calendar/u/0?cid=Y19ubnVsdjdjNGRsY3RxbG1jcHVlOWVyaHFuc0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t).

We offer two different meetings for the community to come with questions, comments, ideas, and feedback.

1. **Gestalt Office Hours**
    - Purpose
      For Product designers looking for feedback on their usage of design systems and visual language. This is also a great time to propose new components or component changes.
    - Audience
      The audience for office hours is expanding to include both Pinner and Business design.
    - Cadence
      Gestalt office hours are now available twice a week, with a 1 hour slot on both Tuesdays and Thursdays. [Sign up sheet](https://paper.dropbox.com/doc/Design-systems-office-hours-signup-sheet--BIjd4OFguvep2iUsMexRq3hOAg-oBkTKg5JUNO0POAzPxNl6)
2.  **Component Crit**
    - Purpose
      For Systems designers to get feedback from the larger design org on systems-related designs.
    - Audience
      A group of designers who represent the design org as a design system council. We decided to create a group in order to keep crits productive and a manageable size across the entire design team. We've worked with all the managers across design to come up with the initial participants. At times, we will invite designers outside of this group to join if their team will be immediate users of the component. Agenda can be found in the meeting invite. Please continue to bring component work to office hours.
    - Cadence
      Bi-weekly on Friday 1-2pm. Please sign up through the link in the calendar invite.
    `}
    />
  </MainSection>,
);

export default cards;
