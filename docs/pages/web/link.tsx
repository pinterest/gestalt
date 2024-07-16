import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import InternalDocumentationSection from '../../docs-components/InternalDocumentationSection';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibilityBoxes from '../../examples/link/accessibilityBoxes';
import accessibilityTiers from '../../examples/link/accessibilityTiers';
import doClarity from '../../examples/link/doClarity';
import doDisplayExternal from '../../examples/link/doDisplayExternal';
import doMatchStyle from '../../examples/link/doMatchStyle';
import doMeaning from '../../examples/link/doMeaning';
import dontGeneric from '../../examples/link/dontGeneric';
import dontMultiple from '../../examples/link/dontMultiple';
import dontOtherIcons from '../../examples/link/dontOtherIcons';
import dontOveruse from '../../examples/link/dontOveruse';
import dontUnderlineLists from '../../examples/link/dontUnderlineLists';
import dontWeightTexts from '../../examples/link/dontWeightTexts';
import doUnderline from '../../examples/link/doUnderline';
import doWeightLists from '../../examples/link/doWeightLists';
import inline from '../../examples/link/inline';
import localizationLabels from '../../examples/link/localizationLabels';
import main from '../../examples/link/main';
import variantExternalIcon from '../../examples/link/variantExternalIcon';
import variantHiddenUnderline from '../../examples/link/variantHiddenUnderline';
import variantInlineLink from '../../examples/link/variantInlineLink';
import variantInlineOverride from '../../examples/link/variantInlineOverride';
import variantLinkText from '../../examples/link/variantLinkText';
import variantRel from '../../examples/link/variantRel';
import variantStandaloneLink from '../../examples/link/variantStandaloneLink';
import variantTarget from '../../examples/link/variantTarget';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Badge example" previewHeight={150} />
      </PageHeader>
      <GeneratedPropTable excludeProps={['disabled']} generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Primarily for navigation, and usually within or directly accompanying a sentence. In particular cases, a Link is used to trigger actions assisting in a task completion in addition to navigation. However, these links should still serve as a support to a navigation purpose.
- Directing users to another page or a different portion of the same page.
- Jump to an element on the same page.
- Highlighting URL destinations.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Actions that will change data, change a state, or trigger a high-emphasis action. Use [Button](/web/button) instead.
- In [Heading](/web/heading), as headings aren't easily recognizable as interactive elements. Headings can act as anchor elements on the page (accompanied by the "link" [Icon](/web/icon)), but if the heading needs to take users to a different page, add a subtitle next to the heading with an inline Link instead.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Display an underline on inline Links in the context of heavy text around them or in dense layouts such as Links on dashboards. The underline helps to determine its interactivity and reinforces accessibility standards."
            sandpackExample={
              <SandpackExample
                code={doUnderline}
                hideEditor
                layout="column"
                name="Do - Underline"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a bold font weight to represent inline Links in the context of text around them. Bold font weight in the text context can be perceived as emphasis purposes, and it could fail to convey interactivity. "
            sandpackExample={
              <SandpackExample
                code={dontWeightTexts}
                hideControls
                hideEditor
                name="Don't - Font Weight In Text"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use bold font-weight in link elements such as lists, profile and board names, and any link element that an underline style isn't necessary to convey interactivity. For example, the user easily recognizes the bold element as a link since it is a typical treatment across our surfaces."
            sandpackExample={
              <SandpackExample
                code={doWeightLists}
                hideEditor
                layout="column"
                name="Do - Font Weight In Lists"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Display an underline on Links that aren't within a paragraph context, for example, lists or table links, as it could create cognitive load. Please note: If these elements are nested inside message components, consider displaying an underline, as it reinforces interactivity."
            sandpackExample={
              <SandpackExample
                code={dontUnderlineLists}
                hideControls
                hideEditor
                name="Don't - Underline Lists"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Match Link to the text size and font-weight of the content they are accompanying for consistency and visual balance."
            sandpackExample={
              <SandpackExample
                code={doMatchStyle}
                hideEditor
                layout="column"
                name="Do - Match Styles"
                previewHeight={350}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Apply multiple text styles on links paired with text, as it can create inconsistency it can make it hard to scan. See the [Link and color variant](/web/link#Link-and-Text) for guidelines."
            sandpackExample={
              <SandpackExample
                code={dontMultiple}
                hideControls
                hideEditor
                name="Don't - Multiple Styles"
                previewHeight={350}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
Display the external icon ("visit" icon) when the link text needs support to convey an external domain or subsite, and when it helps Pinners scan and pick a navigation option. If the name of the link clearly lets a user know they are going to an external site, the icon is not needed.
`}
            sandpackExample={
              <SandpackExample
                code={doDisplayExternal}
                hideEditor
                layout="column"
                name="Do - External Icon"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use other icons to represent an external Link. Instead, use the appropriate external icon."
            sandpackExample={
              <SandpackExample
                code={dontOtherIcons}
                hideControls
                hideEditor
                name="Don't - Other Icons"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
Add clarity to external links through explicit link text and predictable destinations instead of overusing external icons when the link is surrounded by text content. If not possible, limit to a maximum of two external icons per paragraph.
`}
            sandpackExample={
              <SandpackExample code={doClarity} hideEditor layout="column" name="Do - Clarity" />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
Overuse external icons, especially when they are part of text content.

Displaying multiple icons within the same text block can cause unnecessary visual load and negatively impact readability. Instead, add clarity to external links through explicit link text.`}
            sandpackExample={
              <SandpackExample code={dontOveruse} hideControls hideEditor name="Don't - Overuse" />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
Provide a meaningful descriptive label to the link that clearly indicates the link’s destination.`}
            sandpackExample={
              <SandpackExample
                code={doMeaning}
                hideEditor
                layout="column"
                name="Do - Meaningful label"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`Use generic phrases like "click here" or "go to" on links. Review [Writing guidelines](#Writing) for reference.`}
            sandpackExample={
              <SandpackExample
                code={dontGeneric}
                hideControls
                hideEditor
                name="Don't - Generic label"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description="Avoid using Link to perform actions other than navigation or accessing external pages. Link should serve a navigation purpose."
        name={generatedDocGen?.displayName}
      >
        <MainSection.Subsection
          columns={2}
          description={`
Sometimes we don't have space to be more verbose and the Link content can't provide enough context. In those cases, use the \`accessibilityLabel\` prop. \`accessibilityLabel\` adds an aria-label attribute to the link, which assistive technologies like screen readers can access. Typically, the label text replaces the visible text on the Link for users who use assistive technology. While we don't recommend using "Learn more" or "See details" for Link text, it can be used as long as it is supplemented with a more descriptive \`accessibilityLabel\`, like "Learn more about personalization and data" or "See rate limit details for trial package".

Accessible content is critical if we consider that assistive technology also presents links in isolation from their contexts. For example, screen reader rotors list all the links present in a page. If all listed links are repetitions of the same generic phrases, the content is not accessible.
      `}
          title="Accessible content"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={accessibilityBoxes}
                layout="column"
                name="Accessibility Checklist"
              />
            }
            title="Learn more case"
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={accessibilityTiers}
                layout="column"
                name="Accessibility Tiers"
              />
            }
            title="See more details case"
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Give Link keyboard focus with the tab key (or shift + tab when tabbing backwards). Activate Link with the enter/return key."
          title="Keyboard navigation"
        />
        <MainSection.Subsection
          description={`
When rendering an external link, add text for screen readers that this Link will go to a different destination. Users should be informed that they will be moving out of a domain and which domain they are moving to. This is particularly relevant for those with cognitive impairments or people relying on assistive technology.

These are cases where external links should open in a new tab, as it supports Pinners to better navigate our product without disrupting their flow experience:

  - When changing pages would make the user lose unsaved progress—for example, filling out a form or adding content.

  - When starting a process, which would stop if the user clicks away. For example, watching a video or completing a core task.

  - When Pinners are logged in and, clicking away would interrupt that session.

Sometimes opening links in a new tab can be challenging for users with difficulty perceiving visual content, users with cognitive disabilities, or people who magnify their screens. We don't recommend opening a link in a new tab when:

  - It is invasive and disruptive to the flow of the page.

  - Users have not been clearly informed about this behavior.

We recommend adding an external link to inline content. However, use a maximum of two external links per paragraph when possible, as adding more than two icons in the same block of text can clutter the design and create readability issues.

Also, consider adding external links to elements where the "visit" icon will support the user's comprehension, letting them know they are leaving Pinterest content and going to an external domain. For example, when using external links inside a footer element.

For external links where an external Gestalt Link doesn't apply, check out [Button link role](https://gestalt.pinterest.systems/web/button#Role) or [IconButton link role](https://gestalt.pinterest.systems/web/iconbutton#Role).`}
          title="External links"
        />
      </AccessibilitySection>

      <LocalizationSection code={localizationLabels} name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="Link depends on [Text](/web/text) to inherit style attributes including weight, color, and size. Aim to match the text size and style of the content they are accompanying. Always use Link within [Text](/web/text) to get the correct underline color."
          title="Link and Text"
        >
          <SandpackExample code={variantLinkText} layout="row" name="Variants - Link and Text" />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Link uses the typography color tokens. Keep in mind colors should be used purposefully and consistently as they convey meaning in multiple ways. See below how to use colors on links.

1. \`color="default"\`
    Default text color for links used across Pinterest UI.
2. \`color="subtle"\`
    Intended for links placed within a subtle inline text (e.g. additional link on a sub-header).
3. \`color="inverse"\`
    For links over a dark-colored background. Make sure it has a 4.5:1 [contrast ratio](/foundations/accessibility#Visuals) between foreground and background.
4. \`color="shopping"\`
    Used on links related to shopping products or surfaces when a color is needed to highlight a link. Please note: This color should only be used in a shopping context.
5. Status: \`color="error"\`, \`color="warning"\`, \`color="success"\`
    Used purposefully, applies only on links within a status message. See [status colors](/foundations/color/usage#Status-text-colors) for reference.
6. Documentation: \`color="link"\`
    Reserved color for links within documentation and internal subsites when a color is needed to convey interactivity. Please note: This color shouldn't be used on links across Pinterest customer-facing UI.
          `}
          title="Link and color"
        />

        <MainSection.Subsection
          columns={2}
          description={`To follow Link design guidelines and [best practices](#Best-practices), \`inline\` and \`underline\` props must be used accordingly. In addition, using Links consistently will ensure a great usability experience.

We recommend showing the underline on the link, at least upon a hover behavior; it will sustain accessibility standards. Only hide the underline if the link element has a different hover behavior (e.g., a color background), and the user can still perceive the element as a link. In that case, it’s always a good idea to test this assumption with users. Reach out to [Gestalt for assistance](/team_support/get_help#Meetings-and-events).

Don’t underline [Text](/web/text) that isn’t a Link, as underline has a strong link affordance.

Link with \`display="inline"\` or \`display="inlineBlock"\` sets the underline style to "always" to follow design guidelines while \`display="block"\` sets the underline style to "hover". On hover, \`underline="always"\` removes the underline, while \`underline="hover"\` adds it.

However, Link's underline style can be overridden at any time using the \`underline\` prop.

\`underline="none"\` doesn't show any underline style. However, for cases where underline isn’t needed to convey interactivity or when the link element doesn’t function as a link visually, consider using [TapArea](/web/taparea) or [Button](/web/button) with \`role=link\`.
`}
          title="Underline"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantInlineLink}
                layout="column"
                name="Variants - Inline Link"
              />
            }
            title="Inline Link"
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantStandaloneLink}
                layout="column"
                name="Variants - Standalone Link"
              />
            }
            title="Standalone Link"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantInlineOverride}
                layout="column"
                name="Variants - Inline Overriden Underline"
              />
            }
            title="Inline Link with overridden underline"
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantHiddenUnderline}
                layout="column"
                name="Variants - Inline Overriden Underline"
              />
            }
            title="Link with hidden underline"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
        By default, Link is a [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements). When Link needs to be displayed inline with the surrounding elements, you can use the \`display\` prop set to \`"inline"\` or \`"inlineBlock"\`. As shown below, the primary difference is how the words _within_ the Link wrap when width is restricted. \`"inline"\` will wrap by word, whereas \`"inlineBlock"\` will wrap the entire block of words.

        Note that when \`display="inline"\` is used, \`tapStyle="compress"\` is _not_ respected.

        Which should you choose? If you need inline Links, you most likely want \`display="inline"\`. Only choose \`display="inlineBlock"\` if you need the compress animation on click/tap.

        Play around with the container width on the examples below and note how each responds to wrapping.
        `}
          title="Inline"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={inline} name="Inline example" previewHeight={450} />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`\`target\` is optional and defines the frame or window to open the anchor defined on \`href\`:

- "null" opens the anchor in the same window.
- "blank" opens the anchor in a new window.
- "self" opens an anchor in the same frame.
`}
          title="Target"
        >
          <SandpackExample
            code={variantTarget}
            layout="row"
            name="Variants - Target"
            previewHeight={160}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`An external link, also called an outbound link, is a link from Pinterest to a different website. External links require specific SEO, visual, and accessibility treatments.

\`rel\` is optional. Use "nofollow" for external links to specify to web crawlers not follow the link. Don't use "nofollow" with urls redirecting to any Pinterest domain or subsite.

\`externalLinkIcon\` is optional. \`externalLinkIcon\` displays a "visit" icon at the end of external Links to visually communicate an outbound link destination to the user. Follow Link's [Best practices](#Best-practices) to properly use the "visit" icon on external Links.

As the "visit" icon is a visual/graphic representation, it's hidden to assistive technologies to avoid duplication of information. Instead, follow accessibility best practices for external links as detailed in the [Accessibility section](#External-links).


The "visit" icon should also match [Text](/web/text)'s \`size\` and \`color\`. \`externalLinkIcon="default"\` automatically sets the "visit" icon style to match Text's default properties: \`size="300"\` and \`color="default"\` as shown in the first example. However, for different Text treatments, \`externalLinkIcon\` can be used to match custom Text properties as shown in the second example.
      `}
          title="externalLinkIcon and rel"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={variantExternalIcon}
                layout="column"
                name="Variant - External Icon"
              />
            }
            title="Default treatment"
          />
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={variantRel} layout="column" name="Variant - Rel" />
            }
            title="Custom treatment"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Link consumes external handlers from [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider).

Handlers:

- [onNavigation](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation): executed when Link is clicked

See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#onNavigation:-custom-navigation) for more information.
`}
          title="External handlers"
        />
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- Link should be 3 words or less: long enough to be understood by users but short enough to prevent text wrapping
- Use meaningful words that makes sense even out of context. Provide a meaningful descriptive label to the link that clearly indicates the link’s destination
- Use the name of the page rather than the URL. For example, "Visit Pinterest.com" rather than "Visit www.pinterest.com"
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Use text like "Click here" or "See more". Instead, write a meaningful descriptive label that clearly indicates the link’s destination.
- Use all-caps
`}
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <InternalDocumentationSection
        items={[
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/link-navigation',
            text: 'Link navigation',
          },
          {
            href: 'https://pdocs.pinadmin.com/docs/webapp/docs/gestalt-ads-logging-extension#ads-logging-extension',
            text: 'Ads logging extension',
          },
        ]}
      />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Text](/web/text)**
Text provides Link with style: size, color, and font.

**[Button](/web/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Button](/web/button), [IconButton](/web/iconbutton), [TapArea](/web/taparea)**
These components support link functionality themselves by setting \`role="link"\`. Don't use Link to add link functionality to elements other than text.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('Link') },
  };
}
