import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,Row,Col,Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Component } from 'react';
import {LocalForm,Control,Errors} from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommenForm extends Component{
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
        console.log('Current State is: ' + JSON.stringify(value));
        alert('Current State is: ' + JSON.stringify(value));
        this.toggleModal();
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
            <div key={cmnt.id} className="container">
                <div className="row">
                    <CardText>{cmnt.comment}</CardText>
                </div>
                <div className="row">
                    <CardText>--{cmnt.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(cmnt.date)))}</CardText>
                </div>
                <div className="row">
                    
                </div>
            </div>
        );
    });
    return dishCommnets;
}

function RenderDish(dish,comment){ 
        if(dish!=null){
            return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">     
                    <Card key={dish.id}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle><h4>{dish.name}</h4></CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <CardBody>
                        <CardText><h4>Comments</h4></CardText>
                        {RenderDishDetail(comment)}
                    </CardBody>
                    <CommenForm></CommenForm>
 
                </div>
               
            </div>
            );
        }
        return(
            <div></div>
        );        
    }
const DishDetail = (props) =>  {

    if(props.dish!==undefined){
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
                    {RenderDish(props.dish,props.comments)}
                    
                </div>
                

        );
    }
    else{
        return(<div></div>);
    }        
}


export default DishDetail;