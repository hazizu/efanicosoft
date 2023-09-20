import {makeAutoObservable} from 'mobx'


class Stores{
     listeCommande = any = [];

     constructor() {
        makeAutoObservable(this)
    }
    

     setListCommande(listCommande){
        this.listeCommande = listCommande
    }
}

const stores = new Stores();
export default stores