
"use client";

import type { RiskAssessmentInput, RiskAssessmentOutput } from '@/ai/flows/risk-assessment';
import { assessRisk } from '@/ai/flows/risk-assessment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from './loading-spinner';
import { AlertCircle } from 'lucide-react';

// Define the Zod schema directly in the component for clarity, matching the AI flow's input
const formSchema = z.object({
  age: z.coerce.number().min(1, "Age is required and must be positive."),
  radius_mean: z.coerce.number().min(0, "Mean radius must be non-negative."),
  texture_mean: z.coerce.number().min(0, "Mean texture must be non-negative."),
  perimeter_mean: z.coerce.number().min(0, "Mean perimeter must be non-negative."),
  area_mean: z.coerce.number().min(0, "Mean area must be non-negative."),
  smoothness_mean: z.coerce.number().min(0, "Mean smoothness must be non-negative."),
  compactness_mean: z.coerce.number().min(0, "Mean compactness must be non-negative."),
  concavity_mean: z.coerce.number().min(0, "Mean concavity must be non-negative."),
  concave_points_mean: z.coerce.number().min(0, "Mean concave points must be non-negative."),
  symmetry_mean: z.coerce.number().min(0, "Mean symmetry must be non-negative."),
  fractal_dimension_mean: z.coerce.number().min(0, "Mean fractal dimension must be non-negative."),
});

type FormValues = z.infer<typeof formSchema>;

const formFieldsConfig: { name: keyof FormValues; label: string; description: string; placeholder?: string }[] = [
  { name: 'age', label: 'Age', description: 'Patient\'s age in years.', placeholder: 'e.g., 55' },
  { name: 'radius_mean', label: 'Mean Radius', description: 'Mean of distances from center to points on the perimeter.', placeholder: 'e.g., 14.1' },
  { name: 'texture_mean', label: 'Mean Texture', description: 'Standard deviation of gray-scale values.', placeholder: 'e.g., 19.3' },
  { name: 'perimeter_mean', label: 'Mean Perimeter', description: 'Mean size of the core tumor.', placeholder: 'e.g., 91.3' },
  { name: 'area_mean', label: 'Mean Area', description: 'Mean area of the tumor.', placeholder: 'e.g., 650.1' },
  { name: 'smoothness_mean', label: 'Mean Smoothness', description: 'Mean of local variation in radius lengths.', placeholder: 'e.g., 0.09' },
  { name: 'compactness_mean', label: 'Mean Compactness', description: 'Mean of perimeter^2 / area - 1.0.', placeholder: 'e.g., 0.1' },
  { name: 'concavity_mean', label: 'Mean Concavity', description: 'Mean severity of concave portions of the contour.', placeholder: 'e.g., 0.08' },
  { name: 'concave_points_mean', label: 'Mean Concave Points', description: 'Mean number of concave portions of the contour.', placeholder: 'e.g., 0.04' },
  { name: 'symmetry_mean', label: 'Mean Symmetry', description: 'Mean symmetry of the tumor.', placeholder: 'e.g., 0.18' },
  { name: 'fractal_dimension_mean', label: 'Mean Fractal Dimension', description: 'Mean "coastline approximation" - 1.', placeholder: 'e.g., 0.06' },
];

interface RiskAssessmentFormProps {
  onAssessmentComplete: (data: RiskAssessmentOutput) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function RiskAssessmentForm({ onAssessmentComplete, setIsLoading, isLoading }: RiskAssessmentFormProps) {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Provide sensible defaults or leave empty for user input
      age: undefined,
      radius_mean: undefined,
      texture_mean: undefined,
      perimeter_mean: undefined,
      area_mean: undefined,
      smoothness_mean: undefined,
      compactness_mean: undefined,
      concavity_mean: undefined,
      concave_points_mean: undefined,
      symmetry_mean: undefined,
      fractal_dimension_mean: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await assessRisk(data as RiskAssessmentInput);
      onAssessmentComplete(result);
      toast({
        title: "Assessment Complete",
        description: "Risk assessment has been processed.",
        className: "bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]",
      });
    } catch (error) {
      console.error("Risk assessment error:", error);
      toast({
        variant: "destructive",
        title: "Assessment Failed",
        description: "An error occurred while assessing risk. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <AlertCircle className="h-7 w-7 text-accent" />
          Patient Data Input
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFieldsConfig.map((fieldConfig) => (
                <FormField
                  key={fieldConfig.name}
                  control={form.control}
                  name={fieldConfig.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">{fieldConfig.label}</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="any" 
                          placeholder={fieldConfig.placeholder || `Enter ${fieldConfig.label.toLowerCase()}`} 
                          {...field} 
                          className="bg-[hsl(var(--input))]"
                          />
                      </FormControl>
                      <FormDescription>{fieldConfig.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-accent text-accent-foreground hover:bg-[#5eead4] text-lg py-3 rounded-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size={20} className="mr-2" /> Assessing Risk...
                </>
              ) : (
                "Assess Risk"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

