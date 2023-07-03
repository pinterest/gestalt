// @flow strict
import getByPlatform from './getByPlatform.js';
import mockComponentList from './test-fixtures.js';

describe('getByPlatform', () => {
  it('filters for figma components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'figma' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('BoardRep');
  });

  it('filters for web components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'web' });
    expect(result).toHaveLength(4);
    const names = result.map((component) => component.name);
    const expectedNames = ['Avatar', 'Badge', 'Box', 'Datapoint'];
    expectedNames.forEach((name) => {
      expect(names).toContain(name);
    });
  });

  it('filters for ios components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'ios' });
    expect(result).toHaveLength(2);
    const names = result.map((component) => component.name);
    const expectedNames = ['Avatar', 'Badge'];
    expectedNames.forEach((name) => {
      expect(names).toContain(name);
    });
  });

  it('filters for android components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'android' });
    expect(result).toHaveLength(2);
    const names = result.map((component) => component.name);
    const expectedNames = ['Avatar', 'Badge'];
    expectedNames.forEach((name) => {
      expect(names).toContain(name);
    });
  });
});
