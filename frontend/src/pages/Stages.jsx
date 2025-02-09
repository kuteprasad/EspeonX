import { useState } from 'react';
import { 
  Swords, 
  Target, 
  Crown, 
  Star,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';

const stages = [
  {
    id: 1,
    name: "Rookie Arena",
    difficulty: "Beginner",
    reward: "100 XP",
    status: "unlocked",
    icon: <Target className="w-8 h-8 text-green-400" />,
    description: "Start your journey here. Learn the basics and earn your first rewards."
  },
  {
    id: 2,
    name: "Challenger's Path",
    difficulty: "Intermediate",
    reward: "250 XP",
    status: "unlocked",
    icon: <Swords className="w-8 h-8 text-blue-400" />,
    description: "Face stronger opponents and prove your worth."
  },
  {
    id: 3,
    name: "Elite Division",
    difficulty: "Advanced",
    reward: "500 XP",
    status: "locked",
    icon: <Crown className="w-8 h-8 text-purple-400" />,
    description: "Only the best make it here. High stakes, higher rewards."
  },
  {
    id: 4,
    name: "Legend's Arena",
    difficulty: "Expert",
    reward: "1000 XP",
    status: "locked",
    icon: <Star className="w-8 h-8 text-yellow-400" />,
    description: "The ultimate challenge awaits. Become a legend."
  }
];

const Stages = () => {
  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 p-6 ">
      <div className="max-w-7xl mx-auto mt-32">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {stages.map((stage) => (
            <div 
              key={stage.id}
              className={`
                relative overflow-hidden
                ${stage.status === 'locked' ? 'opacity-75' : 'hover:transform hover:scale-105'}
                transition-all duration-300
                rounded-lg bg-gray-800 p-6 shadow-xl
                border-2 ${stage.status === 'locked' ? 'border-red-500/30' : 'border-blue-500/30'}
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {stage.icon}
                  <h3 className="text-xl font-bold text-white">{stage.name}</h3>
                </div>
                {stage.status === 'locked' && (
                  <Lock className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div className="space-y-2">
                <p className="text-gray-400">{stage.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Difficulty:</span>
                  <span className="text-white">{stage.difficulty}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Reward:</span>
                  <span className="text-green-400">{stage.reward}</span>
                </div>
              </div>

              <Button 
                className={`
                  w-full mt-4
                  ${stage.status === 'locked' 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'}
                `}
                disabled={stage.status === 'locked'}
                onClick={() => setSelectedStage(stage)}
              >
                {stage.status === 'locked' ? 'Locked' : 'Enter Stage'}
              </Button>
            </div>
          ))}
        </div>

        {selectedStage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold text-white mb-4">
                Enter {selectedStage.name}
              </h2>
              <p className="text-gray-400 mb-6">
                Are you ready to begin this challenge?
              </p>
              <div className="flex space-x-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  onClick={() => {/* Handle stage entry */}}
                >
                  Start
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedStage(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stages;