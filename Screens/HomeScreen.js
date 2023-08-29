import React, {useEffect, useState, useRef} from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	LinearGradient,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native"; // Import useNavigation
import CustomNavBar from "../Components/Customnavbar"; // Adjust the import path

import {MaterialIcons} from "@expo/vector-icons";

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

        {/* Weather Container */}
        {/* Add weather container content */}
      
			<View style={styles.content}>
				<Text style={styles.greeting}>Hello James</Text>
				<Text style={styles.lightText}>
					Let's check in on your health today.
				</Text>

				{/* Weather Container */}
				{/* Add weather container content */}

				<View style={styles.squarecontainer}>
				<Image
    source={require('../assets/Personwithacold-pana.png')} // Update with the path to your image
    style={styles.squareImage}
  />
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FF', // Update to your light gray color
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  menuButton: {
    padding: 2,
    borderRadius: 8,
    borderColor: '#D3D3D3', // Update to your light gray color
    borderWidth: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 24,
  },
  lightText: {
    fontSize: 14,
    color: '#888888', // Update to your teal color
    marginBottom: 24,
  },
  

  squarecontainer: {
    backgroundColor: '#ADD8E6',
    borderRadius: 20,
    padding: 20, // Adjusted padding
    marginBottom: 16, // Adjusted margin
    alignItems: 'flex-start',
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
  },
  caption: {
    fontSize: 22, // Adjusted font size
    fontWeight:'800',
    marginBottom: 20, // Adjusted margin
    textAlign: 'left',
    maxWidth: 150, // Adjusted maximum width
    color: 'white', // Adjusted text color
  },
  button: {
    backgroundColor: '#4682B4',
    padding: 10, // Adjusted padding
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: -5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14, // Adjusted font size
    fontWeight: 'bold',
  },

  
  newsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  newsCard: {
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },

newsImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  newsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white', // Change overlay background to white with some opacity
    padding: 20,
  },
  newsItemCaption: {
    fontSize: 14,
    color: 'black', // Change text color to black
  },
  newsTime: {
    fontSize: 12,
    color: 'black', // Change text color to black
    marginTop: 4,
  },
  
  squareImage: {
    width: '100%', // Make sure the image takes the full width of the container
    height: 10,   // Set the desired height of the image
    resizeMode: 'cover', // Use 'cover' to ensure the image fits and covers the container
    borderRadius: 20, // Apply a border radius if desired
    marginBottom: 10, // Add margin at the bottom to create spacing between image and text
  },

});

export default HomeScreen;