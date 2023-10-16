
import React from "react";
import { ImageBackground } from "react-native";
import {StyleSheet, View, Text, Image, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons'
const {width, height} = Dimensions.get('screen');

const AccueilInfoItem =  ({ slideElement, props}) => {
    const translateYImage = new Animated.Value(40);


    const getAccueil = ()=>{
      props.push('accueil')
    console.log('proooo', props)
    }

    Animated.timing(translateYImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
      }).start();

    return(
        <ImageBackground source={(slideElement.image)}  imageStyle={{opacity:0.3}}>
        <View style={styles.container}>
           
        <Text style={styles.title}>{slideElement.title}</Text>
        <Animated.Image source={(slideElement.image)}
        resizeMode="cover"
        style={[
            styles.image,
           {
            transform:[
                {
                    translateY:translateYImage
                },
            ],
           },
        ]
    }
        />
        <Text style={styles.description}>{slideElement.description}</Text>

        {slideElement.id == 3 && (
             <TouchableOpacity style={styles.demareBtn} onPress={()=>getAccueil()}> 
            <Text style={styles.demareBtnLib}>Démarrer</Text>
            <EvilIcons name="chevron-right" color="#FFF" size={50}/>
        </TouchableOpacity>)}
        
       
        </View>
        </ImageBackground>
    )

}

export default AccueilInfoItem

const styles = StyleSheet.create({
    container: {
      width,
      height,
      alignItems: 'center',
      textAlign:"center",
      paddingHorizontal:30,
      position:"relative",
    },
    image: {
      flex: 0.6,
      width: '100%',
      borderRadius:20
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign:"center",
      marginTop:60,
      marginBottom:40
    },
    description: {
      fontSize: 18,
      marginTop:40,
      color: '#333',
      textAlign:"center",
      fontWeight:"700"
    },
    demareBtn:{
        position: 'absolute',
        bottom: 120,
        right:30,
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        backgroundColor:'#063970',
        borderRadius:10,
        paddingLeft:20

    },
    demareBtnLib:{
        color:"#FFF",
        fontWeight:"500",
        fontSize:18
    },
    bg:{
        opacity:0.3

    }

  });