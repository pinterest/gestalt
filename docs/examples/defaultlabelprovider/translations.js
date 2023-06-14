// @flow strict
import { type Node, useState } from 'react';
import { Box, ComboBox, DefaultLabelProvider, Flex, Heading } from 'gestalt';

const myI18nTranslator = (val: string) => val.toUpperCase();

const labels = {
  ActivationCard: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss'),
  },
  Callout: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss Banner'),
    iconAccessibilityLabelError: myI18nTranslator('Error'),
    iconAccessibilityLabelInfo: myI18nTranslator('Information'),
    iconAccessibilityLabelRecommendation: myI18nTranslator('Recommendation'),
    iconAccessibilityLabelWarning: myI18nTranslator('Warning'),
    iconAccessibilityLabelSuccess: myI18nTranslator('Success'),
  },
  ComboBox: {
    noResultText: myI18nTranslator('No results'),
    accessibilityClearButtonLabel: myI18nTranslator('Clear input'),
  },
  Link: {
    accessibilityNewTabLabel: myI18nTranslator('Opens a new tab'),
  },
  Modal: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss modal'),
  },
  Popover: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss popover'),
  },
  OverlayPanel: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss overlay panel'),
    dismissConfirmationMessage: myI18nTranslator('Are you sure you want to dismiss?'),
    dismissConfirmationSubtext: myI18nTranslator(
      'You will lose all of your changes. This cannot be undone',
    ),
    dismissConfirmationPrimaryActionText: myI18nTranslator('Yes, dismiss'),
    dismissConfirmationPrimaryActionTextLabel: myI18nTranslator('Yes, dismiss the overlay panel'),
    dismissConfirmationSecondaryActionText: myI18nTranslator('No, go back'),
    dismissConfirmationSecondaryActionTextLabel: myI18nTranslator(
      'No, go back to the overlay panel',
    ),
  },
  SheetMobile: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss bottom sheet'),
    accessibilityGrabberLabel: myI18nTranslator('Grabber'),
    accessibilityLabel: myI18nTranslator('Bottom sheet'),
  },
  SideNavigation: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss side navigation'),
  },
  SlimBanner: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss banner'),
    iconAccessibilityLabelError: myI18nTranslator('Error'),
    iconAccessibilityLabelInfo: myI18nTranslator('Information'),
    iconAccessibilityLabelRecommendation: myI18nTranslator('Recommendation'),
    iconAccessibilityLabelWarning: myI18nTranslator('Warning'),
    iconAccessibilityLabelSuccess: myI18nTranslator('Success'),
  },
  Spinner: {
    accessibilityLabel: myI18nTranslator('Loading'),
  },
  Tag: {
    accessibilityErrorIconLabel: myI18nTranslator('Error'),
    accessibilityRemoveIconLabel: myI18nTranslator('Remove tag'),
    accessibilityWarningIconLabel: myI18nTranslator('Warning'),
  },
  TextField: {
    accessibilityHidePasswordLabel: myI18nTranslator('Hide password'),
    accessibilityShowPasswordLabel: myI18nTranslator('Show password'),
  },
  HelpButton: {
    tooltipMessage: myI18nTranslator('Click to learn more'),
  },
  Toast: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss toast'),
    accessibilityIconSuccessLabel: myI18nTranslator('Success message'),
    accessibilityIconErrorLabel: myI18nTranslator('Error message'),
    accessibilityProcessingLabel: myI18nTranslator('Processing message'),
  },
  Upsell: {
    accessibilityDismissButtonLabel: myI18nTranslator('Dismiss banner'),
  },
  Video: {
    accessibilityMaximizeLabel: myI18nTranslator('Maximize'),
    accessibilityMinimizeLabel: myI18nTranslator('Minimize'),
    accessibilityMuteLabel: myI18nTranslator('Mute'),
    accessibilityPauseLabel: myI18nTranslator('Pause'),
    accessibilityPlayLabel: myI18nTranslator('Play'),
    accessibilityProgressLabel: myI18nTranslator('Video progress'),
    accessibilityUnmuteLabel: myI18nTranslator('Unmute'),
    accessibilityHideCaptionsLabel: myI18nTranslator('Hide captions'),
    accessibilityShowCaptionsLabel: myI18nTranslator('Show captions'),
  },
};

const pronouns = [
  'ey / em',
  'he / him',
  'ne / nem',
  'she / her',
  'they / them',
  've / ver',
  'xe / xem',
  'xie / xem',
  'zie / zem',
];

export default function Example(): Node {
  const [errorMessage, setErrorMessage] = useState<?string>();

  const handleOnBlur = ({
    value,
  }: {|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => {
    if (value !== '' && !pronouns.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <DefaultLabelProvider labels={labels}>
      <Box height="100%" marginTop={3} padding={2} width="100%">
        <Flex
          alignItems="center"
          direction="column"
          gap={5}
          height="100%"
          justifyContent="center"
          width="100%"
        >
          <Heading size="300">For apps using internationalization</Heading>

          <Box width={320}>
            <ComboBox
              errorMessage={errorMessage}
              helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
              id="translations-combobox"
              label="Pronouns"
              noResultText="No results for your selection"
              onBlur={handleOnBlur}
              onChange={resetErrorMessage}
              onClear={resetErrorMessage}
              options={pronouns.map((pronoun, index) => ({
                label: pronoun,
                value: `value${index}`,
              }))}
              placeholder="Add your pronouns"
            />
          </Box>
        </Flex>
      </Box>
    </DefaultLabelProvider>
  );
}
