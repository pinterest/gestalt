// @flow strict
import { type ElementConfig, type Node as ReactNode, useState } from 'react';
import classnames from 'classnames';
import styles from './InternalTextField.css';
import Box from '../Box';
import { ENTER, SPACE, TAB } from '../keyCodes';
import Pog from '../Pog';
import TapArea from '../TapArea';
import Tooltip from '../Tooltip';

function MaybeTooltip({ children, tooltipText }: { children: ReactNode, tooltipText: ?string }) {
  return tooltipText ? (
    <Tooltip inline text={tooltipText}>
      {children}
    </Tooltip>
  ) : (
    children
  );
}

type Props = {
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
};

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
}: Props): ReactNode {
  const [focused, setFocused] = useState(false);

  return (
    // styles.actionButtonContainer is required for RTL positioning
    <div className={classnames(styles.actionButtonContainer)}>
      <Box
        alignItems="center"
        aria-hidden={accessibilityHidden}
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
