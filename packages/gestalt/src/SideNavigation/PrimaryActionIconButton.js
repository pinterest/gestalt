// @flow strict
import { type Node, type Element, useRef, useState, useEffect, useId, cloneElement } from 'react';
import Dropdown from '../Dropdown.js';
import Pog from '../Pog.js';
import TapArea from '../TapArea.js';
import Tooltip from '../Tooltip.js';
import { FixedZIndex, CompositeZIndex, type Indexable } from '../zIndex.js';

type Props = {|
  icon?: 'ellipsis' | 'edit' | 'trash-can',
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
  |}) => void,
  setCompression: ('compress' | 'none') => void,
  forceIconButton: 'force' | 'default',
  setForceIconButton: ('force' | 'default') => void,
  setShowIconButton: ('show' | 'hide') => void,
  isItemActive: boolean,
  tooltip: {|
    accessibilityLabel?: string,
    text: string,
    zIndex?: Indexable,
  |},
  dropdownItems?: $ReadOnlyArray<Element<typeof Dropdown.Item>>,
|};

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
}: Props): Node {
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
    <Tooltip accessibilityLabel="" text={tooltip.text} zIndex={tooltipZIndex}>
      {/* Interactive elements require an a11yLabel on them or their children. That's why we set`accessibilityLabel` on `TapArea` instead of `Tooltip` */}
      <TapArea
        accessibilityControls={id}
        accessibilityExpanded={open}
        accessibilityLabel={tooltip?.accessibilityLabel ?? tooltip.text}
        onMouseEnter={() => {
          setCompression('none');
          setHovered(true);
        }}
        onMouseLeave={() => {
          setCompression('compress');
          setHovered(false);
        }}
        onFocus={() => {
          setFocused(true);
          setShowIconButton('show');
        }}
        onBlur={() => {
          setFocused(false);
          // With keyboard navigation, we want to hide IconButton if we keep tabbing without opening Dropdown
          // However, Dropdown captures focus, therefore, as soon as it opens could hide IconButton and unmount itself, never displaying
          // We prevent this by disabling this action until Dropdown gets dismissed and unselects IconButton
          if (typeof selected === 'undefined' || forceIconButton === 'default') {
            setShowIconButton('hide');
          }
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
        ref={innerRef}
        rounding="circle"
        tapStyle="compress"
      >
        <Pog
          accessibilityLabel=""
          active={(hovered || focused) && !isItemActive}
          selected={selected === true && !isItemActive}
          size="xs"
          icon={icon}
          iconColor={iconColor}
          bgColor={bgColor}
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
              cloneElement(element, { key: `sidenavigation-dropdown-item-${idx}` }),
            )}
          </Dropdown>
        )}
      </TapArea>
    </Tooltip>
  );
}

export default ItemIconButton;
