import React,{useState} from 'react';
import { View, Text,StyleSheet, TouchableOpacity, TextInput,Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {Formik} from 'formik'
import * as Yup from 'yup';
import LottieView from 'lottie-react-native';
import { position } from 'native-base/lib/typescript/theme/styled-system';




const Login = (props) => {

  const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string()
          .min(4, 'Minimum 4 lettres')
        //   .max(50, 'Too Long!')
          .required('Nom utilisateur obligatoire'),
        // email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
          .min(8, 'Au moins 8 caractères')
          .required('Mot de passe obligatoire'),
      });
      

    const goToAccueil = ()=>{
      props.navigation.push('register')

    }
    const connect = ()=>{
        if(loading === false){
           return(
            <Text style={style.connectText}>Se connecter</Text>
           )
        }else{
          return(
            <View style={style.lottieCont}>
            <LottieView style={style.lottie} source={require('./../../../assets/lotties/loading_rapide.json')} autoPlay loop />
            </View>

          )
      

        }
  
      }
      




    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}> 
        <View style={style.container} >

          <View style={style.logoBlock}>
          <Image style={style.logoImg} source={require('./../../../assets/logo/fanico.png')}/>
          </View>
            
       
            <View style={style.title}>

                <Text style={style.titleText}>Connectez-vous</Text>
            </View>

<Formik style={style.forms}
      initialValues={{ name: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setLoading(true)
        setTimeout(()=>{
          console.log(values);
          props.navigation.push('accueil')
        }, 3000)
        
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={style.formBlock}>
          <TextInput style={style.input}
            placeholder="nom utilisateur"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <View style={style.erreurMsg}>
          {touched.name && errors.name ? <Text style={style.erreurText}>{errors.name}</Text> : null}
          </View>

          {/* <TextInput style={style.input}
            placeholder="Email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email ? <Text>{errors.email}</Text> : null} */}

          <TextInput style={style.input}
            placeholder="Mot de passe"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password ? (
           <View style={style.erreurMsg}> 
            <Text style={style.erreurText}>{errors.password}</Text>
            </View>
          ) : null}
           <TouchableOpacity onPress={handleSubmit} style={style.submit}>
           {connect()}
            {/* <Text style={style.connectText}>Se connecter</Text> */}
           </TouchableOpacity>

           <TouchableOpacity onPress={()=>{props.navigation.navigate('Inscripton')}} style={style.gotoRegister}>
             <Text style={style.regsterText}>S'inscrire</Text> 
           </TouchableOpacity>
          {/* <Button onPress={handleSubmit} title="Submit" /> */}
        </View>
      )}
    </Formik>
    
            {/* <View style={style.subCountainer}>
            <Text >login pages</Text>
            <TouchableOpacity>
            <Text onPress={goToRegister} style={style.registerBtn}>Regiser</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <View>
            <Text onPress={goToAccueil} style={style.registerBtn}>Accueil</Text>
            </View>
            </TouchableOpacity>
            </View> */}
   
        </View>
        </TouchableWithoutFeedback>
    );

   
};

const style = StyleSheet.create({
    container:{
       display:'flex',
       flex:1,
       flexDirection:'column',
       position:'relative', 
       alignItems:"center",
    },
    gotoRegister:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      padding:15,
      borderRadius:15,
      marginTop:20,
      borderWidth:1,
      borderColor:'#063970'
    },
    lottieCont:{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
        position:'relative',
        width:'100%',
        height:25
       
       

    },
    lottie:{  
      width:600,
      position:'absolute',
    }, 
   
    regsterText:{
      color:'#063970',
      fontSize:20
    },

    logoImg:{
      width:"100%",
      height:50
    },
    logoBlock:{
      width:"30%",
      marginTop:20
    },
    title:{
     width:"100%",
     marginLeft:20,
     marginTop:80
    },
    formBlock:{
      width:"100%",
      padding:20

    },

    registerBtn:{
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        marginTop:10,
        borderRadius:10,
        borderWidth:1,
        width:100
    },

    input:{
        backgroundColor:"#a8a8a852",
        marginBottom:20,
        marginTop:15,
        height:50,
        padding:10,
        borderRadius:15,
        fontSize:18,
        fontWeight:"300"      
    },

    submit:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#063970',
        padding:15,
        borderRadius:15,
        marginTop:20,
        position:'relative'
    },
    connectText:{
        color:'#FFF',
        fontSize:20
    },
    erreurMsg:{
        marginTop:-10,
    },
    erreurText:{
       color:"red"
    },

   

    titleText:{
        fontSize:30
    }

})

export default Login;