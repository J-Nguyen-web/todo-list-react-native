import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";
import { useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

export default function CardTask({task, categories}) {
    console.log('before return')
    if (!task || !categories) return null

    console.log('TASK.......', task)
    console.log(categories)
    const category = categories.find( item => item.id === task.category_id )
    console.log(category)

    // const categoryType = CATEGORY_CONFIG[category_id]
    // const Icon = categoryType.Icon

    return (    
        <View style={[styles.cardContainer, { borderLeftColor: category.color}]}>

            <View style={styles.leftPart}>
                <Ionicons
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={28}
                    color={task.completed ? "#50a353" : "#999"}
                />
                <View style={styles.icon}>
                    {/* <Icon
                        name={categoryType.icon}
                        size={categoryType.size}
                        color={categoryType.color}
                    />                     */}
                    <Text>{category.icon}</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={{flexWrap: 'wrap'}}>{task.title}</Text>
                    <Text style={{ color: category.color}}>{category.title}</Text>
                </View>
            </View>
            <View style={styles.rightPart}>
                <Text>time</Text>
                <Entypo name="chevron-small-down" size={25} color='gray' />
                <MaterialIcons name="drag-indicator" size={25} color='gray' />
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderLeftWidth: 6,
        borderColor: '#bbbbbb',
        padding: 16,
        margin: 8,
        marginVertical: 3,

        // iOs
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

    leftPart: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '70%',
        gap: '3%',
    },

    icon: {
        width: 35,
        height: 35
    },

    titleContainer: {
        flex:1,
        marginRight: '3%',
    },
    rightPart: {
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: '3%',
    }
})