#!/usr/bin/env node

/* eslint-env node */
/* eslint no-console:0 */

const colors = [
  'blue',
  'dark-gray',
  'gray',
  'light-gray',
  'pine',
  'red',
  'olive',
  'white',
  'orange',
];

colors.forEach((color) => {
  console.log(
    `
/* ${color} */

.${color} {
  color: var(--${color});
}

.${color}-hover:hover {
  color: var(--${color});
}

.bg-${color} {
  background-color: var(--${color});
}

.bg-${color}-hover:hover {
  background-color: var(--${color});
}`,
  );
});
