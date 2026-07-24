import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { globalColor } from "../globalStyles.js";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react";

export default function TaskCreateScreen() {

    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const categories = ['work', 'daily', 'study'];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View>
                        <AntDesign name="close" size={25} color='black' />
                    </View>
                    <Text style={styles.title}>Create Task</Text>
                    <Text style={styles.save}>Save</Text>
                </View>
                <View style={styles.createContainer}>
                    <View>
                        <Text style={styles.subTitle}>Task Title</Text>
                        <TextInput
                            placeholder="Just do it..."
                            style={styles.textInput}
                        />                
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Description</Text>
                        <TextInput
                            placeholder="Write a note..."
                            style={styles.textInput}
                        />                
                    </View>                
                    <View>
                        <Text style={styles.subTitle}>Sub-tasks</Text>
                        <TouchableOpacity style={styles.createNewElement}>
                            <AntDesign name="plus" size={20} color={globalColor.orange} />
                            <Text style={styles.save}>
                                Add Sub-task
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.subTitle}>Category</Text>
                        <Dropdown
                            data={categories}
                            labelField='label'
                            valueField='value'
                            placeholder='Category'
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
                    <DateTimePicker
                        value={time}
                        mode="time"
                        onChange={(event, selectedTime) => {
                                if (selectedTime) {
                                    setDate(selectedTime)
                                }
                            }
                        }
                    />
                </View>
            </ScrollView>
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
})