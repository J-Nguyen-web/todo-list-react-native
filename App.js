import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigators/RootNavigator.jsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from './src/database/migrations.js';

enableScreens();

export default function App() {
  return (
    <SQLiteProvider
        databaseName='todo.db'
        // actual database persist file
        onInit={migrateDbIfNeeded}
    >
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style='auto'/>
                        <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>        
    </SQLiteProvider>


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
