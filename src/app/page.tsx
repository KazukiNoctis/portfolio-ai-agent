import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ChatInterface from "@/components/ChatInterface";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";
import { createClient } from "@supabase/supabase-js";

// Revalidate this page every hour (or set to 0 for dynamic)
export const revalidate = 3600;

export default async function Home() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  let profile = null;
  let skills = [];
  let projects = [];

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Fetch profile
    const { data: profileData } = await supabase
      .from("portfolio_profile")
      .select("*")
      .limit(1)
      .single();
      
    if (profileData) {
      profile = profileData;
    }

    // Fetch skills
    const { data: skillsData } = await supabase
      .from("portfolio_skills")
      .select("*")
      .order("display_order", { ascending: true });
      
    if (skillsData && skillsData.length > 0) {
      skills = skillsData;
    }

    // Fetch projects
    const { data: projectsData } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (projectsData && projectsData.length > 0) {
      projects = projectsData;
    }
  }

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main className="flex-1">
        <HeroSection 
          name={profile?.name}
          roles={profile?.roles}
          heroDescription={profile?.hero_description}
          profilePictureUrl={profile?.profile_picture_url}
        />
        <AboutSection 
          aboutDescription={profile?.about_description}
          skills={skills.length > 0 ? skills : undefined}
        />
        <PortfolioSection 
          projects={projects.length > 0 ? projects : undefined}
        />
        <ChatInterface />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
