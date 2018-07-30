import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

class NewPostForm extends Component {
  state = {};

  handleChange = (evt, { value }) =>
    this.setState({ [evt.target.name]: evt.target.value });
  handleSubmit = content => {
    this.props.dispatch({ type: 'ADD_POST', content: content });
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
            placeholder="Title"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          onChange={this.handleChange}
          name="body"
          label="Body"
          placeholder="Let your thoughts run wild!"
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default connect()(NewPostForm);
