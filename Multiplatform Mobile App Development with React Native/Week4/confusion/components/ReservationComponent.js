import React, { Component,useState } from "react";
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker,   TouchableWithoutFeedback,Platform, Modal, SafeAreaView, Alert  } from 'react-native';
import { Icon } from 'react-native-elements';
import {Button as ElBut}  from 'react-native-elements' ;
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            isDateVisible:false,
            showModal:false
        }
        this.toogleDate =this.toogleDate.bind(this);

    }
    
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
        .catch(error=>{console.log(error)})
    }

    async addReservationToCalendar(date){
        const endDate = date;
        endDate.setHours(date.getHours()+2)
    
        let calendarPermi = await Permissions.getAsync(Permissions.CALENDAR);
        if(calendarPermi.status==="granted"){
            const calendars = await Calendar.getDefaultCalendarAsync();
            console.log(calendars)
            const createEvent = await Calendar.createEventAsync(calendars.id,{title:"Con Fusion Table Reservation",startDate:date,endDate:endDate    ,timeZone:"Asia/Hong_Kong",location:"121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong"});
            console.log("event ID"+{createEvent}  )
        }
    }
   
    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            "Your Reservation OK?",
            "Number of Guest: "+ this.state.guests +"\n"+
            "Smoking ? "+this.state.smoking+"\n"+
            "Date: "+this.state.date+"\n",
            [
                {text:"Cancel",onPress:()=>this.resetForm()},
                {text:"OK",onPress:()=>{this.presentLocalNotification(this.state.date);this.addReservationToCalendar(this.state.date);
                }}
            ],
            { cancelable: false }
        );

        this.state.isDateVisible? this.toogleDate():null;
        this.resetForm();
    }



    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        });
    }
    toogleDate(){
        this.setState({
            isDateVisible:!this.state.isDateVisible
        });
    }
    
    setDate = (event, date) => {
        this.setState(
            {date:date}
        )
    };
    

    render() {
        
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                {Platform.OS=='ios'?
                    <RNPickerSelect
                    onValueChange={(value) =>this.setState({guests: value})}
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '4', value: '4' },
                        { label: '5', value: '5' },
                        { label: '6', value: '6' }
                    ]}
                    
                />
                :
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                
                }
                
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    value={this.state.smoking}
                    thumbColor={this.state.smoking ? "#FF0000":"#00FF00"}
                    trackColor={{ false: "#767577", true: "#512DA8" }}
                    ios_backgroundColor={{ false: "#767577", true: "#512DA8" }}
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                    <ElBut icon={<Icon name='calendar' type='font-awesome' size={22}/>} type="clear" onPress={this.toogleDate}/>
                </View>
                    {this.state.isDateVisible && (
                     <View  style={styles.dateTimeMoadl}>
                     <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.date}
                        mode='date'
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate}
                        />                   
                    </View> )}

                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
            
                </View>
                </Animatable.View>
            
            </ScrollView>
            
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1,
        justifyContent:'space-around'
    },
    dateTimeMoadl:{
        flex: 1,
        justifyContent: 'flex-end'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;

