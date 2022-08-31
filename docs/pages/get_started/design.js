// @flow strict
import { type Node } from 'react';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';

export default function DocsPage(): Node {
  return (
    <Page title="Get started as a designer">
      <PageHeader name="Get started as a designer" description="" type="guidelines" />

      <MainSection name="Get set up">
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
          title="Connect to Gestalt in Figma"
          description={`
1. You may be able to download Figma directly from the [Figma Website](FIGMA_DOWNLOADS). If you do not have the appropriate access you can request access through the [Pinterest Approved Software Collection](PINTEREST_APPROVED_SOFTWARE).
2. Once you have Figma on your computer, you can open the application and select “Log in with SAML SSO.” From there, enter your Pinterest email address and open Figma.
3. From the left-hand column, select “Pinterest” and join the Gestalt team to gain access to the Gestalt asset libraries and documentation.
4. When creating or opening an existing design file, you should see the Gestalt components populate under the “Assets” tab in the left-hand column. Libraries include Web Sticker Sheet, IOS Sticker Sheet, Android Library, Gestalt Icons, and Platform Extras.
5. The [#gestalt-design](SLACK_DESIGNSLACK_DESIGN) Slack channel is always here to support you.
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

[**Gestalt docs for Figma**](FIGMA_DOCS_PLUGIN)
View the Gestalt documentation without leaving Figma!

[**Pinsert**](FIGMA_PINSERT)
Insert Pins, Boards, and Profiles from Pinterest.

[**Pinterest Assets**](FIGMA_PINTEREST_ASSETS)
Insert Pinterest Brand-approved, royalty-free stock photography from curated collections on our DAM.

[**Pinterest Icon Exporter**](FIGMA_ICON_EXPORTER)
Export your self-created icons in all the sizes/formats for each platform
          `}
        />
        <MainSection.Subsection
          title="Additional Figma plugins"
          description={`
Pinterest employees should check out this full list of [approved Figma plugins](http://pinch.pinadmin.com/figma-plugins). We especially recommend:

[**Able**](FIGMA_ABLE_PLUGIN)
Able makes accessibility easy while looking and feeling like Figma!

[**Spellchecker**](FIGMA_SPELLCHECKER_PLUGIN)
Spellchecker uses the Yandex API. Spellchecker helps to find and correct spelling errors.

[**Translator**](FIGMA_TRANSLATOR_PLUGIN)
Translator instantly translates the text in your Figma designs into other languages.
          `}
        />
        <MainSection.Subsection
          title="Fonts"
          description={`
[**SF Pro (iOS & Web)**](FONTS_IOS_WEB)
Fonts for Apple Platforms

[**Roboto (Android & Google Platforms)**](FONTS_ANDROID)
Google Fonts
          `}
        />
        <MainSection.Subsection
          title="Documentation"
          description={`
Wondering how a component works? The dos and donts of its use?

All of Gestalt’s documentation can be found right here at [gestalt.pinterest.systems](GESTALT_CANONICAL). This site is continuously updated and serves as the Gestalt source of truth. If you can’t find something or have ideas for our documentation, reach out or set up a meeting with the Gestalt team.

[**Gestalt docs for Figma**](FIGMA_DOCS_PLUGIN)
View the Gestalt documentation without leaving Figma!
          `}
        />
      </MainSection>

      <MainSection name="Connect with Gestalt">
        <MainSection.Subsection
          description={`
We are always happy to help answer Gestalt questions regarding component design and usage, design system best practices, accessibility, icons, and colors. If it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to point you to the person who has the answer.

For information on our slack channels, weekly meetings, and events, visit the [How to Work with Us](/get_started/how_to_work_with_us) page.`}
        />
      </MainSection>
    </Page>
  );
}
