// @flow
import * as React from 'react';
import { Button, Image, Toast, Box } from 'gestalt';
import { card, PropTable, StateRecorder } from './cards';
import PageHeader from './components/PageHeader';

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
        type: `"darkGray" | "orange"`,
        defaultValue: 'darkGray',
      },
      {
        name: 'icon',
        type: 'arrow-circle-forward',
        defaultValue: 'arrow-circle-forward',
        description: 'More icons can be added in the future.',
      },
      {
        name: 'thumbnail',
        type: 'React$Element<any>',
        description: 'Image should fit nicely into a square',
      },
      {
        name: 'text',
        type: 'string | Array<string>',
        description:
          'Use string for guide toasts (one line of text) and Array<string> for confirmation toasts (two lines of text).',
      },
    ]}
    heading={false}
  />
);

card(
  <StateRecorder
    description={`
    You can use Toasts to confirm an action has occured. When you are using a Toast as a confirmation, you should
    always include a thumbnail and two lines of text.

    ~~~jsx
    <Toast
      text={['Saved to', 'Home decor']}
      thumbnail={
        <Image
          alt="Saved to casa board"
          src="https://s-media-cache-ak0.pinimg.com/564x/19/f4/87/19f487a680f9fb1ecc8aa139b2afac7f.jpg"
        />
      }
    />
    ~~~
  `}
    name="Confirmation Toasts"
    fn={atom => (
      <div>
        <Button
          inline
          text={
            atom.deref().showToast ? 'Close toast' : 'Show confirmation toast'
          }
          onClick={() => atom.reset({ showToast: !atom.deref().showToast })}
          size="md"
        />
        {atom.deref().showToast ? (
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 68,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            paddingX={1}
            position="fixed"
          >
            <Toast
              text={['Saved to', 'Home decor']}
              thumbnail={
                <Image
                  alt="Saved to home decor board"
                  naturalHeight={564}
                  naturalWidth={564}
                  src="https://s-media-cache-ak0.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
                />
              }
            />
          </Box>
        ) : null}
      </div>
    )}
  />
);

card(
  <StateRecorder
    description={`
    You can also use Toasts to guide and educate your users. In this case, no thumbnail is needed. Simply provide
    your instructional text to the Toast component. The arrow icon indicating the Toast is a link will be automatically
    added. If you need a different Icon here, please contact the Gestalt team.

    ~~~jsx
    <Toast text="Same great profile, just a new look. Learn more?" />
    ~~~
  `}
    name="Guide Toasts"
    fn={atom => (
      <div>
        <Button
          inline
          text={atom.deref().showToast ? 'Close toast' : 'Show guide toast'}
          onClick={() => atom.reset({ showToast: !atom.deref().showToast })}
          size="md"
        />
        {atom.deref().showToast ? (
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 68,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            paddingX={1}
            position="fixed"
          >
            <Toast
              icon="arrow-circle-forward"
              text="Same great profile, just a new look. Learn more?"
            />
          </Box>
        ) : null}
      </div>
    )}
  />
);

card(
  <StateRecorder
    description={`
    You can use Toasts to indicate that something wrong occurred by setting the color to orange.

    ~~~jsx
    <Toast color="orange" text="Oops, we couldn't find that!" />
    ~~~
  `}
    name="Error Toasts"
    fn={atom => (
      <div>
        <Button
          inline
          text={atom.deref().showToast ? 'Close toast' : 'Show error toast'}
          onClick={() => atom.reset({ showToast: !atom.deref().showToast })}
          size="md"
        />
        {atom.deref().showToast ? (
          <Box
            fit
            dangerouslySetInlineStyle={{
              __style: {
                bottom: 68,
                left: '50%',
                transform: 'translateX(-50%)',
              },
            }}
            paddingX={1}
            position="fixed"
          >
            <Toast color="orange" text="Oops, we couldn't find that!" />
          </Box>
        ) : null}
      </div>
    )}
  />
);
