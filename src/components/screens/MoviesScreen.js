import React from "react";
import { StyleSheet, Text, View, Button, Picker, Image } from "react-native";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { FlatList } from "react-native-gesture-handler";

@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
  static defaultProps = {
    optionsSortBy: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ],
    yearsSortBy: [
      {
        label: "2018",
        value: "2018"
      },
      {
        label: "2017",
        value: "2017"
      },
      {
        label: "2016",
        value: "2016"
      },
      {
        label: "2015",
        value: "2015"
      }
    ]
  };

  componentDidMount() {
    this.props.moviesPageStore.getMovies();
  }

  render() {
    const {
      moviesPageStore: {
        page,
        isLoading,
        movies,
        filters,
        onChangeFilters,
        onClearFilters,
        nextPage,
        prevPage
      },
      optionsSortBy,
      yearsSortBy
    } = this.props;
    // console.log("movies", toJS(movies));
    return (
      <View style={styles.container}>
        <View style={styles.filtersList}>
          <View style={styles.pickers}>
            <View>
              <Picker
                selectedValue={filters.sort_by}
                style={{ height: 5, width: 200 }}
                itemStyle={{
                  color: "blue",
                  fontSize: 17
                }}
                onValueChange={itemValue => {
                  onChangeFilters({
                    target: {
                      name: "sort_by",
                      value: itemValue
                    }
                  });
                }}
              >
                {optionsSortBy.map(option => (
                  <Picker.Item label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
            <View>
              <Picker
                selectedValue={filters.primary_release_year}
                style={{ height: 5, width: 200 }}
                itemStyle={{
                  color: "blue",
                  fontSize: 17
                }}
                onValueChange={itemValue => {
                  onChangeFilters({
                    target: {
                      name: "primary_release_year",
                      value: itemValue
                    }
                  });
                }}
              >
                {yearsSortBy.map(option => (
                  <Picker.Item label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.paginationButtons}>
            <View>
              <Button
                onPress={onClearFilters}
                title="Clear Filters"
                color="red"
              />
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

        <View style={styles.listItems}>
          {isLoading ? (
            <Text>...loading</Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={movies}
              renderItem={({ item }) => (
                <View style={styles.movieItem}>
                  <Image
                    style={styles.movieImage}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
                        item.poster_path}`
                    }}
                  />
                  <Text>{item.title}</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
    alignItems: "center",
    justifyContent: "center"
  },
  filtersList: {
    flex: 1,
    justifyContent: "space-between"
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "center"
  },
  pickers: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  listItems: {
    flex: 2,
    alignItems: "center",
    width: "100%",
    margin: 20
  },
  movieItem: {
    width: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  movieImage: {
    height: 400,
    width: 300,
    alignSelf: "stretch"
  }
});

export default MoviesScreen;
