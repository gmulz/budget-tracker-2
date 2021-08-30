import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BudgetAPIService from '../../services/apiService';

interface DataSelectorsState {
    users: any[];
    selectedUser: any;
}

class DataSelectors extends React.Component<{}, DataSelectorsState> {
    dummyUser = { name: '', id: -1, index: -1 }
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            selectedUser: this.dummyUser
        }
    }

    async componentDidMount() {
        let users = await BudgetAPIService.getAllUsers();
        users = users.map((user, index) => {
            user['index'] = index;
            return user;
        })
        this.setState({ users: users, selectedUser: users[0] ?? this.dummyUser });    
    }

    handleSubmit() {
        
    }

    onChange(event) {
        let userFromIndex = this.state.users[event.target.value];
        this.setState({selectedUser: userFromIndex });
    }
    render() {
        return (
            <div id='data-selectors'>
                <form onSubmit={this.handleSubmit} >
                    Showing expenses for user: 
                    <select value={this.state.selectedUser.index} onChange={this.onChange.bind(this)}>
                        { this.state.users.map((user, index) => {
                            return <option value={index} key={index}>{user.name}</option>
                        })}
                    </select>
                     for date range:
                    <DatePicker onChange={this.onChange}
                        selectsRange  
                    />
                </form>
            </div>
        );
    }

}

export default DataSelectors;