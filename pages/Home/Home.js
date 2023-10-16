import 'react-native-gesture-handler'
import React from 'react';
import {View,StyleSheet} from 'react-native'
import Navigation from '../../components/navigation';

const Home = () => {
    return (
        
       <View style={style.container}>
          <Navigation/>
       </View>
    );
};

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#063970",
        with:'100%'

    }
})

export default Home;