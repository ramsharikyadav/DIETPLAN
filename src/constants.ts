import { WeeklyPlan, Target } from './types';

export const USER_WEEKLY_PLAN: WeeklyPlan = {
  workouts: {
    Monday: {
      category: 'Lower Body',
      exercises: [
        { name: 'Jumping Jacks', description: 'Warm-up cardio', duration: '2 min' },
        { name: 'Squats', description: 'Basic squat', sets: 3, reps: '15' },
        { name: 'Lunges', description: 'Alternating legs', sets: 3, reps: '10 each leg' },
        { name: 'Glute Bridge', description: 'Floor exercise', sets: 3, reps: '15' },
        { name: 'Plank', description: 'Core stability', sets: 3, duration: '30 sec' },
      ]
    },
    Tuesday: {
      category: 'Upper Body',
      exercises: [
        { name: 'Arm Circles', description: 'Warm-up', duration: '2 min' },
        { name: 'Push-ups', description: 'Standard push-ups', sets: 3, reps: '10' },
        { name: 'Wall Push-ups', description: 'Inclined push-ups', sets: 2, reps: '15' },
        { name: 'Chair Dips', description: 'Tricep focus', sets: 3, reps: '10' },
        { name: 'Shoulder Tap', description: 'Plank variation', sets: 3, reps: '20' },
      ]
    },
    Wednesday: {
      category: 'Core',
      exercises: [
        { name: 'High Knees', description: 'Cardio warm-up', duration: '2 min' },
        { name: 'Sit-ups', description: 'Abdominal focus', sets: 3, reps: '15' },
        { name: 'Russian Twist', description: 'Oblique focus', sets: 3, reps: '20' },
        { name: 'Leg Raises', description: 'Lower ab focus', sets: 3, reps: '12' },
        { name: 'Plank', description: 'Core stability', sets: 3, duration: '40 sec' },
      ]
    },
    Thursday: {
      category: 'Full Body',
      exercises: [
        { name: 'Skipping', description: 'Cardio warm-up', duration: '3 min' },
        { name: 'Squats', description: 'Compound movement', sets: 3, reps: '15' },
        { name: 'Push-ups', description: 'Upper body focus', sets: 3, reps: '10' },
        { name: 'Mountain Climbers', description: 'Core and cardio', sets: 3, reps: '20' },
        { name: 'Plank', description: 'Core stability', sets: 3, duration: '30 sec' },
      ]
    },
    Friday: {
      category: 'Fat Burn',
      exercises: [
        { name: 'Fast Spot Jogging', description: 'High intensity warm-up', duration: '3 min' },
        { name: 'Burpees', description: 'Full body explosive', sets: 3, reps: '10' },
        { name: 'Jump Squats', description: 'Power movement', sets: 3, reps: '12' },
        { name: 'Stair Climbing', description: 'Steady state cardio', duration: '5 min' },
        { name: 'Bicycle Crunch', description: 'Core focus', sets: 3, reps: '20' },
      ]
    },
    Saturday: {
      category: 'Mobility',
      exercises: [
        { name: 'Neck Rotation', description: 'Gentle movement', duration: '1 min' },
        { name: 'Shoulder Stretch', description: 'Hold each side', duration: '2 min' },
        { name: 'Cat-Cow', description: 'Spinal mobility', duration: '2 min' },
        { name: 'Hamstring Stretch', description: 'Hold each leg', duration: '2 min' },
        { name: 'Child Pose', description: 'Relaxation', duration: '2 min' },
      ]
    },
    Sunday: {
      category: 'Active Rest',
      exercises: [
        { name: 'Evening Walk', description: 'Walk after dinner', duration: '30–40 min' },
      ]
    }
  },
  diet: {
    Monday: { breakfast: 'Poha + 5 almonds', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Tuesday: { breakfast: '2 Boiled eggs + Toast', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Wednesday: { breakfast: 'Oats', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Thursday: { breakfast: 'Upma', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Friday: { breakfast: 'Paneer Sandwich', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Saturday: { breakfast: 'Sprouts', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
    Sunday: { breakfast: 'Paratha + Curd', midMorning: '1 Fruit', lunch: '2 Roti, Dal/Paneer, Salad, Curd', evening: 'Green Tea, Roasted Chana', dinner: '2 Roti + Sabzi' },
  }
};

export const WEEKLY_TARGETS: Target[] = [
  { id: 'workouts', label: 'Workout Days', goal: '5', unit: 'days' },
  { id: 'steps', label: 'Daily Steps', goal: '7000-9000', unit: 'steps' },
  { id: 'fruit', label: 'Fruit Intake', goal: '1', unit: 'fruit' },
  { id: 'water', label: 'Water Intake', goal: '8-10', unit: 'glasses' },
  { id: 'walk', label: 'Post-Dinner Walk', goal: '15', unit: 'min' },
];

export const OFFICE_RULES = [
  'Stand up every 45 minutes',
  'Walk for 2–3 minutes',
  '15 squats OR stretch',
  'Repeat 6–8 times daily'
];
