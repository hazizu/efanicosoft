import React,{useEffect, useState, useRef} from "react";
import { StyleSheet, Text, View , TouchableOpacity} from "react-native";
import MapView , {Marker, Polyline, AnimatedRegion} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Entypo from 'react-native-vector-icons/Entypo'


const LATITUDE = 0; // Remplacez par votre latitude
const LONGITUDE = 0; // Remplacez par votre longitude
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;


const MyMap = ({navigation}) => {


  const [location,setLocation] = useState(null)
  const [error, setError] = useState(null);
    const [position, setPosition] = useState({
        latitude: 5.349128256524506,
        longitude: -4.011940864924485,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421, 
        
      });



  

  // const onPositionChange = position => {
  //   const { latitude, longitude } = position.coords;
  //   const newCoordinate = {
  //     latitude,
  //     longitude,
  //   }

  //   if (Platform.OS === 'android' && marker.current) {
  //     marker.current._component.animateMarkerToCoordinate(newCoordinate, 500);
  //   } else {
  //     coordinate.current.timing(newCoordinate).start();
  //   }


  //   setRegion(prevRegion => ({
  //     ...prevRegion,
  //     latitude,
  //     longitude,
  //   }));

  //   setRouteCoordinates(prevRouteCoordinates => [...prevRouteCoordinates, newCoordinate]);

  //   setDistanceTravelled(prevDistance => prevDistance + calcDistance(newCoordinate));

  //   setPrevLatLng(newCoordinate);
  



  



  // useEffect(() => {
  //   const watchID = navigator.geolocation.watchPosition(onPositionChange, error =>
  //     console.log(error)
  //   );

  //   return () => {
  //     navigator.geolocation.clearWatch(watchID);
  //   };
  // }, []);


    useEffect(()=>{
      Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition((pos)=>{
      setLocation(pos.coords)
    // const crd = pos.coords;
        // setPosition({
        //     latitude: crd.latitude,
        //     longitude: crd.longitude,
        //     latitudeDelta: 0.0421,
        //     longitudeDelta: 0.0421,
            
        //   });
        },(erreur)=>{
          setError('Permission to access location was denied or there was an error.',erreur);
        }
        );
 },[])



    return (
        <View style={styles.mapContainer}>
           {/* <MapView style={styles.map} showUserLocation followUserLocation loadingEnabled region={region}>
        <Polyline coordinates={routeCoordinates} strokeWidth={5} />
        <Marker.Animated ref={marker} coordinate={coordinate.current} />
      </MapView> */}
       <TouchableOpacity style={styles.mapBtn} onPress={()=>navigation.push('accueil')}>
        <Entypo name='chevron-left' size={30} color='#063970' />
      </TouchableOpacity>
            <MapView
            
            minZoomLevel={5}
            zoomControlEnabled={true}
            style={styles.map}
            
            showsUserLocation={true}
            showsMyLocationButton={true} 
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            >  
             <Marker
             
             title='Yor are here'
             description='This is a description'
             coordinate={location}/>
             </MapView> 

             <Text style={{position:"absolute", bottom:50, right:"50%"}}>{location?.latitude} / {location?.longitude}</Text>

             
          
          
        </View>

        
    )




    }

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        
    },

    mapBtn:{
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      position:"fixed",
      top: 30,
      left: 10,
      height: 40,
      backgroundColor: '#fff',
      borderRadius: 100,
      zIndex:2

  },
    map: {
        ...StyleSheet.absoluteFillObject,
      },
})



export default MyMap;