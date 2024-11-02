import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Page1 from './screens/Page1';
import Q2 from './screens/Q2'; // Make sure Q2 is created and placed in screens folder

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Page1">
                <Stack.Screen name="Page1" component={Page1} options={{ headerShown: false }} />
                <Stack.Screen name="Q2" component={Q2} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
