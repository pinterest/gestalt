// @flow strict
import { type Node } from 'react';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="Getting started as a designer">
      <PageHeader name="Getting started as a designer" description="" showSourceLink={false} />

      <MainSection name="Getting set up">
        <MainSection.Subsection
          description={`
          The Gestalt system provides Pinterest with a shared language, facilitates collaboration across functions, and establishes design cohesion. The tools below will set you up to access the most up-to-date designs and standards.
    `}
        />
        <MainSection.Subsection
          title="Onboarding"
          description={`
In your first couple of weeks at Pinterest, you will receive an invite from your manager to a Gestalt onboarding session. This session will give you an overview of Gestalt, how it’s used, and serve as a time to ask any questions you may have.
          `}
        />
        <MainSection.Subsection
          title="Connecting to Gestalt in Figma"
          description={`
1. You may be able to download Figma directly from the [Figma Website](https://www.figma.com/downloads/). If you do not have the appropriate access you can request access through the [Pinterest Approved Software Collection](http://w.pinadmin.com/display/SOFTWARE/Figma).
2. Once you have Figma on your computer, you can open the application and select “Log in with SAML SSO.” From there, enter your Pinterest email address and open Figma.
3. From the left-hand column, select “Pinterest” and join the Gestalt team to gain access to the Gestalt asset libraries and documentation.
4. When creating or opening an existing design file, you should see the Gestalt components populate under the “Assets” tab in the left-hand column. Libraries include Web Sticker Sheet, IOS Sticker Sheet, Android Library, Gestalt Icons, and Platform Extras.
5. The [#gestalt-design](https://pinterest.slack.com/archives/C0HUV5J93) Slack channel is always here to support you.
          `}
        />
        <MainSection.Subsection
          title="Figma library tips"
          description={`
* Avoid detaching components when possible. Instead, use the component’s variant options or show and hide layers within the component. If a component is not working as expected, reach out via #gestalt-design.
* Make sure to keep your components up-to-date. You may see a notification in the bottom right corner of Figma when an update is available.
          `}
        />
        <MainSection.Subsection
          title="Private Figma plugins"
          description={`
**Please note: The following plugins are only available for Pinterest employees.**

[**Gestalt docs for Figma**](https://www.figma.com/community/plugin/977755389228415646/Gestalt-docs-for-Figma-(Beta))
View the Gestalt documentation without leaving Figma!

[**Pinsert**](https://www.figma.com/community/plugin/763812093925718603/Pinsert)
Insert Pins, Boards, and Profiles from Pinterest.

[**Pinterest Assets**](https://www.figma.com/community/plugin/1001559251745003811/Pinterest-Assets)
Insert Pinterest Brand-approved, royalty-free stock photography from curated collections on our DAM.

[**Pinterest Icon Exporter**](https://www.figma.com/community/plugin/809542389605054255/Pinterest-Icon-Exporter-(beta))
Export your self-created icons in all the sizes/formats for each platform
          `}
        />
        <MainSection.Subsection
          title="Additional Figma plugins"
          description={`
[**Able**](https://www.figma.com/community/plugin/734693888346260052/Able-%E2%80%93-Friction-free-accessibility)
Able makes accessibility easy while looking and feeling like Figma!

[**Spellchecker**](https://www.figma.com/community/plugin/738839069237725273/Spellchecker)
Spellchecker uses the Yandex API. Spellchecker helps to find and correct spelling errors.

[**Translator**](https://www.figma.com/community/plugin/743218037112142643/Translator)
Translator instantly translates the text in your Figma designs into other languages.
          `}
        />
        <MainSection.Subsection
          title="Fonts"
          description={`
[**SF Pro (iOS & Web)**](https://developer.apple.com/fonts/)
Fonts for Apple Platforms

[**Roboto (Android & Google Platforms)**](https://fonts.google.com/specimen/Roboto)
Google Fonts
          `}
        />
        <MainSection.Subsection
          title="Documentation"
          description={`
Wondering how a component works? The dos and donts of its use?

All of Gestalt’s documentation can be found right here at [gestalt.pinterest.systems](https://gestalt.pinterest.systems). This site is continuously updated and serves as the Gestalt source of truth. If you can’t find something or have ideas for our documentation, reach out or set up a meeting with the Gestalt team.

[**Gestalt docs for Figma**](https://www.figma.com/community/plugin/977755389228415646/Gestalt-docs-for-Figma-(Beta))
View the Gestalt documentation without leaving Figma!
          `}
        />
      </MainSection>

      <MainSection name="Connect with Gestalt">
        <MainSection.Subsection
          description={`
We are always happy to help answer Gestalt questions regarding component design and usage, design system best practices, accessibility, icons, and colors. If it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to point you to the person who has the answer.

For information on our slack channels, weekly meetings, and events, visit the [How to Work with Us](/how_to_work_with_us) page.`}
        />
      </MainSection>
    </Page>
  );
}
