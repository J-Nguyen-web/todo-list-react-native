import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView } from "react-native";
import { useTasks } from "../context/TaskContext.js";
import { useCategories } from "../context/CategoryContext.js";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";

export default function CardCategoryOptions({category}) {

    const [isEditing, setIsEditing] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState(category.name)

    const { tasks } = useTasks();
    const { categories, updateCategory, deleteCategory} = useCategories();
    const defaultTypes = ['Work', 'Study', 'Shopping', 'Health', 'Daily', 'Personal']

    const taskCount = tasks.filter( task => task.categoryId === category.id).length

    const inputRef = useRef(null);
    
    useEffect(() => {
        if(isEditing) {
            inputRef.current?.focus()
            // за директно поставяне на cursor-a в полето за писане. inputRef се поставя и в textInput виж долу
        }
    },[isEditing])

    async function handleFavoriteCategory() {
        const updatedCategory = {
            favorite: category.favorite ? 0 : 1
        }

        //instead of putting const variable we can directly put the object
        await updateCategory(category.id, {favorite: category.favorite ? 0 : 1} )
    }

    async function handleEmojiEdit(params) {
        
    }

    async function handleEditCategory() {
        setNewCategoryName(category.name);
        setIsEditing(true)
    }

    async function handleSaveEditedCategory() {
        console.log('PRESSED')
        if(newCategoryName.trim() === "" || !newCategoryName) {
            Alert.alert("Name must contain at least one character")
            setIsEditing(false);
            return
        }
        await updateCategory(category.id, {name: newCategoryName.trim()})
        setIsEditing(false)
    }

    async function handleDeleteCategory() {
        if(defaultTypes.includes(category.name)){
            Alert.alert("Default category cannot be deleted!")
        } else {
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
    }

    return (
        <View style={[styles.cardContainer, {backgroundColor: category.background}]}>
                {isEditing ? (
                    <KeyboardAvoidingView>
                    <View style={{flexDirection: 'row', gap: 14, alignItems: 'center'}}>
                        <TouchableOpacity style={[styles.emojiEdit,{borderColor: category.color}]} onPress={handleEmojiEdit}>
                            <Text style={styles.icon}> {category.icon} </Text>                
                        </TouchableOpacity>
                        <TextInput 
                            ref={inputRef}
                            // референция за .focus() къде да сложи cursor-a
                            value={newCategoryName}
                            onChangeText={setNewCategoryName}
                            style={[styles.editName, { color: category.color, borderColor: category.color}]}
                        />
                        <TouchableOpacity onPress={handleSaveEditedCategory}>
                            <MaterialIcons name="done"  size={28} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setIsEditing(false)}>
                            <Feather name="x"  size={28} color="red" />
                        </TouchableOpacity>
                    </View>
                    </KeyboardAvoidingView>

                ):(
                    <View style={styles.category}>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={handleEditCategory}>
                        <Text style={styles.icon}> {category.icon} </Text>
                        <Text style={[styles.categoryTitle, {color: category.color}]}> {category.name} </Text>
                        <FontAwesome6 name="edit" size={22} color={category.color} />
                    </TouchableOpacity>
                                <View style={styles.rightSide}>
                <Text style={[styles.taskCount, {color: category.color}]}>
                    {taskCount} {taskCount > 1 ? 'tasks' : 'task'}
                </Text> 
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
            </View></View>
                )}
            </View>
    );
}

// в зависимост от вариант се извлича определен style
const styles = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    categoryTitle: {
        fontSize: 20
    },

    rightSide: {flexDirection: 'row', gap: 8, alignItems: 'center'},

    taskCount: {
        fontSize: 16,
    },

    emojiEdit: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fafafa",
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
        
    },

    editName: {
        height: '88%',
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
    }
})
