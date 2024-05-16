import { Box, SelectList } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <SelectList
        helperText="Note that the family members aren't secondary!"
        id="selectlistexample15"
        label="Choose your favorite secondary character"
        onChange={() => {}}
        placeholder="Select a character"
        size="lg"
      >
        <SelectList.Group disabled label="Family">
          {['Bart', 'Lisa', 'Homer', 'Marge', 'Maggie'].map((name) => (
            <SelectList.Option key={name} label={name} value={name} />
          ))}
        </SelectList.Group>
        <SelectList.Group label="Neighbors">
          {['Ned', 'Maude', 'Rod', 'Todd'].map((name) => (
            <SelectList.Option key={name} label={name} value={name} />
          ))}
        </SelectList.Group>
        <SelectList.Group label="Cartoons">
          {['Itchy', 'Scratchy', 'Poochie'].map((name) => (
            <SelectList.Option key={name} label={name} value={name} />
          ))}
        </SelectList.Group>
      </SelectList>
    </Box>
  );
}
