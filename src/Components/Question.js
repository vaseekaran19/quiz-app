

import React, {Component} from "react";
import Options from "./Option";
import EditQuestionForm from "./EditQuestionForm";
class Question extends Component{
	state = {
		editing: false,
	  };
	  handleDeleteClick = () => {
		const { onDeleteQuestion, question } = this.props;
		onDeleteQuestion(question.id);
	  };

	  toggleEditing = () => {
		this.setState({ editing: !this.state.editing });
	  };

	render() {
		const {question, selectedOption, onOptionChange, onSubmit} = this.props;
		const { editing } = this.state;
		return(
			<div className="">
				 <h2>{question.question}</h2>
                  {/* Render options, selectedOption, and submit button */}
                  {/* ... */}
                 <button onClick={this.toggleEditing}>Edit</button>
				 <button onClick={this.handleDeleteClick}>Delete</button>
                 {editing && <EditQuestionForm question={question} />}
				<h3>Question {question.id}</h3>
				<h5 className="mt-2">{question.question}</h5>
				<form onSubmit={onSubmit} className="mt-2 mb-2">
					<Options
						options={question.options}
						selectedOption={selectedOption}
						onOptionChange={onOptionChange}
					/>
					<button type="submit" className="btn btn-primary mt-2">
						SUBMIT
					</button>
				</form>
				
			</div>
			
		)
	}
}

export default Question;
