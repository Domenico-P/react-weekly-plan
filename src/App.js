import React, { Component } from 'react';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar'
import Button from '@material-ui/core/Button';

class App extends Component {
  state = {
    humans: [
      { id: 1, name: 'Domenico' },
      { id: 2, name: 'Pier' },
      { id: 3, name: 'Gianpietro' },
      { id: 4, name: 'Carlo' },
      { id: 5, name: 'Roberto' },
    ],
    plans: [
      /*{ assignee: 1, weekYear: 2018, weekNumber: 21, project: <div className="Single-Plan">ABF</div> },
      { assignee: 2, weekYear: 2018, weekNumber: 20, project: <div className="Single-Plan">R&D</div> }*/
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

  addNewPlan = (weekYear, weekNumber, id) => {
    var name = prompt("Inserisci il nome del progetto: ");
    if (name == null || name === "")
      return;
    else {
      let list = this.state.plans.concat({ assignee: id
                                         , weekYear: weekYear
                                         , weekNumber: weekNumber
                                         , project: <div className="Single-Plan">{name}</div> });
      this.setState({ plans: list });
    }
  }

  addNewUser = () => {
    const { humans } = this.state;
    var name = prompt("Inserisci il nome del nuovo utente: ");
    if( name == null || name === "")
      return;
    else{
      let list = humans.concat({id: humans.length + 1, name: name});
      this.setState({ humans: list });
    }
  }

  addWeeksView = () => {
    const { valueBefore, valueAfter  } = this.state;
    this.setState({ valueBefore: valueBefore + 1, valueAfter: valueAfter + 1 });
  }

  removeWeeksView = () => {
    const { valueBefore, valueAfter  } = this.state;
    if ( valueBefore === 0 && valueAfter === 0 ) return;
    else
    {
    this.setState({ valueBefore: valueBefore - 1 , valueAfter: valueAfter - 1 });
    }
  }

  removeUsers = (name, id) => {
      const { humans } = this.state;
      var pos=-1;

      for(var i = 0; i<humans.length; i++ ){
        if(humans[i].id === id){
          pos=i;
          break;
        }
      }
      var sliced = humans.slice(0,pos);
      var list = [];
      var k = 0;
      for(i = pos+1; i<humans.length; i++ ){
        list[k]=humans[i];
        k++;
      }
      var newList = sliced.concat(list);
      this.setState({ humans: newList });
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
          removeUser = { (name, id) => this.removeUsers(name, id) }
        />
      </div>
    );
  }
}

export default App;
