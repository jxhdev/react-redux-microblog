import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { editPost } from '../actionCreator';

class EditablePost extends Component {
  state = { title: this.props.title, body: this.props.body };

  handleChange = (evt, { value }) =>
    this.setState({ [evt.target.name]: evt.target.value });
  handleSubmit = content => {
    this.props.dispatch(editPost(this.props.id, content));
  };
  render() {
    const { value } = this.state;
    return (
      <Form onSubmit={() => this.handleSubmit(this.state)}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="title"
            label="Title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          onChange={this.handleChange}
          name="body"
          label="Body"
          value={this.state.body}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default connect()(EditablePost);
