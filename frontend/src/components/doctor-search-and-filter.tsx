"use client";

import type { Doctor } from '@/types';
import React, { useState, useMemo, useEffect } from 'react';
import { DoctorCard } from './doctor-card';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search, Stethoscope, X, CheckCircle2 } from 'lucide-react';

type Props = {
  searchQuery: string;
};

export function DoctorSearchAndFilter({ searchQuery }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [search, setSearch] = useState({ location: '', specialization: '' });
  const [filters, setFilters] = useState({
    gender: 'any',
    patientStories: 'any',
    experience: 'any',
    sortBy: 'relevance',
  });

  useEffect(() => {
    setIsMounted(true);

    async function fetchDoctors() {
      try {
        const res = await fetch('http://localhost:5000/api/doctors');
        const data = await res.json();
        setAllDoctors(data);

       const specs = Array.from(new Set(data.map((d: Doctor) => d.specialization))) as string[];
        setSpecializations(specs);

      } catch (err) {
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    let doctors = [...allDoctors];

    doctors = doctors.filter((doctor) => {
      const locationMatch = !search.location || doctor.location.toLowerCase().includes(search.location.toLowerCase());
      const specializationMatch =
        !search.specialization || search.specialization === 'All' || doctor.specialization.toLowerCase().includes(search.specialization.toLowerCase());
      const genderMatch = filters.gender === 'any' || doctor.gender.toLowerCase() === filters.gender;
      const storiesMatch = filters.patientStories === 'any' || doctor.hasPatientStories;
      const experienceMatch = filters.experience === 'any' || doctor.experience >= parseInt(filters.experience, 10);

      const urlSearchMatch =
        !searchQuery ||
        doctor.specialization.toLowerCase().includes(searchQuery)

        searchQuery = ''

      return locationMatch && specializationMatch && genderMatch && storiesMatch && experienceMatch && urlSearchMatch;
    });

    if (filters.sortBy === 'experience') {
      doctors.sort((a, b) => b.experience - a.experience);
    } else if (filters.sortBy === 'fee') {
      doctors.sort((a, b) => a.consultationFee - b.consultationFee);
    }

    return doctors;
  }, [allDoctors, search, filters,searchQuery]);

  if (!isMounted || loading) {
    return <div className="text-center py-10 text-muted-foreground">Loading doctors...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Location"
              className="pl-10 h-12"
              value={search.location}
              onChange={(e) => setSearch({ ...search, location: e.target.value })}
            />
          </div>
          <div className="relative w-full">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Specialization"
              className="pl-10 h-12"
              value={search.specialization}
              onChange={(e) => setSearch({ ...search, specialization: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-primary/90 p-3 rounded-md flex flex-wrap items-center gap-4">
        <Select value={filters.gender} onValueChange={(value) => setFilters(f => ({ ...f, gender: value }))}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white w-auto h-10">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Gender: Any</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.patientStories} onValueChange={(value) => setFilters(f => ({ ...f, patientStories: value }))}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white w-auto h-10">
            <SelectValue placeholder="Patient Stories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Patient Stories: Any</SelectItem>
            <SelectItem value="true">With Patient Stories</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.experience} onValueChange={(value) => setFilters(f => ({ ...f, experience: value }))}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white w-auto h-10">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Experience: Any</SelectItem>
            <SelectItem value="5">5+ Years</SelectItem>
            <SelectItem value="10">10+ Years</SelectItem>
            <SelectItem value="15">15+ Years</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-white/80 text-sm">Sort By</span>
          <Select value={filters.sortBy} onValueChange={(value) => setFilters(f => ({ ...f, sortBy: value }))}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white placeholder:text-white w-auto h-10">
              <SelectValue placeholder="Relevance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="experience">Experience</SelectItem>
              <SelectItem value="fee">Consultation Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{filteredDoctors.length} {search.specialization || 'doctor'}s {search.location ? `available in ${search.location}` : ''}</h2>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span>Book appointments with minimum wait-time & verified doctor details</span>
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="space-y-6">
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <Card className="col-span-full flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <X className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-headline font-semibold">No Doctors Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
