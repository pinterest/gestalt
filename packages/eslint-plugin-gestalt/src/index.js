// @flow strict
/* eslint-disable import/no-import-module-exports */
import buttonIconRestrictions from './button-icon-restrictions.js';
import noBoxDangerousStyleDuplicates from './no-box-dangerous-style-duplicates.js';
import noBoxDisallowedProps from './no-box-disallowed-props.js';
import noBoxUselessProps from './no-box-useless-props.js';
import noBoxMarginleftMarginright from './no-box-marginleft-marginright.js';
import noMediumFormfields from './no-medium-formfields.js';
import noRoleLinkComponents from './no-role-link-components.js';
import noSpreadProps from './no-spread-props.js';
import noWorkflowStatusIcon from './no-workflow-status-icon.js';
import preferBoxInlineStyle from './prefer-box-inline-style.js';
import preferBoxNoClassname from './prefer-box-no-disallowed.js';
import preferBoxAsTag from './prefer-box-as-tag.js';
import preferFlex from './prefer-flex.js';
import preferHeading from './prefer-heading.js';
import preferLink from './prefer-link.js';

module.exports = {
  rules: {
    'button-icon-restrictions': buttonIconRestrictions,
    'no-box-disallowed-props': noBoxDisallowedProps,
    'no-box-useless-props': noBoxUselessProps,
    'no-box-marginleft-marginright': noBoxMarginleftMarginright,
    'no-box-dangerous-style-duplicates': noBoxDangerousStyleDuplicates,
    'no-medium-formfields': noMediumFormfields,
    'no-role-link-components': noRoleLinkComponents,
    'no-spread-props': noSpreadProps,
    'no-workflow-status-icon': noWorkflowStatusIcon,
    'prefer-box-inline-style': preferBoxInlineStyle,
    'prefer-box-no-disallowed': preferBoxNoClassname,
    'prefer-box-as-tag': preferBoxAsTag,
    'prefer-flex': preferFlex,
    'prefer-heading': preferHeading,
    'prefer-link': preferLink,
  },
};
/* eslint-enable import/no-import-module-exports */
