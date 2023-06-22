// @flow strict
import { type ElementConfig, Fragment, type Node, useEffect, useRef } from 'react';
import PrimaryAction from './PrimaryAction.js';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext.js';
import Box from '../Box.js';
import Button from '../Button.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import Flex from '../Flex.js';
import Heading from '../Heading.js';
import IconButton from '../IconButton.js';
import Link from '../Link.js';
import InternalDismissButton from '../shared/InternalDismissButton.js';
import TapArea from '../TapArea.js';
import Text from '../Text.js';

type OnClickType = ({|
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  onDismissStart: () => void,
|}) => void;

type Props = {|
  accessibilityLabel?: string,
  align: 'start' | 'center',
  backIconButton: ?{| accessibilityLabel: string, onClick: OnClickType |},
  forwardIconButton: ?{| accessibilityLabel: string, onClick: OnClickType |},
  heading: Node,
  id: string,
  onDismiss?: () => void,
  primaryAction: ?{|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: OnClickType,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  |},
  showDismissButton: ?boolean,
  showGrabber?: boolean,
  subHeading: ?string,
|};

export default function Header({
  backIconButton,
  id,
  showDismissButton,
  heading,
  subHeading,
  forwardIconButton,
  onDismiss,
  primaryAction,
  showGrabber,
  align,
}: Props): Node {
  const { accessibilityDismissButtonLabel, accessibilityGrabberLabel } =
    useDefaultLabelContext('SheetMobile');
  const { onExternalDismiss } = useRequestAnimationFrame();

  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);
  const grabberRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  useEffect(() => {
    if (!showGrabber && dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }

    if (grabberRef.current) {
      grabberRef.current.focus();
    }
  }, [dismissButtonRef, showGrabber]);

  return (
    <Fragment>
      {showGrabber ? (
        <Flex justifyContent="center">
          <Box marginBottom={2}>
            <TapArea
              fullWidth={false}
              ref={grabberRef}
              rounding={7}
              accessibilityLabel={accessibilityGrabberLabel}
            >
              <Box height={5} width={37} color="secondary" rounding={7} />
            </TapArea>
          </Box>
        </Flex>
      ) : null}

      <Flex justifyContent="center" alignItems="center" gap={4}>
        {backIconButton ? (
          <Flex.Item flex="none">
            <IconButton
              accessibilityLabel={backIconButton.accessibilityLabel}
              icon="arrow-back"
              iconColor="darkGray"
              size="lg"
              onClick={({ event }) =>
                backIconButton?.onClick({ event, onDismissStart: onExternalDismiss })
              }
            />
          </Flex.Item>
        ) : null}
        {!backIconButton && showDismissButton ? (
          <Flex.Item flex="none">
            <InternalDismissButton
              accessibilityLabel={accessibilityDismissButtonLabel}
              accessibilityControls={id}
              onClick={onDismiss ?? onExternalDismiss}
              ref={dismissButtonRef}
              size="lg"
            />
          </Flex.Item>
        ) : null}
        <Flex.Item flex="grow">
          {/* Flex.Item must wrap the conditional to prevent the DismissButton from being centered if there's no heading */}
          {heading ? (
            <Flex direction="column">
              {typeof heading === 'string' ? (
                <Heading align={align} size="300" accessibilityLevel={1} lineClamp={2}>
                  {heading}
                </Heading>
              ) : (
                heading
              )}
              {subHeading && (
                <Text align={align} size="100">
                  {subHeading}
                </Text>
              )}
            </Flex>
          ) : null}
        </Flex.Item>
        {forwardIconButton && !primaryAction ? (
          <Flex.Item flex="none">
            <IconButton
              accessibilityLabel={forwardIconButton.accessibilityLabel}
              icon="arrow-forward"
              iconColor="darkGray"
              size="lg"
              onClick={({ event }) =>
                forwardIconButton?.onClick({ event, onDismissStart: onExternalDismiss })
              }
            />
          </Flex.Item>
        ) : null}
        {primaryAction ? (
          // Allow button text to wrap on mobile
          <Flex.Item flex="shrink">
            <PrimaryAction
              accessibilityLabel={primaryAction.accessibilityLabel}
              href={primaryAction.href}
              rel={primaryAction?.rel}
              target={primaryAction?.target}
              label={primaryAction.label}
              onClick={({ event }) =>
                primaryAction?.onClick({ event, onDismissStart: onExternalDismiss })
              }
            />
          </Flex.Item>
        ) : null}
      </Flex>
    </Fragment>
  );
}
