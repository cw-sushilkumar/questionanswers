import React from 'react';
import Table from '../../components/table';
import FeaturedQuestions from '../../components/featuredQuestions';
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


class QuestionsListing extends React.Component {
	render() {
		const {classes} = this.props;
		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item className={classes.slots} sm={8} md={8} lg={9} xs={12}>
						<Table/>
					</Grid>
					<Grid item className={classes.slots}  sm={4} md={4} lg={3} xs={12}>
						<FeaturedQuestions/>
					</Grid>
				</Grid>
		  </div>
		);
	}
}

QuestionsListing.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionsListing));

