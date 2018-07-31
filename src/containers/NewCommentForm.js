import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { addComment } from '../actionCreator';

class NewCommentForm extends Component {
  state = {};

  handleChange = (evt, { value }) =>
    this.setState({ [evt.target.name]: evt.target.value });
  handleSubmit = content => {
    this.props.dispatch(addComment(this.props.postId, content));
    this.props.toggleComments();
  };
  render() {
    const { value } = this.state;
    return (
      <div>
        <Form size="small" onSubmit={() => this.handleSubmit(this.state)}>
          {/* <Form.Group size="tiny" widths="equal">
          <Form.Input
            size="tiny"
            fluid
            name="user"
            placeholder="Username"
            onChange={this.handleChange}
          />
        </Form.Group> */}
          <Form.TextArea
            onChange={this.handleChange}
            name="text"
            placeholder="Leave a comment!"
          />
          <div>
            <Form.Button size="tiny" color="green">
              Add Comment
            </Form.Button>
          </div>
        </Form>
        <Button size="tiny" color="grey" onClick={this.props.toggleComments}>
          Back
        </Button>
      </div>
    );
  }
}

export default connect()(NewCommentForm);
