import React from "react";
import  {View, Text, Image, StyleSheet, TouchableOpacity,} from 'react-native';

const PrestataireItem = ({prestataire, navigation}) => {

  
    return(
        <TouchableOpacity onPress={()=>navigation.navigate('prestataireDetail', prestataire)}>
        <View style={styles.itemsStyle}>
        <Image
        style={styles.tinyLogo}
        source={{uri: prestataire.image}}/>
        <View style={styles.itemsStyle_info}>
            <Text style={styles.prestaName}>{prestataire.name}</Text>
            <Text style={styles.prestaAdress}>{prestataire.adresse}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}

export default PrestataireItem;

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 100,
      height: 100,
      borderRadius:100/2
    },
    logo: {
      width: 66,
      height: 58,
    },

    itemsStyle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:5,
        backgroundColor:'#0fccce54',
        margin:10,
        borderRadius:10
    },
    itemsStyle_info:{
        marginLeft:20
    },
    prestaName:{
        fontSize:18,
        fontWeight:'500',
        marginBottom:10
    }

  });