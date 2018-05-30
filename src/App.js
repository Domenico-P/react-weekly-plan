import React, { Component } from "react";
import "./App.css";
import WeeklyCalendar from "./WeeklyCalendar";
import AddUsersDialog from "./AddUsersDialog";
//import AddPlansDialog from "./AddPlansDialog";
import AddPlanDialog from "./AddPlanDialog";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

class Plan extends Component {
  static defaultProps = {
    removePlan: (event, idPlan) => null,
    dragStart: (event, idPlan, idHuman) => null,
    dragEnd: event => null
  };

  render() {
    return (
      <div
        id="dragElement"
        className="Single-Plan"
        draggable="true"
        onDragStart={event =>
          this.props.dragStart(event, this.props.idPlan, this.props.idHuman)
        }
        onDragEnd={event => this.props.dragEnd(event)}
      >
        {this.props.namePlan}
        <img
          className="Plan-Icon-Close"
          src="img/close.png"
          onClick={event => this.props.removePlan(event, this.props.idPlan)}
        />
      </div>
    );
  }
}

class App extends Component {
  state = {
    humans: [
      { id: 1, name: "Domenico" },
      { id: 2, name: "Pier" },
      { id: 3, name: "Gianpietro" },
      { id: 4, name: "Carlo" },
      { id: 5, name: "Roberto" }
    ],
    plans: [
      //{ id: 1, assignee: 1, weekYear: 2018, weekNumber: 21, project: <Plan namePlan={'Project-1'}/> },
    ],
    valueBefore: 1,
    valueAfter: 1,
    openAddUsersDialog: false,
    openAddPlansDialog: false,
    addPlanDialogOpen: false,
    addPlanDialogWeekYear: null,
    addPlanDialogWeekNumber: null,
    addPlanDialogIdHuman: null,
    addPlanDialogName: ""
  };

  findPlans(humanId, weekYear, weekNumber) {
    return this.state.plans.filter(
      plan =>
        plan.assignee === humanId &&
        plan.weekYear === weekYear &&
        plan.weekNumber === weekNumber
    );
  }

  dragStart(event, idPlan, idHuman) {
    console.log(event.target);
    console.log("DRAG:", idPlan, idHuman);
  }

  dragEnd(event) {
    console.log(event.target);
    console.log("OK");
  }

  removePlan = (event, idPlan) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(({ plans }) => ({
      plans: plans.filter(plan => plan.id !== idPlan)
    }));
  };

  handleOpenAddPlanDialog = (weekYear, weekNumber, idHuman) => {
    this.setState({
      addPlanDialogOpen: true,
      addPlanDialogWeekYear: weekYear,
      addPlanDialogWeekNumber: weekNumber,
      addPlanDialogIdHuman: idHuman,
      addPlanDialogName: ""
    });
  };

  handleAddPlanDialogClose = () => {
    this.setState({
      addPlanDialogOpen: false
    });
  };

  handleAddPlanDialogNameChange = event => {
    this.setState({
      addPlanDialogName: event.currentTarget.value
    });
  };

  handleAddPlanDialogSubmit = () => {
    this.setState({
      addPlanDialogOpen: false
    });

    const {
      plans,
      addPlanDialogWeekYear: weekYear,
      addPlanDialogWeekNumber: weekNumber,
      addPlanDialogIdHuman: idHuman,
      addPlanDialogName: name
    } = this.state;

    var index;
    var length = plans.length;

    if (length === 0) index = 0;
    else index = plans[length - 1].id;

    if (name == null || name === "") return;
    else {
      this.setState(({ plans }) => ({
        plans: plans.concat({
          id: index + 1,
          assignee: idHuman,
          weekYear: weekYear,
          weekNumber: weekNumber,
          project: (
            <Plan
              removePlan={(e, idPlan) => this.removePlan(e, idPlan)}
              dragStart={(e, idPlan, idHuman) =>
                this.dragStart(e, idPlan, idHuman)
              }
              dragEnd={e => this.dragEnd(e)}
              namePlan={name}
              idPlan={index + 1}
              idHuman={idHuman}
            />
          )
        })
      }));
    }
  };

  addNewUser = name => {
    const { humans, openAddUsersDialog } = this.state;
    var name = name;
    var length = humans.length;
    var index;
    if (length === 0) index = 0;
    else index = humans[length - 1].id;

    if (name === null || name === "") return;
    else
      this.setState(({ humans, openAddUsersDialog }) => ({
        humans: humans.concat({ id: index + 1, name: name }),
        openAddUsersDialog: false
      }));
  };

  addWeeksView = () => {
    const { valueBefore, valueAfter } = this.state;
    if (valueBefore === 5 && valueAfter === 5) return;
    else {
      this.setState({
        valueBefore: valueBefore + 1,
        valueAfter: valueAfter + 1
      });
    }
  };

  removeWeeksView = () => {
    const { valueBefore, valueAfter } = this.state;
    if (valueBefore === 0 && valueAfter === 0) return;
    else {
      this.setState({
        valueBefore: valueBefore - 1,
        valueAfter: valueAfter - 1
      });
    }
  };

  removeUser = (name, id) => {
      this.setState(({ humans, plans, openRemoveUsersDialog }) => ({
        humans: humans.filter(user => user.id !== id),
        plans: plans.filter(plan => plan.assignee !== id),
        openRemoveUsersDialog: false
      }));
  };

  closeAddUsersDialog = () => {
    this.setState(({ openAddUsersDialog }) => ({ openAddUsersDialog: false }));
  };

  openAddUsersDialog = () => {
    this.setState(({ openAddUsersDialog }) => ({ openAddUsersDialog: true }));
  };

  closeAddPlansDialog = () => {
    this.setState(({ openAddPlansDialog }) => ({ openAddPlansDialog: false }));
  };

  openAddPlansDialog = () => {
    this.setState(({ openAddPlansDialog }) => ({ openAddPlansDialog: true }));
  };

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
        <header className="Header"><h3 className="Header-title">Weekly calendar planner</h3></header>
          <Toolbar className="Toolbar">
            <div className="App-bar">
              <Tooltip id="tooltip-icon" title="Add new users">
                  <Button color="primary" onClick={this.openAddUsersDialog}>
                      <img
                        className="App-button-icon"
                        src="img/addUser.png"
                        width="20px"
                        height="20px"
                      />
                  </Button>
              </Tooltip>
              <Tooltip id="tooltip-icon" title="Zoom +">
                  <Button color="primary" onClick={this.removeWeeksView}>
                    <img
                      className="App-button-icon"
                      src="img/zoom-in.png"
                      width="20px"
                      height="20px"
                    />
                  </Button>
              </Tooltip>
              <Tooltip id="tooltip-icon" title="Zoom -">
                  <Button color="primary" onClick={this.addWeeksView}>
                    <img
                      className="App-button-icon"
                      src="img/zoom-out.png"
                      width="20px"
                      height="20px"
                  />
                  </Button>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <WeeklyCalendar
          rows={this.state.humans}
          overscanBefore={this.state.valueBefore}
          overscanAfter={this.state.valueAfter}
          renderRowLabel={row => row.name}
          renderWeekCell={(row, weekYear, weekNumber) =>
            this.findPlans(row.id, weekYear, weekNumber).map(
              plan => plan.project
            )
          }
          addPlan={this.handleOpenAddPlanDialog}
          removeUser={(name, id) => this.removeUser(name, id)}
        />
        <AddUsersDialog
          show={this.state.openAddUsersDialog}
          closeAddUsersDialog={() => this.closeAddUsersDialog()}
          addNewUser={name => this.addNewUser(name)}
        />
        <AddPlanDialog
          open={this.state.addPlanDialogOpen}
          name={this.state.addPlanDialogName}
          onClose={this.handleAddPlanDialogClose}
          onSubmit={this.handleAddPlanDialogSubmit}
          onNameChange={this.handleAddPlanDialogNameChange}
        />
      </div>
    );
  }
}

export default App;
