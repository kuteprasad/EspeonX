import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlowingButton } from "@/components/ui/GlowingButton";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-7 sm:py-16 bg-gray-900 text-gray-100">
      {/* Header Section */}
      <section className="flex items-center justify-center min-h-screen px-4">
        <div className="relative w-full max-w-8xl rounded-3xl overflow-hidden p-2 h-[80vh] shadow-lg shadow-black/30">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover rounded-3xl brightness-[0.4] contrast-[1.2]"
          >
            <source src="/windmill.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent rounded-3xl"></div>
          <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-8 py-10 sm:py-20">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-white drop-shadow-lg">
            EspeonX – The Future of Decentralized Esports
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-2xl max-w-3xl text-green-400 drop-shadow-md">
            Empowering Players with True Ownership, Fair Rewards, and a Transparent Gaming Economy
            </p>
            <div className="mt-6 sm:mt-10">
              <GlowingButton text="Get Started" onClick={() => alert("Button Clicked!")} />
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className="w-full py-10 px-4 sm:px-10"
      >
        <CarouselContent className="flex gap-4 sm:gap-6 md:gap-12 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 sm:basis-1/6">
              <img src={path} alt={name} className="h-25 sm:h-40 md:h-60 object-contain" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="bg-gray-800 p-6">
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
    {[
      { name: "Epic Sword", emoji: "⚔️", gradient: "from-green-400 to-lime-500" },
      { name: "Mystic Shield", emoji: "🛡️", gradient: "from-purple-500 to-pink-500" },
      { name: "Dragon Helmet", emoji: "🐉", gradient: "from-teal-400 to-cyan-500" },
      { name: "Fire Bow", emoji: "🏹", gradient: "from-red-500 to-orange-500" },
      { name: "Stealth Boots", emoji: "🥾", gradient: "from-yellow-400 to-amber-500" },
      { name: "Thunder Axe", emoji: "🪓", gradient: "from-blue-500 to-indigo-500" }
    ].map((asset, index) => (
      <div
        key={index}
        className="bg-gray-900 text-gray-100 p-6 rounded-xl border border-gray-700 shadow-lg transition-all hover:shadow-2xl flex flex-col justify-center items-center"
      >
        {/* Modern Neon Icon */}
        <div
          className={`mb-4 flex items-center justify-center bg-gradient-to-br ${asset.gradient} p-4 rounded-full`}
          style={{
            boxShadow: "0px 4px 15px rgba(255, 255, 255, 0.2)", // Softer glow effect
          }}
        >
          <span className="text-4xl text-white">{asset.emoji}</span>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{asset.name}</h3>
          <p className="text-sm text-gray-400 mb-2">Epic Asset - 0.10 ETH</p>
          <p className="text-sm text-gray-400 mb-2">Available in the marketplace</p>
          <p className="text-sm text-gray-400">Unlock your next adventure!</p>
        </div>
      </div>
    ))}
  </section>
</div>





      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto w-full px-4">
        <h2 className="text-center text-3xl font-bold text-gray-100 mb-6">Frequently Asked Questions</h2>
        <Accordion type="multiple" className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`} className="border border-gray-700 rounded-lg shadow-md hover:shadow-lg bg-gray-800 transition duration-300">
              <AccordionTrigger className="p-4 text-gray-200 font-semibold transition-all bg-gray-700 hover:bg-gray-600 rounded-t-lg no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 text-gray-300 bg-gray-700 rounded-b-lg">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default LandingPage;
