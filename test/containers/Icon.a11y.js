// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'gestalt';

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
      {Icon.icons.map((iconName, idx) => (
        <IconType iconName={iconName} key={idx} />
      ))}
    </div>
  );
}
