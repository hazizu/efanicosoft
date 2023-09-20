
import { LIST_COMMANDE } from "../storeConsts"

export const setlistCommande = (listCommande)=>{
    return{
        type:LIST_COMMANDE,
        payload:listCommande
    }

}