import React, { Component } from 'react';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar'


class App extends Component {
  state = {
    humans: [
      /*{ id: 1, name: 'Domenico' },
      { id: 2, name: 'Pier' },
      { id: 3, name: 'Gianpietro' },
      { id: 4, name: 'Carlo' },
      { id: 5, name: 'Roberto' },*/
    ],
    plans: [
      /*{ assignee: 1, weekYear: 2018, weekNumber: 21, project: 'ABF' },
      { assignee: 2, weekYear: 2018, weekNumber: 20, project: 'R&D' }*/
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
      let list = this.state.plans.concat({ assignee: id, weekYear: weekYear, weekNumber: weekNumber, project: name });
      this.setState({ plans: list });
    }
  }

  addUser = () => {
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
      //console.log(humans);
      var pos=-1;

      for(var i = 0; i<humans.length; i++ ){
        //console.log(humans[i].id, "===", id);
        if(humans[i].id === id){
          pos=i;
          break;
        }
      }
      //console.log("indexOf: ", pos);
      var sliced = humans.slice(0,pos);
      //console.log("sliced: ", sliced);
      var list = [];
      var k = 0;
      //console.log("humans.length: ",humans.length);
      for(i = pos+1; i<humans.length; i++ ){
        list[k]=humans[i];
        k++;
      }
      //console.log(list);
      var newList = sliced.concat(list);
      //console.log(newList);
      this.setState({ humans: newList });
  }


  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Calendar planner</h1>
        </header>
        <div className="App-bar">
          <button className="App-button" onClick={this.addUser}>Aggiungi utente</button>
          <button className="App-button" onClick={this.addWeeksView} >+</button>
          <button className="App-button" onClick={this.removeWeeksView}>-</button>
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
