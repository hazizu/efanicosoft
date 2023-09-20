import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton,SlideAnimation } from 'react-native-popup-dialog';
import { color } from 'react-native-reanimated';
import { observer } from 'mobx-react';
import stores from '../../Store/store';
import { autorun } from 'mobx';



const Profile = observer(({ navigation })=> {

    useEffect(() => {
        const handleStoreUpdate = () =>{
            const list = stores.listeCommande
            // console.log('list des dfsdgsg commandes',list)
        }
        handleStoreUpdate()
        const unsubscribe = autorun(handleStoreUpdate)
        return () => {
            unsubscribe(); // Désabonnez-vous de l'observation lors du démontage du composant
          };
        
    },[])

    const [visible, setVisible] = useState(false);

    const createTwoButtonAlert = () =>
    Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnectez ?', [
      {
        text: 'NON',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OUI', onPress: () => logOut()},
    ]);

    const logOut = ()=>{
            navigation.navigate('pageAccueil')
    }

    const showDialog = () =>{
        setVisible(true);
    }

    const hideDialog = () => {
        setVisible(false);
      }

    return (

        <View style={styles.container}>
            <Text style={styles.deconctBtn} onPress={createTwoButtonAlert}>Déconexion</Text>

             {/* <Dialog 
               visible={visible}
                onTouchOutside={hideDialog}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                footer={
                    <DialogFooter>
                      <DialogButton 
                        text="NON"
                        onPress={() => {hideDialog()}}
                      />
                      <DialogButton
                        text="OUI"
                        onPress={() => {logOut()}}
                      />
                    </DialogFooter>
                  }
            >
                <DialogContent style={styles.dialogContent}>
                    <Text style={styles.dialogText}>Voulez-vous vraiment vous déconnecter ?</Text>
                </DialogContent>
            </Dialog> */}
        </View>
    );


});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },


    deconctBtn: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },

    dialogContent:{
       
    },
    dialogText:{
       fontSize:20,
       textAlign:"center",
       paddingTop:20
    }

})

export default Profile;