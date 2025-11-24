"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createClient } from "@/lib/supabase/client";
import {
  volunteerFormSchema,
  type VolunteerFormData,
} from "@/lib/validations/volunteer";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const TOTAL_STEPS = 4;

export function VolunteerForm() {
  const t = useTranslations("volunteer");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateError, setDuplicateError] = useState<string>("");

  // Check for duplicate mobile or email
  const checkForDuplicates = async (mobile: string, email: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return false;

      // Check for duplicate mobile
      if (mobile) {
        const { data: mobileExists } = await supabase
          .from("volunteer_submissions")
          .select("id")
          .eq("mobile", mobile)
          .limit(1);

        if (mobileExists && mobileExists.length > 0) {
          setDuplicateError(
            t("errors.duplicateMobile") ||
              "This phone number is already registered"
          );
          return false;
        }
      }

      // Check for duplicate email
      if (email) {
        const { data: emailExists } = await supabase
          .from("volunteer_submissions")
          .select("id")
          .eq("email", email)
          .limit(1);

        if (emailExists && emailExists.length > 0) {
          setDuplicateError(
            t("errors.duplicateEmail") || "This email is already registered"
          );
          return false;
        }
      }

      setDuplicateError("");
      return true;
    } catch (error) {
      console.error("Error checking duplicates:", error);
      return true; // Allow submission if check fails
    }
  };

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      facebookUrl: "",
      twitterUrl: "",
      instagramUrl: "",
      volunteerTypes: [],
      hasOrganization: false,
      organization: "",
    },
  });

  const volunteerTypeOptions = [
    { id: "field", label: t("types.field") },
    { id: "social", label: t("types.social") },
    { id: "content", label: t("types.content") },
    { id: "translation", label: t("types.translation") },
    { id: "event", label: t("types.event") },
    { id: "any", label: t("types.any") },
  ];

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      const supabase = createClient();

      // Check if Supabase is configured
      if (!supabase) {
        toast.error("Configuration Error", {
          description:
            "Database is not configured. Please contact the administrator.",
        });
        console.error(
          "Supabase is not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file"
        );
        return;
      }

      // Get current session, if none exists sign in as anonymous
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData?.session) {
        // Sign in anonymously
        const { error: authError } = await supabase.auth.signInAnonymously();
        if (authError) {
          console.error("Anonymous sign-in error:", authError);
          throw new Error("Failed to authenticate. Please try again.");
        }
      }

      const { data: insertData, error } = await supabase
        .from("volunteer_submissions")
        .insert({
          full_name: data.fullName,
          mobile: data.mobile,
          email: data.email || null,
          facebook_url: data.facebookUrl || null,
          twitter_url: data.twitterUrl || null,
          instagram_url: data.instagramUrl || null,
          volunteer_types: data.volunteerTypes,
          has_organization: data.hasOrganization,
          organization: data.hasOrganization ? data.organization : null,
          status: "pending",
        })
        .select();

      if (error) {
        console.error("Database error:", error);
        throw new Error(error.message || "Failed to submit form");
      }

      toast.success(t("success.title"), {
        description: t("success.message"),
      });

      // Reset form
      form.reset();

      router.push("/volunteer/success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Volunteer submission error:", errorMessage, error);

      toast.error(t("errors.submitError"), {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    let fieldsToValidate: (keyof VolunteerFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "mobile", "email"];
        break;
      case 2:
        fieldsToValidate = ["facebookUrl", "twitterUrl", "instagramUrl"];
        break;
      case 3:
        fieldsToValidate = ["volunteerTypes"];
        break;
      case 4:
        fieldsToValidate = ["hasOrganization", "organization"];
        break;
    }

    form.trigger(fieldsToValidate).then((isValid) => {
      if (!isValid) return;

      // Check for duplicates when leaving step 1
      if (currentStep === 1) {
        const mobile = form.getValues("mobile");
        const email = form.getValues("email");

        checkForDuplicates(mobile, email).then((noDuplicates) => {
          if (noDuplicates && currentStep < TOTAL_STEPS) {
            setCurrentStep(currentStep + 1);
          }
        });
      } else if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
      }
    });
  };

  const prevStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">{t("fullName")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("fullNamePlaceholder")}
                      {...field}
                      className="h-11"
                    />
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
                  <FormLabel className="text-base">{t("mobile")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("mobilePlaceholder")}
                      {...field}
                      className="h-11"
                    />
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
                  <FormLabel className="text-base">{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      {...field}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {duplicateError && (
              <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200 text-sm">
                {duplicateError}
              </div>
            )}
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
                  <FormLabel className="text-base">{t("facebook")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("facebookPlaceholder")}
                      {...field}
                      className="h-11"
                    />
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
                  <FormLabel className="text-base">{t("twitter")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("twitterPlaceholder")}
                      {...field}
                      className="h-11"
                    />
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
                  <FormLabel className="text-base">{t("instagram")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("instagramPlaceholder")}
                      {...field}
                      className="h-11"
                    />
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="volunteerTypes"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base font-bold mb-3">
                    {t("volunteerTypes")}
                  </FormLabel>
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
                                      ? field.onChange([
                                          ...field.value,
                                          type.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== type.id
                                          )
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="hasOrganization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-bold">
                    {t("hasOrganization")}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {t("yes")}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {t("no")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("hasOrganization") && (
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      {t("organizationName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("organizationPlaceholder")}
                        {...field}
                        className="h-11"
                      />
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
        return t("step1Title");
      case 2:
        return t("step2Title");
      case 3:
        return t("step3Title");
      case 4:
        return t("step4Title");
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Modern Progress Steps */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex-1 relative">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold text-sm md:text-base transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-gradient-to-br from-green-600 to-red-600 text-white shadow-lg scale-110"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                  animate={{
                    scale: currentStep === step ? [1, 1.1, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </motion.div>
                <span className="text-xs mt-2 font-medium text-gray-600 dark:text-gray-400 hidden md:block">
                  Step {step}
                </span>
              </div>
              {step < 4 && (
                <div className="absolute top-5 md:top-6 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-600 to-red-600"
                    initial={{ width: "0%" }}
                    animate={{ width: currentStep > step ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {getStepTitle()}
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {currentStep} / {TOTAL_STEPS}
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={(e) => prevStep(e)}
              disabled={currentStep === 1 || isSubmitting}
              className="gap-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              {t("previous")}
            </Button>

            {currentStep < TOTAL_STEPS ? (
              <Button
                type="button"
                size="lg"
                onClick={(e) => nextStep(e)}
                disabled={isSubmitting}
                className="gap-2 bg-gradient-to-r from-green-600 to-red-600 text-white hover:from-green-700 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {t("next")}
                <ChevronRight className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="gap-2 bg-gradient-to-r from-green-600 to-red-600 text-white hover:from-green-700 hover:to-red-700 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {t("submit")}
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
