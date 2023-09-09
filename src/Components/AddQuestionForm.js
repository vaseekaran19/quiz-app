// AddQuestionForm.js
import React, { Component } from "react";

class AddQuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      options: ["", "", "", ""],
      answer: "",
    };
  }
  saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
}

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleOptionChange = (e, index) => {
    const newOptions = [...this.state.options];
    newOptions[index] = e.target.value;
    this.setState({ options: newOptions });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question: this.state.question,
      options: this.state.options,
      answer: this.state.answer,
    };
    this.props.onAddQuestion(newQuestion);
    // Reset the form fields
    this.setState({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <input
            type="text"
            name="question"
            value={this.state.question}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {this.state.options.map((option, index) => (
            <input
              type="text"
              key={index}
              value={option}
              onChange={(e) => this.handleOptionChange(e, index)}
              required
            />
          ))}
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            name="answer"
            value={this.state.answer}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Question</button>
      </form>
    );
  }
}

export default AddQuestionForm;
