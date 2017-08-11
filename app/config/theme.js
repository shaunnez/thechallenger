import {scale, scaleVertical} from '../utils/scale';

const Colors = {
  coolBlack:   '#4A4D5C',
  coolBlack75: '#787A85',
  coolBlack50: '#A4A7AD',
  coolBlack5:  '#F6F6F7',
  sunglow:     '#FF5E3A', //'#f58025', // #f58025 orange, #95c11e green
  opaqueSunglow: 'rgba(245, 128, 37, 0.8)',
  solar:       '#FF5504',
  lava:        '#FF5E3A', //#CB0502',
  opaqueLava:  'rgba(203, 5, 2, 0.1)',
  dayBreak:    '#FFC627',
  white:       '#FFF',
  transparent: 'transparent',
  blue:        '#37a3c3',
  paleblue:    '#b6f2ff',
  green:       '#8fc35a'
};

/* Background: */
const Fonts = {
  light: 'CircularStd-Book',
  regular: 'CircularStd-Medium',
  black: 'CircularStd-Black',
  bold: 'CircularStd-Bold'
};

const FontBaseValue = scale(16);

const FontSizes = { 
  h0: scale(32),
  h1: scale(26),
  h2: scale(24),
  h3: scale(20),
  h4: scale(18),
  h5: scale(16),
  h6: scale(15),
  p1: scale(16),
  p2: scale(15),
  p3: scale(15),
  p4: scale(13),
  s1: scale(15),
  s2: scale(13),
  s3: scale(13),
  s4: scale(12),
  s5: scale(12),
  s6: scale(13),
  s7: scale(10),
  base: FontBaseValue,
  small: FontBaseValue * .8,
  medium: FontBaseValue,
  large: FontBaseValue * 1.2,
  xlarge: FontBaseValue / 0.75,
  xxlarge: FontBaseValue * 1.6,
  superMedium: scale(40),
  superLarge: scale(60),
}

const LineHeights = {
  normal: 16,
  medium: 18,
  big: 24
}

const Margins = {
  xsmall: scale(4),
  small: scale(15),
  medium: scale(17),
  large: scale(20),
  xlarge: scale(30)
}

const Paddings = {
  xsmall: scale(4),
  small: scale(15),
  medium: scale(17),
  large: scale(20),
  xlarge: scale(30)
}

export const KittenTheme = {
  name: 'light',
  colors: Colors,
  fonts: {
    sizes: FontSizes,
    lineHeights: LineHeights,
    family: Fonts
  },
  spacing: {
    margin: Margins,
    padding: Paddings
  }
};