import type { RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, ShieldAlert, ShieldCheck, MessageSquareText } from 'lucide-react';

interface RiskVisualizationProps {
  data: RiskAssessmentOutput;
}

function getRiskLevel(prediction: 'benign' | 'malignant', probability: number): { level: string; colorClass: string; Icon: React.ElementType } {
  if (prediction === 'malignant') {
    if (probability >= 0.66) return { level: 'High Risk', colorClass: 'bg-destructive text-destructive-foreground', Icon: ShieldAlert };
    if (probability >= 0.33) return { level: 'Medium Risk', colorClass: 'bg-yellow-500 text-white', Icon: ShieldAlert };
    return { level: 'Moderate Risk (Malignant Indicated)', colorClass: 'bg-yellow-400 text-black', Icon: ShieldAlert };
  } else { // benign
    if (probability >= 0.66) return { level: 'Low Risk', colorClass: 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]', Icon: ShieldCheck };
    if (probability >= 0.33) return { level: 'Low to Moderate Risk (Benign Indicated)', colorClass: 'bg-green-400 text-white', Icon: ShieldCheck };
    return { level: 'Moderate Risk (Uncertain Benign)', colorClass: 'bg-yellow-400 text-black', Icon: ShieldAlert };
  }
}


export function RiskVisualization({ data }: RiskVisualizationProps) {
  const { prediction, probability, advice } = data;
  const { level, colorClass, Icon } = getRiskLevel(prediction, probability);

  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-accent" />
          Risk Assessment Results
        </CardTitle>
        <CardDescription>
          Based on the provided data, here is the preliminary risk assessment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center p-6 rounded-lg bg-card-foreground/5">
            <Icon className={`h-16 w-16 mb-4 ${prediction === 'malignant' ? 'text-destructive' : 'text-[hsl(var(--success))]' }`} />
            <p className="text-3xl font-bold">
                 Prediction: <span className={prediction === 'malignant' ? 'text-destructive' : 'text-[hsl(var(--success))]'}>{prediction.charAt(0).toUpperCase() + prediction.slice(1)}</span>
            </p>
             <Badge className={`mt-2 text-lg px-4 py-1.5 ${colorClass}`}>{level}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
          <div className="p-4 rounded-lg bg-card-foreground/5">
            <p className="text-sm text-muted-foreground">Probability Score</p>
            <p className="text-2xl font-semibold text-primary">{(probability * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">
              Confidence in the "{prediction}" prediction.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-card-foreground/5">
             <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-start"><MessageSquareText size={16}/> AI Generated Advice</p>
            <p className="text-md text-primary mt-1">{advice}</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 border-l-4 border-accent bg-accent/10 rounded-r-md">
          <p className="text-sm font-semibold text-accent-foreground">Important Note:</p>
          <p className="text-xs text-muted-foreground">
            This tool provides a preliminary assessment based on AI analysis. It is crucial to consult with a healthcare professional for a comprehensive evaluation and diagnosis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
