import React,{useState, useEffect, useCallback,useMemo,useRef} from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import PrestataireItem from '../../components/PrestataireListe/PrestataireItem';
import SearchBar from '../../components/searchBar/SearchBar';
import  {DataPrestataire}  from '../../Datas/prestataireData';
import stores from '../../Store/store';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';

import LottieView from 'lottie-react-native';

const Accueil = observer(({navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [list, setList] = useState([])
    


    const handleChangeFilter = (text) => {
    setFilter(text);
  };

  const filteredData = DataPrestataire.filter((item) =>
    // item.name.toLowerCase().includes(filter.toLowerCase())
    item.adresse.toLowerCase().includes(filter.toLowerCase())
  );

 

  const getPanier = ()=>{
    navigation.navigate('resumeList')
    
  }

  
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false)
        },3000)



        const disposer = reaction(
          () => stores.listeCommande, // Suivre les changements du tableau todos dans le store
          (listCommande) => {
            // Utilisez les tâches récupérées selon vos besoins spécifiques
            console.log(listCommande); // Exemple : Afficher les tâches dans la console
            setList(listCommande)
          }
        );
    
        return () => {
          disposer(); // Désabonnez-vous de la réaction lors du démontage du composant
        };
    })

    const rederList = () =>{
        if(!isLoading){
            return(
              
                <FlatList style={styles.flatList}
                data={filteredData}
                keyExtractor={item=>item.id}
                renderItem={({item}) => {
                return <PrestataireItem prestataire={item} navigation={navigation}/>
                }}
              />
            )
        }else{
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LottieView style={styles.lottie} source={require('./../../assets/lotties/loading_rapide.json')} autoPlay loop />

                {/* <ActivityIndicator size="large" color="#FFF" /> */}
              </View>
            )
        }
    }


    return(
        <View style={styles.container}>



<View >
    <View style={styles.serchContainer}>
    <TouchableOpacity style={styles.userBlock} onPress={()=>navigation.navigate('profile')}>
    <Image source={require('./../../assets/hazizu.jpg')} style={styles.iuserImage}/>
    </TouchableOpacity>
    <SearchBar onChange={handleChangeFilter}/>

    <TouchableOpacity style={styles.panierBlock} onPress={()=>getPanier(0)}>
    <View style={styles.panierNumber}>
    <Text >{list.length}</Text>
    </View>
    <Image source={require('./../../assets/svg/panierLinge.png')} style={styles.panier}/>
    
    </TouchableOpacity>
    </View>

  </View>
    {rederList()}  
  
  {/* <FlatList style={styles.flatList}
                data={DataPrestataire}
                keyExtractor={item=>item.id}
                renderItem={({item}) => {
                return <PrestataireItem prestataire={item} navigation={navigation}/>
                }}
              /> */}
        
      </View>
    )
  
});


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    lottie:{
      width:350
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
        height:40,
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
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
     
    },

  });



export default Accueil;
