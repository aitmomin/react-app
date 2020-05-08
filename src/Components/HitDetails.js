import React, { Component} from 'react';
import axios from "axios";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


class HitDetails extends Component {

    constructor(props) {
        super(props);
        this.state={
          hit: null,
          mykeyword:''
        };
    }

    componentDidMount() {
        this.getHit(this.props.match.params.id);
    }

    getHit(id){
        let url='https://pixabay.com/api/?' +
            'key=5832566-81dc7429a63c86e3b707d0429' +
            '&id='+ id;
        axios.get(url).then((resp) => {
            this.setState({
                hit: resp.data.hits[0]
            });
        }).catch((err => {
            console.log(err);
        }));
    }

    handleClick=()=> {
        this.props.history.push("/hits");
        let p = localStorage.getItem('mypage')
        let w = localStorage.getItem('myword')
        console.log(p)
        console.log(w)
        localStorage.setItem("sharedPage", p)
        localStorage.setItem("sharedWord", w)
    }

    searchKey=(e) => {
        e.preventDefault();
        this.props.history.push("/hits");
        let search = this.state.mykeyword
        console.log(search)
        localStorage.removeItem("search")
        localStorage.setItem("search", search)
        this.setState({
            mykeyword: ''
        });
    }

    setKeyValue=(e) =>{
        this.setState({
            mykeyword: e.target.value
        });
    }

    render() {
        if (this.state.hit !== null){
            return (
                <React.Fragment>
                    <div>
                        <div className="ml-3 mr-3 mt-4">
                            <Navbar bg="light" variant="light">
                                <Navbar.Brand ><b>Gallery App</b></Navbar.Brand>
                                <div className="pl-lg-5">
                                    <Form onSubmit={this.searchKey} inline>
                                        <FormControl onChange={this.setKeyValue} value={this.state.mykeyword} type="text" placeholder="Country, City ..." className="mr-sm-2" />
                                        <Button style={{ borderColor : '#0275d8' }} variant="outline-primary" type="submit">Search</Button>
                                    </Form>
                                </div>
                            </Navbar>
                        </div>
                        <br/>
                        <div className="col-md-12">
                            <Card border="primary"
                                  style={{ width: '100%' }}>
                                <Card.Body>
                                    <Card.Header >
                                        <Button variant="link" onClick={this.handleClick}>
                                            <b><span className="glyphicon glyphicon-repeat btn-xs" aria-hidden="true"></span>Back to Hits</b>
                                        </Button>
                                    </Card.Header>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {this.state.hit.likes}<span className="glyphicon glyphicon-thumbs-up btn-xs" aria-hidden="true"></span> |
                                        {' '+this.state.hit.favorites}<span className="glyphicon glyphicon-heart-empty btn-xs" aria-hidden="true"></span> |
                                        {' '+this.state.hit.views}<span className="glyphicon glyphicon-eye-open btn-xs" aria-hidden="true"></span> |
                                        {' '+this.state.hit.downloads}<span className="glyphicon glyphicon-download-alt btn-xs" aria-hidden="true"></span> |
                                        ({' '+this.state.hit.imageWidth } x { this.state.hit.imageHeight}) |
                                        {' '+this.state.hit.imageSize} Octets
                                    </Card.Subtitle>
                                    <Card.Img variant="top" src={this.state.hit.largeImageURL} height="400"/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div>
                    <div className="ml-3 mr-3 mt-4">
                        <Navbar bg="light" variant="light">
                            <Navbar.Brand ><b>Gallery App</b></Navbar.Brand>
                        </Navbar>
                    </div>
                    <br/>
                </div>
                </React.Fragment>
            );
        }
    }
}

export default HitDetails;
