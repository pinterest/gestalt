import { Flex, IconCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconCompact
        accessibilityLabel="Add new Pins"
        dangerouslySetSvgPath={{
          __path:
            'M9.41 1.41a1.41 1.41 0 0 0-2.82 0V6.6H1.4a1.41 1.41 0 1 0 0 2.82h5.2v5.18a1.41 1.41 0 1 0 2.82 0V9.4h5.18a1.41 1.41 0 1 0 0-2.82H9.4z',
        }}
      />
    </Flex>
  );
}
