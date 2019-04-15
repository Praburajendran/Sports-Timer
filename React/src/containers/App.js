import React, { Component } from "react";
import './App.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sports from "../components/SportsTimer";
import { updateData } from '../store/actions';


class App extends Component {

  componentDidMount() {
    this.props.updateData();
  }

  render() {
    const {
      posData
    } = this.props;

    return (
     <div className ="App">
        <Sports response={posData}>
        </Sports>
     </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch =>
    bindActionCreators({
      updateData
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);