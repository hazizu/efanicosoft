import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const compte = (props) => {

    return (
        
        <View  style={style.container}>
   
            <Text >compte pages</Text>
        </View>
    );

   
};

const style = StyleSheet.create({
    container:{
       backgroundColor:'green',
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
        backgroundColor:'#0fccce',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        marginTop:10,
        
    }

})

export default compte;