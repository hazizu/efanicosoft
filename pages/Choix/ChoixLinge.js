import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ChoiceData } from "../../Datas/ChoiceData";
import ChoixLingeItem from "../../components/ChoixLingeItem/ChoixLingeItem";
import stores from "../../Store/store"; 
import Snackbars from "../../components/snackBar/snackbar";
import { string } from "yup";


const ChoixLinge = ({navigation}) => {

    const [listOfChoises, setListOfChoices] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")

  



    const handleEventEmit = (data) => {
        const existingIndex = listOfChoises.findIndex(item => item.libelle === data.libelle)

        if (existingIndex !== -1) {
        
          

     // Véririer si l'élément existe déjà, le remplacer.
            setListOfChoices((listOfChoises) => {
              return listOfChoises.map((item, index) => {
                
                if (index === existingIndex) {
                  setShowSnackbar(true);
                  setSnackMessage('Quantité de ' + data.libelle + ' : ' + data.quantite)
                  setTimeout(()=>{
                    setShowSnackbar(false);
                  }, 3000)
                  return data; 
                }
                return item; 
              });
            });
          } else{
        //  si l'élément n'est pas encore ajouter, l'ajouter à la liste existante.
            setListOfChoices((listOfChoises) => [...listOfChoises, data])
            setShowSnackbar(true)
            setSnackMessage('Quantité de ' + data.libelle + ' : ' + data.quantite)
                setTimeout(()=>{
              setShowSnackbar(false);
            }, 3000)

          }

        console.log('Données reçues :', data);
      };


      useEffect(() => {
        console.log('Tableau mis à jour :', listOfChoises);
        stores.setListCommande(listOfChoises)
      }, [listOfChoises]);



    return (
        <View style={styles.container}>
            <FlatList style={styles.flatList}
                data={ChoiceData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return <ChoixLingeItem onEventEmit={handleEventEmit} choixItem={item} />
                }}
            />

            <TouchableOpacity style={styles.nextContainer}  onPress={()=>navigation.navigate('resumeList', listOfChoises)}>
                <Text style={styles.next}>Continuer</Text>
            </TouchableOpacity>
  
      {/* Snackbar */}

      <Snackbars
        visible={showSnackbar} // Prop pour gérer l'affichage de la Snackbar
        onClose={() => setShowSnackbar(false)} // Prop pour gérer la fermeture de la Snackbar
        message={snackMessage}
      />
        </View>
        
    )
}

export default ChoixLinge;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position:'relative',
        flexDirection:'column'
    },

    flatList: {
        width: '100%',
    },

    nextContainer: {
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:"30%",
        paddingRight:"30%",
        backgroundColor: '#000',
        marginBottom:"10%",
        borderRadius:10,
        marginTop:20
    },

    next: {
        color: '#FFF',
        display: 'flex',
        fontSize:20
    }
})