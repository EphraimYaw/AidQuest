import React, {useState} from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

// Imports for firebase
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../firebase";

const AuthenticationScreen = () => {
	const [showRegistration, setShowRegistration] = useState(false);
	const [acceptTerms, setAcceptTerms] = useState(false);
	const navigation = useNavigation();

	// const [firstName, setFirstName] = useState("");
	// const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const auth = FIREBASE_AUTH;
	const db = FIREBASE_DATABASE; // Reference to Firebase Realtime Database

	// Loading
	const [loading, setLoading] = useState("");

	const handleSignIn = async () => {
		// Logic for sign-in with email and password
		setLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			console.log(response);
		} catch (error) {
			console.log(error);
			alert("Sign in failed");
		} finally {
			setLoading(false);
		}

		// Navigate to the Home screen
		navigation.navigate("HomeScreen");
	};

	const handleSignInWithGoogle = () => {
		// Logic for sign-in with Google
	};

	const handleForgotPassword = () => {
		// Logic for forgot password
	};

	const handleSignUp = () => {
		setShowRegistration(true);
	};

	const handleRegister = async () => {
		// Logic for user registration

		setLoading(true);
		try {
			// Create the user with email and password
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// Get the user's UID from the response
			const uid = response.user.uid;

			// Store additional user data (username and full name) in Firebase
			await db.ref(`users/${uid}`).set({
				username: username,
				fullName: fullName,
			});

			console.log(response);
			alert("Account created successfully!");
		} catch (error) {
			console.log(error);
			alert("Registration failed");
		} finally {
			setLoading(false);
		}
	};

	const handleBack = () => {
		setShowRegistration(false);
		setAcceptTerms(false);
	};

	if (showRegistration) {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Begin your experience</Text>

				{/* <TextInput
					style={styles.input}
					placeholder="First Name"
					autoCapitalize="none"
					onChangeText={(newFirstName) => setFirstName(newFirstName)}
					value={firstName}
				/> */}

				{/* <TextInput
					style={styles.input}
					placeholder="Last Name"
					autoCapitalize="none"
					onChangeText={(newLastName) => setLastName(newLastName)}
					value={lastName}
				/> */}

				<TextInput
					style={styles.input}
					placeholder="Email Address"
					autoCapitalize="none"
					onChangeText={(newEmail) => setEmail(newEmail)}
					value={email}
				/>

				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					onChangeText={(newPassword) => setPassword(newPassword)}
					value={password}
				/>

				{/* <TextInput
					style={styles.input}
					placeholder="Confirm Password"
					secureTextEntry
				/> */}

				<View style={styles.checkboxContainer}>
					<TouchableOpacity
						style={styles.checkbox}
						onPress={() => setAcceptTerms(!acceptTerms)}>
						{acceptTerms && <AntDesign name="check" size={16} color="black" />}
					</TouchableOpacity>
					<Text style={styles.checkboxLabel}>
						I accept the Terms and Policies
					</Text>
				</View>

				<TouchableOpacity
					style={[styles.button, !acceptTerms && styles.disabledButton]}
					onPress={handleRegister}
					disabled={!acceptTerms}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.googleButton}
					onPress={handleSignInWithGoogle}>
					<Text style={styles.googleButtonText}>Sign Up with Google</Text>
				</TouchableOpacity>

				<View style={styles.signInContainer}>
					<Text style={styles.signInText}>Already have an account?</Text>
					<TouchableOpacity onPress={() => setShowRegistration(false)}>
						<Text style={styles.signInLinkText}> Sign In</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login to continue</Text>

			<TextInput
				style={styles.input}
				placeholder="Email Address"
				autoCapitalize="none"
				onChangeText={(newEmail) => setEmail(newEmail)}
				value={email}
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				onChangeText={(newPassword) => setPassword(newPassword)}
				value={password}
			/>

			<TouchableOpacity style={styles.button} onPress={handleSignIn}>
				<Text style={styles.buttonText}>Sign In</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.googleButton}
				onPress={handleSignInWithGoogle}>
				<Text style={styles.googleButtonText}>Sign In with Google</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.forgotPasswordButton}
				onPress={handleForgotPassword}>
				<Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
			</TouchableOpacity>

			<View style={styles.signUpContainer}>
				<Text style={styles.signUpText}>Don't have an account?</Text>
				<TouchableOpacity onPress={handleSignUp}>
					<Text style={styles.signUpLinkText}> Sign Up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		paddingHorizontal: 20,
		marginTop: 100,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 35,
	},
	input: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#CCCCCC",
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	button: {
		width: "100%",
		height: 50,
		backgroundColor: "#01186F",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginBottom: 16,
	},
	disabledButton: {
		backgroundColor: "#01186F",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	googleButton: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		borderColor: "#01186F",
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		marginBottom: 16,
	},
	googleButtonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#01186F",
	},
	forgotPasswordButton: {
		alignSelf: "flex-end",
		marginBottom: 16,
	},
	forgotPasswordButtonText: {
		color: "#01186F",
		fontSize: 14,
		fontWeight: "bold",
	},
	signUpContainer: {
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 150,
	},
	signUpText: {
		fontSize: 14,
		color: "black",
	},
	signUpLinkText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "black",
	},
	signInContainer: {
		marginTop: 80,
		flexDirection: "row",
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	signInText: {
		fontSize: 14,
		color: "black",
	},
	signInLinkText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "black",
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderWidth: 1,
		borderColor: "#CCCCCC",
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	checkboxInner: {
		width: 12,
		height: 12,
		borderRadius: 3,
		backgroundColor: "black", // Set the background color to black
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxLabel: {
		fontSize: 14,
	},
});

export default AuthenticationScreen;
