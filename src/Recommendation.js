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
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
    customWidth: {
        width: 150,
    },
    imgStyle: {
        height: 150,
        width: 150
    },
    display: 'flex',
    alignItems: 'center',
    fontSize: 40,
    divStyle: {
        height: 150
    },
    divImage: {
        height: 150,
        width: 150
    },
    divTableTr: {
        borderBottom: '1 solid black'
    },
    divTableTdContent: {
        textAlign: 'left',
        verticalAlign: 'top'
    },
    divTable: {
        align: 'top'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 300
    },

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
            noimage: require("./No_image_available.svg"),
            dataSource3: [],
            showCheckboxes: false,
            searchWidth: true
        };
    }

    loadUserSearch() {
        const url = "https://raw.githubusercontent.com/gurupathidev/RecoEngine/master/usersearchdetails.json";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ dataSource3: data });
            })
            .catch(
            err => console.error(this.props.url, err.toString())
            )
    }
    loadData() {
        const url = "https://raw.githubusercontent.com/gurupathidev/RecoEngine/master/recommended.json";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ recommendeddetails: data });
            })
            .catch(
            err => console.error(this.props.url, err.toString())
            )
    }
    onUpdateInput(inputValue) {
        console.log(inputValue);
    }

    componentDidMount() {
        this.loadData();
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
                    dataSource={this.state.dataSource3}
                    dataSourceConfig={dataSourceConfig}
                    maxSearchResults={5}
                    fullWidth={this.state.searchWidth}
                    onUpdateInput={this.onUpdateInput}
                />
                <br />
                <div>
                    <Subheader><b>Recommended Details</b> </Subheader>
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
                </div>
            </div>
        );
    }
}

export default Recommendation;