import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomSideBarOption from '../components/customSideBarOptions';
import AdvisoryScreen from '../screens/Advisory';
import HomeScreen from '../screens/HomeScreen';
import MapToolsScreen from '../screens/MapTools/MapTools';
import MapToolsNav from '../screens/MapToolsNav';
import NatureToolsScreen from '../screens/NatureTools/NatureTools';
import NatureToolsNav from '../screens/NatureToolsNav';
import PackCheckScreen from '../screens/PackCheckScreen';
import RemindersScreen from '../screens/RemindersScreen';

const Drawer = createDrawerNavigator();

export default class DrawerNav extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <Drawer.Navigator
                drawerContent={(props) => <CustomSideBarOption {...props} />}
            >
                <Drawer.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ unmountOnBlur: true }}
                />

                <Drawer.Screen
                    name="Map Tools"
                    component={MapToolsNav}
                    options={{ unmountOnBlur: true }}
                />
                
                <Drawer.Screen
                    name="Nature Tools"
                    component={NatureToolsNav}
                    options={{ unmountOnBlur: true }}
                />
                
                <Drawer.Screen
                    name="Packing Checklist"
                    component={PackCheckScreen}
                    options={{ unmountOnBlur: true }}
                />

                <Drawer.Screen
                    name="Reminders"
                    component={RemindersScreen}
                    options={{ unmountOnBlur: true }}
                />

                <Drawer.Screen
                    name="Advisory"
                    component={AdvisoryScreen}
                    options={{ unmountOnBlur: true }}
                />

            </Drawer.Navigator>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
