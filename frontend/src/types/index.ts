export type Doctor = {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  location: string;
  experience: number;
  consultationFee: number;
  gender: 'Male' | 'Female';
  hasPatientStories: boolean;
  availability: string[];
};
