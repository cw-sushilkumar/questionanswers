import React from 'react';
import Questions from './pages/questions/index';
import QuestionDetails from './pages/questions/questionDetails';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/header';

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Header/>
					<Route exact={true} path='/' render={() => (
						<div className='App'>
							<Questions/>
						</div>
					)}/>
					<Route exact={true} path='/details/:qid' render={() => (
						<div className='App'>
							<QuestionDetails/>
						</div>
					)}/>
				</div>
			</BrowserRouter>
		);
	}
}


export default App;

