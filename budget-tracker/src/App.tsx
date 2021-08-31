import React from 'react';
import './App.css';
import CategoryBlotters from './main-area/blotter-area/CategoryBlotters';
import Category from './model/Category';
import Transaction from './model/LineItem';
import TopPanel from './top-panel/TopPanel';
import { getMonthStartEndFromDate } from './utils/DateUtils';

interface BudgetState {
  current_user?: string,
  start_date: Date,
  end_date: Date,
  
}

class App extends React.Component<{}, BudgetState> {
  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <TopPanel />
        <div>
          <CategoryBlotters/>
          
        </div>
      </div>
    );
  }
}

export default App;
