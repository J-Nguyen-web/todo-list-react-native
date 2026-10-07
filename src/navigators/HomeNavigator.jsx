import { LinearGradient } from "expo-linear-gradient";
import { useSQLiteContext } from "expo-sqlite";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../context/TaskContext.js";
import { useCategories } from "../context/CategoryContext.js";
import categoriesGroup from "../util/categoriesGroup.js";
import CardCategory from "../components/CardCategory.jsx";
import getCategories from "../services/categoryService.js";
import CardTask from "../components/CardTask.jsx";
import Heading from "../components/ui/Heading.jsx";
import CardFavCategories from "../components/CardFavCategories.jsx";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { transform } from "lodash";
import { scheduleOnRN } from "react-native-worklets";
import * as Haptics from "expo-haptics";

const greeting = 'Good Morning' // todo changable depending on the hours of the day
const username = 'Nguyen' // todo changable depending on the user.username
const message = 'Be productive' // todo different message depending from the time

const SCREEN_WIDTH = Dimensions.get('window').width;
const backgroundImage = require('../../assets/HJZTBMVW8AEeDLM.jpg');
const imageSource = Image.resolveAssetSource(backgroundImage);
const IMAGE_HEIGHT = SCREEN_WIDTH * (imageSource.height / imageSource.width);
const FADE_HEIGHT = 160; // fade starts 160 units before image ends

export default function HomeNavigator() {
    
    const favListRef = useRef(null);
    // const [favCategories, setFavCategories] = useState(); // todo favCategories
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    const { tasks, removeTask } = useTasks();
    const { categories } = useCategories();

    const favCategories = categories.filter( category => category.favorite === 1)

    const handleFavScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const offsetX = contentOffset.x;
        const maxOffset = Math.max(0, contentSize.width - layoutMeasurement.width);

        setCanScrollLeft(offsetX > 5);
        setCanScrollRight(maxOffset > 5 && offsetX < maxOffset - 5);
    }
    
 // separate responsibility (добавя gester behaviour and posibility to construct it) so cardTask only render
    const CardTaskWithGesture = ({
        task,
        categories,
        removeTask,
    }) => {
        const positionHorizontal = useSharedValue(0); // 0 - начална точка ?
        const positionVertical = useSharedValue(0); // 0 - начална точка ?
        const scale = useSharedValue(1);
        
        const animatedStyle = useAnimatedStyle(() => ({
            transform: [
                { translateX: positionHorizontal.value },
                { translateY: positionVertical.value },
                { scale: scale.value } // за трансформация на целия елемент (в случая card)
            ]
        }));

        const deleteGester = Gesture.Pan()
            .activeOffsetX(-20) // да се активира gesture-а при определена дистанция по xоризонтала
            .onUpdate((event) => {
                positionHorizontal.value = event.translationX; 
            })
            .onEnd((event) => {
                if(event.translationX < -100){
                    scheduleOnRN(removeTask, (task.id)) 
                //scheduleOnRN e за да се изпълни JS code, докато сме в React-native (анимациите се извършват в него)
                    return;
                }

                positionHorizontal.value = 0 // да се върне в началната си позиция в края (onEnd) на gesture-a кога се премине -100
            });
        
        const reorderGester = Gesture.Pan()
            .activateAfterLongPress(500) // активира gesture-a след задържане от половин секунда
            .onStart(() => {
                scheduleOnRN(Haptics.impactAsync); // selectionAsync - при активиране на gesture-a извибрирва (expo-haptic)
                scale.value = withTiming(1.06)
            })
            .onUpdate((event)=> {
                positionVertical.value = event.translationY
            })
            .onEnd(() => {
                positionVertical.value = 0;
                scale.value = withTiming(1)
            })

        const combinedGesture = Gesture.Race(deleteGester, reorderGester);
        // .Race - ще се изпълните този gesture който първо се активира от детектора (за това и му се подава)

        return (
            <GestureDetector gesture={combinedGesture}>
                <CardTask task={task} style={animatedStyle} categories={categories}/>
            </GestureDetector>
        )        
    }

    return (
        <SafeAreaView 
            style={{flex: 1, backgroundColor: '#ffffff'}}
            edges={['left', 'right']}
        >
            <View style={styles.container}>
                <Image
                    source={backgroundImage}
                    style={styles.backgroundImage}
                    resizeMode="contain"
                />

                <LinearGradient
                    colors={[
                        'rgba(245, 245, 245, 0)',
                        "#ffffff"
                    ]}
                    style={styles.fade}
                />
                <View style={styles.greeting}>
                    <Text style={{fontSize: 25}}>
                        {greeting},
                    </Text>
                    <Text style={{fontSize: 30}}>
                        {username}
                    </Text>
                    <Text style={{fontSize: 15}}>
                        {message}
                    </Text>
                </View>
                <View style={styles.taskContainer}>
                    <View style={styles.favoriteCategories}>
                        <View style={styles.homeTaskHeader}>
                            <Heading>Favorite Categories</Heading>
                            <Heading>Edit</Heading>                            
                        </View>
                            <FlatList
                                ref={favListRef}
                                data={favCategories}
                                renderItem={({item}) => <CardCategory category={item} variant="favorite"/>}
                                keyExtractor={(item) => item.id.toString()}
                                horizontal
                                contentContainerStyle={styles.favListContent}
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
                    <View style={styles.dayliTasks}>
                        <View style={styles.homeTaskHeader}>
                            <Heading>Daily Tasks</Heading>
                            <Heading>Edit</Heading>
                        </View>

                        <FlatList style={{flex: 1, gap: 6, backgroundColor: '#fff'}}
                            data={tasks}
                            renderItem={({ item }) => <CardTaskWithGesture task={item} categories={categories} removeTask={removeTask} />}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,

        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
    },
    
    fade: {
        position: 'absolute',
        top: IMAGE_HEIGHT - FADE_HEIGHT, // fade само on bottom of the image
        left: 0,
        right: 0,
        height: FADE_HEIGHT
    },

    greeting: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 26,
        paddingHorizontal: 15,
        paddingVertical: 8,
        margin: 15,
        top: 150
    },

    taskContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff  ',
        width: '100%',
        height: '60%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
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

    favListContent: {
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

    dayliTasks: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        justifyContent: 'space-between',
    },

    homeTaskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        marginHorizontal:18,
        fontWeight: 800,
        backgroundColor: '#fff'

    },
})