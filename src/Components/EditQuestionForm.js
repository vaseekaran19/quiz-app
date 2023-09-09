
import React, { Component } from "react";

class EditQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props.question.question,
      options: [...props.question.options],
      answer: props.question.answer,
    };
  }

  // Handle input changes and form submission similar to AddQuestionForm

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* Form fields and input elements for editing */}
        {/* ... */}
        <button type="submit">Update Question</button>
      </form>
    );
  }
}

export default EditQuestionForm;
