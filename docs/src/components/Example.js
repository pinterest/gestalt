// @flow strict
import React from 'react';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import DatePicker from 'gestalt-datepicker';
import LZString from 'lz-string';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Card from './Card.js';
import theme from './atomDark.js';

type Props = {|
  defaultCode: string,
  description?: string,
  id?: string,
  name: string,
  direction?: 'row' | 'column',
|};

const { Box, Column, IconButton, Text, Tooltip } = gestalt;

const compress = object =>
  LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

const exportDefaultMaybe = ({ code }) =>
  code.startsWith('function') || code.startsWith('class')
    ? `export default ${code}`
    : `const Demo = () => (
  ${code}
);

export default Demo;`;

const dedupeArray = <T>(arr: Array<T>): Array<T> => [...new Set(arr)];

const handleCodeSandbox = async ({ code, title }) => {
  const gestaltComponents = Object.keys(gestalt);
  const additionalGestaltComponents = ['DatePicker'];

  const usedComponents = dedupeArray([
    ...(code.match(/<((\w+))/g) || []).map(component =>
      component.replace('<', '')
    ),
    ...(
      code.match(/(new FixedZIndex)|(new CompositeZIndex)/g) || []
    ).map(component => component.replace('new ', '')),
  ]);

  const baseComponents = gestaltComponents.filter(x =>
    usedComponents.includes(x)
  );

  const additionalComponents = additionalGestaltComponents.filter(x =>
    usedComponents.includes(x)
  );

  const getPackagedComponents = () => {
    const imports = [`import "../node_modules/gestalt/dist/gestalt.css"`];
    if (additionalComponents.includes('DatePicker')) {
      imports.push(
        'import "../node_modules/gestalt-datepicker/dist/gestalt-datepicker.css";',
        'import DatePicker from "gestalt-datepicker";'
      );
    }
    if (baseComponents.length > 0) {
      imports.push(`import { ${baseComponents.join(', ')} } from "gestalt";`);
    }

    return imports.join('\n');
  };

  const parameters = compress({
    module: '/example.js',
    files: {
      'package.json': {
        content: {
          title,
          // description: demoConfig.description
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            ...(baseComponents.length > 0 ? { gestalt: 'latest' } : {}),
            ...(additionalComponents.includes('DatePicker')
              ? { 'gestalt-datepicker': 'latest' }
              : {}),
          },
          devDependencies: {
            'react-scripts': 'latest',
          },
          main: 'index.js',
          scripts: {
            start: 'react-scripts start',
          },
        },
      },
      'index.js': {
        content: `import React from "react";
import { render } from "react-dom";
import Example from "./example";
render(<Example />, document.querySelector("#root"));`,
      },
      'example.js': {
        content: `import React from "react";
${getPackagedComponents()}

${exportDefaultMaybe({ code })}`,
      },
      'index.html': {
        content: `<body>
  <div id="root"></div>
</body>
`,
      },
    },
  });

  const formData = new FormData();
  formData.append('parameters', parameters);

  const url = await fetch(
    'https://codesandbox.io/api/v1/sandboxes/define?json=1',
    {
      method: 'post',
      body: formData,
      mode: 'cors',
    }
  )
    .then(response => response.json())
    .then(({ errors, sandbox_id: id }) => {
      if (errors) throw errors;
      return `https://codesandbox.io/s/${id}?module=/example.js`;
    });
  window.open(url);
};

const Example = ({
  defaultCode,
  description,
  id,
  name,
  direction = 'column',
}: Props) => {
  const code = defaultCode.trim();
  const scope = { ...gestalt, DatePicker };
  return (
    <Card
      name={name}
      description={description}
      id={id}
      stacked={direction === 'column'}
    >
      <LiveProvider code={code} scope={scope} theme={theme}>
        <Box
          display="flex"
          direction={direction}
          marginLeft={-2}
          marginRight={-2}
        >
          <Column span={direction === 'column' ? 12 : 6}>
            <Box
              paddingX={2}
              display="flex"
              direction="column"
              alignItems="stretch"
              height="100%"
            >
              <Box paddingY={2}>
                <Text size="md" color="gray">
                  Preview
                </Text>
              </Box>

              <Box flex="grow" position="relative">
                <Box
                  position="absolute"
                  left
                  width={4}
                  color="lightGray"
                  height="100%"
                />
                <Box position="relative" padding={4}>
                  <LivePreview />
                </Box>
              </Box>
            </Box>
          </Column>

          <Column span={direction === 'column' ? 12 : 6}>
            <Box paddingX={2}>
              <Box paddingY={2}>
                <Text size="md" color="gray">
                  Editor
                </Text>
              </Box>
              <Box position="relative" display="flex" color="darkGray">
                <Box flex="grow">
                  <LiveEditor padding={16} />
                </Box>
                <Box padding={2}>
                  <Tooltip inline text="Open in CodeSandbox">
                    <IconButton
                      dangerouslySetSvgPath={{
                        __path:
                          'M9.365 21.17v-8.645L1.93 8.248v4.928l3.405 1.974v3.705l4.029 2.314zm1.93.05l4.104-2.363v-3.794l3.427-1.986V8.211l-7.53 4.348v8.661zm6.54-14.666L13.878 4.26l-3.475 2.017L6.9 4.257 2.907 6.583l7.452 4.288 7.477-4.316zM0 18.017V6.04L10.377 0l10.38 6.015v11.983l-10.38 5.98L0 18.018z',
                      }}
                      accessibilityLabel="Open in CodeSandbox"
                      iconColor="white"
                      onClick={() => {
                        handleCodeSandbox({ code, title: name });
                      }}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Column>
        </Box>

        <Box padding={2}>
          <Text color="watermelon">
            <LiveError />
          </Text>
        </Box>
      </LiveProvider>
    </Card>
  );
};

export default Example;
