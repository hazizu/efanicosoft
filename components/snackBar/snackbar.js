import React,{useState} from "react";
import { Snackbar } from "react-native-paper";
import { View, Text } from "react-native";

const Snackbars = ({visible, onClose, message }) => {

    return (
        <View style={{ position: 'absolute', start: 0 , end: 16,top:100, flex: 1, flexDirection:"row", width:'100%', justifyContent:"center", alignItems:'center' , zIndex:3, backgroundColor:'red'}}>
        <Snackbar
          visible={visible}
          onDismiss={onClose}
        
          action={{
            label: 'Fermer',
            onPress: onClose,
            textColor:'black'
          }}
            style={{ backgroundColor:'orange' }}
        >
          
        <Text style={{ color:'black'}}>
            {message}
            </Text>
        </Snackbar>
      </View>

    )

}
export default Snackbars;