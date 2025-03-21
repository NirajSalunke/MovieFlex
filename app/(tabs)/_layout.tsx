import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

const TabIcon = ({
  icon,
  text,
  focused,
}: {
  icon: any;
  text: string;
  focused: boolean;
}) => {
  if (!focused) {
    return (
      <View className="size-full  justify-center items-center mt-4 rounded-full">
        <Image source={icon} tintColor={"#A8B5DB"} className="size-5" />
      </View>
    );
  }
  return (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full flex-1 min-w-[200px] min-h-16 mt-4 rounded-full overflow-hidden justify-center items-center"
    >
      <Image source={icon} tintColor={"#151312"} className="size-5" />
      <Text className="text-secondary text-base font-semibold ml-2">
        {text}
      </Text>
    </ImageBackground>
  );
};
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: "absolute",
          overflow: "hidden",
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} text="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} text="Search" />
          ),
        }}
      />
    </Tabs>
  );
};
export default _layout;
const styles = StyleSheet.create({});
