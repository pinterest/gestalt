// @flow strict
import buttonIconRestrictions from './button-icon-restrictions.js';
import noBoxDisallowedProps from './no-box-disallowed-props.js';
import noBoxUselessProps from './no-box-useless-props.js';
import noBoxMarginleftMarginright from './no-box-marginleft-marginright.js';
import noDangerousStyleDuplicates from './no-dangerous-style-duplicates.js';
import noMediumFormfields from './no-medium-formfields.js';
import noRoleLinkComponents from './no-role-link-components.js';
import noSpreadProps from './no-spread-props.js';
import preferBoxInlineStyle from './prefer-box-inline-style.js';
import preferBoxNoClassname from './prefer-box-no-disallowed.js';
import preferBoxAsTag from './prefer-box-as-tag.js';
import preferFlex from './prefer-flex.js';

module.exports = {
  rules: {
    'button-icon-restrictions': buttonIconRestrictions,
    'no-box-disallowed-props': noBoxDisallowedProps,
    'no-box-useless-props': noBoxUselessProps,
    'no-box-marginleft-marginright': noBoxMarginleftMarginright,
    'no-dangerous-style-duplicates': noDangerousStyleDuplicates,
    'no-medium-formfields': noMediumFormfields,
    'no-role-link-components': noRoleLinkComponents,
    'no-spread-props': noSpreadProps,
    'prefer-box-inline-style': preferBoxInlineStyle,
    'prefer-box-no-disallowed': preferBoxNoClassname,
    'prefer-box-as-tag': preferBoxAsTag,
    'prefer-flex': preferFlex,
  },
};
