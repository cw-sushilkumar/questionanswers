import React from 'react';
import Typography from '@material-ui/core/Typography';

class Acknowledge extends React.PureComponent {
	render() {
		const {displayName, createdDate, variant} = this.props;
		return (
			displayName && createdDate ? <React.Fragment>
				<Typography variant={variant || ''} component='span' color='textSecondary'>
					{` - by ${displayName}, on ${new Date(createdDate * 1000).toLocaleString()}`}
				</Typography>
			</React.Fragment> : null
		);
	}
}

export default Acknowledge;
