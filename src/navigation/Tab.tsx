import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomTabBar from './Tabbar';
import {AppParamList} from '../../types';
import {Home, Albums, Artists} from '../screens';

const Tab = createBottomTabNavigator<AppParamList>();

function Tabbar() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />}>
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Tab.Screen name="Artists" component={Artists} options={{headerShown: false}} />
            <Tab.Screen name="Albums" component={Albums} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}

export default Tabbar;
