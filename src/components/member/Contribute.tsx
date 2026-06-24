import React, { useState } from 'react';
import { ArrowLeft, Upload, Calendar, Check, X, Plus, Minus } from 'lucide-react';

interface ContributeProps {
  onBack: () => void;
}

const Contribute: React.FC<ContributeProps> = ({ onBack }) => {
  const [hasPenalty, setHasPenalty] = useState(true);
  const [contributionAmount, setContributionAmount] = useState(40000);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [penaltyAmount, setPenaltyAmount] = useState(4000);
  const [paymentDate, setPaymentDate] = useState('2026-06-20');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('Paid via MoMo to group account, settling April & May.');
  const [selectedMonths, setSelectedMonths] = useState<string[]>(['Apr 2026', 'May 2026']);

  const availableMonths = ['Apr 2026', 'May 2026', 'Jul 2026', 'Aug 2026'];

  // Without penalty data
  const [noPenaltyAmount, setNoPenaltyAmount] = useState(20000);
  const [noPenaltyMonths, setNoPenaltyMonths] = useState(1);
  const [noPenaltySelectedMonths, setNoPenaltySelectedMonths] = useState<string[]>(['Jul 2026']);
  const [noPenaltyPaymentDate, setNoPenaltyPaymentDate] = useState('2026-06-28');
  const noPenaltyAvailableMonths = ['Jul 2026', 'Aug 2026', 'Sep 2026'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const toggleNoPenaltyMonth = (month: string) => {
    if (noPenaltySelectedMonths.includes(month)) {
      setNoPenaltySelectedMonths(noPenaltySelectedMonths.filter(m => m !== month));
    } else {
      setNoPenaltySelectedMonths([...noPenaltySelectedMonths, month]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Contribution submitted for approval!');
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  return (
    <div className="bg-[#f4f1ea] min-h-screen p-4 md:p-8 text-[#2d2d2d]">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e5dfd3] overflow-hidden">
        
        {/* Top Header Navigation */}
        <header className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-b border-[#f0eae1]">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div className="w-10 h-10 bg-[#1e533c] text-white flex items-center justify-center font-bold rounded-lg text-sm">IK</div>
            <div>
              <h1 className="font-bold tracking-wide uppercase text-sm text-[#1e533c]">IKIMINA</h1>
              <p className="text-[10px] text-gray-400 tracking-wider font-semibold uppercase">Gents · Investment</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-2">
            <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors rounded-lg">
              Dashboard
            </button>
            <button className="bg-[#e9f2ee] text-[#1e533c] px-4 py-2 rounded-lg font-semibold text-sm">
              Contribute
            </button>
            <button onClick={onBack} className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors rounded-lg">
              History
            </button>
          </nav>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-800">Eric Mugisha</p>
              <p className="text-[10px] text-gray-400 font-medium">Member · #007</p>
            </div>
            <div className="w-9 h-9 bg-[#bd633c] text-white flex items-center justify-center font-bold text-xs rounded-full">EM</div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Record a contribution</h2>
            <p className="text-gray-500 text-sm mt-1">
              {!hasPenalty 
                ? 'Paying on time or ahead of the 7th — no penalty applies.' 
                : 'Log a transfer you\'ve already made and attach proof. The treasurer reviews and approves it.'}
            </p>
          </div>

          {/* Grid Layout for Form and Summary Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Side: Form Inputs */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Transaction Type Box */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Transaction type</label>
                <div className="flex items-center justify-between bg-[#e9f2ee] border border-[#d6e7df] p-3.5 rounded-xl">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#2a7e58]"></span>
                    <span className="text-sm font-semibold text-[#1e533c]">Contribution — money in</span>
                  </div>
                  <span className="text-xs text-[#7fa392] font-medium">Members record contributions only</span>
                </div>
              </div>

              {/* Penalty Toggle Row */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Does this payment include a penalty?</label>
                <div className="grid grid-cols-2 bg-[#f4f1ea] p-1 rounded-xl border border-[#e5dfd3]">
                  <button 
                    type="button" 
                    onClick={() => setHasPenalty(true)}
                    className={`font-bold py-2.5 text-sm rounded-lg transition ${
                      hasPenalty 
                        ? 'bg-white text-gray-800 shadow-sm border border-[#e5dfd3]' 
                        : 'text-gray-400 font-medium hover:text-gray-600'
                    }`}
                  >
                    With penalty
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setHasPenalty(false)}
                    className={`font-bold py-2.5 text-sm rounded-lg transition ${
                      !hasPenalty 
                        ? 'bg-white text-gray-800 shadow-sm border border-[#e5dfd3]' 
                        : 'text-gray-400 font-medium hover:text-gray-600'
                    }`}
                  >
                    Without penalty
                  </button>
                </div>
              </div>

              {/* Contribution & Number of Months Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Contribution amount</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text" 
                      value={hasPenalty ? contributionAmount.toLocaleString() : noPenaltyAmount.toLocaleString()} 
                      readOnly
                      className="w-full bg-white border border-[#e5dfd3] rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#1e533c]"
                    />
                    <span className="absolute right-4 text-xs font-bold text-gray-400 tracking-wider">RWF</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Number of months</label>
                  <div className="flex items-center border border-[#e5dfd3] rounded-xl bg-white overflow-hidden py-1 px-1">
                    <button 
                      type="button" 
                      onClick={() => {
                        if (hasPenalty) {
                          setNumberOfMonths(Math.max(1, numberOfMonths - 1));
                        } else {
                          setNoPenaltyMonths(Math.max(1, noPenaltyMonths - 1));
                        }
                      }}
                      className="w-10 py-2 text-gray-400 hover:bg-gray-50 rounded-lg text-lg font-bold bg-[#f4f1ea] border border-[#e5dfd3]"
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      value={hasPenalty ? numberOfMonths : noPenaltyMonths} 
                      readOnly
                      className="w-full text-center text-sm font-bold text-gray-800 focus:outline-none"
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        if (hasPenalty) {
                          setNumberOfMonths(numberOfMonths + 1);
                        } else {
                          setNoPenaltyMonths(noPenaltyMonths + 1);
                        }
                      }}
                      className="w-10 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-lg font-bold bg-[#eec8b7]/40 text-[#bd633c]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Months Covered Chips */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Months covered</label>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {hasPenalty ? 'Auto-allocated oldest unpaid first' : 'Paying ahead is allowed'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(hasPenalty ? availableMonths : noPenaltyAvailableMonths).map((month) => {
                    const isSelected = hasPenalty 
                      ? selectedMonths.includes(month) 
                      : noPenaltySelectedMonths.includes(month);
                    const toggle = hasPenalty 
                      ? () => toggleMonth(month) 
                      : () => toggleNoPenaltyMonth(month);
                    return (
                      <button
                        key={month}
                        type="button"
                        onClick={toggle}
                        className={`flex items-center space-x-1 text-xs font-bold py-2 px-3 rounded-xl transition ${
                          isSelected
                            ? 'bg-[#e9f2ee] border border-[#d6e7df] text-[#1e533c]'
                            : 'bg-white border border-[#e5dfd3] text-gray-400 font-medium'
                        }`}
                      >
                        {isSelected && <span>✓</span>}
                        <span>{month}</span>
                      </button>
                    );
                  })}
                  <button className="bg-white border border-[#e5dfd3] text-gray-500 text-xs font-semibold py-2 px-3 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                    + advance
                  </button>
                </div>
              </div>

              {/* Penalty Amount & Date of Payment Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Penalty amount</label>
                  {hasPenalty ? (
                    <>
                      <div className="relative flex items-center">
                        <input 
                          type="text" 
                          value={penaltyAmount.toLocaleString()} 
                          readOnly
                          className="w-full bg-white border border-[#e5dfd3] rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none"
                        />
                        <span className="absolute right-4 text-xs font-bold text-gray-400 tracking-wider">RWF</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1.5">System suggests 4,000 for {selectedMonths.length} overdue months</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center border border-[#e5dfd3] rounded-xl overflow-hidden bg-[#f7f6f2]">
                        <input 
                          type="text" 
                          value="Not applicable" 
                          disabled
                          className="w-full px-4 py-3 text-sm font-medium outline-none bg-[#f7f6f2] text-[#a09d94]"
                        />
                        <span className="pr-4 text-[#a09d94] text-sm font-medium">RWF</span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1.5">No overdue months — nothing owed</p>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Date of payment</label>
                  <div className="relative flex items-center">
                    <input 
                      type="date" 
                      value={hasPenalty ? paymentDate : noPenaltyPaymentDate}
                      onChange={(e) => {
                        if (hasPenalty) {
                          setPaymentDate(e.target.value);
                        } else {
                          setNoPenaltyPaymentDate(e.target.value);
                        }
                      }}
                      className="w-full bg-white border border-[#e5dfd3] rounded-xl py-3 px-4 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#1e533c] [&::-webkit-calendar-picker-indicator]:opacity-50"
                    />
                    <span className="absolute right-4 text-gray-400 pointer-events-none">
                      <Calendar className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Proof of Payment Upload Box */}
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Proof of payment</label>
                <div className="border-2 border-dashed border-[#e5dfd3] rounded-xl p-8 bg-[#fdfcfa] text-center flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50/50 transition-colors">
                  <input
                    type="file"
                    id="proofUpload"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="proofUpload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-10 h-10 bg-white border border-[#e5dfd3] rounded-xl flex items-center justify-center mb-3 shadow-sm">
                      <Upload className="w-5 h-5 text-gray-600" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      {proofFile ? proofFile.name : 'Drop your SMS screenshot or bank slip'}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1 tracking-wide font-medium">
                      JPG — PNG — PDF — max 5 MB · <span className="text-red-400">required</span>
                    </p>
                    {proofFile && (
                      <span className="inline-block mt-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        ✓ File uploaded
                      </span>
                    )}
                  </label>
                </div>
              </div>

              {/* Notes Input Textarea */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Notes <span className="text-gray-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea 
                  rows={2} 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#e5dfd3] rounded-xl py-3 px-4 text-sm text-gray-700 focus:outline-none focus:border-[#1e533c] resize-none"
                />
              </div>

              {/* Form Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 pt-2">
                <button 
                  type="submit" 
                  onClick={handleSubmit}
                  className="bg-[#1e533c] hover:bg-[#163f2d] text-white font-bold text-sm px-6 py-3.5 rounded-xl w-full sm:flex-1 text-center transition-colors"
                >
                  Submit for approval
                </button>
                <button 
                  type="button" 
                  onClick={handleSaveDraft}
                  className="bg-white hover:bg-gray-50 border border-[#e5dfd3] text-gray-700 font-bold text-sm px-5 py-3.5 rounded-xl w-full sm:w-auto transition-colors"
                >
                  Save draft
                </button>
              </div>

            </div>

            {/* Right Side: Summary Card Box */}
            <div className="bg-white border border-[#e5dfd3] rounded-2xl p-6 shadow-sm space-y-5 lg:sticky lg:top-6">
              <h3 className="text-sm font-bold text-gray-800 tracking-wide">Summary</h3>
              
              <div className="space-y-3.5 text-sm border-b border-[#f0eae1] pb-5">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Months covered</span>
                  <span className="font-bold text-gray-800">{hasPenalty ? selectedMonths.length : noPenaltySelectedMonths.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Contribution</span>
                  <span className="font-bold text-gray-800">{hasPenalty ? contributionAmount.toLocaleString() : noPenaltyAmount.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Penalty</span>
                  <span className="font-bold text-[#bd633c]">
                    {hasPenalty ? penaltyAmount.toLocaleString() : 'None'} RWF
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm text-gray-500 font-medium">Total to record</span>
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {hasPenalty 
                    ? (contributionAmount + penaltyAmount).toLocaleString() 
                    : noPenaltyAmount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Allocated to</label>
                <div className="flex flex-wrap gap-2">
                  {(hasPenalty ? selectedMonths : noPenaltySelectedMonths).map((month) => (
                    <span key={month} className="bg-[#f4f1ea] border border-[#e5dfd3] text-gray-700 text-xs font-semibold py-1.5 px-3 rounded-lg">
                      {month}
                    </span>
                  ))}
                  {!hasPenalty && noPenaltySelectedMonths.length > 0 && (
                    <span className="bg-[#f4f1ea] border border-[#e5dfd3] text-[#1e5631] text-[10px] font-bold py-1.5 px-2 rounded-lg">
                      ADVANCE
                    </span>
                  )}
                </div>
              </div>

              {/* Match Status Badge */}
              <div className="bg-[#e9f2ee] border border-[#d6e7df] text-[#1e533c] text-xs font-bold p-3.5 rounded-xl flex items-center space-x-2.5">
                <span className="w-4 h-4 rounded-full bg-[#1e533c] text-white flex items-center justify-center text-[10px]">✓</span>
                <span>Amount matches {hasPenalty ? selectedMonths.length : noPenaltySelectedMonths.length} × 20,000</span>
              </div>

              {!hasPenalty && (
                <div className="bg-[#e9f2ee] border border-[#d6e7df] rounded-xl p-3">
                  <p className="text-xs text-[#1e533c] font-semibold">
                    Paid ahead of the 7th — no penalty
                  </p>
                  <p className="text-[10px] text-[#1e533c]/70 mt-1">
                    Covering a future month in advance keeps it penalty-free even if you're away when its due date arrives.
                  </p>
                </div>
              )}

              <p className="text-[11px] text-gray-400 leading-normal">
                This is recorded as <span className="font-bold text-gray-600">Pending</span> until the treasurer verifies your proof. It won't affect your shares until approved.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Contribute;