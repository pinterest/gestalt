// @flow strict
import type { Node } from 'react';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import docgen, { type DocGen } from '../components/docgen.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';

export default function LinkPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Link">
      <PageHeader name="Link" description={generatedDocGen?.description} />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - For navigation within or directly accompanying a sentence.
          - Directing users to another page or a different portion of the same page.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Performing actions, such as "Save", "Cancel" or "Delete". Use [Button](/button) instead.
          - Submitting a form or opening a modal. Use Button instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Accessibility">
        <MainSection.Subsection
          description={`
    When providing the content for the link, avoid phrases like "click here" or "go to".
  `}
          title="Accessible Content"
        >
          <MainSection.Card
            defaultCode={`
<Box>
  <Heading>Bad ❌</Heading>
  <Text>
    For more information,{' '}
    <Text inline weight="bold">
      <Link accessibilityLabel="visit https://pinterest.com" inline href="https://pinterest.com">
        click here
      </Link>
    </Text>
    .
  </Text>
  <Box paddingY={4}>
    <Heading>Good ✅</Heading>
    <Text>
      Visit{' '}
      <Text inline weight="bold">
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
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`
    You should wrap \`Link\` components inside of a \`Text\` component to get the correct font & underline color.
  `}
          title="Inherited Text style"
        >
          <MainSection.Card
            defaultCode={`
<Box>
  <Link href="https://pinterest.com">
    <Box padding={2}>
      <Text color="red" weight="bold">
        Incorrect underline color: Pinterest.com
      </Text>
    </Box>
  </Link>
  <Text color="red" weight="bold">
    <Link href="https://pinterest.com">
      <Box padding={2}>Correct underline color: Pinterest.com</Box>
    </Link>
  </Text>
</Box>`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Accessible Tab Link"
          description={`
    Use accessibilitySelected and role when using it as a Tab.
  `}
        >
          <MainSection.Card
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
            hoverStyle="none"
            href="https://pinterest.com"
            onClick={({ event }) => {
              event.preventDefault();
              setActiveIndex(index);
            }}
            rounding="pill"
            role="tab"
          >
            <Box padding={3} rounding="pill">
              <Text color={index === activeIndex ? 'white' : 'darkGray'}>{text}</Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="Icons">
          <MainSection.Card
            defaultCode={`
function IconsExample() {
  return (
    <Text inline>Pinterest acquires
      <Link
        href="https://vochi.ai/"
        newTabIcon="visit"
        target="blank"
        inline
      >
      Vochi
      </Link>, a video creation and editing app
    </Text>
  );
}
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection title="tapStyle and hoverStyle">
          <MainSection.Card
            defaultCode={`
function StyleExample() {
  return (
    <Box>
      {[
        { text: 'Link without compress nor underline', hoverStyle: 'none', tapStyle: 'none' },
        { text: 'Link with compress only', hoverStyle: 'none', tapStyle: 'compress' },
        { text: 'Link with underline only', hoverStyle: 'underline', tapStyle: 'none' },
        { text: 'Link with compress and underline', hoverStyle: 'underline', tapStyle: 'compress' },
      ].map(({ text, hoverStyle, tapStyle }) => (
        <Box key={text} padding={2}>
          <Text>
            <Link
              hoverStyle={hoverStyle}
              href="https://pinterest.com"
              onClick={({ event }) => {
                event.preventDefault();
              }}
              tapStyle={tapStyle}
              target="blank"
            >
              {text}
            </Link>
          </Text>
        </Box>
      ))}
    </Box>
  );
}
`}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[OnLinkNavigationProvider](/onlinknavigationprovider)**
OnLinkNavigationProvider allows external link navigation control across all children components with link behavior.
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen('Link') },
  };
}
