import { defineTest } from 'jscodeshift/dist/testUtils.js';

jest.mock('../avatar-update-sizes-remove-icon', () => Object.assign(jest.requireActual('../avatar-update-sizes-remove-icon'), {
    parser: 'flow',
  }));

describe('avatar-update-sizes-remove-icon', () => {
  [
    'avatar-update-sizes-remove-icon-avatar',
    'avatar-update-sizes-remove-icon-icon',
    'avatar-update-sizes-remove-icon-groupavatar',
  ].forEach((test) => {
    defineTest(__dirname, 'avatar-update-sizes-remove-icon', { quote: 'single' }, test);
  });
});
