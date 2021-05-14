// @flow strict
import buttonIconRestrictions from './button-icon-restrictions.js';
import noBoxDisallowedProps from './no-box-disallowed-props.js';
import noBoxMarginleftMarginright from './no-box-marginleft-marginright.js';
import noDangerousStyleDuplicates from './no-dangerous-style-duplicates.js';
import noMediumFormfields from './no-medium-formfields.js';
import noRoleLinkComponents from './no-role-link-components.js';
import preferBox from './prefer-box.js';

module.exports = {
  rules: {
    'button-icon-restrictions': buttonIconRestrictions,
    'no-box-disallowed-props': noBoxDisallowedProps,
    'no-box-marginleft-marginright': noBoxMarginleftMarginright,
    'no-dangerous-style-duplicates': noDangerousStyleDuplicates,
    'no-medium-formfields': noMediumFormfields,
    'no-role-link-components': noRoleLinkComponents,
    'prefer-box': preferBox,
  },
};
