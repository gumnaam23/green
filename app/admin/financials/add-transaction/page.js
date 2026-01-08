"use client";

import {
  Save,
  X,
  DollarSign,
  User,
  Building,
  CreditCard,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Receipt
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AddTransactionPage() {
  const [formData, setFormData] = useState({
    donorName: '',
    amount: '',
    type: 'individual',
    transactionType: 'donation',
    date: new Date().toISOString().split('T')[0], // Today's date
    city: '',
    trees: '',
    status: 'completed',
    paymentMethod: 'online',
    reference: '',
    notes: '',
    anonymous: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const cities = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Hyderabad',
    'Gujranwala',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Rahim Yar Khan',
    'Jhang',
    'Dera Ghazi Khan',
    'Sahiwal'
  ];

  const transactionTypes = [
    { value: 'donation', label: 'Donation', icon: DollarSign },
    { value: 'expense', label: 'Expense', icon: Receipt },
    { value: 'transfer', label: 'Transfer', icon: CreditCard },
    { value: 'refund', label: 'Refund', icon: ArrowLeft }
  ];

  const paymentMethods = [
    { value: 'online', label: 'Online Payment' },
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank Transfer' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'card', label: 'Credit/Debit Card' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.donorName && !formData.anonymous) {
        throw new Error('Donor name is required (or mark as anonymous)');
      }
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }

      const payload = {
        donorName: formData.anonymous ? 'Anonymous' : formData.donorName,
        amount: parseFloat(formData.amount),
        type: formData.type,
        date: formData.date,
        city: formData.city,
        trees: formData.trees ? parseInt(formData.trees) : 0,
        anonymous: formData.anonymous,
        transactionType: formData.transactionType,
        status: formData.status,
        paymentMethod: formData.paymentMethod,
        reference: formData.reference,
        notes: formData.notes
      };

      const response = await fetch('/api/admin/financials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create transaction');
      }

      const result = await response.json();
      console.log('Transaction created successfully:', result);

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          donorName: '',
          amount: '',
          type: 'individual',
          transactionType: 'donation',
          date: new Date().toISOString().split('T')[0],
          city: '',
          trees: '',
          status: 'completed',
          paymentMethod: 'online',
          reference: '',
          notes: '',
          anonymous: false
        });
      }, 3000);
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'PKR 0';
    return `PKR ${parseFloat(amount).toLocaleString('en-PK')}`;
  };

  const getTransactionTypeIcon = (type) => {
    const transactionType = transactionTypes.find(t => t.value === type);
    const Icon = transactionType?.icon || DollarSign;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            href="/admin/financials"
            className="mr-4 p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Transaction</h1>
            <p className="text-gray-600">Record a new financial transaction</p>
          </div>
        </div>
        <Link
          href="/admin/financials"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Link>
      </div>

      {isSubmitted && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Transaction Added Successfully!</h3>
              <p className="text-gray-600 mt-1">The transaction has been recorded and will appear in the financial dashboard.</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <X className="h-8 w-8 text-red-600 mr-4" />
            <div>
              <h3 className="font-bold text-gray-900">Error Adding Transaction</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Transaction Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Donor Information */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor Name *
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleChange}
                  disabled={formData.anonymous}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="e.g., Ahmed Khan"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Anonymous</span>
                </label>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (PKR) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {transactionTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Donor Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donor Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="individual">Individual</option>
                <option value="corporate">Corporate</option>
                <option value="government">Government</option>
                <option value="international">International</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {paymentMethods.map(method => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>

            {/* Trees (for donations) */}
            {formData.transactionType === 'donation' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trees Planted
                </label>
                <input
                  type="number"
                  name="trees"
                  value={formData.trees}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Number of trees"
                />
              </div>
            )}

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Reference */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Transaction ID, receipt number, etc."
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Additional notes about this transaction..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Transaction Preview</h2>

          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  {getTransactionTypeIcon(formData.transactionType)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {formData.anonymous ? 'Anonymous' : (formData.donorName || 'Donor Name')}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {formData.city || 'City'}
                    <span className="mx-2">•</span>
                    <Calendar className="h-3 w-3 mr-1" />
                    {formData.date ? new Date(formData.date).toLocaleDateString('en-PK') : 'Date'}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(formData.amount)}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {formData.transactionType}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium capitalize">{formData.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Payment:</span>
                <span className="ml-2 font-medium">{paymentMethods.find(m => m.value === formData.paymentMethod)?.label}</span>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  formData.status === 'completed' ? 'bg-green-100 text-green-800' :
                  formData.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {formData.status}
                </span>
              </div>
              {formData.trees && (
                <div>
                  <span className="text-gray-600">Trees:</span>
                  <span className="ml-2 font-medium">{formData.trees}</span>
                </div>
              )}
            </div>

            {formData.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Notes:</strong> {formData.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/admin/financials"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Adding Transaction...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Add Transaction
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
