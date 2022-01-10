// @flow strict
import type { Node } from 'react';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="How to Hack Gestalt">
      <PageHeader
        name="How to Hack Gestalt"
        description="Guidelines for customizing Gestalt components."
        showSourceLink={false}
      />

      <MainSection name="Disclaimer">
        <MainSection.Subsection
          description={`
    For the vast majority of use cases, please do _not_ use these techniques. Gestalt's components enforce the design system by restricting possible usage. This is by design! However, in certain scenarios — experimental usage, usage on internal tools or other non-Pinner/M10n surfaces, etc. — it may be necessary to circumvent those restrictions to build the desired experience. With that in mind, here are some of the common techniques and the trade-offs for each.
    `}
        />
      </MainSection>

      <MainSection name="Creating new components">
        <MainSection.Subsection
          title="Forking components"
          description={`
When a Gestalt component doesn't quite match the desired design spec, a common idea is to fork the component: copy/paste the component's code into the target repo where it can be modified.
_Pro:_
- Complete freedom to make whatever changes are desired

_Con:_
- Duplicate code
- Drift from the original component can make re-integration difficult/impossible
- Heavy maintenance burden: any future updates to Gestalt (changes to color, rounding, etc) will need to be made manually, and will likely lead to a broken/outdated UI in the meantime

_Alternative:_ Chat with the Gestalt team about your needs and let's see how we can accommodate them. Often features that we don't support are for accessibility or other reasons — but we're happy to see how we can support you!
`}
        />

        <MainSection.Subsection
          title="Custom components"
          description={`
Custom components can also be made from scratch, using native DOM elements and CSS/SCSS.
_Pro:_
- Complete freedom to build whatever UI is desired

_Con:_
- Adds to bundle size with custom stylesheets instead of taking advantage of Gestalt's common styles
- Creates disjointed app feel by not working within the design system
- Heavy maintenance burden: no support from Gestalt team for future updates

_Alternative:_ Chat with the Gestalt team about your needs and let's see how we can accommodate them. If we can't officially support your needs, at least use Gestalt primitives (Box, TapArea, etc) when building your custom UI to ensure that your feature is accessible and fits in with the rest of the design system.
        `}
        />
      </MainSection>

      <MainSection name="Modifications to Existing Components">
        <MainSection.Subsection
          title={`Box's \`dangerouslySetInlineStyle\``}
          description={`

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

      <MainSection name="What kind of support can you expect from the team?">
        <MainSection.Subsection
          description={`
We are always happy to help answer questions regarding Gestalt component design and usage, design system best practices, accessibility, icons and colors. If it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to answer and/or point you to the person who can. Feel free to reach out to us on [Slack](http://gestalt.pinterest.systems/how_to_work_with_us#Slack-channels) anytime.
We also offer documentation on this site ([go/GestaltWeb](https://gestalt.pinterest.systems/)) and a [Figma library](https://pinch/gestaltFigma) of components that exist within Gestalt.
`}
        />
      </MainSection>

      <MainSection name="Resources, Slack, and Meetings — oh my!">
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
      Primarily Pinner and M10n designers, though engineers are welcome if there are technical concerns as well.
    - _Cadence_
      Twice a week on Tuesdays and Thursdays. Please [sign up](https://pinch.pinadmin.com/gestaltSignUp) for a half-hour slot with your discussion topic.
2.  **Component Crit**
    - _Purpose_
      For systems designers seeking feedback from the larger design org on systems-related designs.
    - _Audience_
      Pinterest designers and Gestalt engineers. The agenda for the Crit can be found in the recurring calendar invite. Please continue to bring component work to Office Hours.
    - _Cadence_
      Every other Friday. Please sign up through the link in the calendar invite.
`}
        />
      </MainSection>
    </Page>
  );
}
