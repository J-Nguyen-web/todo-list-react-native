import { FlatList, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import CardTask from "../components/CardTask.jsx";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const categories = ['work', 'health'];
const tasks =[
    {
        id: 1,
        title: 'task1=============================================',
        type: 'Shopping',
        time: '9:00',
        completed: true
    },
    {
        id: 2,
        title: 'task2',
        type: 'Work',
        time: '9:00',
        completed: false
    },
        
] 



export default function AllTaskScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All Tasks</Text>

                <View style={styles.actions}>
                    <TouchableOpacity>
                        <Ionicons name="search" size={25} color='#777' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <MaterialIcons name="tune" size={25} color='#777' />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.allCategories}>
                <FlatList
                    contentContainerStyle={styles.categoryList}
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => 
                        <Pressable
                            style={styles.categoryButton}
                        >
                            <Text style={{ fontSize: 18,}}>{item}</Text>
                        </Pressable>}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={styles.taskContainer}>
                <FlatList
                            data={tasks}
                            renderItem={({ item }) => <CardTask {...item} />}
                            keyExtractor={(item) => item.id}
                        
                />                
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 20,
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    categoryList: {
        gap: 8,
    },

    allCategories: {
        paddingVertical: '3%',
        justifyContent: 'space-between',
        gap: 6,
    },
    
    categoryButton: {
        backgroundColor: '#f8873d',
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },

    taskContainer: {
        flex: 1
    }
})