import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen
() {

const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("MyCategories")}>
                <Text>My Categories</Text>
            </TouchableOpacity>
        </View>
    );
}