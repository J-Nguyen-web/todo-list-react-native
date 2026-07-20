import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardTask({
    title,
    type,
    completed,
    time
}) {

    const category = CATEGORY_CONFIG[type] ?? CATEGORY_CONFIG.personal

    return (    
        <View style={[styles.cardContainer, {
        borderLeftColor: category.color}]}>

            <View style={styles.leftPart}>
                <Ionicons
                    name={completed ? "checkmark-circle" : "ellipse-outline"}
                    size={28}
                    color={completed ? "#50a353" : "#999"}
                />
                {/* todo icons for categories based on type value */}
                <MaterialCommunityIcons
                    name={category.icon}
                    size={25}
                    color={category.color}
                />
                <View style={styles.titleContainer}>
                    <Text style={{flexWrap: 'wrap'}}>{title}</Text>
                    <Text style={{ color: category.color}}>{type}</Text>
                </View>
            </View>
            <View style={styles.rightPart}>
                <Text>{time}</Text>
                <Entypo name="chevron-small-down" size={25} color='gray' />
                <MaterialIcons name="drag-indicator" size={25} color='gray' />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        borderLeftWidth: 6,
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
    },

    leftPart: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '70%',
        gap: '3%',
    },

    titleContainer: {
        flex:1,
        marginRight: '3%',
    },
    rightPart: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: '3%',
    }
})