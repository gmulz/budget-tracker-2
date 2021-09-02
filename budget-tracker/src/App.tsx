import React from 'react';
import './App.css';
import CategoryBlotters from './main-area/blotter-area/CategoryBlotters';
import TopPanel from './top-panel/TopPanel';
import RecurringBlotters from './main-area/sidebar/RecurringBlotters';

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
      <>
        <TopPanel />
        <div id='data-area'>
          <CategoryBlotters/>
          <RecurringBlotters />
        </div>
      </>
    );
  }
}

export default App;
