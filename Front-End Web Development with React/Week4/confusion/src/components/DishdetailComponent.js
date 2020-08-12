import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Row,Col,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Component } from 'react';
import {LocalForm,Control,Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen:false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleSumbit(value){
        this.props.postComment(this.props.dishId, value.rating, value.author, value.comment);
        console.log('Current State is: ' + JSON.stringify(value));
    }
    render(){
        return(
            <div className="col-12">
            <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg" /> Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSumbit(values)}>
                    <Row className="form-group" >
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={12} >
                            <Control.select model=".rating" name="rating" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model='.author' name='author' placeholder="Your Name" className="form-control"
                                        validators={{required,
                                                    minLength:minLength(3),
                                                    maxLength:maxLength(15)}}   />
                            <Errors className="text-danger" show="touched" model=".author" 
                                messages={required ? {
                                    required:"Required"
                                }:
                                {   
                                    minLength:"Must be greater than 2 character",
                                    maxLength:"Must be less than 15 character"
                                }
                                }/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={12}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" name='comment' rows={6} className="form-control"/>
                        </Col>
                    </Row>
                    <Button color="primary" type="submit" value='sumbit' >Submit</Button>
                </LocalForm>
              </ModalBody>
            </Modal>
          </div>
        );
    }




}


function RenderDishDetail(comment){ 

    const dishCommnets = comment.map((cmnt)=>{    
        return(
                <Fade in>
                <li key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>
                    <CardText>--{cmnt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</CardText>
                </p>
                </li>
                </Fade>
        );
    });
    return dishCommnets;
}

function RenderDish(dish,comment,postComment){ 
        if(dish!=null){
            return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}> 
                        <Card key={dish.id}>
                            <CardImg width="100%" src={baseUrl +  dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle><h4>{dish.name}</h4></CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                </FadeTransform>

                </div>
                <div className="col-12 col-md-5 m-1">
                    <CardBody>
                        <CardText><h4>Comments</h4></CardText>
                        <ul className="list-unstyled">
                            <Stagger in>
                                {RenderDishDetail(comment)}
                            </Stagger>
                        </ul>
                        
                    </CardBody>
                    <CommentForm dishId={dish.id} postComment={postComment} ></CommentForm>
 
                </div>
               
            </div>
            );
        }
        return(
            <div></div>
        );        
    }
const DishDetail = (props) =>  {
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish!==undefined){
        return (
                <div className="container">
                    
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    {RenderDish(props.dish,props.comments,props.postComment)}
                    
                </div>
                

        );
    }
    else{
        return(<div></div>);
    }        
}


export default DishDetail;