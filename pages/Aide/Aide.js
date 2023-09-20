import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const Aide = (props) => {

    const goto = ()=>{
        props.navigation.navigate('Profile')
    }

   

    return (
        
        <View  style={style.container}>
            <Text onPress={goto}>aide pages</Text>
        </View>
    );

   
};

const style = StyleSheet.create({
    container:{
       backgroundColor:'0fccce',
       display:'flex',
    flex:1,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center'
    },

    subCountainer:{

    },

    registerBtn:{
        padding:10,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        marginTop:10,
        
    }

})

export default Aide;