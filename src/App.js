import React, { useState } from 'react';
import { ChevronRight, GraduationCap, Activity, Wrench, AlertCircle, Building2, CheckCircle, Info } from 'lucide-react';

const GPACalculator = () => {
  const [step, setStep] = useState(1);
  const [admissionType, setAdmissionType] = useState('');
  const [hscGPA, setHscGPA] = useState('');
  const [sscGPA, setSscGPA] = useState('');
  const [gpaMarks, setGpaMarks] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [attemptType, setAttemptType] = useState('');
  const [sscMarks, setSscMarks] = useState('');
  const [hscMarks, setHscMarks] = useState('');
  const [mcqMarks, setMcqMarks] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [showResultBox, setShowResultBox] = useState(false);
  const [eligibilityStatus, setEligibilityStatus] = useState('');

  const calculateGPAMarks = () => {
    const hsc = parseFloat(hscGPA) || 0;
    const ssc = parseFloat(sscGPA) || 0;
    
    if (hsc > 5 || ssc > 5) {
      alert('GPA cannot exceed 5.00');
      return;
    }
    
    const total = (hsc * 10) + (ssc * 10);
    setGpaMarks(total);
    setStep(4);
  };

  const calculateFinalResult = () => {
    const correct = parseFloat(correctAnswers) || 0;
    const wrong = parseFloat(wrongAnswers) || 0;
    
    if (correct > 100 || wrong > 100) {
      alert('Answers cannot exceed 100');
      return;
    }
    
    if (correct + wrong > 100) {
      alert('Total answers cannot exceed 100');
      return;
    }
    
    setShowResults(true);
  };

  const getExamMarks = () => {
    const correct = parseFloat(correctAnswers) || 0;
    const wrong = parseFloat(wrongAnswers) || 0;
    return (correct * 1) - (wrong * 0.25);
  };

  const getTotalMarks = () => {
    return gpaMarks + getExamMarks();
  };

  const getZoneInfo = () => {
    const total = getTotalMarks();
    if (total >= 168) {
      return {
        zone: 'SAFE ZONE',
        message: 'High Chance of Selection',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        icon: '✅'
      };
    } else if (total >= 160) {
      return {
        zone: 'MODERATE ZONE',
        message: 'Borderline Chance',
        color: 'from-yellow-500 to-amber-600',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        icon: '⚠️'
      };
    } else {
      return {
        zone: 'RED ZONE',
        message: 'Low Chance',
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        icon: '❌'
      };
    }
  };

  const resetCalculator = () => {
    setStep(1);
    setAdmissionType('');
    setHscGPA('');
    setSscGPA('');
    setGpaMarks(0);
    setCorrectAnswers('');
    setWrongAnswers('');
    setShowResults(false);
    setSelectedUniversity('');
    setSelectedUnit('');
    setAttemptType('');
    setSscMarks('');
    setHscMarks('');
    setMcqMarks('');
    setResultMessage('');
    setShowResultBox(false);
    setEligibilityStatus('');
  };

  const getUniversityDisplayName = () => {
    const names = {
      'dhaka': 'Dhaka University',
      'jahangirnagar': 'Jahangirnagar University',
      'chittagong': 'Chittagong University',
      'rajshahi': 'Rajshahi University',
      'agri': 'Agricultural University Cluster',
      'gst': 'GST University Cluster'
    };
    return names[selectedUniversity] || '';
  };

  const checkDhakaUniversityEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (attemptType === 'second') {
      setEligibilityStatus('not-eligible');
      setResultMessage('Second-time candidates are not eligible for Dhaka University Science Unit');
      setShowResultBox(true);
      return false;
    }
    
    if (ssc >= 3 && hsc >= 3 && total >= 7.5) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for Dhaka University Science Unit');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const checkJahangirnagerEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (ssc >= 4 && hsc >= 4 && total >= 9) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for Jahangirnagar University');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const calculateJahangirnagerResult = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const mcq = parseFloat(mcqMarks) || 0;
    
    if (mcq > 80) {
      alert('MCQ marks cannot exceed 80');
      return;
    }
    
    const total = mcq + (ssc * 1.5) + (hsc * 2.5);
    setResultMessage('Your Expected Total: ' + total.toFixed(2) + ' out of 100');
    setShowResultBox(true);
  };

  const checkChittagongEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (ssc >= 4 && hsc >= 3.5 && total >= 8) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for Chittagong University');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const calculateChittagongResult = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const mcq = parseFloat(mcqMarks) || 0;
    
    if (mcq > 100) {
      alert('MCQ marks cannot exceed 100');
      return;
    }
    
    const total = mcq + ssc + hsc;
    setResultMessage('Your Expected Total: ' + total.toFixed(2) + ' out of 110');
    setShowResultBox(true);
  };

  const checkRajshahiEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (ssc >= 3.5 && hsc >= 3.5 && total >= 8) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for Rajshahi University (RU-C)');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const checkAgriClusterEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (ssc >= 4 && hsc >= 4 && total >= 8.5) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for Agricultural University Cluster');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const calculateAgriClusterResult = () => {
    const sscM = parseFloat(sscMarks) || 0;
    const hscM = parseFloat(hscMarks) || 0;
    
    if (sscM > 1050) {
      alert('SSC marks cannot exceed 1050');
      return;
    }
    if (hscM > 1100) {
      alert('HSC marks cannot exceed 1100');
      return;
    }
    
    const total = (sscM / 1050) * 25 + (hscM / 1100) * 25;
    setResultMessage('Your Expected GPA Contribution: ' + total.toFixed(2) + ' out of 50');
    setShowResultBox(true);
  };

  const checkGSTEligibility = () => {
    const ssc = parseFloat(sscGPA) || 0;
    const hsc = parseFloat(hscGPA) || 0;
    const total = ssc + hsc;
    
    if (ssc >= 3.5 && hsc >= 3.5 && total >= 7.5) {
      setEligibilityStatus('eligible');
      setResultMessage('You meet the eligibility criteria for GST University Cluster');
      setShowResultBox(true);
      return true;
    } else {
      setEligibilityStatus('not-eligible');
      setResultMessage('You do not meet the minimum eligibility requirements');
      setShowResultBox(true);
      return false;
    }
  };

  const universities = [
    { name: 'Dhaka University', key: 'dhaka', gradient: 'from-purple-600 to-purple-800', abbr: 'DU' },
    { name: 'Jahangirnagar University', key: 'jahangirnagar', gradient: 'from-indigo-600 to-indigo-800', abbr: 'JU' },
    { name: 'Chittagong University', key: 'chittagong', gradient: 'from-teal-600 to-teal-800', abbr: 'CU' },
    { name: 'Rajshahi University', key: 'rajshahi', gradient: 'from-cyan-600 to-cyan-800', abbr: 'RU' },
    { name: 'GST University Cluster', key: 'gst', gradient: 'from-amber-600 to-amber-800', abbr: 'GST' },
    { name: 'Agricultural University Cluster', key: 'agri', gradient: 'from-green-600 to-green-800', abbr: 'AGRI' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-500 via-white to-red-500 bg-clip-text text-transparent mb-2 tracking-tight">
            DMC STATION UNIVERSITY
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white/90">
            ADMISSION GPA CALCULATOR
          </h2>
        </div>

        <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 transition-all duration-500">
          {step === 1 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Welcome!</h3>
              <p className="text-white/70 text-lg">
                Calculate your admission GPA and estimate your chances
              </p>
              
              <button
                onClick={() => setStep(2)}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Choose Admission Type
              </h3>
              <div className="grid gap-4">
                <button
                  onClick={() => {
                    setAdmissionType('medical');
                    setStep(3);
                  }}
                  className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-white">Medical</h4>
                      <p className="text-white/60 text-sm">MBBS & BDS Admission</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAdmissionType('engineering');
                    setStep(5);
                  }}
                  className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wrench className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-white">Engineering</h4>
                      <p className="text-white/60 text-sm">Engineering Admission</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setAdmissionType('university');
                    setStep(6);
                  }}
                  className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-white">University</h4>
                      <p className="text-white/60 text-sm">General Admission</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Enter Your GPA
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    HSC GPA (out of 5.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="5"
                    value={hscGPA}
                    onChange={(e) => setHscGPA(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                    placeholder="e.g., 5.00"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    SSC GPA (out of 5.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="5"
                    value={sscGPA}
                    onChange={(e) => setSscGPA(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                    placeholder="e.g., 5.00"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  Back
                </button>
                <button
                  onClick={calculateGPAMarks}
                  disabled={!hscGPA || !sscGPA}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full font-semibold shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Calculate
                </button>
              </div>
            </div>
          )}

          {step === 4 && !showResults && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-br from-red-500/20 to-red-700/20 border border-red-500/30 rounded-2xl p-6 text-center">
                <p className="text-white/70 text-sm mb-2">Your GPA Contribution</p>
                <p className="text-4xl font-bold text-white">{gpaMarks.toFixed(2)}</p>
                <p className="text-white/60 text-sm mt-1">out of 100</p>
              </div>

              <h3 className="text-xl font-bold text-white text-center">
                Enter Expected Exam Performance
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Expected Correct Answers (out of 100)
                  </label>
                  <input
                    type="number"
                    max="100"
                    value={correctAnswers}
                    onChange={(e) => setCorrectAnswers(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                    placeholder="e.g., 85"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    Expected Wrong Answers (out of 100)
                  </label>
                  <input
                    type="number"
                    max="100"
                    value={wrongAnswers}
                    onChange={(e) => setWrongAnswers(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
                    placeholder="e.g., 10"
                  />
                </div>
              </div>

              <button
                onClick={calculateFinalResult}
                disabled={!correctAnswers || !wrongAnswers}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/70 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Know Your Full Approximate Result
              </button>
            </div>
          )}

          {step === 4 && showResults && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                Your Results
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-white/70">GPA Marks</span>
                  <span className="text-white font-bold">{gpaMarks.toFixed(2)} / 100</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-white/70">Exam Marks</span>
                  <span className="text-white font-bold">{getExamMarks().toFixed(2)} / 100</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-2xl p-6 text-center">
                <p className="text-white/70 text-sm mb-2">Final Estimated Total</p>
                <p className="text-5xl font-bold text-white mb-1">{getTotalMarks().toFixed(2)}</p>
                <p className="text-white/60 text-sm">out of 200</p>
              </div>

              <div className={`${getZoneInfo().bgColor} border-2 ${getZoneInfo().borderColor} rounded-2xl p-6`}>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-4xl">{getZoneInfo().icon}</span>
                  <h4 className={`text-2xl font-bold bg-gradient-to-r ${getZoneInfo().color} bg-clip-text text-transparent`}>
                    {getZoneInfo().zone}
                  </h4>
                </div>
                <p className="text-white/80 text-center text-lg">
                  {getZoneInfo().message}
                </p>
              </div>

              <button
                onClick={resetCalculator}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
              >
                Calculate Again
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="text-center space-y-6 animate-fade-in">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Under Development</h3>
              <p className="text-white/70 text-lg">
                This feature is coming soon
              </p>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
              >
                Go Back
              </button>
            </div>
          )}

          {step === 6 && !selectedUniversity && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-white text-center mb-8">
                Select University
              </h3>
              <div className="grid gap-4">
                {universities.map((uni) => (
                  <button
                    key={uni.key}
                    onClick={() => {
                      setSelectedUniversity(uni.key);
                      if (uni.key === 'dhaka') {
                        setStep(7);
                      } else if (uni.key === 'jahangirnagar') {
                        setStep(8);
                      } else {
                        setStep(10);
                      }
                    }}
                    className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${uni.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Building2 className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="text-xl font-bold text-white">{uni.name}</h4>
                        <p className="text-white/60 text-sm">Check Eligibility</p>
                      </div>
                      <div className="px-3 py-1 bg-white/10 rounded-lg">
                        <span className="text-white/80 font-semibold text-sm">{uni.abbr}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
              >
                Back
              </button>
            </div>
          )}

          {step === 7 && selectedUniversity === 'dhaka' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
                  <span className="text-purple-300 font-semibold">Dhaka University</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Science Unit - Attempt Type
                </h3>
              </div>
              <p className="text-white/70 text-center mb-6">
                Are you a First Timer or Second Timer?
              </p>
              <div className="grid gap-4">
                <button
                  onClick={() => {
                    setAttemptType('first');
                    setStep(10);
                  }}
                  className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <h4 className="text-xl font-bold text-white">First Timer</h4>
                  <p className="text-white/60 text-sm">First attempt at admission</p>
                </button>
                <button
                  onClick={() => {
                    setAttemptType('second');
                    setStep(10);
                  }}
                  className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <h4 className="text-xl font-bold text-white">Second Timer</h4>
                  <p className="text-white/60 text-sm">Second attempt at admission</p>
                </button>
              </div>
              <button
                onClick={() => {
                  setStep(6);
                  setSelectedUniversity('');
                }}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
              >
                Back
              </button>
            </div>
          )}

          {step === 8 && selectedUniversity === 'jahangirnagar' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full mb-4">
                  <span className="text-indigo-300 font-semibold">Jahangirnagar University</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Select Your Unit
                </h3>
              </div>
              <div className="grid gap-4">
                <button
                  onClick={() => {
                    setSelectedUnit('JU-A');
                    setStep(10);
                  }}
                  className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <h4 className="text-xl font-bold text-white">JU-A Unit</h4>
                  <p className="text-white/60 text-sm">Science Unit A</p>
                </button>
                <button
                  onClick={() => {
                    setSelectedUnit('JU-D');
                    setStep(10);
                  }}
                  className="p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <h4 className="text-xl font-bold text-white">JU-D Unit</h4>
                  <p className="text-white/60 text-sm">Science Unit D</p>
                </button>
              </div>
              <button
                onClick={() => {
                  setStep(6);
                  setSelectedUniversity('');
                }}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
              >
                Back
              </button>
            </div>
          )}

          {step === 10 && selectedUniversity && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${universities.find(u => u.key === selectedUniversity)?.gradient} bg-opacity-20 border border-white/30 rounded-full mb-4`}>
                  <span className="text-white font-semibold">{getUniversityDisplayName()}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Enter Your Academic Credentials
                </h3>
                
                {/* Second-time candidates notification - only for non-Dhaka universities */}
                {selectedUniversity !== 'dhaka' && (
                  <div className="mt-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-3">
                      <Info className="w-5 h-5 text-blue-400" />
                      <p className="text-white/90 font-medium">Second-time candidates are available</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    SSC GPA (out of 5.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="5"
                    value={sscGPA}
                    onChange={(e) => setSscGPA(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g., 5.00"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    HSC GPA (out of 5.00)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="5"
                    value={hscGPA}
                    onChange={(e) => setHscGPA(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g., 5.00"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    if (selectedUniversity === 'dhaka') {
                      setStep(7);
                    } else if (selectedUniversity === 'jahangirnagar') {
                      setStep(8);
                    } else {
                      setStep(6);
                    }
                    setSscGPA('');
                    setHscGPA('');
                    setShowResultBox(false);
                  }}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (selectedUniversity === 'dhaka') {
                      checkDhakaUniversityEligibility();
                    } else if (selectedUniversity === 'jahangirnagar') {
                      checkJahangirnagerEligibility();
                    } else if (selectedUniversity === 'chittagong') {
                      checkChittagongEligibility();
                    } else if (selectedUniversity === 'rajshahi') {
                      checkRajshahiEligibility();
                    } else if (selectedUniversity === 'agri') {
                      checkAgriClusterEligibility();
                    } else if (selectedUniversity === 'gst') {
                      checkGSTEligibility();
                    }
                  }}
                  disabled={!hscGPA || !sscGPA}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Check Eligibility
                </button>
              </div>

              {showResultBox && (
                <div className="mt-6 animate-fade-in">
                  {/* University Header */}
                  <div className="bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-4">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-white/70 mb-2">Eligibility Assessment</h4>
                      <h3 className="text-2xl font-bold text-white">{getUniversityDisplayName()}</h3>
                      {selectedUnit && (
                        <p className="text-white/60 text-sm mt-1">{selectedUnit}</p>
                      )}
                    </div>

                    {/* GPA Display */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">SSC GPA</p>
                        <p className="text-white text-2xl font-bold">{parseFloat(sscGPA).toFixed(2)}</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <p className="text-white/60 text-xs mb-1">HSC GPA</p>
                        <p className="text-white text-2xl font-bold">{parseFloat(hscGPA).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/60 text-xs mb-1">Combined GPA</p>
                      <p className="text-white text-2xl font-bold">{(parseFloat(sscGPA) + parseFloat(hscGPA)).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Eligibility Status */}
                  <div className={`p-6 rounded-2xl border-2 ${eligibilityStatus === 'eligible' ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-center justify-center gap-3 mb-3">
                      {eligibilityStatus === 'eligible' ? (
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-red-400" />
                      )}
                      <h4 className={`text-xl font-bold ${eligibilityStatus === 'eligible' ? 'text-green-400' : 'text-red-400'}`}>
                        {eligibilityStatus === 'eligible' ? 'Eligible' : 'Not Eligible'}
                      </h4>
                    </div>
                    <p className="text-white/90 text-center">
                      {resultMessage}
                    </p>

                    {/* Additional Info for specific universities */}
                    {eligibilityStatus === 'eligible' && (selectedUniversity === 'rajshahi' || selectedUniversity === 'gst') && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-white/70 text-sm text-center italic">
                          Note: GPA does not affect the final admission test result
                        </p>
                      </div>
                    )}
                    
                    {eligibilityStatus === 'eligible' && selectedUniversity === 'dhaka' && attemptType === 'first' && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-white/70 text-sm text-center italic">
                          You are eligible to apply for Dhaka University Science Unit admission
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {eligibilityStatus === 'eligible' && (
                    <div className="mt-6 space-y-3">
                      {(selectedUniversity === 'jahangirnagar' || selectedUniversity === 'chittagong') && (
                        <button
                          onClick={() => {
                            setShowResultBox(false);
                            setStep(11);
                          }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <ChevronRight className="w-5 h-5" />
                          View Full Result Analysis
                        </button>
                      )}
                      
                      {selectedUniversity === 'agri' && (
                        <button
                          onClick={() => {
                            setShowResultBox(false);
                            setStep(12);
                          }}
                          className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <ChevronRight className="w-5 h-5" />
                          Calculate GPA Contribution
                        </button>
                      )}
                      
                      <button
                        onClick={resetCalculator}
                        className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                      >
                        Calculate Again
                      </button>
                    </div>
                  )}

                  {eligibilityStatus === 'not-eligible' && (
                    <button
                      onClick={resetCalculator}
                      className="w-full mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 11 && (selectedUniversity === 'jahangirnagar' || selectedUniversity === 'chittagong') && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${universities.find(u => u.key === selectedUniversity)?.gradient} bg-opacity-20 border border-white/30 rounded-full mb-4`}>
                  <span className="text-white font-semibold">{getUniversityDisplayName()}</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Expected MCQ Performance
                </h3>
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-2">
                  Expected MCQ Marks (out of {selectedUniversity === 'jahangirnagar' ? '80' : '100'})
                </label>
                <input
                  type="number"
                  step="0.01"
                  max={selectedUniversity === 'jahangirnagar' ? '80' : '100'}
                  value={mcqMarks}
                  onChange={(e) => setMcqMarks(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder={selectedUniversity === 'jahangirnagar' ? 'e.g., 70' : 'e.g., 85'}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setStep(10);
                    setShowResultBox(true);
                    setMcqMarks('');
                  }}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (selectedUniversity === 'jahangirnagar') {
                      calculateJahangirnagerResult();
                    } else {
                      calculateChittagongResult();
                    }
                  }}
                  disabled={!mcqMarks}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/70 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Calculate Result
                </button>
              </div>

              {showResultBox && (
                <div className="mt-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-2 border-emerald-500/30 rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <h4 className="text-white/70 text-sm mb-2">Final Assessment</h4>
                      <h3 className="text-2xl font-bold text-white mb-4">{getUniversityDisplayName()}</h3>
                      
                      <div className="bg-white/10 rounded-xl p-6 mb-4">
                        <p className="text-white/60 text-sm mb-2">Expected Total Score</p>
                        <p className="text-5xl font-bold text-white mb-1">
                          {resultMessage.match(/[\d.]+/)?.[0] || '0.00'}
                        </p>
                        <p className="text-white/60 text-sm">
                          out of {selectedUniversity === 'jahangirnagar' ? '100' : '110'}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-white/60 mb-1">MCQ</p>
                          <p className="text-white font-bold">{parseFloat(mcqMarks).toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-white/60 mb-1">SSC</p>
                          <p className="text-white font-bold">{parseFloat(sscGPA).toFixed(2)}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                          <p className="text-white/60 mb-1">HSC</p>
                          <p className="text-white font-bold">{parseFloat(hscGPA).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="w-full mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                  >
                    Calculate Again
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 12 && selectedUniversity === 'agri' && (
            <div className="space-y-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-600 to-green-800 bg-opacity-20 border border-white/30 rounded-full mb-4">
                  <span className="text-white font-semibold">Agricultural University Cluster</span>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Enter Your Total Marks
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    SSC Total Marks (out of 1050)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="1050"
                    value={sscMarks}
                    onChange={(e) => setSscMarks(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g., 950"
                  />
                </div>

                <div>
                  <label className="block text-white/80 font-medium mb-2">
                    HSC Total Marks (out of 1100)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    max="1100"
                    value={hscMarks}
                    onChange={(e) => setHscMarks(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="e.g., 1000"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setStep(10);
                    setShowResultBox(true);
                    setSscMarks('');
                    setHscMarks('');
                  }}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                >
                  Back
                </button>
                <button
                  onClick={calculateAgriClusterResult}
                  disabled={!sscMarks || !hscMarks}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-full font-semibold shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/70 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Calculate Contribution
                </button>
              </div>

              {showResultBox && (
                <div className="mt-6 animate-fade-in">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-700/20 border-2 border-emerald-500/30 rounded-2xl p-8">
                    <div className="text-center mb-6">
                      <h4 className="text-white/70 text-sm mb-2">GPA Contribution Analysis</h4>
                      <h3 className="text-2xl font-bold text-white mb-4">Agricultural University Cluster</h3>
                      
                      <div className="bg-white/10 rounded-xl p-6 mb-4">
                        <p className="text-white/60 text-sm mb-2">Your GPA Contribution</p>
                        <p className="text-5xl font-bold text-white mb-1">
                          {resultMessage.match(/[\d.]+/)?.[0] || '0.00'}
                        </p>
                        <p className="text-white/60 text-sm">out of 50 marks</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-white/60 mb-1">SSC Marks</p>
                          <p className="text-white font-bold">{parseFloat(sscMarks).toFixed(0)}</p>
                          <p className="text-white/50 text-xs mt-1">out of 1050</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <p className="text-white/60 mb-1">HSC Marks</p>
                          <p className="text-white font-bold">{parseFloat(hscMarks).toFixed(0)}</p>
                          <p className="text-white/50 text-xs mt-1">out of 1100</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="w-full mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all duration-300 border border-white/20"
                  >
                    Calculate Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center mt-6 text-white/40 text-sm">
          <p>All rights reserved to Suffering from Software © 2025</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default GPACalculator;