// @flow strict
import { type ElementConfig, type Node as ReactNode, useEffect, useId } from 'react';
import classnames from 'classnames';
import ContentContainer from './ContentContainer';
import Header from './Header';
import Backdrop from '../Backdrop';
import StopScrollBehavior from '../behaviors/StopScrollBehavior';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior';
import Button from '../Button';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import { useGlobalEventsHandlerContext } from '../contexts/GlobalEventsHandlerProvider';
import focusStyles from '../Focus.css';
import { ESCAPE } from '../keyCodes';
import Layer from '../Layer';
import Link from '../Link';
import sheetMobileStyles from '../SheetMobile.css';

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
  backIconButton?: { accessibilityLabel: string, onClick: OnClickType },
  children?: ReactNode,
  footer?: ReactNode,
  forwardIconButton?: { accessibilityLabel: string, onClick: OnClickType },
  heading?: ReactNode,
  onDismiss: () => void,
  padding?: 'default' | 'none',
  primaryAction?: {
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick: OnClickType,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  },
  role?: 'alertdialog' | 'dialog',
  showDismissButton?: boolean,
  subHeading?: string,
};

export default function FullPage({
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
}: Props): ReactNode {
  const id = useId();

  // Consumes DefaultLabelProvider
  const { accessibilityLabel: defaultAccessibilityLabel } = useDefaultLabelContext('SheetMobile');

  // Consumes GlobalEventsHandlerProvider
  const { sheetMobileHandlers } = useGlobalEventsHandlerContext() ?? {
    sheetMobileHandlers: { onOpen: () => {}, onClose: () => {} },
  };

  const { onClose, onOpen } = sheetMobileHandlers ?? {
    onOpen: () => {},
    onClose: () => {},
  };
  useEffect(() => {
    onOpen?.();

    return function cleanup() {
      onClose?.();
    };
  }, [onClose, onOpen]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyUp(event: { keyCode: number }) {
      if (event.keyCode === ESCAPE) {
        onDismiss();
      }
    }

    window.addEventListener('keyup', handleKeyUp);
    return function cleanup() {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onDismiss]);

  // When SheetMobile is full page displayed in mobile browser, the body scroll is still accessible. Here we disable to just allow the scrolling within Modal
  useEffect(() => {
    let prevOverflowStyle = 'auto';

    if (window && window.body?.style?.overflow) {
      prevOverflowStyle = window.body.style.overflow;
      window.body.style.overflow = 'hidden';
    }
    return () => {
      if (window && window.body?.style?.overflow) {
        window.body.style.overflow = prevOverflowStyle;
      }
    };
  }, []);

  return (
    <Layer>
      <StopScrollBehavior>
        <TrapFocusBehavior>
          <div
            className={classnames(sheetMobileStyles.container, sheetMobileStyles.fullPageContainer)}
          >
            <Backdrop closeOnOutsideClick={false}>
              <div
                id={id}
                aria-label={accessibilityLabel ?? defaultAccessibilityLabel}
                className={classnames(sheetMobileStyles.fullPageWrapper, focusStyles.hideOutline)}
                tabIndex={-1}
                style={{ width: '100%' }}
                role={role}
              >
                <ContentContainer
                  header={
                    <Header
                      align={align}
                      backIconButton={backIconButton}
                      forwardIconButton={forwardIconButton}
                      id={id}
                      primaryAction={primaryAction}
                      heading={heading}
                      showDismissButton={showDismissButton}
                      subHeading={subHeading}
                      onDismiss={onDismiss}
                    />
                  }
                  footer={footer}
                  padding={padding}
                >
                  {children}
                </ContentContainer>
              </div>
            </Backdrop>
          </div>
        </TrapFocusBehavior>
      </StopScrollBehavior>
    </Layer>
  );
}
