// @flow strict
import * as React from 'react';
import styles from './Table.css';

type Props = {|
  children: React.Node,
  onClick?: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
|};

const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

export default function TableRow(props: Props) {
  const { children, onClick } = props;

  const handleKeyPress = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (
      onClick &&
      (event.charCode === SPACE_CHAR_CODE || event.charCode === ENTER_CHAR_CODE)
    ) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onClick({ event });
    }
  };

  const handleOnClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick({ event });
    }
  };

  if (onClick) {
    return (
      <tr
        className={styles.trClickable}
        onClick={handleOnClick}
        onKeyPress={handleKeyPress}
        tabIndex="0"
        role="button"
      >
        {children}
      </tr>
    );
  }

  return <tr>{children}</tr>;
}
