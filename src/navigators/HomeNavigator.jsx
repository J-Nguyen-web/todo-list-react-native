import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const greeting = 'Good Morning' // todo changable depending on the hours of the day
const username = 'Nguyen' // todo changable depending on the user.username
const message = 'Be productive' // todo different message depending from the time

const SCREEN_WIDTH = Dimensions.get('window').width;
const backgroundImage = require('../../assets/HJZTBMVW8AEeDLM.jpg');
const imageSource = Image.resolveAssetSource(backgroundImage);
const IMAGE_HEIGHT = SCREEN_WIDTH * (imageSource.height / imageSource.width);
const FADE_HEIGHT = 160; // fade starts 160 units before image ends

export default function HomeNavigator() {
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
                        <Text>Favorite Categories</Text>
                        <Text>Edit</Text>
                    </View>
                    <View style={styles.dayliTasks}>
                        <Text>Daily Tasks</Text>
                        <Text>Edit</Text>
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
        backgroundColor: '#000',
        width: '100%',
        height: '60%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
    },

    favoriteCategories: {
        backgroundColor: '#19cc16',
        width: '90%',
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
    },

    dayliTasks: {
        flex: 1,
        backgroundColor: '#cb2828',
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,        
    }
})