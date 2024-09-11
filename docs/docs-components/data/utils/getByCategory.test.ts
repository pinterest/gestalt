import getByCategory from './getByCategory';
import mockComponentList from './test-fixtures';

describe('getByCategory', () => {
  it('filters for Avatars on web', () => {
    const result = getByCategory(mockComponentList, { category: 'Avatars', platform: 'web' });
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual('Avatar');
  });

  it('filters for Indicators on Android', () => {
    const result = getByCategory(mockComponentList, {
      category: 'Indicators',
      platform: 'android',
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toEqual('Badge');
  });

  it('filters for Indicators on web', () => {
    const result = getByCategory(mockComponentList, { category: 'Indicators', platform: 'web' });
    expect(result).toHaveLength(2);
    const componentNames = result.map((component: any) => component.name);
    const expectedNames = ['Badge', 'Datapoint'];
    expectedNames.forEach((name: any) => {
      expect(componentNames).toContain(name);
    });
  });
});
