import React from 'react';
import { NavigationFunctionComponent } from 'react-native-navigation';
import { Provider } from 'react-redux';
import FamilyTreeContainer from './src/Containers/FamilyTreeContainer';
import { store } from './src/store/store';

const App:NavigationFunctionComponent<Props> = ({ componentId }) => {
  return (
    <Provider store={store}>
      <FamilyTreeContainer componentId={componentId} />
    </Provider>
  );
};

type Props = {
  
}

export default App;
