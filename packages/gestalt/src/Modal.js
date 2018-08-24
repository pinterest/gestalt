// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Divider from './Divider.js';
import Heading from './Heading.js';
import IconButton from './IconButton.js';
import StopScrollBehavior from './behaviors/StopScrollBehavior.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import OutsideEventBehavior from './behaviors/OutsideEventBehavior.js';
import styles from './Modal.css';

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

const SIZE_WIDTH_MAP = {
  sm: 414,
  md: 544,
  lg: 804,
};

const ESCAPE_KEY_CODE = 27;

const Backdrop = ({ children }: { children?: React.Node }) => (
  <React.Fragment>
    <div className={styles.Backdrop} />
    {children}
  </React.Fragment>
);

export default class Modal extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.node,
    accessibilityCloseLabel: PropTypes.string.isRequired,
    footer: PropTypes.node,
    heading: PropTypes.string.isRequired,
    accessibilityModalLabel: PropTypes.string.isRequired,
    onDismiss: PropTypes.func,
    role: PropTypes.oneOf(['alertdialog', 'dialog']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
  };

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleOutsideClick = () => {
    this.props.onDismiss();
  };

  handleCloseClick = () => {
    this.props.onDismiss();
  };

  handleKeyUp = (event: { keyCode: number }) => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.props.onDismiss();
    }
  };

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

    return (
      <StopScrollBehavior>
        <TrapFocusBehavior>
          <div
            aria-label={accessibilityModalLabel}
            className={styles.container}
            role={role}
          >
            <Backdrop>
              <OutsideEventBehavior onClick={this.handleOutsideClick}>
                <div className={styles.wrapper} tabIndex={-1} style={{ width }}>
                  <Box
                    flex="grow"
                    position="relative"
                    display="flex"
                    direction="column"
                    width="100%"
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
                            onClick={this.handleCloseClick}
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
              </OutsideEventBehavior>
            </Backdrop>
          </div>
        </TrapFocusBehavior>
      </StopScrollBehavior>
    );
  }
}
