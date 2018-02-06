import React from 'react';

import Subheader from 'material-ui/Subheader';

import AutoComplete from 'material-ui/AutoComplete';

import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import ReactImageFallback from "react-image-fallback";

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    recommendationdiv:{
        align:'left'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 300
    },
    divsubheader:{
    align:'center',
    textalign:'center'
    }
};

const dataSourceConfig = {
    text: 'textKey',
    value: 'valueKey',
};

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendeddetails: [],
            recommendedbrowsed: [],
            noimage: require("./No_image_available.svg"),
            userDS: [],
            searchWidth: true,
            userVal:"",
            userURL:"https://raw.githubusercontent.com/trilaiclub/Reco_AI/master/users.json",
            searchURL:"http://engine:3001/api/RecoEngine/Compute"
        };
    }
    
    loadUserSearch() {        
        fetch(this.state.userURL)
            .then(response => response.json())
            .then(data => {
                this.setState({ userDS: data });
            })
            .catch(
            err => console.error(this.props.url, err.toString())
            )
    }
    loadData(){
        if(this.state.userVal!=="")
        {
            var finalSearchURL = this.state.searchURL+"?userid="+this.state.userVal+"&action=puruchased";
            //finalSearchURL= "https://raw.githubusercontent.com/gurupathidev/RecoEngine/master/recommended.json";
            fetch(finalSearchURL)
                .then(response => response.json())
                .then(data => {
                    if(this.state.userVal!=="")
                    {                  
                        this.setState({ recommendeddetails: data.response });
                    }
                    else{
                    this.setState({ recommendeddetails: [] });
                    }
            
                })
                .catch(
                err => console.error(this.state.url, err.toString())
                )

                //Browsed               
               finalSearchURL = this.state.searchURL+"?userid="+this.state.userVal+"&action=browsed";
            //finalSearchURL= "https://raw.githubusercontent.com/gurupathidev/RecoEngine/master/recommended.json";
            fetch(finalSearchURL)
                .then(response => response.json())
                .then(data => {
                    if(this.state.userVal!=="")
                    {                  
                        this.setState({ recommendedbrowsed: data.response });
                    }
                    else{
                    this.setState({ recommendedbrowsed: [] });
                    }
            
                })
                .catch(
                err => console.error(this.state.url, err.toString())
                )
            
        }
        else {
            console.log("Please select user");
        }
        
    }
    onUpdateInput(inputValue) {
        console.log(inputValue.valueKey);     
        this.state.userVal=inputValue.valueKey;
        this.loadData();
    }

    componentDidMount() {        
       // this.loadData();
        this.loadUserSearch();
    }

    handleChange = (event, index, value) => this.setState({ value });
    render() {

        return (
            <div style={styles.root}>
                <br />
                <AutoComplete
                    floatingLabelText="Search User"
                    filter={AutoComplete.fuzzyFilter}
                    dataSource={this.state.userDS}
                    dataSourceConfig={dataSourceConfig}
                    maxSearchResults={5}
                    fullWidth={this.state.searchWidth}
                    onNewRequest={this.onUpdateInput.bind(this)}
                    serchText={this.state.userVal}
                />
                <br />              
                <div style={styles.recommendationdiv}>
                    <Subheader style={styles.divsubheader}><h2>Purchased Recommentations</h2> </Subheader>
                    {this.state.recommendeddetails.map((tile) => (
                        <Card >
                            <CardHeader
                                title={<span><b> {tile.title}</b></span>} />
                            <CardMedia >
                                <ReactImageFallback src={tile.urltoimage}
                                    fallbackImage={this.state.noimage}
                                    alt=""
                                    style={styles.media} />
                            </CardMedia>
                            <CardText >
                                <span>{tile.description}</span>
                            </CardText>
                            <CardActions>
                                <a href={tile.sourceurl} target="_blank">
                                    <FlatButton label="More..." />
                                </a>
                            </CardActions>
                        </Card>
                    ))}
                    <br/>
                    <hr/>
                    <Subheader style={styles.divsubheader}><h2>Browsed Recommentations</h2> </Subheader>
                    {this.state.recommendedbrowsed.map((tile) => (
                        <Card >
                            <CardHeader
                                title={<span><b> {tile.title}</b></span>} />
                            <CardMedia >
                                <ReactImageFallback src={tile.urltoimage}
                                    fallbackImage={this.state.noimage}
                                    alt=""
                                    style={styles.media} />
                            </CardMedia>
                            <CardText >
                                <span>{tile.description}</span>
                            </CardText>
                            <CardActions>
                                <a href={tile.sourceurl} target="_blank">
                                    <FlatButton label="More..." />
                                </a>
                            </CardActions>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export default Recommendation;
