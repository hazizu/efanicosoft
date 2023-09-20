import React,{useEffect} from "react";
import { View, Text, Image,StyleSheet, TouchableOpacity } from "react-native";


const PrestaireDetails = ({route,navigation}) =>{
    const item = route.params;

    useEffect(()=>{
     navigation.setOptions({title: item.name})
    })

    const gotoChoixClothes = () =>{
        navigation.navigate('choix')
    }

    return(
        <View>
            <View style={styles.containerImage}>
                <Image style={styles.imgPresta}source={{uri:item.image}}/>
            </View>
            <Text style={styles.prestName}>{item.name}</Text>
            <Text style={styles.prestAdresse}>{item.adresse}</Text>

            <TouchableOpacity style={styles.nextBtn} onPress={gotoChoixClothes}>
                <Text style={styles.nextText}>CONTINUER</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    prestName:{
        fontWeight:'500',
        fontSize:20,
        marginLeft:12
    },
    prestAdresse:{
        fontSize:17,
        margin:12
    },
    imgPresta:{
        width:100,
        height:100,
        borderRadius:100/2
    },
    containerImage:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:12

    },
    nextBtn:{
       backgroundColor:'#000',
       marginLeft:50,
       marginRight:50,
       padding:15,
       borderRadius:10,
       marginTop:30
    },
    nextText:{
        color:'#FFF',
        textAlign:'center'
    },
})

export default PrestaireDetails