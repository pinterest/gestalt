// @flow strict
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import LZString from 'lz-string';

const compress = (object) =>
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

const dedupeArray = <T>(arr: $ReadOnlyArray<T>): $ReadOnlyArray<T> => [...new Set(arr)];

const handleCodeSandbox = async ({ code, title }: {| code: string, title: string |}) => {
  const gestaltComponents = Object.keys(gestalt);
  const additionalGestaltComponents = ['DatePicker'];

  const usedComponents = dedupeArray([
    ...(code.match(/<((\w+))/g) || []).map((component) => component.replace('<', '')),
    ...(code.match(/(new FixedZIndex)|(new CompositeZIndex)/g) || []).map((component) =>
      component.replace('new ', ''),
    ),
  ]);

  const baseComponents = gestaltComponents.filter((x) => usedComponents.includes(x));

  const additionalComponents = additionalGestaltComponents.filter((x) =>
    usedComponents.includes(x),
  );

  const getPackagedComponents = () => {
    const imports = [`import "../node_modules/gestalt/dist/gestalt.css"`];
    if (additionalComponents.includes('DatePicker')) {
      imports.push(
        'import "../node_modules/gestalt-datepicker/dist/gestalt-datepicker.css";',
        'import DatePicker from "gestalt-datepicker";',
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
            // $FlowIssue[exponential-spread]
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
import { createRoot } from "react-dom/client";
import Example from "./example";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<Example />);`,
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

  const url = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'post',
    body: formData,
    mode: 'cors',
  })
    .then((response) => response.json())
    .then(({ errors, sandbox_id: id }) => {
      if (errors) throw errors;
      return `https://codesandbox.io/s/${id}?module=/example.js`;
    });
  window.open(url);
};

export default handleCodeSandbox;
