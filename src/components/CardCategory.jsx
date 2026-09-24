import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { useTasks } from "../context/TaskContext.js";
import { useCategories } from "../context/CategoryContext.js";
import { CATEGORY_CONFIG } from "../constants/categories.js";
import { MaterialIcons } from "@expo/vector-icons";

export default function CardCategory({category,variant}) {

    const { tasks } = useTasks();
    const { categories, updateCategory, deleteCategory} = useCategories();

    const taskCount = tasks.filter( task => task.categoryId === category.id).length
    if (variant == "favorite") {
        const favTypes = ['Work', 'Study', 'Shopping', 'Health','Daily', 'Personal']
        if (!favTypes.includes(category.name)){

            return null
        }
    }
    const styles = variantStyles[variant]; // в зависимост от варианта на стила се извлича от обекта със стилове най-отдолу

    async function handleFavoriteCategory() {
        const updatedCategory = {
            favorite: category.favorite ? 0 : 1
        }

        //instead of putting const variable we can directly put the object
        await updateCategory(category.id, {favorite: category.favorite ? 0 : 1} )
    }

    async function handleDeleteCategory() {
        Alert.alert(
            "Delete category",
            `Are you sure you want delete category "${category.name}"?`,
            [
                {
                    text: "Dismiss",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        await deleteCategory(category.id);
                    },
                },
            ]
        );
    }

    return (
        <View style={[styles.cardContainer, {backgroundColor: category.background}]}>
            <View style={styles.category}>
                {/* <Icon name={category.icon} size={variant == "allTasksCategories" ? 22 : category.size} color={category.color} /> */}
                <Text style={styles.icon}> {category.icon} </Text>
                <Text style={[styles.categoryTitle, {color: category.color}]}> {category.name} </Text>
            </View>

            <View style={styles.rightSide}>
                {variant == "allTasksCategories" ? ('')
                    :(
                        <Text style={[styles.taskCount, {color: category.color}]}>
                            {taskCount} {taskCount > 1 ? 'tasks' : 'task'}
                        </Text> 
                    )
                }
                {variant == "sectionCategories" && (
                <View style={styles.rightSide}>
                        <TouchableOpacity onPress={handleFavoriteCategory}>
                            {category.favorite ? (
                                <MaterialIcons name="favorite" size={28} color="red" />
                            ) : (
                                <MaterialIcons name="favorite-outline" size={28} color="gray" />
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDeleteCategory}>
                            <MaterialIcons name="delete-forever" size={28} color="red"/>
                        </TouchableOpacity>
                    </View>
                )}            
            </View>
        </View>
    );
}

// в зависимост от вариант се извлича определен style
const variantStyles={
    favorite:{
        category: {
            alignItems: 'center'
        },
        cardContainer: {
            borderRadius: 16,
            width: 110,
            height: 90,
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
    },
    sectionCategories: {
        cardContainer: {
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
            padding: 8,
            paddingHorizontal: 18,

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

        icon: {
            fontSize: 28
        },

        category: {
            flexDirection: 'row',
            gap: 14,
            alignItems: 'center'
        },

        categoryTitle: {
            fontSize: 20
        },

        rightSide: {flexDirection: 'row', gap: 8, alignItems: 'center'},

        taskCount: {
            fontSize: 16,
        }
    },
    allTasksCategories: {
        cardContainer: {
            backgroundColor: '#f8873d',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 8,
        },
        category: {
            flexDirection: 'row',
            alignItems: 'center',            
        }
    }
}