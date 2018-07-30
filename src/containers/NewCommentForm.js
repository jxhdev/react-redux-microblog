import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';

class NewCommentForm extends Component {
  state = {};

  handleChange = (evt, { value }) =>
    this.setState({ [evt.target.name]: evt.target.value });
  handleSubmit = content => {
    this.props.dispatch({
      type: 'ADD_COMMENT',
      id: this.props.postId,
      content: content
    });
  };
  render() {
    const { value } = this.state;
    return (
      <Form size="small" onSubmit={() => this.handleSubmit(this.state)}>
        <Form.Group size="tiny" widths="equal">
          <Form.Input
            size="tiny"
            fluid
            name="user"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          onChange={this.handleChange}
          name="content"
          placeholder="Leave a comment!"
        />
        <Form.Button size="tiny" color="green">
          Add Comment
        </Form.Button>
      </Form>
    );
  }
}

export default connect()(NewCommentForm);
