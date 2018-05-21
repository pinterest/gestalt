// @flow
import * as React from 'react';
import { Icon } from 'gestalt';

export default function A11Y() {
  return (
    <div>
      {Icon.icons.map((iconName, idx) => (
        <div key={`${idx}-${iconName}`}>
          <h2>{iconName}</h2>
          <Icon
            icon={iconName}
            accessibilityLabel={iconName.replace(/-/g, ' ')}
            size={21}
            color="gray"
          />
        </div>
      ))}
    </div>
  );
}
