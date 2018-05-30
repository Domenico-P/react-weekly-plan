import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class AddUsersDialog extends Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(event);
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <form onSubmit={this.handleSubmit}>
          <DialogTitle id="form-dialog-title">Nuovo progetto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome del progetto"
              type="text"
              fullWidth
              value={this.props.name}
              onChange={this.props.onNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Annulla
            </Button>
            <Button color="primary" type="submit">
              Aggiungi
            </Button>
          </DialogActions>
        </form>
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
