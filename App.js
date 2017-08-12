import React from 'react';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import { withRkTheme, RkStyleSheet } from 'react-native-ui-kitten';
import { AppLoading, Permissions, Notifications } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { bootstrap, KittenTheme } from './app/config';
import cacheAssetsAsync from './app/utils/cacheAssetsAsync';
import * as Screens from './app/screens';
import API from './app/services/api';
let moment = require('moment');

const DailyChallenge = StackNavigator({
  First: {
    screen: Screens.SplashScreen,
    navigationOptions: ({navigation}) => ({
      header: null
    }),
  },
  Second: {
    screen: Screens.HomeScreen
  },
  Third: {
    screen: Screens.ChallengeScreen
  }
}, {
  headerMode: 'null'
});


export default class AppContainer extends React.Component {
  state = {
    assetsReady: false
  };

  constructor(props)  {
    super(props);
  }
    
  componentWillMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./app/assets/images/logo.png'),
          require('./app/assets/images/Default.png'),
          require('./app/assets/images/Default-nologo.png'),
        ],
        fonts: [
          { 'fontawesome': require('./app/assets/fonts/fontawesome.ttf') },
          { 'CircularStd-Black': require('./app/assets/fonts/CircularStd-Black.ttf') },
          { 'CircularStd-Bold': require('./app/assets/fonts/CircularStd-Bold.ttf') },
          { 'CircularStd-Book': require('./app/assets/fonts/CircularStd-Book.ttf') },
          { 'CircularStd-Medium': require('./app/assets/fonts/CircularStd-Medium.ttf') },
        ]
      });
      bootstrap();
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      await this.setupNotifications();
      this.setState({ assetsReady: true });
    }
  }

  async setupNotifications() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status == 'granted') {
      let tomorrow = moment().add(1, 'days').startOf('day').add(8, 'hourss').toDate();
      let notification = {
        title: 'The Challenger',
        body: 'Your next daily challenge is ready!',
        ios: {
          sound: true
        },
        android: {
          sound: true,
          icon: './app/assets/images/logo.png',
          color: KittenTheme.colors.sunglow,
          priority: 'high',
          vibrate: true
        }
      }
      let schedule = { time: tomorrow, repeat: 'day' };
      await Notifications.cancelAllScheduledNotificationsAsync();
      return await Notifications.scheduleLocalNotificationAsync(notification, schedule);
    } else {
      return true;
    }
  }

  render() {
    if (this.state.assetsReady) {
      return (
          <DailyChallenge ref={nav => { this.navigator = nav; }}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' &&
              <View style={styles.statusBarUnderlay} />}
          </DailyChallenge>
      );
    } else {
      return <AppLoading />;
    }
  }
}


const styles = RkStyleSheet.create(theme => ({
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  }
}));