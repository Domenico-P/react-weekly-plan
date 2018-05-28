import React, { Component } from 'react';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar';

class Plan extends Component {

  static defaultProps = {
    removePlan: (event, idPlan) => null
  };

  render() {
    return (
      <div id="dragElement" className="Single-Plan" draggable="true">
        {this.props.namePlan}
        <img className="Plan-Icon-Close" src="img/close.png" onClick={ (event) => this.props.removePlan(event, this.props.idPlan)}/>
      </div>
  )}
}

class App extends Component {
  state = {
    humans: [
      { id: 1, name: 'Domenico' },
      { id: 2, name: 'Pier' },
      { id: 3, name: 'Gianpietro' },
      { id: 4, name: 'Carlo' },
      { id: 5, name: 'Roberto' }
    ],
    plans: [
      //{ id: 1, assignee: 1, weekYear: 2018, weekNumber: 21, project: <Plan namePlan={'Project-1'}/> },
    ],
    valueBefore: 1,
    valueAfter: 1
  };

  findPlans(humanId, weekYear, weekNumber) {
    return this.state.plans.filter(plan =>
      plan.assignee === humanId &&
      plan.weekYear === weekYear &&
      plan.weekNumber === weekNumber
    );
  }


  removePlan = (event, idPlan) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState( ({ plans }) => ({ plans: (plans).filter( plan => (plan.id !== idPlan) ) }) );
  }

  addNewPlan = ( weekYear, weekNumber, idHuman) => {
    const { plans } = this.state;
    var name = prompt("Inserisci il nome del progetto: ");
    var index;
    var length = plans.length;

    if( length === 0 )
      index = 0;
    else
      index = plans[length-1].id;

    if (name == null || name === "")
      return;
    else {
      this.setState( ({ plans }) => ({ plans: (plans).concat({ id: index+1
                                                             , assignee: idHuman
                                                             , weekYear: weekYear
                                                             , weekNumber: weekNumber
                                                             , project: <Plan
                                                                          removePlan = { (e, idPlan) => this.removePlan(e, idPlan) }
                                                                          namePlan={name}
                                                                          idPlan={index+1}
                                                                        />
                                                             })}));
    }
  }

  addNewUser = () => {
    const { humans } = this.state;
    var name = prompt("Inserisci il nome del nuovo utente: ");
    var length = humans.length;
    var index;
    if(length === 0)
      index = 0;
    else
      index = humans[length-1].id;

    if( name === null || name === "")
      return;
    else
      this.setState( ({ humans }) => ({ humans: (humans).concat( {id: index + 1 , name: name} ) }) );
  }

  addWeeksView = () => {
    const { valueBefore, valueAfter } = this.state;
    if ( valueBefore === 5 && valueAfter === 5 ) return;
    else
    {
      this.setState({ valueBefore: valueBefore + 1, valueAfter: valueAfter + 1 });
    }
  }

  removeWeeksView = () => {
    const { valueBefore, valueAfter  } = this.state;
    if ( valueBefore === 0 && valueAfter === 0 ) return;
    else
    {
      this.setState({ valueBefore: valueBefore - 1 , valueAfter: valueAfter - 1 });
    }
  }

  removeUser = (name, id) => {
    this.setState( ({ humans, plans }) => ({ humans: (humans).filter( user => (user.id !== id) ),
                                             plans: (plans).filter( plan => (plan.assignee !== id) )
                                    }) );
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Calendar planner</h1>
        </header>
        <div className="App-bar">
          <button className="App-button" onClick={this.addNewUser}><img className="App-button-icon" src="img/addUser.png" width="20px" height="20px"/></button>
          <button className="App-button" onClick={this.removeWeeksView}><img className="App-button-icon" src="img/zoom-in.png" width="20px" height="20px"/></button>
          <button className="App-button" onClick={this.addWeeksView}><img className="App-button-icon" src="img/zoom-out.png" width="20px" height="20px"/></button>
        </div>
        <WeeklyCalendar
          rows={this.state.humans}
          overscanBefore={this.state.valueBefore}
          overscanAfter={this.state.valueAfter}
          renderRowLabel={row => row.name}
          renderWeekCell={(row, weekYear, weekNumber) =>
            this.findPlans(row.id, weekYear, weekNumber).map(plan => plan.project)}
          addPlan = { (weekYear, weekNumber, id) => this.addNewPlan(weekYear, weekNumber, id) }
          removeUser = { (name, id) => this.removeUser(name, id) }
        />
      </div>
    );
  }
}

export default App;
