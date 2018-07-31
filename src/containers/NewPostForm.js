import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addPost } from '../actionCreator';

class NewPostForm extends Component {
  state = {};

  handleChange = (evt, { value }) =>
    this.setState({ [evt.target.name]: evt.target.value });
  handleSubmit = post => {
    this.props.dispatch(addPost(post));
  };
  render() {
    const { value } = this.state;
    return (
      <Form onSubmit={() => this.handleSubmit(this.state)}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          onChange={this.handleChange}
          name="body"
          placeholder="Let your thoughts run wild!"
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default connect()(NewPostForm);
