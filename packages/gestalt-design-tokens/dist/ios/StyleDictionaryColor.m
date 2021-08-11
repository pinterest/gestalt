
//
// StyleDictionaryColor.m
//

// Do not edit directly
// Generated on Wed, 11 Aug 2021 18:49:09 GMT


#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:1.000f green:0.969f blue:0.969f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.922f blue:0.922f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.878f blue:0.878f alpha:1.000f],
[UIColor colorWithRed:0.988f green:0.733f blue:0.733f alpha:1.000f],
[UIColor colorWithRed:0.957f green:0.443f blue:0.443f alpha:1.000f],
[UIColor colorWithRed:0.922f green:0.259f blue:0.259f alpha:1.000f],
[UIColor colorWithRed:0.902f green:0.000f blue:0.137f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.714f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.608f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.502f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.400f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.973f blue:0.980f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.922f blue:0.945f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.875f blue:0.914f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.745f blue:0.824f alpha:1.000f],
[UIColor colorWithRed:0.996f green:0.557f blue:0.694f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.396f blue:0.576f alpha:1.000f],
[UIColor colorWithRed:0.933f green:0.216f blue:0.416f alpha:1.000f],
[UIColor colorWithRed:0.871f green:0.173f blue:0.384f alpha:1.000f],
[UIColor colorWithRed:0.765f green:0.098f blue:0.322f alpha:1.000f],
[UIColor colorWithRed:0.639f green:0.047f blue:0.290f alpha:1.000f],
[UIColor colorWithRed:0.510f green:0.020f blue:0.243f alpha:1.000f],
[UIColor colorWithRed:0.388f green:0.008f blue:0.200f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.984f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.902f green:0.957f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.843f green:0.929f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.671f green:0.859f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.459f green:0.749f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.271f green:0.639f blue:0.996f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.486f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.455f blue:0.910f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.373f blue:0.796f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.294f blue:0.663f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.235f blue:0.588f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.161f blue:0.400f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.878f blue:0.878f alpha:1.000f],
[UIColor colorWithRed:0.800f green:0.000f blue:0.000f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
