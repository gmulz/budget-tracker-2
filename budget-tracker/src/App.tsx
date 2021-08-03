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
        date: new Date('8/3/2021')
      } as LineItem
    ]
  } as Category,
  
]

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
