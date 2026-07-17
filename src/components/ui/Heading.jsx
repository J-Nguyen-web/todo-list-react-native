import { StyleSheet, Text } from "react-native";

export default function Heading({ children, style, ...props}) {
    return (
        <Text style={[styles.heading, style]} {...props}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000'
    }
})