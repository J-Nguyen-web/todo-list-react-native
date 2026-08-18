import { StyleSheet, View, Text } from "react-native";
import { CATEGORY_CONFIG } from "../constants/categories.js";

export default function CardCategory({
    category,
    tasks,
    variant
}) {

    const categoryType = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.Personal
    const Icon = categoryType.Icon

    if (variant == "favorite") {
        const favTypes = ['Work', 'Study', 'Shopping', 'Health','Daily', 'Personal']
        if (!favTypes.includes(category)){
            return null
        }
    }
    const styles = variantStyles[variant]; // в зависимост от варианта на стила се извлича от обекта със стилове най-отдолу

    return (
        <View style={[styles.cardContainer, {backgroundColor: categoryType.background}]}>
            <View style={styles.category}>
                <Icon name={categoryType.icon} size={variant == "allTasksCategories" ? 22 : categoryType.size} color={categoryType.color} />
                <Text style={[styles.categoryTitle, {color: categoryType.color}]}> {category} </Text>
            </View>

            {variant == "allTasksCategories" ? ('')
                :(
                    <Text style={[styles.taskCount, {color: categoryType.color}]}>
                        {tasks.length} {tasks.length > 1 ? 'tasks' : 'task'}
                    </Text> 
                )
            }
        </View>
    );
}

// в зависимост от вариант се извлича определен style
const variantStyles={
    favorite:{
        category: {
            alignItems: 'center'
        },
        cardContainer: {
            borderRadius: 16,
            width: 110,
            height: 90,
            padding: 16,
            margin: 8,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,

            shadowColor: '#000',
            shadowOffset: {
                width: 3,
                height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,

            // android (combines all above)
            elevation: 3        
        },
    },
    sectionCategories: {
        cardContainer: {
            flex:1,
            flexDirection: 'row',
            // borderWidth: 1,
            // borderColor: '#cacaca',
            borderRadius: 14,
            backgroundColor: '#f70000',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 60,
            margin: 6,
            padding: 18,

            // iOs
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3,

            // android (combines all above)
            elevation: 3
        },

        category: {
            flexDirection: 'row',
            gap: 14,
            alignItems: 'center'
        },

        categoryTitle: {
            fontSize: 20
        },

        taskCount: {
            fontSize: 16,
        }
    },
    allTasksCategories: {
        cardContainer: {
            backgroundColor: '#f8873d',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 8,
        },
        category: {
            flexDirection: 'row',
            alignItems: 'center',            
        }
    }
}