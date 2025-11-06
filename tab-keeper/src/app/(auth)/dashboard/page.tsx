'use client';
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { AddExpenseModal } from '@/components/AddExpenseModal';

interface Balance {
  person: string;
  amount: number;
  type: 'owe' | 'owed';
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
  date: string;
  group?: string;
}

const Dashboard = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);

  // Mock data - replace with actual data
  const balances: Balance[] = [
    { person: 'Alice Johnson', amount: 45.50, type: 'owe' },
    { person: 'Bob Smith', amount: 20.00, type: 'owed' },
    { person: 'Charlie Brown', amount: 15.75, type: 'owe' },
  ];

  const recentExpenses: Expense[] = [
    { id: '1', description: 'Dinner at restaurant', amount: 85.00, paidBy: 'You', date: '2025-11-05', group: 'Roommates' },
    { id: '2', description: 'Groceries', amount: 42.50, paidBy: 'Alice Johnson', date: '2025-11-04', group: 'Apartment' },
    { id: '3', description: 'Movie tickets', amount: 30.00, paidBy: 'Bob Smith', date: '2025-11-03' },
    { id: '4', description: 'Uber ride', amount: 18.75, paidBy: 'You', date: '2025-11-02', group: 'Weekend Trip' },
  ];

  const totalOwed = balances.filter(b => b.type === 'owed').reduce((sum, b) => sum + b.amount, 0);
  const totalOwe = balances.filter(b => b.type === 'owe').reduce((sum, b) => sum + b.amount, 0);
  const netBalance = totalOwed - totalOwe;

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--gray-900)]">Dashboard</h1>
            <p className="text-[var(--gray-600)] mt-1">Track and manage your shared expenses</p>
          </div>
          <Button onClick={() => setShowAddExpense(true)} size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add expense
          </Button>
        </div>

        {/* Balance Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--gray-600)] mb-1">Total balance</p>
                <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-[var(--green-500)]' : 'text-[var(--secondary)]'}`}>
                  ${Math.abs(netBalance).toFixed(2)}
                </p>
                <p className="text-sm text-[var(--gray-500)] mt-1">
                  {netBalance >= 0 ? 'you are owed' : 'you owe'}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${netBalance >= 0 ? 'bg-green-100' : 'bg-[var(--secondary-light)]'}`}>
                <svg className={`w-6 h-6 ${netBalance >= 0 ? 'text-[var(--green-500)]' : 'text-[var(--secondary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--gray-600)] mb-1">You owe</p>
                <p className="text-3xl font-bold text-[var(--secondary)]">${totalOwe.toFixed(2)}</p>
                <p className="text-sm text-[var(--gray-500)] mt-1">in total</p>
              </div>
              <div className="w-12 h-12 bg-[var(--secondary-light)] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--gray-600)] mb-1">You are owed</p>
                <p className="text-3xl font-bold text-[var(--green-500)]">${totalOwed.toFixed(2)}</p>
                <p className="text-sm text-[var(--gray-500)] mt-1">in total</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[var(--green-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Balances */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">Your balances</h2>
              <div className="space-y-3">
                {balances.length === 0 ? (
                  <p className="text-[var(--gray-500)] text-center py-8">You&apos;re all settled up!</p>
                ) : (
                  balances.map((balance, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center mr-3">
                          <span className="text-[var(--primary)] font-semibold text-sm">
                            {balance.person.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[var(--gray-900)]">{balance.person}</p>
                          <p className={`text-sm ${balance.type === 'owe' ? 'text-[var(--secondary)]' : 'text-[var(--green-500)]'}`}>
                            {balance.type === 'owe' ? 'you owe' : 'owes you'}
                          </p>
                        </div>
                      </div>
                      <p className={`font-semibold ${balance.type === 'owe' ? 'text-[var(--secondary)]' : 'text-[var(--green-500)]'}`}>
                        ${balance.amount.toFixed(2)}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {balances.length > 0 && (
                <Button variant="outline" fullWidth className="mt-4">
                  Settle up
                </Button>
              )}
            </Card>
          </div>

          {/* Recent Expenses */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] mb-4">Recent activity</h2>
              <div className="space-y-2">
                {recentExpenses.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 hover:bg-[var(--gray-50)] rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center flex-1">
                      <div className="w-12 h-12 bg-[var(--gray-200)] rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-[var(--gray-600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="font-medium text-[var(--gray-900)]">{expense.description}</p>
                          {expense.group && (
                            <span className="ml-2 px-2 py-0.5 bg-[var(--primary-light)] text-[var(--primary)] text-xs rounded-full">
                              {expense.group}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--gray-600)]">
                          {expense.paidBy} paid • {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-[var(--gray-900)]">${expense.amount.toFixed(2)}</p>
                      <p className="text-sm text-[var(--gray-600)]">
                        {expense.paidBy === 'You' ? 'you paid' : 'you owe'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onAdd={(expense) => {
          console.log('New expense:', expense);
          // Handle adding expense to state/database
        }}
      />
    </div>
  );
}

export default Dashboard;