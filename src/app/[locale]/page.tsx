import Navigation from '@/components/sections/navigation';
import HeroSection from '@/components/sections/hero';
import HowItWorksSection from '@/components/sections/how-it-works';
import TestimonialsSection from '@/components/sections/testimonials';
import WhatCanYouDo from '@/components/sections/what-can-you-do';
import TestimonialAnkit from '@/components/sections/testimonial-ankit';
import RecurringCampaigns from '@/components/sections/recurring-campaigns';
import TemplatesSection from '@/components/sections/templates';
import CtaFinal from '@/components/sections/cta-final';
import Footer from '@/components/sections/footer';
import StatsSection from '@/components/sections/stats';

export default function HomeLocalePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <TestimonialAnkit />
      <WhatCanYouDo />
      <TestimonialsSection />
      <RecurringCampaigns />
      <TemplatesSection />
      <CtaFinal />
      <Footer />
    </main>
  );
}
