import { StyleSheet, View, Text } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardCategory(
   item) {

    const category = CATEGORY_CONFIG[item.data.category] ?? CATEGORY_CONFIG.Personal
    const Icon = category.Icon

    return (
        <View style={[styles.container, {backgroundColor: category.background}]}>
            <View style={styles.category}>
                <Icon
                    name={category.icon}
                    size={category.size}
                    color={category.color}
                />
                <Text style={[styles.categoryTitle, {color: category.color}]}>
                    {item.data.category}
                </Text>                
            </View>

            <Text style={[styles.taskCount, {color: category.color}]}>
                {item.data.tasks.length} tasks
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: '#cacaca',
        borderRadius: 14,
        backgroundColor: '#f70000',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        margin: 6,
        padding: 18,

        // iOs
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,

        // android (combines all above)
        elevation: 3
    },

    category: {
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center'
    },

    categoryTitle: {
        fontSize: 20
    },

    taskCount: {
        fontSize: 16,
    }
})