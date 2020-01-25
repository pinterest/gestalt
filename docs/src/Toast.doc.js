// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import Example from './components/Example.js';
import stock1 from './images/stock1.jpg';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Toast"
    description={`Toasts can educate people on the content of the screen, provide confirmation when people complete
an action, or simply communicate a short message.

<b><i>The Toast component is purely visual. In order to properly
handle the showing and dismissing of Toasts, as well as any animations, you will need to implement a Toast manager.<i><b>`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'color',
        type: `'darkGray' | 'orange' | 'red'`,
        defaultValue: 'darkGray',
        href: 'errorExample',
      },
      {
        name: 'icon',
        type: 'arrow-circle-forward',
        defaultValue: 'arrow-circle-forward',
        description: 'More icons can be added in the future.',
        href: 'guideExample',
      },
      {
        name: 'thumbnail',
        type: 'React.Node',
        description: 'Image should fit nicely into a square',
        href: 'confirmationExample',
      },
      {
        name: 'text',
        type: 'string | Array<string>',
        description:
          'Use string for guide toasts (one line of text) and Array<string> for confirmation toasts (two lines of text).',
        href: 'confirmationExample',
      },
    ]}
  />
);

card(
  <Example
    id="confirmationExample"
    name="Confirmation Toasts"
    description="You can use Toasts to confirm an action has occured. When you are using a Toast as a confirmation, you should
        always include a thumbnail and two lines of text."
    defaultCode={`
function ToastExample() {
  const [showConfirmationToast, setShowConfirmationToast] = React.useState(false);
  return (
    <Box>
      <Button
        inline
        text={ showConfirmationToast ? 'Close toast' : 'Show confirmation toast' }
        onClick={() => setShowConfirmationToast(!showConfirmationToast)}
        size='md'
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
          position='fixed'
        >
          {showConfirmationToast ? (
              <Toast
                text={['Saved to', 'Home decor']}
                thumbnail={
                  <Image
                    alt='Saved to home decor board'
                    naturalHeight={564}
                    naturalWidth={564}
                    src='${stock1}'
                  />
                }
              />
          ) : null}
        </Box>
      </Layer>
    </Box>
  );
}`}
  />
);

card(
  <Example
    id="guideExample"
    name="Guide Toasts"
    description="You can also use Toasts to guide and educate your users. In this case, no thumbnail is needed. Simply provide
      your instructional text to the Toast component. The arrow icon indicating the Toast is a link will be automatically
      added. If you need a different Icon here, please contact the Gestalt team."
    defaultCode={`
function ToastExample() {
  const [showGuideToast, setShowGuideToast] = React.useState(false);
  return (
    <Box>
      <Button
        inline
        text={ showGuideToast ? 'Close toast' : 'Show guide toast' }
        onClick={() => setShowGuideToast(!showGuideToast)}
        size='md'
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
          position='fixed'
        >
          {showGuideToast ? (
            <Toast
              icon='arrow-circle-forward'
              text='Same great profile, just a new look. Learn more?'
            />
          ) : null}
        </Box>
      </Layer>
    </Box>
  );
}`}
  />
);

card(
  <Example
    id="errorExample"
    description="
      You can use Toasts to indicate that something wrong occurred by setting the color to red.
    "
    name="Error Toasts"
    defaultCode={`
function ToastExample() {
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  return (
    <Box>
      <Button
        inline
        text={ showErrorToast ? 'Close toast' : 'Show error toast' }
        onClick={() => setShowErrorToast(!showErrorToast)}
        size='md'
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
          position='fixed'
        >
          {showErrorToast ? (
            <Toast color='red' text="Oops, we couldn't find that!" />
          ) : null}
        </Box>
      </Layer>
    </Box>
  );
}`}
  />
);

export default cards;
