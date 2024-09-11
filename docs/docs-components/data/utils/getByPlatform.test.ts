import getByPlatform from './getByPlatform';
import mockComponentList from './test-fixtures';

describe('getByPlatform', () => {
  it('filters for figma components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'figma' });
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual('BoardRep');
  });

  it('filters for web components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'web' });
    expect(result).toHaveLength(4);
    const names = result.map((component: any) => component.name);
    const expectedNames = ['Avatar', 'Badge', 'Box', 'Datapoint'];
    expectedNames.forEach((name: any) => {
      expect(names).toContain(name);
    });
  });

  it('filters for ios components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'ios' });
    expect(result).toHaveLength(2);
    const names = result.map((component: any) => component.name);
    const expectedNames = ['Avatar', 'Badge'];
    expectedNames.forEach((name: any) => {
      expect(names).toContain(name);
    });
  });

  it('filters for android components', () => {
    const result = getByPlatform(mockComponentList, { platform: 'android' });
    expect(result).toHaveLength(2);
    const names = result.map((component: any) => component.name);
    const expectedNames = ['Avatar', 'Badge'];
    expectedNames.forEach((name: any) => {
      expect(names).toContain(name);
    });
  });
});
