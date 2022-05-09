// @flow strict

export const MESSAGING_TYPE_ATTRIBUTES = Object.freeze({
  neutral: {
    backgroundColor: 'secondary',
  },
  success: {
    icon: 'info-circle',
    iconColor: 'success',
    color: 'successBase',
    backgroundColor: 'successWeak',
  },
  info: {
    icon: 'info-circle',
    iconColor: 'info',
    color: 'infoBase',
    backgroundColor: 'infoWeak',
  },
  warning: {
    icon: 'workflow-status-warning',
    iconColor: 'warning',
    color: 'warningBase',
    backgroundColor: 'warningWeak',
  },
  error: {
    icon: 'workflow-status-problem',
    iconColor: 'error',
    color: 'errorBase',
    backgroundColor: 'errorWeak',
  },
});

export {};
