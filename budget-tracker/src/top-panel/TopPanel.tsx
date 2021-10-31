import React from 'react';
import DataSelector from './data-selectors/DataSelectors';
import './TopPanel.scss';
import { connect } from 'react-redux';
import Transaction from '../model/LineItem';
import { RootState } from '../redux/store';
import { postUser } from '../slices/userSlice';
import User from '../model/User';
import { formatPrice } from '../utils/PriceFormatUtils';

interface TopPanelProps {
    transactions: Transaction[],
    postUser: (string: string) => Promise<any>
}

interface TopPanelState {
    newUserName: string;
}

class TopPanel extends React.Component<TopPanelProps, TopPanelState>{

    constructor(props) {
        super(props);
        this.state = {
            newUserName: ''
        }
    }

    componentDidMount() {

    }
    
    async addUser(username: string) {
        let newUser = await this.props.postUser(username);
        return newUser as User;
    }

    changeUserName(name) {
        this.setState({
            newUserName: name
        })
    }

    changeUserInput(e) {
        this.changeUserName(e.target.value);
    }

    async keyPressed(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            await this.addUser(this.state.newUserName);
            this.changeUserName('');
        }
    }

    render() {
        return (
            <div id='top-panel'>
                <DataSelector />
                <div id='grand-total'>
                    Grand Total ${formatPrice(this.props.transactions.reduce((acc, curr) => acc + curr.cost, 0))}
                </div>
                <div id='new-user-creator'>
                    <div>
                    Create new user: 
                    <input placeholder='User name' 
                            value={this.state.newUserName} 
                            onKeyPress={this.keyPressed.bind(this)}
                            onChange={this.changeUserInput.bind(this)}/>
                    </div>
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

export default connect(mapStateToProps, { postUser })(TopPanel);