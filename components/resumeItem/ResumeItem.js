import React from "react";
import { View,Text,StyleSheet } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from "react-native-gesture-handler";


const ResumeItem = ({resumeElement,onEventEmit}) => {

    // const update = (element)=>{
    //     onEventEmit(element)
    // }

    // const deleteResume = ({element}) =>{
    //     onEventEmit({element:element, main:"delete"})
    // }

    const action = (element, action) => {
        onEventEmit({element,action})

    }
    return(
        <View style={styles.card}>

            <View style={styles.line1}>
            <Text style={styles.libelle}>{resumeElement.libelle}</Text>
            <Text style={styles.price}>{resumeElement.price} Fcfa</Text>
            </View>

            <View style={styles.line2}>
            <Text style={styles.quantite}>Qte: {resumeElement.quantite}</Text>

            <View style={styles.actionBlock}>
                <TouchableOpacity style={styles.actionBtn} onPress={ () => action(resumeElement,"update")}><Feather name="edit"  style={styles.icon}/></TouchableOpacity>    
                <TouchableOpacity style={styles.actionBtn} onPress={ () => action(resumeElement, "delete")}><MaterialCommunityIcons name="delete" style={styles.icon}/></TouchableOpacity>
            </View>

            </View>
            
        </View>
    )
}

export default ResumeItem

const styles = StyleSheet.create({

    card:{
        backgroundColor:"#FFF",
        marginTop:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        borderRadius:15
    },
    line1:{
       display:"flex",
       flexDirection:"row",
       justifyContent:"space-between"
    },
    line2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:15,

    },
    actionBlock:{
        display:'flex',
        flexDirection:'row',
        width:"30%",
        justifyContent:"space-between"
    },
    libelle:{
       fontSize:20,
    },
    price:{
        fontSize:20,
        color:'#0fccce'
    },
    quantite:{
      fontSize:20,
      
    },
    icon:{
        display:"flex",
        fontSize:22,
        padding:10,
        color:'#0fccce'
    },
    actionBtn:{
        borderRadius:100/2,
        backgroundColor:"#eeeeee",
    }


})