import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView } from "react-native";
import { useTasks } from "../context/TaskContext.js";
import { useCategories } from "../context/CategoryContext.js";
import { CATEGORY_CONFIG } from "../constants/categories.js";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

export default function CardCategory({category,variant}) {

    const { tasks } = useTasks();
    const { categories, updateCategory, deleteCategory} = useCategories();
    const favTypes = ['Work', 'Study', 'Shopping', 'Health','Daily', 'Personal']

    const taskCount = tasks.filter( task => task.categoryId === category.id).length

    const styles = variantStyles[variant]; // в зависимост от варианта на стила се извлича от обекта със стилове най-отдолу

    function handleRedirectCategory(){}

    return (
        <View style={[styles.cardContainer, {backgroundColor: category.background}]}>
            <TouchableOpacity style={styles.category} onPress={handleRedirectCategory}>
                <Text style={styles.icon}> {category.icon} </Text>
                <Text style={[styles.categoryTitle, {color: category.color}]}> {category.name} </Text>
                { variant == "favorite" && (
                <View style={styles.rightSide}>
                    <Text style={[styles.taskCount, {color: category.color}]}>
                        {taskCount} {taskCount > 1 ? 'tasks' : 'task'}
                    </Text> 
                </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

// в зависимост от variant се извлича определен style
const variantStyles={
    favorite:{
        category: {
            alignItems: 'center'
        },
        cardContainer: {
            borderRadius: 16,
            width: 89,
            height: 89,
            padding: 16,
            margin: 8,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,

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
        icon: {fontSize: 28},
        categoryTitle: {fontSize: 18}
    },

    allTasksCategories: {
        cardContainer: {
            backgroundColor: '#f8873d',
            borderRadius: 16,
            paddingHorizontal: 9,
            paddingVertical: 8,
        },
        category: {
            flexDirection: 'row',
            alignItems: 'center',            
        },
        icon: {fontSize: 28},
        categoryTitle: {fontSize: 18}
    }
}