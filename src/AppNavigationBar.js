import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


class AppNavigationBar extends  React.Component {
  constructor(props) {
        super(props);
        this.state = {date: new Date()};
      }
      componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
 render(){

 return(
  <AppBar
    title="Reco Engine UI"    
    showMenuIconButton={false}
    iconElementRight={<FlatButton label={this.state.date.toLocaleTimeString()}/>}
  />
 );
}
}

export default AppNavigationBar;