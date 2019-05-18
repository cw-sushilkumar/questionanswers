import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Acknowledge from './acknowlege';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {withRouter} from 'react-router';
import axios from 'axios';
import {Button} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

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
		backgroundColor: '#ccc',
		margin: 10,
	},
	tags: {
		margin: 5,
		// backgroundColor: '#7c84b1',
	},
	chip: {
		margin: 5,

	},
	answered: {
		backgroundColor: green[300],
	},
	notAnswered: {
		backgroundColor: red[300],
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
	button: {
		margin: theme.spacing.unit,
	},
});


class QuestionDetails extends React.Component {
  state = {expanded: false, ques: null};

  handleExpandClick = () => {
  	this.setState(state => ({expanded: !state.expanded}));
  };

  getUserBasicTitle(name, reputation, score) {
  	if (name || reputation || score) {
  		return (
  			<React.Fragment>
  				<Typography variant='h5' color='textPrimary' component='span'>{name}</Typography>
  				<Typography variant='body1' component='span' color='textSecondary'>{`Reputation : ${reputation}, Score : ${score}`}</Typography>
  			</React.Fragment>
  		);
  	}

  	return '';
  }

  componentDidMount() {
  	//load data when component mounted
  	var self = this;
  	let qid = this.props.qid;
  	if (!qid || isNaN(qid)) {
  		return;
  	}
  	axios.get('http://localhost:3001/api/v1/getQuestionDetails/' + qid )
  		.then((res) => {
  			// eslint-disable-next-line no-console
  			try {
  				self.setState({ques: res.data && res.data.data ? res.data.data : []});
  			}
  			catch (e) {
  				// eslint-disable-next-line no-console
  				console.log(e);
  			}
  		})
  		.catch((err) => {
  			// eslint-disable-next-line no-console
  			console.log('Unable to fetch questions : err - ', err);
  		});
  }

  render() {
  	const {classes} = this.props;
	  const {ques} = this.state;
  	return (
  		ques && <Card className={classes.card}>
  			<CardHeader
			  	classes={{title: classes.qTitle}}
  				avatar={
  					<Avatar alt={ques.owner.display_name} src={ques.owner.profile_image} className={classes.bigAvatar}/>
  				}
  				title={<Typography component='span' variant='h4'>{ques.title}</Typography>}
  				subheader={<Acknowledge displayName={ques.owner ? ques.owner.display_name : 'Guest'} createdDate={ques.creation_date}/>}
  			/>
			  <div className={classes.chips}>
  				{ ques.tags && ques.tags.length > 0 ? ques.tags.map((val) => {
  					return <Chip key={val}
  						label={val}
						  color='primary'
						  variant='outlined'
  						className={classes.tags}
										  />;
  				}) : ''
  				}
  			</div>
			  <CardActions className={classes.actions} disableActionSpacing>
			  <Chip
  					avatar={<Avatar>{ques.view_count}</Avatar>}
  					label='Views'
  					className={classes.chip}
  				/>
  				<Chip
  					avatar={<Avatar>{ques.answer_count}</Avatar>}
					  label='Answers'

  					className={`${ques.is_answered ? classes.answered : classes.notAnswered} ${classes.chip}`}
      			/>
				  <Chip
  					avatar={<Avatar>{ques.score}</Avatar>}
  					label='Score'
  					className={classes.chip}
      			/>
				  </CardActions>
			  <Divider/>
  			<CardContent>
				  {
					  ques.answers && ques.answers.length > 0 ?
					  <React.Fragment>
  							<Avatar alt={ques.answers[0].owner.disply_name} src={ques.owner.profile_image} className={classes.bigAvatar}/>
							  <Typography variant='body1'>{`Reputation : ${ques.answers[0].owner.reputation}, Score : ${ques.answers[0].score}`}</Typography>
  							<Typography variant='h6' color='textPrimary'> Question is answered with best possible solution. </Typography>
							  <Acknowledge displayName={ques.answers[0].owner ? ques.answers[0].owner.display_name : 'Guest'} variant='h6' createdDate={ques.answers[0].creation_date}/>
  							<Button variant='outlined' color='primary' className={classes.button}>View Solution</Button>
					  </React.Fragment>
					  : <React.Fragment>
						  <Typography variant='body1' color='textPrimary'> Question Not Answered Yet !. Be the first one to answer</Typography>
						  <Button variant='outlined' color='secondary' className={classes.button}> Answer this !</Button>
					  </React.Fragment>
				  }
  			</CardContent>
  			<CardActions className={classes.actions} disableActionSpacing>
  				<IconButton aria-label='Save Question'>
  					<FavoriteIcon/>
  				</IconButton>
  				<IconButton aria-label='Share'>
  					<ShareIcon/>
  				</IconButton>
  				{
					  ques.answers && ques.answers.length > 1 ?
					  <React.Fragment>
						  <Typography variant='h5' component='span'> &nbsp;|&nbsp; </Typography>
  				<Typography variant='body2' component='span'>{` View other ${ques.answer_count - 1} answers`}</Typography>
				  <IconButton
  					className={classnames(classes.expand, {
  						[classes.expandOpen]: this.state.expanded,
  					})}
  					onClick={this.handleExpandClick}
  					aria-expanded={this.state.expanded}
  					aria-label='Show more'
  				>
  					<ExpandMoreIcon/>
  				</IconButton>
					  </React.Fragment>
					   : ''
  				}

  			</CardActions>
			  {
					  ques.answers && ques.answers.length > 1 ?
  			<Collapse in={this.state.expanded} timeout='auto' unmountOnExit>
  				<CardContent>
					  <CardContent>
  						<List>
  							{
  								ques.answers && ques.answers ?
								  ques.answers.map((val, i) => {
  										return  <ListItem key={i} alignItems='flex-start' component='a' href={`/details/${val._id}`}>
  											<ListItemAvatar>
  											<Avatar alt={val.owner.display_name} src={val.owner.profile_image} className={classes.avatar}/>
  											</ListItemAvatar>
  											<ListItemText
  												primary={ this.getUserBasicTitle(val.owner.display_name, val.owner.reputation, val.score) }
  														secondary={` answered on ${new Date(val.creation_date * 1000).toLocaleString()}`}
  											/>
  													<Button variant='outlined' sm href={'#'}>View ans</Button>
  										</ListItem>;
  									}) : ''
  							}
  						</List>
  			</CardContent>
  				</CardContent>
  			</Collapse>
  					: ''
  			}
		  </Card>
  	);
  }
}

QuestionDetails.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(QuestionDetails));
