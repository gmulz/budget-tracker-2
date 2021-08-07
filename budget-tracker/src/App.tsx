import React from 'react';
import './App.css';
import { CategoryBlotters } from './main-area/blotter-area/CategoryBlotters';
import Category from './model/Category';
import LineItem from './model/LineItem';
import TopPanel from './top-panel/TopPanel';

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


function App() {
  return (
    <div>
      <TopPanel />
      <div>
        <CategoryBlotters categories={categories}/>
        
      </div>
    </div>
  );
}

export default App;
