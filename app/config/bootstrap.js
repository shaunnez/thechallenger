import {
  StatusBar,
  StyleSheet
} from 'react-native';
import {RkTheme} from 'react-native-ui-kitten';
import {KittenTheme} from './theme';
import {scale, scaleModerate, scaleVertical} from '../utils/scale';

export let bootstrap = () => {

  RkTheme.setTheme(KittenTheme, null);

  /*
   RkText types
   */

  RkTheme.setType('RkText', 'basic', {
    fontFamily: theme => KittenTheme.fonts.family.bold,
    backgroundColor: 'transparent'
  });

  RkTheme.setType('RkText', 'regular', {
    fontFamily: theme => KittenTheme.fonts.family.regular,
  });

  RkTheme.setType('RkText', 'light', {
    fontFamily: theme => KittenTheme.fonts.family.light,
  });

  RkTheme.setType('RkText', 'black', {
    fontFamily: theme => KittenTheme.fonts.family.black,
  });

  RkTheme.setType('RkText', 'awesome', {
    fontFamily: 'fontawesome',
  });

  //all font sizes
  for (let key in RkTheme.current.fonts.sizes) {
    RkTheme.setType('RkText', key, {
      fontSize: theme => KittenTheme.fonts.sizes[key]
    });
  }
  //all text colors
  for (let key in RkTheme.current.colors) {
    RkTheme.setType('RkText', `${key}Color`, {
      color: theme => KittenTheme.colors[key]
    });
  }
  //all text line heights
  for (let key in RkTheme.current.fonts.lineHeights) {
    RkTheme.setType('RkText', `${key}Line`, {
      text: {
        lineHeight: theme => KittenTheme.fonts.lineHeights[key]
      }
    });
  }
  
  //theme text styles
  RkTheme.setType('RkText', 'bold', {
    fontFamily: theme => KittenTheme.fonts.family.bold,
  });
  RkTheme.setType('RkText', 'light', {
    fontFamily: theme => KittenTheme.fonts.family.light,
  });
  RkTheme.setType('RkText', 'black', {
    fontFamily: theme => KittenTheme.fonts.family.black,
  });
  RkTheme.setType('RkText', 'regular', {
    fontFamily: theme => KittenTheme.fonts.family.regular,
  });

  RkTheme.setType('RkText', 'header1', {
    fontSize: theme => KittenTheme.fonts.sizes.h1,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'header2', {
    fontSize: theme => KittenTheme.fonts.sizes.h2,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'header3', {
    fontSize: theme => KittenTheme.fonts.sizes.h3,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'header4', {
    fontSize: theme => KittenTheme.fonts.sizes.h4,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'header5', {
    fontSize: theme => KittenTheme.fonts.sizes.h5,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: KittenTheme.colors.sunglow
  });
  RkTheme.setType('RkText', 'header6', {
    fontSize: theme => KittenTheme.fonts.sizes.h6,
    fontFamily: theme => KittenTheme.fonts.family.bold,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary1', {
    fontSize: theme => KittenTheme.fonts.sizes.s1,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary2', {
    fontSize: theme => KittenTheme.fonts.sizes.s2,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary3', {
    fontSize: theme => KittenTheme.fonts.sizes.s3,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary4', {
    fontSize: theme => KittenTheme.fonts.sizes.s4,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary5', {
    fontSize: theme => KittenTheme.fonts.sizes.s5,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary6', {
    fontSize: theme => KittenTheme.fonts.sizes.s6,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'secondary7', {
    fontSize: theme => KittenTheme.fonts.sizes.s7,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'primary1', {
    fontSize: theme => KittenTheme.fonts.sizes.p1,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'primary2', {
    fontSize: theme => KittenTheme.fonts.sizes.p2,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'primary3', {
    fontSize: theme => KittenTheme.fonts.sizes.p3,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });
  RkTheme.setType('RkText', 'primary4', {
    fontSize: theme => KittenTheme.fonts.sizes.p4,
    fontFamily: theme => KittenTheme.fonts.family.light,
    color: theme => KittenTheme.colors.coolBlack
  });

  RkTheme.setType('RkText', 'center', {
    text: {
      textAlign: 'center'
    }
  });

  /*
   RkButton types
   */

  RkTheme.setType('RkButton', 'basic', {
    color: theme => KittenTheme.colors.white,
    container: {
      alignSelf: 'auto',
      backgroundColor: theme => KittenTheme.colors.sunglow,
    }
  });

  RkTheme.setType('RkButton', 'contrast', {
    color: theme => KittenTheme.colors.sunglow,
    container: {
      backgroundColor: theme => KittenTheme.colors.white,
    }
  });
  /*
  RkTheme.setType('RkButton', 'icon', {
    height: scale(56),
    width: scale(56),
    borderColor: theme => KittenTheme.colors.border.base,
    backgroundColor: theme => KittenTheme.colors.control.background,
    borderWidth: 1
  });

  RkTheme.setType('RkButton', 'highlight', {
    backgroundColor: theme => KittenTheme.colors.button.highlight
  });
  */

  /*
   RkTextInput
   */

  RkTheme.setType('RkTextInput', 'basic', {
    color: theme => KittenTheme.colors.coolBlack,
    backgroundColor: theme => KittenTheme.colors.white,
    labelColor: theme => KittenTheme.colors.coolBlack,
    placeholderTextColor: theme => KittenTheme.colors.coolBlack,
  });

  
  RkTheme.setType('RkTextInput', 'custom', {
    label: {
      position: 'absolute',
      top: 0
    },
    container: {

    },
    input: {
      marginTop: scaleVertical(25),
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
  });

  RkTheme.setType('RkTextInput', 'row', {
    input: {
      marginVertical: 0,
      marginHorizontal: 0,
      marginTop: 0,
      paddingTop: {
        ios: 2,
        android: 0
      },
      paddingBottom: 0,
      textAlignVertical: 'center',
      includeFontPadding: false,
      fontFamily: theme => KittenTheme.fonts.family.light,
      fontSize: theme => KittenTheme.fonts.sizes.small,
    },
    container: {
      flex: 1,
      backgroundColor: theme => KittenTheme.colors.input.background,
      marginVertical: 0,
      borderRadius: 20,
      paddingHorizontal: 16
    },

  });

  /*
   RkCard types
   */

  RkTheme.setType('RkCard', 'basic', {
    container: {
      borderRadius: 3,
      backgroundColor: theme => KittenTheme.colors.white
    },
    header: {
      justifyContent: 'flex-start',
      paddingVertical: 14
    },
    content: {
      padding: 16
    },
    footer: {
      paddingBottom: 20,
      paddingTop: 7.5,
      paddingHorizontal: 0
    }
  });

  RkTheme.setType('RkCard', 'article', {
    container: {
      borderWidth: 0,
      backgroundColor: 'transparent'
    },
    header: {
      paddingVertical: 0,
      paddingTop: 20,
      paddingBottom: 16,
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme => KittenTheme.colors.coolBlack
    },
    content: {
      padding: 16,
      borderBottomWidth: 1,
      borderColor: theme => KittenTheme.colors.coolBlack
    },
    footer: {
      paddingHorizontal: 14,
      paddingTop: 15,
      paddingBottom: 16,
      alignItems: 'center'
    }
  });

  StatusBar.setBarStyle('dark-content', true);
};