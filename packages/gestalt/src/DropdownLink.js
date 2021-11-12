// @flow strict
import { type Node } from 'react';
import OptionItem, { type OptionItemType } from './OptionItem.js';
import { DropdownContextConsumer } from './DropdownContext.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type PublicProps = {|
  badgeText?: string,
  children?: Node,
  dataTestId?: string,
  href: string,
  isExternal?: boolean,
  onClick?: AbstractEventHandler<
    SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| dangerouslyDisableOnNavigation: () => void |},
  >,
  option: OptionItemType,
|};

type PrivateProps = {|
  index?: number,
|};

type Props = {|
  ...PublicProps,
  ...PrivateProps,
|};

export default function DropdownLink({
  badgeText,
  children,
  dataTestId,
  href,
  index = 0,
  isExternal,
  onClick,
  option,
}: Props): Node {
  return (
    <DropdownContextConsumer>
      {({ id, hoveredItem, setHoveredItem, setOptionRef }) => (
        <OptionItem
          badgeText={badgeText}
          dataTestId={dataTestId}
          hoveredItemIndex={hoveredItem}
          href={href}
          id={id}
          index={index}
          isExternal={isExternal}
          key={`${option.value + index}`}
          lineClamp={1}
          onClick={onClick}
          option={option}
          role="menuitem"
          setHoveredItemIndex={setHoveredItem}
          ref={setOptionRef}
          textWeight="bold"
        >
          {children}
        </OptionItem>
      )}
    </DropdownContextConsumer>
  );
}

// displayName is necessary for children identification in Dropdown
DropdownLink.displayName = 'DropdownLink';
