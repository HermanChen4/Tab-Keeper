'use client';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (expense: any) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    paidBy: 'You',
    group: '',
    date: new Date().toISOString().split('T')[0],
    splitWith: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const expense = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      paidBy: formData.paidBy,
      date: formData.date,
      group: formData.group || undefined,
      splitWith: formData.splitWith
    };

    if (onAdd) {
      onAdd(expense);
    }

    // Reset form
    setFormData({
      description: '',
      amount: '',
      paidBy: 'You',
      group: '',
      date: new Date().toISOString().split('T')[0],
      splitWith: []
    });

    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add an expense" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Description"
            name="description"
            type="text"
            placeholder="e.g., Dinner at restaurant"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />

          <Input
            label="Amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="w-full">
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
              Paid by
            </label>
            <select
              name="paidBy"
              value={formData.paidBy}
              onChange={handleChange}
              className="w-full px-3 py-2.5 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200"
            >
              <option value="You">You</option>
              <option value="Alice Johnson">Alice Johnson</option>
              <option value="Bob Smith">Bob Smith</option>
              <option value="Charlie Brown">Charlie Brown</option>
            </select>
          </div>

          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            required
          />
        </div>

        <Input
          label="Group (optional)"
          name="group"
          type="text"
          placeholder="e.g., Roommates, Trip to Paris"
          value={formData.group}
          onChange={handleChange}
          fullWidth
        />

        <div>
          <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
            Split with
          </label>
          <div className="space-y-2">
            {['Alice Johnson', 'Bob Smith', 'Charlie Brown'].map((person) => (
              <label key={person} className="flex items-center p-3 border border-[var(--gray-300)] rounded-lg hover:bg-[var(--gray-50)] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)] border-[var(--gray-300)] rounded"
                  checked={formData.splitWith.includes(person)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        splitWith: [...formData.splitWith, person]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        splitWith: formData.splitWith.filter(p => p !== person)
                      });
                    }
                  }}
                />
                <div className="ml-3 flex items-center">
                  <div className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center mr-2">
                    <span className="text-[var(--primary)] font-semibold text-xs">
                      {person.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--gray-900)]">{person}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-[var(--gray-200)]">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Add expense
          </Button>
        </div>
      </form>
    </Modal>
  );
};
