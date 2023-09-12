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
1. You may be able to download Figma directly from the [Figma Website](https://www.figma.com/downloads/). If you do not have the appropriate access you can request access through the [Pinterest Approved Software Collection](http://w.pinadmin.com/display/SOFTWARE/Figma).
2. Once you have Figma on your computer, you can open the application and select “Log in with SAML SSO.” From there, enter your Pinterest email address and open Figma.
3. From the left-hand column, select “Pinterest” and join the Gestalt team to gain access to the Gestalt asset libraries and documentation.
4. When creating or opening an existing design file, you should see the Gestalt components populate under the “Assets” tab in the left-hand column. Libraries include Web Sticker OverlayPanel, IOS Sticker Sheet, Android Library, Gestalt Icons, and Platform Extras.
5. The [#gestalt-design](https://pinterest.slack.com/archives/C0HUV5J93) Slack channel is always here to support you.
          `}
        />
        <MainSection.Subsection
          title="Figma library tips"
          description={`
* Avoid detaching components when possible. Instead, use the component’s variant options or show and hide layers within the component. If a component is not working as expected, reach out via #gestalt-design.
* Make sure to keep your components up-to-date. You may see a notification in the bottom right corner of Figma when an update is available.
* We recommend using [Gestalt's handoff kit](http://pinch.pinadmin.com/figmaHandoffKit) when prepping a design for implementation. The handoff kit provides guidance on design file structure, best practices, and annotation/flow components to make the design handoff process smoother between engineers and designers.
* The [Product Surfaces library](http://pinch.pinadmin.com/ProductSurfaces) is a single reference point for all key product surfaces in Figma for many product areas. This collection of surfaces can be used as a faster way to reference, grab or duplicate product surfaces to your workflow.
          `}
        />
        <MainSection.Subsection
          title="Private Figma plugins"
          description={`
**Please note: The following plugins are only available for Pinterest employees.**

[![promo image for the pinterest design figma plugin](https://i.pinimg.com/originals/2f/d6/4a/2fd64af09238a059a1fb0fa6a18fc05b.png)](https://www.figma.com/community/plugin/1215463263194174399)
[**The Pinterest Design plugin**](https://www.figma.com/community/plugin/1215463263194174399)
The Pinterest Design Figma plugin is _the_   design tool to work faster and smarter. You can add Pinterest images directly to designs, export icons in production-ready formats, automatically convert UI to dark mode, reference design system documentation and more!

[**Pinterest Assets**](https://www.figma.com/community/plugin/1167574100578966652/Pinterest-Assets)
Insert Pinterest Brand-approved, royalty-free stock photography from curated collections on our DAM.

          `}
        />
        <MainSection.Subsection
          title="Additional Figma plugins"
          description={`
Pinterest employees should check out this full list of [approved Figma plugins](http://pinch.pinadmin.com/figma-plugins). We especially recommend:

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
Wondering how a component works? The dos and dont's of its use?

All of Gestalt’s documentation can be found right here at [gestalt.pinterest.systems](https://gestalt.pinterest.systems). This site is continuously updated and serves as the Gestalt source of truth. If you can’t find something or have ideas for our documentation, reach out or set up a meeting with the Gestalt team.

Access the Gestalt documentation without leaving Figma, by using the [Pinterest Design plugin](https://www.figma.com/community/plugin/1215463263194174399)! 

          `}
        />
      </MainSection>

      <MainSection name="Connect with Gestalt">
        <MainSection.Subsection
          description={`
We are always happy to help answer Gestalt questions regarding component design and usage, design system best practices, accessibility, icons, and colors. If it’s part of Gestalt, we’re here to help! If it’s outside of the realm of our design system, we’ll try our best to point you to the person who has the answer.

For information on our slack channels, weekly meetings, and events, visit the [How to Work with Us](/team_support/contributions) page.`}
        />
      </MainSection>
    </Page>
  );
}
