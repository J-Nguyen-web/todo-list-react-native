import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigators/RootNavigator.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
        <NavigationContainer>
            <StatusBar style='auto'/>
                    <RootNavigator />
        </NavigationContainer>
    </SafeAreaProvider>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
