import React, {useState, useRef}from "react";
import {Animated, View ,FlatList, Text,StyleSheet,ImageBackground, TouchableOpacity} from "react-native";
import AccueilInfoItem from "../../components/accueilInfoItem/AccueilInfoItem";
import { Data } from "../../Datas/AccueilInfoDAta";
import { SafeAreaView } from "react-native-safe-area-context";
import Pagination from "../../components/pagination/Pagination";

const PageAccueil = ({navigation}) =>{

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;


    return(

      <View style={styles.container}>
            <FlatList style={styles.flatListStyle}
                data={Data}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                onScroll={handleOnScroll}
                viewabilityConfig={viewabilityConfig}
                keyExtractor={item => item.id}

                renderItem={({ item }) => {
                    return (
                      <AccueilInfoItem slideElement={item} props={navigation}/>
                    )
                }}
            />
             <Pagination data={Data} scrollX={scrollX} index={index} />
       

      </View>


      

      //   <ImageBackground source={require('./../../assets/pageAccuei.png')} style={styles.backgroundImage}>
      //  <View style={styles.containerTile}>
      //   <Text style={styles.title}>La lessive à tout moment</Text>
      //   </View>

      //   <View style={styles.actionBlock}>

      //  <TouchableOpacity style={styles.btnConnexion} onPress={()=>navigation.navigate('connexion')}>
      //   <Text style={styles.connexion}>Se connecter</Text>
      //  </TouchableOpacity>
      //  <TouchableOpacity style={styles.btnInscription} onPress={()=>navigation.navigate('Inscripton')}>
      //   <Text style={styles.inscription}>S'inscrire</Text>
      //  </TouchableOpacity>
      // </View>

      // </ImageBackground>
        
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