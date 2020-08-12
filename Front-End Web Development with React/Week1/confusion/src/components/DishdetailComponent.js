import React, { Component } from 'react';
import { CardText } from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedDish:this.props.dish,
            selectedComments:this.props.comment
        };
    }
    convertDate(date){
        
        var toReturn = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)));
        return toReturn;
    }
    renderDishDetail(comment){ 

        const dishCommnets = comment.map((cmnt)=>{
            
            return(
                <div key={cmnt.id} className="container">
                    <div className="row">
                        <CardText>{cmnt.comment}</CardText>
                    </div>
                    <div className="row">
                        <CardText>--{cmnt.author} , {this.convertDate(cmnt.date)}</CardText>
                    </div>
                    <div className="row">
                        
                    </div>
               </div>
            );
        });
        return dishCommnets;
    }
    render(){
        return this.renderDishDetail(this.state.selectedComments)
    }
}

export default DishDetail;