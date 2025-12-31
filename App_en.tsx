
import React, { useState } from 'react';
import { SCENARIOS, FURNISHING_COST_PER_UNIT } from './constants';
import { Scenario, UnitMixItem } from './types';
import Header from './components/Header';
import { Section } from './components/DashboardComponents';
import { FadeInUp } from './components/AnimatedWrappers';
import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon, LinkIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `SAR ${Math.round(value).toLocaleString('en-US')}`;
};

type CaseType = 'worst' | 'base' | 'best';

// --- Apple-Style Segmented Control (Universal White Pill) ---
const SegmentedControl: React.FC<{
    name: string;
    options: { value: string | number; label: string; className?: string; activePillClassName?: string; activeTextClassName?: string }[];
    selected: string | number;
    onChange: (value: any) => void;
    dark?: boolean;
    disabled?: boolean;
}> = ({ name, options, selected, onChange, dark = false, disabled = false }) => {
    
    const containerClass = dark ? 'bg-white/10' : 'bg-[#E5E5EA]';
    const defaultActivePillClass = 'bg-white shadow-sm ring-1 ring-black/5';
    const defaultActiveTextClass = 'text-black';
    const defaultInactiveTextClass = dark ? 'text-white/60 hover:text-white' : 'text-[#8E8E93] hover:text-black';

    return (
        <div className={`p-1 rounded-full flex relative w-full sm:w-auto overflow-hidden ${containerClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                const activePillClass = option.activePillClassName || defaultActivePillClass;
                const activeTextClass = option.activeTextClassName || defaultActiveTextClass;

                return (
                    <button
                        key={option.value}
                        onClick={() => !disabled && onChange(option.value)}
                        className={`relative z-10 flex-1 px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-sm font-bold transition-colors duration-200 rounded-full whitespace-nowrap ${
                            isActive ? activeTextClass : (option.className || defaultInactiveTextClass)
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`pill-${name}`}
                                className={`absolute inset-0 rounded-full ${activePillClass}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DigitalLedger: React.FC<{ 
    revenue: number; 
    items: { category: string; amount: number; color?: string; highlight?: boolean }[] 
}> = ({ revenue, items }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5 block">Total Annual Revenue</span>
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">{formatCurrency(revenue)}</span>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">Gross Potential</span>
                </div>
            </div>
            
            <div className="space-y-4">
                {items.map((item, idx) => {
                    const percent = revenue > 0 ? Math.round((item.amount / revenue) * 100) : 0;
                    
                    if (item.highlight) {
                         return (
                            <motion.div 
                                key={idx}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_8px_32px_rgba(16,185,129,0.15)]"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <div className="w-16 h-16 bg-emerald-400 rounded-full blur-2xl"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                             <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_8px_currentColor] text-emerald-400`}></div>
                                             <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">{percent}%</span>
                                    </div>
                                    
                                    <div className="flex items-baseline gap-2 mt-1">
                                        <span className="text-2xl sm:text-4xl font-black text-white tracking-tighter tabular-nums text-shadow-sm">{formatCurrency(item.amount)}</span>
                                    </div>

                                    {/* Progress Bar specific to highlight */}
                                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-4">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1.2, ease: "circOut" }}
                                            className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <div key={idx} className="group px-1 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-1.5">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ring-1 ring-white/10 ${item.color || 'bg-white'}`}></div>
                                    <span className="text-xs font-medium text-white/70 tracking-wide">{item.category}</span>
                                </div>
                                <div className="text-right">
                                    <span className="block text-sm font-bold text-white/90 tabular-nums">{formatCurrency(item.amount)}</span>
                                </div>
                            </div>
                            {/* Apple Health Style Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full ${item.color || 'bg-white'} opacity-60`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const App_en: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>(SCENARIOS);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [activeCase, setActiveCase] = useState<CaseType>('base');
  const [occupancyRate, setOccupancyRate] = useState<number>(1); // 1 = 100%
  const [managementFee, setManagementFee] = useState<number>(0.25);
  
  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
  const baseFinancials = activeScenario.financials[activeCase];

  // Specific Logic for Study B (Corporate Lease)
  const isStudyB = activeScenarioId === 'study_b';
  
  // For Study B, Occupancy is effectively 100% and Fee is 0%
  const effectiveOccupancy = isStudyB ? 1.0 : occupancyRate;
  const effectiveRevenue = Math.round(baseFinancials.revenue * effectiveOccupancy);
  const mabaatPercentage = isStudyB ? 0 : managementFee; 
  
  // Management Fee Calculation
  const effectiveMabaat = Math.round(effectiveRevenue * mabaatPercentage);
  
  // Net Income
  const effectiveNetIncome = effectiveRevenue - effectiveMabaat;
  
  // Investment Logic
  const totalFurnitureCost = activeScenario.unitCount * FURNISHING_COST_PER_UNIT;

  const caseOptions = [
      { value: 'worst', label: 'Conservative' },
      { value: 'base', label: 'Realistic' },
      { value: 'best', label: 'Optimistic' },
  ];

  const occupancyOptions = [
      { 
          value: 0.7, 
          label: '70%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { 
          value: 0.8, 
          label: '80%', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { value: 0.9, label: '90%' },
      { value: 1.0, label: '100%' },
  ];

  const feeOptions = [
      { value: 0.25, label: '25%' },
  ];

  // Build ledger items dynamically
  const ledgerItems: { category: string; amount: number; color?: string; highlight?: boolean }[] = [];
  
  if (!isStudyB) {
      ledgerItems.push({ category: `Management Fee (${Math.round(mabaatPercentage * 100)}%)`, amount: effectiveMabaat, color: 'bg-purple-400' });
  } else {
      ledgerItems.push({ category: 'Management Fee (Waived)', amount: 0, color: 'bg-white/20' });
  }
  
  ledgerItems.push({ category: 'Net Income (Owner)', amount: effectiveNetIncome, color: 'bg-emerald-400', highlight: true });

  // Dynamic Labeling for Unit Mix
  // Study A is typically monthly pricing, Study B is Annual
  const priceDivisor = isStudyB ? 1 : 12; 
  const priceLabel = isStudyB ? '(Annual)' : '(Monthly)';

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white">
      <Header onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        
        {/* Project Header */}
        <FadeInUp>
          <div className="text-center pt-8 pb-8 sm:pt-16 sm:pb-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block mb-3 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm"
            >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500">Property Feasibility Study</span>
            </motion.div>
            <h1 className="text-3xl sm:text-6xl font-black text-[#1D1D1F] tracking-tighter mb-4 leading-none">
              Al Quds<span className="text-[#8A6E99]">.</span>
            </h1>
            <p className="text-sm sm:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight px-4 mb-8">
                Feasibility study for <span className="text-[#2A5B64]">18 Hotel Grade Studio Apartments</span> comparing Executive Living model vs Corporate Lease.
            </p>

            {/* Comparison Set Buttons */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
            >
                <button
                    onClick={() => window.open('https://docs.google.com/spreadsheets/d/1prpuTQOyzDHAT2QqKBGgW5Uavo_GsPCd9AjQEIrGmFk/edit?gid=0#gid=0', '_blank')}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#1D1D1F] hover:bg-[#F5F5F7] hover:border-gray-300 transition-all shadow-sm active:scale-95"
                >
                    <div className="w-6 h-6 rounded-full bg-[#2A5B64]/10 flex items-center justify-center text-[#2A5B64] group-hover:bg-[#2A5B64] group-hover:text-white transition-colors">
                        <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>Comp Set: Executive Living</span>
                </button>
                <button
                    onClick={() => window.open('https://docs.google.com/spreadsheets/d/1prpuTQOyzDHAT2QqKBGgW5Uavo_GsPCd9AjQEIrGmFk/edit?gid=977064680#gid=977064680', '_blank')}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#1D1D1F] hover:bg-[#F5F5F7] hover:border-gray-300 transition-all shadow-sm active:scale-95"
                >
                    <div className="w-6 h-6 rounded-full bg-[#8A6E99]/10 flex items-center justify-center text-[#8A6E99] group-hover:bg-[#8A6E99] group-hover:text-white transition-colors">
                        <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>Comp Set: Corporate Lease</span>
                </button>
            </motion.div>
          </div>
        </FadeInUp>

        {/* SECTION 2: INTERACTIVE DEEP DIVE (Dark Mode) */}
        <Section title="Portfolio Analysis" className="!mt-0 !pt-0" titleColor="text-[#1D1D1F]">
            
            {/* The Cockpit */}
            <div className="bg-[#000000] text-white rounded-3xl sm:rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                {/* Noise Texture */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                {/* Control Bar - Mobile Optimized */}
                <div className="bg-white/5 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6 flex flex-col gap-4 sticky top-0 z-20">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                         {/* Study Selector */}
                         <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                            <div className="min-w-max flex items-center gap-2">
                                <SegmentedControl 
                                    name="cockpit-scenario"
                                    selected={activeScenarioId} 
                                    onChange={(val) => {
                                        setActiveScenarioId(val);
                                    }}
                                    dark={true}
                                    options={scenarios.map(s => ({ value: s.id, label: s.name }))}
                                />
                            </div>
                         </div>

                        {/* Sensitivity Selector (Synced) */}
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                            <div className="min-w-max">
                                <SegmentedControl 
                                    name="cockpit-case"
                                    selected={activeCase} 
                                    onChange={(val) => setActiveCase(val)}
                                    dark={true}
                                    options={caseOptions}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Simulator Controls Row - Only show for Study A */}
                    <AnimatePresence>
                        {!isStudyB && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="w-full overflow-x-auto pb-1 sm:pb-0 hide-scrollbar border-t border-white/5 pt-3 overflow-hidden"
                            >
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-w-max mx-auto">
                                    {/* Occupancy Rate */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Occupancy</span>
                                        <SegmentedControl 
                                            name="cockpit-occupancy"
                                            selected={occupancyRate} 
                                            onChange={(val) => setOccupancyRate(val)}
                                            dark={true}
                                            options={occupancyOptions}
                                        />
                                    </div>
                                    <div className="hidden sm:block w-[1px] h-6 bg-white/10"></div>

                                    {/* Mabaat Share */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Mgmt Fee</span>
                                        <SegmentedControl 
                                            name="cockpit-fee"
                                            selected={managementFee} 
                                            onChange={(val) => setManagementFee(val)}
                                            dark={true}
                                            options={feeOptions}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {isStudyB && (
                             <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="w-full border-t border-white/5 pt-3 text-center"
                             >
                                 <span className="text-xs font-medium text-white/50 bg-white/5 px-3 py-1 rounded-full">
                                    Corporate Lease: Fixed 100% Occupancy & 0% Management Fee
                                 </span>
                             </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeScenario.id}-${activeCase}-${occupancyRate}-${managementFee}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className="p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
                    >
                        {/* LEFT COLUMN: The Engine */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            {/* Hero Revenue */}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                                    Projected Annual Revenue
                                </p>
                                <div className="flex items-baseline gap-4">
                                    <h2 className="text-3xl sm:text-6xl font-black tracking-tighter text-white tabular-nums">
                                        {formatCurrency(effectiveRevenue)}
                                    </h2>
                                </div>
                                <div className="inline-flex items-center gap-2 mt-3 px-2 py-1 rounded bg-white/10 border border-white/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-white/70 tracking-wide uppercase">
                                        {activeScenario.occupancyDurationLabel}
                                        {` (${Math.round(effectiveOccupancy * 100)}% Occupancy)`}
                                    </span>
                                </div>
                            </div>

                            {/* Digital Ledger */}
                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-white">
                                    <div className="p-1.5 bg-white/10 rounded-md">
                                        <BanknotesIcon className="w-4 h-4 text-white/90" />
                                    </div>
                                    Financial Distribution
                                </h4>
                                <DigitalLedger 
                                    revenue={effectiveRevenue} 
                                    items={ledgerItems} 
                                />
                            </div>

                            {/* Unit Mix */}
                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-sm font-bold mb-4 text-white/90">{activeScenario.unitCount} Total Units</h4>
                                <div className="space-y-4">
                                    {activeScenario.unitMix.map((unit, idx) => (
                                        <div key={idx} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                                            {/* Header Row */}
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
                                                        {unit.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{unit.name}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-lg font-bold text-white">{unit.count}</span>
                                                    <span className="text-[9px] text-white/40 uppercase tracking-wider">{activeScenario.unitLabel}</span>
                                                </div>
                                            </div>

                                            {/* Pricing Breakdown */}
                                            {unit.priceRange && (
                                                <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-lg p-2.5">
                                                    <div className="text-center border-r border-white/10">
                                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">
                                                            Min {priceLabel}
                                                        </p>
                                                        <p className="text-xs font-bold text-white tabular-nums">
                                                            {Math.round(unit.priceRange.min / priceDivisor).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-center border-r border-white/10">
                                                        <p className="text-[9px] text-emerald-400/60 uppercase tracking-widest mb-0.5 font-bold">
                                                            Avg {priceLabel}
                                                        </p>
                                                        <p className="text-sm font-black text-emerald-400 tabular-nums">
                                                            {Math.round(unit.priceRange.avg / priceDivisor).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">
                                                            Max {priceLabel}
                                                        </p>
                                                        <p className="text-xs font-bold text-white tabular-nums">
                                                            {Math.round(unit.priceRange.max / priceDivisor).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Context & Investment Logic */}
                        <div className="lg:col-span-5 space-y-6">
                            
                             {/* Investment Logic Card (Highlight for Study A) */}
                             {!isStudyB && (
                                 <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative bg-gradient-to-br from-[#2A5B64]/30 to-[#2A5B64]/5 p-6 sm:p-8 rounded-2xl sm:rounded-[1.5rem] border border-[#2A5B64]/30 overflow-hidden"
                                 >
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <div className="w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
                                    </div>

                                    <h4 className="text-white font-bold text-lg mb-1 relative z-10">Furnishing Investment</h4>
                                    <p className="text-xs text-white/60 mb-6 relative z-10 uppercase tracking-wider">Executive Living Requirements</p>
                                    
                                    <div className="space-y-4 relative z-10">
                                        <div className="flex justify-between items-center border-b border-white/10 pb-3">
                                            <span className="text-sm text-white/70">Cost Per Studio</span>
                                            <div className="text-right">
                                                <span className="block text-lg font-bold text-white tabular-nums">{formatCurrency(FURNISHING_COST_PER_UNIT)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-sm text-white/70">Total Investment <span className="text-[10px] text-white/40 block">(18 Units)</span></span>
                                            <div className="text-right">
                                                <span className="block text-2xl font-bold text-white tabular-nums">{formatCurrency(totalFurnitureCost)}</span>
                                            </div>
                                        </div>
                                    </div>
                                 </motion.div>
                             )}

                             {/* Strategy Text */}
                             <div className="bg-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[1.5rem] border border-white/10">
                                 <h4 className="text-white font-bold text-base sm:text-lg mb-2">Study Context</h4>
                                 <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                                     {activeScenario.description}
                                 </p>

                                 <div className="border-t border-white/10 pt-6">
                                    <h5 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        Market Valuation Notes
                                    </h5>
                                    <div className="text-sm text-white/60 leading-relaxed font-light space-y-3">
                                        <p>
                                            We looked at the comparable apartments in Al Quds. We noticed that the apartments were way below the standards of our apartments in terms of location, nearby attractions, size, and quality.
                                        </p>
                                        <p>
                                            Therefore we reevaluated the study based on our building's premium location, superior quality, unit sizes, and proximity to key attractions.
                                        </p>
                                    </div>
                                 </div>
                             </div>

                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
            
        </Section>

      </main>

      <footer className="py-12 text-center pb-20 sm:pb-12">
         <p className="text-sm font-semibold text-[#1D1D1F]/30 uppercase tracking-widest">
            Study by Mathwaa Property Management®
         </p>
      </footer>
    </div>
  );
};

export default App_en;
