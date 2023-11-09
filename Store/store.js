import {makeAutoObservable} from 'mobx'


class Stores{
     listeCommande = any = [];
     cameraImage = ""
 
     constructor() {
        makeAutoObservable(this)
    }
    

     setListCommande(listCommande){
        this.listeCommande = listCommande
    }
    setCameraImage(cameraImage){
        this.cameraImage = cameraImage
    } 
}

const stores = new Stores();
export default stores