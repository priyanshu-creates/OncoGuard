"use client";

import { useState } from 'react';
import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { RiskAssessmentForm } from '@/components/onco-guard/risk-assessment-form';
import { RiskVisualization } from '@/components/onco-guard/risk-visualization';
import { InformationSection } from '@/components/onco-guard/information-section';
import { Separator } from '@/components/ui/separator';

export default function OncoGuardPage() {
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAssessmentComplete = (data: RiskAssessmentOutput) => {
    setAssessmentResult(data);
  };

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary lg:text-5xl">
          Welcome to OncoGuard
        </h1>
        <p className="mt-3 text-xl text-muted-foreground sm:mt-4">
          AI-Powered Preliminary Breast Cancer Risk Assessment
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-3">
          <RiskAssessmentForm 
            onAssessmentComplete={handleAssessmentComplete} 
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          {isLoading && (
            <div className="flex justify-center items-center p-8 bg-card rounded-lg shadow-md">
              <p className="text-lg text-primary">Analyzing data, please wait...</p>
            </div>
          )}
          {assessmentResult && !isLoading && (
            <RiskVisualization data={assessmentResult} />
          )}
          {!assessmentResult && !isLoading && (
             <div className="p-8 bg-card rounded-lg shadow-md text-center">
                <p className="text-lg text-muted-foreground">
                    Your assessment results will appear here once you submit the patient data.
                </p>
             </div>
          )}
        </div>
      </div>
      
      <Separator className="my-12" />
      
      <InformationSection />
    </div>
  );
}
