// @flow strict
import { type Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} excludeProps={['disabled']} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- Primarily for navigation, and usually within or directly accompanying a sentence. In particular cases, a Link is used to trigger actions assisting in a task completion in addition to navigation. However, these links should still serve as a support to a navigation purpose.
- Directing users to another page or a different portion of the same page
- Jump to an element on the same page
- Highlighting URL destinations
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- Actions that will change data, change a state, or trigger a high-emphasis action. Use [Button](/Button) instead.
- In [Heading](/heading), as headings aren't easily recognizable as interactive elements. Headings can act as anchor elements on the page (accompanied by the "link" [Icon](/icon)), but if the heading needs to take users to a different page, add a subtitle next to the heading with an inline Link instead.
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
  <Flex gap={4} direction="column">
    <Text weight="bold" align="center"> Product details </Text>
    <Text> Tennis-inspired retro sneaker by Pinterest, elevated with a stacked midsole for extra height and a chunky profile. </Text>
    <Text inline> Ships from and sold by
      <Link href="www.pinterest.com" inline> pinterest.com </Link>
    </Text>
  </Flex>
</Box>
`}
          />
          <MainSection.Card
            type="don't"
            description="Use a bold font weight to represent inline Links in the context of text around them. Bold font weight in the text context can be perceived as emphasis purposes, and it could fail to convey interactivity. "
            defaultCode={`
<Flex gap={4} direction="column" width="100%">
  <Text weight="bold"> Need help? </Text>
  <Text inline> Find tips and best practices on the
    <Text weight="bold" inline>
      <Link href="https://business.pinterest.com/" inline underline="hover"> Pinterest Business Site </Link>
    </Text>
  </Text>
  <Text inline> Troubleshoot issues with the
    <Text weight="bold" inline>
      <Link href="https://help.pinterest.com" inline underline="hover"> Pinterest Help Center </Link>
    </Text>
  </Text>
</Flex>
            `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description="Use bold font-weight in link elements such as lists, profile and board names, and any link element that an underline style doesn't apply."
            defaultCode={`
<Flex gap={2} alignItems="center">
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
      <Link href="https://www.pinterest.com" inline underline="hover"> Shanice Romero </Link>
    </Text>
    {" "}saved to
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" inline underline="hover"> Capoeira </Link>
    </Text>
    </Text>
</Flex>
`}
          />
          <MainSection.Card
            type="don't"
            description="Display an underline on Links that aren't within a paragraph context, such as lists, feed elements, profile and board names."
            defaultCode={`
<Flex gap={4} width="100%" wrap width={300}>
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
<Flex direction="column" width="70%" gap={3}>
  <Flex.Item>
    <Box display="visuallyHidden" width="100%">
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
  <Text size="sm" align="center">
    By continuing, you agree to Pinterest's
    <Text size="sm" inline>
      <Link href="https://www.pinterest.com" inline>
        {' '}
        Business Terms of Service{' '}
      </Link>
    </Text>{' '}
    and acknowledge you've read our
    <Text size="sm" inline>
      <Link href="https://www.pinterest.com" inline>
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
            description="Apply multiple text styles on links paired with text, as it can create inconsistency it can make it hard to scan. See the [Link and color variant](/link#Link-and-Text) for guidelines."
            defaultCode={`
<Flex direction="column" width="70%" gap={3}>
  <Flex.Item>
    <Box display="visuallyHidden" width="100%">
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
  <Text size="sm" align="center">
    By continuing, you agree to Pinterest's
    <Text size="sm" inline weight="bold">
      <Link href="https://www.pinterest.com" inline>
        {' '}
        Business Terms of Service{' '}
      </Link>
    </Text>{' '}
    and acknowledge you've read our
    <Text size="sm" inline weight="bold">
      <Link href="https://www.pinterest.com" inline>
        {' '}
        Privacy Policy{' '}
      </Link>
    </Text>
  </Text>
</Flex>;
`}
          />
        </MainSection.Subsection>
        {/* <MainSection.Subsection columns={2}>
          <MainSection.Card
            type="do"
            description={`\`isExternal\` PROP COMING SOON.

Use the "visit" icon to represent an external Link/domain in a text context. The icon should match the text size. Please note: Disclaimers and links taking users to Pinterest sub-sites don't need to display an external link icon.`}
            defaultCode={`
<Text weight="bold"> Coming soon </Text>
`}
          />
          <MainSection.Card
            type="don't"
            description="Use other icons paired with text within a paragraph or a sentence to represent an external Link."
            defaultCode={`
<Flex gap={2} width="100%" justifyContent="center">
  <Text inline> Visit
    <Text inline>
      <Link href="https://www.w3.org/WAI/standards-guidelines/" inline> WCAG accessibility resources</Link>
    </Text>
  </Text>
  <Icon icon="link" accessibilityLabel="" color="default" />
</Flex>
            `}
          />
        </MainSection.Subsection> */}
      </MainSection>

      <MainSection
        name="Accessibility"
        description={`
Avoid using Link to perform actions other than navigation or accessing external pages. Link should serve a navigation purpose.
      `}
      >
        <MainSection.Subsection
          title="Accessible Content"
          description={`
When providing the content for the link, avoid generic phrases like "click here" or "go to". Make sure to write a meaningful descriptive label that clearly indicates the link’s destination. Review [Writing guidelines](#Writing) for reference.

Sometimes we don't have space to be more verbose and the Link content can't provide enough context. In those cases, use the \`accessibilityLabel\` prop. \`accessibilityLabel\` adds an aria-label attribute to the link, which assistive technologies like screen readers can access. Typically, the label text replaces the visible text on the Link for users who use assistive technology. As shown in the second example, we don't recommend doing just "Learn more" or "See details" but, if needed, we can override it to be "Learn more about personalization and data" or "See rate limit details for trial package".

Accessible content is critical if we consider that assistive technology also presents links in isolation from their contexts. For example, screen reader rotors list all the links present in a page. If all listed links are repetitions of the same generic phrases, therefore, the page is not accessible.
      `}
        >
          <MainSection.Card
            defaultCode={`
<Box>
  <Text size="500">Bad ❌</Text>
  <Text>
    For more information,{' '}
    <Text inline>
      <Link accessibilityLabel="visit https://pinterest.com" inline href="https://pinterest.com">
        click here
      </Link>
    </Text>
    .
  </Text>
  <Box paddingY={4}>
    <Text size="500">Good ✅</Text>
    <Text>
      Visit{' '}
      <Text inline>
        <Link inline href="https://pinterest.com">
          Pinterest.com
        </Link>
      </Text>{' '}
      for more information.
    </Text>
  </Box>
</Box>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            defaultCode={`
<Flex direction="column" gap={4}>
  <Flex gap={2}>
    <Checkbox
      checked
      id="1"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="1">
      <Text>
        Use sites you visit to improve which recommendations and ads you see on Pinterest.{' '}
        <Link accessibilityLabel="Learn more about personalization and data" inline href="https://pinterest.com/_/_/help/article/personalization-and-data#info-ad">
          Learn more
        </Link>
      </Text>
    </Label>
  </Flex>
  <Flex gap={2}>
    <Checkbox
      checked
      id="2"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="2">
      <Text>
        Share activity for ads performance reporting.{' '}
        <Link accessibilityLabel="Learn more about ads performance reporting" inline href="https://www.pinterest.com/_/_/help/article/ads-performance-reporting">
          Learn more
        </Link>
      </Text>
    </Label>
  </Flex>
  <Flex gap={2}>
    <Checkbox
      checked
      id="3"
      onChange={() => {}}
      size="sm"
    />
    <Label htmlFor="3">
      <Text>
        Use your activity to improve ads you see about Pinterest on other sites or apps you may visit.{' '}
        <Link accessibilityLabel="Learn more about third-party analytics" inline href="https://www.pinterest.com/_/_/help/article/third-party-analytics-or-advertising-providers-pinterest-uses-or-allows">
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
        <Flex direction="column" gap={2}>
          <Text size="sm">1000/day</Text>
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
        <Flex direction="column" gap={1}>
          <Text size="sm">Variable</Text>
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
          title="Accessible Tab Link"
          description={`Use \`accessibilitySelected\` and \`role="tab"\` when using Link as a tab. However, don't use Link to create custom tabs, use [Tabs](/tabs) instead.`}
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
function TabExample() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <Box display="flex" alignItems="center" role="tablist">
      {['Boards', 'Pins'].map((text, index) => (
        <Box
          color={index === activeIndex ? 'darkGray' : undefined}
          display="inlineBlock"
          key={text}
          rounding="pill"
        >
          <Link
            accessibilitySelected={index === activeIndex}
            underline="none"
            href="https://pinterest.com"
            onClick={({ event }) => {
              event.preventDefault();
              setActiveIndex(index);
            }}
            rounding="pill"
            role="tab"
          >
            <Box padding={3} rounding="pill">
              <Text color={index === activeIndex ? 'inverse' : 'default'}>{text}</Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}`}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Localization"
        description={`Be sure to localize the \`accessibilityLabel\` as well as any children content.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          title="Link and Text"
          description="Link depends on [Text](/text) to inherit style attributes including weight, color, and size. Aim to match the text size and style of the content they are accompanying. Always use Link within [Text](/text) to get the correct underline color."
        >
          <MainSection.Card
            defaultCode={`
<Box color="infoBase" width="50%" padding={4} rounding={3}>
  <Flex direction="column" gap={3} alignItems="center">
    <Text color="inverse" weight="bold" size={600}>Tips</Text>
      <Flex gap={1} alignItems="center">
        <Text color="inverse" size={400} align="center" weight="bold">
          <Link href="https://pinterest.com" inline>Add a Pinterest widget</Link>{" "}
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
    For links over a dark-colored background. Make sure it has a 4.5:1 [contrast ratio](/accessibility#Visuals) between foreground and background.
4. \`color="shopping"\`
    Used on links related to shopping products or surfaces when a color is needed to highlight a link. Please note: This color should only be used in a shopping context.
5. Status: \`color="error"\`, \`color="warning"\`, \`color="success"\`
    Used purposefully, applies only on links within a status message. See [status colors](/color_usage#Status-text-colors) for reference.
6. Documentation: \`color="link"\`
    Reserved color for links within documentation and internal subsites when a color is needed to convey interactivity. Please note: This color shouldn't be used on links across Pinterest customer-facing UI.
          `}
        />
        <MainSection.Subsection
          title="Underline"
          columns={2}
          description={`To follow Link design guidelines and [best practices](#Best-practices), \`inline\` and \`underline\` props must be used accordingly. In addition, using Links consistently will ensure a great usability experience.

We recommend showing the underline on the link, at least upon a hover behavior; it will sustain accessibility standards. Only hide the underline if the link element has a different hover behavior (e.g., a color background), and the user can still perceive the element as a link. In that case, it’s always a good idea to test this assumption with users. Reach out to [Gestalt for assistance](/how_to_work_with_us#Meetings-and-events).

Don’t underline [Text](/text) that isn’t a Link, as underline has a strong link affordance.

Link with \`inline={true}\` defaults the underline style to "always" to follow design guidelines while \`inline={false}\` defaults the underline style to "hover". On hover, \`underline="always"\` removes the underline, while \`underline="hover"\` adds it.

However, Link's underline style can be overridden at any time using the \`underline\` prop.

\`underline="none"\` doesn't show any underline style. However, for cases where underline isn’t needed to convey interactivity or when the link element doesn’t function as a link visually, consider using [TapArea](/taparea) or [Button](/button) with \`role=link\`.
`}
        >
          <MainSection.Card
            title="Inline Link"
            defaultCode={`
<Text inline>
  Find tips and best practices on the
  <Link href="https://business.pinterest.com/" inline> Pinterest Business Site </Link>
</Text>
`}
          />
          <MainSection.Card
            title="Standalone Link"
            defaultCode={`
<Flex gap={4} width="100%" wrap width={300}>
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
<Flex gap={2} alignItems="center">
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
      <Link href="https://www.pinterest.com" inline underline="hover"> Shanice Romero </Link>
    </Text>
    {" "}saved to
    <Text weight="bold" inline>
      <Link href="https://www.pinterest.com" inline underline="hover"> Capoeira </Link>
    </Text>
    </Text>
</Flex>
`}
          />
          <MainSection.Card
            title="Link with hidden underline"
            defaultCode={`
<Flex gap={2} direction="column">
  <Text weight="bold">
    <Link href="https://www.pinterest.com" inline underline="none">I'm a link with no underline</Link>
  </Text>
</Flex>
`}
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
          <MainSection.Card
            defaultCode={`
<Text inline>
  Find tips and best practices on the
  <Link href="https://business.pinterest.com/" inline> Pinterest Business Site</Link>
</Text>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Rel"
          description={`\`rel\` is optional. Use "nofollow" for external links to specify to web crawlers not follow the link. Don't use "nofollow" with urls redirecting to any Pinterest site.`}
        >
          <MainSection.Card
            defaultCode={`
<Text inline>
  To receive push notifications instead of texts,
  <Link href="https://authy.com/download/" inline target="blank" rel="nofollow"> download the Authy app</Link>.
</Text>
`}
          />
        </MainSection.Subsection>
      </MainSection>

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

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Text](/text)**
Text provides Link with style: size, color, and font.

**[OnLinkNavigationProvider](/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.

**[Button](/button)**
Button allows users to take actions, and make choices using text labels to express what action will occur when the user interacts with it.

**[Button](/button), [IconButton](/iconbutton), [TapArea](/taparea)**
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
