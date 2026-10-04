import { createStackNavigator } from "@react-navigation/stack";
import MyCategories from "../screens/MyCategories.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Profile"
                component={ProfileScreen}
            />
            <Stack.Screen 
                name="MyCategories"
                component={MyCategories}
            />
            {/* <Stack.Screen 
                name="Import"
                component={}
            />
            <Stack.Screen 
                name="Export"
                component={}
            /> */}
        </Stack.Navigator>
    );
}