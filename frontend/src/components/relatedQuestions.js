import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import red from '@material-ui/core/colors/red';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Acknowledge from './acknowlege';

const styles = theme => ({
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
});

class RelatedQuestions extends React.Component {
	state = {
		rows: null,
	};

	componentDidMount() {
		//load data when component mounted
		var self = this;
		const {qid} = this.props;
		if (!qid || isNaN(qid)) {
			return;
		}

		axios.get('http://localhost:3001/api/v1/getRelatedQuestions/' + qid )
			.then((res) => {
			// eslint-disable-next-line no-console
				self.setState({rows: res.data});
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log('Unable to fetch questions : err - ', err);
			});
	}

	render() {
  	const {classes} = this.props;
		const {rows} = this.state;
  	return (
  		rows && <Card className={classes.card}>
  			<CardHeader
  				avatar={
						<Avatar aria-label='Related Questions' className={classes.avatar}>FE</Avatar>
  				}
  				title='Related Questions'
  				subheader='Relations based on tags'
  			/>
				<Divider/>
  			<CardContent>
					<List>
						{
							rows && rows.data ?
								rows.data.map((val) => {
									return  <ListItem alignItems='flex-start' component='a' href={`/details/${val._id}`}>
										<ListItemAvatar>
											<Avatar>{val.view_count}</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={val.title}
											secondary={ <Acknowledge displayName={val.owner ? val.owner.display_name : 'Guest'} createdDate={val.creation_date}/>

											}
										/>
									</ListItem>;
								}) : ''
						}
					</List>
  			</CardContent>
  		</Card>
  	);
	}
}

RelatedQuestions.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RelatedQuestions);
