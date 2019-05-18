import React from 'react';
import Question from '../../components/quesDetails';
import RelatedQuestions from '../../components/relatedQuestions';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router';

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	slots: {
		padding: theme.spacing.unit,
	},
});


class QuestionDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			qid: 0,
		};
	}

	componentDidMount() {
		let qid = this.props.match && this.props.match.params ? this.props.match.params.qid : 0;
		if (!qid || isNaN(qid)) {
			return;
		}
		this.setState({qid: qid});
	}
	render() {
		const {classes} = this.props;
		const {qid} = this.state;
		return (
			qid && <div className={classes.root}>
				<Grid container>
					<Grid item className={classes.slots} sm={8} md={8} lg={9} xs={12}>
						<Question qid={qid}/>
					</Grid>
					<Grid item className={classes.slots}  sm={4} md={4} lg={3} xs={12}>
						<RelatedQuestions qid={qid}/>
					</Grid>
				</Grid>
		  </div>
		);
	}
}

QuestionDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionDetails));

