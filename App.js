// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SplashScreen from './Screens/SplashScreen';
// import GetStartedScreen from './Screens/GetStartedScreen';
// import AuthenticationScreen from './Screens/AuthenticationScreen';
// import HomeScreen from './Screens/HomeScreen';
// import SymptomCheckerScreen from './Screens/SymptomCheckerScreen';
// import ConditionDetailScreen from './Screens/ConditionDetailScreen';
// import FirstAidScreen from './Screens/FirstAidScreen';
// import MedicalFacilitiesScreen from './Screens/MedicalFacilitiesScreen';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* Set the initial route to the SplashScreen */}
//         <Stack.Screen
//           name="SplashScreen"
//           component={SplashScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="GetStartedScreen"
//           component={GetStartedScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="AuthenticationScreen"
//           component={AuthenticationScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="SymptomChecker"
//           component={SymptomCheckerScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="ConditionDetail"
//           component={ConditionDetailScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="FirstAid"
//           component={FirstAidScreen}
//           options={{ headerShown: false }}
//         />

//         <Stack.Screen
//           name="MedicalFacilities"
//           component={MedicalFacilitiesScreen}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import SplashScreen from './Screens/SplashScreen';
import GetStartedScreen from './Screens/GetStartedScreen';
import AuthenticationScreen from './Screens/AuthenticationScreen';
import HomeScreen from './Screens/HomeScreen';
import SymptomCheckerScreen from './Screens/SymptomCheckerScreen';
import ConditionDetailScreen from './Screens/ConditionDetailScreen';
import FirstAidScreen from './Screens/FirstAidScreen';
import MedicalFacilitiesScreen from './Screens/MedicalFacilitiesScreen';

const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Set the initial route to the SplashScreen */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GetStartedScreen"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SymptomChecker"
          component={SymptomCheckerScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ConditionDetail"
          component={ConditionDetailScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="FirstAid"
          component={FirstAidScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MedicalFacilities"
          component={MedicalFacilitiesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
