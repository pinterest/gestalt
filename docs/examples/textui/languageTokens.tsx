import { useState } from 'react';
import { Box, ColorSchemeProvider, DesignTokensProvider, Flex, SelectList, TextUI } from 'gestalt';

export default function Example() {
  const [language, setLanguage] = useState<'default' | 'tall' | 'ck' | 'ja' | 'th' | 'vi'>(
    'default',
  );

  const content = Object.freeze({
    default:
      'Lorem ipsum dolor sit amet, vis legimus appetere sententiae ex, est habeo erant noluisse ex. Ad sit enim vitae concludaturque, id diam aperiam explicari has.',
    tall: 'अंतर्गत निर्माण क्षमता। विभाग लोगो तकनिकल प्रव्रुति प्रतिबध्दता अपने चुनने साधन आधुनिक स्वतंत्र संसाध पुस्तक व्याख्या सेऔर भाषाओ मानसिक सोफ़्टवेर जिसे लक्षण सादगि केवल सुचनाचलचित्र विकेन्द्रियकरण',
    ck: '法大感康催今間郎済分暮測。会転大籍法必辞住利業済表者加社。見競回画訴藤投冠阪暮止逮使際女審。堅種術天可毎帰画級見田頭豊世建抽座総目功。作温霊住再提略投際界利浜東着送容方権六。阪千割断待伴民腺結道員賀荷知外森若免教',
    ja: '尾ノホタクスフ名津以樹ふなり夜巣区ヨクエヨイ個尾御すんちゆゅときよりせけ離根巣遊野名離他都二露二鵜ひへせと、毛以く派雲ろ絵ほまり列知津絵日日区目魔阿御ろんさゆ等他',
    vi: 'Lorem Ipsum chỉ đơn giản là một đoạn văn bản giả, được dùng vào việc trình bày và dàn trang phục vụ cho in ấn. Lorem Ipsum đã được sử dụng như một văn bản chuẩn cho ngành công nghiệp in ấn từ những năm ',
    th: 'Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่',
  });

  return (
    <Box height="100%" padding={8} width="100%">
      <Flex direction="column" gap={4} width="100%">
        <SelectList
          id="selectlistMain"
          label="line height type"
          onChange={({ value }) => {
            if (
              value === 'default' ||
              value === 'ja' ||
              value === 'tall' ||
              value === 'ck' ||
              value === 'th' ||
              value === 'vi'
            ) {
              setLanguage(value);
            }
          }}
        >
          {[
            { label: 'default', value: 'default' },
            { label: 'tall', value: 'tall' },
            { label: 'ck', value: 'ck' },
            { label: 'ja', value: 'ja' },
            { label: 'vi', value: 'vi' },
            { label: 'th', value: 'th' },
          ].map(({ label, value }) => (
            <SelectList.Option key={label} label={label} value={value} />
          ))}
        </SelectList>
        <ColorSchemeProvider colorScheme="light">
          <DesignTokensProvider id="localizationLanaguage" languageMode={language}>
            <Flex direction="column" gap={1}>
              <TextUI size="xs">{content[language]}</TextUI>
              <TextUI size="sm">{content[language]}</TextUI>
              <TextUI size="md">{content[language]}</TextUI>
              <TextUI size="lg">{content[language]}</TextUI>
            </Flex>
          </DesignTokensProvider>
        </ColorSchemeProvider>
      </Flex>
    </Box>
  );
}
