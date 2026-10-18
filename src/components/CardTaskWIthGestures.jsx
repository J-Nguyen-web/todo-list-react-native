import { Ionicons } from "@expo/vector-icons";
import { Alert, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming, LinearTransition} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import * as Haptics from "expo-haptics"
import CardTask from "./CardTask.jsx";

 // separate responsibility (добавя gester behaviour and posibility to construct it) so cardTask only render
    export default function CardTaskWithGestures({
        task,
        index,
        itemCount,
        categories,
        removeTask,
        onReorder,
        rowTop,
        rowHeight,
        scrollY,
        isActive,
        dragY,
        dragScale,
        onRowLayout,
        onDragStart,
        onDragMove,
        onDragEnd,
        dragFromIndex,
        dragToIndex,
        draggedRowHeight,
    }) {
        const startY = useSharedValue(0);
        const positionHorizontal = useSharedValue(0);

        function confirmDeleteTask (taskId) {
            Alert.alert(
                'Delete',
                'Are you sure you want to delete that task?',
                [
                    {
                        text: 'Dismiss',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        style: 'destructive',
                        onPress:() => removeTask(taskId)
                    }
                ]
            )
        }
        
        const ROW_GAP = 6;

        const animatedStyle = useAnimatedStyle(() => {
            const from = dragFromIndex.value;
            const to = dragToIndex.value;

            let translateY = 0

            if (from !== -1 && to !== -1 && index !== from) {
                const shift = draggedRowHeight.value + ROW_GAP;

                if(from < to && index > from && index <= to) {
                    // Draggin down: move intervening rows up
                    translateY = -shift;
                } else if (to < from && index >= to && index < from) {
                    // Draggin up: move intervening rows down.
                    translateY = shift;
                }
            }

            return {
                transform: [
                    { translateX: positionHorizontal.value},
                    {translateY: withTiming(translateY, {duration: 260}) },
                ]    
            }
        });
        
        const binOpacity = useAnimatedStyle (() => {
            const opacity = (-positionHorizontal.value -30) / 150; 
            // -50 е като trash hold след който ще се активира увеличаването на opacity-то ще започне да се увеличава
            //  (150 е като скорост за всеки пиксел (като при 100 след 100 пиксела ще е 100% което е доста бързо))

            return {
                opacity: Math.min(Math.max(opacity, 0), 1), // clamping - keep valid value range
                // Math.max(opacity, 0) - Returns the max of two values( prevent from going under 0, bcoz every time less than 0 will return zero)
                // Math.min((result),1) - Return smaller of two values - prevent from exceeding 1 (higeher than 1 will return 1)
                transform: [
                    {scale: ( -positionHorizontal.value + 60 )/100}
                ]
            }
        })

        const deleteGester = Gesture.Pan()
            .activeOffsetX([-20, 20]) // да се активира gesture-а при определена дистанция по xоризонтала
            .onUpdate((event) => {
                positionHorizontal.value = Math.min(event.translationX, 0); // only allow card move to the left
            })
            .onEnd((event) => {
                if(event.translationX < -100){
                    scheduleOnRN(confirmDeleteTask, task.id)
                //scheduleOnRN e за да се изпълни JS code, докато сме в React-native (анимациите се извършват в него)
                    return;
                }

                positionHorizontal.value = withTiming(0) // да се върне в началната си позиция в края (onEnd) на gesture-a кога се премине -100
            });
        
        const reorderGester = Gesture.Pan()
            .activateAfterLongPress(300) // активира gesture-a след задържане от половин секунда
            .onStart(() => {
                startY.value = rowTop - scrollY.value;
                dragY.value = startY.value;
                dragScale.value = withTiming(1.06)

                // scheduleOnRN(setIsDragging, true)
                scheduleOnRN(onDragStart, task.id, index, rowHeight)
                scheduleOnRN(Haptics.impactAsync); // selectionAsync - при активиране на gesture-a извибрирва (expo-haptic)
                // scale.value = withTiming(1.06)
            })
            .onUpdate((event)=> {
                // the overlay follows the finger continuesly
                dragY.value = startY.value + event.translationY;

                // Convert its center to list-content coordinates.
                const draggedCenterY = dragY.value + scrollY.value + rowHeight / 2;

                // The JS handler changes the order only when the target changes
                scheduleOnRN(onDragMove, task.id, draggedCenterY)
            })

            .onFinalize(() => {
                // dragScale.value = withTiming(1);
                scheduleOnRN(onDragEnd, task.id)
            })

        const combinedGesture = Gesture.Race(deleteGester, reorderGester);
        // .Race - ще се изпълните този gesture който първо се активира от детектора (за това и му се подава)

        return (
            <GestureDetector gesture={combinedGesture}>
                <Animated.View
                    onLayout={(event) => {
                        onRowLayout(task.id, event.nativeEvent.layout.height)
                    }}
                    layout={LinearTransition.duration(140) }
                    style={[
                        styles.container,
                        animatedStyle,
                    { opacity: isActive ? 0 : 1 },
                ]}
                >
                    <CardTask task={task} categories={categories}/>
                    
                    <Animated.View
                        pointerEvents="none"
                        style={[styles.deleteBtnAnimated, binOpacity]}>
                        <Ionicons name="trash-outline" size={25} color="#ff0000" />
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        )        
    }
const styles = StyleSheet.create({
    container: {
        position: 'relative'
    },
    deleteBtnAnimated: {
        position: 'absolute',
        zIndex: -1,
        right: 20,
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 8,
    }    
})