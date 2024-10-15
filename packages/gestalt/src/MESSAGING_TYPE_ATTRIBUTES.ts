import { ComponentProps } from 'react';
import Box from './Box';
import Icon from './Icon';

const MESSAGING_ATTRIBUTES: {
  [status: string]: {
    icon?: ComponentProps<typeof Icon>['icon'];
    iconColor?: ComponentProps<typeof Icon>['color'];
    color?: string;
    backgroundColor?: ComponentProps<typeof Box>['color'];
  };
} = Object.freeze({
  neutral: {
    backgroundColor: 'secondary',
  },
  default: {
    icon: 'pinterest',
    iconColor: 'default',
    color: 'white',
    backgroundColor: 'default',
  },
  success: {
    icon: 'check-circle',
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
  recommendation: {
    icon: 'sparkle',
    iconColor: 'recommendation',
    color: 'recommendationBase',
    backgroundColor: 'recommendationWeak',
  },
});

export default MESSAGING_ATTRIBUTES;
