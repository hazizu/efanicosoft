import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Profile from '../pages/Profile/Profile';
import Aide from '../pages/Aide/Aide';
import Prestataire from '../pages/Prestataire/Prestataire'
import Accueil from '../pages/Accueil/Accueil';
import { Button,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const   BottomTab = () => {

    const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator
              initialRouteName="accueil"
              animationEnabled={false}
              screenOptions={{
                tabBarActiveTintColor: '#0fccce',
                
                
              }}
            >
              <Tab.Screen
                name="Disponible"
                component={Accueil}
                options={{
                  tabBarLabel: 'Accueil',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
                }}
              />
                <Tab.Screen
                name="prestataire"
                component={Prestataire}
                options={{
                  tabBarLabel: 'prestataire?',
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="user-cog" color={color} size={size} />
                  ),
                  // tabBarBadge: 3,
                }}
              />
                <Tab.Screen
                name="aide"
                component={Aide}
                options={{
                  tabBarLabel: 'aide',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="help-circle" color={color} size={size} />
                  ),
               
                }}
              />
             
              <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                  tabBarLabel: 'profile',
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="person-pin" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          );
}

export default BottomTab
;

