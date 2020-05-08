import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import { Link} from "react-router-dom";

class HitItem extends Component {

    render() {
        return (
            <div className="col-md-3 mb-4">
                <Card border="primary"
                      style={{ width: '100%' }}>
                    <Card.Body>
                        <Card.Img variant="top" src={this.props.hit.webformatURL} height="200"/>
                        <Card.Title>{ this.props.hit.tags }</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">({this.props.hit.webformatWidth } x { this.props.hit.webformatHeight})</Card.Subtitle>
                        <Link to={"/hitDetails/"+this.props.hit.id}>
                            More Details<span className="glyphicon glyphicon-chevron-right btn-xs" aria-hidden="true"></span>
                            {localStorage.removeItem("mypage")}
                            {localStorage.removeItem("myword")}
                            {localStorage.setItem("mypage", this.props.mypage )}
                            {localStorage.setItem("myword", this.props.myword)}
                        </Link>
                        <br/>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default HitItem;
