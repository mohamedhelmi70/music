import React from 'react';
import {Artist, Track} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {AppParamList} from '../../types';
import Tabbar from './Tab';
import {BackButton} from '../components';
import {wp} from '../constants';

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
            <Stack.Screen name="Artist" component={Artist} options={{headerShown: false}} />
            <Stack.Screen
                name="Track"
                component={Track}
                options={({route}) => ({
                    title: route.params.title,
                    headerTitleAlign: 'center',
                    headerTitleContainerStyle: {
                        width: wp('50%'),
                        alignItems: 'center',
                    },
                })}
            />
        </Stack.Navigator>
    );
}

export default Navigation;
