// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, Label, Link, NumberField, Text, TextField } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex direction="column" width="70%" gap={{ column: 3, row: 0 }}>
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-email-2">Email</Label>
          </Box>
          <TextField
            placeholder="Email"
            id="example-email-2"
            onChange={() => {}}
            type="email"
            value=""
          />
        </Flex.Item>
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-password-2">Password</Label>
          </Box>
          <TextField
            placeholder="Create password"
            id="example-password-2"
            onChange={() => {}}
            type="password"
            value=""
          />
        </Flex.Item>
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-age-2">Age</Label>
          </Box>
          <NumberField placeholder="Age" id="example-age-2" onChange={() => {}} />
        </Flex.Item>
        <Button fullWidth text="Create account" size="md" color="red" />
        <Button fullWidth text="Log into existing account" size="md" type="submit" />
        <Text size="100" align="center">
          By continuing, you agree to Pinterest&lsquo;s{' '}
          <Text size="100" inline weight="bold">
            <Link href="https://www.pinterest.com" display="inline">
              Business Terms of Service
            </Link>
          </Text>{' '}
          and acknowledge you&lsquo;ve read our{' '}
          <Text size="100" inline weight="bold">
            <Link href="https://www.pinterest.com" display="inline">
              Privacy Policy
            </Link>
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
