import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";

export default function TaskCreateScreen() {
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
        color: '#ff9d00'
    },

    createContainer:{
        justifyContent: 'space-between'
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