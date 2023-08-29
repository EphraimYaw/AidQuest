import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Image, FlatList} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import * as Location from "expo-location";
import Carousel from "react-native-snap-carousel";
import CustomNavBar from "../Components/Customnavbar"; // Adjust the import path

const apiKey = "AIzaSyCa_bWN-0wh_Zishi1-Fea2HjA6hkG0mYI";

// Adjust the path to your JSON file containing health categories
import categories from "../Components/healthcategories.json";

export default function App() {
	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);
	const [healthFacilities, setHealthFacilities] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [extractedData, setExtractedData] = useState(null);

	useEffect(() => {
		(async () => {
			let {status} = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let {coords} = await Location.getCurrentPositionAsync();
			setLocation(coords);

			if (coords) {
				let {longitude, latitude} = coords;

				const addressResponse = await Location.reverseGeocodeAsync({
					latitude,
					longitude,
				});

				setAddress(addressResponse.length > 0 ? addressResponse[0] : null);

				const response = await fetch(
					`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hospital&keyword=rehabilitaion&key=${apiKey}`
				);

				console.log(response);
				const data = await response.json();

				// console.log(data.results);

				const extractedData = [];

				// Loop through the results array
				data.results.forEach((result) => {
					// Extract name
					const name = result.name;

					// Extract photo URL (if available)
					let photoUrl = null;
					if (result.photos && result.photos.length > 0) {
						photoUrl = result.photos[0].photo_reference;
					}

					// Create an object with name and photo URL
					const item = {
						name: name,
						photoUrl: photoUrl,
					};

					// Push the object to the extractedData array
					extractedData.push(item);
				});

				setExtractedData(extractedData);
				console.log(extractedData);
			}
		})();
	}, []);

	const HealthFacilityCard = ({item}) => {
		const [photoUrl, setPhotoUrl] = useState(null);

		useEffect(() => {
			const fetchPhoto = async () => {
				if (item.photos && item.photos.length > 0) {
					const photoReference = item.photos[0].photo_reference;
					const response = await fetch(
						`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
					);
					setPhotoUrl(response.url);
				}
			};

			fetchPhoto();
		}, [item]);

		return (
			<View style={styles.healthFacilityCard}>
				{photoUrl && (
					<Image source={{uri: photoUrl}} style={styles.healthFacilityImage} />
				)}
				<Text style={styles.healthFacilityName}>{item.name}</Text>
				<Text style={styles.healthFacilityAddress}>{item.vicinity}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.locationText}>Your Location</Text>
				<View style={styles.currentLocationContainer}>
					<MaterialIcons
						name="location-on"
						size={16}
						style={styles.locationIcon}
					/>
					<Text style={styles.currentLocationText}>
						{address ? `${address.subregion},` : "Fetching address..."}
					</Text>
				</View>

				<Text style={styles.carouselCaption}>
					{selectedCategory
						? `${selectedCategory} Near You`
						: "Places Near You"}
				</Text>

				<FlatList
					data={extractedData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({item}) => (
						<View>
							<Text>{item.name}</Text>
							{/* <Image
								source={{uri: item.photoUrl}} // Assuming item.photoUrl contains the photo URL
								style={{width: 50, height: 50, marginRight: 10}}
							/> */}
						</View>
					)}
				/>

				<Carousel
					data={healthFacilities}
					renderItem={HealthFacilityCard}
					sliderWidth={300}
					itemWidth={200}
				/>

				<View style={styles.textCarouselContainer}>
					<Carousel
						data={categories}
						renderItem={({item}) => (
							<View style={styles.textCarouselItem}>
								<Text
									style={styles.textCarouselTextWrapper}
									onPress={() => setSelectedCategory(item.name)}>
									<Text style={styles.textCarouselText}>{item.name}</Text>
								</Text>
							</View>
						)}
						sliderWidth={300}
						itemWidth={100}
					/>
				</View>

				<Text style={styles.carouselCaption}>Places Near You</Text>
				<Carousel
					data={healthFacilities}
					renderItem={HealthFacilityCard}
					sliderWidth={300}
					itemWidth={200}
				/>
			</View>
			<CustomNavBar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F6F8FF",
	},
	content: {
		flex: 1,
		marginTop: 60,
		paddingHorizontal: 20,
	},
	locationText: {
		fontFamily: "Poppins-Bold",
		fontSize: 12,
	},
	currentLocationContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationIcon: {
		marginRight: 5,
	},
	currentLocationText: {
		fontFamily: "Poppins-Regular",
		fontSize: 16,
		marginTop: 0,
	},
	carouselCaption: {
		fontFamily: "Poppins-Bold",
		fontSize: 25,
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 10,
	},
	healthFacilityCard: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
		marginBottom: 10,
		alignItems: "center",
	},
	healthFacilityImage: {
		width: 180,
		height: 120,
		borderRadius: 10,
	},
	healthFacilityName: {
		fontFamily: "Poppins-Bold",
		fontSize: 16,
		marginTop: 10,
	},
	healthFacilityAddress: {
		fontFamily: "Poppins-Regular",
		fontSize: 12,
		color: "gray",
		marginTop: 5,
	},
	textCarouselItem: {
		padding: 2,
		marginBottom: 10,
		alignItems: "center",
	},
	textCarouselTextWrapper: {
		width: 200,
		padding: 20,
	},
	textCarouselText: {
		fontFamily: "Poppins-Bold",
		fontSize: 16,
		marginTop: 10,
	},
});
