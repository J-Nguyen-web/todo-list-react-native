import { TouchableOpacity, Text, View, StyleSheet, } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardFavCategories(item) { 
    
    const favTypes = ['Work', 'Study']
    if (!favTypes.includes(item.category)){
        return null
    }

    const categoryType = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.Personal
    const Icon = categoryType.Icon
    
    return (
        <TouchableOpacity style={[styles.cardContainer, {backgroundColor: categoryType.background}]}>
            <Icon name={categoryType.icon} size={categoryType.size} color={categoryType.color} />
            <Text style={{color: categoryType.color}}>{item.category}</Text>
            <Text style={{color: categoryType.color}}>{item.tasks.length>1 ?  'tasks' : 'task'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    cardContainer: {
        borderRadius: 16,
        padding: 16,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
