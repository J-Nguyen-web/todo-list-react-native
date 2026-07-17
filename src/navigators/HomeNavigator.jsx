import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardTask from "../components/CardTask.jsx";
import Heading from "../components/ui/Heading.jsx";

const greeting = 'Good Morning' // todo changable depending on the hours of the day
const username = 'Nguyen' // todo changable depending on the user.username
const message = 'Be productive' // todo different message depending from the time

const SCREEN_WIDTH = Dimensions.get('window').width;
const backgroundImage = require('../../assets/HJZTBMVW8AEeDLM.jpg');
const imageSource = Image.resolveAssetSource(backgroundImage);
const IMAGE_HEIGHT = SCREEN_WIDTH * (imageSource.height / imageSource.width);
const FADE_HEIGHT = 160; // fade starts 160 units before image ends

const tasks =[
    {
        id: 1,
        title: 'task1',
        type: 'shoping',
        completed: true
    },
    {
        id: 2,
        title: 'task2',
        type: 'word',
        completed: true
    },
        
] 

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
                        <View style={styles.homeTaskHeader}>
                            <Heading>Favorite Categories</Heading>
                            <Heading>Edit</Heading>                            
                        </View>
                    </View>
                    <View style={styles.dayliTasks}>
                        <View style={styles.homeTaskHeader}>
                            <Heading>Daily Tasks</Heading>
                            <Heading>Edit</Heading>
                        </View>

                        <FlatList style={{flex: 1, backgroundColor: '#a01ad1', gap: 6}}
                            data={tasks}
                            renderItem={({ item }) => <CardTask {...item} />}
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
    },

    dayliTasks: {
        flex: 1,
        backgroundColor: '#cb2828',
        width: '90%',
        justifyContent: 'space-between',
    },

    homeTaskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        fontWeight: 800

    },
})