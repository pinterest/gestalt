// @flow strict
import { type Node } from 'react';
import { Link, Box, Flex, Text, HelpButton } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import theme from './atomDark.js';
import ExampleCode from './ExampleCode.js';
import { useDocsConfig } from './contexts/DocsConfigProvider.js';

export default function DevelopmentEditor({ code }: {| code: ?string | (() => Node) |}): Node {
  const { showDevelopmentEditor } = useDocsConfig();

  const scope = { ...gestalt, DatePicker };

  const regex = /import (.|\n)*('gestalt'|'react');/gi;

  // Add more React API methods if needed
  const regexReact = /(Fragment|useState|useRef|useEffect)/gi;

  const codeFileCleaned = code
    ?.toString()
    .replace(regex, '')
    .replace('export default', '')
    .replace(regexReact, 'React.$&');

  if (!showDevelopmentEditor) return null;

  return (
    <Box
      color="default"
      rounding={2}
      dangerouslySetInlineStyle={{ __style: { border: 'thick solid green' } }}
      marginBottom={4}
      padding={2}
    >
      <Box padding={2}>
        <Flex gap={2}>
          <Text color="success" weight="bold">
            DEVELOPMENT PREVIEW
          </Text>
          <HelpButton
            accessibilityLabel=""
            accessibilityPopoverLabel="Expanded information about the development editor"
            text={
              <Text size="200">
                This development preview and code editor is only visible in deployed Netlify URLs
                and the development environment
                <br />
                <code>http://localhost:8888</code>. It feeds from JS files <br />
                <code>docs/examples/*/*.js</code>.
                <br />
                <br />
                In production, only the Sandpack preview and code editor are shown.
                <br />
                <br />
                To show the Sandpack preview during development, you can enable it on the site
                settings dropdown in the page header. To render you local changes in Sandpack append
                <br />
                <code>?localFiles=true</code>
                <br /> after the component name in the URL.{' '}
                <Link
                  display="inlineBlock"
                  accessibilityLabel="Learn more about the development editor"
                  href="/get_started/developers/contributing/development_process"
                >
                  Learn more
                </Link>
              </Text>
            }
          />
        </Flex>
      </Box>
      <LiveProvider code={codeFileCleaned} scope={scope} theme={theme}>
        <Box
          alignItems="center"
          borderStyle="sm"
          color="default"
          display="flex"
          height={362}
          justifyContent="center"
          padding={8}
          position="relative"
          rounding={2}
        >
          <LivePreview style={{ display: 'contents' }} />
        </Box>
        <ExampleCode code={codeFileCleaned ?? ''} name="DEVELOPMENT MODE" />

        <Box paddingX={2}>
          <Text color="error">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Box>
  );
}
