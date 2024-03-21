// @flow strict
import { type ElementConfig, Fragment, type Node as ReactNode, useEffect, useRef } from 'react';
import PrimaryAction from './PrimaryAction';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import Box from '../Box';
import Button from '../Button';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import Heading from '../Heading';
import IconButton from '../IconButton';
import Link from '../Link';
import InternalDismissButton from '../shared/InternalDismissButton';
import TapArea from '../TapArea';
import Text from '../Text';

type OnClickType = ({
  event:
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
  onDismissStart: () => void,
}) => void;

type Props = {
  accessibilityLabel?: string,
  align: 'start' | 'center',
  backIconButton: ?{ accessibilityLabel: string, onClick: OnClickType },
  forwardIconButton: ?{ accessibilityLabel: string, onClick: OnClickType },
  heading: ReactNode,
  id: string,
  onDismiss?: () => void,
  primaryAction: ?{
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: OnClickType,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  },
  showDismissButton: ?boolean,
  showGrabber?: boolean,
  subHeading: ?string,
};

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
}: Props): ReactNode {
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
              ref={grabberRef}
              accessibilityLabel={accessibilityGrabberLabel}
              fullWidth={false}
              rounding={7}
            >
              <Box color="secondary" height={5} rounding={7} width={37} />
            </TapArea>
          </Box>
        </Flex>
      ) : null}

      <Flex alignItems="center" gap={4} justifyContent="center">
        {backIconButton ? (
          <Flex.Item flex="none">
            <IconButton
              accessibilityLabel={backIconButton.accessibilityLabel}
              icon="arrow-back"
              iconColor="darkGray"
              onClick={({ event }) =>
                backIconButton?.onClick({
                  event,
                  onDismissStart: onExternalDismiss,
                })
              }
              size="lg"
            />
          </Flex.Item>
        ) : null}
        {!backIconButton && showDismissButton ? (
          <Flex.Item flex="none">
            <InternalDismissButton
              ref={dismissButtonRef}
              accessibilityControls={id}
              accessibilityLabel={accessibilityDismissButtonLabel}
              onClick={onDismiss ?? onExternalDismiss}
              size="lg"
            />
          </Flex.Item>
        ) : null}
        <Flex.Item flex="grow">
          {/* Flex.Item must wrap the conditional to prevent the DismissButton from being centered if there's no heading */}
          {heading ? (
            <Flex direction="column">
              {typeof heading === 'string' ? (
                <Heading accessibilityLevel={1} align={align} lineClamp={2} size="300">
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
              onClick={({ event }) =>
                forwardIconButton?.onClick({
                  event,
                  onDismissStart: onExternalDismiss,
                })
              }
              size="lg"
            />
          </Flex.Item>
        ) : null}
        {primaryAction ? (
          // Allow button text to wrap on mobile
          <Flex.Item flex="shrink">
            {primaryAction.href ? (
              <PrimaryAction
                accessibilityLabel={primaryAction.accessibilityLabel}
                href={primaryAction.href}
                label={primaryAction.label}
                onClick={({ event }) =>
                  primaryAction?.onClick({
                    event,
                    onDismissStart: onExternalDismiss,
                  })
                }
                rel={primaryAction.rel}
                role="link"
                target={primaryAction?.target}
              />
            ) : (
              <PrimaryAction
                accessibilityLabel={primaryAction.accessibilityLabel}
                label={primaryAction.label}
                onClick={({ event }) =>
                  primaryAction?.onClick({
                    event,
                    onDismissStart: onExternalDismiss,
                  })
                }
                role="button"
              />
            )}
          </Flex.Item>
        ) : null}
      </Flex>
    </Fragment>
  );
}
