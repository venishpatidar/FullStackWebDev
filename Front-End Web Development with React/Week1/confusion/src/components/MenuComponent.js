import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';



class Menu extends Component {
    constructor(props) {
        super(props);
        const emptyArray = [];
        
        this.state = {
            selectedDish:null,
            selectedComments: emptyArray
        };
        console.log("Constructor method invoked");
    }
    onDishSelect(dish){
        this.setState({selectedDish:dish});
        this.setState({selectedComments:dish.comments})
    }

    
    renderDish(dish,comment){ 
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
                        <DishDetail dish={dish} comment={comment}/>
                    </CardBody>
                </div>
            </div>
            );
        }
        return(
            <div></div>
        );        
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id} onClick={()=>this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
          <div className="container">
            <div className="row">
              {menu}
            </div>
            {this.renderDish(this.state.selectedDish,this.state.selectedComments)}
          </div>
        );
    }
}

export default Menu;