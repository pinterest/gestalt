// @flow strict
import { type ElementConfig, type Node, useState } from 'react';
import classnames from 'classnames';
import styles from './InternalTextField.css';
import Box from '../Box.js';
import { ENTER, SPACE, TAB } from '../keyCodes.js';
import Pog from '../Pog.js';
import TapArea from '../TapArea.js';
import Tooltip from '../Tooltip.js';

function MaybeTooltip({ children, tooltipText }: {| children: Node, tooltipText: ?string |}) {
  return tooltipText ? (
    <Tooltip inline text={tooltipText}>
      {children}
    </Tooltip>
  ) : (
    children
  );
}

type Props = {|
  accessibilityChecked?: boolean,
  accessibilityHidden?: boolean,
  accessibilityLabel?: string,
  hoverStyle?: 'default' | 'none',
  icon: 'arrow-down' | 'cancel' | 'eye' | 'eye-hide',
  onClick: () => void,
  pogPadding?: 1 | 2,
  role?: 'switch',
  tapStyle?: $ElementType<ElementConfig<typeof TapArea>, 'tapStyle'>,
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
        <MaybeTooltip tooltipText={tooltipText}>
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
        </MaybeTooltip>
      </Box>
    </div>
  );
}
