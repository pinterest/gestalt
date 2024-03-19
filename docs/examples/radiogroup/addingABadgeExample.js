// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, RadioGroup } from 'gestalt';

export default function RadioButtonBadgeExample(): ReactNode {
  const [option, setOption] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="What badge would you like?" id="badgeExample">
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            id="success"
            checked={option === 'success'}
            label="I'd like a success badge"
            badge={{ text: 'badge', type: 'success' }}
            onChange={() => {
              setOption('success');
            }}
            value="success"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            id="info"
            checked={option === 'info'}
            label="I'd like a info badge"
            badge={{ text: 'badge', type: 'info' }}
            onChange={() => {
              setOption('info');
            }}
            value="info"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            id="warning"
            checked={option === 'warning'}
            label="I'd like a warning badge"
            badge={{ text: 'badge', type: 'warning' }}
            onChange={() => {
              setOption('warning');
            }}
            value="warning"
          />
        </Box>
        <Box display="inlineBlock">
          <RadioGroup.RadioButton
            id="neutral"
            checked={option === 'neutral'}
            label="I'd like a neutral badge"
            badge={{ text: 'badge', type: 'neutral' }}
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
