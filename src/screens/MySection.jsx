import { FlatList, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import CardCategory from "../components/CardCategory.jsx";
import { tasks } from "../constants/tasks.js";
import { useEffect, useState } from "react";
import { globalColor } from "../globalStyles.js";
import { AntDesign } from "@expo/vector-icons";

export default function MySection() {

    const [categories, setCategories] = useState();
    
    useEffect(() => {
        const grouped = tasks.reduce((acc, task) => {
            if (!acc[task.category]) {
                acc[task.category] = [];
            }

            acc[task.category].push(task)
            return acc
        },{})
        const categoriesArray = Object.entries(grouped).map(([category, tasks]) => ({category, tasks}));
        setCategories(categoriesArray)
    },[])
    
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <AntDesign name="close" size={25} color='black' />
                    </View>
                    <Text style={styles.title}>
                        My Section
                    </Text>
                    <TouchableOpacity style={styles.save}>
                        <Text>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={categories}
                    renderItem={({item}) => <CardCategory data={item}/>}
                    keyExtractor={(item) => item.category}
                />
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

    subTitle: {
        fontSize: 15,
        fontWeight: '600',
    },

    textInput: {
        height: 60,
        borderWidth: 1,
        borderRadius: 8,
    },

    save: {
        fontSize: 18,
        fontWeight: '700',
        color: globalColor.orange
    },


    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    
    categoryButton: {
        backgroundColor: '#f8873d',
        borderRadius: 20,
        paddingHorizontal: 11,
        paddingVertical: 8,
    },
})