import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardTask({
    title,
    category,
    description,
    completed,
    time
}) {

    const categoryType = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.personal

    const Icon = categoryType.Icon

    return (    
        <View style={[styles.cardContainer, {
        borderLeftColor: categoryType.color}]}>

            <View style={styles.leftPart}>
                <Ionicons
                    name={completed ? "checkmark-circle" : "ellipse-outline"}
                    size={28}
                    color={completed ? "#50a353" : "#999"}
                />
                <View style={styles.icon}>
                    <Icon
                        name={categoryType.icon}
                        size={categoryType.size}
                        color={categoryType.color}
                    />                    
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{flexWrap: 'wrap'}}>{title}</Text>
                    <Text style={{ color: categoryType.color}}>{category}</Text>
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
        borderWidth: 1,
        borderLeftWidth: 6,
        borderColor: '#bbbbbb',
        padding: 16,
        margin: 8,
        marginVertical: 3,

        // iOs
        shadowColor: '#000',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,

        // android (combines all above)
        elevation: 3
    },

    leftPart: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '70%',
        gap: '3%',
    },

    icon: {
        width: 35,
        height: 35
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