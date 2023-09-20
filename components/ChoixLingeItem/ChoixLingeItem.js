
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from "react-native";


const ChoixLingeItem = ({ choixItem, onEventEmit }) => {

    const [choiceNumber, setChoiceNumber] = useState(0);
    const [unitPrice, setunitPrice] = useState(0);
    const [listCommande, setlistCommande] = useState([]);

    const [loading, setLoading] = useState(false)



    // useEffect(()=>{
    //     setPrice(choixItem.price)
    // })

    const addPanier = () => {
        return (
            <Text style={styles.addBtnlib}>Ajouter au panier à linge</Text>
        )
    }

    const getPlus = (choiced) => {
        const newCount = choiceNumber + 1;
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




    const ajouterObjetsAuTableau = (item) => {
        const index = listCommande.findIndex((existingItem) => existingItem.libelle === item.libelle);

        if (index === -1) {
            alert('exist pas à ajouter')
            setlistCommande((prevItems) => [...prevItems, item]);
        } else {
            alert('exist à remplacer')

            setlistCommande((prevItems) => {
                const updatedItems = [...prevItems];
                updatedItems[index] = item;
                return updatedItems;
            });

        }
    };

    const handleGetAddedItems = () => {
        console.log(addedItems);
    };

    useEffect(() => {
        const all = listCommande
        setlistCommande(all)
        //  console.log('list', all)
        //  stores.setListCommande(all)
        console.log("list des choix", all);

    }, [listCommande]);



    const conf = (element) => {
        if (choiceNumber > 0) {
            const obj = {}
            obj.libelle = element.libelle
            obj.quantite = choiceNumber
            obj.price = unitPrice
            obj.id = element.id
            // ajouterObjetsAuTableau(obj)
            onEventEmit(obj)

        } else {
            alert('impssble to save')
        }

    }







    return (
        <TouchableOpacity style={styles.card} onPress={() => { console.log('def list', listCommande) }}>
            <View style={styles.cardImage}>
                <Image style={{ width: 100, height: 100 }} source={(choixItem.image)}></Image>
            </View>
            <View style={styles.cardInfos}>
                <View style={styles.cardlibelleBloc}>
                    <Text style={styles.cardLibelle}>{choixItem.libelle}</Text>
                    <Text style={styles.cardPrice}>{unitPrice} Fcfa</Text>
                </View>
                <View style={styles.actionCard}>

                    <TouchableOpacity style={styles.cardActionMoin} onPress={() => getMoins(choixItem)}>
                        <Text style={styles.moins}> - </Text>
                    </TouchableOpacity>

                    <Text style={styles.numberChoice}>{choiceNumber}</Text>

                    <TouchableOpacity style={styles.cardActionPlus} onPress={() => getPlus(choixItem)}>
                        <Text style={styles.plus}> + </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.addBtn} onPress={() => conf(choixItem)}>
                    {addPanier()}
                    {/* <Lottie style={styles.lottie} source={require('./../../lotties/95076-loading-dots.json')} autoPlay loop />

                    <Text style={styles.addBtnlib}>Ajouter au panier à linge</Text> */}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>



    )
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        height: 160
    },
    cardlibelleBloc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardInfos: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: "60%"
    },
    actionCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    cardLibelle: {
        fontSize: 18,
        fontWeight: '500'
    },
    cardPrice: {
        fontSize: 20,
        fontWeight: '500',
        textDecorationLine: 'underline',
        color: '#0fccce'
    },
    cardActionMoin: {
        borderWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        borderColor: '#0fccce',

    },
    cardActionPlus: {
        borderEndWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        backgroundColor: '#0fccce',
        borderColor: 'transparent'
    },
    plus: {
        fontSize: 20,
        color: "#FFF"
    },
    moins: {
        fontSize: 20,
        color: '#0fccce'

    },
    addBtn: {
        backgroundColor: '#0fccce',
        padding: 10,
        borderRadius: 10,
        width: "100%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lottie: {
        width: 90,

    },
    addBtnlib: {
        color: '#fff',
        fontSize: 17,
        textAlign: "center"
    },
    numberChoice: {
        fontSize: 25
    }
})

export default ChoixLingeItem;