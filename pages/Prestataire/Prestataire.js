import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const Prestataire = (props) => {

   

    return (
        
        <View  style={style.container}>
   
            <Text >prestataire pages</Text>
        </View>
    );

   
};

const style = StyleSheet.create({
    container:{
       backgroundColor:'#063970',
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

export default Prestataire;