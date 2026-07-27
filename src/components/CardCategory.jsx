import { StyleSheet, View } from "react-native";

export default function CardCategory(
  {item}
) {

console.log('ITEM',item)
    return (
        <View style={styles.container}>
            <View>
                {icon}
            </View>
            <Text style={styles.category}>K{category}</Text>
            <Text style={styles.taskCount}>{taskCount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
})