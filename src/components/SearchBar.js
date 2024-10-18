import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPlaces,
  getPlacDetails,
  saveSelectedPlace,
  selectPlace,
} from '../store/place/placeActions';
import {Input, View, List, Card} from '@ant-design/react-native';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MySearchBar = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const places = useSelector(state => state.places.places);
  const selectedPlace = useSelector(state => state.places.selectedPlace);
  const location = useSelector(state => state.places.location);
  const error = useSelector(state => state.places.error);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query.length > 2) {
      dispatch(fetchPlaces(query)); // Dispatch the fetchPlaces action
    }
  };

  // Handle selecting a place from the list
  const handleSelectPlace = place => {
    setSearchQuery('');
    dispatch(getPlacDetails(place.place_id));
    // dispatch(selectPlace(place)); // Dispatch the selectPlace action
    dispatch(saveSelectedPlace(place)); // Dispatch the saveSelectedPlace action
  };
  return (
    <View style={styles.container}>
      {/* Ant Design Input Component */}
      <Input
        placeholder="Search for places"
        value={searchQuery}
        onChangeText={value => handleSearch(value)}
      />

      {/* <WhiteSpace size="xs" /> */}

      {/* Display error message if there's an error */}
      {error && <List.Item>{error}</List.Item>}

      {/* Ant Design List Component */}
      <List>
        {searchQuery.length === 0 && selectedPlace?.length > 0 ? (
          // Display selectedPlace if there's no search query
          <TouchableOpacity
            key={selectedPlace.place_id}
            onPress={() => handleSelectPlace(selectedPlace)}>
            <Card>
              <Card.Header title={selectedPlace.description} />
            </Card>
          </TouchableOpacity>
        ) : // Show places from search if search query exists
        places && places.length > 0 ? (
          places.map(place => (
            <TouchableOpacity
              key={place.place_id}
              onPress={() => handleSelectPlace(place)}>
              <Card>
                <Card.Header title={place.description} />
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <List.Item>No places found. Try searching again.</List.Item>
        )}
      </List>

      {/* Display selected place on the map */}
      {location && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            <Marker
              coordinate={{
                latitude: location.lat,
                longitude: location.lng,
              }}
              title={location.description}
            />
          </MapView>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.75, // Adjust height as needed
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MySearchBar;
