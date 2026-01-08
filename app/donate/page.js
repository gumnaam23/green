"use client";

import {
    Heart,
    Trees,
    DollarSign,
    MapPin,
    Calendar,
    Users,
    Phone,
    Mail,
    CheckCircle,
    Shield,
    Lock,
    CreditCard,
    Smartphone,
    Building,
    Gift,
    TrendingUp,
    Target,
    Leaf,
    CloudRain,
    Wind,
    ThermometerSun,
    ChevronRight,
    ChevronLeft,
    Plus,
    Minus,
    Star,
    Award,
    FileText,
    Download,
    Share2,
    Eye,
    Clock,
    Users as UsersIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DonatePage() {
    const [donationType, setDonationType] = useState('one-time');
    const [donationAmount, setDonationAmount] = useState(500);
    const [treeCount, setTreeCount] = useState(1);
    const [selectedLocation, setSelectedLocation] = useState('islamabad');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);




    const donationData = {
        donationOptions: [
            { amount: 500, trees: 1, label: "Basic", popular: false, description: "Plant 1 tree with 3-year care" },
            { amount: 2500, trees: 5, label: "Supporter", popular: true, description: "Plant 5 trees & get certificate" },
            { amount: 5000, trees: 10, label: "Patron", popular: false, description: "Plant 10 trees & monthly updates" },
            { amount: 25000, trees: 50, label: "Champion", popular: false, description: "Plant 50 trees & impact report" },
            { amount: 100000, trees: 200, label: "Visionary", popular: false, description: "Plant 200 trees & naming rights" },
            { amount: 500000, trees: 1000, label: "Legacy", popular: false, description: "Plant 1000 trees & memorial plaque" }
        ],
        subscriptionOptions: [
            { amount: 500, frequency: "monthly", trees: 1, label: "Monthly Tree Club" },
            { amount: 1000, frequency: "monthly", trees: 2, label: "Green Guardian" },
            { amount: 2500, frequency: "monthly", trees: 5, label: "Climate Champion" },
            { amount: 5000, frequency: "monthly", trees: 10, label: "Forest Founder" }
        ],
        locations: [
            { id: 'islamabad', name: 'Margalla Hills, Islamabad', trees: 150000, status: 'active' },
            { id: 'karachi', name: 'Karachi Coastal Mangroves', trees: 80000, status: 'active' },
            { id: 'lahore', name: 'Lahore Urban Green Belt', trees: 120000, status: 'active' },
            { id: 'swat', name: 'Swat Valley Reforestation', trees: 0, status: 'planned' },
            { id: 'thar', name: 'Thar Desert Greening', trees: 50000, status: 'active' },
            { id: 'highest-impact', name: 'Highest Impact Area', trees: 0, status: 'recommended' }
        ],
        paymentMethods: [
            { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, MasterCard, UnionPay' },
            { id: 'jazzcash', name: 'JazzCash', icon: Smartphone, description: 'Mobile Wallet' },
            { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone, description: 'Mobile Wallet' },
            { id: 'bank', name: 'Bank Transfer', icon: Building, description: 'Direct Bank Transfer' }
        ],
        taxBenefits: [
            "Tax-deductible under Section 2(36) of Income Tax Ordinance, 2001",
            "Tax certificate provided for donations above PKR 5,000",
            "Valid for tax filing in Pakistan",
            "Certificate emailed within 7 working days"
        ],
        environmentalImpact: {
            co2PerTree: 20, // kg per year
            oxygenPerTree: 118, // kg per year
            waterPerTree: 100, // liters per year
            jobsPer100Trees: 1,
            biodiversityPer100Trees: 5
        },
        recentDonations: [
            { name: "Ahmed Raza", amount: 5000, trees: 10, time: "2 minutes ago" },
            { name: "Fatima Khan", amount: 1000, trees: 2, time: "15 minutes ago" },
            { name: "Tech Solutions Ltd.", amount: 100000, trees: 200, time: "1 hour ago" },
            { name: "Anonymous", amount: 50000, trees: 100, time: "2 hours ago" }
        ]
    };

    const calculateImpact = (trees) => ({
        co2: trees * donationData.environmentalImpact.co2PerTree,
        oxygen: trees * donationData.environmentalImpact.oxygenPerTree,
        water: trees * donationData.environmentalImpact.waterPerTree,
        jobs: Math.ceil(trees / 100) * donationData.environmentalImpact.jobsPer100Trees,
        biodiversity: Math.ceil(trees / 100) * donationData.environmentalImpact.biodiversityPer100Trees
    });

    const handleDonationOptionClick = (amount, trees) => {
        setDonationAmount(amount);
        setTreeCount(trees);
    };

    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePreviousStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmitDonation = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsProcessing(false);
        // In real implementation, this would redirect to payment gateway
        // For demo, we'll simulate success
        window.location.href = '/donate/success';
    };

    const selectedLocationData = donationData.locations.find(loc => loc.id === selectedLocation);
    const impact = calculateImpact(treeCount);
    const totalMonths = donationType === 'monthly' ? 12 : 1;
    const totalAmount = donationAmount * totalMonths;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Progress Bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-700">
                                Step {step} of 3: {step === 1 ? 'Select Donation' : step === 2 ? 'Review & Confirm' : 'Payment'}
                            </div>
                            <div className="text-sm text-gray-500">
                                {step === 1 && 'Choose amount & location'}
                                {step === 2 && 'Verify details'}
                                {step === 3 && 'Complete payment'}
                            </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-green-500 rounded-full transition-all duration-300"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Donation Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                            {/* Step 1: Select Donation */}
                            {step === 1 && (
                                <>
                                    <div className="text-center mb-8">
                                        <Heart className="h-16 w-16 text-green-600 mx-auto mb-4" />
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Plant Trees, Grow Impact</h1>
                                        <p className="text-gray-600">
                                            Every PKR 500 plants and maintains one tree for three years
                                        </p>
                                    </div>

                                    {/* Donation Type Toggle */}
                                    <div className="mb-8">
                                        <div className="flex border border-gray-300 rounded-lg p-1 mb-6">
                                            <button
                                                onClick={() => setDonationType('one-time')}
                                                className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${donationType === 'one-time' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                One-time Donation
                                            </button>
                                            <button
                                                onClick={() => setDonationType('monthly')}
                                                className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${donationType === 'monthly' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                Monthly Subscription
                                            </button>
                                        </div>

                                        {donationType === 'monthly' && (
                                            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                                                <div className="flex items-center mb-4">
                                                    <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                                                    <div>
                                                        <div className="font-bold text-gray-900">Monthly Impact</div>
                                                        <div className="text-sm text-gray-600">Plant trees consistently and track long-term impact</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {donationData.subscriptionOptions.map((option) => (
                                                        <button
                                                            key={option.amount}
                                                            onClick={() => handleDonationOptionClick(option.amount, option.trees)}
                                                            className={`p-4 rounded-lg border-2 text-center transition-all ${donationAmount === option.amount
                                                                    ? 'border-green-500 bg-green-50'
                                                                    : 'border-gray-200 hover:border-green-300'
                                                                }`}
                                                        >
                                                            <div className="text-2xl font-bold text-gray-900">PKR {option.amount}</div>
                                                            <div className="text-sm text-gray-600">per month</div>
                                                            <div className="text-green-700 font-medium mt-2">{option.trees} trees/month</div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Donation Amount Selection */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            {donationType === 'one-time' ? 'Select Donation Amount' : 'Select Monthly Amount'}
                                        </label>

                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                            {donationData.donationOptions.map((option) => (
                                                <button
                                                    key={option.amount}
                                                    onClick={() => handleDonationOptionClick(option.amount, option.trees)}
                                                    className={`relative p-6 rounded-xl border-2 text-center transition-all hover:shadow-md ${donationAmount === option.amount
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-gray-200 hover:border-green-300'
                                                        }`}
                                                >
                                                    {option.popular && (
                                                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                                            <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                                MOST POPULAR
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="text-3xl font-bold text-gray-900 mb-2">PKR {option.amount.toLocaleString()}</div>
                                                    <div className="text-green-700 font-bold text-lg mb-2">{option.trees} trees</div>
                                                    <div className="text-sm text-gray-600">{option.description}</div>
                                                </button>
                                            ))}
                                        </div>

                                        {/* Custom Amount */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-4">Or enter custom amount</label>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => {
                                                        const newAmount = Math.max(500, donationAmount - 500);
                                                        setDonationAmount(newAmount);
                                                        setTreeCount(Math.floor(newAmount / 500));
                                                    }}
                                                    className="p-3 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                                                >
                                                    <Minus className="h-5 w-5" />
                                                </button>
                                                <div className="relative flex-1">
                                                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">PKR</span>
                                                    <input
                                                        type="number"
                                                        value={donationAmount}
                                                        onChange={(e) => {
                                                            const value = Math.max(500, parseInt(e.target.value) || 500);
                                                            setDonationAmount(value);
                                                            setTreeCount(Math.floor(value / 500));
                                                        }}
                                                        min="500"
                                                        step="500"
                                                        className="w-full pl-16 pr-4 py-3 border-y border-gray-300 text-center text-2xl font-bold"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newAmount = donationAmount + 500;
                                                        setDonationAmount(newAmount);
                                                        setTreeCount(Math.floor(newAmount / 500));
                                                    }}
                                                    className="p-3 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                                                >
                                                    <Plus className="h-5 w-5" />
                                                </button>
                                            </div>
                                            <div className="text-center text-gray-600 mt-2">
                                                {treeCount} tree{treeCount !== 1 ? 's' : ''} • PKR {donationAmount.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Selection */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Select Planting Location (Optional)
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {donationData.locations.map((location) => (
                                                <button
                                                    key={location.id}
                                                    onClick={() => setSelectedLocation(location.id)}
                                                    className={`p-4 rounded-lg border-2 text-left transition-all ${selectedLocation === location.id
                                                            ? 'border-green-500 bg-green-50'
                                                            : 'border-gray-200 hover:border-green-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center mb-2">
                                                        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                                                        <span className="font-medium text-gray-900">{location.name.split(',')[0]}</span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {location.trees > 0 ? `${location.trees.toLocaleString()} trees planted` : 'New project'}
                                                    </div>
                                                    <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${location.status === 'active' ? 'bg-green-100 text-green-800' :
                                                            location.status === 'planned' ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-blue-100 text-blue-800'
                                                        }`}>
                                                        {location.status}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Impact Preview */}
                                    <div className="bg-green-50 rounded-xl p-6 mb-8">
                                        <h3 className="font-bold text-gray-900 mb-4">Your Impact Preview</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                            <div className="text-center">
                                                <CloudRain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                                <div className="text-lg font-bold">{impact.co2} kg</div>
                                                <div className="text-xs text-gray-600">CO₂ Absorbed/year</div>
                                            </div>
                                            <div className="text-center">
                                                <Wind className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                                <div className="text-lg font-bold">{impact.oxygen} kg</div>
                                                <div className="text-xs text-gray-600">Oxygen Produced/year</div>
                                            </div>
                                            <div className="text-center">
                                                <Leaf className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                                                <div className="text-lg font-bold">{impact.water} L</div>
                                                <div className="text-xs text-gray-600">Water Filtered/year</div>
                                            </div>
                                            <div className="text-center">
                                                <UsersIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                                                <div className="text-lg font-bold">{impact.jobs}</div>
                                                <div className="text-xs text-gray-600">Jobs Created</div>
                                            </div>
                                            <div className="text-center">
                                                <ThermometerSun className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                                <div className="text-lg font-bold">{impact.biodiversity}</div>
                                                <div className="text-xs text-gray-600">Species Protected</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleNextStep}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg"
                                    >
                                        Continue to Review
                                    </button>
                                </>
                            )}

                            {/* Step 2: Review & Confirm */}
                            {step === 2 && (
                                <>
                                    <div className="mb-8">
                                        <button
                                            onClick={handlePreviousStep}
                                            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                                        >
                                            <ChevronLeft className="h-5 w-5 mr-2" />
                                            Back to Amount Selection
                                        </button>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Donation</h2>
                                    </div>

                                    {/* Donation Summary */}
                                    <div className="bg-gray-50 rounded-xl p-6 mb-8">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-4">Donation Details</h3>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Donation Type:</span>
                                                        <span className="font-medium">
                                                            {donationType === 'one-time' ? 'One-time' : 'Monthly Subscription'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Amount:</span>
                                                        <span className="font-bold text-green-700">
                                                            PKR {donationAmount.toLocaleString()}
                                                            {donationType === 'monthly' && '/month'}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Trees to Plant:</span>
                                                        <span className="font-bold">{treeCount} trees</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Planting Location:</span>
                                                        <span className="font-medium">{selectedLocationData?.name.split(',')[0]}</span>
                                                    </div>
                                                    {donationType === 'monthly' && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Annual Impact:</span>
                                                            <span className="font-bold">{treeCount * 12} trees/year</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-4">What You'll Receive</h3>
                                                <ul className="space-y-2">
                                                    <li className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                        <span>Planting Certificate</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                        <span>GPS Coordinates of Trees</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                        <span>Monthly Growth Updates</span>
                                                    </li>
                                                    <li className="flex items-center">
                                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                        <span>Tax Deduction Certificate</span>
                                                    </li>
                                                    {treeCount >= 10 && (
                                                        <li className="flex items-center">
                                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                                            <span>Personalized Impact Report</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Total Amount */}
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-lg font-bold text-gray-900">Total Amount</div>
                                                    <div className="text-sm text-gray-600">
                                                        {donationType === 'monthly' ? 'Charged monthly until cancelled' : 'One-time payment'}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-3xl font-bold text-green-700">
                                                        PKR {totalAmount.toLocaleString()}
                                                    </div>
                                                    {donationType === 'monthly' && (
                                                        <div className="text-sm text-gray-600">
                                                            PKR {(donationAmount * 12).toLocaleString()} annually
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Donor Information */}
                                    <div className="mb-8">
                                        <h3 className="font-bold text-gray-900 mb-4">Donor Information</h3>
                                        <div className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <input
                                                        type="tel"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="+92 XXX XXXXXXX"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">CNIC/B-Form</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="XXXXX-XXXXXXX-X"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="anonymous"
                                                    checked={isAnonymous}
                                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                                    className="h-4 w-4 text-green-600 rounded"
                                                />
                                                <label htmlFor="anonymous" className="ml-3 text-sm text-gray-700">
                                                    Donate anonymously (your name won't appear publicly)
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="newsletter"
                                                    defaultChecked
                                                    className="h-4 w-4 text-green-600 rounded"
                                                />
                                                <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                                                    Receive updates about tree growth and impact reports
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            onClick={handlePreviousStep}
                                            className="flex-1 py-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNextStep}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg"
                                        >
                                            Continue to Payment
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Step 3: Payment */}
                            {step === 3 && (
                                <>
                                    <div className="mb-8">
                                        <button
                                            onClick={handlePreviousStep}
                                            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                                        >
                                            <ChevronLeft className="h-5 w-5 mr-2" />
                                            Back to Review
                                        </button>

                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
                                    </div>

                                    {/* Payment Methods */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-4">
                                            Select Payment Method
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            {donationData.paymentMethods.map((method) => {
                                                const Icon = method.icon;
                                                return (
                                                    <button
                                                        key={method.id}
                                                        onClick={() => setPaymentMethod(method.id)}
                                                        className={`p-4 rounded-lg border-2 text-center transition-all ${paymentMethod === method.id
                                                                ? 'border-green-500 bg-green-50'
                                                                : 'border-gray-200 hover:border-green-300'
                                                            }`}
                                                    >
                                                        <Icon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                                                        <div className="font-medium text-gray-900">{method.name}</div>
                                                        <div className="text-xs text-gray-600 mt-1">{method.description}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Card Details Form */}
                                        {paymentMethod === 'card' && (
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                                                        <input
                                                            type="text"
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                                        placeholder="Name on card"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Mobile Wallet Instructions */}
                                        {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                                                <div className="flex items-center mb-4">
                                                    <Smartphone className="h-8 w-8 text-blue-600 mr-3" />
                                                    <div>
                                                        <div className="font-bold text-gray-900">Mobile Wallet Instructions</div>
                                                        <div className="text-sm text-gray-600">
                                                            Send payment to our registered number
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Amount to Send:</span>
                                                        <span className="font-bold">PKR {totalAmount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Recipient Number:</span>
                                                        <span className="font-bold">0312 3456789</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Reference Code:</span>
                                                        <span className="font-bold">GREEN{Date.now().toString().slice(-6)}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">
                                                    After sending payment, please keep the transaction ID for verification.
                                                </div>
                                            </div>
                                        )}

                                        {/* Bank Transfer Instructions */}
                                        {paymentMethod === 'bank' && (
                                            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                                                <div className="flex items-center mb-4">
                                                    <Building className="h-8 w-8 text-purple-600 mr-3" />
                                                    <div>
                                                        <div className="font-bold text-gray-900">Bank Transfer Details</div>
                                                        <div className="text-sm text-gray-600">
                                                            Transfer to our official bank account
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Account Title:</span>
                                                        <span className="font-bold">GreenEarth Pakistan Initiative</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Bank Name:</span>
                                                        <span className="font-bold">Habib Bank Limited</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Account Number:</span>
                                                        <span className="font-bold">1234-5678901234</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">IBAN:</span>
                                                        <span className="font-bold">PK36HABB0012345678901234</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Amount:</span>
                                                        <span className="font-bold">PKR {totalAmount.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-sm text-gray-600">
                                                    Please use your name as transaction reference. Email receipt to donations@greenearth.pk
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Security & Trust */}
                                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                                        <div className="flex items-center mb-4">
                                            <Shield className="h-8 w-8 text-green-600 mr-3" />
                                            <div>
                                                <div className="font-bold text-gray-900">Secure & Trusted Payment</div>
                                                <div className="text-sm text-gray-600">
                                                    Your payment information is encrypted and secure
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center">
                                                <Lock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                                <div className="text-xs">SSL Encrypted</div>
                                            </div>
                                            <div className="text-center">
                                                <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                                <div className="text-xs">PCI DSS Compliant</div>
                                            </div>
                                            <div className="text-center">
                                                <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                                <div className="text-xs">Verified Partner</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Amount & Submit */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center p-6 bg-gray-50 rounded-xl">
                                            <div>
                                                <div className="text-lg font-bold text-gray-900">Total Amount Due</div>
                                                <div className="text-sm text-gray-600">
                                                    {donationType === 'monthly' ? 'Monthly subscription' : 'One-time payment'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-green-700">
                                                    PKR {totalAmount.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {treeCount} tree{treeCount !== 1 ? 's' : ''} • {selectedLocationData?.name.split(',')[0]}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                required
                                                className="h-4 w-4 text-green-600 rounded"
                                            />
                                            <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                                                I agree to the Terms & Conditions and authorize this transaction
                                            </label>
                                        </div>

                                        <button
                                            onClick={handleSubmitDonation}
                                            disabled={isProcessing}
                                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                                                    Processing Payment...
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="h-6 w-6 mr-3" />
                                                    Complete Secure Payment
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-sm text-gray-500">
                                            You'll be redirected to a secure payment gateway
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Tax Benefits */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex items-center mb-6">
                                <FileText className="h-8 w-8 text-green-600 mr-3" />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Tax Benefits</h3>
                                    <p className="text-gray-600">Your donation is tax-deductible in Pakistan</p>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {donationData.taxBenefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-8">
                        {/* Recent Donations */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Donations</h3>
                            <div className="space-y-4">
                                {donationData.recentDonations.map((donation, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center font-bold mr-3">
                                                {donation.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">
                                                    {donation.name === "Anonymous" ? "Anonymous" : donation.name.split(' ')[0]}
                                                </div>
                                                <div className="text-xs text-gray-500">{donation.time}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-green-700">PKR {donation.amount.toLocaleString()}</div>
                                            <div className="text-xs text-gray-500">{donation.trees} trees</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact Calculator */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
                            <h3 className="text-lg font-bold mb-6">Your Impact</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span>Trees to Plant:</span>
                                    <span className="text-2xl font-bold">{treeCount}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>CO₂ Absorbed/year:</span>
                                    <span className="font-bold">{impact.co2} kg</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Oxygen Produced/year:</span>
                                    <span className="font-bold">{impact.oxygen} kg</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Water Filtered/year:</span>
                                    <span className="font-bold">{impact.water} L</span>
                                </div>
                                <div className="pt-4 border-t border-white/20">
                                    <div className="text-center">
                                        <div className="text-xs opacity-80">Equivalent to removing</div>
                                        <div className="text-lg font-bold">{Math.floor(impact.co2 / 5000)} cars from roads</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Donate */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Why Donate?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Target className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-gray-900">Maximum Impact</div>
                                        <div className="text-sm text-gray-600">87.5% tree survival rate - highest in Pakistan</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Eye className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-gray-900">Complete Transparency</div>
                                        <div className="text-sm text-gray-600">GPS tracking, photos, and regular updates</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Award className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-gray-900">Award-Winning NGO</div>
                                        <div className="text-sm text-gray-600">Recognized for excellence in environmental work</div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Users className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium text-gray-900">Community Driven</div>
                                        <div className="text-sm text-gray-600">Creates local jobs and empowers communities</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Need Help? */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Our donation team is here to assist you with any questions.
                            </p>
                            <div className="space-y-3">
                                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-white">
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <div className="font-medium text-gray-900">Call Donation Hotline</div>
                                            <div className="text-sm text-gray-600">+92 51 1234567</div>
                                        </div>
                                    </div>
                                </button>
                                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:bg-white">
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-gray-500 mr-3" />
                                        <div>
                                            <div className="font-medium text-gray-900">Email Us</div>
                                            <div className="text-sm text-gray-600">donations@greenearth.pk</div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corporate Donations */}
                <div className="mt-8 bg-gradient-to-r from-green-800 to-emerald-700 rounded-2xl shadow-lg p-8 text-white">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="lg:w-2/3">
                            <h2 className="text-2xl font-bold mb-4">Corporate & Bulk Donations</h2>
                            <p className="opacity-90 mb-6">
                                Looking to make a larger impact? Our corporate donation programs offer customized solutions
                                with comprehensive impact reporting and CSR benefits.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">500+</div>
                                    <div>Corporate Partners</div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <div className="text-2xl font-bold">1M+</div>
                                    <div>Corporate Trees Planted</div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/3 mt-6 lg:mt-0 lg:text-right">
                            <button className="bg-white text-green-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100">
                                Enquire for Corporate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}