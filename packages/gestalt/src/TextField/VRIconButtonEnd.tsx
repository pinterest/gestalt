import { ComponentProps, ReactNode, useState } from 'react';
import classnames from 'classnames';
import styles from './VRInternalTextField.css';
import { ENTER, SPACE, TAB } from '../keyCodes';
import Pog from '../Pog';
import TapArea from '../TapArea';
import Tooltip from '../Tooltip';

function MaybeTooltip({
  children,
  tooltipText,
}: {
  children: ReactNode;
  tooltipText: string | null | undefined;
}) {
  return tooltipText ? (
    <Tooltip inline text={tooltipText}>
      {children}
    </Tooltip>
  ) : (
    children
  );
}

type Props = {
  accessibilityChecked?: boolean;
  accessibilityHidden?: boolean;
  accessibilityLabel?: string;
  hoverStyle?: 'default' | 'none';
  icon: 'arrow-down' | 'cancel' | 'eye' | 'eye-hide';
  onClick: () => void;
  pogPadding?: 1 | 2;
  role?: 'switch';
  size?: 'sm' | 'md' | 'lg';
  tapStyle?: ComponentProps<typeof TapArea>['tapStyle'];
  tooltipText?: string;
};

export default function IconButtonEnd({
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
  size,
}: Props) {
  const [focused, setFocused] = useState(false);
  const isSM = size === 'sm';
  const isMD = size === 'md';
  const isLG = size === 'lg';

  return (
    <div
      className={classnames(styles.endIconContainer, {
        [styles.sm_endIconContainer]: isSM,
        [styles.md_endIconContainer]: isMD,
        [styles.lg_endIconContainer]: isLG,
      })}
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
          rounding={1}
          tabIndex={accessibilityHidden ? -1 : 0}
          tapStyle={tapStyle}
        >
          <Pog
            accessibilityLabel=""
            bgColor={focused && hoverStyle === 'default' ? 'lightGray' : 'transparent'}
            icon={icon}
            iconColor="darkGray"
            padding={pogPadding}
            size="sm"
          />
        </TapArea>
      </MaybeTooltip>
    </div>
  );
}
