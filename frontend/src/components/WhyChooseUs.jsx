import React from 'react';
import { BookOpen, Tag, Award, Headphones } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: BookOpen,
      title: "WIDE SELECTION",
      desc: "Thousands of sacred scriptures, rare manuscripts & eBooks",
      sanskrit: "సర్వ విద్యానిధి"
    },
    {
      icon: Award,
      title: "MADE IN INDIA 🇮🇳",
      desc: "Handcrafted, curated & dispatched from Hyderabad, Telangana",
      sanskrit: "భారతీయ వారసత్వం • భాగ్యనగరం"
    },
    {
      icon: Tag,
      title: "ROYAL VALUE",
      desc: "Direct-from-press pricing with gold-embossed collectible bindings",
      sanskrit: "సరసమైన మూల్యం"
    },
    {
      icon: Headphones,
      title: "24/7 SUPPORT",
      desc: "Dedicated patron assistance & literary concierge across Bharat",
      sanskrit: "నిరంతర సేవ"
    }
  ];

  return (
    <section id="why-choose-us" className="bg-royal-emerald-950 text-parchment-100 py-14 px-4 sm:px-6 lg:px-8 border-y border-royal-emerald-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title matching reference image */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-royal-emerald-800 w-12 sm:w-20"></div>
          <h2 className="text-xs sm:text-sm font-crest uppercase tracking-[0.25em] text-royal-gold-400 font-bold">
            WHY CHOOSE SARASWATHI PUSTAKA?
          </h2>
          <div className="h-px bg-royal-emerald-800 w-12 sm:w-20"></div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center space-y-2.5 px-3">
                <div className="w-12 h-12 rounded-full border border-royal-gold-500/40 bg-royal-emerald-900/60 flex items-center justify-center text-royal-gold-400 shadow-sm mb-1">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                
                <h3 className="text-xs font-bold uppercase tracking-wider text-royal-gold-200">
                  {item.title}
                </h3>

                <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-xs">
                  {item.desc}
                </p>

                <span className="text-[10px] text-royal-gold-500/80 font-serif italic">
                  {item.sanskrit}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
