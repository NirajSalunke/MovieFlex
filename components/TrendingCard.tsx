import { Link } from "expo-router";
import { Image } from "react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
const TrendingCard = ({
  index,
  movie,
}: {
  index: number;
  movie: TrendingMovie;
}) => {
  return (
    <Link asChild href={`/movies/${movie.movie_id}`}>
      <TouchableOpacity className=" w-32 relative pl-5">
        <Image
          source={{ uri: movie.poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="absolute bottom-9 left-4.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text
          numberOfLines={1}
          className="text-sm font-bold mt-2 text-light-200"
        >
          {movie.title}
        </Text>
        <View className="flex-row items-center">
          {Array(Math.round(movie.vote_average / 2))
            .fill(0)
            .map((_, index) => (
              <Image key={index} source={icons.star} className="size-4" />
            ))}
        </View>
      </TouchableOpacity>
    </Link>
  );
};
export default TrendingCard;
const styles = StyleSheet.create({});
