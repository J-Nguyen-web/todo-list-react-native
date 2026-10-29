import { LinearGradient } from "expo-linear-gradient";
import { useSQLiteContext } from "expo-sqlite";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTasks } from "../context/TaskContext.js";
import { useCategories } from "../context/CategoryContext.js";
import { useNavigation } from "@react-navigation/native";
import categoriesGroup from "../util/categoriesGroup.js";
import CardCategory from "../components/CardCategory.jsx";
import getCategories from "../services/categoryService.js";
import Heading from "../components/ui/Heading.jsx";
import CardFavCategories from "../components/CardFavCategories.jsx";
import CardTaskWithGestures from "../components/CardTaskWithGesture.jsx"
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated"
import CardTask from "../components/CardTask.jsx";


const greeting = 'Good Morning' // todo changable depending on the hours of the day
const username = 'Nguyen' // todo changable depending on the user.username
const message = 'Be productive' // todo different message depending from the time

const SCREEN_WIDTH = Dimensions.get('window').width;
const backgroundImage = require('../../assets/HJZTBMVW8AEeDLM.jpg');
const imageSource = Image.resolveAssetSource(backgroundImage);
const IMAGE_HEIGHT = SCREEN_WIDTH * (imageSource.height / imageSource.width);
const FADE_HEIGHT = 160; // fade starts 160 units before image ends

export default function HomeNavigator() {
    
    const ROW_GAP = 6;
    const favListRef = useRef(null);
    // const [favCategories, setFavCategories] = useState(); // todo favCategories
    const [pendingRevealId, setPendingRevealId] = useState(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [rowHeight, setRowHeight] = useState({}); // rowHeight will be detected from onLayout in Animated.View
    const [activeTaskId, setActiveTaskId] = useState(null);
    const { tasks, tasksReorder, removeTask } = useTasks();
    const { categories } = useCategories();
    const navigation = useNavigation();


    const lastTargetIndexRef = useRef(null);
    const dragFromIndex = useSharedValue(-1);
    const dragToIndex = useSharedValue(-1);
    const draggedRowHeight = useSharedValue(0);
    
    const tasksRef = useRef(tasks);
    const positionsRef = useRef({});
    const activeTaskIdRef = useRef(null);
    const dragReleaseTimerRef = useRef(null)

    const dragY = useSharedValue(0);
    const dragScale = useSharedValue(1);
    const scrollY = useSharedValue(0);

    useEffect(() => {
        if(pendingRevealId === null) return;

        const index = tasks.findIndex(
            task => task.id === pendingRevealId
        )

        if (index === -1) return;

        setActiveTaskId(null);
        setPendingRevealId(null);

        dragFromIndex.value = -1;
        dragToIndex.value = -1;
        draggedRowHeight.value = 0;
        
    },[tasks, pendingRevealId])

    tasksRef.current = tasks;

    const rowPosition = useMemo(() => {
        let top = 0
        const position = {};

        for (const task of tasks) {
            const height = rowHeight[task.id] ?? 100;

            position[task.id] = {
                top,
                height,
                center: top + height /2
            };

            top += height +ROW_GAP;
        }
        return position;
    },[tasks, rowHeight])

    positionsRef.current = rowPosition;

    const activeTask = tasks.find(
        (task) => task.id === activeTaskId
    );

    const overlayStyle = useAnimatedStyle(() => ({
        position: "absolute",
        top: dragY.value,
        left: 0,
        right: 0,
        zIndex: 100,
        elevation: 10,
        transform: [{ scale: dragScale.value}],
    }));

    function handleRowLayout(taskId, height) {
        setRowHeight((previous) => {
            if (previous[taskId] === height) {
                return previous;
            }

            return {...previous, [taskId]: height}
        });
    }

    function handleDragStart(taskId, index, height) {
        activeTaskIdRef.current = taskId;
        lastTargetIndexRef.current = index;
        
        dragFromIndex.value = index;
        dragToIndex.value = index;
        draggedRowHeight.value = height;

        setActiveTaskId(taskId)
    }

    function handleDragMove(taskId, draggedCenterY) {
        if ( activeTaskIdRef.current !== taskId) return;
        
        const currentTasks = tasksRef.current;
        const positions = positionsRef.current;

        
        // the list data stays unchanged during the drag
        // calculate the insertion index using the other rows' original positions
        let targetIndex = 0;

        for ( const task of currentTasks) {
            if (task.id === taskId) continue;

            const position = positions[task.id];

            if (position && draggedCenterY > position.center) {
                targetIndex ++;
            }
        }

        targetIndex = Math.max(
            0,
            Math.min(targetIndex, currentTasks.length -1 )
        );

        // Animate only when the placeholder moves to another index
        if (targetIndex === lastTargetIndexRef.current) return;

        lastTargetIndexRef.current = targetIndex;
        dragToIndex.value = targetIndex;
        
    }

    function handleDragEnd(taskId) {
        // Ignore finalization if this row never started a drag
        if (activeTaskIdRef.current !== taskId) return;

        const fromIndex = tasksRef.current.findIndex(
            task => task.id === taskId
        )

        const toIndex = lastTargetIndexRef.current ?? fromIndex;

        // Clear the active gester state
        activeTaskIdRef.current = null;
        lastTargetIndexRef.current = null;

        // Commit the final order once, after the gesture ends
        if (fromIndex === -1 && fromIndex === toIndex) {
            setActiveTaskId(null)

            dragFromIndex.value = -1;
            dragToIndex.value = -1;
            draggedRowHeight.value = 0;
            dragScale.value = withTiming(1)
            return;
        }
            tasksReorder(taskId, toIndex);

            dragFromIndex.value = -1;
            dragToIndex.value = -1;
            draggedRowHeight.value = 0;

        if (dragReleaseTimerRef.current) {
            clearTimeout(dragReleaseTimerRef.current)
        }

        dragReleaseTimerRef.current = setTimeout(() => {
            // dont hide a newer drag if one has already started
            if (activeTaskIdRef.current !== null) return;

            setActiveTaskId(null);
            dragScale.value = withTiming(1);
            dragReleaseTimerRef.current = null;
        }, 180)
    }
    const favCategories = categories.filter( category => category.favorite === 1)

    function handleCategoryTasks(item){
        navigation.navigate("AllTasks", { categoryId: item.id})
    }

    const handleFavScroll = (event) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const offsetX = contentOffset.x;
        const maxOffset = Math.max(0, contentSize.width - layoutMeasurement.width);

        setCanScrollLeft(offsetX > 5);
        setCanScrollRight(maxOffset > 5 && offsetX < maxOffset - 5);
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
                            <TouchableOpacity onPress={() => navigation.navigate("ProfileNavigator", {screen: "MyCategories"})}>
                                <Heading>Edit</Heading>                             
                            </TouchableOpacity>
                        
                        </View>
                            <FlatList
                                ref={favListRef}
                                data={favCategories}
                                renderItem={({item}) => (
                                    <Pressable onPress={()=>{ handleCategoryTasks(item)}}>
                                        <CardCategory category={item} variant="favorite"/>
                                    </Pressable>
                                )}
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
                    <View style={{flex: 1, position: "relative"}}>
                        <FlatList 
                            style={{flex: 1, backgroundColor: '#fff'}}
                            contentContainerStyle={{ gap: 6 }}
                            data={tasks}
                            scrollEnabled={activeTaskId === null}
                            onScroll={(event) => {
                                scrollY.value = event.nativeEvent.contentOffset.y;
                            }}
                            scrollEventThrottle={16}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item, index }) => (
                                <CardTaskWithGestures
                                task={item}
                                index={index}
                                itemCount={tasks.length}
                                categories={categories}
                                removeTask={removeTask}
                                onReorder={tasksReorder}
                                rowTop={rowPosition[item.id]?.top ?? 0}
                                rowHeight={rowPosition[item.id]?.height ?? 100}
                                scrollY={scrollY}
                                isActive={item.id === activeTaskId}
                                dragY={dragY}
                                dragScale={dragScale}
                                onRowLayout={handleRowLayout}
                                onDragStart={handleDragStart}
                                onDragMove={handleDragMove}
                                onDragEnd={handleDragEnd}
                                dragFromIndex={dragFromIndex}
                                dragToIndex={dragToIndex}
                                draggedRowHeight={draggedRowHeight}
                                />
                            )}
                        />

                        {activeTask && (
                            <Animated.View
                                pointerEvents="none"
                                style={overlayStyle}
                            >
                                <CardTask
                                    task={activeTask}
                                    categories={categories}
                                />
                            </Animated.View>
                        )}
                    </View>
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