import React, { Component } from 'react';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar';
import Button from '@material-ui/core/Button';

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
    humans: [ ],
    plans: [ ],
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
      this.setState( ({ humans }) => ({ humans: (humans).concat( {id: index + 1 , name: name} ) }) ); //TODO bug user con id uguale // RISOLTO
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
          <Button variant="raised" mini color="default" onClick={this.addNewUser}>Add user</Button>
          <Button variant="raised" mini color="default" onClick={this.removeWeeksView}>Zoom +</Button>
          <Button variant="raised" mini color="default" onClick={this.addWeeksView}>Zoom -</Button>
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
