
//
// StyleDictionaryColor.h
//

// Do not edit directly
// Generated on Wed, 11 Aug 2021 18:49:09 GMT


#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorPushpinRed0,
ColorPushpinRed50,
ColorPushpinRed100,
ColorPushpinRed200,
ColorPushpinRed300,
ColorPushpinRed400,
ColorPushpinRed450,
ColorPushpinRed500,
ColorPushpinRed600,
ColorPushpinRed700,
ColorPushpinRed800,
ColorPushpinRed900,
ColorFlaminglowPink0,
ColorFlaminglowPink50,
ColorFlaminglowPink100,
ColorFlaminglowPink200,
ColorFlaminglowPink300,
ColorFlaminglowPink400,
ColorFlaminglowPink450,
ColorFlaminglowPink500,
ColorFlaminglowPink600,
ColorFlaminglowPink700,
ColorFlaminglowPink800,
ColorFlaminglowPink900,
ColorSkycicleBlue0,
ColorSkycicleBlue50,
ColorSkycicleBlue100,
ColorSkycicleBlue200,
ColorSkycicleBlue300,
ColorSkycicleBlue400,
ColorSkycicleBlue450,
ColorSkycicleBlue500,
ColorSkycicleBlue600,
ColorSkycicleBlue700,
ColorSkycicleBlue800,
ColorSkycicleBlue900,
ColorFontBase,
ColorFontSecondary
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
