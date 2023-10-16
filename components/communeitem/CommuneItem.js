
import React from "react";
import { View, Text, TouchableOpacity , StyleSheet} from "react-native";


const CommuneItem = ({commune, onEventEmit, active=false}) =>{
    let styleDuTexte = {};
    let styleTouchable = {}
    active  ? styleTouchable = styles.touchableActive : styleTouchable = styles.commune

    if(active){
        styleDuTexte = styles.communeActive
        
    }

    const getCommune = ()=>{
        console.log(commune)
        onEventEmit(commune)
    }

    return(
            <TouchableOpacity style={styleTouchable} onPress={()=>getCommune()}>
                <Text style={styleDuTexte}>{commune.libelle}</Text> 
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    commune:{
        paddingHorizontal:5,
        marginHorizontal:10,
        paddingVertical:7,
        borderBottomWidth:1,
        borderBottomColor:"transparent"
    },
    touchableActive:{
        paddingHorizontal:5,
        marginHorizontal:10,
        paddingVertical:7,
        borderBottomWidth:1,
        borderBottomColor:"#063970",
    },
    communeActive:{
        color:"#063970",
    }

})

export default CommuneItem;