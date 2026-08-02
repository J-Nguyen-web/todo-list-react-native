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
                        />                
                    </View>

                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Description</Text>
                        <TextInput
                            multiline
                            textAlignVertical = 'top'
                            placeholder="Write a note..."
                            style={styles.textInput}
                        />                
                    </View>                
                    <View style={styles.partition}>
                        <Text style={styles.subTitle}>Sub-tasks</Text>
                        <TouchableOpacity style={styles.createNewElement}>
                            <AntDesign name="plus" size={20} color={globalColor.orange} />
                            <Text style={styles.save}>
                                Add Sub-task
                            </Text>
                        </TouchableOpacity>
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
            </View>            
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={{fontSize: 20, color: '#fff'}}>
                        Save Task
                    </Text>
                </TouchableOpacity>
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
        background: '#fff',

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
        shadowRadius: 8,

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
        tintColor: '#606b81'
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