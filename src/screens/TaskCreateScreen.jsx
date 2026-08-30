import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Button, FlatList } from "react-native";
import { globalColor } from "../globalStyles.js";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { createTask } from "../services/taskServices.js";

export default function TaskCreateScreen() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([]);
    const [subtaskTitle, setSubtaskTitle] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimeicker, setShowTimeicker] = useState(false);

    const db = useSQLiteContext();
    const categories = [
        {label: 'work', value: 'work'},
        {label: 'daily', value: 'daily'},
        {label: 'study', value: 'study'},
        ];
    async function createTestTask(){
        const taskResult = await db.runAsync(
            `
            INSERT INTO tasks (
                title,
                description,
                completed,
                created_at,
                updated_at
            -- thats the row with the keys
            )
            VALUES (?, ?, ? ,? ,?)
            -- question marks represents the properties (title, description, completed, created_at, updated_at)
            
            `,
        // thats the example of given values
            "Buy milk",
            "Buy milk from the supermarket",
            0,
            new Date().toISOString(),
            new Date().toISOString(),
        );
        console.log("Task created!");

        const taskId = taskResult.lastInsertRowId;
        await db.runAsync(
            `
            INSERT INTO subtasks(
                task_id,
                title,
                completed,
                position
            )
                VALUES (?, ?, ?, ?)
            `,
            taskId,
            'Subtask TItle',
            0,
            0
        );
    }

    async function handleCreateTask(){
        try {
            console.log('CREATE')
            const now = new Date().toISOString();

            await createTask(db, {
                title,
                description,

                categoryId: selectedCategory?.id || null,

                scheduleType: "none",
                reccurenceType: "none",
                subtasks,
            })

            // const result = await db.withExclusiveTransactionAsync(async (txn) => {

                // const taskResult = await txn.runAsync(
                //     `
                //     INSERT INTO tasks (
                //         title,
                //         description,
                //         category_id
                //         completed,
                //         schedule_type,
                //         date,
                //         start_time,
                //         end_time,
                //         recurrence_type,
                //         recurrence_date,
                //         created_at,
                //         updated_at
                //     -- thats the row with the keys
                //     )
                //     VALUES (?, ?, ? ,? ,?, ?, ? ,? ,?, ? ,? ,?)
                //     -- question marks represents the properties (title, description, completed, created_at, updated_at)
                    
                //     `,
                //     task.title,
                //     task.description || null,
                //     task.categoryId || null,
                //     0,
                //     task.scheduleType || "none",
                //     task.date || null,
                //     task.startTime || null,
                //     task.endTime || null,
                //     task.recurrenceType || "none",
                //     task.recurrenceData
                //         ? JSON.stringify(task.recurrenceData)
                //         : null,
                //     now,
                //     now
                // );
                
                // const taskId = taskResult.lastInsertRowId;

                // for (let i = 0; i< task.subtask.length; i++) {
                //     const subtask = task.subtasks[i];

                //     await txn.runAsync(
                //         `
                //         INSERT INTO subtasks (
                //             task_id,
                //             title,
                //             completed,
                //             position
                //         )
                //             VALUES (?, ?, ?, ?)
                //         `,
                //         taskId,
                //         subtask.title,
                //         0,
                //         i
                //     );
                // }
                // return taskId;
            // });

            console.log("Created TASK ID: ",result)
            return result;

        } catch (error) {
            console.error("CREATE TASK ERROR: ", error)
        }
    }
    
    function handleAddSubtasks(){
        setSubtasks((currentSubtasks) => [
            ...currentSubtasks,
            {
                id: Date.now().toString(),
                title:"",
            },
        ])
    }

    function handleSubtaskChange(text, index){
        setSubtasks((currentSubtasks) => {
            const updateSubtasks = [... currentSubtasks];

            updateSubtasks[index] = {
                ...updateSubtasks[index],
                title: text
            }
            return updateSubtasks;
        })
    }


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <View style={styles.header}>
                    <View>
                        <AntDesign name="close" size={25} color='black' />
                    </View>
                    <Text style={styles.title}>Create Task</Text>
                    <TouchableOpacity>
                        <Text style={styles.save}>
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.createContainer}>
                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Task Title</Text>
                        <TextInput
                            multiline
                            textAlignVertical = 'top'
                            placeholder="Just do it..."
                            style={styles.textInput}
                            value={title}
                            onChangeText={setTitle}
                        />                
                    </View>

                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Description</Text>
                        <TextInput
                            multiline
                            textAlignVertical = 'top'
                            placeholder="Write a note..."
                            style={styles.textInput}
                            value={description}
                            onChangeText={setDescription}                            
                        />                
                    </View>                
                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Sub-tasks</Text>
                        <TouchableOpacity style={styles.createNewElement} onPress={handleAddSubtasks}>
                            <AntDesign name="plus" size={20} color={globalColor.orange} />
                            <Text style={styles.save}>
                                Add Sub-task
                            </Text>
                        </TouchableOpacity>
                        {/* ScrollView will enlarge the screen so we dont need FlatList
                        <FlatList 
                            data={subtasks}
                            keyExtractor={(item) => item.id}
                            renderItem={({item, index}) =>(
                                <TextInput
                                    placeholder="describe your subtasks..."
                                    value={item.title}
                                    onChangeText={(text) => handleSubtaskChange(text, index)}
                                />
                            )}
                        /> */}
                        {subtasks.map((subtask, index) => (
                            <TextInput 
                                key={subtask.id}
                                value={subtask.title}
                                style={styles.textInput}
                                placeholder="describe your subtask..."
                                onChangeText={(text) => handleSubtaskChange(text, index)}
                            />
                        ))}
                    </View>
                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Category</Text>
                        <Dropdown
                            style={styles.dropdown}
                            containerStyle={styles.dropdownMenu}
                            itemContainerStyle={styles.dropdownItem}
                            itemTextStyle={styles.dropdownItemText}
                            placeholderStyle={styles.placeholder}
                            selectedTextStyle={styles.selectedText}
                            iconStyle={styles.icon}
                            activeColor="#fff"
                            data={categories}
                            labelField='label'
                            valueField='value'
                            placeholder='Select Category'
                            value={category}
                            onChange={item => setCategory(item.value)}
                        />
                        <TouchableOpacity style={styles.createNewElement}>
                            <AntDesign name="plus" size={20} color={globalColor.orange} />
                            <Text style={styles.save}>
                                Create New Category
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* todo determinated the platform and use forAndroid pick */}
                    <View style={styles.dateTimeContainer}>
                        <TouchableOpacity 
                            style={styles.dateField} 
                            onPress={()=> setShowDatePicker(true)}
                        >
                            <FontAwesome name='calendar' size={18} color='#666' />
                            <Text>rendered date</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setDate(selectedDate)
                                        }
                                    }
                                }
                            />
                        )}

                        <TouchableOpacity
                            style={styles.dateField} 
                            onPress={()=> setShowTimePicker(true)}
                        >
                            <Feather name='clock' size={18} color='#666' />
                            <Text>rendered tim</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            setDate(selectedDate)
                                        }
                                    }
                                }
                            />
                        )}                        
                    </View>
                </View>
            </View>            
                {/* <TouchableOpacity style={styles.saveButton}>
                    <Text style={{fontSize: 20, color: '#fff'}}>
                        Save Task
                    </Text>
                </TouchableOpacity> */}
                <View>
                    <Button
                        title="Create test task"
                        onPress={handleCreateTask}
                    />
                </View>
        </ScrollView>
    );    
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 15,
        justifyContent: 'space-between'
    },

    header : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 20,
        marginBottom: 20,
    },

    partition: {
        marginBottom: 35,
        gap: 8
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
        padding:6,
    },

    dropdown: {
        height: 56,
        backgroundColor: '#fff',

        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 16,

        paddingHorizontal: 16,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,

        elevation: 3
    },

    placeholder: {
        fontSize: 16,
        color: '#b0b6bd'
    },

    selectedText: {
        fontSize: 16,
        color: '#253455',
        fontWeight: '600',
    },

    icon: {
        width: 22,
        height: 22,
        tintColor: '#816060'
    },

    dropdownMenu: {
        marginTop: 8,

        borderRadius: 16,
        borderWidth: 0,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.18,
        shadowRadius: 11,

        elevation: 3        

    },

    dropdownItem: {
        borderRadius: 14,
        marginHorizontal: 8,
        marginVertical: 3,
    },

    dropdownItemText: {
        fontSize: 16,
        color: '#253455',
    },

    dateTimeContainer: {
        flexDirection: 'row',
        gap: 11,
    },

    dateField: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        paddingHorizontal: 14,

        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 14,

    },

    TimeField: {
        width: 120,
        flexDirection: 'row',
        alignItems: 'center',

        height: 50,
        paddingHorizontal: 14,

        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 11,
    },

    save: {
        fontSize: 18,
        fontWeight: '700',
        color: globalColor.orange
    },

    createContainer:{
        justifyContent: 'space-between'
    },
    createNewElement: {
        flexDirection: 'row',
        gap: 6,
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
    saveButton: {
        height: 50,
        backgroundColor: globalColor.orange,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',

    }
})