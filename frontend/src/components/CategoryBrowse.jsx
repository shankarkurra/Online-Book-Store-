import React from 'react';
import { 
  BookOpen, 
  Feather, 
  Sparkles, 
  TrendingUp, 
  Heart, 
  Compass, 
  Rocket, 
  Flame,
  ChevronRight 
} from 'lucide-react';

export default function CategoryBrowse({ onSelectCategory, selectedCategory }) {
  const categories = [
    {
      id: "Fiction",
      label: "FICTION",
      telugu: "కాల్పనిక సాహిత్యం",
      icon: BookOpen,
    },
    {
      id: "Non-Fiction",
      label: "NON-FICTION",
      telugu: "వాస్తవిక గ్రంథాలు",
      icon: Feather,
    },
    {
      id: "Self-Help",
      label: "SELF-HELP",
      telugu: "వ్యక్తిత్వ వికాసం",
      icon: Sparkles,
    },
    {
      id: "Business & Money",
      label: "BUSINESS & MONEY",
      telugu: "అర్థశాస్త్రం & వాణిజ్యం",
      icon: TrendingUp,
    },
    {
      id: "Religion & Spirituality",
      label: "RELIGION & SPIRITUALITY",
      telugu: "ధార్మిక & ఆధ్యాత్మికం",
      icon: Flame,
    },
    {
      id: "Romance",
      label: "ROMANCE",
      telugu: "ప్రేమ కథలు",
      icon: Heart,
    },
    {
      id: "History & Epics",
      label: "HISTORY & EPICS",
      telugu: "చరిత్ర & ఇతిహాసాలు",
      icon: Compass,
    },
  ];

  return (
    <section className="py-12 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title with double lines matching reference image */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-stone-300 w-16 sm:w-28"></div>
          <h2 className="text-xs sm:text-sm font-crest uppercase tracking-[0.25em] text-stone-700 font-bold">
            BROWSE BY CATEGORY
          </h2>
          <div className="h-px bg-stone-300 w-16 sm:w-28"></div>
        </div>

        {/* Categories Horizontal Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? "All" : cat.id)}
                className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300 group ${
                  isSelected 
                    ? "bg-royal-emerald-900 text-parchment-100 shadow-royal scale-105" 
                    : "bg-white/60 hover:bg-white text-stone-800 border border-stone-200/80 hover:border-royal-gold-400 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Icon Circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${
                  isSelected
                    ? "bg-royal-gold-500 text-royal-emerald-950"
                    : "bg-[#F7F3EB] group-hover:bg-royal-gold-100 text-royal-gold-700 group-hover:text-royal-emerald-900"
                }`}>
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                {/* Category Name */}
                <span className={`text-[11px] font-bold tracking-wider uppercase ${
                  isSelected ? "text-royal-gold-300" : "text-stone-900"
                }`}>
                  {cat.label}
                </span>

                {/* Vernacular subtitle */}
                <span className={`text-[10px] mt-0.5 font-serif ${
                  isSelected ? "text-stone-300" : "text-stone-500"
                }`}>
                  {cat.telugu}
                </span>

                {/* View All link matching reference image */}
                <span className={`text-[10px] mt-2 font-medium underline-offset-2 transition-colors ${
                  isSelected ? "text-white underline" : "text-stone-400 group-hover:text-royal-emerald-900 group-hover:underline"
                }`}>
                  {isSelected ? "Active Filter" : "View All"}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
