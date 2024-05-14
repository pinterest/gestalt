import { Box, Button, Flex, Label, Link, NumberField, Text, TextField } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="column" gap={{ column: 3, row: 0 }} width="70%">
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-email-2">Email</Label>
          </Box>
          <TextField
            id="example-email-2"
            onChange={() => {}}
            placeholder="Email"
            type="email"
            value=""
          />
        </Flex.Item>
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-password-2">Password</Label>
          </Box>
          <TextField
            id="example-password-2"
            onChange={() => {}}
            placeholder="Create password"
            type="password"
            value=""
          />
        </Flex.Item>
        <Flex.Item>
          <Box display="visuallyHidden">
            <Label htmlFor="example-age-2">Age</Label>
          </Box>
          <NumberField id="example-age-2" onChange={() => {}} placeholder="Age" />
        </Flex.Item>
        <Button color="red" fullWidth size="md" text="Create account" />
        <Button fullWidth size="md" text="Log into existing account" type="submit" />
        <Text align="center" size="100">
          By continuing, you agree to Pinterest&lsquo;s{' '}
          <Text inline size="100" weight="bold">
            <Link display="inline" href="https://www.pinterest.com">
              Business Terms of Service
            </Link>
          </Text>{' '}
          and acknowledge you&lsquo;ve read our{' '}
          <Text inline size="100" weight="bold">
            <Link display="inline" href="https://www.pinterest.com">
              Privacy Policy
            </Link>
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
