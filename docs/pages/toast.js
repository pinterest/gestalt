// @flow strict
import { Fragment, type Node } from 'react';
import { Button, Link, Image, Text, Toast } from 'gestalt';
import Combination from '../components/Combination.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import PropTable from '../components/PropTable.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Toast"
    description={`Toasts can educate people on the content of the screen, provide confirmation when people complete an action, or simply communicate a short message.

The Toast component is purely visual. In order to properly handle the showing and dismissing of Toasts, as well as any animations, you will need to implement a Toast manager.`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'button',
        type: 'React.Node',
        href: 'imageTextButtonExample',
      },
      {
        name: 'text',
        type: 'string | React.Node',
        description:
          'Use string for guide toasts (one line of text) and React.Node for confirmation toasts (complex text, potentially containing a Link). Avoid specifying a Text color within this property, as the color is automatically determined based on the background color',
        href: 'textOnlyExample',
        required: true,
      },
      {
        name: 'thumbnail',
        type: 'React.Node',
        href: 'imageTextExample',
      },
      {
        name: 'thumbnailShape',
        type: `'circle' | 'rectangle' | 'square'`,
        defaultValue: 'square',
        href: 'imageTextExample',
      },
      {
        name: 'variant',
        type: `'default' | 'error'`,
        defaultValue: 'default',
        href: 'errorVariantExample',
      },
    ]}
  />,
);

card(
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
          - Providing an update related to anything other than confirmation of a successful action. Consider a [Callout](/Callout) instead.
          - Presenting mandatory and/or critical actions to a user.
          - Displaying feedback at the element level (e.g., password inputted doesn't meet requirements). Use inline text instead.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <Example
    id="textOnlyExample"
    name="Example: Simple Text"
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
            <Toast text={"Section created!"} />
          </Box>
        </Layer>
      )}
    </Box>
  );
}`}
  />,
);

card(
  <Example
    id="complexTextExample"
    name="Example: Complex Text"
    description="When passing in your own Text component for `text`, do not specify `color` on Text. Toast will automatically pick the correct text color for the given `variant`."
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
          </Box>
        </Layer>
      )}
    </Box>
  );
}`}
  />,
);

card(
  <Example
    id="errorVariantExample"
    name="Example: Error variant"
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
              text="Oops! Something went wrong. Please try again later."
              variant="error"
            />
          </Box>
        </Layer>
      )}
    </Box>
  );
}`}
  />,
);

card(
  <Example
    id="imageTextExample"
    name="Example: Image + Text"
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
  />,
);

card(
  <Example
    id="imageTextButtonExample"
    name="Example: Image + Text + Button"
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
  />,
);

card(
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
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
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
  </Combination>,
);

card(
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
  </Combination>,
);

export default function ToastPage(): Node {
  return <CardPage cards={cards} page="Toast" />;
}
