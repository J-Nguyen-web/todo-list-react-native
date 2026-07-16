import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator.jsx";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator()

export default function RootNavigator() {
    return (
        <SafeAreaView style={{flex: 1}}>
            {/* put safe area in all screens in that nacigator */}
            <Stack.Navigator>
                <Stack.Screen
                    name="Tabs" 
                    component={TabNavigator}
                    options={{
                        headerShown:false,
                        title: "Daily"
                    }}
                />
            </Stack.Navigator>            
        </SafeAreaView>
    );
}