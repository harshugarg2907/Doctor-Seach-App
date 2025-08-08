"use client";

import type { Doctor } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctor.name} has been confirmed.`,
    });
  };

  return (
    <Card className="flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 md:p-6 flex flex-col items-center justify-start text-center md:w-1/4">
        <Avatar className="h-24 w-24 border-4 border-white ring-2 ring-primary/20">
          <AvatarImage src={doctor.avatar} alt={doctor.name} data-ai-hint="doctor portrait" />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      <div className="p-4 md:p-6 flex-1">
        <h2 className="text-lg font-bold text-primary">{doctor.name}</h2>
        <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
        <p className="text-sm text-muted-foreground">{doctor.experience} years experience overall</p>
        <p className="text-sm font-semibold mt-2">{doctor.location}</p>
        <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">${doctor.consultationFee}</span> Consultation Fee</p>
        
        {doctor.hasPatientStories && (
            <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-green-100 w-fit">
                <ThumbsUp className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800 text-sm">97% (159 Patient Stories)</span>
            </div>
        )}
      </div>

      <div className="p-4 md:p-6 md:w-1/4 flex flex-col justify-between items-end">
          <div>
            <p className="text-sm font-semibold text-green-600">Available Today</p>
          </div>
          <div className="w-full mt-4">
              <Button onClick={handleBooking} className="w-full bg-primary hover:bg-primary/90">Book Clinic Visit</Button>
              <Button variant="outline" className="w-full mt-2">Contact Clinic</Button>
          </div>
      </div>
    </Card>
  );
}
