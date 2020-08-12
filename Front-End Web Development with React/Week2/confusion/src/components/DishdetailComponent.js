import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb,BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

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
                </div>
            </div>
            );
        }
        return(
            <div></div>
        );        
    }
const DishDetail = (props) => {
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