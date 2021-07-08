import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { isReadyRef, navigationRef } from './app/navigators/root';
import { MainContextProvider } from './app/navigators/context/main.context';
import { AppNavigator } from './app/navigators/app';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.isReadyRef = React.createRef();
  }

  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          this.isReadyRef.current = true;
          isReadyRef.current = this.isReadyRef.current;
        }}
      >
        <MainContextProvider>
          <AppNavigator />
        </MainContextProvider>
      </NavigationContainer>
    )
  }
}