import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CategoryCreate() {

    const [ categoryName, setCategoryName] = useState('');
    const [emoji, setEmoji] = useState('📝')

    const isEmoji = (text) => {
        const regex = /\p{Extended_Pictographic}/u;
        return regex.test(text)
    }

    if (!isEmoji(emoji)) {
        Alert.alert('Please choose an emoji');
        return;
    }

    return (
        <View>
            <Text>Category Name</Text>
            
            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Category..."
            />
            
            <Text> Emoji </Text>

            <TextInput
                value={emoji}
                onChangeText={setEmoji}
                placeholder="😊"
                maxLength={2}
                style={{
                    fontSize: 20,
                    textAlign: 'center',
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderRadius: 15,
                }}
            />
            
            <TouchableOpacity onPress={() => inputRef.current.focus()}>
                <Text style={{ fontSize: 40}}>{emoji}</Text>
            </TouchableOpacity>

            <TextInput
                ref={inputRef}
                value={emoji}
                onChangeText={setEmoji}
                style={{ position: 'absolute', opacity: 0}}
            />
        </View>
    );
}