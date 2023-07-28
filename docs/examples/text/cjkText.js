// @flow strict
import React, { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function cjkText(): Node {
  const languages = [
    {
      id: 'English',
      code: 'en',
      lang: 'Your account options and more',
    },
    {
      id: 'Chinese',
      code: 'zh',
      lang: '帐户和更多选项',
    },
    {
      id: 'Korean',
      code: 'ko',
      lang: '계정 및추 가옵션',
    },
  ];

  return (
    <Box
      padding={4}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      direction="column"
    >
      <Flex direction="row" gap={8}>
        <Flex gap={2} direction="column">
          <Box>
            <Text weight="bold">With Keep-All</Text>
          </Box>
          <Flex direction="column" gap={4}>
            {languages.map(({ id, lang, code }) => (
              <Box key={id}>
                <Box marginBottom={2}>
                  <Text size="200">{id}</Text>
                </Box>
                <div lang={code}>
                  <Box key={id} width={120} color="dark" rounding={2} padding={2}>
                    <Box width={24} color="dark">
                      <Text overflow="normal" size="200" color="inverse">
                        {lang}
                      </Text>
                    </Box>
                  </Box>
                </div>
              </Box>
            ))}
          </Flex>
        </Flex>

        <Flex gap={2} direction="column">
          <Box>
            <Text weight="bold">Without Keep-All</Text>
          </Box>
          <Flex direction="column" gap={4}>
            {languages.map(({ id, lang }) => (
              <Box key={id}>
                <Box marginBottom={2}>
                  <Text size="200">{id}</Text>
                </Box>
                <Box key={id} width={70} color="dark" rounding={2} padding={2}>
                  <Box width={24} color="dark">
                    <Text overflow="normal" size="200" color="inverse">
                      {lang}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
