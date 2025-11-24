import { Button } from "@/components/ui/button";
import { VolunteerForm } from "@/components/volunteer-form";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function VolunteerPage() {
  const t = useTranslations("volunteer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 dark:bg-green-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/20 dark:bg-red-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="mb-8 gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-green-600 dark:border-green-500 text-green-700 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-red-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                {t("title")}
              </span>
            </h1>
            <div className="h-1 bg-gradient-to-r from-green-600 to-red-600 rounded-full" />
          </div>
          <p className="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-12 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-green-500/10 dark:hover:shadow-green-500/20 transition-shadow duration-500">
          <VolunteerForm />
        </div>
      </div>
    </div>
  );
}
