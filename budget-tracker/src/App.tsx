import React from 'react';
import './App.css';
import CategoryBlotters from './main-area/blotter-area/CategoryBlotters';
import Category from './model/Category';
import Transaction from './model/LineItem';
import TopPanel from './top-panel/TopPanel';
import { getMonthStartEndFromDate } from './utils/DateUtils';

let categories = [
  {
    description: 'Food',
    total: 1234,
    lineItems: [
      {
        description: "Cafe Vivaldi",
        amount: 50,
        date: new Date('8/2/2021')
      } as Transaction,
      {
        description: "Hansens",
        amount: 10,
        date: new Date('8/3/2021')
      } as Transaction
    ]
  } as Category,
  {
    description: "Travel",
    total: 5000,
    lineItems: [
      {
        description: "Plane tickets",
        amount: 2000,
        date: new Date('8/10/2021')
      } as Transaction
    ]
  } as Category
]

let monthlies = 
  {
    description: "Monthy Expenses",
    total: 300,
    lineItems: [
      {
        description: "Rent",
        amount: 2050
      } as Transaction
    ]
  } as Category


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
          <CategoryBlotters categories={categories}/>
          
        </div>
      </div>
    );
  }
}

export default App;
