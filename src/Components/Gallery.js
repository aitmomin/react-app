import React, {Component} from 'react';
import axios from 'axios';
import Bar from "./Bar";
import Pagination from "react-js-pagination";
import HitItem from "./HitItem";
require('bootstrap/less/bootstrap.less');



class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state={
          hits:[],
          currentPage:1,
          pageSize:12,
          currentKeyWord:'',
          totalPages:1,
          pages:[],
          totalHits:0
        };
    }

    componentDidMount() {
        let page = localStorage.getItem("sharedPage")
        let word = localStorage.getItem("sharedWord")
        let search = localStorage.getItem("search")

        if (page !== null && word !== null){
            this.setState({
                currentKeyWord: word,
                currentPage: parseInt(page),
            }, () => this.getHits());
            localStorage.removeItem("sharedPage");
            localStorage.removeItem("sharedWord");
        } else if(search !== null) {
            this.setState({
                currentKeyWord: search,
            }, () => this.getHits());
            localStorage.removeItem("search");
        }else {
            this.getHits();
        }
    }

    getHits(){
        let YOUR_TOKEN_FROM_WEBSITE = ' GET YOUR TOKEN FROM pixabay.com/api ';
        let url='https://pixabay.com/api/?' +
            'key='+YOUR_TOKEN_FROM_WEBSITE +
            '&q='+this.state.currentKeyWord +
            '&page='+this.state.currentPage +
            '&per_page='+this.state.pageSize;
        axios.get(url).then((resp) => {
            let total = (resp.data.totalHits%this.state.pageSize===0)
                ?resp.data.totalHits/this.state.pageSize
                :Math.floor(resp.data.totalHits / this.state.pageSize)+1;
            this.setState({
                hits: resp.data.hits,
                totalPages: total,
                totalHits:resp.data.totalHits,
                pages: new Array(total).fill(0)
            });
        }).catch((err => {
            console.log(err);
        }));
    }

    searchWithKey=(e) => {
        this.setState({
            currentKeyWord: e,
            currentPage: 1
        }, () => this.getHits());
    }

    goToPage=(p) => {
        this.setState({
            currentPage: p
        }, () => this.getHits());
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            currentPage: pageNumber
        }, () => this.getHits());
    }

    render() {
        return (
            <div>
                <Bar keyword={this.searchWithKey}/>
                <br/>
                <div className="m-3">
                    <div className="text-center">
                        <Pagination
                            activePage={this.state.currentPage}
                            itemsCountPerPage={this.state.pageSize}
                            totalItemsCount={this.state.totalHits}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                    {/*<div className="row">
                        {
                            this.state.hits.map(hit =>
                                <div className="col-md-3 mb-4" key={hit.id}>
                                    <div className="card" >
                                        <div className="card-header">
                                            <p style={{fontSize:"12px"}}>
                                                <b>{ hit.tags }</b>
                                                <br/> ({hit.webformatWidth } x { hit.webformatHeight})
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            <img className="card-img" height="200" src={hit.webformatURL} alt="hit pic"/>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>*/}
                    <div className="row">
                        {
                            this.state.hits.map(hit =>
                                <HitItem hit={hit} key={hit.id} mypage={this.state.currentPage} myword={this.state.currentKeyWord} />
                            )
                        }
                    </div>
                    <div className="row">
                        {/*<ul className="nav nav-pills">
                            {
                                this.state.pages.map((value, index) =>
                                    <li key={index}>
                                        <a onClick={()=>this.goToPage(index+1)}
                                           className={this.state.currentPage===index+1?'btn btn-primary':'btn btn-link'} >
                                            {index+1}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;
