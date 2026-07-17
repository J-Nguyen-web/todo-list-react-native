import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";

export default function CardTask({
    title,
    type,
    completed
}) {
    return (    
        <View style={styles.cardContainer}>
            <Ionicons
                name={completed ? "checkmark-circle" : "ellipse-outline"}
                size={28}
                color={completed ? "#50a353" : "#999"}
            />
            {/* todo icons for categories based on type value */}
            <View>
                <Text>{title}</Text>
                <Text>{type}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 16,
        marginVertical: 3,

        // iOs
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 14,

        // android (combines all above)
        elevation: 3
    }
})