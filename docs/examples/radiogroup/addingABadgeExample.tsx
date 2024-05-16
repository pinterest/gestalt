import {ReactNode, useState} from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonBadgeExample() {
  const [option, setOption] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="badgeExample" legend="What badge would you like?">
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            badge={{ text: 'badge', type: 'success' }}
            checked={option === 'success'}
            id="success"
            label="I'd like a success badge"
            onChange={() => {
              setOption('success');
            }}
            value="success"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            badge={{ text: 'badge', type: 'info' }}
            checked={option === 'info'}
            id="info"
            label="I'd like a info badge"
            onChange={() => {
              setOption('info');
            }}
            value="info"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            badge={{ text: 'badge', type: 'warning' }}
            checked={option === 'warning'}
            id="warning"
            label="I'd like a warning badge"
            onChange={() => {
              setOption('warning');
            }}
            value="warning"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            badge={{ text: 'badge', type: 'neutral' }}
            checked={option === 'neutral'}
            id="neutral"
            label="I'd like a neutral badge"
            onChange={() => {
              setOption('neutral');
            }}
            value="neutral"
          />
        </Box>
      </RadioGroup>
    </Box>
  );
}
