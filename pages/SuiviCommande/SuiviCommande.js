import React, { useEffect, useRef, useState  } from "react";
import { View, Text, SafeAreaView, StyleSheet, ViewBase, ScrollView, FlatList, TouchableOpacity } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { suiviLabel } from "../../Datas/uitlsData";
import { useRoute } from '@react-navigation/native';
import Entypo from "react-native-vector-icons/Entypo"

import stores from "../../Store/store";
import { observer } from "mobx-react";
import { reaction } from "mobx";

const SuiviCommande = observer (({navigation})=>{
        const route = useRoute();
        const [totalPrice,setTotalPrice] = useState()
        const [listCommande, setListCommnade] = useState()
    
        const actions = [
            {
              icon: require("./../../assets/svg/retour.png"),
            },
        ]      
        
        const customStyles = {
            stepIndicatorSize: 30,
            currentStepIndicatorSize:40,// la taille du cercle du step en cours
            separatorStrokeWidth: 5,// largeur des lignes séparation
            currentStepStrokeWidth: 5,// la largeur de bordure du step en cours
            stepStrokeCurrentColor: 'orange', // couleur bordure du step en cours
            stepStrokeWidth: 5, // largeur padding des cercles sans le step en cours
            stepStrokeFinishedColor: 'green', // couleur bordure step terminé
            stepStrokeUnFinishedColor: 'gray', // largeur bordure du step on commencé
            separatorFinishedColor: 'green', // couleur ligne de séparation terminé
            separatorUnFinishedColor: 'gray',// couleur ligne de séparation non terminé
            stepIndicatorFinishedColor: 'green', // couleur de fond du step terminé
            stepIndicatorUnFinishedColor: 'gray',// couleur de fond du step non commencé
            stepIndicatorCurrentColor: '#FFF', // couleur de fond du step en cours
            stepIndicatorLabelFontSize: 15,// taille du numéro du steper
            currentStepIndicatorLabelFontSize: 16, // taille de text du step en cours
            stepIndicatorLabelCurrentColor: 'orange', // couleur du step en cours
            stepIndicatorLabelFinishedColor: '#FFF',
            stepIndicatorLabelUnFinishedColor: '#FFF',
            labelColor: 'gray',
            labelSize: 15,
            labelAlign:"end",
            currentStepLabelColor: 'orange'
            
          }
    
          useEffect(()=>{
            reaction(
                () => stores.listeCommande, // Suivre les changements du tableau todos dans le store
                (listCommande) => {
                  // Utilisez les tâches récupérées selon vos besoins spécifiques
                  console.log("ok ok list", listCommande); // Exemple : Afficher les tâches dans la console
                  setListCommnade(listCommande)
                    
                }
              );

              const totalPrice = stores.listeCommande.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.price;
              }, 0);
              console.log('Total resime:', totalPrice);
              setTotalPrice(totalPrice)
    
            //   return () => { 
            //     disposer(); // Désabonnez-vous de la réaction lors du démontage du composant
            //   };

    
       
          
            
            
          },[])
    
        return(
            <ScrollView contentContainerStyle={styles.stepContainerS}>
    
    <TouchableOpacity style={styles.backBtn} onPress={()=>navigation.push('myMap')}>
        <Entypo name='map' size={30} color='#063970' />
      </TouchableOpacity>

      <TouchableOpacity style={styles.mapBtn} onPress={()=>navigation.push('accueil')}>
        <Entypo name='chevron-left' size={30} color='#063970' />
      </TouchableOpacity>

            <View style={styles.stepContainer}>
                <Text style={styles.titleSuivi}>Suivi commande</Text>
                <StepIndicator
                customStyles={customStyles}
                currentPosition={2}
                labels={suiviLabel}
                stepCount={3}
                direction="vertical"/>
            </View>
            <View style={styles.resumeBlock}>
               <Text style={styles.resumeTitle}>Resumé</Text>
               <Text style={styles.totalPrice}>{totalPrice} Fcfa</Text>
    
               <ScrollView contentContainerStyle={styles.ListResume}>
               
    
                {stores.listeCommande.map((item, index)=>(
                    <View key={index} style={styles.commandeItem}>
                    <Text style={styles.commandeItemLibelle}> {item.libelle} </Text>
                    <Text style={styles.commandeItemQuantite}> {item.quantite} </Text>
                    <Text style={styles.commandeItemQuantite}> {item.price} Fcfa </Text>
                    </View>
                ))}
                </ScrollView>   
               
            </View>
    
          
        
            </ScrollView>
        )
    }
)

const styles = StyleSheet.create({
    stepContainer:{
        height:"30%",
        backgroundColor:"#d9d9d7",
        padding:10,
        borderRadius:10
    },
    stepContainerS:{
        flexGrow:1,
        paddingTop:70,
        backgroundColor:"#063970",
        paddingHorizontal:10
    },
    titleSuivi:{
        fontSize:18
    },
    resumeBlock:{
        height:"50%",
        backgroundColor:"#d9d9d7",
        marginTop:10,
        borderRadius:10,
        padding:10
    },
    resumeTitle:{
        fontSize:18,
    },
    ListResume:{
        flexGrow:1,
        marginTop:10,
        display:"flex",
        flexDirection:"row",
       flexWrap:"wrap"
    },
    commandeItem:{
        display:"flex",
        flexDirection:"culumn",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:10  ,
        backgroundColor:"#063970",
        width:"30%",
        borderRadius:10,
        margin:3,
        height:"20%",
    },
    commandeItemLibelle:{
        color:"#fff"
        
    },
    commandeItemQuantite:{
        color:"#fff"

    },
    totalPrice:{
        position:"absolute",
        right:15,
        top:10,
        fontSize:22,
        fontWeight:"500",
        display:"flex",
        textDecorationLine: 'underline',
        color:"#063970"
    },
    backBtn:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        position:"fixed",
        top: -10,
        left: 0,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 100,
        zIndex:2

    },
    mapBtn:{
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        position:"fixed",
        top: -10,
        right: 0,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 100,
        zIndex:2

    }


})
export default SuiviCommande