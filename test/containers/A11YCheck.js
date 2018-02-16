import React from 'react';
import IconA11Y from './Icon.a11y';
import PropTypes from 'prop-types';

export default function A11YCheck(props) {
  const { component } = props;

  if (component === 'icon') {
    return <IconA11Y />;
  }

  return <div />;
}

A11YCheck.propTypes = {
  component: PropTypes.string,
};
