import { NavigationContainer } from "@react-navigation/native"
import { Home } from "../views/Home/Home"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types";
import { AddFood } from "../views/AddFood";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AddFood"
                    component={AddFood}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}