// @flow strict
import { type Node } from 'react';
import { Link, Box, Flex, Text, HelpButton } from 'gestalt';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace
import { LiveProvider, LiveError, LivePreview } from 'react-live';
import { useAppContext } from './appContext.js';
import theme from './atomDark.js';
import ExampleCode from './ExampleCode.js';

const reactImports = [
  'Children',
  'Fragment',
  'PureComponent',
  'Profiler',
  'StrictMode',
  'Suspense',
  'cloneElement',
  'createContext',
  'createElement',
  'createFactory',
  'createRef',
  'forwardRef',
  'isValidElement',
  'lazy',
  'memo',
  'startTransition',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useEffect',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
  'version',
];

const reactRegex = new RegExp(`(${reactImports.join('|')})`, 'g');

const importsToRemove = ['gestalt', 'gestalt-datepicker', 'react'];

const importsToRemoveRegex = new RegExp(
  `import (.|\n)*(${importsToRemove.map((item) => `'${item}'`).join('|')});`,
  'g',
);

export default function DevelopmentEditor({ code }: {| code: ?string | (() => Node) |}): Node {
  const { devExampleMode } = useAppContext();

  if (devExampleMode === 'default') {
    return null;
  }

  const scope = { ...gestalt, ...gestaltDatepicker };

  const codeFileCleaned = code
    ?.toString()
    // Remove imports
    .replace(importsToRemoveRegex, '')
    // Remove export statement
    .replace('export default', '')
    // Add React. to React imports
    .replace(reactRegex, 'React.$&')
    .replace(
      'const [showComponent, setShowComponent] = React.useState(true);',
      'const [showComponent, setShowComponent] = React.useState(false);',
    );

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
                In production, the default view is enabled. If available, only the Sandpack preview
                and code editor are shown.
                <br />
                <br />
                To enable/disable the development preview, you can enable it on the site settings
                dropdown in the page header. If the default preview is enabled and you want to
                render your local changes in Sandpack append
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
        <ExampleCode code={codeFileCleaned ?? ''} name="DEVELOPMENT MODE" developmentEditor />

        <Box paddingX={2}>
          <Text color="error">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Box>
  );
}
