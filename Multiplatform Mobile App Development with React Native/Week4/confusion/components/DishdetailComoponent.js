import React, {Component} from 'react';
import { Card,Icon,Rating,Input } from 'react-native-elements';
import { Text, View, ScrollView, FlatList, Modal, SafeAreaView, Button,PanResponder,Alert,Share } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



const input = React.createRef();

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (

            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                
                <View style={{flexDirection:"row"}}>
                    <Rating readonly={true} style={{margin:10, position: "relative",marginLeft:0}} imageSize={12} startingValue={parseInt(item.rating)} />
                </View>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        

        <Card title="Comments"  >  
            <FlatList 
            data={props.comments}
            renderItem={renderCommentItem}
            keyExtractor={comments => comments.id.toString()}
            />
        </Card>
        </Animatable.View>
    );
}

const shareDish = (title, message, url) => {
    Share.share({
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
    },{
        dialogTitle: 'Share ' + title
    })
}


class Dishdetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            author:'',
            comment:'',
            rating:5,
            showCommentModal:false
        };
        this.toggleComment = this.toggleComment.bind(this)
        this.addComment = this.addComment.bind(this)

    }
    handleViewRef = ref => this.view = ref;

    
    
    addComment(){
        const { dishId } = this.props.route.params;
        console.log(dishId,this.state.rating,this.state.author,this.state.comment)
        this.props.postComment(dishId,this.state.rating,this.state.author,this.state.comment);
        this.toggleComment();
    }
    toggleComment() {
        this.setState({showCommentModal:!this.state.showCommentModal});
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const RenderDish = (props)=>{
            const dish = props.dish;
            
            const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
                if ( dx < -100
                     )
                    return true;
                else
                    return false;
            }
            const dragLeft=({ moveX, moveY, dx, dy }) => {
                if ( dx > 100
                     )
                    return true;
                else
                    return false;
            }

            const panResponder = PanResponder.create({
                onStartShouldSetPanResponder: (e, gestureState) => {
                    return true;
                },
                onPanResponderGrant: () => {
                    this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
                },

                onPanResponderEnd: (e, gestureState) => {
                    console.log("pan responder end", gestureState);
                    if (recognizeDrag(gestureState))
                        Alert.alert(
                            'Add Favorite',
                            'Are you sure you wish to add ' + dish.name + ' to favorite?',
                            [
                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                            ],
                            { cancelable: false }
                        );
                    if (dragLeft(gestureState)){
                        this.toggleComment();
                    }
        
                    return true;
                }
            })

            if(dish!=undefined){
                return(
                    <React.Fragment>
                        <Modal animationType = {"slide"} transparent = {false}
                            visible ={this.state.showCommentModal}>
                            <SafeAreaView>
                                <Rating showRating startingValue={5} onFinishRating={(value)=>{this.state.rating=value}} />
                                <Input placeholder='Author' leftIcon={{ type: 'font-awesome', name: 'user-o' }} onEndEditing={(value)=>{this.state.author=value.nativeEvent.text}}   />
                                <Input placeholder='Comment' leftIcon={{ type: 'font-awesome', name: 'comment-o' }} onEndEditing={(value)=>{this.state.comment=value.nativeEvent.text}} />
                                <View style={{padding:10,margin:10}}>
                                    <Button title="Sumbit" color="#512DA8" onPress={this.addComment}/>
                                </View>
                                <View style={{padding:10,margin:10}}>
                                    <Button title="Cancel" color="#808080" onPress={()=>{this.toggleComment();}}/>
                                </View>              
                            </SafeAreaView>
                        </Modal>
                        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>

                        <Card
                            featuredTitle={dish.name}
                            image={{uri: baseUrl + dish.image}}>
                            <Text style={{margin: 10}}>
                                {dish.description}
                            </Text>
                            <View style={{flexDirection:"row",alignSelf:"center"}}>
                                <Icon raised reverse name={ props.favorite ? 'heart' : 'heart-o'} type='font-awesome' color='#f50'onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}/>
                                <Icon raised reverse name="pencil" type='font-awesome' color='#512DA8' onPress={this.toggleComment}/>
                                <Icon
                                    raised
                                    reverse
                                    name='share'
                                    type='font-awesome'
                                    color='#51D2A8'
                                    // style={styles.cardItem}
                                    onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                            </View>
                        </Card>
                        </Animatable.View>
                    </React.Fragment>

                );
            }
            else{
                return(
                    <View></View>
                );
            }   
        }
        const { dishId } = this.props.route.params;
            return(
            <ScrollView>                
                <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el === dishId)}
                            onPress={() => this.markFavorite(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);