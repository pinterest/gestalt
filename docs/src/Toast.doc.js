// @flow strict
import React, { type Node } from 'react';
import { Button, Link, Image, Text, Toast } from 'gestalt';
import Combination from './components/Combination.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import PropTable from './components/PropTable.js';

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
        name: 'color',
        type: `'white' | 'red'`,
        href: 'redColorTextAlertExample',
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
        name: 'text',
        type: 'string | React.Node',
        description:
          'Use string for guide toasts (one line of text) and React.Node for confirmation toasts (complex text, potentially containing a Link). Avoid specifying a Text color within this property, as the color is automatically determined based on the background color',
        href: 'textOnlyExample',
      },
    ]}
  />,
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
        inline
        text={ showToast ? 'Close toast' : 'Show toast' }
        onClick={() => setShowToast(!showToast)}
      />
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {showToast && (
            <Toast
              text={"Section created!"}
            />
          )}
        </Box>
      </Layer>
    </Box>
  );
}`}
  />,
);

card(
  <Example
    id="complexTextExample"
    name="Example: Complex Text"
    description="When passing in your own Text component for the text property, be careful not to specify a color property, as the Toast component will automatically pick the right text color based on the Toast's background color."
    defaultCode={`
function ToastExample() {
  const [showToast, setShowToast] = React.useState(false);
  return (
    <Box>
      <Button
        inline
        text={ showToast ? 'Close toast' : 'Show toast' }
        onClick={() => setShowToast(!showToast)}
      />
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {showToast && (
            <Toast
              text={
                <>
                  Saved to{' '}
                  <Text inline weight="bold">
                    <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
                      Home decor
                    </Link>
                  </Text>
                </>
              }
            />
          )}
        </Box>
      </Layer>
    </Box>
  );
}`}
  />,
);

card(
  <Example
    id="redColorTextAlertExample"
    name="Example: Red background color"
    defaultCode={`
function ToastExample() {
  const [showToast, setShowToast] = React.useState(false);
  return (
    <Box>
      <Button
        inline
        text={ showToast ? 'Close toast' : 'Show toast' }
        onClick={() => setShowToast(!showToast)}
      />
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {showToast && (
            <Toast
              color="red"
              text={
                <>
                  Oops! Something went wrong. Please try again later.
                </>
              }
            />
          )}
        </Box>
      </Layer>
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
        inline
        text={ showToast ? 'Close toast' : 'Show toast' }
        onClick={() => setShowToast(!showToast)}
      />
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 150,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {showToast && (
            <Toast
              thumbnail={
                <Image
                  alt="Saved to home decor board"
                  naturalHeight={564}
                  naturalWidth={564}
                  src="https://i.ibb.co/Lx54BCT/stock1.jpg"
                />
              }
              text={
                <>
                  Saved to{' '}
                  <Text inline weight="bold">
                    <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
                      Home decor
                    </Link>
                  </Text>
                </>
              }
            />
          )}
        </Box>
      </Layer>
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
        inline
        text={ showToast ? 'Close toast' : 'Show toast' }
        onClick={() => setShowToast(!showToast)}
      />
      <Layer>
        <Box
          fit
          dangerouslySetInlineStyle={{
            __style: {
              bottom: 250,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          paddingX={1}
          position="fixed"
        >
          {showToast && (
            <Toast
              thumbnail={
                <Image
                  alt="Saved to home decor board"
                  naturalHeight={564}
                  naturalWidth={564}
                  src="https://i.ibb.co/Lx54BCT/stock1.jpg"
                />
              }
              text={
                <>
                  Saved to{' '}
                  <Text inline weight="bold">
                    <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
                      Home decor
                    </Link>
                  </Text>
                </>
              }
              button={<Button key="button-key" inline text="Undo" size="lg" />}
            />
          )}
        </Box>
      </Layer>
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
      <>
        Saved to{' '}
        <Text inline weight="bold">
          <Link inline target="blank" href="https://www.pinterest.com/search/pins/?q=home%20decor">
            Home decor
          </Link>
        </Text>
      </>,
    ]}
    thumbnail={[
      null,
      <Image
        key="image-key"
        alt="Saved to home decor board"
        naturalHeight={564}
        naturalWidth={564}
        src="https://i.ibb.co/Lx54BCT/stock1.jpg"
      />,
    ]}
    button={[null, <Button key="button-key" inline text="Undo" size="lg" />]}
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
            alt="Saved to home decor board"
            naturalHeight={751}
            naturalWidth={564}
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
          />
        }
        text={
          <>
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
          </>
        }
        button={<Button key="button-key" inline text="Undo" size="lg" />}
      />
    )}
  </Combination>,
);

export default cards;
