// @flow strict
import { type Node, type ElementConfig, useEffect, useId } from 'react';
import classnames from 'classnames';
import Backdrop from '../Backdrop.js';
import StopScrollBehavior from '../behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import Button from '../Button.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import focusStyles from '../Focus.css';
import { ESCAPE } from '../keyCodes.js';
import Link from '../Link.js';
import sheetMobileStyles from '../SheetMobile.css';
import ContentContainer from './ContentContainer.js';
import Header from './Header.js';

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
}: Props): Node {
  const { accessibilityLabel: defaultAccessibilityLabel } = useDefaultLabelContext('SheetMobile');

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
  );
}
