import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import CardTask from "../components/CardTask.jsx";

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
    },

    categoryList: {
        gap: 8,
    },

    allCategories: {
        paddingVertical: '3%',
        justifyContent: 'space-between',
        gap: 6,
        padding: 8,
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