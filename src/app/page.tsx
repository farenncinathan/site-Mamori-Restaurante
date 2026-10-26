import CursorGlow from "@/components/CursorGlow";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandIntro from "@/components/BrandIntro";
import FoodGallery from "@/components/FoodGallery";
import SpaceSection from "@/components/SpaceSection";
import StorySection from "@/components/StorySection";
import ReviewsLink from "@/components/ReviewsLink";
import VisitSection from "@/components/VisitSection";
import Footer from "@/components/Footer";
import MobileContactBar from "@/components/MobileContactBar";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <BrandIntro />
        <StorySection />
        <FoodGallery />
        <SpaceSection />
        <ReviewsLink />
        <VisitSection />
      </main>
      <Footer />
      <MobileContactBar />
      <CursorGlow />
    </>
  );
}
