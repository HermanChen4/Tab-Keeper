'use client';
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';

interface Group {
  id: string;
  name: string;
  members: number;
  totalExpenses: number;
  balance: number;
  type: 'owe' | 'owed' | 'settled';
  color: string;
}

const TabPage = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'friends'>('groups');

  // Mock data
  const groups: Group[] = [
    { id: '1', name: 'Apartment Roommates', members: 4, totalExpenses: 1250.50, balance: 45.50, type: 'owe', color: 'bg-blue-500' },
    { id: '2', name: 'Weekend Trip', members: 5, totalExpenses: 780.00, balance: 20.00, type: 'owed', color: 'bg-purple-500' },
    { id: '3', name: 'Office Lunch Group', members: 8, totalExpenses: 420.75, balance: 0, type: 'settled', color: 'bg-green-500' },
    { id: '4', name: 'Summer Vacation 2024', members: 6, totalExpenses: 3450.00, balance: 125.30, type: 'owe', color: 'bg-orange-500' },
  ];

  const friends = [
    { name: 'Alice Johnson', balance: 45.50, type: 'owe' as const },
    { name: 'Bob Smith', balance: 20.00, type: 'owed' as const },
    { name: 'Charlie Brown', balance: 15.75, type: 'owe' as const },
    { name: 'Diana Prince', balance: 0, type: 'settled' as const },
  ];

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <Navigation isAuthenticated={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--gray-900)]">My Tabs</h1>
            <p className="text-[var(--gray-600)] mt-1">Manage your groups and friends</p>
          </div>
          <Button size="lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create group
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-[var(--gray-200)] mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('groups')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'groups'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:border-[var(--gray-300)]'
              }`}
            >
              Groups ({groups.length})
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'friends'
                  ? 'border-[var(--primary)] text-[var(--primary)]'
                  : 'border-transparent text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:border-[var(--gray-300)]'
              }`}
            >
              Friends ({friends.length})
            </button>
          </div>
        </div>

        {/* Groups View */}
        {activeTab === 'groups' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} hover className="p-6 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${group.color} rounded-lg flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  {group.type !== 'settled' && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      group.type === 'owe'
                        ? 'bg-[var(--secondary-light)] text-[var(--secondary)]'
                        : 'bg-green-100 text-[var(--green-500)]'
                    }`}>
                      {group.type === 'owe' ? 'You owe' : 'You are owed'}
                    </span>
                  )}
                  {group.type === 'settled' && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--gray-200)] text-[var(--gray-600)]">
                      Settled up
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">{group.name}</h3>

                <div className="space-y-2 text-sm text-[var(--gray-600)]">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {group.members} members
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ${group.totalExpenses.toFixed(2)} total
                  </div>
                </div>

                {group.type !== 'settled' && (
                  <div className="mt-4 pt-4 border-t border-[var(--gray-200)]">
                    <p className={`font-semibold ${
                      group.type === 'owe'
                        ? 'text-[var(--secondary)]'
                        : 'text-[var(--green-500)]'
                    }`}>
                      ${group.balance.toFixed(2)} {group.type === 'owe' ? 'you owe' : 'owed to you'}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Friends View */}
        {activeTab === 'friends' && (
          <div className="max-w-3xl">
            <Card className="divide-y divide-[var(--gray-200)]">
              {friends.map((friend, index) => (
                <div key={index} className="p-6 hover:bg-[var(--gray-50)] transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[var(--primary-light)] rounded-full flex items-center justify-center mr-4">
                        <span className="text-[var(--primary)] font-semibold">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--gray-900)]">{friend.name}</p>
                        {friend.type === 'settled' ? (
                          <p className="text-sm text-[var(--gray-500)]">Settled up</p>
                        ) : (
                          <p className={`text-sm ${
                            friend.type === 'owe'
                              ? 'text-[var(--secondary)]'
                              : 'text-[var(--green-500)]'
                          }`}>
                            {friend.type === 'owe' ? 'you owe' : 'owes you'}
                          </p>
                        )}
                      </div>
                    </div>

                    {friend.type !== 'settled' && (
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${
                          friend.type === 'owe'
                            ? 'text-[var(--secondary)]'
                            : 'text-[var(--green-500)]'
                        }`}>
                          ${friend.balance.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPage;
