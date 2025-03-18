import { icons } from "@/constants/icons";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
const SearchBar = ({
  OnPress,
  placeholder,
}: {
  OnPress: () => void;
  placeholder: string;
}) => {
  return (
    <View className="flex-row items-center rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5 "
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />
      <TextInput
        onPress={OnPress}
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        placeholderTextColor={"#AB8BFF"}
        className="flex-1 ml-2 text-white"
      />
      <Text>SearchBar</Text>
    </View>
  );
};
export default SearchBar;
