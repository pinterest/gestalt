# How to create or convert Sandpack examples

1. Create a new folder within this folder (/examples), matching the file name for the relevant page.

1. Create a new file for each code example, using a descriptive name.
*Note: We usually use `main.js` for the top-level example on a component page.*

1. Build your example, or copy-paste the code from the existing example. You'll probably need to wrap the output in `<Flex alignItems="center" justifyContent="center" height="100%" width="100%">` to center it within the Sandpack view.
*Note: be sure to add the `// @flow strict` annotation at the top of your file. Don't import `React`, but only what you need specifically. You'll probably want to use `React$Node` as the return type for your function component, otherwise you will see `import {} from 'react';` if there are no other React imports.*

1. Import your example into the relevant docs page file, then replace the existing example (or add your new example) using the SandpackExample component. *Note: Don't forget to set the `previewHeight` if necessary. Be sure to set `hideEditor` for the top-level example on a component page and for Best Practices Examples. "Don't" Best Practices examples should also include `hideControls`.*
