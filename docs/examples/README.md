# How to create or convert Sandpack examples

1. Create a new folder within this folder (/examples), matching the file name for the relevant page.

1. Create a new file for each code example, using a descriptive name.
   _Note: We usually use `main.tsx` for the top-level example on a component page._

1. Build your example, or copy-paste the code from the existing example. You'll probably need to wrap the output in `<Flex alignItems="center" justifyContent="center" height="100%" width="100%">` to center it within the Sandpack view.
   \_Note: Don't import `React`, but only what you need specifically.

1. Import your example into the relevant docs page file, then replace the existing example (or add your new example) using the SandpackExample component. _Note: Don't forget to set the `previewHeight` if necessary. Be sure to set `hideEditor` for the top-level example on a component page and for Best Practices Examples. "Don't" Best Practices examples should also include `hideControls`._
