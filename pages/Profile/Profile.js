import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity,Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { observer } from 'mobx-react';
import stores from '../../Store/store';
import { autorun } from 'mobx';
import { RNCamera } from 'react-native-camera';

import FlashModeService from '../../services/cameraService/FlashModeService';
import CameraService from '../../services/cameraService/CameraService';
import useCamera from '../../components/useCamera';
import useCallbackRef from '../../components/useCallbackRef';
import{BottomSheetModal,BottomSheetModalProvider} from "@gorhom/bottom-sheet"

import { action, reaction } from "mobx";

const flashModeService = new FlashModeService();
const cameraService = new CameraService();




const Profile = observer(({ navigation })=> {

  
  const [flashMode, setFlashMode] = useState(RNCamera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [cameraImage, setCameraImage] = useState()
  const [ isOpen, setIsOpen] = useState(false)
  const {ref, callbackRef} = useCallbackRef();
  const {
    seconds,
    recording,
    takePicture,
    startRecordingVideo,
    stopRecordingVideo,
  } = useCamera(ref);


  const onTorchPress = () => {
    setFlashMode(flashModeService.getNewFlashMode(flashMode));
  };

  const changeCameraType = () => {
    setCameraType(cameraService.getNewCameraType(cameraType));
  };

  function handlePresentModal(){
    bottomSheetModalRef.current?.present();
  }

  const closeModal = (element) =>{
    bottomSheetModalRef.current?.dismiss()
    setIsOpen(false)
    
  }

  const bottomSheetModalRef = React.useRef(null);
  const snapPoints = ["50%"];











    useEffect(() => {
     
        const handleStoreUpdate = () =>{
            const list = stores.listeCommande
            const camImage = stores.cameraImage
            console.log('list des dfsdgsg commandes',list)
            console.log('image camera ok ok ',camImage) 
            setCameraImage(camImage)
            if(camImage){
              handlePresentModal()
            }
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
      <BottomSheetModalProvider style={styles.container}>

        <View style={styles.container}>

<RNCamera
        ratio={'16:9'}
        ref={callbackRef}
        style={styles.camera}
        type={cameraType}
        flashMode={flashMode}
        captureAudio={true}>
        <View style={styles.header}>

          <TouchableOpacity onPress={navigation.goBack} style={styles.closeblock}>
            <Image
              source={require('./../../assets/fermer.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity> 
          {/* {recording && (
            <View style={styles.timer}>
              <Text style={styles.timerText}>Time remaining</Text>
              <View style={styles.timeContainer}>
                <View style={styles.dot} />
                <Text style={styles.timerText}>00:{seconds}</Text>
              </View>
            </View>
          )} */}
        
        </View>
        <View style={styles.captureContainer}>

        {cameraService.isBackCamera(cameraType) && (
            <TouchableOpacity onPress={onTorchPress} style={styles.flashBlock}>
              <Image
                source={require('./../../assets/eclat.png')}
                style={styles.torchIcon}
              />
            </TouchableOpacity>
          )}


          <TouchableOpacity
            onPress={takePicture}
            onLongPress={startRecordingVideo}
            onPressOut={stopRecordingVideo}
            style={[
              styles.captureButton,
              recording ? styles.captureButtonInProgress : null,
            ]}
          >
            <Image
            source={require('./../../assets/camera(1).png')}
            style={styles.captureIcon}
            />
            </TouchableOpacity>
          <TouchableOpacity style={styles.switchCamera} onPress={changeCameraType} disabled={recording}>
            <Image
              source={require('./../../assets/camera.png')}
              style={styles.switchCameraIcon}
            />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.footer}>
          <Text style={styles.footerText}>Hold for video, tap for photo</Text>
        </View> */} 

    
      </RNCamera>

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
              <View style={styles.camPick}>
               <Image style={styles.imagePick} source={{uri:cameraImage}}/> 
               </View>
                {/* <TouchableOpacity style={styles.closeModalBtn} onPress={ closeModal}>
                    <Text>Fermer</Text>
               </TouchableOpacity> */}
            </BottomSheetModal>






























            {/* <Text style={styles.deconctBtn} onPress={createTwoButtonAlert}>Déconexion</Text> */}

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
        </BottomSheetModalProvider>
    );


});

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
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
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  
   
    switchCamera:{
      backgroundColor:"#fff",
      width:60,
      height:60,
      borderRadius:100/2,
      position:"absolute",
      bottom:0,
      display:"flex",
      flexDirection:"column",
      justifyContent:'center',
      alignItems:"center",
      right:10,
      borderWidth:2.5
    },

    switchCameraIcon:{
      width:40,
      height:40,
    },


    camera:{
      flex:1
    },
    flashBlock:{
      backgroundColor:"#fff",
      width:60,
      height:60,
      borderRadius:100/2,
      position:"absolute",
      left:10,
      bottom:0,
      display:"flex",
      flexDirection:"column",
      justifyContent:'center',
      alignItems:"center",
      right:10,
      borderWidth:2.5
      

    },
    torchIcon:{
      width:40,
      height:40,
    }
    ,
    captureContainer:{
      height:70,
      position:"absolute",
      bottom:10,
      width:"100%",
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      zIndex:2
    },
    captureButton:{
      backgroundColor:"#fff",
      width:80,
      height:80,
      position:"absolute",
      bottom:0,
      borderRadius:100/2
    },
    captureIcon:{
      width:80,
      height:80
    },
    header:{
     display:"flex",
     flexDirection:"row",
     justifyContent:"flex-end"
    },
    closeblock:{
      backgroundColor:"#fff",
      width:40,
      height:40,
      marginRight:10,
      marginTop:50,
      borderRadius:100/2,
      

    },
    closeIcon:{
      width:40,
      height:40
     },
     imagePicked:{
     flex:1,
      zIndex:1,
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"

     },
     imagePick:{
      width:350,
      height:350,
      borderRadius:10
     },
     closeCapture:{
      backgroundColor:"#fff"
     },
     sheetContainer:{
      zIndex:2,
      position:'relative',
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
  },
  closeModalBtn:{
      position:"absolute",
      right:15,
      backgroundColor:"#c2c2c2b5",
      padding:10,
      borderRadius:15,
  },
  camPick:{
    height:"100%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center"
  }

})

export default Profile;