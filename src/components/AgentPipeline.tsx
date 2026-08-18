import { useState, useEffect } from 'react';
import { Eye, Brain, Network, Lightbulb, Sparkles } from 'lucide-react';

const steps = [
  { icon: Eye, label: 'Reel Interaction', color: 'text-blue-400', dot: 'bg-blue-500' },
  { icon: Brain, label: 'Content Understanding', color: 'text-violet-400', dot: 'bg-violet-500' },
  { icon: Network, label: 'Context Analysis', color: 'text-cyan-400', dot: 'bg-cyan-500' },
  { icon: Lightbulb, label: 'Interest Inference', color: 'text-amber-400', dot: 'bg-amber-500' },
  { icon: Sparkles, label: 'Recommendation Generation', color: 'text-emerald-400', dot: 'bg-emerald-500' },
];

export function AgentPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-semibold text-white">AI Agent Pipeline</h3>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Running
        </span>
      </div>

      <div className="space-y-0">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="relative flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'border-white/30 bg-white/10 shadow-lg shadow-blue-500/20'
                      : isPast
                        ? 'border-white/10 bg-white/5'
                        : 'border-white/5 bg-transparent'
                  }`}
                >
                  <Icon className={`h-4 w-4 transition-colors ${isActive ? step.color : 'text-gray-500'}`} />
                </div>
                {i < steps.length - 1 && (
                  <div className="relative my-1 h-6 w-px overflow-hidden bg-white/10">
                    <div
                      className={`absolute inset-x-0 top-0 h-full bg-gradient-to-b ${step.dot} to-transparent transition-all duration-500 ${
                        isPast || isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </div>
                )}
              </div>
              <span
                className={`text-sm transition-colors duration-300 ${
                  isActive ? 'font-medium text-white' : isPast ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
              {isActive && (
                <span className={`ml-auto h-1.5 w-1.5 rounded-full ${step.dot} animate-pulse`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
