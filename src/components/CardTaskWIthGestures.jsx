import { Ionicons } from "@expo/vector-icons";
import { Alert, View, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import * as Haptics from "expo-haptics"
import CardTask from "./CardTask.jsx";

    const CARD_HEIGHT = 100;

 // separate responsibility (добавя gester behaviour and posibility to construct it) so cardTask only render
    const CardTaskWithGesture = ({
        task,
        index,
        categories,
        removeTask,
        onReorder   
    }) => {
        const positionHorizontal = useSharedValue(0); // 0 - начална точка ?
        const positionVertical = useSharedValue(0); // 0 - начална точка ?
        const scale = useSharedValue(1);

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
                
        const animatedStyle = useAnimatedStyle(() => {
            // const isSelected = scale.value > 1
            
            return {
                transform: [
                    { translateX: positionHorizontal.value },
                    { translateY: positionVertical.value },
                    { scale: scale.value } // за трансформация на целия елемент (в случая card)
                ],
                zIndex: isSelected ? 1 : 0, // за да минава пред другите елементи когато се провлачва (zIndex става 1 по default е 0)
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
            .failOffsetX([-15, 15])
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
                scheduleOnRN(Haptics.impactAsync); // selectionAsync - при активиране на gesture-a извибрирва (expo-haptic)
                scale.value = withTiming(1.06)
            })
            .onUpdate((event)=> {
                positionVertical.value = event.translationY;

                // промяна на индекса на елемента според нагоре или надолу по Y
                // if(event.translationY > CARD_HEIGHT) {
                //     scheduleOnRN(onReorder, task.id, index + 1);
                //     positionVertical.value -= CARD_HEIGHT;
                // } else if (event.translationY < -CARD_HEIGHT){
                //     scheduleOnRN(onReorder, task.id, index - 1);
                //     positionVertical.value += CARD_HEIGHT;
                // }
            })
            .onEnd(() => {
                const offset = Math.round(event.tranlsateY / CARD_HEIGHT)
                const targetIndex = Math.max(
                    0,
                    Math.min(itemCount -1, index + offset)
                );

                if(targetIndex !== index){
                    scheduleOnRN(onReorder, task.id, targetIndex)
                }

                positionVertical.value = 0;
                scale.value = withTiming(1)
            })
            .onFinalize(() => {
                positionVertical.value = 0;
                scale.value = withTiming(1)                
            })

        const combinedGesture = Gesture.Race(deleteGester, reorderGester);
        // .Race - ще се изпълните този gesture който първо се активира от детектора (за това и му се подава)

        return (
            <GestureDetector gesture={combinedGesture}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    <CardTask task={task} style={animatedStyle} categories={categories}/>
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