// @flow
import * as React from 'react';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';
import Example from './components/Example';

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
        type: `'darkGray' | 'orange'`,
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
  <Example
    name="Confirmation Toasts"
    description="You can use Toasts to confirm an action has occured. When you are using a Toast as a confirmation, you should
        always include a thumbnail and two lines of text."
    defaultCode={`
class ToastExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showConfirmationToast: false,
    };
    this.handleConfirmationClick = this.handleConfirmationClick.bind(this);
  }
  handleConfirmationClick({ event }) {
    this.setState(prevState => ({ showConfirmationToast: !prevState.showConfirmationToast }));
  };
  render() {
    return (
      <div> 
      <Button
        inline
        text={ this.state.showConfirmationToast ? 'Close toast' : 'Show confirmation toast' }
        onClick={this.handleConfirmationClick}
        size='md'
      />
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
        {this.state.showConfirmationToast ? (
            <Toast
              text={['Saved to', 'Home decor']}
              thumbnail={
                <Image
                  alt='Saved to home decor board'
                  naturalHeight={564}
                  naturalWidth={564}
                  src='https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg'
                />
              }
            />
        ) : null}
      </Box>
      </div>
    );
  }
}`}
  />
);

card(
  <Example
    name="Guide Toasts"
    description="You can also use Toasts to guide and educate your users. In this case, no thumbnail is needed. Simply provide
      your instructional text to the Toast component. The arrow icon indicating the Toast is a link will be automatically
      added. If you need a different Icon here, please contact the Gestalt team."
    defaultCode={`
class ToastExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showGuideToast: false
    };
    this.handleGuideClick = this.handleGuideClick.bind(this);
  }
  handleGuideClick({ event }) {
    this.setState(prevState => ({ showGuideToast: !prevState.showGuideToast }));
  };
  render() {
    return (
      <div>
      <Button
        inline
        text={ this.state.showGuideToast ? 'Close toast' : 'Show guide toast' }
        onClick={this.handleGuideClick}
        size='md'
      />
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
        {this.state.showGuideToast ? (
          <Toast
            icon='arrow-circle-forward'
            text='Same great profile, just a new look. Learn more?'
          />
        ) : null}
      </Box>
      </div>
    );
  }
}`}
  />
);

card(
  <Example
    description="
      You can use Toasts to indicate that something wrong occurred by setting the color to orange.
    "
    name="Error Toasts"
    defaultCode={`
class ToastExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showErrorToast: false
    };
    this.handleErrorClick = this.handleErrorClick.bind(this);
  }
  handleErrorClick({ event }) {
    this.setState(prevState => ({ showErrorToast: !prevState.showErrorToast }));
  };
  render() {
    return (
      <div>
      <Button
        inline
        text={ this.state.showErrorToast ? 'Close toast' : 'Show error toast' }
        onClick={this.handleErrorClick}
        size='md'
      />
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
        {this.state.showErrorToast ? (
          <Toast color='orange' text="Oops, we couldn't find that!" />
        ) : null}
      </Box>
      </div>
    );
  }
}`}
  />
);

export default () => <CardPage cards={cards} />;
