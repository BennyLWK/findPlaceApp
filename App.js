import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StyleSheet} from 'react-native';
import store from './src/store/store';
import {MySearchBar} from './src/components';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <MySearchBar />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
