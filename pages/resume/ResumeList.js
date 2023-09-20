import React,{useEffect,useState,useRef,useMemo,useCallback} from "react";
import { View,Text,FlatList,StyleSheet,Alert, TouchableOpacity, Image} from "react-native";
import ResumeItem from "../../components/resumeItem/ResumeItem";
import stores from "../../Store/store";
import { observer } from "mobx-react";
import { reaction } from "mobx";
import { pantalonImage, chemiseImage, robeImage, jeanImage } from "./../../assets/imagesLinks"

import{BottomSheetModal,BottomSheetModalProvider} from "@gorhom/bottom-sheet"





const ResumeListe = observer(({route,navigation}) =>{
    const [list, setList] = useState([]) 
    const [elementToUpdate, setElementToUpdate] = useState()
    const [imageToUpdate , setImageToUpdate] = useState("")
    
    

        const resume = route.params;

      // bottom-sheet config

      const bottomSheetModalRef = useRef(null);
      const snapPoints = ["50%"];

      function handlePresentModal(){
        bottomSheetModalRef.current?.present();
      }

      const closeModal = () =>{
        bottomSheetModalRef.current?.dismiss()
      }
     

       

    const noResume = ()=>{
        if(!stores.listeCommande.length){ 
            return(
                <View style={styles.emptyBlock}>
                    <Text style={styles.emptyText}>Votre panier à linge est vide</Text>
                </View>
            )

        }
        
    }

    const setUpElementToUp = () => {
        const element = elementToUpdate;
        let imageToUp = ""
        
        if (element) {
          console.log('setUp==========', element);
          if(element.libelle === "Chemise"){
            imageToUp = chemiseImage
          }else if(element.libelle === "Pantalon"){
           
            imageToUp = pantalonImage
          }else if(element.libelle === "Jean"){
          
            imageToUp = jeanImage
          }else if(element.libelle ="robe"){
           
            imageToUp =robeImage
          }
          return (
            <View style={ styles.updatContainer}>
               <Image style={styles.imageUpStyle} source={imageToUp}></Image>
              <View style={styles.UpdateHead}>
                <Text style={styles.updateStylibelle}>{element.libelle}</Text>
                <Text style={styles.updateStylPrice}>{element.price} FCFA</Text>
              </View>
              <View style={styles.UpdateBody}>
                <TouchableOpacity style={styles.updateDecreStyle}><Text style={styles.UpdateDecreTextStyle}>-</Text></TouchableOpacity>
                <Text style={styles.updateStylQuantite}>{element.quantite}</Text>
                <TouchableOpacity style={styles.updateIncreStyle}><Text style={styles.UpdateIncreTextStyle}>+</Text></TouchableOpacity>
              </View>

              
                <TouchableOpacity style={styles.updateBtn}>
                    <Text style={styles.updatebtnText}>Modifier</Text>
                </TouchableOpacity>
            
            </View>
          );
        }
        return null; // Renvoyez null ou un composant vide si elementToUpdate est null
      };
    const updateCommande = (data)=>{
        if(data.action === "update"){
            
          setElementToUpdate(data.element)
          const dd = elementToUpdate

            console.log('up up ====',  dd)
            handlePresentModal()
            
        }else{
            console.log('suprimer')
            deleteResumeAlert(data.element)
        }
    }
   

    

    const deleteResumeAlert = (data) =>
    Alert.alert('Suppression', 'Voulez-vous vraiment le retirer de votre panier ?', [
      {
        text: 'NON',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OUI', onPress: () => deleteItem(data)},
    ]);

    const deleteItem = (data)=>{
        console.log('element', data)
        stores.listeCommande.forEach((el, index)=>{
            if(el.libelle === data.libelle){
                stores.listeCommande.splice(index,1)
                stores.setListCommande(stores.listeCommande)

            }
        })
    }

  

    useEffect(()=>{

        navigation.setOptions({title: 'Votre panier !'})
        console.log('resume', resume)
        console.log('list', stores.listeCommande)

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

       },[elementToUpdate])
   

    
    return(
<BottomSheetModalProvider style={styles.container}>
        <View style={styles.containerList}>
            {noResume()}
           
                <FlatList style={styles.flatListStyle}
                data={stores.listeCommande}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <ResumeItem resumeElement={item} onEventEmit={updateCommande}/>
                    )
                }}
            />
            
            <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.sheetContainer}
            >
                
                <TouchableOpacity style={styles.closeModalBtn} onPress={ closeModal}>
                    <Text>Fermer</Text>
               </TouchableOpacity>
               {setUpElementToUp()}
            
                
            </BottomSheetModal>
        </View>
</BottomSheetModalProvider>
    )
})

export default ResumeListe;

const styles = StyleSheet.create({
    flatList:{
       display:"flex",
       flex:1,
       marginRight:15,
        marginLeft:15,
        zIndex:-1
    },
    container:{
        flex:1,
    },
    containerList:{
        flex:1,
        zIndex:-1
    },
    flatListStyle:{
        marginLeft:15,
        marginRight:15

    },
    bottomSheet:{
        width:'100%', 
        

    },
    emptyBlock:{
       fontSize:20,
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       alignItems:'center',
       flex:1
    },

    emptyText:{
      fontSize:20
    },

    sheetContainer:{
        zIndex:9999,
        position:'relative'
    },
    closeModalBtn:{
        position:"absolute",
        right:15,
        backgroundColor:"#c2c2c2b5",
        padding:10,
        borderRadius:15,
        

    },
    updatContainer:{
        
         zIndex: -1 ,
         marginTop:70,
         flex:1,
         display:"flex",
         flexDirection:'column',
         alignContent:'center',
        
    },
    UpdateHead:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    UpdateBody:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:30,
        alignItems:"center"
    },
    updateBtn:{
        display:"flex",
        flexDirection:'row',
        justifyContent:"center",
        backgroundColor:'black',
        padding:15,
        marginHorizontal:30,
        borderRadius:10,
        marginTop:50
    },
    updatebtnText:{
        color:'white',
        fontSize:17
    },
    updateStylibelle:{
        fontSize:18,
        color:"#5d5d5d"

    },
    updateStylPrice:{
        fontSize:18,
        color:"#0fccce",
        textDecorationLine: 'underline'

    },
    updateStylQuantite:{
       fontSize:25, 
       color:"#5d5d5d"
    },
    updateDecreStyle:{
        borderWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        borderColor: '#0fccce',
        marginLeft:30
        
    },
    updateIncreStyle:{
        borderWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        backgroundColor: '#0fccce',
        borderColor: 'transparent',
        marginRight:30
    },
    UpdateDecreTextStyle:{
        fontSize:30,
        color:"#5d5d5d"

    },
    UpdateIncreTextStyle:{
        fontSize:30,
        color:"#FFF"

    },
    imageUpStyle:{
        width:60,
        height:60,
        position:"absolute",
        top:-70,
        left:10
    }

    

 
  

       
    
})