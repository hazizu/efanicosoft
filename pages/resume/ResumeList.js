import React,{useEffect,useState,useRef,useMemo,useCallback} from "react";
import { View,Text,FlatList,StyleSheet,Alert, TouchableOpacity, Image} from "react-native";
import ResumeItem from "../../components/resumeItem/ResumeItem";
import stores from "../../Store/store";
import { observer } from "mobx-react";
import { action, reaction } from "mobx";
import { pantalonImage, chemiseImage, robeImage, jeanImage } from "./../../assets/imagesLinks"

import{BottomSheetModal,BottomSheetModalProvider} from "@gorhom/bottom-sheet"
import Snackbars from "../../components/snackBar/snackbar";




const ResumeListe = observer(({route,navigation}) =>{
    const [list, setList] = useState([]) 
    const [elementToUpdate, setElementToUpdate] = useState()
    const [ isOpen, setIsOpen] = useState(false)
    const [cacheUpdate, setCacheUpdate]=useState()
    const [choiceNumber, setChoiceNumber] = useState(0);
    const [unitPrice, setunitPrice] = useState(0);
    const resume = route.params;
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const [totalCommande, setTotalCommande] = useState()

      // bottom-sheet config
    const bottomSheetModalRef = React.useRef(null);
    const snapPoints = ["50%"];


    //////////////////// FONCTIONS /////////////////////////

    const calculPrice = (list) =>{
        const totalPrice = list.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.price;
          }, 0);
          
          console.log('Total Quantite:', totalPrice);
          setTotalCommande(totalPrice)

    }

      function handlePresentModal(){
        bottomSheetModalRef.current?.present();
      }

      const closeModal = (element) =>{
        bottomSheetModalRef.current?.dismiss()
        setIsOpen(false)
        setunitPrice(cacheUpdate.price)
        setChoiceNumber(cacheUpdate.quantite)
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
          }else if(element.libelle === "robe"){
           
            imageToUp = robeImage
          }
          return (
            <View style={ styles.updatContainer}>
               <Image style={styles.imageUpStyle} source={imageToUp}></Image>
              <View style={styles.UpdateHead}>
                <Text style={styles.updateStylibelle}>{element.libelle}</Text>
                <Text style={styles.updateStylPrice}>{unitPrice} FCFA</Text>
              </View>
              <View style={styles.UpdateBody}>
                <TouchableOpacity style={styles.updateDecreStyle} onPress={()=>getMoins(element)}><Text style={styles.UpdateDecreTextStyle}>-</Text></TouchableOpacity>
                <Text style={styles.updateStylQuantite}>{choiceNumber}</Text>
                <TouchableOpacity style={styles.updateIncreStyle} onPress={()=> getPlus(element)}><Text style={styles.UpdateIncreTextStyle}>+</Text></TouchableOpacity>
              </View>

              
                <TouchableOpacity style={styles.updateBtn} onPress={()=>valideUpdate()}>
                    <Text style={styles.updatebtnText}>Valider</Text>
                </TouchableOpacity>
            
            </View>
          );
        }
        return null; // Renvoyez null ou un composant vide si elementToUpdate est null
      };

    
    const updateCommande = (data)=>{
        if(data.action === "update"){
          setIsOpen(!isOpen)
          setElementToUpdate(data.element)
          setCacheUpdate(data.element)
          const dd = elementToUpdate
            console.log('up up ====',  dd)
            handlePresentModal()
            
        }else{
            console.log('suprimer') 
            deleteResumeAlert(data.element)
        }
    }

    const valideUpdate = ()=>{
        const updatedListeCommande = stores.listeCommande.map((el) => {
            if (el.libelle === elementToUpdate.libelle) {
              return {
                id: elementToUpdate.id,
                libelle: elementToUpdate.libelle,
                price: unitPrice,
                quantite: choiceNumber,
              };
            } else {
              return el; // Garder l'élément inchangé s'il ne correspond pas au libellé
            }
          });
          stores.setListCommande(updatedListeCommande);
          calculPrice(updatedListeCommande)

          bottomSheetModalRef.current?.dismiss()
          setIsOpen(false)

          setShowSnackbar(true);
        setSnackMessage('Quantité de ' + elementToUpdate.libelle + ' modifiée !!')
        setTimeout(()=>{
        setShowSnackbar(false);
    }, 3000)
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
   
    

    const deleteItem = action((data)=>{
        console.log('element', data)
        stores.listeCommande.forEach((el, index)=>{
            if(el.libelle === data.libelle){
                stores.listeCommande.splice(index,1)
                const lis = stores.listeCommande
                stores.setListCommande(lis)
                calculPrice(stores.listeCommande)
            }
        })
    })


    const getPlus = (choiced) => {
        const newCount = choiceNumber + 1;
        console.log('new count', newCount)
        setChoiceNumber(newCount)
        switch (choiced.libelle) {
            case 'Chemise':
                setunitPrice(newCount * 200)
                break;
            case 'Pantalon':
                setunitPrice(newCount * 250);
                break;
            case 'Jean':
                setunitPrice(newCount * 300);
                break;
            case 'Robe':
                setunitPrice(newCount * 300)
            default:
                break;
        }
    }

    const getMoins = (choiced) => {
        if (choiceNumber > 0) {
            const newCount = choiceNumber - 1;
            setChoiceNumber(newCount)
            switch (choiced.libelle) {
                case 'Chemise':
                    setunitPrice(newCount * 200)
                    break;
                case 'Pantalon':
                    setunitPrice(newCount * 250);
                    break;
                case 'Jean':
                    setunitPrice(newCount * 300);
                    break;
                case 'Robe':
                    setunitPrice(newCount * 300)
                default:
                    break;
            }
        }
    }

    const goToSuivi = ()=>{
        console.log('navii======================', navigation)
    navigation.push('suiviCommande', {
        data:stores.listeCommande
    })
    }

    ///////////////// END FUNCTIONS /////////////////////////

  

    useEffect(()=>{
        const item = elementToUpdate 
        if(item){
        setunitPrice(item.price)
        setChoiceNumber(item.quantite)
        }
        
        navigation.setOptions({title: 'Votre panier !'}) 
        console.log('resume', resume)
        console.log('list', stores.listeCommande)
        calculPrice(stores.listeCommande)

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
{isOpen && <View style={styles.overlay} />}
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
            <TouchableOpacity style={styles.validateCommnade}>
                <Text style={styles.validateCommnadeText} onPress={()=>goToSuivi()}>Valider ({totalCommande} Fcfa)</Text>
            </TouchableOpacity>
            
            <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.sheetContainer}
            dismissOnPanDown={false}
            enablePanDownToClose={true}
            onDismiss={() => {
                closeModal()
              }}
            >
                <TouchableOpacity style={styles.closeModalBtn} onPress={ closeModal}>
                    <Text>Fermer</Text>
               </TouchableOpacity>
               {setUpElementToUp()}
            </BottomSheetModal>

    <Snackbars
        visible={showSnackbar} // Prop pour gérer l'affichage de la Snackbar
        onClose={() => setShowSnackbar(false)} // Prop pour gérer la fermeture de la Snackbar
        message={snackMessage}
      />
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
        zIndex:-1,
        
    },
    container:{
        flex:1,
    },
    containerList:{
        flex:1,
        zIndex:-1,
        marginHorizontal:15,
        
    },
    flatListStyle:{
       


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
        zIndex:2,
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
        color:"#063970",
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
        borderColor: '#063970',
        marginLeft:30
        
    },
    updateIncreStyle:{
        borderWidth: 1,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        backgroundColor: '#063970',
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
    },
    validateCommnade:{
        backgroundColor:'#000',
        display:"flex",
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:15,
        borderRadius:10,
        position:"absolute",
        width:"100%",
        bottom:50,
        zIndex:2,
    },
    validateCommnadeText:{
     color:"#fff",
     fontSize:20
    },
    overlay:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
       
    }

    
})