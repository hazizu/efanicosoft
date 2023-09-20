import React ,{useEffect, useState}from "react";
import { View,Text,StyleSheet,FlatList,Image, TouchableOpacity,ActivityIndicator} from "react-native"
import { DataPrestataire } from "../../Datas/prestataireData";
import SearchBar from "../searchBar/SearchBar";
import PrestataireItem from "./PrestataireItem";

const Prestataires = ({navigation}) =>{
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{

        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    })

    const rederList = () =>{
        if(!isLoading){
            return(
                <FlatList style={styles.flatList}
                data={DataPrestataire}
                keyExtractor={item=>item.id}
                renderItem={({item}) => {
                return <PrestataireItem prestataire={item} navigation={navigation}/>
                }}
              />
            )
        }else{
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#5500dc" />
              </View>
            )
        }
    }

  



   
 
    return(
        <View style={styles.container}>


<View >
    <View style={styles.serchContainer}>
    <TouchableOpacity style={styles.userBlock}>
    <Image source={require('./../../assets/hazizu.jpg')} style={styles.iuserImage}/>
    </TouchableOpacity>
    <SearchBar/>
    <TouchableOpacity style={styles.panierBlock}>
   
    <View style={styles.panierNumber}>
    <Text >10</Text>
    </View>
    <Image source={require('./../../assets/svg/panierLinge.png')} style={styles.panier}/>
    
    </TouchableOpacity>
    </View>

  </View>
  
      {rederList()}
        
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    panier:{
        width:"100%",
        height:32,
    },
    iuserImage:{
        borderRadius:100/2,
        width:"100%",
        height:37,
    },
    userBlock:{
        width:"10%",
    },

    serchContainer:{
        display:'flex',
        flexDirection:'row',
        margin: 12,
        justifyContent:'space-between',
        textAlignVertical:'center'
    },
    panierBlock:{
       position:'relative',
       width:"8%",

    },
    panierNumber:{
        position:'absolute',
        top:-6,
        left:-5,
        backgroundColor:'yellow',
        zIndex:99,
        display:'flex',
        padding:2,
        borderRadius:5,
        fontSize:12
    }

  });

export default Prestataires;