import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { findIndex, without } from 'lodash';

class App extends Component {
  constructor() {
    super();
    this.state = {//creates state variables 
      myAppointments: [],//the state is myAppointments is blank
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0//0 is the first item of the index and its value
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);//bind make it so .this refers to certain things in there respective props
    this.toggleForm = this.toggleForm.bind(this);// is binded because .this was used in created props below
    this.addAppointment = this.addAppointment.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchApts = this.searchApts.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }
//props are created here before render
  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay //! operator means delete so this means the current state of formdisplay maybe? has something to do with setting oppoisite in the constructor so opposite of false
    });
  }

  searchApts(query) {//recieve text that will have a query
    this.setState({ queryText: query });//stores query in queryText
  }

  changeOrder(order, dir) {//changes order and directory check searchAppointments. changeorder reciveing (order, dir) variables?
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateInfo(name, value, id) {//recieve name value id
    let tempApts = this.state.myAppointments;//the state of my appoitments
    let aptIndex = findIndex(this.state.myAppointments, {//finding index of myappointments and the ids of lastindex by adding aptId prop in inspect element on site
      aptId: id
    });
    tempApts[aptIndex][name] = value;//using aptIndex then pass the name in [] I want to edit if im in petname it can be changed etc
    this.setState({//then set the state with of myAppointments with the new values
      myAppointments: tempApts
    });
  }
  addAppointment(apt) {//the addAppointment props within each page are unique to each page they are used in
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({//.this now refers to deleteAppointment thanks to bind above
      myAppointments: tempApts
    });
  }

  componentDidMount() {//componetDidMount allow getting a remote file from a folder or server goes between constructor and render
    fetch('./data.json')
      .then(response => response.json())//.then is like a if statement for fetching
      .then(result => {
       
       //APTS variable being created
        const apts = result.map(item => {//apt turns into results array items turns into items.apt
          item.aptId = this.state.lastIndex;//item.aptID variable created and becomes this.state.lastindex this will keep track of the index currently being looped
          this.setState({ lastIndex: this.state.lastIndex + 1 });//as each of the elements of the array are looped add 1 to the value of lastindex
          return item;//lastindex: the state is 0 this.state.lastIndex + 1 adds 1
        });
        this.setState({
          myAppointments: apts//after results are taken myAppointments become the variable apts 
        });
      });
  }

  render() {
    let order;//ORDER VARIABLE BEING CALLED
    let filteredApts = this.state.myAppointments;
    if (this.state.orderDir === 'asc') {//if in acending order set value to 1 else -1
      order = 1;
    } else {
      order = -1;
    }

    filteredApts = filteredApts
      .sort((a, b) => {//goes through all elements in a array and rearrange depending on the value of the element
        if (// a converts to lowercase compares it to b 
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * order;//sorts according order variable and depending on weather asc or dec is clicked -1 is decending
        } else {
          return 1 * order;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['petName']
            .toLowerCase()//becomes lower case
            .includes(this.state.queryText.toLowerCase()) ||//test to see whats in the query string
          eachItem['ownerName']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['aptNotes']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments //this shows components
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}//creates toggle
                  addAppointment={this.addAppointment}//shows the addAppointment prop created in app.js
                />
                <SearchAppointments
                  orderBy={this.state.orderBy}//commponents are set then variables
                  orderDir={this.state.orderDir}
                  changeOrder={this.changeOrder}
                  searchApts={this.searchApts}
                />
                <ListAppointments
                  appointments={filteredApts}
                  deleteAppointment={this.deleteAppointment}
                  updateInfo={this.updateInfo}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
