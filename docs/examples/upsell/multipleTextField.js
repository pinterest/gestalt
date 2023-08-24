// @flow strict
import { type Node, useState } from 'react';
import { Box, Image, TextField, Upsell } from 'gestalt';

type SubmitHandler = ({|
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
|}) => void;

export default function Example(): Node {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const handleSubmit: SubmitHandler = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Upsell
        dismissButton={{
          accessibilityLabel: 'Dismiss banner',
          onDismiss: () => {},
        }}
        imageData={{
          component: (
            <Image
              alt="Succulent plant against pink background"
              color="rgb(231, 186, 176)"
              naturalHeight={751}
              naturalWidth={564}
              src="https://i.ibb.co/7bQQYkX/stock2.jpg"
            />
          ),
          mask: { rounding: 4 },
          width: 128,
        }}
        message="Learn how to grow your business with a Pinterest ads expert today!"
        title="Interested in a free ads consultation?"
      >
        <Upsell.Form
          onSubmit={handleSubmit}
          submitButtonAccessibilityLabel="Submit info for contact"
          submitButtonText="Contact me"
        >
          <Box display="block" smDisplay="flex">
            <Box flex="grow" smMarginEnd={1} marginEnd={0} smMarginBottom={0} marginBottom={2}>
              <TextField
                id="name"
                onChange={({ value }) => setNameValue(value)}
                placeholder="Name"
                label="Full name"
                labelDisplay="hidden"
                value={nameValue}
              />
            </Box>

            <Box flex="grow" smMarginStart={1} marginStart={0}>
              <TextField
                id="email"
                onChange={({ value }) => setEmailValue(value)}
                placeholder="Email"
                type="email"
                label="Email address"
                labelDisplay="hidden"
                value={emailValue}
              />
            </Box>
          </Box>
        </Upsell.Form>
      </Upsell>
    </Box>
  );
}
