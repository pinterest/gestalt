// @flow strict
import { type Node } from 'react';
import { SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import inline from '../../examples/link/inline.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<Text inline>
To see how you can grow your business, visit
  <Link href="https://business.pinterest.com/advertise" display="inlineBlock" externalLinkIcon="default" target="blank">Pinterest Ads</Link>
</Text>
        `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={['disabled']} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Primarily for navigation, and usually within or directly accompanying a sentence. In particular cases, a Link is used to trigger actions assisting in a task completion in addition to navigation. However, these links should still serve as a support to a navigation purpose.
- Directing users to another page or a different portion of the same page.
- Jump to an element on the same page.
- Highlighting URL destinations.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Actions that will change data, change a state, or trigger a high-emphasis action. Use [Button](/web/button) instead.
- In [Heading](/web/heading), as headings aren't easily recognizable as interactive elements. Headings can act as anchor elements on the page (accompanied by the "link" [Icon](/web/icon)), but if the heading needs to take users to a different page, add a subtitle next to the heading with an inline Link instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Display an underline on inline Links in the context of heavy text around them or in dense layouts such as Links on dashboards. The underline helps to determine its interactivity and reinforces accessibility standards."
            defaultCode={`
<Box color="elevationAccent" padding={4} rounding={4}>
  <Flex gap={{ column: 4, row: 0 }} direction="column">
    <Text weight="bold" align="center"> Product details </Text>
    <Text> Tennis-inspired retro sneaker by Pinterest, elevated with a stacked midsole for extra height and a chunky profile. </Text>
    <Text inline> Ships from and sold by
      <Link href="http://www.pinterest.com" display="inline"> pinterest.com </Link>
    </Text>
  </Flex>
</Box>
`}
          />
          <MainSection.Card
            type="don't"
            description="Use a bold font weight to represent inline Links in the context of text around them. Bold font weight in the text context can be perceived as emphasis purposes, and it could fail to convey interactivity. "
            defaultCode={`
<Flex gap={{ column: 4, row: 0 }} direction="column" width="100%">
  <Text weight="bold"> Need help? </Text>
  <Text inline> Find tips and best practices on the
    <Text weight="bold" inline>
      <Link href="https://business.pinterest.com/" display="inline" underline="hover"> Pinterest Business Site </Link>
    </Text>
  </Text>
  <Text inline> Troubleshoot issues with the
    <Text weight="bold" inline>
      <Link href="https://help.pinterest.com" display="inline" underline="hover"> Pinterest Help Center </Link>
    </Text>
  </Text>
</Flex>
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use bold font-weight in link elements such as lists, profile and board names, and any link element that an underline style isn't necessary to convey interactivity. For example, the user easily recognizes the bold element as a link since it is a typical treatment across our surfaces."
            defaultCode={`
<Flex gap={{ row: 2, column: 0 }} alignItems="center">
  <Box aria-hidden>
    <Avatar
      name="Shanice Romero"
      accessibilityLabel="Shanice Romero"
      size="sm"
      src="https://i.ibb.co/7tGKGvb/shanice.jpg"
    />
  </Box>
  <Text>
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" display="inline" underline="hover"> Shanice Romero </Link>
    </Text>
    {" "}saved to
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" display="inline" underline="hover"> Capoeira </Link>
    </Text>
    </Text>
</Flex>
`}
          />
          <MainSection.Card
            type="don't"
            description="Display an underline on Links that aren't within a paragraph context, for example, lists or table links, as it could create cognitive load. Please note: If these elements are nested inside message components, consider displaying an underline, as it reinforces interactivity."
            defaultCode={`
<Flex gap={{ row: 4, column: 0 }} width="100%" wrap width={300}>
  {[
    'About',
    'Blog',
    'Business',
    'Careers',
    'Developers',
    'Removals',
    'Privacy',
    'Personalized ads',
    'Terms',
  ].map((item, idx) => {
    return (
      <Text key={idx} color="subtle" weight="bold">
        <Box paddingY={1}>
          <Link href="https://www.pinterest.com/" underline="always">
            {item}
          </Link>
        </Box>
      </Text>
    );
  })}
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Match Link to the text size and font-weight of the content they are accompanying for consistency and visual balance."
            defaultCode={`
<Flex direction="column" width="70%" gap={{ column: 3, row: 0 }}>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-email-1">Email</Label>
    </Box>
    <TextField placeholder="Email" id="example-email-1" onChange={() => {}} type="email" value="" />
  </Flex.Item>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-password-1">Password</Label>
    </Box>
    <TextField
      placeholder="Create password"
      id="example-password-1"
      onChange={() => {}}
      type="password"
      value=""
    />
  </Flex.Item>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-age-1">Age</Label>
    </Box>
    <NumberField placeholder="Age" id="example-age-1" onChange={() => {}} value="" />
  </Flex.Item>
  <Button fullWidth text="Create account" size="md" color="red" />
  <Button fullWidth text="Log into existing account" size="md" type="submit" />
  <Text size="100" align="center">
    By continuing, you agree to Pinterest's
    <Text size="100" inline>
      <Link href="https://www.pinterest.com" display="inline">
        {' '}
        Business Terms of Service{' '}
      </Link>
    </Text>{' '}
    and acknowledge you've read our
    <Text size="100" inline>
      <Link href="https://www.pinterest.com" display="inline">
        {' '}
        Privacy Policy{' '}
      </Link>
    </Text>
  </Text>
</Flex>;
`}
          />
          <MainSection.Card
            type="don't"
            description="Apply multiple text styles on links paired with text, as it can create inconsistency it can make it hard to scan. See the [Link and color variant](/web/link#Link-and-Text) for guidelines."
            defaultCode={`
<Flex direction="column" width="70%" gap={{ column: 3, row: 0 }}>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-email-2">Email</Label>
    </Box>
    <TextField placeholder="Email" id="example-email-2" onChange={() => {}} type="email" value="" />
  </Flex.Item>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-password-2">Password</Label>
    </Box>
    <TextField
      placeholder="Create password"
      id="example-password-2"
      onChange={() => {}}
      type="password"
      value=""
    />
  </Flex.Item>
  <Flex.Item>
    <Box display="visuallyHidden">
      <Label htmlFor="example-age-2">Age</Label>
    </Box>
    <NumberField placeholder="Age" id="example-age-2" onChange={() => {}} value="" />
  </Flex.Item>
  <Button fullWidth text="Create account" size="md" color="red" />
  <Button fullWidth text="Log into existing account" size="md" type="submit" />
  <Text size="100" align="center">
    By continuing, you agree to Pinterest's
    <Text size="100" inline weight="bold">
      <Link href="https://www.pinterest.com" display="inline">
        {' '}
        Business Terms of Service{' '}
      </Link>
    </Text>{' '}
    and acknowledge you've read our
    <Text size="100" inline weight="bold">
      <Link href="https://www.pinterest.com" display="inline">
        {' '}
        Privacy Policy{' '}
      </Link>
    </Text>
  </Text>
</Flex>;
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
Display the external icon ("visit" icon) when the link text needs support to convey an external domain or subsite, and when it helps Pinners scan and pick a navigation option. If the name of the link clearly lets a user know they are going to an external site, the icon is not needed.
`}
            defaultCode={`
<Text inline>
  To receive push notifications instead of texts,
  <Link href="https://authy.com/download/" display="inline" externalLinkIcon="default" target="blank" rel="nofollow">download the Authy app</Link>.
</Text>
`}
          />
          <MainSection.Card
            type="don't"
            description="Use other icons to represent an external Link. Instead, use the appropriate external icon."
            defaultCode={`
<Flex gap={2} justifyContent="center" width="100%">
  <Text inline> Visit
    <Text inline>
      <Link href="https://www.w3.org/WAI/standards-guidelines/" display="inline"> WCAG accessibility resources</Link>
    </Text>
  </Text>
  <Icon icon="link" accessibilityLabel="" color="default" />
</Flex>
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
Add clarity to external links through explicit link text and predictable destinations instead of overusing external icons when the link is surrounded by text content. If not possible, limit to a maximum of two external icons per paragraph.
`}
            defaultCode={`
<Text inline>
  Go to
  <Link href="https://developers.pinterest.com/account-setup/" display="inline" externalLinkIcon="default" target="blank">My Apps</Link>.
</Text>
`}
          />
          <MainSection.Card
            type="don't"
            description={`
Overuse external icons, especially when they are part of text content.

Displaying multiple icons within the same text block can cause unnecessary visual load and negatively impact readability. Instead, add clarity to external links through explicit link text.`}
            defaultCode={`
<Flex gap={2} direction="column" justifyContent="center" width="100%">
  <Text inline>- Comply with our
    <Link href="https://policy.pinterest.com/en/developer-guidelines" display="inlineBlock" externalLinkIcon="default"> Development guidelines</Link>{" "}
    or ensure you are currently logged into an existing
    <Link href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746" display="inlineBlock" externalLinkIcon="default">business account.</Link>
  </Text>
  <Text inline>-
    <Link href="" display="inlineBlock" externalLinkIcon="default">Create a Pinterest business account</Link>{" "}
    or ensure you are currently logged into an existing
    <Link href="https://help.pinterest.com/en/business/article/get-a-business-account#section-8746" display="inlineBlock" externalLinkIcon="default">business account</Link>
  </Text>
  <Text inline>-
    <Link href="https://developers.pinterest.com/account-setup/" display="inlineBlock" externalLinkIcon="default">Go to My Apps</Link>
  </Text>
</Flex>
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`
Provide a meaningful descriptive label to the link that clearly indicates the link’s destination.`}
            defaultCode={`
<Text>
      Visit{' '}
      <Text inline>
        <Link display="inline" href="https://pinterest.com">
          Pinterest.com
        </Link>
      </Text>{' '}
      for more information.
    </Text>
`}
          />
          <MainSection.Card
            type="don't"
            description={`Use generic phrases like "click here" or "go to" on links. Review [Writing guidelines](#Writing) for reference.`}
            defaultCode={`
<Text>
  For more information,{' '}
  <Text inline>
    <Link accessibilityLabel="visit https://pinterest.com" display="inline" href="https://pinterest.com">
      click here
    </Link>
  </Text>
</Text>
            `}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Avoid using Link to perform actions other than navigation or accessing external pages. Link should serve a navigation purpose."
      >
        <MainSection.Subsection
          columns={2}
          title="Accessible content"
          description={`
Sometimes we don't have space to be more verbose and the Link content can't provide enough context. In those cases, use the \`accessibilityLabel\` prop. \`accessibilityLabel\` adds an aria-label attribute to the link, which assistive technologies like screen readers can access. Typically, the label text replaces the visible text on the Link for users who use assistive technology. While we don't recommend using "Learn more" or "See details" for Link text, it can be used as long as it is supplemented with a more descriptive \`accessibilityLabel\`, like "Learn more about personalization and data" or "See rate limit details for trial package".

Accessible content is critical if we consider that assistive technology also presents links in isolation from their contexts. For example, screen reader rotors list all the links present in a page. If all listed links are repetitions of the same generic phrases, the content is not accessible.
      `}
        >
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Flex gap={{ column: 0, row: 2 }}>
    <Checkbox
      checked
      id="1"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="1">
      <Text>
        Use sites you visit to improve which recommendations and ads you see on Pinterest.{' '}
        <Link accessibilityLabel="Learn more about personalization and data" display="inline" href="https://pinterest.com/_/_/help/article/personalization-and-data#info-ad">
          Learn more
        </Link>
      </Text>
    </Label>
  </Flex>
  <Flex gap={{ column: 0, row: 2 }}>
    <Checkbox
      checked
      id="2"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="2">
      <Text>
        Share activity for ads performance reporting.{' '}
        <Link accessibilityLabel="Learn more about ads performance reporting" display="inline" href="https://www.pinterest.com/_/_/help/article/ads-performance-reporting">
          Learn more
        </Link>
      </Text>
    </Label>
  </Flex>
  <Flex gap={{ column: 0, row: 2 }}>
    <Checkbox
      checked
      id="3"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="3">
      <Text>
        Use your activity to improve ads you see about Pinterest on other sites or apps you may visit.{' '}
        <Link accessibilityLabel="Learn more about third-party analytics" display="inline" href="https://www.pinterest.com/_/_/help/article/third-party-analytics-or-advertising-providers-pinterest-uses-or-allows">
          Learn more
        </Link>
      </Text>
    </Label>
  </Flex>

</Flex>
`}
          />
          <MainSection.Card
            defaultCode={`
            <Table accessibilityLabel="See what's possible with access tiers" maxHeight={200}>
  <Table.Header sticky>
    <Table.Row>
      <Table.HeaderCell />
      <Table.HeaderCell>
        <Text weight="bold">Trial</Text>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <Text weight="bold">Standard</Text>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>
        <Text weight="bold">Basic analytics</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Included</Text>
      </Table.Cell>
      <Table.Cell>
        <Text>Included</Text>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>
        <Text weight="bold">Rate limits</Text>
      </Table.Cell>
      <Table.Cell>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Text size="100">1000/day</Text>
          <Text>
            <Link
              accessibilityLabel="See rate limit details for trial package"
              underline="always"
              href="https://developers.pinterest.com/docs/api/v5/#tag/Rate-limits"
            >
              See details
            </Link>
          </Text>
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Flex direction="column" gap={{ column: 1, row: 0 }}>
          <Text size="100">Variable</Text>
          <Text>
            <Link
              accessibilityLabel="See rate limit details for standard package"
              underline="always"
              href="https://developers.pinterest.com/docs/api/v5/#tag/Rate-limits"
            >
              See details
            </Link>
          </Text>
        </Flex>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>;
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Keyboard navigation"
          description="Give Link keyboard focus with the tab key (or shift + tab when tabbing backwards). Activate Link with the enter/return key."
        />
        <MainSection.Subsection
          title="External links"
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
        />
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`accessibilityLabel\` as well as any children content.`}
      >
        <SlimBanner
          iconAccessibilityLabel="Localize the default label"
          message="Link announces to assistive technologies that the link opens in a new tab when setting target to 'blank'. Localize the default label with DefaultLabelProvider."
          type="recommendationBare"
          helperLink={{
            text: 'Learn more',
            accessibilityLabel: 'Learn more about DefaultLabelProvider',
            href: '/web/utilities/defaultlabelprovider',
            onClick: () => {},
          }}
        />
      </MainSection>

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Link and Text"
          description="Link depends on [Text](/web/text) to inherit style attributes including weight, color, and size. Aim to match the text size and style of the content they are accompanying. Always use Link within [Text](/web/text) to get the correct underline color."
        >
          <MainSection.Card
            defaultCode={`
<Box color="infoBase" width="50%" padding={4} rounding={3}>
  <Flex direction="column" gap={{ column: 3, row: 0 }} alignItems="center">
    <Text color="inverse" weight="bold" size="600">Tips</Text>
      <Flex gap={{ row: 1, column: 0 }} alignItems="center">
        <Text color="inverse" size="400" align="center" weight="bold">
          <Link href="https://pinterest.com" display="inline">Add a Pinterest widget</Link>{" "}
          and get inspired right from your phone's home screen.
        </Text>
      </Flex>
  </Flex>
</Box>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Link and color"
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
        />

        <MainSection.Subsection
          title="Underline"
          columns={2}
          description={`To follow Link design guidelines and [best practices](#Best-practices), \`inline\` and \`underline\` props must be used accordingly. In addition, using Links consistently will ensure a great usability experience.

We recommend showing the underline on the link, at least upon a hover behavior; it will sustain accessibility standards. Only hide the underline if the link element has a different hover behavior (e.g., a color background), and the user can still perceive the element as a link. In that case, it’s always a good idea to test this assumption with users. Reach out to [Gestalt for assistance](/get_started/how_to_work_with_us#Meetings-and-events).

Don’t underline [Text](/web/text) that isn’t a Link, as underline has a strong link affordance.

Link with \`display="inline"\` or \`display="inlineBlock"\` sets the underline style to "always" to follow design guidelines while \`display="block"\` sets the underline style to "hover". On hover, \`underline="always"\` removes the underline, while \`underline="hover"\` adds it.

However, Link's underline style can be overridden at any time using the \`underline\` prop.

\`underline="none"\` doesn't show any underline style. However, for cases where underline isn’t needed to convey interactivity or when the link element doesn’t function as a link visually, consider using [TapArea](/web/taparea) or [Button](/web/button) with \`role=link\`.
`}
        >
          <MainSection.Card
            title="Inline Link"
            defaultCode={`
<Text inline>
  Find tips and best practices on the
  <Link href="https://business.pinterest.com/" display="inline"> Pinterest Business Site </Link>
</Text>
`}
          />
          <MainSection.Card
            title="Standalone Link"
            defaultCode={`
<Flex gap={{ row: 4, column: 0 }} width="100%" wrap width={300}>
  {[
    'About',
    'Blog',
    'Business',
    'Careers',
    'Developers',
    'Removals',
    'Privacy',
    'Personalized ads',
    'Terms',
  ].map((item, idx) => {
    return (
      <Text key={idx} color="subtle" weight="bold">
        <Box paddingY={1}>
          <Link href="https://www.pinterest.com/">
            {item}
          </Link>
        </Box>
      </Text>
    );
  })}
</Flex>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            title="Inline Link with overridden underline"
            defaultCode={`
<Flex gap={{ row: 2, column: 0 }} alignItems="center">
  <Box aria-hidden>
    <Avatar
      name="Shanice Romero"
      accessibilityLabel="Shanice Romero"
      size="sm"
      src="https://i.ibb.co/7tGKGvb/shanice.jpg"
    />
  </Box>
  <Text>
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" display="inline" underline="hover"> Shanice Romero </Link>
    </Text>
    {" "}saved to
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" display="inline" underline="hover"> Capoeira </Link>
    </Text>
    </Text>
</Flex>
`}
          />
          <MainSection.Card
            title="Link with hidden underline"
            defaultCode={`
<Flex gap={{ column: 2, row: 0 }} direction="column">
  <Text weight="bold">
    <Link href="https://www.pinterest.com" display="inline" underline="none">I'm a link with no underline</Link>
  </Text>
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Inline"
          description={`
        By default, Link is a [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements). When Link needs to be displayed inline with the surrounding elements, you can use the \`display\` prop set to \`"inline"\` or \`"inlineBlock"\`. As shown below, the primary difference is how the words _within_ the Link wrap when width is restricted. \`"inline"\` will wrap by word, whereas \`"inlineBlock"\` will wrap the entire block of words.

        Note that when \`display="inline"\` is used, \`tapStyle="compress"\` is _not_ respected.

        Which should you choose? If you need inline Links, you most likely want \`display="inline"\`. Only choose \`display="inlineBlock"\` if you need the compress animation on click/tap.

        Play around with the container width on the examples below and note how each responds to wrapping.
        `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={inline} name="Inline example" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Target"
          description={`\`target\` is optional and defines the frame or window to open the anchor defined on \`href\`:

- "null" opens the anchor in the same window.
- "blank" opens the anchor in a new window.
- "self" opens an anchor in the same frame.
`}
        >
          <SlimBanner
            iconAccessibilityLabel="Localize the default label"
            message="Link announces to assistive technologies that the link opens in a new tab. Localize the default label with DefaultLabelProvider."
            type="recommendationBare"
            helperLink={{
              text: 'Learn more',
              accessibilityLabel: 'Learn more about DefaultLabelProvider',
              href: '/web/utilities/defaultlabelprovider',
              onClick: () => {},
            }}
          />
          <MainSection.Card
            defaultCode={`
<Text inline>
  Find tips and best practices on the
  <Link href="https://business.pinterest.com/" display="inline"> Pinterest Business Site</Link>
</Text>
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection.Subsection
        title="externalLinkIcon and rel"
        columns={2}
        description={`An external link, also called an outbound link, is a link from Pinterest to a different website. External links require specific SEO, visual, and accessibility treatments.

\`rel\` is optional. Use "nofollow" for external links to specify to web crawlers not follow the link. Don't use "nofollow" with urls redirecting to any Pinterest domain or subsite.

\`externalLinkIcon\` is optional. \`externalLinkIcon\` displays a "visit" icon at the end of external Links to visually communicate an outbound link destination to the user. Follow Link's [Best practices](#Best-practices) to properly use the "visit" icon on external Links.

As the "visit" icon is a visual/graphic representation, it's hidden to assistive technologies to avoid duplication of information. Instead, follow accessibility best practices for external links as detailed in the [Accessibility section](#External-links).


The "visit" icon should also match [Text](/web/text)'s \`size\` and \`color\`. \`externalLinkIcon="default"\` automatically sets the "visit" icon style to match Text's default properties: \`size="300"\` and \`color="default"\` as shown in the first example. However, for different Text treatments, \`externalLinkIcon\` can be used to match custom Text properties as shown in the second example.
      `}
      >
        <MainSection.Card
          defaultCode={`
<Text inline>
  To receive push notifications instead of texts,
  <Link href="https://authy.com/download/" display="inline" externalLinkIcon="default" target="blank" rel="nofollow">download the Authy app</Link>
</Text>
`}
        />
        <MainSection.Card
          defaultCode={`
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Text inline size="100">
    Visit
    <Link href="https://authy.com/download/" display="inline" externalLinkIcon={{ size: "100" }} target="blank" rel="nofollow">
    MyBusiness.com
    </Link>{" "}
    for shipping details
  </Text>
  <Text inline size="400" color="success">
    <Link href="https://authy.com/download/" display="inline" externalLinkIcon={{ size: "400", color: "success" }} target="blank" rel="nofollow">
      MyBusiness.com
    </Link>{" "}
    was successfully claimed
  </Text>
</Flex>
`}
        />
      </MainSection.Subsection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Link should be 3 words or less: long enough to be understood by users but short enough to prevent text wrapping
- Use meaningful words that makes sense even out of context. Provide a meaningful descriptive label to the link that clearly indicates the link’s destination
- Use the name of the page rather than the URL. For example, "Visit Pinterest.com" rather than "Visit www.pinterest.com"
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Use text like "Click here" or "See more". Instead, write a meaningful descriptive label that clearly indicates the link’s destination.
- Use all-caps
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Text](/web/text)**
Text provides Link with style: size, color, and font.

**[OnLinkNavigationProvider](/web/utilities/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

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

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Link' }) },
  };
}
