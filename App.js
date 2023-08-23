import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import SplashScreen from "./Screens/SplashScreen";
import GetStartedScreen from "./Screens/GetStartedScreen";
import AuthenticationScreen from "./Screens/AuthenticationScreen";
import HomeScreen from "./Screens/HomeScreen";
import SymptomCheckerScreen from "./Screens/SymptomCheckerScreen";
import ConditionDetailScreen from "./Screens/ConditionDetailScreen";
import MedicalFacilitiesScreen from "./Screens/MedicalFacilitiesScreen";

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
			<Stack.Navigator initialRouteName="HomeScreen">
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{headerShown: false}}
				/>
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
					name="SymptomChecker"
					component={SymptomCheckerScreen}
					options={{headerShown: false}}
				/>
				<Stack.Screen
					name="ConditionDetail"
					component={ConditionDetailScreen}
					options={{headerShown: false}}
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
