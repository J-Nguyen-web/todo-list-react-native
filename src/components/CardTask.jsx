import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useTasks } from "../context/TaskContext.js";

export default function CardTask({task, categories}) {
    if (!task || !categories) return null
    
    const { updateTask } = useTasks();

    const category = categories.find( item => Number(item.id) === Number(task.categoryId) )

    async function handleOnComplete() {
        console.log(task)
        const updatedTask = {
            ...task,
            completed: !task.completed
        }
        await updateTask(updatedTask, task.id)
    }

    return (    
        <View style={[styles.cardContainer, { borderLeftColor: category?.color}]}>

            <View style={styles.leftPart}>
                <Pressable onPress={handleOnComplete}>
                    <Ionicons
                        name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={28}
                        color={task.completed ? "#50a353" : "#999"}
                    />
                </Pressable>

                <View style={styles.icon}>
                    <Text style={{fontSize:32}}>{category?.icon}</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{flexWrap: 'wrap'}}>{task.title}</Text>
                    <Text style={{ color: category?.color}}>{category?.name}</Text>
                </View>
            </View>
            <View style={styles.rightPart}>
                <Text>time</Text>
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
        textAlign: 'center',
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