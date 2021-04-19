import { Stack } from 'gestalt';

export default function TestComp() {
  return (
    <div>
      <Stack>
        <div/>
      </Stack>

      <Stack gap={3}>
        <div/>
        <div/>
      </Stack>

      <Stack alignItems="end">
        <div/>
      </Stack>

      <Stack justifyContent="between">
        <div/>
      </Stack>
    </div>
  );
}
