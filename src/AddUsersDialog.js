import React, { Component } from "react";
//import "./AddUsersDialog.css";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddUsersDialog extends Component {
  static defaultProps = {
    closeAddUsersDialog: () => null,
    addNewUser: userName => null
  };

  state = {
    newName: ""
  };

  handleChange = event => {
    var name = event.target.value;
    console.log(name);
    this.setState(({ newName }) => ({ newName: name }));
  };

  render() {
    return (
      <Dialog open={this.props.show} onClose={this.props.closeAddUsersDialog}>
        <DialogTitle id="form-dialog-title">Nuovo utente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome dell’utente"
            type="text"
            fullWidth
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeAddUsersDialog} color="primary">
            Annulla
          </Button>
          <Button onClick={() => this.props.addNewUser(this.state.newName)} color="primary">
            Aggiungi
          </Button>
        </DialogActions>
      </Dialog>
    );

    /*
    if(!this.props.show)
        return null;

    return (
      <div className="Modal">
        <div className="Modal-content">
          <h3>Inserisci il nome del nuovo utente: </h3>
          <div className="Input"><input type="text" onChange={this.handleChange} placeholder="User name"/></div><br/>
          <div className="Button-close">
            <button onClick={() => this.props.addNewUser(this.state.newName)}>Aggiungi</button>
            <button onClick={this.props.closeAddUsersDialog}>Annulla</button>
          </div>
        </div>
      </div>
    );*/
  }
}
