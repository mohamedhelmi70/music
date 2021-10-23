import React from 'react';
import {Artist, Track} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {AppParamList} from '../../types';
import Tabbar from './Tab';
import {BackButton} from '../components';

const Stack = createStackNavigator<AppParamList>();

function Navigation() {
    return (
        <Stack.Navigator
            initialRouteName="Tab"
            screenOptions={{
                animationEnabled: false,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
                headerLeft: () => <BackButton color="#000" />,
            }}>
            <Stack.Screen name="Tab" component={Tabbar} options={{headerShown: false}} />
            <Stack.Screen name="Artist" component={Artist} />
            <Stack.Screen name="Track" component={Track} />
        </Stack.Navigator>
    );
}

export default Navigation;
