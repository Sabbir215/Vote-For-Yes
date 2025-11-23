'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { volunteerFormSchema, type VolunteerFormData } from '@/lib/validations/volunteer';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const TOTAL_STEPS = 4;

export function VolunteerForm() {
  const t = useTranslations('volunteer');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      facebookUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      volunteerTypes: [],
      hasOrganization: false,
      organization: '',
    },
  });

  const volunteerTypeOptions = [
    { id: 'field', label: t('types.field') },
    { id: 'social', label: t('types.social') },
    { id: 'content', label: t('types.content') },
    { id: 'translation', label: t('types.translation') },
    { id: 'event', label: t('types.event') },
    { id: 'any', label: t('types.any') },
  ];

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();

      const { error } = await supabase.from('volunteer_submissions').insert({
        full_name: data.fullName,
        mobile: data.mobile,
        email: data.email || null,
        facebook_url: data.facebookUrl || null,
        twitter_url: data.twitterUrl || null,
        instagram_url: data.instagramUrl || null,
        volunteer_types: data.volunteerTypes,
        organization: data.hasOrganization ? data.organization : null,
        status: 'pending',
      });

      if (error) throw error;

      toast.success(t('success.title'), {
        description: t('success.message'),
      });

      router.push('/volunteer/success');
    } catch (error) {
      console.error('Volunteer submission error:', error);
      toast.error(t('errors.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof VolunteerFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['fullName', 'mobile', 'email'];
        break;
      case 2:
        fieldsToValidate = ['facebookUrl', 'twitterUrl', 'instagramUrl'];
        break;
      case 3:
        fieldsToValidate = ['volunteerTypes'];
        break;
      case 4:
        fieldsToValidate = ['hasOrganization', 'organization'];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('fullName')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('fullNamePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('mobile')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('mobilePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('facebook')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('facebookPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('twitter')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('twitterPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('instagram')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('instagramPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="volunteerTypes"
              render={() => (
                <FormItem>
                  <FormLabel>{t('volunteerTypes')}</FormLabel>
                  <div className="space-y-3">
                    {volunteerTypeOptions.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="volunteerTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={type.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type.id])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== type.id)
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {type.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="hasOrganization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('hasOrganization')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === 'true')}
                      value={field.value ? 'true' : 'false'}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{t('yes')}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">{t('no')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('hasOrganization') && (
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('organizationName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('organizationPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return t('step1Title');
      case 2:
        return t('step2Title');
      case 3:
        return t('step3Title');
      case 4:
        return t('step4Title');
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            {t('step')} {currentStep} {t('of')} {TOTAL_STEPS}
          </span>
          <span className="text-sm text-muted-foreground">{getStepTitle()}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-600 to-red-600 h-2 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {t('previous')}
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button type="button" onClick={nextStep} disabled={isSubmitting} className="gap-2">
                {t('next')}
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 bg-gradient-to-r from-green-600 to-red-600"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    {t('submit')}
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
