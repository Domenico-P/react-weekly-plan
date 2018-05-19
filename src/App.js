import React, { Component } from 'react';
import './App.css';
import WeeklyCalendar from './WeeklyCalendar';


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
      { assignee: 1, weekYear: 2018, weekNumber: 21, project: 'ABF' },
      { assignee: 2, weekYear: 2018, weekNumber: 20, project: 'R&D' }
    ]
  };

  findPlans(humanId, weekYear, weekNumber) {
    return this.state.plans.filter(plan =>
      plan.assignee === humanId &&
      plan.weekYear === weekYear &&
      plan.weekNumber === weekNumber
    );
  }

  addUser = () => {
    var name = prompt("Inserisci il nome del nuovo utente: ");
    if( name == null || name === "")
      return;
    else{
      let list = this.state.humans.concat({id: this.state.humans.length + 1, name: name});
      this.setState({ humans: list });
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Calendar planner</h1>
        </header>
        <div onClick={this.addUser}>Aggiungi utente</div>
        <WeeklyCalendar
          rows={this.state.humans}
          overscanBefore={1}
          overscanAfter={1}
          renderRowLabel={row => row.name}
          renderWeekCell={(row, weekYear, weekNumber) =>
            this.findPlans(row.id, weekYear, weekNumber).map(plan => plan.project)}
        />
      </div>
    );
  }
}

export default App;
