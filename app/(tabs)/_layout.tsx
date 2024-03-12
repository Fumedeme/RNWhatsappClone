import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs></Tabs>
    </GestureHandlerRootView>
  );
};

export default Layout;
