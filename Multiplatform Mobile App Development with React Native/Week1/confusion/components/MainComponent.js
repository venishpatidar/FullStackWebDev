import React , {Component}from 'react';
import Menu from './MenuComponent';
import { View,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dishdetail from './DishdetailComoponent';
import Home from './HomeComponent';
import Contactus from './ContactComponent';
import About from './AboutComponent';


var options = 
    {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitle:"Title Goes Here",
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
const optio=(title)=>{
    var toReturn = options;
    toReturn.headerTitle=title
    return {...toReturn}
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Main extends Component{
    StackScreenMenu(){
        return(
            <Stack.Navigator>
                
                <Stack.Screen options={optio("Menu")} name="StackMenu" component={Menu} />
                <Stack.Screen options={optio("Dish Detail")} name="Dishdetail" component={Dishdetail} />
            </Stack.Navigator>
        );
    }
    StackScreenContact(){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("Contact Us")} name="Contact" component={Contactus} />
            </Stack.Navigator>
        )
    }
    StackScreenAbout(){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("About Us")} name="About" component={About} />
            </Stack.Navigator>
        )
    }
    
    render(){
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <NavigationContainer>
                    <Drawer.Navigator   drawerStyle={{backgroundColor: '#D1C4E9'}} initialRouteName="Home">
                        <Drawer.Screen name="Home" component={Home}/>
                        <Drawer.Screen name="About us" component={this.StackScreenAbout}/>
                        <Drawer.Screen name="Menu" component={this.StackScreenMenu}/>
                        <Drawer.Screen name="Contact us" component={this.StackScreenContact}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            </View>
        );
    }


}