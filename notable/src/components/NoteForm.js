import React from 'react';
import { connect } from 'react-redux';
import { FormDiv } from '../css/styles';

import { addNote, updateNote } from '../actions/index';

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      textBody: ''
    };
  }

  componentDidMount() {
    if (this.props.updating) {
      this.setState({
        title: this.props.note.title,
        textBody: this.props.note.textBody
      });
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.props.updating) {
      this.props.updateNote({
        id: this.props.note.id,
        user_id: this.props.activeUser,
        title: this.state.title,
        textBody: this.state.textBody
      });
      // this.props.history.push(`/note/${this.props.note.id}`);
      this.props.history.push(`/`);
    } else {
      this.props.addNote({
        user_id: this.props.activeUser,
        title: this.state.title,
        textBody: this.state.textBody
      });
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <FormDiv>
        <h3>{this.props.purpose}</h3>
        <form onSubmit={this.submitHandler}>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            placeholder="Note Title"
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="textBody"
            id="textBody"
            value={this.state.textBody}
            placeholder="Note Content"
            onChange={this.changeHandler}
          />
          <button type="submit">{this.props.buttonText}</button>
        </form>
      </FormDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    note: state.singleNote,
    updating: state.updating,
    activeUser: state.activeUser
  };
};

export default connect(
  mapStateToProps,
  { addNote, updateNote }
)(NoteForm);
