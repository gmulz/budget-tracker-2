import React from 'react';
import './App.css';
import { CategoryBlotters } from './main-area/blotter-area/CategoryBlotters';
import Category from './model/Category';
import LineItem from './model/LineItem';
import TopPanel from './top-panel/TopPanel';
import DateUtils from './utils/DateUtils';

let categories = [
  {
    title: 'Food',
    total: 1234,
    lineItems: [
      {
        description: "Cafe Vivaldi",
        amount: 50,
        date: new Date('8/2/2021')
      } as LineItem,
      {
        description: "Hansens",
        amount: 10,
        date: new Date('8/3/2021')
      } as LineItem
    ]
  } as Category,
  {
    title: "Travel",
    total: 5000,
    lineItems: [
      {
        description: "Plane tickets",
        amount: 2000,
        date: new Date('8/10/2021')
      } as LineItem
    ]
  } as Category
]

let monthlies = 
  {
    title: "Monthy Expenses",
    total: 300,
    lineItems: [
      {
        description: "Rent",
        amount: 2050
      } as LineItem
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
    let [start_date, end_date] = DateUtils.getMonthStartEndFromDate(new Date());
    this.state = {
      start_date: start_date,
      end_date: end_date,
      current_user: undefined
    }
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
