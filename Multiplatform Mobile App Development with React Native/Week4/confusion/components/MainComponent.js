import React , {Component}from 'react';
import Menu from './MenuComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import Dishdetail from './DishdetailComoponent';
import Home from './HomeComponent';
import Contactus from './ContactComponent';
import About from './AboutComponent';
import {Icon, Button} from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favourites from './FavoriteComponent';
import Login from './LoginComponent';
import NetInfo from '@react-native-community/netinfo'
const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
  
const mapStateToProps = state => {
return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
}
}
var options = 
    {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerLeft: null,
        headerTitle:"Title Goes Here",
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
const optio=(title,navigation)=>{
    var toReturn = options;
    toReturn.headerTitle=title
    
    return {...toReturn,headerLeft: () => (
        <Icon style={{marginLeft:10}}name='th-list' type='font-awesome' size={24} onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />
        )}
}
const optioInside=(title)=>{
    var toReturn = options;
    toReturn.headerTitle=title
    
    return toReturn
}


function CustomDrawerContentComponent(props) {
    return(
        <ScrollView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                <View style={styles.drawerHeader}>
                    <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                    </View>
                    <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />     
    
        </ScrollView>
    );
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


class Main extends Component{

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
        NetInfo.fetch()
        .then((connectionInfo) => {
            console.log(connectionInfo)
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
        });

        NetInfo.addEventListener(state=>{this.handleConnectivityChange(state)})
    }

      handleConnectivityChange = (connectionInfo) => {
          console.log(connectionInfo.type)
        switch (connectionInfo.type) {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
      }

    StackScreenMenu({navigation}){
        return(
            <Stack.Navigator>
                
                <Stack.Screen options={optio("Menu",navigation)} name="StackMenu" component={Menu} />
                <Stack.Screen options={optioInside("Dish Detail")} name="Dishdetail" component={Dishdetail} />
            </Stack.Navigator>
        );
    }
    StackScreenContact({navigation}){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("Contact Us",navigation)} name="Contact" component={Contactus} />
            </Stack.Navigator>
        )
    }
    StackScreenAbout({navigation}){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("About Us",navigation)} name="About" component={About} />
            </Stack.Navigator>
        )
    }
    StackScreenHome({navigation}){
        
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("Home",navigation)} name="HomeStack" component={Home} />
            </Stack.Navigator>
        )
    }
    StackScreenReserve({navigation}){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("Resevation",navigation)}  name="ReserveStack" component={Reservation} />
            </Stack.Navigator>
        )
    }
    StackScreenFavourite({navigation}){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("My Favourites",navigation)}  name="ReserveStack" component={Favourites} />
            </Stack.Navigator>
        )
    }
    StackScreenLogin({navigation}){
        return(
            <Stack.Navigator>
                <Stack.Screen options={optio("Login",navigation)}  name="LoginStack" component={Login} />
            </Stack.Navigator>
        )
    }




    render(){
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <NavigationContainer>
                    <Drawer.Navigator  drawerContent = {(props)=> <CustomDrawerContentComponent {...props} />} drawerStyle={{backgroundColor: '#D1C4E9'}} initialRouteName="Home">
                        <Drawer.Screen name="Login" options={{drawerIcon:({ color, focused }) => ( <Icon name='sign-in' type='font-awesome' size={22} color={color}/>)}} component={this.StackScreenLogin}/>
                        <Drawer.Screen name="Home" options={{drawerIcon:({ color, focused }) => ( <Icon name='home' type='font-awesome' size={24} color={color}/>)}} component={this.StackScreenHome}/>
                        <Drawer.Screen name="About us" options={{drawerIcon:({ color, focused }) => ( <Icon name='info-circle' type='font-awesome' size={24} color={color}/>)}} component={this.StackScreenAbout}/>
                        <Drawer.Screen name="Menu" options={{drawerIcon:({ color, focused }) => ( <Icon name='list' type='font-awesome' size={24} color={color}/>)}} component={this.StackScreenMenu}/>
                        <Drawer.Screen name="Contact us" options={{drawerIcon:({ color, focused }) => ( <Icon name='address-card' type='font-awesome' size={22} color={color}/>)}} component={this.StackScreenContact}/>
                        <Drawer.Screen name="My Faourites" options={{drawerIcon:({ color, focused }) => ( <Icon name='heart' type='font-awesome' size={22} color={color}/>)}} component={this.StackScreenFavourite}/>
                        <Drawer.Screen name="Reservation" options={{drawerIcon:({ color, focused }) => ( <Icon name='cutlery' type='font-awesome' size={22} color={color}/>)}} component={this.StackScreenReserve}/>

                    </Drawer.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });

  export default connect(mapStateToProps, mapDispatchToProps)(Main);