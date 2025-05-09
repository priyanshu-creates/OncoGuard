import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Users, CalendarCheck2 } from 'lucide-react';

export function InformationSection() {
  return (
    <Card className="shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center gap-2">
          <Lightbulb className="h-7 w-7 text-accent" />
          Understanding Breast Cancer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="md:flex md:gap-6 items-start">
            <div className="md:w-full">
                <p className="text-muted-foreground mb-4">
                Breast cancer is a complex disease with various risk factors. Early detection significantly improves treatment outcomes. Understanding these factors and adhering to regular screening schedules are crucial steps in proactive health management.
                </p>
                
                <div className="space-y-4">
                <div>
                    <h3 className="font-semibold text-lg text-primary flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5 text-accent" />
                    Key Risk Factors
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                    <li><strong>Age:</strong> Risk increases with age, especially after 50.</li>
                    <li><strong>Family History:</strong> Genetic predisposition (e.g., BRCA1, BRCA2 mutations).</li>
                    <li><strong>Personal History:</strong> Previous breast cancer or certain non-cancerous breast diseases.</li>
                    <li><strong>Lifestyle:</strong> Factors like obesity, alcohol consumption, and lack of physical activity.</li>
                    <li><strong>Hormonal Factors:</strong> Early menstruation, late menopause, prolonged hormone replacement therapy.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-primary flex items-center gap-2 mb-1">
                    <CalendarCheck2 className="h-5 w-5 text-accent" />
                    Importance of Regular Check-ups
                    </h3>
                    <p className="text-muted-foreground text-sm">
                    Regular breast cancer screenings, such as mammograms, clinical breast exams, and self-exams, can help detect cancer at an early stage when it's most treatable. Discuss your personal risk factors and appropriate screening schedule with your healthcare provider.
                    </p>
                </div>
                </div>
            </div>
        </div>

        <div className="mt-6 p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-md">
            <p className="text-sm font-semibold text-destructive">Medical Disclaimer:</p>
            <p className="text-xs text-muted-foreground">
                The information provided here is for general knowledge and informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
