import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
const search = () => {
  const [searchQuery, setsearchQuery] = useState<string>("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setsearchQuery(text);
  };

  useEffect(() => {
    const loader = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(loader);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, [movies]);
  return (
    <View className="flex-1 bg-primary">
      <Text>Search</Text>
      <Image source={images.bg} className=" flex-1 w-full absolute z-0" />
      <FlatList
        numColumns={3}
        className="px-5 "
        keyExtractor={(item) => item.id.toString()}
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mx-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No Movies Found"
                  : "Try Searching Movies"}
              </Text>
            </View>
          ) : (
            <></>
          )
        }
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5 ">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#000ff" className="my-3" />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error:- {moviesError.message}
              </Text>
            )}

            {!moviesLoading &&
              !moviesError &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Result For{" "}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};
export default search;
const styles = StyleSheet.create({});
