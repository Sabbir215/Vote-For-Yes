import { z } from 'zod';

export const volunteerFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z
    .string()
    .regex(/^01[0-9]{9}$/, 'Invalid mobile number format (must be 11 digits starting with 01)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  facebookUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  twitterUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  instagramUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  volunteerTypes: z.array(z.string()).min(1, 'Select at least one volunteer type'),
  hasOrganization: z.boolean(),
  organization: z.string().optional(),
});

export type VolunteerFormData = z.infer<typeof volunteerFormSchema>;
