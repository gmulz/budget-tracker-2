import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BudgetAPIService from '../../services/apiService';
import { setUser, fetchUsers } from '../../slices/userSlice';
import { setDateRange } from '../../slices/dateRangeSlice'
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import User from '../../model/User';
import './DataSelectors.scss'



interface DataSelectorsState {
    
}

interface DataSelectorProps {
    users: User[],
    selectedUser: User
    start_date: Date,
    end_date: Date,
    setUser: typeof setUser,
    setDateRange: typeof setDateRange,
    fetchTransactions: (info: any) => void,
    fetchUsers: () => Promise<any>
}


class DataSelectors extends React.Component<DataSelectorProps, DataSelectorsState> {
    dummyUser = { name: '', id: -1 }
    constructor(props: any) {
        super(props);
        this.state = {}
    }
    
    

    async componentDidMount() {
        await this.props.fetchUsers();
        let savedUserId = localStorage.getItem('userId');
        if (savedUserId) {
            let userFromId = this.getUserFromId(Number(savedUserId));
            if (userFromId) {
                this.setUser(userFromId);
                return;
            }
        }
    }

    componentDidUpdate() {
        
    }

    handleSubmit() {
        
    }

    getUserFromId(userId: number) {
        return this.props.users.find(user => user.id == userId);
    }

    onChangeUser(event) {
        let userFromId = this.getUserFromId(event.target.value);
        if (userFromId) {
            this.setUser(userFromId);
        }
    }

    setUser(user: User) {
        this.props.setUser(user);
        localStorage.setItem('userId', user.id.toString())
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
                        { this.props.users.map((user) => {
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
        users: state.user.users,
        selectedUser: state.user.selectedUser,
        start_date: new Date(state.dateRange.start_date),
        end_date: state.dateRange.end_date ? new Date(state.dateRange.end_date) : null
    }
}

export default connect(mapStateToProps, { setUser, setDateRange, fetchUsers })(DataSelectors);