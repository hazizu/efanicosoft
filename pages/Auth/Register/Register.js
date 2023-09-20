import React from 'react';
import { View,Text, StyleSheet } from 'react-native';

const Register = (props) => {

    const goToLogin = () =>{
     props.navigation.push('connexion')
    }
    const goToRegister = () =>{
        props.navigation.push('accueil')
       }
    return (
        <View style={style.container}>
            <View>
            <Text>Register page</Text>
            <Text onPress={goToLogin} style={style.login}>Login</Text>
            </View>
        </View>
    );
};
const style = StyleSheet.create({
    container:{
       
       display:'flex',
       flex:1,
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center'
    },
    login:{
            padding:10,
            justifyContent:'center',
            alignItems:'center',
            textAlign:'center',
            marginTop:10,
            borderRadius:10,
            borderWidth:1,
            width:100
    }
})

export default Register;