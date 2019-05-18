import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Typography} from '@material-ui/core';
import Acknowledge from './acknowlege';
import Badge from '@material-ui/core/Badge';


const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	root: {
		width: '100%',
		overflowX: 'auto',
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	tags: {
		margin: 5,
	},
	title: {
		color: 'rgba(46, 162, 210, 0.87)',
	},
	greenAvatar: {
		margin: 5,
		color: '#fff',
		backgroundColor: green[500],
	  },
	  button: {
		margin: theme.spacing.unit,
	  },
});

class QuestionTable extends React.Component {
	state = {
		rows: null,
	};

	componentDidMount() {
		//load data when component mounted
		var self = this;
		axios.get('http://localhost:3001/api/v1/getRecentQuestions')
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
			rows && <Paper className={classes.root}>
				<Table className={classes.table}>
					<TableBody>
						{rows.data && rows.data.length > 0 && rows.data.map((row) => (
							<TableRow className={classes.row} key={row._id}>
								<CustomTableCell component='th' scope='row'>
									{ row.is_answered ?
										<Avatar className={classes.greenAvatar}>A</Avatar> : <Avatar>NA</Avatar>
									}
								</CustomTableCell>
								<CustomTableCell>
									<Typography component='a' href={`/details/${row._id}`} variant='h6' className={classes.title}>{row.title}</Typography>
									<div className={classes.chips}>
										<Chip
											avatar={<Avatar>{row.view_count}</Avatar>}
											label='Views'
											className={classes.chip}
										/>
										{ row.tags && row.tags.length > 0 ? row.tags.map((val) => {
											return <Chip key={val}
												label={val}
												color='primary'
												variant='outlined'
												className={classes.tags}
										  />;
										}) : ''
										}
									</div>
									<div><Acknowledge displayName={row.owner ? row.owner.display_name : 'Guest'} createdDate={row.creation_date}/></div>
								</CustomTableCell>
								<CustomTableCell>
									<Badge color='primary' badgeContent={row.answer_count} className={classes.margin}>
										<Button href={`/details/${row._id}`} variant='contained' color='primary' className={classes.button}> View
										</Button>
									</Badge>

								</CustomTableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

QuestionTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QuestionTable);
