import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DailyScreen from "../components/DailyScreen.jsx";
import CalendarScreen from "../components/CalendarScreen.jsx";
import TaskCreateScreen from "../components/TaskCreateScreen.jsx";
import ProfileScreen from "../components/ProfileScreen.jsx";
import Settingscreen from "../components/SettingScreen.jsx";
import { EvilIcons, Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigator.jsx";

const Tabs = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tabs.Navigator screenOptions={{
            tabBarStyle: {paddingTop:8 ,},
            tabBarLabelStyle: {fontSize: 14},
        }}>
            <Tabs.Screen name="HomeNavigator" component={HomeNavigator} options={{
                headerShown: false,
                title: "Daily",
                headerTitleAlign: 'center',
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused ,color, size}) => (
                    <MaterialIcons name="task-alt" size={ focused ? size+3 : size-3 } color= {color}
                    />
                ),                
            }}/>
            
            <Tabs.Screen name="CalendarNavigator" component={CalendarScreen} options={{
                headerShown: false,
                title: "Calendar",
                headerTitleAlign: 'center',
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused ,color, size}) => (
                    <EvilIcons name="calendar" size={ focused ? size+11 : size+9 } color= {color}
                    />
                ),                
            }}/>
            
            <Tabs.Screen name="TaskCreateNavigator" component={TaskCreateScreen} options={{
                headerShown: false,
                title: "Create",
                headerTitleAlign: 'center',
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused ,color, size}) => (
                    <MaterialIcons name="add-task" size={ focused ? size+3 : size+6 } color= {color}
                    />
                ),                
            }}/>
            
            <Tabs.Screen name="ProfileNavigator" component={ProfileScreen} options={{
                headerShown: false,
                title: "Profile",
                headerTitleAlign: 'center',
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused ,color, size}) => (
                    <FontAwesome6 name="user" size={ focused ? size+3 : size-3 } color= {color}
                    />
                ),                
            }}/>
            
            <Tabs.Screen name="SettingNavigator" component={Settingscreen} options={{
                headerShown: false,
                title: "Settings",
                headerTitleAlign: 'center',
                tabBarActiveTintColor: '#000000',
                tabBarInactiveTintColor: '#000',
                tabBarIcon: ({ focused ,color, size}) => (
                    <Feather name="settings" size={ focused ? size+3 : size-3 } color= {color}
                    />
                ),                
            }}/>
            
            
        </Tabs.Navigator>
    );
}