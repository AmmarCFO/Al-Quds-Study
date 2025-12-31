
import React, { useState } from 'react';
import { SCENARIOS } from './constants';
import { Scenario } from './types';
import Header_ar from './components/Header_ar';
import { Section } from './components/DashboardComponents';
import { FadeInUp } from './components/AnimatedWrappers';
import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon, UploadIcon, LinkIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `${Math.round(value).toLocaleString('ar-SA')} ريال`;
};

type CaseType = 'worst' | 'base' | 'best';

// --- Apple-Style Segmented Control (RTL Optimized) ---
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
        <div className={`p-1 sm:p-1.5 rounded-full flex relative w-full sm:w-auto overflow-hidden ${containerClass} ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                const activePillClass = option.activePillClassName || defaultActivePillClass;
                const activeTextClass = option.activeTextClassName || defaultActiveTextClass;

                return (
                    <button
                        key={option.value}
                        onClick={() => !disabled && onChange(option.value)}
                        className={`relative z-10 flex-1 px-3 sm:px-6 py-2.5 sm:py-2 text-[13px] sm:text-sm font-bold transition-colors duration-200 rounded-full font-cairo whitespace-nowrap ${
                            isActive ? activeTextClass : (option.className || defaultInactiveTextClass)
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`pill-ar-${name}`}
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
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5 block text-right">الإيرادات السنوية</span>
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">{formatCurrency(revenue)}</span>
                </div>
                <div className="text-left">
                    <span className="text-[10px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">إجمالي الإيرادات</span>
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
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_8px_32px_rgba(16,185,129,0.15)] text-right"
                            >
                                <div className="absolute top-0 left-0 p-4 opacity-20">
                                    <div className="w-16 h-16 bg-emerald-400 rounded-full blur-2xl"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                             <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_8px_currentColor] text-emerald-400`}></div>
                                             <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">{percent}٪</span>
                                    </div>
                                    
                                    <div className="flex items-baseline justify-end gap-2 mt-1">
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
                                    <span className="text-xs font-medium text-white/90 tracking-wide">{item.category}</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-white tabular-nums">{formatCurrency(item.amount)}</span>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const App_ar: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
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
  
  // Mgmt Fee
  const effectiveMabaat = Math.round(effectiveRevenue * mabaatPercentage);
  
  // Net Income
  const effectiveNetIncome = effectiveRevenue - effectiveMabaat;
  
  const translateScenarioName = (id: string) => {
      switch(id) {
          case 'study_a': return 'دراسة أ: سكن تنفيذي';
          case 'study_b': return 'دراسة ب: عقد شركات';
          default: return id;
      }
  };

  const translateScenarioDesc = (id: string) => {
    switch(id) {
        case 'study_a': return 'نموذج الشقق المفروشة (سكن تنفيذي) لـ ١٨ استوديو فندقي. تطبق رسوم الإدارة القياسية مع عقود مرنة.';
        case 'study_b': return 'تأجير المبنى بالكامل لمستأجر واحد (١٨ استوديو). لا توجد مخاطر شغور (إشغال ١٠٠٪) ولا تطبق رسوم إدارة.';
        default: return '';
    }
  };
  
  const translateUnitLabel = (id: string) => {
      if (id === 'study_b') return 'مبنى كامل';
      return 'وحدة';
  };
  
  const translateUnitName = (name: string) => {
      if (name === 'Hotel Grade Studio') return 'استوديو فندقي';
      if (name === 'Studio (Corporate Rate)') return 'استوديو (سعر الشركات)';
      return name;
  };

  const translateDuration = (label: string) => {
      if (label === 'Single Contract') return 'عقد موحد';
      return 'عقود مرنة';
  };

  const caseOptions = [
      { value: 'worst', label: 'متحفظ' },
      { value: 'base', label: 'واقعي' },
      { value: 'best', label: 'متفائل' },
  ];

  const occupancyOptions = [
      { 
          value: 0.7, 
          label: '٧٠٪', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { 
          value: 0.8, 
          label: '٨٠٪', 
          className: 'text-emerald-400 hover:text-emerald-300',
          activePillClassName: 'bg-emerald-500 shadow-sm ring-1 ring-emerald-600',
          activeTextClassName: 'text-white'
      },
      { value: 0.9, label: '٩٠٪' },
      { value: 1.0, label: '١٠٠٪' },
  ];

  const feeOptions = [
      { value: 0.15, label: '١٥٪' },
      { value: 0.25, label: '٢٥٪' },
  ];
  
  // Build ledger items dynamically
  const ledgerItems: { category: string; amount: number; color?: string; highlight?: boolean }[] = [];
  
  if (!isStudyB) {
      ledgerItems.push({ category: `رسوم الإدارة (${Math.round(mabaatPercentage * 100)}٪)`, amount: effectiveMabaat, color: 'bg-purple-400' });
  } else {
      ledgerItems.push({ category: 'رسوم الإدارة (معفاة)', amount: 0, color: 'bg-white/20' });
  }

  ledgerItems.push({ category: 'صافي الدخل (المالك)', amount: effectiveNetIncome, color: 'bg-emerald-400', highlight: true });

  const priceDivisor = isStudyB ? 1 : 12;
  const priceLabel = isStudyB ? '(سنوي)' : '(شهري)';

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-cairo overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white" dir="rtl">
      <Header_ar onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        
        <FadeInUp>
          <div className="text-center pt-8 pb-8 sm:pt-16 sm:pb-8">
             <div className="inline-block mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">دراسة جدوى عقارية</span>
            </div>
            <h1 className="text-4xl sm:text-7xl font-black text-[#1D1D1F] tracking-tighter mb-4 sm:mb-6 leading-[0.9]">
              القدس<span className="text-[#4A2C5A]">.</span>
            </h1>
            <p className="text-sm sm:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight px-4 mb-8">
                دراسة جدوى لمشروع <span className="text-[#2A5B64]">١٨ استوديو فندقي</span> تقارن بين نموذج السكن التنفيذي وتأجير الشركات.
            </p>

            {/* Comparison Buttons */}
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
                    <span>مجموعة المقارنة: سكن تنفيذي</span>
                </button>
                <button
                    onClick={() => window.open('https://docs.google.com/spreadsheets/d/1prpuTQOyzDHAT2QqKBGgW5Uavo_GsPCd9AjQEIrGmFk/edit?gid=977064680#gid=977064680', '_blank')}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-bold text-[#1D1D1F] hover:bg-[#F5F5F7] hover:border-gray-300 transition-all shadow-sm active:scale-95"
                >
                    <div className="w-6 h-6 rounded-full bg-[#8A6E99]/10 flex items-center justify-center text-[#8A6E99] group-hover:bg-[#8A6E99] group-hover:text-white transition-colors">
                        <LinkIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>مجموعة المقارنة: عقد شركات</span>
                </button>
            </motion.div>
          </div>
        </FadeInUp>

        {/* Section 2: Interactive Deep Dive */}
        <Section title="تحليل المحفظة" className="!mt-0 !pt-0" titleColor="text-[#1D1D1F]">
            
            <div className="bg-[#000000] text-white rounded-3xl sm:rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                <div className="bg-white/5 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6 flex flex-col gap-4 sticky top-0 z-20">
                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                            <div className="min-w-max flex items-center gap-2">
                                <SegmentedControl 
                                    name="cockpit-scenario"
                                    selected={activeScenarioId} 
                                    onChange={(val) => {
                                        setActiveScenarioId(val);
                                    }}
                                    dark={true}
                                    options={scenarios.map(s => ({ value: s.id, label: translateScenarioName(s.id) }))}
                                />
                            </div>
                         </div>

                        {/* Sensitivity Selector */}
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

                    {/* Simulation Controls - Row */}
                    <AnimatePresence>
                        {!isStudyB && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="w-full overflow-x-auto pb-1 sm:pb-0 hide-scrollbar border-t border-white/5 pt-3 overflow-hidden"
                            >
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-w-max mx-auto">
                                    {/* Occupancy */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">معدل الإشغال</span>
                                        <SegmentedControl 
                                            name="cockpit-occupancy"
                                            selected={occupancyRate} 
                                            onChange={(val) => setOccupancyRate(val)}
                                            dark={true}
                                            options={occupancyOptions}
                                        />
                                    </div>
                                    <div className="hidden sm:block w-[1px] h-6 bg-white/10"></div>

                                    {/* Mgmt Fee */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">رسوم الإدارة</span>
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
                                    عقد شركات: إشغال ثابت ١٠٠٪ وإعفاء من رسوم الإدارة
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
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="p-4 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 text-right"
                    >
                        {/* RIGHT COLUMN (Financials) - Natural RTL First Column */}
                        <div className="lg:col-span-7 space-y-6">
                            
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                                    الإيرادات السنوية المتوقعة
                                </p>
                                <div className="flex items-baseline justify-start gap-4 sm:gap-6">
                                    <h2 className="text-3xl sm:text-7xl font-black tracking-tighter text-white tabular-nums">
                                        {formatCurrency(effectiveRevenue)}
                                    </h2>
                                </div>
                                <div className="inline-flex items-center justify-start gap-2 mt-4 px-2 py-1 rounded bg-white/10 border border-white/5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-white/70 tracking-wide uppercase">
                                        {translateDuration(activeScenario.occupancyDurationLabel)}
                                        {` (إشغال ${Math.round(effectiveOccupancy * 100).toLocaleString('ar-SA')}٪)`}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 flex items-center justify-start gap-3 text-white">
                                    <div className="p-1.5 bg-white/10 rounded-lg">
                                        <BanknotesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                                    </div>
                                    التحليل المالي
                                </h4>
                                <DigitalLedger 
                                    revenue={effectiveRevenue} 
                                    items={ledgerItems} 
                                />
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-base sm:text-lg font-bold mb-6 text-white/90">إجمالي {activeScenario.unitCount} {translateUnitLabel(activeScenario.id)}</h4>
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
                                                        <p className="font-bold text-white text-sm">{translateUnitName(unit.name)}</p>
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <span className="block text-lg font-bold text-white">{unit.count}</span>
                                                    <span className="text-[9px] text-white/40 uppercase tracking-wider">{translateUnitLabel(activeScenario.id)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* LEFT COLUMN (Context) */}
                        <div className="lg:col-span-5 space-y-6">
                            
                             <div className="bg-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[1.5rem] border border-white/10">
                                 <h4 className="text-white font-bold text-base sm:text-lg mb-2">سياق الدراسة</h4>
                                 <p className="text-sm text-white/60 leading-relaxed font-light mb-6">
                                     {translateScenarioDesc(activeScenario.id)}
                                 </p>

                                 <div className="border-t border-white/10 pt-6">
                                    <h5 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                        ملاحظات تقييم السوق
                                    </h5>
                                    <div className="text-sm text-white/60 leading-relaxed font-light space-y-3">
                                        <p>
                                            قمنا بمراجعة الشقق المماثلة في منطقة القدس، ولاحظنا أن تلك الشقق كانت أقل بكثير من معايير شققنا من حيث الموقع، والقرب من المعالم الجذابة، والمساحة، والجودة.
                                        </p>
                                        <p>
                                            لذلك قمنا بإعادة تقييم الدراسة وتسعير الوحدات بناءً على تميز موقع مبنانا، وجودته العالية، ومساحاته الرحبة، وقربه من الخدمات والمعالم.
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
         <p className="text-sm font-semibold text-[#1D1D1F]/30 uppercase tracking-widest font-cairo">
            دراسة من إعداد مثوى لإدارة الأملاك®
         </p>
      </footer>
    </div>
  );
};

export default App_ar;
