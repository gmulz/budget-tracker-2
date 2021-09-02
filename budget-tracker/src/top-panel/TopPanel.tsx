import React from 'react';
import DataSelector from './data-selectors/DataSelectors';
import './TopPanel.scss';
import { connect } from 'react-redux';
import Transaction from '../model/LineItem';
import { RootState } from '../redux/store';

interface TopPanelProps {
    transactions: Transaction[],
}

class TopPanel extends React.Component<TopPanelProps, {}>{
    
    render() {
        return (
            <div id='top-panel'>
                <DataSelector />
                <div id='grand-total'>
                    Grand Total ${this.props.transactions.reduce((acc, curr) => acc + curr.cost, 0)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, ownProps) => {
    return {
        transactions: state.transactions.transactions
    }
}

export default connect(mapStateToProps, {})(TopPanel);