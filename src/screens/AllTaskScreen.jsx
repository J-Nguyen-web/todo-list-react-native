import { FlatList, StyleSheet, View, Text, Pressable, TouchableOpacity } from "react-native";
import CardTask from "../components/CardTask.jsx";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { tasks } from "../constants/tasks.js";
import { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import categoriesGroup from "../util/categoriesGroup.js";
import { CATEGORY_CONFIG } from "../constants/categories.js";
import CardCategory from "../components/CardCategory.jsx";

// const categories = ['work', 'health'];

export default function AllTaskScreen() {

    const categoryList = useRef(null);
    const [categories, setCategories] = useState();
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    // const categoryType = CATEGORY_CONFIG[]

    useEffect(() => {
        setCategories(categoriesGroup(tasks))
    },[])    

    const handleFavScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const offsetX = contentOffset.x;
        const maxOffset = Math.max(0, contentSize.width - layoutMeasurement.width);

        setCanScrollLeft(offsetX > 5);
        setCanScrollRight(maxOffset > 5 && offsetX < maxOffset - 5);
    }    
    
    console.log(categories)
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All Tasks</Text>

                <View style={styles.actions}>
                    <TouchableOpacity>
                        <Ionicons name="search" size={25} color='#777' />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <MaterialIcons name="tune" size={25} color='#777' />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.allCategories}>
                <FlatList
                    ref={categoryList}
                    contentContainerStyle={styles.categoryList}
                    horizontal
                    data={categories}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => <CardCategory {...item} variant="allTasksCategories" />}
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleFavScroll}
                    scrollEventThrottle={16}
                />

                {canScrollLeft && (
                    <View style={styles.leftScrollControl}>
                        <LinearGradient
                            colors={[
                                'rgba(255,255,255,0)',
                                '#ffffff'
                            ]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.leftFade}
                        />

                        <TouchableOpacity
                            style={styles.chevronButton}
                            onPress={() =>
                                favListRef.current?.scrollToOffset({
                                    offset: 0,
                                    animated: true,

                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name="chevron-left"
                                size={35}
                                color='#777'
                            />
                        </TouchableOpacity>
                    </View>
                )}

                {canScrollRight && (
                    <View style={styles.rightScrollControl}>
                        <LinearGradient
                            colors={[
                                'rgba(255,255,255,0)',
                                '#ffffff'
                            ]}
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            style={styles.rightFade}
                            pointerEvents="none"
                        />

                        <TouchableOpacity
                            style={styles.chevronButton}
                            onPress={() =>
                                favListRef.current?.scrollToEnd({
                                    animated: true,
                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name="chevron-right"
                                size={35}
                                color='#777'
                            />
                        </TouchableOpacity>
                    </View>
                )}                
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

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },

    categoryList: {
        gap: 8,
    },

    allCategories: {
        paddingVertical: '3%',
        justifyContent: 'space-between',
        gap: 6,
    },
    
    categoryButton: {
        backgroundColor: '#f8873d',
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },

    taskContainer: {
        flex: 1
    },

        favoriteCategories: {
        backgroundColor: '#fff',
        width: '100%',
        height: '30%',
    },

    favCardContainer: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
    },

    categoryList: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        gap: 8,
        paddingHorizontal: 15,
    },

    leftScrollControl: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 65,
        zIndex: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },

    rightScrollControl: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 65,
        zIndex: 6,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },

    chevronButton: {
        width: 58,
        height: 58,
        borderRadius: 14,
        backgroundColor: '#fffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})