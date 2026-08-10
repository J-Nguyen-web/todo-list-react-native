import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";

export const CATEGORY_CONFIG = {
    Work: {
        Icon: SimpleLineIcons,
        icon: 'briefcase',
        size: 25,
        color: '#3338ca',
        background: '#d8e0f8',
    },
    Shopping: {
        Icon:   MaterialCommunityIcons,
        icon: 'cart-variant',
        size: 33,
        color: '#16803D',
        background: '#dcfce7',
    },
    Personal: {
        Icon: MaterialCommunityIcons,
        icon: 'account',
        size: 25,
        color: '#a548ec',
        background: '#dccefaa6',
    },
    Study: {
        Icon: MaterialCommunityIcons,
        icon: 'book-open-page-variant-outline',
        size: 28,
        color: '#e9751c',
        background: '#ffe3bc',
    },
    Daily: {
        Icon: MaterialCommunityIcons,
        icon: 'sun-clock-outline',
        size: 28,
        color: '#00e0e0',
        background: '#c3ffff',
    },
    Health: {
        Icon: MaterialCommunityIcons,
        icon: 'heart-pulse',
        size: 31,
        color: '#df2323',
        background: '#fcdcdc',
    },
    
}