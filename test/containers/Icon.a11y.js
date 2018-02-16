// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../src/Icon/Icon';
import icons from '../../src/Icon/icons';

function IconType({ iconName }) {
  return (
    <div>
      <h5>{iconName}</h5>
      <Icon
        icon={iconName}
        accessibilityLabel={iconName.replace(/-/g, ' ')}
        size={21}
        color="gray"
      />
    </div>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

export default function IconA11Y() {
  return (
    <div>
      {Object.keys(icons).map((iconName, idx) => (
        <IconType iconName={iconName} key={idx} />
      ))}
    </div>
  );
}
