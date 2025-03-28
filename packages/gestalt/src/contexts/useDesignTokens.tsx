// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-duplicates */
import classicDark from 'gestalt-design-tokens/dist/json/classic/variables-dark.json';
import classicLight from 'gestalt-design-tokens/dist/json/classic/variables-light.json';
import vrDark from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-dark.json';
import calico01Dark from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-dark.json';
import vrCk from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ck.json';
import calico01Ck from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ck.json';
import vrDefault from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-default.json';
import calico01Default from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-default.json';
import vrJa from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ja.json';
import calico01Ja from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-ja.json';
import vrTall from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-tall.json';
import calico01Tall from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-tall.json';
import vrTh from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-th.json';
import calico01Th from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-th.json';
import vrVi from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-vi.json';
import calico01Vi from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-font-lineheight-vi.json';
import vrLight from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-light.json';
import calico01Light from 'gestalt-design-tokens/dist/json/vr-theme-web-mapping/variables-light.json';
import useInExperiment from '../useInExperiment';

const themes = {
  classic: { name: 'classic', light: classicLight, dark: classicDark },
  visualrefresh: {
    name: 'visualrefresh',
    light: vrLight,
    dark: vrDark,
    default: vrDefault,
    tall: vrTall,
    ck: vrCk,
    ja: vrJa,
    th: vrTh,
    vi: vrVi,
  },
  calico01: {
    name: 'calico01',
    light: calico01Light,
    dark: calico01Dark,
    default: calico01Default,
    tall: calico01Tall,
    ck: calico01Ck,
    ja: calico01Ja,
    th: calico01Th,
    vi: calico01Vi,
  },
} as const;

const useDesignTokens = ({
  forceTheme,
}: {
  forceTheme?: 'classic' | 'visualrefresh' | 'calico01';
}) => {
  const isVR = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const isCalico01 = useInExperiment({
    webExperimentName: 'web_gestalt_calico01',
    mwebExperimentName: 'web_gestalt_calico01',
  });

  let theme: 'classic' | 'visualrefresh' | 'calico01' = forceTheme ?? 'classic';

  if (!forceTheme && isVR) {
    theme = 'visualrefresh';
  }
  if (!forceTheme && isCalico01) {
    theme = 'calico01';
  }

  return themes[theme];
};

export default useDesignTokens;
