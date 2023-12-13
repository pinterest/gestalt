// @flow strict
/* eslint-disable import/no-import-module-exports */
import buttonIconRestrictions from './button-icon-restrictions';
import noBoxDangerousStyleDuplicates from './no-box-dangerous-style-duplicates';
import noBoxDisallowedProps from './no-box-disallowed-props';
import noBoxMarginleftMarginright from './no-box-marginleft-marginright';
import noBoxUselessProps from './no-box-useless-props';
import noMediumFormfields from './no-medium-formfields';
import noRoleLinkComponents from './no-role-link-components';
import noSpreadProps from './no-spread-props';
import noWorkflowStatusIcon from './no-workflow-status-icon';
import preferBoxAsTag from './prefer-box-as-tag';
import preferBoxInlineStyle from './prefer-box-inline-style';
import preferBoxNoClassname from './prefer-box-no-disallowed';
import preferFlex from './prefer-flex';
import preferHeading from './prefer-heading';
import preferLink from './prefer-link';
import preferList from './prefer-list';

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
    'prefer-list': preferList,
  },
};
/* eslint-enable import/no-import-module-exports */
