import React from "react";
import { StyleSheet, Text, View, Button, Picker, Image } from "react-native";
import { inject, observer } from "mobx-react";
import { FlatList } from "react-native-gesture-handler";
import MovieItem from "./MovieItem";
import Filters from "./Filters";
import YearRelease from "./YearRelease"


@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
 

  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: { page, isLoading, movies, onClearFilters, nextPage, prevPage }
    } = this.props;
    // console.log("movies", toJS(movies));
    return (

      <View style={styles.container}>

        <View style={styles.filtersList}>

            <Filters />
            <YearRelease />
        </View>

         

        <View style={styles.listItems}>
          {isLoading ? (
            <Text>...loading</Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={movies}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <MovieItem item={item} />}
            />
          )}
        </View>

        <View style={styles.paginationButtons}>
            <View>
              <Button onPress={onClearFilters} title="Clear Filters" color="red" />
            </View>
            <Button
              onPress={prevPage}
              title="Previous Page"
              color="green"
              disabled={page === 1 ? true : false}
            />
            <Button onPress={nextPage} title="Next Page" color="green" />
       
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    alignItems: "center",
    justifyContent: "center"
  },
  
  listItems: {
    flex: 2,
    width: "100%",
    margin: 20
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default MoviesScreen;
