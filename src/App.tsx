/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  Timer, 
  Activity, 
  ChevronRight, 
  CheckCircle2, 
  Flame, 
  Heart, 
  Zap,
  RotateCcw,
  Loader2,
  Info,
  Calendar,
  Utensils,
  Briefcase,
  Target,
  LayoutDashboard,
  Coffee,
  Sun,
  Moon,
  Footprints,
  Droplets,
  Apple,
  Bell,
  X,
  Clock
} from 'lucide-react';
import { generateWorkout, WorkoutPlan } from './services/workoutService';
import { USER_WEEKLY_PLAN, WEEKLY_TARGETS, OFFICE_RULES } from './constants';
import { Exercise, LibraryExercise } from './types';
import { PostureAnimation } from './components/PostureAnimation';
import { EXERCISE_LIBRARY } from './data/exerciseLibrary';
import { Search, Filter, BookOpen } from 'lucide-react';

type Tab = 'dashboard' | 'weekly' | 'diet' | 'ai-generator' | 'library';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'workout' | 'office' | 'diet' | 'walk';
  time: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [currentDay, setCurrentDay] = useState<string>('');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [officeTimer, setOfficeTimer] = useState<number>(45 * 60); // 45 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Library State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // AI Generator State
  const [level, setLevel] = useState('Beginner');
  const [goal, setGoal] = useState('Cardiovascular Health');
  const [equipment, setEquipment] = useState<string[]>(['Treadmill', 'Dumbbells']);
  const [duration, setDuration] = useState(45);
  const [aiPlan, setAiPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    setCurrentDay(days[new Date().getDay()]);

    // Initial Welcome Notification
    addNotification({
      title: "Welcome back!",
      message: `It's ${days[new Date().getDay()]}. Ready for your ${USER_WEEKLY_PLAN.workouts[days[new Date().getDay()]]?.category} session?`,
      type: 'workout'
    });
  }, []);

  // Office Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && officeTimer > 0) {
      interval = setInterval(() => {
        setOfficeTimer((prev) => prev - 1);
      }, 1000);
    } else if (officeTimer === 0) {
      addNotification({
        title: "Office Break Time!",
        message: "You've been sitting for 45 minutes. Stand up, stretch, or do 15 squats!",
        type: 'office'
      });
      setIsTimerRunning(false);
      setOfficeTimer(45 * 60); // Reset
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, officeTimer]);

  const addNotification = ({ title, message, type }: Omit<Notification, 'id' | 'time'>) => {
    const id = Math.random().toString(36).substring(7);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setNotifications(prev => [{ id, title, message, type, time }, ...prev].slice(0, 3));
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 8000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const todayWorkout = useMemo(() => USER_WEEKLY_PLAN.workouts[currentDay], [currentDay]);
  const todayDiet = useMemo(() => USER_WEEKLY_PLAN.diet[currentDay], [currentDay]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const newPlan = await generateWorkout({ level, goal, equipment, duration });
      setAiPlan(newPlan);
    } catch (err) {
      setError('Failed to generate workout. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-zinc-900 font-sans selection:bg-emerald-100 pb-20 lg:pb-0">
      {/* Notifications Overlay */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-zinc-100 p-4 w-80 flex gap-4 items-start relative overflow-hidden"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                n.type === 'workout' ? 'bg-emerald-100 text-emerald-600' :
                n.type === 'office' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {n.type === 'workout' ? <Dumbbell className="w-5 h-5" /> :
                 n.type === 'office' ? <Briefcase className="w-5 h-5" /> :
                 <Utensils className="w-5 h-5" />}
              </div>
              <div className="flex-1 pr-4">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-black text-zinc-900">{n.title}</h4>
                  <span className="text-[10px] font-bold text-zinc-400">{n.time}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{n.message}</p>
              </div>
              <button 
                onClick={() => removeNotification(n.id)}
                className="absolute top-2 right-2 p-1 text-zinc-300 hover:text-zinc-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1 bg-zinc-100"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <nav className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-zinc-200 hidden lg:flex flex-col p-6 z-20">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <Activity className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tight">FitFlow AI</h1>
        </div>

        <div className="space-y-1 flex-1">
          <NavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard />} label="Dashboard" />
          <NavButton active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')} icon={<Calendar />} label="Weekly Plan" />
          <NavButton active={activeTab === 'diet'} onClick={() => setActiveTab('diet')} icon={<Utensils />} label="Diet Plan" />
          <NavButton active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon={<BookOpen />} label="Exercise Library" />
          <div className="pt-4 pb-2">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-4">AI Tools</span>
          </div>
          <NavButton active={activeTab === 'ai-generator'} onClick={() => setActiveTab('ai-generator')} icon={<Zap />} label="AI Generator" />
        </div>

        <div className="mt-auto p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-zinc-500 uppercase">Current Day</span>
          </div>
          <p className="text-lg font-black text-zinc-900">{currentDay}</p>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-around p-3 lg:hidden z-30">
        <MobileNavButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard />} />
        <MobileNavButton active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')} icon={<Calendar />} />
        <MobileNavButton active={activeTab === 'diet'} onClick={() => setActiveTab('diet')} icon={<Utensils />} />
        <MobileNavButton active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon={<BookOpen />} />
        <MobileNavButton active={activeTab === 'ai-generator'} onClick={() => setActiveTab('ai-generator')} icon={<Zap />} />
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-64 p-4 lg:p-10 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-zinc-900">Good Morning!</h2>
                  <p className="text-zinc-500">Here's your focus for <span className="text-emerald-600 font-bold">{currentDay}</span>.</p>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-zinc-400" />
                    <span className="text-sm font-bold">8,420 steps</span>
                  </div>
                  <div className="px-4 py-2 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-bold">6/10 glasses</span>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Today's Workout */}
                <div className="lg:col-span-8 space-y-6">
                  <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <Dumbbell className="text-emerald-600 w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-zinc-900">Today's Workout</h3>
                          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{todayWorkout?.category}</p>
                        </div>
                      </div>
                      <button className="text-emerald-600 text-sm font-bold hover:underline">Start Session</button>
                    </div>
                    <div className="divide-y divide-zinc-50">
                      {todayWorkout?.exercises.map((ex, i) => (
                        <div key={i} className="p-5 flex items-center justify-between group hover:bg-zinc-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex-shrink-0 flex items-center justify-center text-zinc-400 overflow-hidden border border-zinc-200">
                              <PostureAnimation exerciseName={ex.name} />
                            </div>
                            <div>
                              <p className="font-bold text-zinc-800">{ex.name}</p>
                              <p className="text-xs text-zinc-500">{ex.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-zinc-900">
                              {ex.sets ? `${ex.sets} × ${ex.reps}` : ex.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Office Rules & Timer */}
                  <section className="bg-zinc-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-3">
                          <Briefcase className="text-emerald-400 w-6 h-6" />
                          <h3 className="text-xl font-black">Office Hours Rule</h3>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                          <Clock className="w-4 h-4 text-emerald-400" />
                          <span className="text-lg font-mono font-bold">{formatTime(officeTimer)}</span>
                          <button 
                            onClick={() => setIsTimerRunning(!isTimerRunning)}
                            className={`px-4 py-1 rounded-lg text-xs font-bold transition-all ${
                              isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'
                            }`}
                          >
                            {isTimerRunning ? 'Stop' : 'Start Timer'}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {OFFICE_RULES.map((rule, i) => (
                          <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span className="text-sm font-medium text-zinc-300">{rule}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 flex items-center justify-between">
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Target: 6–8 times daily</p>
                        <button 
                          onClick={() => addNotification({
                            title: "Quick Reminder",
                            message: "Don't forget to drink water and walk for 2 mins!",
                            type: 'office'
                          })}
                          className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest flex items-center gap-1"
                        >
                          <Bell className="w-3 h-3" /> Test Notification
                        </button>
                      </div>
                    </div>
                    <Activity className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 rotate-12" />
                  </section>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Today's Diet */}
                  <section className="bg-white rounded-3xl border border-zinc-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Utensils className="text-orange-500 w-5 h-5" />
                      <h3 className="font-bold text-zinc-900">Today's Diet</h3>
                    </div>
                    <div className="space-y-4">
                      <DietItem icon={<Sun className="w-4 h-4 text-orange-400" />} label="Breakfast" value={todayDiet?.breakfast} />
                      <DietItem icon={<Apple className="w-4 h-4 text-red-400" />} label="Mid-Morning" value={todayDiet?.midMorning} />
                      <DietItem icon={<Coffee className="w-4 h-4 text-emerald-400" />} label="Lunch" value={todayDiet?.lunch} />
                      <DietItem icon={<Moon className="w-4 h-4 text-indigo-400" />} label="Dinner" value={todayDiet?.dinner} />
                    </div>
                  </section>

                  {/* Weekly Targets */}
                  <section className="bg-emerald-600 rounded-3xl p-6 text-white">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5" /> Weekly Targets
                    </h3>
                    <div className="space-y-4">
                      {WEEKLY_TARGETS.map(target => (
                        <div key={target.id} className="flex items-center justify-between">
                          <span className="text-sm text-emerald-100">{target.label}</span>
                          <span className="text-sm font-black">{target.goal} {target.unit}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'weekly' && (
            <motion.div 
              key="weekly"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">Weekly Schedule</h2>
                <p className="text-zinc-500">Your complete 7-day fitness roadmap.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(USER_WEEKLY_PLAN.workouts).map(([day, plan]) => (
                  <div key={day} className={`bg-white rounded-3xl border p-6 shadow-sm transition-all hover:shadow-md ${day === currentDay ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-zinc-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-black text-zinc-900">{day}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${day === currentDay ? 'bg-emerald-600 text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                        {plan.category}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {plan.exercises.map((ex, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-600">{ex.name}</span>
                          <span className="font-bold text-zinc-400">{ex.sets ? `${ex.sets}×${ex.reps}` : ex.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'diet' && (
            <motion.div 
              key="diet"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">7-Day Diet Plan</h2>
                <p className="text-zinc-500">Simple Indian nutrition for optimal health.</p>
              </header>

              <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-7 divide-x divide-zinc-100">
                  {Object.entries(USER_WEEKLY_PLAN.diet).map(([day, diet]) => (
                    <div key={day} className={`p-6 space-y-6 ${day === currentDay ? 'bg-emerald-50/30' : ''}`}>
                      <h3 className={`text-sm font-black uppercase tracking-widest text-center pb-4 border-b ${day === currentDay ? 'text-emerald-600 border-emerald-100' : 'text-zinc-400 border-zinc-100'}`}>
                        {day.slice(0, 3)}
                      </h3>
                      <div className="space-y-4">
                        <DietDaySection label="Breakfast" value={diet.breakfast} />
                        <DietDaySection label="Lunch" value={diet.lunch} />
                        <DietDaySection label="Dinner" value={diet.dinner} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 rounded-3xl p-8 text-white">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
                    <Info className="w-5 h-5" /> Pro Tips
                  </h4>
                  <ul className="space-y-3 text-sm text-zinc-400">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Avoid cold drinks with meals</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Avoid rice at night (Mon–Fri)</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10–15 min walk after dinner is powerful</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Drink 8–10 glasses of water daily</li>
                  </ul>
                </div>
                <div className="bg-white rounded-3xl p-8 border border-zinc-200">
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-orange-500">
                    <Coffee className="w-5 h-5" /> Snacks
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Mid-Morning (11-12 PM)</p>
                      <p className="text-sm font-medium">1 Fruit (Apple / Banana / Papaya)</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Evening (5-6 PM)</p>
                      <p className="text-sm font-medium">Green Tea + Roasted Chana / Peanuts</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ai-generator' && (
            <motion.div 
              key="ai-generator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <header>
                <h2 className="text-3xl font-black tracking-tight text-zinc-900">Custom AI Workout</h2>
                <p className="text-zinc-500">Need something different? Let Gemini craft a custom session.</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-4 space-y-6">
                  <section className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-200">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Fitness Level</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                            <button key={l} onClick={() => setLevel(l)} className={`py-2 px-1 text-xs rounded-lg border transition-all ${level === l ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold' : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>{l}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Primary Goal</label>
                        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2.5 text-sm bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 outline-none">
                          {['Cardiovascular Health', 'Muscle Gain', 'Weight Loss', 'Flexibility'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <button onClick={handleGenerate} disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-2 mt-4">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                        Generate Workout
                      </button>
                    </div>
                  </section>
                </aside>

                <div className="lg:col-span-8">
                  {aiPlan ? (
                    <div className="space-y-6">
                      <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-sm">
                        <h3 className="text-2xl font-black mb-2">{aiPlan.title}</h3>
                        <p className="text-zinc-500 italic">"{aiPlan.summary}"</p>
                      </div>
                      {/* Render AI Plan Sections (Simplified for space) */}
                      <WorkoutSection title="Full Routine" icon={<Activity />} exercises={[...aiPlan.warmup, ...aiPlan.cardio, ...aiPlan.strength, ...aiPlan.cooldown]} color="emerald" />
                    </div>
                  ) : (
                    <div className="bg-white rounded-3xl p-12 border border-dashed border-zinc-300 flex flex-col items-center justify-center text-center min-h-[400px]">
                      <Zap className="text-zinc-200 w-16 h-16 mb-4" />
                      <p className="text-zinc-500">Your AI-generated workout will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div 
              key="library"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-zinc-900">Exercise Library</h2>
                  <p className="text-zinc-500">Explore detailed instructions and posture guides.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="Search exercises..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="pl-10 pr-8 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm appearance-none cursor-pointer"
                    >
                      {['All', 'Upper Body', 'Lower Body', 'Core', 'Cardio', 'Full Body', 'Mobility'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-1 gap-6">
                {EXERCISE_LIBRARY
                  .filter(ex => {
                    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        ex.description.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesCategory = selectedCategory === 'All' || ex.category.includes(selectedCategory);
                    return matchesSearch && matchesCategory;
                  })
                  .map((ex, i) => (
                    <div key={i} className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
                      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-48 h-48 bg-zinc-50 rounded-2xl flex-shrink-0 flex items-center justify-center text-zinc-400 overflow-hidden border border-zinc-100">
                          <PostureAnimation exerciseName={ex.name} />
                        </div>
                        <div className="flex-1 space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-xl font-black text-zinc-900">{ex.name}</h3>
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-md border border-emerald-100">
                                  {ex.category}
                                </span>
                              </div>
                              <p className="text-zinc-500 text-sm leading-relaxed">{ex.description}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Instructions
                              </h4>
                              <ul className="space-y-2">
                                {ex.instructions?.map((step, idx) => (
                                  <li key={idx} className="text-sm text-zinc-600 flex gap-3">
                                    <span className="text-zinc-300 font-mono text-[10px] mt-1">{idx + 1}</span>
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Activity className="w-3 h-3 text-blue-500" /> Muscle Groups
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {ex.muscleGroups?.map(muscle => (
                                  <span key={muscle} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold rounded-full">
                                    {muscle}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active 
          ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
          : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
      }`}
    >
      <span className={active ? 'text-emerald-600' : 'text-zinc-400'}>{icon}</span>
      {label}
    </button>
  );
}

function MobileNavButton({ active, onClick, icon }: { active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all ${active ? 'bg-emerald-50 text-emerald-600' : 'text-zinc-400'}`}
    >
      {icon}
    </button>
  );
}

function DietItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-zinc-50 transition-colors">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-bold text-zinc-800 leading-tight">{value || 'Not specified'}</p>
      </div>
    </div>
  );
}

function DietDaySection({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-xs font-medium text-zinc-800 leading-tight">{value}</p>
    </div>
  );
}

function WorkoutSection({ title, icon, exercises, color }: { 
  title: string, 
  icon: React.ReactNode, 
  exercises: any[],
  color: string
}) {
  return (
    <section className="bg-white rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
      <div className={`px-6 py-4 border-b flex items-center gap-3 bg-zinc-50`}>
        {icon}
        <h3 className="font-bold uppercase tracking-wider text-sm">{title}</h3>
      </div>
      <div className="divide-y divide-zinc-100">
        {exercises.map((ex, idx) => (
          <div key={idx} className="p-6 hover:bg-zinc-50 transition-colors group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-zinc-100 rounded-xl flex-shrink-0 flex items-center justify-center text-zinc-400 overflow-hidden border border-zinc-200">
                  <PostureAnimation exerciseName={ex.name} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                    <span className="text-zinc-300 font-mono text-xs">0{idx + 1}</span>
                    {ex.name}
                  </h4>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                    {ex.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {ex.duration && (
                  <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600 uppercase flex items-center gap-1">
                    <Timer className="w-3 h-3" /> {ex.duration}
                  </span>
                )}
                {ex.sets && (
                  <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600 uppercase">
                    {ex.sets} Sets × {ex.reps}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
