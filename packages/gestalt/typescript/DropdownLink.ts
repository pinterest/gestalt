import type { Node } from "react";
import "react";
import type { OptionItemType } from "./OptionItem";
import OptionItem from "./OptionItem";
import { DropdownContextConsumer } from "./DropdownContext";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type PublicProps = {
  badgeText?: string;
  children?: Node;
  href: string;
  isExternal?: boolean;
  onClick?: AbstractEventHandler<
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  option: OptionItemType;
};
type PrivateProps = {
  index?: number;
};
type Props = PublicProps & PrivateProps;
export default function DropdownLink({
  badgeText,
  children,
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
          hoveredItemIndex={hoveredItem}
          href={href}
          id={id}
          index={index}
          isExternal={isExternal}
          key={`${option.value + index}`}
          onClick={onClick}
          option={option}
          role="menuitem"
          setHoveredItemIndex={setHoveredItem}
          ref={setOptionRef}
          shouldTruncate
          textWeight="bold"
        >
          {children}
        </OptionItem>
      )}
    </DropdownContextConsumer>
  );
} // displayName is necessary for children identification in Dropdown

DropdownLink.displayName = "DropdownLink";