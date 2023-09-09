

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question";
import qBank from "./Components/data.json";
import Score from "./Components/Score";
import "./App.css";
import EditQuestionForm from "./Components/EditQuestionForm"; 
import AddQuestionForm from "./Components/AddQuestionForm";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionBank: qBank,
			currentQuestion: 0,
			selectedOption: "",
			score: 0,
			quizEnd: false,
			addingQuestion: false,
			editingQuestion: false,
		};
	}

	handleOptionChange = (e) => {
		this.setState({ selectedOption: e.target.value });
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.checkAnswer();
		this.handleNextQuestion();
	};

    
	handleAddQuestion = (newQuestion) => {
		this.setState((prevState) => ({
		  questionBank: [...prevState.questionBank, newQuestion],
		  addingQuestion: false, // Close the form after adding a question
		}));
	  };

	checkAnswer = () => {
		const { questionBank, currentQuestion, selectedOption, score } = this.state;
		if (selectedOption === questionBank[currentQuestion].answer) {
			this.setState((prevState) => ({ score: prevState.score + 1 }));
		}
	};

	handleNextQuestion = () => {
		const { questionBank, currentQuestion } = this.state;
		if (currentQuestion + 1 < questionBank.length) {
			this.setState((prevState) => ({
				currentQuestion: prevState.currentQuestion + 1,
				selectedOption: "",
			}));
		} else {
			this.setState({
				quizEnd: true,
			});
		}
	};
	toggleEditing = () => {
		this.setState({ editingQuestion: !this.state.editingQuestion });
	  };
	
	  // Add a function to handle the update of a question
	  handleUpdateQuestion = (updatedQuestion) => {
		const updatedQuestionBank = this.state.questionBank.map((q) =>
		  q.id === updatedQuestion.id ? updatedQuestion : q
		);
		this.setState({ questionBank: updatedQuestionBank, editingQuestion: false });
	  };
	  
	  handleDeleteQuestion = (questionId) => {
		const updatedQuestionBank = this.state.questionBank.filter(
		  (q) => q.id !== questionId
		);
		this.setState({ questionBank: updatedQuestionBank });
	  };

	render() {
		const { questionBank, currentQuestion, selectedOption, score, quizEnd,addingQuestion,editingQuestion } =
			this.state;
		return (
			<div className="App d-flex flex-column align-items-center justify-content-center">
				<h1 className="app-title">QUIZ APP</h1>
				{!quizEnd ? (
					<div>
					<Question
						question={questionBank[currentQuestion]}
						selectedOption={selectedOption}
						onOptionChange={this.handleOptionChange}
						onSubmit={this.handleFormSubmit}
						onDeleteQuestion={this.handleDeleteQuestion}
					/>
					  <button onClick={this.toggleEditing}>Edit Question</button>
                        {editingQuestion && (
                          <EditQuestionForm
                              question={questionBank[currentQuestion]}
                               onUpdateQuestion={this.handleUpdateQuestion}
                            />
                            )}
					<button onClick={() => this.setState({ addingQuestion: true })}>
                       Add Question
                    </button>
                    {addingQuestion && (
                        <AddQuestionForm onAddQuestion={this.handleAddQuestion} />
                     )}
					</div>
				) : (
					<Score
						score={score}
						onNextQuestion={this.handleNextQuestion}
						className="score"
					/>

				)}
			</div>
		);
	}
}

export default App;
