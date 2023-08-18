// @flow strict
import LZString from 'lz-string';
import * as gestalt from 'gestalt'; // eslint-disable-line import/no-namespace
import * as gestaltChart from 'gestalt-charts'; // eslint-disable-line import/no-namespace
import * as gestaltDatepicker from 'gestalt-datepicker'; // eslint-disable-line import/no-namespace

const compress = (object: {|
  files: {|
    'example.js': {| content: string |},
    'index.html': {| content: string |},
    'index.js': {| content: string |},
    'package.json': {|
      content: {|
        dependencies: {|
          gestalt: string,
          'gestalt-charts': string,
          'gestalt-datepicker': string,
          react: string,
          'react-dom': string,
        |},
        devDependencies: {| 'react-scripts': string |},
        main: string,
        scripts: {| start: string |},
        title: string,
      |},
    |},
  |},
  module: string,
|}) =>
  LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='

const exportDefaultMaybe = ({ code }: {| code: string |}) =>
  code.trimStart().startsWith('function') || code.startsWith('class')
    ? `export default ${code}`
    : `const Demo = () => (
${code}
);
export default Demo;`;

const dedupeArray = <T>(arr: $ReadOnlyArray<T>): $ReadOnlyArray<T> => [...new Set(arr)];

const handleCodeSandbox = async ({ code, title }: {| code: string, title: string |}) => {
  const gestaltComponents = Object.keys(gestalt);
  const gestaltChartComponents = Object.keys(gestaltChart);
  const gestaltDatepickerComponents = Object.keys(gestaltDatepicker);

  const usedComponents = dedupeArray([
    ...(code.match(/<((\w+))/g) || []).map((component) => component.replace('<', '')),
    ...(code.match(/(new FixedZIndex)|(new CompositeZIndex)/g) || []).map((component) =>
      component.replace('new ', ''),
    ),
  ]);

  const baseGestaltComponents = gestaltComponents.filter((x) => usedComponents.includes(x));

  const baseGestaltChartComponents = gestaltChartComponents.filter((x) =>
    usedComponents.includes(x),
  );

  const baseGestaltDatePickerComponents = gestaltDatepickerComponents.filter((x) =>
    usedComponents.includes(x),
  );

  const getPackagedComponents = () => {
    const imports = [`import "../node_modules/gestalt/dist/gestalt.css"`];
    if (baseGestaltDatePickerComponents.length > 0) {
      imports.push('import "../node_modules/gestalt-datepicker/dist/gestalt-datepicker.css";');
      imports.push(`import { ${baseGestaltChartComponents.join(', ')} } from "gestalt-charts";`);
      imports.push(
        `import { ${baseGestaltDatePickerComponents.join(', ')} } from "gestalt-datepicker";`,
      );
    }
    if (baseGestaltComponents.length > 0) {
      imports.push(`import { ${baseGestaltComponents.join(', ')} } from "gestalt";`);
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
            gestalt: 'latest',
            'gestalt-charts': 'latest',
            'gestalt-datepicker': 'latest',
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
