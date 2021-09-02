import React from 'react';
import './RecurringBlotters.scss';
import { connect } from 'react-redux';


class RecurringBlotters extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        //fetch recurring categories
    }

    componentDidUpdate(prevProps: {}) {
        //fetch recurring transactions
    }

    render() {
        return (<div className='recurring-blotters-sidebar'>

        </div>)
    }
}

export default RecurringBlotters;