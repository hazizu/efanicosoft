import React,{useState} from "react";
import { Snackbar } from "react-native-paper";
import { View, Text } from "react-native";

const Snackbars = ({visible, onClose, message }) => {

    return (
        <View style={{ flex: 1, flexDirection:"row", width:'100%', justifyContent:"center", alignItems:'center' }}>
        <Snackbar
          visible={visible}
          onDismiss={onClose}
        
          action={{
            label: 'Fermer',
            onPress: onClose,
            textColor:'black'
          }}
            style={{ position: 'absolute', start: 16 , end: 16, bottom:20, backgroundColor:'orange' }}
        >
          
        <Text style={{ color:'black'}}>
            {message}
            </Text>
        </Snackbar>
      </View>

    )

}
export default Snackbars;