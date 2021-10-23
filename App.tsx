import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigation from './src/navigation/Navigation';
import {NavigationContainer} from '@react-navigation/native';

function App() {
    return (
        <SafeAreaView style={{flex: 1}} edges={['left', 'right']}>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default App;
