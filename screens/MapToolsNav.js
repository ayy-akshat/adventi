import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BreadcrumbsScreen from './MapTools/Breadcrumbs';
import MapToolsScreen from './MapTools/MapTools';

const Stack = createStackNavigator();

export default class MapToolsNav extends React.Component
{
    render()
    {
        return (
            <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen
                name="MapTools"
                component={MapToolsScreen}
                />
                <Stack.Screen
                name="Breadcrumbs"
                component={BreadcrumbsScreen}
                />
            </Stack.Navigator>
        );
    }

}