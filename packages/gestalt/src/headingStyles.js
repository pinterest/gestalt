// @flow strict
import classnames from 'classnames';
import heading from './Heading.css';
import typography from './Typography.css';

const headingStyles: string = classnames(
  heading.Heading,
  heading.fontSize1,
  typography.breakWord,
  typography.fontWeightBold,
);

export default headingStyles;
