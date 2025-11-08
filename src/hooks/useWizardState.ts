/**
 * Wizard State Hook
 * Manages multi-step wizard navigation and state
 */

import { useState, useCallback } from 'react';

interface WizardStep {
  id: string;
  title: string;
  optional?: boolean;
}

export function useWizardState(steps: WizardStep[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const goToNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, steps.length]);

  const goToPrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  }, []);

  const isStepComplete = useCallback((step: number) => {
    return completedSteps.has(step);
  }, [completedSteps]);

  const canGoNext = useCallback(() => {
    return currentStep < steps.length - 1;
  }, [currentStep, steps.length]);

  const canGoPrevious = useCallback(() => {
    return currentStep > 0;
  }, [currentStep]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return {
    currentStep,
    currentStepData: steps[currentStep],
    steps,
    goToNext,
    goToPrevious,
    goToStep,
    markStepComplete,
    isStepComplete,
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),
    isFirstStep,
    isLastStep,
    progress,
    totalSteps: steps.length,
  };
}

