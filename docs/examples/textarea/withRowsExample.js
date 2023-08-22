// @flow strict
import { type Node, useState } from "react";
import { Flex, Box, NumberField, TextArea } from "gestalt";

export default function Example(props) {

const [value, setValue] = useState('');
const [rows, setRows] = useState(2);

return (
  <Box
    padding={8}
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"><Flex direction="column" width="100%" gap={4}>
      <Box width={120}>
        <NumberField id='numberfield_rows' label="Number of Rows" onChange={({value})=>{setRows(value)}} value={rows}/>
      </Box>
      <TextArea
        label="Rows example"
        onChange={({value})=>{setValue(value)}}
        placeholder={"this text area has " + rows + " rows"}
        value={value}
        rows={rows}
      />
    </Flex></Box>
);
}
