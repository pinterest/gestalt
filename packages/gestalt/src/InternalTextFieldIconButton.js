// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Pog from './Pog.js';
import TapArea from './TapArea.js';
import Tooltip from './Tooltip.js';
import styles from './InternalTextField.css';
import { TAB, SPACE, ENTER } from './keyCodes.js';

type Props = {|
  accessibilityChecked?: boolean,
  accessibilityHidden?: boolean,
  accessibilityLabel?: string,
  hoverStyle?: 'default' | 'none',
  icon: 'arrow-down' | 'cancel' | 'eye' | 'eye-hide',
  onClick: () => void,
  pogPadding?: 1 | 2,
  role?: 'switch',
  tapStyle?: $ElementType<React$ElementConfig<typeof TapArea>, 'tapStyle'>,
  tooltipText?: string,
|};

export default function InternalTextFieldIconButton({
  accessibilityChecked,
  accessibilityHidden,
  accessibilityLabel,
  hoverStyle = 'default',
  icon,
  onClick,
  pogPadding = 1,
  role,
  tapStyle,
  tooltipText,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  const iconButton = (
    // styles.actionButtonContainer is required for RTL positioning
    <div className={classnames(styles.actionButtonContainer)}>
      <Box
        aria-hidden={accessibilityHidden}
        alignItems="center"
        display="flex"
        height="100%"
        marginEnd={2}
        rounding="circle"
      >
        <TapArea
          accessibilityChecked={accessibilityChecked}
          accessibilityLabel={accessibilityLabel}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          onKeyDown={({ event }) => {
            if ([ENTER, SPACE].includes(event.keyCode)) onClick();
            if (event.keyCode !== TAB) event.preventDefault();
          }}
          onMouseEnter={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          onTap={onClick}
          role={role}
          rounding="circle"
          tabIndex={accessibilityHidden ? -1 : 0}
          tapStyle={tapStyle}
        >
          <Pog
            accessibilityLabel=""
            bgColor={focused && hoverStyle === 'default' ? 'lightGray' : 'transparent'}
            icon={icon}
            iconColor="darkGray"
            padding={pogPadding}
            size="xs"
          />
        </TapArea>
      </Box>
    </div>
  );

  return tooltipText ? (
    <Tooltip inline text={tooltipText}>
      {iconButton}
    </Tooltip>
  ) : (
    iconButton
  );
}
