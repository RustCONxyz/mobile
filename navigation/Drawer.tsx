import "react-native-gesture-handler";
import { createDrawerNavigator, type DrawerNavigationOptions } from "@react-navigation/drawer";
import { withLayoutContext } from "expo-router";

const { Navigator } = createDrawerNavigator();

const Drawer = withLayoutContext<DrawerNavigationOptions, typeof Navigator>(Navigator);

export default Drawer;
