// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Pog from './Pog.js';
import TapArea from './TapArea.js';
import styles from './InternalTextField.css';
import { TAB, SPACE, ENTER } from './keyCodes.js';

type Props = {|
  accessibilityLabel?: string,
  accessibilityHidden?: boolean,
  hoverStyle?: 'default' | 'none',
  icon: 'arrow-down' | 'cancel' | 'eye' | 'eye-hide',
  onClick: () => void,
  pogPadding?: 1 | 2,
  tapStyle?: $ElementType<React$ElementConfig<typeof TapArea>, 'tapStyle'>,
|};

export default function InternalTextFieldIconButton({
  accessibilityLabel,
  accessibilityHidden,
  hoverStyle = 'default',
  icon,
  onClick,
  pogPadding = 1,
  tapStyle,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  return (
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
}
