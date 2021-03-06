import React from 'react';

import { Navigation } from 'react-native-navigation';
import FamilyTree from './src/Containers/FamilyTreeContainer';
import Settings from './src/Containers/SettingsContainer';

import { Provider } from 'react-redux';
import { store } from './src/store/store';

Navigation.registerComponent('FamilyTree', () => (props) => <Provider store={store}><FamilyTree {...props}/></Provider>, () => FamilyTree)
Navigation.registerComponent('Settings', () => (props) => <Provider store={store}><Settings {...props} /></Provider>, () => Settings)
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [{
                    component: {
                        name: 'FamilyTree',
                        options: {
                            topBar: {
                                title: {
                                    text: 'FamilyTree'
                                }
                            }
                        }
                    }
                }]
            }
        }
    })
});