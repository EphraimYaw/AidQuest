import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import SplashScreen from "./Screens/SplashScreen";
import GetStartedScreen from "./Screens/GetStartedScreen";
import AuthenticationScreen from "./Screens/AuthenticationScreen";
import HomeScreen from "./Screens/HomeScreen";
import SymptomCheckerScreen from "./Screens/SymptomCheckerScreen";
import Symptomquestionnaire from "./Screens/Symptomquestionnaire";
import DiagnosisResultScreen from "./Screens/DiagnosisResultScreen";
import MedicalFacilitiesScreen from "./Screens/MedicalFacilitiesScreen";
import NewsDetailScreen from "./Screens/NewsDetailScreen"
import DiagnosisInfoScreen from "./Screens/DiagnosisInfoScreen";
import IssuesInfoScreen from "./Screens/IssuesInfoScren.";

// firebase

import {FIREBASE_AUTH} from "./firebase";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GetStartedScreen"
          component={GetStartedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{headerShown: false}}
        /> 
     <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen name="NewsDetail" 
        component={NewsDetailScreen}
        options={{headerShown: false}} />

        <Stack.Screen
          name="Symptomquestionnaire"
          component={Symptomquestionnaire}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SymptomChecker"
          component={SymptomCheckerScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name="DiagnosisResult"
        component={DiagnosisResultScreen}
        options={{headerShown: false}} />

        <Stack.Screen
          name="DiagnosisInfoScreen"
          component={DiagnosisInfoScreen}
          options={{ headerShown: false }}
        />
		<Stack.Screen
          name="IssuesInfoScreen"
          component={IssuesInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MedicalFacilities"
          component={MedicalFacilitiesScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;