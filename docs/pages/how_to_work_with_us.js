// @flow strict
import { type Node } from 'react';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="How to work with us">
      <PageHeader
        name="How to work with us"
        description="Guidelines on how to engage with the Gestalt team, when to work with us, and how to contribute."
        showSourceLink={false}
      />

      <MainSection name="What goes into Gestalt">
        <MainSection.Subsection
          description={`The goal of Gestalt is to create a shared library of design best practices, React components, and documentation. Therefore, the best contenders for addition to Gestalt are designs or components that benefit multiple teams and are used regularly throughout our products.
    `}
        />
      </MainSection>

      <MainSection name="Requesting a new component or changes">
        <MainSection.Subsection
          description={`
**Please note:** The process below applies to Pinterest employees.
We ask that any ideas that change the functionality of an existing Gestalt component or introduce a net-new component go through the following process:
1. **Present work early in our [partnership meetings](#Meetings-and-events)**
    What we build into Gestalt comes from the teams across Pinterest, so we’d love to pair with you early and often! Seeing early mocks, wireframes, or even product roadmaps and learning where your project may be going helps inform our team OKRs. The earlier we see the work, the better we're able to plan and the higher the likelihood we'll be able to help. Please [sign up](https://pinch.pinadmin.com/gestaltSignUp) for an Office Hours slot with your discussion topic.
2. **Iterate on solutions**
We love to see more iteration from the product designer asking for the component if they have the time, ensuring all edge cases have been considered. If not, the component will follow our prioritization process.
3. **Prioritization by the Gestalt team**
  If our team takes on the work, we will add it to our [backlog](https://pinch.pinadmin.com/gestaltBacklog) and prioritize it appropriately. Typically the determining factor for taking on work is capacity: if your designers or engineers have the capacity, we’d love for them to [contribute to Gestalt](#How-can-you-contribute-to-gestalt-as-an-engineer) with our support. Otherwise, the Gestalt designers and engineers will prioritize the work against our current workload based on the following criteria.
  Some questions we ask ourselves when prioritizing:
    1. How many products/surfaces will benefit?
        - Ideally, we build things into Gestalt that 2 or more teams need, more teams meaning higher priority.
    2. How easy or difficult is it to build?
        - How many engineering hours will it take to build?
        - Are there accessibility concerns that Gestalt should ideally handle?
    3. Is it a dependency to other future work we need to do within Gestalt?
        - Will this unlock additional functionality that other teams need?
        We prioritize work following the same cycles as product teams within Pinterest. Knowing other teams' needs before prioritization starts will help inform our roadmap. If we do not have the capacity for the work but believe we should add it to Gestalt, we may ask if a product team can continue the work. Otherwise, it will go into our [backlog](https://pinch.pinadmin.com/gestaltBacklog).
4. **Build or follow along**
    Our team will pair directly with your engineer and designer if they are the ones who will be taking on the work and help them follow the process below. If the Gestalt team is building the component, we will take on the work and follow the same process. As we develop the documentation, Figma files, and code for the updated or new component, we'd love for you to help review and be part of a final check.`}
        />
      </MainSection>

      <MainSection name="Contributing to Gestalt">
        <MainSection.Subsection
          title="Making a design contribution"
          description={`
We love the help and contributions of other designers across Pinterest, and we ask that any ideas that change the functionality of an existing Gestalt component or introduce a net-new component go through the following process:
1. **Present your idea or suggestion during our Office Hour meetings**
    [Sign up](https://pinch.pinadmin.com/gestaltSignUp) for an Office Hours slot! Explain project goals and show multiple options explored with and without Gestalt components. It does not need to be a polished presentation but should have enough detail to help us understand the request and why it is needed.
2. **Create a Branch in our design library**
    Create a Branch file in our main library adding your design updates and component addition. Don't worry, our design team will support you with that. See [Branching in Figma](https://www.figma.com/best-practices/branching-in-figma/) for more details and self-education.
3. **Present your work in the Gestalt open forum meeting**
Our design team will coordinate a time with you to present your work to other designers and engineers and collect feedback.
4. **Send your Branch to review**
After your Branch is ready, add a Gestalt reviewer (designer) to your Branch. Our design team will approve and merge your updates when prepared to implement them in our web docs. We will follow up with you!
`}
        />
        <MainSection.Subsection
          title="Making an engineering contribution"
          description={`
We always appreciate the help and contributions of other engineers across Pinterest, whether it's new variants, simple bug fixes or building out entire components. Before any code changes happen though, be sure to follow our [request process](#What-is-the-process-to-request-new-additions-or-changes).
1. **Talk to your designer**
   Check in with your designer and make sure the changes have been approved by the Gestalt team, via the [request process](#What-is-the-process-to-request-new-additions-or-changes). We don’t recommend starting a PR on new functionality — no matter how small — without confirming this, as you may spend time on changes that won’t be approved to merge into Gestalt.
2. **Technical Design Doc**
   Create a technical design doc (TDD), using [this template](https://pinch.pinadmin.com/gestaltTDD), for any net-new components or component additions/updates within Gestalt. This allows everyone to discuss the component API and functionality before starting to build.
3. **Implement and Test**
   Once the TDD has been finalized, it's time to build! If creating a new component, check out our [scaffolding script](https://github.com/pinterest/gestalt/blob/master/scripts/generateComponent.js). Don't forget about tests! If updating an existing component, please remember to update/add unit tests. Use \`.test.js\` to test UI and \`.jsdom.test.js\` to test interactions. Note that accessibility integration tests cover both the component itself and the related docs page. Run the test suites using the [package.json scripts](https://github.com/pinterest/gestalt/blob/master/package.json#L101).
4. **Pull request**
    When your work is complete and all tests are passing, make a _draft_ pull request for your changes by following the [development guidelines](/development). This will start the CI process, running a variety of tests. Once those tests are passing (aside from the semver one), mark your PR as _"Ready for review"_ and ping us on [#gestalt-web](https://pinch.pinadmin.com/gestaltSlack). Your changes will be reviewed by an engineer and a designer from the Gestalt team. We ensure each component is built to spec, accessible, performant and works well with other components.
5. **Release**
   Now the fun part: releasing your component! After a Gestalt team member merges your change and Pinboard has been updated, feel free to announce your component/changes on the [#gestalt-web](https://pinch.pinadmin.com/gestaltSlack) Slack channel.
`}
        />
        <MainSection.Subsection
          title="Other ways to contribute"
          description={`
**Bugs**
If you think you’ve found a bug with Gestalt components or documentation, first check our [Gestalt Bugs Dashboard](https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29639) to see if it’s already been reported. If it hasn’t, please file a bug within the [Bugs](https://pinch.pinadmin.com/gestaltJiraBugs) Jira project and set the Component to ”gestalt”. We do not actively monitor GitHub issues, so the best way to file is through Jira.
**Surveys**
The Gestalt team sends out twice-yearly surveys to the design and engineering orgs. Filling out this survey is one way to help inform our team on what is working and what is not working about out design system.
`}
        />
      </MainSection>

      <MainSection name="Support you can you expect from the team">
        <MainSection.Subsection
          description={`
We are always happy to help answer questions regarding Gestalt component design and usage, design system best practices, accessibility, icons and colors. If it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to answer and/or point you to the person who can. Feel free to reach out to us on [Slack](http://gestalt.pinterest.systems/how_to_work_with_us#Slack-channels) anytime.
We also offer documentation on this site ([go/GestaltWeb](https://gestalt.pinterest.systems/)) and a [Figma library](https://pinch/gestaltFigma) of components that exist within Gestalt.
`}
        />
      </MainSection>

      <MainSection name="Resources, Slack, and meetings — oh my!">
        <MainSection.Subsection
          title="Dashboards, Jira, and OKRs"
          description={`
If you’re curious what we’re working on, you can check out our Gestalt [Sprint Dashboard](https://pinch.pinadmin.com/gestaltSprint), our [full backlog](https://pinch.pinadmin.com/gestaltBacklog), and our [Bugs Dashboard](https://pinch.pinadmin.com/gestaltJiraBugs).
To see the bigger picture, you can view our [OKRs](https://pinch.pinadmin.com/gestaltOKR) to understand our roadmap and priorities for each quarter. These priorities are determined through [partnership meetings](#Meetings-and-events), which we use to learn about component needs and coordinate with designers to determine timelines.
`}
        />
        <MainSection.Subsection
          title="Slack channels"
          description={`
Before reaching out, take a look at our [documentation](https://gestalt.pinterest.systems/) to see if it answers your question, because it will likely get you the fastest answer. Still need help? Try searching Slack for your question, and then feel free to ask if your question hasn’t been answered in the past. You can also reference our [Communication Guidelines](https://pinch.pinadmin.com/gestaltCommsGuidelines) for more info.
[#gestalt-design](https://pinch.pinadmin.com/gestaltSlackDesign) is for design-focused questions.
[#gestalt-web](https://pinch.pinadmin.com/gestaltSlack) is for engineering-focused questions.
`}
        />
        <MainSection.Subsection
          title="Meetings and events"
          description={`
Our meetings, events, and timelines can be found on the [Gestalt Event Calendar](https://pinch.pinadmin.com/gestaltCalendar). We offer two different meetings for the community to bring questions, comments, ideas, and feedback:
1. **Gestalt Office Hours**
    - _Purpose_
      For product designers seeking feedback on their usage of design systems and visual language. This is also a great time to propose new components or component changes.
    - _Audience_
      Primarily designers, though engineers are welcome if there are technical concerns as well.
    - _Cadence_
      Twice a week on Tuesdays and Thursdays. Please [sign up](https://pinch.pinadmin.com/gestaltSignUp) for a half-hour slot with your discussion topic.
2.  **Gestalt Open Forum**
    - _Purpose_
      For systems designers seeking feedback from the larger design org and everything else design system related.
    - _Audience_
      Pinterest designers and Gestalt engineers. The agenda for the Crit can be found in the recurring calendar invite. Please continue to bring component work to Office Hours.
    - _Cadence_
      Every third Thursday of the month. Please sign up through the link in the calendar invite.
`}
        />
      </MainSection>
    </Page>
  );
}
