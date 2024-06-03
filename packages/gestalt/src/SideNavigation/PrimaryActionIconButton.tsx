import { cloneElement, ReactElement, useEffect, useId, useRef, useState } from 'react';
import Dropdown from '../Dropdown';
import Pog from '../Pog';
import MaybeTooltip from '../sharedSubcomponents/MaybeTooltip';
import TapArea from '../TapArea';
import { CompositeZIndex, FixedZIndex, Indexable } from '../zIndex';

type Props = {
  icon?: 'ellipsis' | 'edit' | 'trash-can';
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
  }) => void;
  setCompression: (arg1: 'compress' | 'none') => void;
  forceIconButton: 'force' | 'default';
  setForceIconButton: (arg1: 'force' | 'default') => void;
  setShowIconButton: (arg1: 'show' | 'hide') => void;
  isItemActive: boolean;
  tooltip: {
    accessibilityLabel?: string;
    text: string;
    zIndex?: Indexable;
  };
  dropdownItems?: ReadonlyArray<ReactElement>;
};

function ItemIconButton({
  icon = 'ellipsis',
  onClick,
  tooltip,
  dropdownItems,
  isItemActive,
  setShowIconButton,
  forceIconButton,
  setForceIconButton,
  setCompression,
}: Props) {
  const id = useId();

  const innerRef = useRef<null | HTMLAnchorElement | HTMLDivElement>(null);

  const [selected, setSelected] = useState(dropdownItems ? false : undefined);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  let bgColor = 'transparent';
  let iconColor = 'darkGray';

  if (!isItemActive && !hovered && !focused) {
    bgColor = 'transparent';
    iconColor = 'darkGray';
  }

  if (isItemActive && (hovered || focused)) {
    bgColor = 'gray';
    iconColor = 'white';
  }

  if (isItemActive && !hovered && !focused) {
    iconColor = 'white';
  }

  if (isItemActive && selected) {
    bgColor = 'white';
    iconColor = 'darkGray';
  }

  useEffect(() => {
    // As soon as Dropdown gets dismissed and unselects IconButton, we hide and stop forcing it
    if (forceIconButton === 'force' && selected === false) {
      setShowIconButton('hide');
      setForceIconButton?.('default');
    }
  }, [selected, forceIconButton, setShowIconButton, setForceIconButton]);

  const tooltipZIndex = tooltip?.zIndex
    ? new CompositeZIndex([new FixedZIndex(1), tooltip?.zIndex].filter(Boolean))
    : new FixedZIndex(1);
  const dropdownZIndex = new CompositeZIndex([tooltipZIndex]);
  return (
    <MaybeTooltip
      disabled={open}
      tooltip={{
        text: tooltip.text,
        accessibilityLabel: '',
        zIndex: tooltipZIndex,
      }}
    >
      {/* Interactive elements require an a11yLabel on them or their children. That's why we set`accessibilityLabel` on `TapArea` instead of `Tooltip` */}
      <TapArea
        // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | HTMLAnchorElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
        ref={innerRef}
        accessibilityControls={id}
        accessibilityExpanded={open}
        accessibilityLabel={tooltip?.accessibilityLabel ?? tooltip.text}
        onBlur={() => {
          setFocused(false);
          // With keyboard navigation, we want to hide IconButton if we keep tabbing without opening Dropdown
          // However, Dropdown captures focus, therefore, as soon as it opens could hide IconButton and unmount itself, never displaying
          // We prevent this by disabling this action until Dropdown gets dismissed and unselects IconButton
          if (typeof selected === 'undefined' || forceIconButton === 'default') {
            setShowIconButton('hide');
          }
        }}
        onFocus={() => {
          setFocused(true);
          setShowIconButton('show');
        }}
        onMouseEnter={() => {
          setCompression('none');
          setHovered(true);
        }}
        onMouseLeave={() => {
          setCompression('compress');
          setHovered(false);
        }}
        onTap={({ event }) => {
          // We need event.stopPropagation(); so the SideNavigation.TopItem's onClick doesn't get trigger as well
          event.stopPropagation();
          // As soon as IconButton gets clicked, we force its display, only if selected === false.
          // We don't force if selected ===  undefined, which would indicate there's no Dropdown associated, just an action
          if (selected === false) {
            setForceIconButton?.('force');
          }

          if (selected !== undefined) {
            setSelected((value) => !value);
            setOpen((value) => !value);
          }

          onClick?.({ event });
        }}
        rounding="circle"
        tapStyle="compress"
      >
        <Pog
          accessibilityLabel=""
          active={(hovered || focused) && !isItemActive}
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"gray" | "red" | "white" | "transparent" | "transparentDarkGray" | "lightGray" | undefined'.
          bgColor={bgColor}
          icon={icon}
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"darkGray" | "gray" | "red" | "white" | "brandPrimary" | undefined'.
          iconColor={iconColor}
          selected={selected === true && !isItemActive}
          size="xs"
        />
        {open && (
          <Dropdown
            anchor={innerRef.current}
            id={id}
            onDismiss={() => {
              setSelected(false);
              setOpen(false);
            }}
            zIndex={dropdownZIndex}
          >
            {dropdownItems?.map((element, idx) =>
              cloneElement(element, {
                key: `sidenavigation-dropdown-item-${idx}`,
              }),
            )}
          </Dropdown>
        )}
      </TapArea>
    </MaybeTooltip>
  );
}

export default ItemIconButton;
