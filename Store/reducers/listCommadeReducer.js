import { LIST_COMMANDE } from "../storeConsts";

const initialState = {
    listCommande : []
};


const listCommandeReducer = (state = initialState, action)=>{
    switch(action.type){
        case LIST_COMMANDE:
            return{
                ...state,
                listCommande:action.payload
            };
        default:
            return state

    }

}

export default listCommandeReducer;