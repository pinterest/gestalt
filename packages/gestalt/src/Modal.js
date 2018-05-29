// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box/Box';
import Divider from './Divider/Divider';
import Heading from './Heading/Heading';
import IconButton from './IconButton/IconButton';

import styles from './Modal.css';
import borders from './Borders.css';
import colors from './Colors.css';
import column from './Column.css';
import layout from './Layout.css';

const SIZE_WIDTH_MAP = {
  sm: 414,
  md: 544,
  lg: 804,
};

const ESCAPE_KEY_CODE = 27;

type Props = {|
  accessibilityCloseLabel: string,
  accessibilityModalLabel: string,
  children?: React.Node,
  footer?: React.Node,
  heading: string,
  onDismiss: () => void,
  role?: 'alertdialog' | 'dialog',
  size?: 'sm' | 'md' | 'lg',
|};

const Backdrop = () => <div className={styles.Backdrop} />;

export default class Modal extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('click', this.handlePageClick);
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('focus', this.restrictFocus, true);
    this.priorFocus = document.activeElement;
    if (document.body) {
      document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }
    if (this.modal && this.modal.focus) {
      // Checking this.modal.focus to address a bug in IE11
      // Though the modal exists, this.modal.focus may be null
      // See http://www.mkyong.com/javascript/focus-is-not-working-in-ie-solution/
      this.modal.focus();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePageClick);
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('focus', this.restrictFocus, true);

    if (document.body) {
      document.body.style.overflow = ''; // Reenables background scrolling
    }
    if (this.priorFocus && this.priorFocus.focus) {
      // Checking this.priorFocus.focus to address a bug in IE11
      this.priorFocus.focus();
    }
  }

  handleClose = () => {
    this.props.onDismiss();
  };

  handlePageClick = (event: Event) => {
    if (
      event.target instanceof Node &&
      this.container &&
      this.container.contains(event.target) &&
      this.modal &&
      !this.modal.contains(event.target)
    ) {
      this.handleClose();
    }
  };

  handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.handleClose();
    }
  };

  restrictFocus = (event: Event) => {
    if (
      event.target instanceof Node &&
      this.modal &&
      !this.modal.contains(event.target)
    ) {
      this.modal.focus();
    }
  };

  container: ?HTMLElement;
  modal: ?HTMLElement;
  priorFocus: ?HTMLElement;

  render() {
    const {
      accessibilityCloseLabel,
      accessibilityModalLabel,
      children,
      footer,
      heading,
      role = 'dialog',
      size = 'sm',
    } = this.props;
    const width = SIZE_WIDTH_MAP[size];

    const containerClasses = classnames(
      layout.fixed,
      layout.borderBox,
      layout.flex,
      layout.justifyCenter,
      layout.left0,
      layout.top0,
      layout.itemsCenter,
      column.xsCol12,
      styles.container
    );

    const wrapperClasses = classnames(
      layout.fit,
      layout.relative,
      colors.whiteBg,
      borders.rounded,
      styles.wrapper
    );

    return (
      <div
        aria-label={accessibilityModalLabel}
        className={containerClasses}
        ref={c => {
          this.container = c;
        }}
        role={role}
      >
        <Backdrop />
        <div
          className={wrapperClasses}
          ref={c => {
            this.modal = c;
          }}
          tabIndex={-1}
          style={{ width }}
        >
          <Box
            maxHeight="90vh"
            position="relative"
            display="flex"
            direction="column"
          >
            <Box fit>
              {role === 'dialog' ? (
                <Box
                  dangerouslySetInlineStyle={{
                    __style: { paddingLeft: 50, paddingRight: 50 },
                  }}
                  display="flex"
                  justifyContent="center"
                  paddingY={5}
                >
                  <Heading size="xs" accessibilityLevel={1}>
                    {heading}
                  </Heading>
                </Box>
              ) : (
                <Box display="flex" padding={4}>
                  <Heading size="sm" accessibilityLevel={1}>
                    {heading}
                  </Heading>
                </Box>
              )}
              {role === 'dialog' && (
                <Box padding={2} position="absolute" top right>
                  <IconButton
                    accessibilityLabel={accessibilityCloseLabel}
                    icon="cancel"
                    onClick={this.handleClose}
                  />
                </Box>
              )}
              {role === 'dialog' && <Divider />}
            </Box>
            <Box flex="grow" overflow="auto" position="relative">
              {children}
            </Box>
            <Box fit>
              {footer && (
                <Box>
                  {role === 'dialog' && <Divider />}
                  <Box padding={4}>{footer}</Box>
                </Box>
              )}
            </Box>
          </Box>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  accessibilityCloseLabel: PropTypes.string.isRequired,
  footer: PropTypes.node,
  heading: PropTypes.string.isRequired,
  accessibilityModalLabel: PropTypes.string.isRequired,
  onDismiss: PropTypes.func,
  role: PropTypes.oneOf(['alertdialog', 'dialog']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
