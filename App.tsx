import 'react-native-gesture-handler'


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';


import Home from './pages/Home/Home';

type SectionProps = PropsWithChildren<{
  title: string;
}>;



function App(): JSX.Element {
  return (
    <View style={styles.container}>
    <Home/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',  
  },
});

export default App;
