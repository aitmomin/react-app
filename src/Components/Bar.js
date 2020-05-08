import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


class Bar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mykeyword:''
        }
    }

    render() {
        return (
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
        );
    }

    searchKey=(e) => {
        e.preventDefault();
        this.props.keyword(this.state.mykeyword);
        this.setState({
            mykeyword: ''
        });
    }
    
    setKeyValue=(e) =>{
        this.setState({
            mykeyword: e.target.value
        });
    }
}

export default Bar;
