// @flow strict
import {
  type Node,
  type ElementConfig,
  useCallback,
  useState,
  useEffect,
  useRef,
  useId,
} from 'react';
import classnames from 'classnames';
import { useAnimation } from '../animation/AnimationContext.js';
import Backdrop from '../Backdrop.js';
import StopScrollBehavior from '../behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import Box from '../Box.js';
import Button from '../Button.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import Flex from '../Flex.js';
import focusStyles from '../Focus.css';
import Heading from '../Heading.js';
import IconButton from '../IconButton.js';
import { ESCAPE } from '../keyCodes.js';
import Link from '../Link.js';
import InternalDismissButton from '../shared/InternalDismissButton.js';
import sheetMobileStyles from '../SheetMobile.css';
import Text from '../Text.js';
import PrimaryAction from './PrimaryAction.js';

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
  align?: 'start' | 'center',
  backIconButton?: {| accessibilityLabel: string, onClick: OnClickType |},
  children?: Node,
  footer?: Node,
  forwardIconButton?: {| accessibilityLabel: string, onClick: OnClickType |},
  heading?: Node,
  onDismiss: () => void,
  padding?: 'default' | 'none',
  primaryAction?: {|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: OnClickType,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  |},
  role?: 'alertdialog' | 'dialog',
  showDismissButton?: boolean,
  subHeading?: string,
|};

export default function InternalFullPageSheetMobile({
  accessibilityLabel,
  align,
  backIconButton,
  children,
  onDismiss,
  footer,
  forwardIconButton,
  padding,
  primaryAction,
  heading,
  role,
  showDismissButton,
  subHeading,
}: Props): Node {
  const { accessibilityLabel: defaultAccessibilityLabel, accessibilityDismissButtonLabel } =
    useDefaultLabelContext('SheetMobile');

  const { onExternalDismiss } = useAnimation();

  const [showTopShadow, setShowTopShadow] = useState(false);

  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const contentRef = useRef<?HTMLElement>(null);

  useEffect(() => {
    function handleKeyUp(event: {| keyCode: number |}) {
      if (event.keyCode === ESCAPE) {
        onDismiss();
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onDismiss]);

  const updateShadows = useCallback(() => {
    const target = contentRef.current;
    if (!target) {
      return;
    }

    const hasVerticalScrollbar = target.clientHeight < target.scrollHeight;
    setShowTopShadow(hasVerticalScrollbar && target.scrollTop > 0);
    setShowBottomShadow(
      hasVerticalScrollbar && target.offsetHeight + target.scrollTop < target.scrollHeight,
    );
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateShadows);
    return () => {
      window.removeEventListener('resize', updateShadows);
    };
  }, [updateShadows]);

  useEffect(() => {
    updateShadows();
  }, [updateShadows]);

  const dismissButtonRef = useRef();

  useEffect(() => {
    if (dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [dismissButtonRef]);

  const id = useId();

  useEffect(() => {
    // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
    if (window && window.body?.style?.overflow) {
      window.body.style.overflow = 'hidden';
    }
    return () => {
      if (window && window.body?.style?.overflow) {
        window.body.style.overflow = 'auto';
      }
    };
  }, []);

  return (
    <StopScrollBehavior>
      <TrapFocusBehavior>
        <div
          id={id}
          aria-label={accessibilityLabel ?? defaultAccessibilityLabel}
          className={classnames(sheetMobileStyles.container, sheetMobileStyles.fullPageContainer)}
          role={role}
        >
          <Backdrop closeOnOutsideClick={false}>
            <div
              className={classnames(sheetMobileStyles.fullPageWrapper, focusStyles.hideOutline)}
              tabIndex={-1}
              style={{ width: '100%' }}
            >
              <Box flex="grow" position="relative" display="flex" direction="column" width="100%">
                <Box
                  padding={4}
                  borderStyle={showTopShadow ? 'raisedTopShadow' : undefined}
                  position="relative"
                  fit
                >
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
                          onClick={() => onDismiss()}
                          ref={dismissButtonRef}
                          size="lg"
                        />
                      </Flex.Item>
                    ) : null}
                    {Boolean(heading) && (
                      <Flex.Item flex="grow">
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
                      </Flex.Item>
                    )}
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
                </Box>

                <Box
                  padding={padding === 'none' ? 0 : 4}
                  flex="grow"
                  overflow="auto"
                  onScroll={updateShadows}
                  ref={contentRef}
                >
                  {children}
                </Box>

                {Boolean(footer) && (
                  <Box
                    borderStyle={showBottomShadow ? 'raisedBottomShadow' : undefined}
                    position="relative"
                    fit
                  >
                    <Box padding={4}>{footer}</Box>
                  </Box>
                )}
              </Box>
            </div>
          </Backdrop>
        </div>
      </TrapFocusBehavior>
    </StopScrollBehavior>
  );
}
