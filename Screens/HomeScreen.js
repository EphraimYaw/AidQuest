// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';

// const API_KEY = '41c80afea5774082957131d941028885';

// const HomeScreen = () => {
//   const [healthNews, setHealthNews] = useState([]);
//   const carouselRef = useRef(null);
//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchHealthNews();
//   }, []);

//   useEffect(() => {
//     startCarouselAutoPlay();
//   }, []);

//   const fetchHealthNews = async () => {
//     try {
//       const response = await fetch(
//         `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`
//       );
//       const data = await response.json();

//       if (data.status === 'ok') {
//         setHealthNews(data.articles);
//       } else {
//         console.log('Error fetching health news:', data.message);
//       }
//     } catch (error) {
//       console.log('Error fetching health news:', error);
//     }
//   };

//   const startCarouselAutoPlay = () => {
//     carouselRef.current?.startAutoplay();
//   };

//   const handleSnapToItem = (index) => {
//     if (index === healthNews.length - 1) {
//       carouselRef.current?.snapToItem(0);
//     }
//   };

//   const renderNewsItem = ({ item }) => {
//     const { title, urlToImage, publishedAt } = item;
//     const newsTime = new Date(publishedAt).toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });

//     return (
//       <View style={styles.newsCard}>
//         <Image source={{ uri: urlToImage }} style={styles.newsImage} />
//         <View style={styles.newsOverlay}>
//           <Text numberOfLines={2} style={styles.newsItemCaption}>
//             {title}
//           </Text>
//           <Text style={styles.newsTime}>{`Published at ${newsTime}`}</Text>
//         </View>
//       </View>
//     );
//   };

//   const handleCheckSymptoms = () => {
//     navigation.navigate('SymptomChecker');
//   };

//   const handleViewMedicalFacilitiesScreen = () => {
//     navigation.navigate('MedicalFacilities');
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.menuButton}>
//           <MaterialIcons name="menu" size={35} color="black" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.greeting}>Hello James</Text>
//         <Text style={styles.lightText}>Let's check in on your health today.</Text>

//         {/* Weather Container */}
//         <View style={styles.weatherContainer}>
//           <View style={styles.weatherInfoContainer}>
//             <Text style={styles.livelocation}>Your location</Text>
//             <Text style={styles.weatherInfo}>Sunny</Text>
//           </View>
//           <Text style={styles.Today}>Today</Text>
//           <Text style={styles.Temperature}>28°C</Text>
//         </View>

//         <View style={styles.squarecontainer}>
//           <Text style={styles.caption}>Don't let your symptoms go unchecked</Text>
//           <TouchableOpacity style={styles.button} onPress={handleCheckSymptoms}>
//             <Text style={styles.buttonText}>Check Symptoms</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.newsContainer}>
//           <Text style={styles.newsTitle}>Health News</Text>
//           <Carousel
//             ref={carouselRef}
//             data={healthNews}
//             renderItem={renderNewsItem}
//             sliderWidth={300}
//             itemWidth={200}
//             autoplay={true}
//             autoplayInterval={5000}
//             onSnapToItem={handleSnapToItem}
//           />
//         </View>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
//           <MaterialIcons name="home" size={32} color="black" />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.footerButton}
//           onPress={handleViewMedicalFacilitiesScreen}
//         >
//           <MaterialIcons name="location-on" size={32} color="black" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.footerButton}>
//           <MaterialIcons name="person" size={32} color="black" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F8FF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 60,
//   },
//   menuButton: {
//     padding:2,
//     borderRadius:8,
//     borderColor: '#D3D3D3', // Light blue color
//     borderWidth:0.5, // Border width
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   greeting: {
//     fontSize:32,
//     fontWeight: 'bold',
//     marginTop: 24,
//   },
//   lightText: {
//     fontSize: 14,
//     color: '#888888',
//     marginBottom: 24,
//   },
//   weatherContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 16,
//     flexDirection: 'row', // Display items in a row
//     justifyContent: 'space-between', // Space items evenly along the row
//     alignItems: 'center', // Align items vertically
//     borderColor: '#D3D3D3', // Light blue color
//     borderWidth: 0.5, // Border width
//   },
//   weatherInfoContainer: {
//     flex: 1, // Take available space while allowing the temperature to stay fixed
//   },
//   livelocation: {
//     fontSize: 16,
//     marginBottom: 2,
//     color: '#888888',
//   },
//   weatherInfo: {
//     fontSize: 20,
//   },
//   Temperature: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop:20,
//   },
//   Today: {
//     fontSize: 16,
//     color: '#888888',
//     marginBottom:25,
//     textAlign: 'right', // Align text to the right
//     marginRight:-40,// Take available space to push the text to the right
//   },
//   squarecontainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 24,
//     alignItems: 'flex-start', // Align items to the left
//     borderColor: '#D3D3D3', // Light blue color
//     borderWidth:0.5, // Border width
//   },
//   caption: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'left', // Align text to the left
//     maxWidth: 200,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius:8,
//     alignItems: 'center',
//     alignSelf: 'flex-start', // Align button to the left
//     marginTop:-5,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   newsContainer: {
//     marginTop:0,
//   },
//   newsTitle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   newsCard: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginRight: 16,
//   },
//   newsImage: {
//     width: 200,
//     height: 120,
//     resizeMode: 'cover',
//   },
//   newsOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 8,
//   },
//   newsItemCaption: {
//     fontSize: 14,
//     color: '#FFFFFF',
//   },
//   newsTime: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     marginTop: 4,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 8,
//   },
//   footerButton: {
//     alignItems: 'center',
//   },
//   footerButtonText: {
//     fontSize:32,
//     marginTop: 4,
//   },
// });

// export default HomeScreen;

import React, {useEffect, useState, useRef} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import Carousel from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native"; // Import useNavigation
import CustomNavBar from "../Components/Customnavbar"; // Adjust the import path

import {MaterialIcons} from "@expo/vector-icons";

// Firebase authentication
import {FIREBASE_AUTH, FIREBASE_DATABASE} from "../firebase";

const API_KEY = "41c80afea5774082957131d941028885";

const HomeScreen = () => {
	const [healthNews, setHealthNews] = useState([]);
	const carouselRef = useRef(null);
	const navigation = useNavigation(); // Assign the useNavigation hook

	useEffect(() => {
		fetchHealthNews();
		startCarouselAutoPlay();
	}, []);

	const fetchHealthNews = async () => {
		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`
			);
			const data = await response.json();

			if (data.status === "ok") {
				setHealthNews(data.articles);
			} else {
				console.log("Error fetching health news:", data.message);
			}
		} catch (error) {
			console.log("Error fetching health news:", error);
		}
	};

	const startCarouselAutoPlay = () => {
		carouselRef.current?.startAutoplay();
	};

	const handleSnapToItem = (index) => {
		if (index === healthNews.length - 1) {
			carouselRef.current?.snapToItem(0);
		}
	};

	const renderNewsItem = ({item}) => {
		const {title, urlToImage, publishedAt} = item;
		const newsTime = new Date(publishedAt).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});

		return (
			<View style={styles.newsCard}>
				<Image source={{uri: urlToImage}} style={styles.newsImage} />
				<View style={styles.newsOverlay}>
					<Text numberOfLines={2} style={styles.newsItemCaption}>
						{title}
					</Text>
					<Text style={styles.newsTime}>{`Published at ${newsTime}`}</Text>
				</View>
			</View>
		);
	};

	const handleCheckSymptoms = () => {
		navigation.navigate("SymptomChecker"); // Now navigation should work correctly
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity style={styles.menuButton}>
					<MaterialIcons name="menu" size={35} color="black" />
				</TouchableOpacity>

				<TouchableOpacity
					className="w-4/6 bg-greyb py-2"
					onPress={() => FIREBASE_AUTH.signOut()}>
					<Text className="text-greyb6 text-center">Logout</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<Text style={styles.greeting}>Hello James</Text>
				<Text style={styles.lightText}>
					Let's check in on your health today.
				</Text>

				{/* Weather Container */}
				{/* Add weather container content */}

				<View style={styles.squarecontainer}>
					<Text style={styles.caption}>
						Don't let your symptoms go unchecked
					</Text>
					<TouchableOpacity style={styles.button} onPress={handleCheckSymptoms}>
						<Text style={styles.buttonText}>Check Symptoms</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.newsContainer}>
					<Text style={styles.newsTitle}>Health News</Text>
					<Carousel
						ref={carouselRef}
						data={healthNews}
						renderItem={renderNewsItem}
						sliderWidth={300}
						itemWidth={200}
						autoplay={true}
						autoplayInterval={5000}
						onSnapToItem={handleSnapToItem}
					/>
				</View>
			</View>

			<CustomNavBar />
		</View>
	);
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F8FF',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 60,
//   },
//   menuButton: {
//     padding: 2,
//     borderRadius: 8,
//     borderColor: '#D3D3D3',
//     borderWidth: 0.5,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   greeting: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginTop: 24,
//   },
//   lightText: {
//     fontSize: 14,
//     color: '#888888',
//     marginBottom: 24,
//   },
//   squarecontainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 24,
//     alignItems: 'flex-start',
//     borderColor: '#D3D3D3',
//     borderWidth: 0.5,
//   },
//   caption: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'left',
//     maxWidth: 200,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     alignSelf: 'flex-start',
//     marginTop: -5,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   newsContainer: {
//     marginTop: 0,
//   },
//   newsTitle: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   newsCard: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginRight: 16,
//   },
//   newsImage: {
//     width: 200,
//     height: 120,
//     resizeMode: 'cover',
//   },
//   newsOverlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     padding: 8,
//   },
//   newsItemCaption: {
//     fontSize: 14,
//     color: '#FFFFFF',
//   },
//   newsTime: {
//     fontSize: 12,
//     color: '#FFFFFF',
//     marginTop: 4,
//   },
// });

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F8FF", // Update to your light gray color
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingTop: 60,
		justifyContent: "space-between",
	},
	menuButton: {
		padding: 2,
		borderRadius: 8,
		borderColor: "#D3D3D3", // Update to your light gray color
		borderWidth: 0.5,
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	greeting: {
		fontSize: 32,
		fontWeight: "bold",
		marginTop: 24,
	},
	lightText: {
		fontSize: 14,
		color: "#888888", // Update to your teal color
		marginBottom: 24,
	},
	squarecontainer: {
		backgroundColor: "white",
		borderRadius: 8,
		padding: 10,
		marginBottom: 24,
		alignItems: "flex-start",
		borderColor: "#D3D3D3", // Update to your light gray color
		borderWidth: 0.5,
	},
	caption: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "left",
		maxWidth: 200,
	},
	button: {
		backgroundColor: "#007AFF", // Update to your teal color
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		alignSelf: "flex-start",
		marginTop: -5,
	},
	buttonText: {
		color: "#FFFFFF", // Update to your white color
		fontSize: 16,
		fontWeight: "bold",
	},
	newsContainer: {
		marginTop: 0,
	},
	newsTitle: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 16,
	},
	newsCard: {
		borderRadius: 8,
		overflow: "hidden",
		marginRight: 16,
	},
	newsImage: {
		width: 200,
		height: 120,
		resizeMode: "cover",
	},
	newsOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		padding: 8,
	},
	newsItemCaption: {
		fontSize: 14,
		color: "#FFFFFF", // Update to your white color
	},
	newsTime: {
		fontSize: 12,
		color: "#FFFFFF", // Update to your white color
		marginTop: 4,
	},
});

export default HomeScreen;
