import { Navigation } from 'react-native-navigation';
import App from './App';
import Settings from './src/Containers/SettingsContainer';


Navigation.registerComponent('app', () => App);
Navigation.registerComponent('Settings', () => Settings);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'app',
                        options: {
                            topBar: {
                                title: {
                                    text: 'Home'
                                }
                            }
                        }
                    }
                }]
            }
        }
    })
});