// risk-assessment.ts
'use server';
/**
 * @fileOverview AI-powered risk assessment for breast cancer malignancy.
 *
 * - assessRisk - A function that handles the risk assessment process.
 * - RiskAssessmentInput - The input type for the assessRisk function.
 * - RiskAssessmentOutput - The return type for the assessRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiskAssessmentInputSchema = z.object({
  age: z.number().describe('Age of the patient.'),
  radius_mean: z.number().describe('Mean radius of the tumor.'),
  texture_mean: z.number().describe('Mean texture of the tumor.'),
  perimeter_mean: z.number().describe('Mean perimeter of the tumor.'),
  area_mean: z.number().describe('Mean area of the tumor.'),
  smoothness_mean: z.number().describe('Mean smoothness of the tumor.'),
  compactness_mean: z.number().describe('Mean compactness of the tumor.'),
  concavity_mean: z.number().describe('Mean concavity of the tumor.'),
  concave_points_mean: z.number().describe('Mean concave points of the tumor.'),
  symmetry_mean: z.number().describe('Mean symmetry of the tumor.'),
  fractal_dimension_mean: z.number().describe('Mean fractal dimension of the tumor.'),
});

export type RiskAssessmentInput = z.infer<typeof RiskAssessmentInputSchema>;

const RiskAssessmentOutputSchema = z.object({
  prediction: z.enum(['benign', 'malignant']).describe('The predicted label (benign or malignant).'),
  probability: z.number().describe('The probability score of the prediction.'),
  advice: z.string().describe('A short advice/disclaimer message.'),
});

export type RiskAssessmentOutput = z.infer<typeof RiskAssessmentOutputSchema>;

export async function assessRisk(input: RiskAssessmentInput): Promise<RiskAssessmentOutput> {
  return assessRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riskAssessmentPrompt',
  input: {schema: RiskAssessmentInputSchema},
  output: {schema: RiskAssessmentOutputSchema},
  prompt: `You are an AI assistant specializing in predicting breast cancer malignancy based on patient data.

  Analyze the following patient data to predict the likelihood of malignancy. Provide a prediction label (benign or malignant), a probability score, and a short advice/disclaimer message.

  Data:
  - Age: {{{age}}}
  - Radius Mean: {{{radius_mean}}}
  - Texture Mean: {{{texture_mean}}}
  - Perimeter Mean: {{{perimeter_mean}}}
  - Area Mean: {{{area_mean}}}
  - Smoothness Mean: {{{smoothness_mean}}}
  - Compactness Mean: {{{compactness_mean}}}
  - Concavity Mean: {{{concavity_mean}}}
  - Concave Points Mean: {{{concave_points_mean}}}
  - Symmetry Mean: {{{symmetry_mean}}}
  - Fractal Dimension Mean: {{{fractal_dimension_mean}}}
  
  Output the results in JSON format.
`,
});

const assessRiskFlow = ai.defineFlow(
  {
    name: 'assessRiskFlow',
    inputSchema: RiskAssessmentInputSchema,
    outputSchema: RiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
