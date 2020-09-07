import React, { Component,useState } from "react";
import { Text, View, ScrollView, StyleSheet, Switch, Button, Picker,   TouchableWithoutFeedback,Platform, Modal, SafeAreaView, Alert  } from 'react-native';
import { Icon } from 'react-native-elements';
import {Button as ElBut}  from 'react-native-elements' ;
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import * as Animatable from 'react-native-animatable';


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
        this.toggleModal =this.toggleModal.bind(this);

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
                {text:"OK",onPress:()=>this.resetForm()}
            ],
            { cancelable: false }
        );


        this.state.isDateVisible? this.toogleDate():null;
        this.toggleModal();
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
    toggleModal() {
        this.setState({showModal: !this.state.showModal});
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

