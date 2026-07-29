import { StyleSheet, View, Text } from "react-native";

export default function CardCategory(
   item) {

console.log('ITEM',item.data.tasks)
    return (
        <View style={styles.container}>
            <View>
                <View>
                </View>
                <Text style={styles.category}>
                    {item.data.category}
                </Text>                
            </View>

            <Text style={styles.taskCount}>
                {item.data.tasks.length} tasks
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        borderRadius: 14,
        backgroundColor: '#f70000',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        margin: 6,
        padding: 18,
    },

    category: {
        fontSize: 20
    },

    taskCount: {
        fontSize: 16,
    }
})