import { TouchableOpacity, Text, View, } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardFavCategories(item) { 
    
    const favTypes = ['Work', 'Study']
    if (!favTypes.includes(item.category)){
        return null
    }

    const categoryType = CATEGORY_CONFIG[item.category] ?? CATEGORY_CONFIG.Personal
    const Icon = categoryType.Icon
    
    return (
        <TouchableOpacity>
            <Icon name={categoryType.icon} size={categoryType.size} color={categoryType.color} />
            <Text>{item.category}</Text>
            <Text>{item.tasks.length}</Text>
        </TouchableOpacity>
    );
}