import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BudgetAPIService from '../../services/apiService';
import { setUser } from '../../slices/userSlice';
import { setDateRange } from '../../slices/dateRangeSlice'
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import User from '../../model/User';
import './DataSelectors.scss'



interface DataSelectorsState {
    users: any[];
}

interface DataSelectorProps {
    selectedUser: User
    start_date: Date,
    end_date: Date,
    setUser: typeof setUser,
    setDateRange: typeof setDateRange,
    fetchTransactions: (info: any) => void
}


class DataSelectors extends React.Component<DataSelectorProps, DataSelectorsState> {
    dummyUser = { name: '', id: -1, index: -1 }
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
        }
    }
    
    

    async componentDidMount() {
        let users = await BudgetAPIService.getAllUsers();
        users = users.map((user, index) => {
            user['index'] = index;
            return user;
        })
        this.setState({ users: users });
        this.props.setUser(users[0]);
    }

    handleSubmit() {
        
    }

    onChangeUser(event) {
        let userFromId = this.state.users.find(user => user.id == event.target.value);
        //propagate state to redux store
        this.props.setUser(userFromId)
    }

    onChangeDate(event) {
        this.props.setDateRange(event);
    }

    render() {
        return (
            <div id='data-selectors'>
                <form onSubmit={this.handleSubmit} >
                    Showing expenses for user: 
                    <select value={this.props.selectedUser.id} onChange={this.onChangeUser.bind(this)}>
                        { this.state.users.map((user) => {
                            return <option value={user.id} key={user.id}>{user.name}</option>
                        })}
                    </select>
                     for date range:
                    <DatePicker onChange={this.onChangeDate.bind(this)}
                        selectsRange
                        startDate={this.props.start_date}
                        endDate={this.props.end_date}
                    />
                </form>
            </div>
        );
    }

}

const mapStateToProps = (state: RootState, ownProps) => {
    return { 
        selectedUser: state.user.selectedUser,
        start_date: new Date(state.dateRange.start_date),
        end_date: state.dateRange.end_date ? new Date(state.dateRange.end_date) : null
    }
}

export default connect(mapStateToProps, { setUser, setDateRange })(DataSelectors);