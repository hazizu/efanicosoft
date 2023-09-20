import axios from 'axios'


export const getRequest = (url) =>{
    return new Promise((resolve, reject)=>{
        axios.get(url).then(
            (res)=>{
                resolve(res)
            },(err)=>{
                reject(err)
            }
        )
    })

}