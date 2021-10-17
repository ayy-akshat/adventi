import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NatureToolsScreen from './NatureTools/NatureTools';
import PlantIdentifierScreen from './NatureTools/PlantIdentifier';

const Stack = createStackNavigator();

export default class NatureToolsNav extends React.Component
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
                name="NatureTools"
                component={NatureToolsScreen}
                />
                <Stack.Screen
                name="PlantIdentifier"
                component={PlantIdentifierScreen}
                />
            </Stack.Navigator>
        );
    }

}