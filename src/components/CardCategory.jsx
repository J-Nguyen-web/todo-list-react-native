import { StyleSheet, View, Text } from "react-native";

export default function CardCategory(
   item) {

console.log('ITEM',item.data.tasks)
    return (
        <View style={styles.container}>
            <View>
            </View>
            <Text style={styles.category}>
                {item.data.category}
            </Text>
            <Text style={styles.taskCount}>
                {item.data.tasks.length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#f70000',
        margin: 6,
    },

    category: {
        fontSize: 20
    }
})