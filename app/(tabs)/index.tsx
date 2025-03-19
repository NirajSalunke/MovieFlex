import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import "../global.css";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovie } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(() => getTrendingMovie());

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 5,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingMoviesError ? (
          <Text>
            Error: {moviesError?.message || trendingMoviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* <SearchBar placeholder="Search for Movie" /> */}
            <>
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-center text-white font-bold mb-3">
                    Trending Movies
                  </Text>
                  <FlatList
                    horizontal
                    ItemSeparatorComponent={() => <View className="w-4" />}
                    scrollEnabled={false}
                    className="mt-3 mb-4"
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                  />
                </View>
              )}
              <Text className="text-lg text-center text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>
              <FlatList
                scrollEnabled={false}
                className="mt-2 pb-32"
                data={movies}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBlock: 10,
                }}
                numColumns={3}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
