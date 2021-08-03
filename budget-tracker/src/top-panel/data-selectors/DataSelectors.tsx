import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class DataSelectors extends React.Component {

    handleSubmit() {
        
    }

    onChange() {

    }
    render() {
        return (
            <div id='data-selectors'>
                <form onSubmit={this.handleSubmit} >
                    Showing expenses for user: 
                    <select value='Grant' onChange={this.onChange}>
                        <option value='Emma'>Emma</option>
                        <option value='Grant'>Grant</option>
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