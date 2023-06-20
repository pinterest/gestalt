---
title: Contributions
description: Guidelines on how to engage with the Gestalt team, and contribute.
fullwidth: true
---

**Please note:** The contributions processes below apply to Pinterest employees.

You can find all the components available on Gestalt on our [Components page](https://gestalt.pinterest.systems/web/overview). If you want to request a net-new component not available in our libraries or request changes to an existing component, go to [Component request](/team_support/component_request).

## Making a design contribuition

Design system is about collaboration and building blocks! Gestalt offers the elements you need to create a consistent product. If you have an idea to improve Pinterest surfaces by partnering with the Gestalt team. We would love to collaborate with you! Follow the steps below to make a design contribution:

1. **Present your idea or suggestion during our Office Hour meetings**
    [Sign up](https://pinch.pinadmin.com/gestaltSignUp) for an office hours slot with your discussion topic!
    Bring your work early-on— What we build into Gestalt comes from the teams across Pinterest, so we’d love to provide guidance and support early and often! The earlier we see the work, the better we're able to plan and the higher the likelihood we'll be able to help. It does not need to be a polished presentation but should have enough detail to help us understand the help you need and provide support.
2. **Iterate on solutions**
    We love to see more iteration in your design. We ask you to consider all edge cases before presenting your work to us and coming up with explorations and possible solutions.
3. **Build or follow along**
   Our team will pair directly with you and the ones who will take on the work and guide the whole process. If the Gestalt team needs to build or modify a component, we will take on the work and follow the same process. As we develop the documentation, Figma files, and code for the updated or new component, we'd love for you to help review and be part of a final check.

### Pair design or consultancy

We love to contribute with product initiatives by placing a dedicated Gestalt designer in projects that need a design system perspective, such as:

- Support on turning a team-specific component into a Gestalt component
- Review and document patterns, guidelines and standards design org-wide
- Pair design from a systems perspective, such as creating a new component or reviewing design files
- Accessibility guidance

### Design crits

[Get in touch](https://pinch.pinadmin.com/gestaltSignUp) to request a Gestalt designer representative to join and provide insights into your projects. We're always happy to join other design teams' crits and studio sessions and give feedback from a design systems perspective.

## Making an engineering contribuition

We always appreciate the help and contributions of other engineers across Pinterest, whether it's new variants, simple bug fixes or building out entire components. Before any code changes happen though, be sure to follow the steps below:

1. **Talk to your designer**
   Check in with your designer and make sure the changes have been approved by the Gestalt team, via the [request process](/team_support/component_request). We don’t recommend starting a PR on new functionality — no matter how small — without confirming this, as you may spend time on changes that won’t be approved to merge into Gestalt.
2. **Technical Design Doc**
   Create a technical design doc (TDD), using [this template](https://pinch.pinadmin.com/gestaltTDD), for any net-new components or component additions/updates within Gestalt. This allows everyone to discuss the component API and functionality before starting to build.
3. **Implement and Test**
   Once the TDD has been finalized, it's time to build! If creating a new component, check out our [scaffolding script](https://github.com/pinterest/gestalt/blob/master/scripts/generateComponent.js). Don't forget about tests! If updating an existing component, please remember to update/add unit tests. Use \`.test.js\` to test UI and \`.jsdom.test.js\` to test interactions. Note that accessibility integration tests cover both the component itself and the related docs page. Run the test suites using the [package.json scripts](https://github.com/pinterest/gestalt/blob/master/package.json#L101).
4. **Pull request**
    When your work is complete and all tests are passing, make a _draft_ pull request for your changes by following the [development guidelines](/get_started/developers/installation). This will start the CI process, running a variety of tests. Once those tests are passing (aside from the semver one), mark your PR as _"Ready for review"_ and ping us on [#gestalt-eng-web](https://pinch.pinadmin.com/gestaltSlack). Your changes will be reviewed by an engineer and a designer from the Gestalt team. We ensure each component is built to spec, accessible, performant and works well with other components.
5. **Release**
   Now the fun part: releasing your component! After a Gestalt team member merges your change and Pinboard has been updated, feel free to announce your component/changes on the [#gestalt-eng-web](https://pinch.pinadmin.com/gestaltSlack) Slack channel.

## Other ways to contribuite

**Bugs**
If you think you’ve found a bug with Gestalt components or documentation, first check our [Gestalt bugs dashboard](https://jira.pinadmin.com/secure/Dashboard.jspa?selectPageId=29639) to see if it’s already been reported. If it hasn’t, please file a bug within the [Bugs](https://pinch.pinadmin.cm/gestaltJiraBugs) Jira project and set the Component to ”gestalt”. We do not actively monitor GitHub issues, so the best way to file is through Jira.
**Surveys**
The Gestalt team sends out twice-yearly surveys to the design and engineering orgs. Filling out this survey is one way to help inform our team on what is working and what is not working about out design system.
