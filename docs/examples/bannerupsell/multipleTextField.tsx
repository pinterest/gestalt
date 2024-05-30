import { useState } from 'react';
import { BannerUpsell, Box, Image, TextField } from 'gestalt';

type SubmitHandler = (arg1: {
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLButtonElement>;
}) => void;

export default function Example() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const handleSubmit: SubmitHandler = ({ event }) => {
    event.preventDefault();
    // your submit logic using state values
  };

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <BannerUpsell
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
        <BannerUpsell.Form
          onSubmit={handleSubmit}
          submitButtonAccessibilityLabel="Submit info for contact"
          submitButtonText="Contact me"
        >
          <Box display="block" smDisplay="flex">
            <Box flex="grow" marginBottom={2} marginEnd={0} smMarginBottom={0} smMarginEnd={1}>
              <TextField
                id="name"
                label="Full name"
                labelDisplay="hidden"
                onChange={({ value }) => setNameValue(value)}
                placeholder="Name"
                value={nameValue}
              />
            </Box>

            <Box flex="grow" marginStart={0} smMarginStart={1}>
              <TextField
                id="email"
                label="Email address"
                labelDisplay="hidden"
                onChange={({ value }) => setEmailValue(value)}
                placeholder="Email"
                type="email"
                value={emailValue}
              />
            </Box>
          </Box>
        </BannerUpsell.Form>
      </BannerUpsell>
    </Box>
  );
}
