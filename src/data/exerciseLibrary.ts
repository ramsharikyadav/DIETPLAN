import { LibraryExercise } from '../types';

export const EXERCISE_LIBRARY: LibraryExercise[] = [
  {
    name: 'Squats',
    category: 'Lower Body',
    description: 'A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Lower your hips as if sitting in a chair.',
      'Keep your chest up and back straight.',
      'Push through your heels to return to the starting position.'
    ],
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes']
  },
  {
    name: 'Push-ups',
    category: 'Upper Body',
    description: 'A classic bodyweight exercise for building chest, shoulder, and tricep strength.',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders.',
      'Lower your body until your chest nearly touches the floor.',
      'Keep your core engaged and body in a straight line.',
      'Push back up to the starting position.'
    ],
    muscleGroups: ['Chest', 'Shoulders', 'Triceps']
  },
  {
    name: 'Lunges',
    category: 'Lower Body',
    description: 'An effective exercise for improving leg strength and balance.',
    instructions: [
      'Step forward with one leg and lower your hips.',
      'Both knees should be bent at approximately a 90-degree angle.',
      'Keep your front knee directly above your ankle.',
      'Push back to the starting position and repeat on the other side.'
    ],
    muscleGroups: ['Quadriceps', 'Hamstrings', 'Glutes']
  },
  {
    name: 'Plank',
    category: 'Core',
    description: 'An isometric core exercise that builds stability and endurance.',
    instructions: [
      'Hold a push-up position or rest on your forearms.',
      'Keep your body in a straight line from head to heels.',
      'Engage your core and glutes.',
      'Hold the position for the specified duration.'
    ],
    muscleGroups: ['Core', 'Abs', 'Lower Back']
  },
  {
    name: 'Jumping Jacks',
    category: 'Cardio',
    description: 'A full-body cardiovascular exercise that increases heart rate and burns calories.',
    instructions: [
      'Stand with feet together and arms at your sides.',
      'Jump up while spreading your legs and swinging your arms above your head.',
      'Jump again to return to the starting position.'
    ],
    muscleGroups: ['Full Body', 'Heart']
  },
  {
    name: 'Burpees',
    category: 'Full Body',
    description: 'A high-intensity exercise that combines a squat, jump, and push-up.',
    instructions: [
      'Start in a standing position.',
      'Drop into a squat and place your hands on the floor.',
      'Kick your feet back into a plank position.',
      'Perform a push-up (optional).',
      'Jump your feet back to your hands and jump up into the air.'
    ],
    muscleGroups: ['Full Body', 'Heart', 'Legs', 'Chest']
  },
  {
    name: 'Mountain Climbers',
    category: 'Cardio/Core',
    description: 'A dynamic exercise that targets the core while providing a cardio boost.',
    instructions: [
      'Start in a plank position.',
      'Bring one knee toward your chest.',
      'Quickly switch legs, as if running in place while in a plank.'
    ],
    muscleGroups: ['Core', 'Heart', 'Shoulders']
  },
  {
    name: 'Glute Bridge',
    category: 'Lower Body',
    description: 'Targets the glutes and hamstrings while improving hip stability.',
    instructions: [
      'Lie on your back with knees bent and feet flat on the floor.',
      'Lift your hips toward the ceiling by squeezing your glutes.',
      'Hold for a second at the top.',
      'Lower back down slowly.'
    ],
    muscleGroups: ['Glutes', 'Hamstrings']
  },
  {
    name: 'Russian Twist',
    category: 'Core',
    description: 'Targets the obliques and improves rotational core strength.',
    instructions: [
      'Sit on the floor with knees bent and feet slightly lifted.',
      'Lean back slightly and hold your hands together.',
      'Twist your torso from side to side, touching the floor next to your hips.'
    ],
    muscleGroups: ['Obliques', 'Abs']
  },
  {
    name: 'Leg Raises',
    category: 'Core',
    description: 'Focuses on the lower abdominal muscles.',
    instructions: [
      'Lie flat on your back with legs straight.',
      'Slowly lift your legs toward the ceiling.',
      'Lower them back down without letting them touch the floor.'
    ],
    muscleGroups: ['Lower Abs', 'Hip Flexors']
  },
  {
    name: 'Cat-Cow',
    category: 'Mobility',
    description: 'A gentle spinal mobility exercise.',
    instructions: [
      'Start on all fours.',
      'Inhale and arch your back (Cow).',
      'Exhale and round your spine (Cat).'
    ],
    muscleGroups: ['Spine', 'Back']
  },
  {
    name: 'Child Pose',
    category: 'Mobility',
    description: 'A resting pose that stretches the back and hips.',
    instructions: [
      'Kneel on the floor and sit on your heels.',
      'Lean forward and rest your forehead on the floor.',
      'Extend your arms forward or rest them by your sides.'
    ],
    muscleGroups: ['Back', 'Hips']
  }
];
