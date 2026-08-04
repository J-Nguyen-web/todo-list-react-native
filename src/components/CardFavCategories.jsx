import { TouchableOpacity } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardFavCategories(
    item
) {
    console.log(item)
    const category = CATEGORY_CONFIG[item.data.category] ?? CATEGORY_CONFIG.Personal
    const Icon = category.Icon    
    return (
        <TouchableOpacity>
            <Icon name={name} size={size} color={color} />
            <Text></Text>
            <Text></Text>
        </TouchableOpacity>
    );
}