import React, {Component} from 'react';
import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';
import { DISHES } from '../shared/dishes';



export default class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    

    render() {
        const RenderDish = (props)=>{
            const dish = props.dish;
            if(dish!=undefined){
                return(
                    <Card
                        featuredTitle={dish.name}
                        image={require('./images/uthappizza.png')}>
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                        </Card>
                );
            }
            else{
                return(
                    <View></View>
                );
            }   
        }
        // const dishId = this.props.navigation.getParam('dishId','');
        return(
            <RenderDish dish={this.state.dishes[0]} />
        );
    }
}