import React from "react";
import { View ,Text,StyleSheet,ImageBackground, TouchableOpacity} from "react-native";

const PageAccueil = ({navigation}) =>{
    return(

        <ImageBackground source={require('./../../assets/pageAccuei.png')} style={styles.backgroundImage}>
       <View style={styles.containerTile}>
        <Text style={styles.title}>La lessive à tout moment</Text>
        </View>

        <View style={styles.actionBlock}>

       <TouchableOpacity style={styles.btnConnexion} onPress={()=>navigation.navigate('connexion')}>
        <Text style={styles.connexion}>Se connecter</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.btnInscription} onPress={()=>navigation.navigate('Inscripton')}>
        <Text style={styles.inscription}>S'inscrire</Text>
       </TouchableOpacity>
      </View>

      </ImageBackground>
        
    )
}

export default PageAccueil;


const styles = StyleSheet.create({
    containerTile:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:200      
    },
    title:{
        fontSize:25
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      actionBlock:{
        flexDirection: 'row',
        justifyContent:'space-around',
        marginBottom:100
      },
      btnConnexion:{
         backgroundColor:'black',
         width:'40%',
         padding:20,
         color:'#0fccce',
         borderRadius:10
      },
      btnInscription:{
        backgroundColor:'#fff',
        width:'40%',
        padding:20,
        textAlign:'center',
        borderColor:"black",
        borderWidth:1,
        borderRadius:10
        
      },
      connexion:{
        color:'#0fccce',
        textAlign:'center',
        fontSize:16
      },
      inscription:{
        textAlign:'center',
        fontSize:16
      }
})