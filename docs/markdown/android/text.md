---
title: Text
description: Text component is used for all representations of text on a surface. Text is based on [Android Typography guidelines](https://m3.material.io/styles/typography/overview).
fullwidth: true
---

<ImgContainer src="https://i.pinimg.com/originals/71/a8/cb/71a8cb0c841d643e5e1eed390800310a.png" alt="Text as it appears in our Pinner profile header." noPadding/>

## Usage guidelines

<TwoCol>
<Group>
<Do title="When to use"/>
- For representing text as labels in UI controls such as buttons and menus
- When text is needed for any written content

</Group>
<Group>
<Dont title="When not to use" />
- When spacing is lacking and an icon or other graphic can be a recognizable substitute for text
</Group>
</TwoCol>

## Best practices
### Headings and titles
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/03/c9/de/03c9dee6dbbf40297f9337d2fc180dc1.png" alt="Two blocks of text with headings used to separate and group them." noPadding/>
    <Do title="Do" />
    Use to help group text and items in a logical order.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/66/91/22/66912208795b5687e53fb92706c2c348.png" alt="Block of text that uses a large heading to emphasize part of the text." noPadding/>
    <Dont title="Don't" />
    Use to emphasize text that you want users to read. Instead, use bold body text or another UI element like a banner or popover.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/44/d2/6f/44d26f0c25d8e19c9b55f9f3fffe6869.png" alt="A block of text with a short, one-line heading." noPadding/>
    <Do title="Do" />
    Keep headings and titles short and glanceable.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/b1/e4/20/b1e42010593ee22c2e257a53d6f73435.png" alt="A very long heading announcing the start time of an event, but it's truncated, so you can't see the start time." noPadding/>
    <Dont title="Don't" />
    Use overly long headings. If headings are dynamically generated (like a 3rd party app name), truncation will work after 2 lines, but be mindful of unintended changes in meaning.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/6e/89/4a/6e894ad813a2ab2171d9f5453a58aff6.png" alt="A heading that says 'Get a cover image that delivers'." noPadding/>
    <Do title="Do" />
    Clearly describe the section a heading refers to.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/e2/72/8d/e2728d5bbc1a03b5717cd46ec7fb3301.png" alt="A heading that says 'Get it!' and is not clear about what that means." noPadding/>
    <Dont title="Don't" />
    Use vague language that doesn’t describe the section that a heading refers to.
  </Group>
</TwoCol>

### Body and labels
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/be/c3/9f/bec39f899e3e9026c7e7bbd8bfc4b924.png" alt="A block of text with a line emphasized in a bold weight." noPadding/>
    <Do title="Do" />
    Emphasize text inside of paragraphs by using a **bold weight**.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/2f/a1/a3/2fa1a3d1d4594b52f7108d3c1b12ab62.png" alt="A block of text using an underlined style to emphasize a line of text." noPadding/>
    <Dont title="Don't" noPadding/>
    Emphasize text inside of paragraphs by underlining it; this can be confused with an interactive link or a button.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/6d/1c/fd/6d1cfdcc4a9f717c7fc773d27c67e008.png" alt="A block of text with nimimal styling." noPadding/>
    <Do title="Do" />
    Use a minimal amount of sizes and styles to keep the UI clean and readable.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/1f/df/f9/1fdff95f77c652e90cce7bd5e369c073.png" alt="A block of text with some bold text, some text in color, some left-aligned and some center-aligned." noPadding/>
    <Dont title="Don't" />
    Mix styles and alignment, as this can be hard to read and follow.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/c8/a3/38/c8a338b3b878d0485115672041dda3ca.png" alt="A long paragraph that is left-aligned." noPadding/>
    <Do title="Do" />
    Start-align paragraph text.
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/44/5b/38/445b38d3975187fa486f5534e9912485.png" alt="A long paragraph that is center-aligned." noPadding/>
    <Dont title="Don't" />
    Center-align or end-align paragraph text. This is hard to read, especially for users with dyslexia.
  </Group>
</TwoCol>

## Accessibility

### Minimum text size

A minimum text size of 16sp is recommended for readability, especially for longer blocks of text. Some short text labels or secondary text can go lower than that, but smaller sizes should be kept to a minimum. Making text brief will also help with readability.

### Color

For low-vision users, text color contrast is very important. To ensure accessible contrast, stick to our [standard text colors](https://gestalt.pinterest.systems/foundations/color/usage#Standard-text-colors). For design considerations and handy accessibility tools for checking color contrast, see our [accessibility page](https://gestalt.pinterest.systems/foundations/accessibility).

### Logical order

Label headings and titles as such, so that people who use screen readers (Android) can understand the flow of information.

### Native features
People use Android’s accessibility features to adjust their font size system-wide. To enable system font size in an Android app, mark text and their associated containers to be measured in scalable pixels (sp). See Android’s accessibility documentation for more information:

[Accessible design on Android](https://m2.material.io/design/usability/accessibility.html#understanding-accessibility)
[Accessible development on Android](https://developer.android.com/guide/topics/ui/accessibility)


## Design tokens

Use these tokens for applying size, weight and color styles to Text.

<br/>

<iframe style={{border:0}} width="100%" height="939" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20042%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Variants

### Headings
Used for surface titles and section headings
<br/>

<iframe style={{border:0}} width="100%" height="417" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20235%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

### Body

Used for text that is part of paragraphs or UI controls
<br/>

<iframe style={{border:0}} width="100%" height="417" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20276%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Size

These font sizes follow those available through our [Typography scale](https://gestalt.pinterest.systems/foundations/typography/guidelines#Scale)
<br/>

<iframe style={{border:0}} width="100%" height="776" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20317%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Weight
For emphasizing text in body copy and in sizes below 16sp and below, use `bold`. For titles and headings, use `semibold`.
<br/>

<iframe style={{border:0}} width="100%" height="411" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20481%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Alignment

Text can either be start, center or end aligned. Text can be forced to left or right align when aligning integers in tables.
<br/>

<iframe style={{border:0}} width="100%" height="397" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20507%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Colors

You can specify which color you want for your text. Most colors automatically change between light and dark modes, but the `light` and `dark` properties are available when light or dark colors are specifically desired. An example is using the dark mode error color on a dark background in light mode.
<br/>

<iframe style={{border:0}} width="100%" height="750" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20538%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Styles

Text can be italicized for emphasis, or underlined to denote a link.
<br/>

<iframe style={{border:0}} width="100%" height="270" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FREw1COFYAktmVWrUBh3Ov8%2FGestalt-for-Android%3Fnode-id%3D11171%253A20606%26t%3D852gzGIkINao5ZEY-1" allowFullScreen></iframe>

## Overflow and truncation

For general guidelines around text truncation, see [Typography Best practices](https://gestalt.pinterest.systems/foundations/typography/guidelines#Best-practices)

## Writing

<TwoCol>
<Group>
<Do title="Do" />
- Keep text in UI short and clear
- Use **Sentence** case for all text that isn’t a brand name or proper noun
</Group>
 <Group>
<Dont title="Don't" />
- Use long text labels that could end up truncating or causing space issues when translating to other languages
- Use Title Case or ALL CAPS in UI labels
- Use ALL CAPS for paragraph text unless referring to a product or other entity that uses that style
- Punctuate headings unless they are posing a question or making an exclamation
</Group>
</TwoCol>

## Localization

Keep text simple and short to avoid truncation or line-wrapping in UI controls like buttons when translating languages that require more characters. Avoid overriding our line-height settings, as this can result in text clipping for scripts, like Hindi, that have taller ascenders and descenders.

### Right-to-left (RTL) alignment

When translated to languages that read from right to left, ensure that paragraph text is aligned based on language, not on context. For example, if the UI is reversed for an RTL language like Arabic, but there is a block of text in an LTR language such as English, left-align the paragraph in English.

<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/5d/f3/fa/5df3faf738081067c30d7887cf788ebb.png" alt="A paragraph in Hebrew that is right-aligned, followed by a paragraph in English that is left-aligned." />
    <Do title="Do" />
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/3b/1b/28/3b1b28e13386e248272d9189ac9b7c9f.png" alt="Paragraphs in Hebrew and English with the same alignment." noPadding/>
    <Dont title="Don't" />
  </Group>
</TwoCol>


However, for lists or items in a menu, maintain the alignment of the UI.
<TwoCol>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/36/f5/b9/36f5b96eb5d5c8101dfbfbc95c33c820.png" alt="A menu in Arabic and English with all of the items end-aligned." noPadding color="background-secondary-base" />
    <Do title="Do" />
  </Group>
  <Group>
    <ImgContainer src="https://i.pinimg.com/originals/63/4a/18/634a18c300a82e471fdffeadb52d58f9.png" alt="A menu with two Arabic items rignt-aligned and one English item left-aligned." noPadding color="background-secondary-base"/>
    <Dont title="Don't" />
  </Group>
  </TwoCol>

### Text-wrapping and hyphenation

Hyphenation on Android is turned off by default to avoid incorrect word breaks when strings of text wrap to the next line. This is especially helpful for international languages where an incorrect word break can greatly change the meaning of a word or sentence.

## Related

**[Typography guidelines](https://gestalt.pinterest.systems/foundations/typography/guidelines)**

A run-down of our typographic foundations across platforms
