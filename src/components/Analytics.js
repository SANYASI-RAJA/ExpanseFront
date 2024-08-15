import React from 'react'
import { Progress } from 'antd'

const Analytics = ({allTransaction}) => {

    const categories = ['salary','tip','project','food','movie','bills','medical','fee','tax'];



    const totalTransaction = allTransaction.length
    const totalIncomeTransaction = allTransaction.filter(transaction => transaction.type === 'income')
    const totalExpenseTransaction = allTransaction.filter(transaction => transaction.type === 'expense')
    const totalIncomePercentage = (totalIncomeTransaction.length/totalTransaction) * 100
    const totalExpensePercentage = (totalExpenseTransaction.length/totalTransaction) * 100


    const totalTurnover = allTransaction.reduce((acc,transaction) => acc+transaction.amount, 0);
    const totalIncomeTurnover = allTransaction.filter(transaction => transaction.type ==='income').reduce((acc,transaction) => acc+transaction.amount,0)
    const totalExpenseTurnover = allTransaction.filter((transaction) => transaction.type === "expense").reduce((acc,transaction) => acc+transaction.amount,0);
    const totalincomeTurnoverPercent = (totalIncomeTurnover/totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover/totalTurnover) * 100;



  return (
    <>
        <div className="row m-3">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransaction}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransaction.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseTransaction.length}
              </h5>
              <div className="d-flex flex-column align-items-center">
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercentage.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpensePercentage.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalincomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2 mt-3"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <h6 className="bg-dark p-2 text-light">Categorywise Income</h6>
          {categories.map((category) => {
            const amount = allTransaction.filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2">
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-3">
          <h6 className="bg-warning p-2 text-light">Categorywise Expense</h6>
          {categories.map((category) => {
            const amount = allTransaction.filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && (
                <div className="card mt-2">
                  <div className="card-body">
                    <h6>{category}</h6>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <div className="row mt-3 analytics"></div>
    </>
  )
}

export default Analytics
