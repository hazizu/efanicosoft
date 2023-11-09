import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './BottonTab';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import Profile from '../pages/Profile/Profile';
import PrestaireDetails from '../pages/Prestataire/PrestataireDetails';
import PageAccueil from '../pages/PageAccueil/PageAccueil';
import ChoixLinge from '../pages/Choix/ChoixLinge';
import { Background, HeaderTitle } from '@react-navigation/elements';
import { TouchableOpacity, Image } from 'react-native';
import stores from '../Store/store';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { StyleSheet, Text } from 'react-native';
import ResumeListe from '../pages/resume/ResumeList';
import { createStackNavigator } from '@react-navigation/stack';
import SuiviCommande from '../pages/SuiviCommande/SuiviCommande';
import MyMap from '../pages/Map/Map';




const Navigation = observer(() => {

  const [list, setList] = useState([])


  useEffect(() => {
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
  }, []);


  //   useEffect(() => {
  //     const handleStoreUpdate = () =>{
  //       const list = stores.listeCommande
  //        console.log('list commande on list',list)
  //       // if(stores.listeCommande.length){
  //       //   return(
  //       //     <Text style={styles.notifNumber}>{stores.listeCommande.length}</Text>
  //       //   )
  //       // }else{
  //       //   return
  //       // }
  //   }

  //     const unsubscribe = autorun(handleStoreUpdate)
  //     return () => {
  //         unsubscribe(); // Désabonnez-vous de l'observation lors du démontage du composant
  //       };

  // },[])


 
  const Stack = createStackNavigator();

  return (
<NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animationEnabled: true,
        headerMode: 'screen',
      }} initialRouteName='pageAccueil'> 

      <Stack.Screen name="pageAccueil" component={PageAccueil} />

      <Stack.Screen  name="connexion" component={Login}
        options={{ headerShown: true }} />

      <Stack.Screen name="Inscripton" component={Register} 
      options={{ headerShown: true, }} />

      <Stack.Screen name="accueil" component={BottomTab} />

      <Stack.Screen name="prestataireDetail" component={PrestaireDetails} options={{ headerShown: true }} />

      <Stack.Screen name="choix" component={ChoixLinge} options={{
        headerShown: true, headerRight: () => (

          <TouchableOpacity style={styles.notifBlock}>
            <Text style={styles.notifNumber}>{list.length}</Text>
            <Image style={styles.notifBasket} source={require('./../assets/svg/panierLinge.png')} />
          </TouchableOpacity>
        ),
      }} />
      
      <Stack.Screen name="resumeList" component={ResumeListe} options={{
        headerShown: true, headerRight: () => (

          <TouchableOpacity style={styles.notifBlock}>
            {/* <Text style={styles.notifNumber}>{list.length}</Text> */}
            <Image style={styles.notifBasket} source={require('./../assets/svg/panierLingeContent.png')} />
          </TouchableOpacity>
        )
      }} />

      <Stack.Screen
      name='suiviCommande'
      component={SuiviCommande}
      options={{ headerShown: false }}
      />

<Stack.Screen
      name='myMap'
      component={MyMap}
      options={{ headerShown: false }}
      />

    </Stack.Navigator>
    </NavigationContainer>

  );
});

const styles = StyleSheet.create({
  notifNumber: {
    fontSize: 15,
    backgroundColor: "yellow",
    position: "absolute",
    padding: 2,
    top: -10,
    zIndex: 10,
    right: 40,
    borderRadius: 50,
    display: 'flex'

  },
  notifBlock: {
    position: 'relative'
  },
  notifBasket: {
    width: 30,
    height: 30,
    marginRight: 20
  }
})



export default Navigation;

