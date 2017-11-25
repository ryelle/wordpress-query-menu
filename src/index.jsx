/**
 * External dependencies
 */
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debugFactory from 'debug';

/**
 * Internal dependencies
 */
import { isRequestingMenu } from './selectors';
import { requestMenu } from './state';

const debug = debugFactory( 'query:menu' );

class QueryMenu extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.location === nextProps.location ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingMenu ) {
			debug( `Request menu in location ${ props.location }` );
			props.requestMenu( props.location );
		}
	}

	render() {
		return null;
	}
}

QueryMenu.propTypes = {
	location: PropTypes.string.isRequired,
	requestingMenu: PropTypes.bool,
	requestMenu: PropTypes.func,
};

QueryMenu.defaultProps = {
	requestMenu: () => {},
};

export default connect(
	( state, ownProps ) => {
		const { location } = ownProps;
		return {
			requestingMenu: isRequestingMenu( state, location ),
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestMenu,
		}, dispatch );
	}
)( QueryMenu );
