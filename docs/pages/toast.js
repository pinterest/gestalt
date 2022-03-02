// @flow strict
import { Fragment, type Node } from 'react';
import { Button, Link, Image, Text, Toast } from 'gestalt';
import Combination from '../components/Combination.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import Page from '../components/Page.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Toast">
      <PageHeader
        name="Toast"
        description={generatedDocGen?.description}
        defaultCode={`
<Toast
  button={<Button key="button-key" text="Undo" size="lg" />}
  text={
    <React.Fragment>
      Saved to{' '}
      <Text inline weight="bold">
        <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
          Home decor
        </Link>
      </Text>
    </React.Fragment>
  }
  thumbnail={
    <Image
      alt="Modern ceramic vase pin."
      naturalHeight={564}
      naturalWidth={564}
      src="https://i.ibb.co/Lx54BCT/stock1.jpg"
    />
  }
/>
              `}
      />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to Use"
            description={`
          - Displaying non-critical feedback on the result of an action.
          - Reinforcing success at the surface level.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When Not to Use"
            description={`
          - Providing an update related to anything other than confirmation of a successful action. Consider a [Callout](/callout) instead.
          - Presenting mandatory and/or critical actions to a user.
          - Displaying feedback at the element level (e.g., entered password doesn't meet requirements). Use inline text instead.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <Example
        id="displayExample"
        name="Example: How to display"
        description="Toasts should be displayed in the center of the viewport, opposite the main navbar (e.g. at the top of the viewport on mobile, bottom of the viewport on desktop). Though not implemented here, Toasts are meant to be ephemeral and disappear after a few seconds."
        defaultCode={`
function ToastExample() {
  const [showToast, setShowToast] = React.useState(false);

  return (
    <Box>
      <Button
        onClick={() => setShowToast((currVal) => !currVal)}
        text={showToast ? 'Close toast' : 'Show toast'}
      />

      {showToast && (
        <Layer>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 50,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            fit
            paddingX={1}
            position="fixed"
          >
            <Toast
              button={<Button key="button-key" text="Undo" size="lg" />}
              text={
                <React.Fragment>
                  Saved to{' '}
                  <Text inline weight="bold">
                    <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
                      Home decor
                    </Link>
                  </Text>
                </React.Fragment>
              }
              thumbnail={
                <Image
                  alt="Modern ceramic vase pin."
                  naturalHeight={564}
                  naturalWidth={564}
                  src="https://i.ibb.co/Lx54BCT/stock1.jpg"
                />
              }
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}`}
      />

      <Example
        id="textOnlyExample"
        name="Example: Simple Text"
        defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast text="Section created!" />
</Flex>
`}
      />

      <Example
        id="complexTextExample"
        name="Example: Complex Text"
        description="When passing in your own Text component for `text`, do not specify `color` on Text. Toast will automatically pick the correct text color for the given `variant`."
        defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text={
      <React.Fragment>
        Saved to{' '}
        <Text inline weight="bold">
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
            Home decor
          </Link>
        </Text>
      </React.Fragment>
    }
  />
</Flex>
`}
      />

      <Example
        id="errorVariantExample"
        name="Example: Error variant"
        defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text="Oops! Something went wrong. Please try again later."
    variant="error"
  />
</Flex>
`}
      />

      <Example
        id="imageTextExample"
        name="Example: Image + Text"
        defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    text={
      <React.Fragment>
        Saved to{' '}
        <Text inline weight="bold">
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
            Home decor
          </Link>
        </Text>
      </React.Fragment>
    }
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
  />
</Flex>
`}
      />

      <Example
        id="imageTextButtonExample"
        name="Example: Image + Text + Button"
        defaultCode={`
<Flex justifyContent="center" width="100%">
  <Toast
    button={<Button key="button-key" text="Undo" size="lg" />}
    text={
      <React.Fragment>
        Saved to{' '}
        <Text inline weight="bold">
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
            Home decor
          </Link>
        </Text>
      </React.Fragment>
    }
    thumbnail={
      <Image
        alt="Modern ceramic vase pin."
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />
    }
  />
</Flex>
`}
      />

      <Combination
        id="combinations-overview"
        layout="12column"
        name="Combinations: Overview"
        showValues={false}
        text={[
          'Section created!',
          <Fragment key="saved-text">
            Saved to{' '}
            <Text inline weight="bold">
              <Link
                inline
                target="blank"
                href="https://www.pinterest.com/search/pins/?q=home%20decor"
              >
                Home decor
              </Link>
            </Text>
          </Fragment>,
        ]}
        thumbnail={[
          null,
          <Image
            key="image-key"
            alt="Modern ceramic vase pin."
            naturalHeight={564}
            naturalWidth={564}
            src="https://i.ibb.co/Lx54BCT/stock1.jpg"
          />,
        ]}
        button={[null, <Button key="button-key" text="Undo" size="lg" />]}
      >
        {(props) => <Toast {...props} />}
      </Combination>

      <Combination
        id="combinations-thumbnail"
        layout="12column"
        name="Combinations: Thumbnail shapes"
        showValues={false}
        thumbnailShape={['circle', 'rectangle', 'square']}
      >
        {(props) => (
          <Toast
            {...props}
            thumbnail={
              <Image
                key="image-key"
                alt="Blush and sage plant print."
                naturalHeight={751}
                naturalWidth={564}
                src="https://i.ibb.co/7bQQYkX/stock2.jpg"
              />
            }
            text={
              <Fragment>
                Saved to{' '}
                <Text inline weight="bold">
                  <Link
                    inline
                    target="blank"
                    href="https://www.pinterest.com/search/pins/?q=home%20decor"
                  >
                    Home decor
                  </Link>
                </Text>
              </Fragment>
            }
            button={<Button key="button-key" text="Undo" size="lg" />}
          />
        )}
      </Combination>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Toast' }) },
  };
}
