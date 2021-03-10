// @flow strict
import React, { type Element, type Node } from 'react';
import Flex from './Flex.js';
import Heading from './Heading.js';
import Text from './Text.js';
import { type Dimension } from './boxTypes.js';

// import styles from './PageHeader.css';

type Props = {|
  title: string,
  maxWidth?: Dimension,
  primaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  primaryActionDropdown?: Element<typeof Dropdown>,
  secondaryAction?: Element<typeof Button | typeof IconButton | typeof Link | typeof Tooltip>,
  secondaryActionDropdown?: Element<typeof Dropdown>,
  subtext?: string,
|};

export default function PageHeader({
  maxWidth,
  primaryAction,
  primaryActionDropdown,
  secondaryAction,
  secondaryActionDropdown,
  subtext,
  title,
}: Props): Node {
  const renderActionWithDropdown = (action?: Node, dropdown?: Node): Node => {
    const [openAction, setOpenAction] = React.useState(false);

    return (
      <React.Fragment>
        {action}
        {dropdown}
      </React.Fragment>
    );
  };
  return (
    <Flex flex="grow" justifyContent="between" alignItems="center" maxWidth={maxWidth}>
      <Flex direction="column" gap={2}>
        <Heading truncate>{title}</Heading>
        <Text truncate>{subtext}</Text>
      </Flex>
      <Flex gap={2}>
        {renderActionWithDropdown(secondaryAction, secondaryActionDropdown)}
        {renderActionWithDropdown(primaryAction, primaryActionDropdown)}
      </Flex>
    </Flex>
  );
}
