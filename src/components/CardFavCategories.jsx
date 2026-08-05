import { TouchableOpacity } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardFavCategories(
    title ,
    description,
    category ,
) {

    const favTypes = ['Work', 'Study']
    const favType = '';
    if (favTypes.contains[category]){
        favType = category
    } else {
        return;
    }
    const categoryType = CATEGORY_CONFIG[favType] ?? CATEGORY_CONFIG.Personal
    const Icon = category.Icon    
    return (
        <TouchableOpacity>
            <Icon name={categoryType.icon} size={categoryType.size} color={categoryType.color} />
            <Text>{categoryType.category}</Text>
            <Text></Text>
        </TouchableOpacity>
    );
}