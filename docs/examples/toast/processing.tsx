import { Flex, Toast } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2741 - Property 'dismissButton' is missing in type '{ text: string; type: "progress"; }' but required in type 'ToastProps'. */}
      <Toast text="Updating" type="progress" />
    </Flex>
  );
}
