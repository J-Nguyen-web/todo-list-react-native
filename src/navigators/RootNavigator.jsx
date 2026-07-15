import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator.jsx";

const Stack = createStackNavigator()

export default function RootNavigator() {
    return (
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
    );
}