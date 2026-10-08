/**
 * ==============================================================================
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * UNIFIED PRODUCTION JAVASCRIPT ENGINE
 * Zero external dependencies | 100% Pure Vanilla JS | Instant Netlify Ready
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. DATA CATALOG & CONSTANTS
  // ----------------------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 'prod-broiler',
      name_bn: 'তাজা ফার্ম ব্রয়লার মুরগি (লাইভ)',
      name_en: 'Fresh Farm Broiler Chicken (Live)',
      price: 210,
      unit_bn: 'কেজি',
      unit_en: 'kg',
      desc_bn: 'সরাসরি খামার থেকে সংগৃহীত। জিরো ওয়াটার ইনজেকশন ও স্বাস্থ্যসম্মত এয়ার-চিলড কাটিং।',
      desc_en: 'Direct from bio-secure farms. 0% added water, clinically air-chilled and fresh cut.',
      image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'তাজা লাইভ ওজন',
      badge_en: 'Live Weight',
      badge_class: 'badge-fresh',
      category: 'broiler',
      cuts: [
        { id: 'curry', name_bn: 'কারি কাট (৮-১২ পিস)', name_en: 'Curry Cut (8-12 pcs)' },
        { id: 'biryani', name_bn: 'বিরিয়ানি সাইজ (৪ পিস)', name_en: 'Biryani Size (4 pcs)' },
        { id: 'skinless', name_bn: 'স্কিনলেস কাট', name_en: 'Skinless Cut' },
        { id: 'whole', name_bn: 'গোটা মুরগি ড্রেসড', name_en: 'Whole Dressed' }
      ]
    },
    {
      id: 'prod-sonali',
      name_bn: 'প্রিমিয়াম সোনালী মুরগি (ক্লাসিক)',
      name_en: 'Premium Sonali Chicken (Classic)',
      price: 340,
      unit_bn: 'কেজি',
      unit_en: 'kg',
      desc_bn: 'নরম ও সুস্বাদু মাংস, বিরিয়ানি ও রোস্ট রান্নার জন্য ঢাকাবাসীর শীর্ষ পছন্দ।',
      desc_en: 'Tender and flavorful meat, top choice for biryani, roast and traditional curries.',
      image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'বেস্টসেলার',
      badge_en: 'Bestseller',
      badge_class: 'badge-fresh',
      category: 'sonali',
      cuts: [
        { id: 'curry', name_bn: 'কারি কাট (৮ পিস)', name_en: 'Curry Cut (8 pcs)' },
        { id: 'biryani', name_bn: 'রোস্ট/বিরিয়ানি (৪ পিস)', name_en: 'Roast/Biryani (4 pcs)' },
        { id: 'skinless', name_bn: 'স্কিনলেস কাট', name_en: 'Skinless Cut' },
        { id: 'whole', name_bn: 'গোটা মুরগি ড্রেসড', name_en: 'Whole Dressed' }
      ]
    },
    {
      id: 'prod-deshi',
      name_bn: 'খাঁটি দেশি মুরগি (ফ্রি-রেঞ্জ)',
      name_en: 'Authentic Free-Range Deshi Chicken',
      price: 590,
      unit_bn: 'কেজি',
      unit_en: 'kg',
      desc_bn: 'প্রাকৃতিক মুক্ত চারণভূমিতে পালিত। কোনো ক্ষতিকর অ্যান্টিবায়োটিক বা হরমোন মুক্ত।',
      desc_en: 'Naturally grown free-range chicken. Free from antibiotics and growth hormones.',
      image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      badge_bn: '১০০% অর্গানিক',
      badge_en: '100% Organic',
      badge_class: 'badge-deshi',
      category: 'deshi',
      cuts: [
        { id: 'curry', name_bn: 'দেশি ছোট কাট (১০-১২ পিস)', name_en: 'Traditional Cut (10-12 pcs)' },
        { id: 'biryani', name_bn: 'বিরিয়ানি সাইজ (৪ পিস)', name_en: 'Biryani Size (4 pcs)' },
        { id: 'whole', name_bn: 'গোটা ড্রেসড', name_en: 'Whole Dressed' }
      ]
    },
    {
      id: 'prod-drumsticks',
      name_bn: 'ফ্রেশ চিকেন ড্রামস্টিক (প্যাক)',
      name_en: 'Fresh Chicken Drumsticks (Pack)',
      price: 380,
      unit_bn: 'প্যাক (৪-৬ পিস)',
      unit_en: 'Pack (4-6 pcs)',
      desc_bn: 'ফ্রাই ও রোস্টের জন্য রেডি-টু-কুক রসালো ড্রামস্টিক। নিখুঁত ক্লিনিক্যাল পরিষ্কার।',
      desc_en: 'Ready-to-cook juicy drumsticks for frying and roasting. Clinically cleaned.',
      image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'প্রি-কাট ফ্রেশ',
      badge_en: 'Pre-Cut Fresh',
      badge_class: 'badge-organic',
      category: 'cuts',
      cuts: [
        { id: 'skinless', name_bn: 'স্কিনলেস ড্রামস্টিক', name_en: 'Skinless Drumsticks' },
        { id: 'with-skin', name_bn: 'উইথ স্কিন রোস্ট কাট', name_en: 'Skin-On Roast Cut' }
      ]
    },
    {
      id: 'prod-boneless-breast',
      name_bn: 'তাজা বোনলেস চিকেন ব্রেস্ট ফিলে',
      name_en: 'Fresh Boneless Chicken Breast Fillet',
      price: 460,
      unit_bn: 'কেজি',
      unit_en: 'kg',
      desc_bn: '১০০% চর্বিমুক্ত হাই-প্রোটিন লীন মিট। জিম ডায়েট ও চাইনিজ রান্নার জন্য উপযুক্ত।',
      desc_en: '100% lean high-protein meat. Ideal for gym diets, grilling and Asian stir-fries.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'হাই-প্রোটিন',
      badge_en: 'High-Protein',
      badge_class: 'badge-fresh',
      category: 'cuts',
      cuts: [
        { id: 'boneless-cube', name_bn: 'কিউব / ডাইস কাট', name_en: 'Cube / Diced Cut' },
        { id: 'boneless-fillet', name_bn: 'হোল ফিলে স্লাইস', name_en: 'Whole Fillet Slice' },
        { id: 'strips', name_bn: 'স্ট্রিপস / ফিঙ্গার কাট', name_en: 'Strips / Finger Cut' }
      ]
    },
    {
      id: 'prod-layer-eggs',
      name_bn: 'ফার্ম ফ্রেশ লাল ও সাদা ডিম (১২ পিস)',
      name_en: 'Farm Fresh Layer Eggs (12 Pcs Tray)',
      price: 145,
      unit_bn: 'ডজন',
      unit_en: 'Dozen',
      desc_bn: 'প্রতিদিনের তাজা সংগৃহীত স্বাস্থ্যকর পুষ্টিসমৃদ্ধ ডিম। গ্রেড-এ সাইজ।',
      desc_en: 'Daily fresh collected high-nutrition eggs. Grade-A quality pack.',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'প্রতিদিনের তাজা',
      badge_en: 'Fresh Daily',
      badge_class: 'badge-organic',
      category: 'eggs',
      cuts: [
        { id: 'standard-tray', name_bn: 'স্ট্যান্ডার্ড ট্রে প্যাক (১২ পিস)', name_en: 'Standard Tray Pack (12 Pcs)' }
      ]
    },
    {
      id: 'prod-fresh-duck',
      name_bn: 'তাজা পাতিহাঁসের মাংস (ড্রেসড)',
      name_en: 'Fresh Local Duck Meat (Dressed)',
      price: 520,
      unit_bn: 'কেজি',
      unit_en: 'kg',
      desc_bn: 'ঐতিহ্যবাহী স্বাদের চামড়াসহ ফ্রেশ পাতিহাঁস। শীতকালীন স্পেশাল কারি কাট।',
      desc_en: 'Traditional flavorful skin-on duck meat. Winter special curry cuts.',
      image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'স্পেশাল ফ্রেশ',
      badge_en: 'Special Fresh',
      badge_class: 'badge-deshi',
      category: 'layer',
      cuts: [
        { id: 'duck-curry', name_bn: 'চামড়াসহ কারি কাট', name_en: 'Skin-On Curry Cut' },
        { id: 'duck-roast', name_bn: 'রোস্ট সাইজ ৪ পিস', name_en: 'Roast Size 4 pcs' }
      ]
    },
    {
      id: 'prod-b2b-crate',
      name_bn: 'রেস্টুরেন্ট বাল্ক ব্রয়লার ক্রেট (২৫ কেজি)',
      name_en: 'Restaurant Bulk Broiler Crate (25 Kg)',
      price: 4875,
      unit_bn: '২৫ কেজি ক্রেট',
      unit_en: '25 Kg Crate',
      desc_bn: 'হোটেল ও ক্যাটারিংয়ের জন্য বিশেষ হোলসেল রেট (৳১৯৫/কেজি)। ফ্রি মর্নিং ডেলিভারি।',
      desc_en: 'Wholesale bulk rate for hotels & caterers (৳195/kg). Free morning delivery.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      badge_bn: 'হোলসেল রেট',
      badge_en: 'Wholesale Rate',
      badge_class: 'badge-halal',
      category: 'broiler',
      cuts: [
        { id: 'hotel-curry', name_bn: 'হোটেল কারি কাট', name_en: 'Hotel Curry Cut' },
        { id: 'biryani-4pcs', name_bn: 'বিরিয়ানি ৪ পিস সাইজ', name_en: 'Biryani 4 Pcs Cut' },
        { id: 'skinless-b2b', name_bn: 'স্কিনলেস ক্লিনিক্যাল কাট', name_en: 'Skinless Clinical Cut' }
      ]
    }
  ];

  const DELIVERY_SLOTS = [
    {
      id: 'slot-1',
      time_bn: 'ভোর ৬:০০ - সকাল ৮:০০',
      time_en: '6:00 AM - 8:00 AM',
      title_bn: 'ভোরের তাজা বাজার স্লট',
      title_en: 'Early Fresh Morning Slot',
      desc_bn: 'সকালের নাস্তা ও দুপুরের প্রিপারেশনের জন্য সেরা',
      desc_en: 'Best for early morning kitchen prep'
    },
    {
      id: 'slot-2',
      time_bn: 'সকাল ৮:০০ - সকাল ১১:০০',
      time_en: '8:00 AM - 11:00 AM',
      title_bn: 'দুপুরের রান্নার প্রাইম স্লট',
      title_en: 'Lunch Cooking Prime Slot',
      desc_bn: 'তাজা কেটে সাথে সাথে আপনার বাসায় পৌঁছাবে',
      desc_en: 'Fresh cut and delivered right for lunch'
    },
    {
      id: 'slot-3',
      time_bn: 'বিকাল ৩:০০ - সন্ধ্যা ৬:০০',
      time_en: '3:00 PM - 6:00 PM',
      title_bn: 'বিকেলের ফ্রেশ স্লট',
      title_en: 'Afternoon Fresh Slot',
      desc_bn: 'সন্ধ্যা ও রাতের ডিনারের জন্য প্রস্তুত',
      desc_en: 'Ready for dinner and evening prep'
    },
    {
      id: 'slot-4',
      time_bn: 'সন্ধ্যা ৬:০০ - রাত ৯:০০',
      time_en: '6:00 PM - 9:00 PM',
      title_bn: 'রাতের ডিনার ও পরদিনের বাজার',
      title_en: 'Dinner & Next Day Slot',
      desc_bn: 'পরদিনের রান্নার জন্য কোল্ড চেইন ফ্রেশ প্রিজার্ভ',
      desc_en: 'Preserved fresh in cold-chain for tomorrow'
    }
  ];

  const AREA_FEES = {
    gulshan: 40,
    banani: 40,
    dhanmondi: 40,
    uttara: 50,
    mirpur: 45,
    mohammadpur: 40,
    bashundhara: 45,
    badda: 45,
    motijheel: 50
  };

  // ----------------------------------------------------------------------------
  // 2. I18N DICTIONARY & NUMERIC HELPERS
  // ----------------------------------------------------------------------------
  const I18N = {
    bn: {
      'brand.name': 'তোমার মুরগি স্টোর',
      'brand.tagline': 'ফার্ম ফ্রেশ ও স্বাস্থ্যসম্মত হালাল পোল্ট্রি',
      'topbar.area_label': 'ডেলিভারি এলাকা:',
      'topbar.hours': 'সকাল ৬:০০ - রাত ১০:০০',
      'topbar.hotline': 'হটলাইন ও হোয়াটসঅ্যাপ:',
      'topbar.mode.retail': 'বাসার বাজার (Retail)',
      'topbar.mode.b2b': 'রেস্টুরেন্ট সাপ্লাই (B2B)',
      'nav.catalog': 'তাজা মুরগি',
      'nav.b2b': 'হোলসেল সাপ্লাই',
      'nav.hygiene': 'হাইজিং ও মান',
      'nav.tracking': 'অর্ডার ট্র্যাকিং',
      'nav.slots': 'ডেলিভারি সময়',
      'nav.privacy': 'গোপনীয়তা নীতিমালা',
      'cart.title': 'আপনার ঝুড়ি',
      'hero.badge': '১০০% পরীক্ষিত কোল্ড চেইন ফ্রেশনেস',
      'hero.title': 'ফার্মের খাঁটি তাজা মুরগি, সরাসরি আপনার কিচেনে।',
      'hero.subtitle': 'কোনো প্রিজারভেটিভ বা ওয়াটার ইনজেকশন নেই। সুস্থ জীবন্ত মুরগির সঠিক লাইভ ওজন, ক্লিনিক্যাল এয়ার-চিলড ড্রেসিং এবং নিখুঁত মনপসন্দ কাটিং।',
      'hero.cta.catalog': 'আজকের তাজা মুরগি দেখুন',
      'hero.cta.b2b': 'রেস্টুরেন্ট বাল্ক কোটেশন',
      'hero.stat.delivery': '৪৫ মিনিট দ্রুত ডেলিভারি',
      'hero.stat.delivery_sub': 'ঢাকা শহরের কাভার্ড এরিয়ায়',
      'hero.stat.preservative': '০% প্রিজারভেটিভ',
      'hero.stat.preservative_sub': 'সম্পূর্ণ রাসায়নিক মুক্ত',
      'hero.stat.partners': '১,২০০+ কিচেন পার্টনার',
      'hero.stat.partners_sub': 'প্রতিদিনের বিশ্বস্ত সরবরাহ',
      'trust.halal.title': '১০০% হালাল জবেহ',
      'trust.halal.desc': 'শরীয়ত সম্মত হস্তনির্মিত জবেহ ও রক্তক্ষরণ নিশ্চিতকরণ।',
      'trust.dressing.title': 'ক্লিনিক্যাল ড্রেসিং ও জিরো ওয়াটার',
      'trust.dressing.desc': 'ওজন বৃদ্ধির জন্য কোনো পানি ইনজেকশন দেওয়া হয় না। ফ্রি প্রফেশনাল কাটিং।',
      'trust.coldchain.title': 'ফার্ম টু ডোর কোল্ড-চেইন',
      'trust.coldchain.desc': '৪° সে. নিয়ন্ত্রিত তাপমাত্রায় সংরক্ষিত তাজা ডেলিভারি।',
      'tab.all': 'সব পণ্য',
      'tab.broiler': 'ফার্ম ব্রয়লার',
      'tab.sonali': 'সোনালী মুরগি',
      'tab.deshi': 'খাঁটি দেশি',
      'tab.layer': 'কক ও লেয়ার',
      'tab.cuts': 'বোনলেস ও কাট পিস',
      'tab.eggs': 'ফার্ম ও অর্গানিক ডিম',
      'slots.section_title': 'ডেলিভারির সুবিধাজনক সময় বেছে নিন',
      'slots.section_subtitle': 'আপনার রান্নার সময়ের সাথে মিলিয়ে কোল্ড-চেইন স্লট বাছাই করুন',
      'b2b.section_badge': 'হোটেল, রেস্টুরেন্ট ও ক্যাটারিং পার্টনারশিপ',
      'b2b.title': 'কমার্শিয়াল বাল্ক পোল্ট্রি সাপ্লাই প্রোগ্রাম',
      'b2b.subtitle': 'ঢাকার শীর্ষ রেস্টুরেন্ট ও কিচেন সমূহে ভোরবেলা নির্ভরযোগ্য, নিয়ন্ত্রিত মূল্যে মানসম্মত মুরগি সরবরাহ।',
      'b2b.calc_title': 'বাল্ক অর্ডার প্রাইস ক্যালকুলেটর',
      'b2b.type_label': 'মুরগির ধরন নির্বাচন করুন:',
      'b2b.cut_label': 'রান্নার কাটিং স্পেসিফিকেশন:',
      'b2b.vol_label': 'প্রতিদিনের সম্ভাব্য পরিমাণ (কেজি):',
      'b2b.slot_label': 'কিচেন রিসিভিং স্লট:',
      'b2b.discount_notice': 'প্রযোজ্য ছাড়:',
      'b2b.est_price': 'আনুমানিক বাল্ক রেট:',
      'b2b.name_label': 'রেস্টুরেন্ট / ব্যবসা প্রতিষ্ঠানের নাম:',
      'b2b.phone_label': 'ম্যানেজার / পারচেজ ফোন নম্বর:',
      'b2b.submit_btn': 'হোয়াটসঅ্যাপে বাল্ক কোটেশন পাঠান',
      'about.title': 'আমাদের খামার ও ক্লিনিক্যাল হাইজিন মানদণ্ড',
      'about.subtitle': 'স্বাস্থ্যসম্মত খাবার নিশ্চিত করতে খামারের ফিড থেকে শুরু করে আপনার কিচেন পর্যন্ত প্রতিটি ধাপে শতভাগ বায়ো-সিকিউরিটি ও মান নিয়ন্ত্রণ।',
      'about.card1.title': 'এয়ার-চিলড ও ০% ওয়াটার ইনজেকশন',
      'about.card1.desc': 'খোলা বাজারের মুরগিতে ওজন বাড়াতে পানি ঢোকানো হয়। আমাদের মুরগি ১০০% এয়ার-চিলড পদ্ধতিতে প্রক্রিয়াজাত, ফলে মাংস থাকে ড্রাই ও খাঁটি।',
      'about.card2.title': '১০০% বিশুদ্ধ হালাল জবেহ',
      'about.card2.desc': 'সম্পূর্ণ ইসলামিক বিধান মেনে প্রশিক্ষিত কসাই দ্বারা হস্তনির্মিত জবেহ এবং রক্ত সম্পূর্ণরূপে নিংড়ে নেওয়া হয়।',
      'about.card3.title': '৪° সে. নিয়ন্ত্রিত কোল্ড চেইন',
      'about.card3.desc': 'কাটিংয়ের পর থেকে আপনার বাসায় পৌঁছানো পর্যন্ত ইনসুলেটেড কোল্ড ভ্যানে ৪° সে. তাপমাত্রায় ব্যাকটেরিয়া প্রতিরোধে সংরক্ষিত থাকে।',
      'about.card4.title': 'অ্যান্টিবায়োটিক মুক্ত ফিড',
      'about.card4.desc': 'কোনো ক্ষতিকর গ্রোথ হরমোন বা অতিরিক্ত অ্যান্টিবায়োটিক দেওয়া হয় না। ভেষজ ও অর্গানিক সুষম খাদ্যে পালিত সুস্থ মুরগি।',
      'about.card5.title': 'শেফ-গ্রেড নিখুঁত কাটিং',
      'about.card5.desc': 'বিরিয়ানি, রোস্ট, কারি কিংবা স্কিনলেস — আপনার পছন্দের কাটিং নিখুঁতভাবে স্টেইনলেস স্টিল সারফেসে স্বাস্থ্যসম্মতভাবে প্রস্তুত করা হয়।',
      'about.card6.title': 'স্বচ্ছ লাইভ ওজন গ্যারান্টি',
      'about.card6.desc': 'লাইভ ওজন থেকে পরিচ্ছন্ন ফ্রেশ কাটিং — ওজনে কোনো নয়-ছয় নেই। ডেলিভারির সময় সঠিক ওজনের ডিজিটাল স্লিপ সংযুক্ত থাকে।',
      'tracking.title': 'লাইভ কোল্ড-চেইন অর্ডার ট্র্যাকিং',
      'tracking.subtitle': 'আপনার অর্ডার আইডি প্রদান করে রিয়েল-টাইম ড্রেসিং ও কোল্ড ভ্যানের লাইভ লোকেশন দেখুন।',
      'tracking.track_btn': 'ট্র্যাক করুন',
      'track.step1': 'অর্ডার নিশ্চিতকরণ ও ওজন নির্ধারণ',
      'track.step2': 'হালাল জবেহ ও এয়ার-চিলড কাটিং',
      'track.step3': '৪° সে. ইনসুলেটেড কোল্ড ভ্যানে যাত্রা',
      'track.step4': 'দোরগোড়ায় তাজা ডেলিভারি ও যাচাই',
      'notfound.title': 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি',
      'notfound.desc': 'আপনি যে লিংকটি অনুসন্ধান করছেন তা পরিবর্তিত হয়েছে অথবা অস্তিত্ব নেই।',
      'notfound.btn': 'প্রধান পাতায় ফিরে যান',
      'drawer.heading': 'আপনার অর্ডারের ঝুড়ি',
      'drawer.items_section': 'নির্বাচিত পণ্যসমূহ:',
      'drawer.bill_section': 'মূল্য ও ডেলিভারি বিবরণী:',
      'drawer.delivery_section': 'ডেলিভারি ও পেমেন্ট তথ্য:',
      'drawer.empty': 'আপনার ঝুড়িতে এখনো কোনো পণ্য যোগ করা হয়নি।',
      'drawer.empty_action': 'তাজা মুরগি দেখুন',
      'drawer.subtotal': 'পণ্যের মোট মূল্য:',
      'drawer.delivery_fee': 'ডেলিভারি চার্জ:',
      'drawer.total': 'সর্বমোট প্রদেয়:',
      'drawer.name_label': 'আপনার নাম:',
      'drawer.phone_label': 'মোবাইল নম্বর (১১ ডিজিট):',
      'drawer.address_label': 'সম্পূর্ণ ঠিকানা (বাসা/রোড/ফ্ল্যাট):',
      'drawer.payment_method': 'পেমেন্ট মাধ্যম:',
      'drawer.cod': 'ক্যাশ অন ডেলিভারি',
      'drawer.bkash': 'বিকাশ / নগদ',
      'drawer.place_order': 'অর্ডার নিশ্চিত করুন',
      'drawer.order_success': 'অর্ডার সফলভাবে গৃহীত হয়েছে!',
      'drawer.order_id': 'অর্ডার ট্র্যাকিং আইডি:',
      'drawer.order_msg': 'আমাদের প্রতিনিধি অবিলম্বে কল করে আপনার কাটিং ও ওজন কনফার্ম করবেন।',
      'placeholder.name': 'যেমন: মো: তানভীর আহমেদ',
      'placeholder.phone': '017XXXXXXXX',
      'placeholder.address': 'বাসা # ১২, রোড # ৪, ব্লক # সি, বনানী',
      'privacy.modal_title': 'গ্রাহকের তথ্যের গোপনীয়তা ও নিরাপত্তা নীতি',
      'privacy.intro': 'তোমার মুরগি স্টোর (Tomar Murgi Store) গ্রাহকের ব্যক্তিগত তথ্যের মর্যাদা ও নিরাপত্তার প্রতি সর্বোচ্চ দায়বদ্ধ। বাংলাদেশ ডিজিটাল নিরাপত্তা ও ভোক্তা অধিকার বিধিমালা অনুসারে আমাদের নীতিমালা নিম্নরূপ:',
      'privacy.p1_title': '১. তথ্য সংগ্রহ ও ব্যবহার',
      'privacy.p1_body': 'অর্ডার প্রক্রিয়াকরণ এবং সময়মতো তাজা ডেলিভারি নিশ্চিত করার স্বার্থে কেবল গ্রাহকের নাম, মোবাইল নম্বর এবং ঠিকানা সংগ্রহ করা হয়। রেস্টুরেন্ট গ্রাহকদের ক্ষেত্রে প্রতিষ্ঠানের নাম যুক্ত হয়।',
      'privacy.p2_title': '২. তথ্যের শতভাগ গোপনীয়তা',
      'privacy.p2_body': 'আমরা কোনো অবস্থাতেই গ্রাহকের সংগৃহীত ফোন নম্বর বা তথ্য কোনো তৃতীয় পক্ষ কিংবা বিজ্ঞাপনী এজেন্সির কাছে বিক্রি, ভাড়া বা শেয়ার করি না।',
      'privacy.p3_title': '৩. পেমেন্ট তথ্য সংরক্ষণ নিষেধাজ্ঞা',
      'privacy.p3_body': 'বিকাশ, নগদ কিংবা ডেবিট/ক্রেডিট কার্ডের কোনো ধরনের পিন (PIN) বা ওটিপি (OTP) আমাদের সার্ভারে জমা রাখা হয় না। গ্রাহক সুরক্ষিত পেমেন্ট গেটওয়ের মাধ্যমে পরিশোধ করেন।',
      'privacy.p4_title': '৪. স্বাস্থ্য ও রিটার্ন গ্যারান্টি',
      'privacy.p4_body': 'ডেলিভারি ম্যানের উপস্থিতিতে পণ্য দেখে বুঝে নেওয়ার সুযোগ রয়েছে। ওজনে গরমিল কিংবা কাটিংয়ে কোনো সমস্যা থাকলে তাৎক্ষণিক ফেরত ও রিফান্ড প্রদান করা হয়।',
      'privacy.close_btn': 'বুঝেছি ও একমত',
      'footer.about': 'তোমার মুরগি স্টোর — ঢাকা শহরের প্রথম স্বাস্থ্যসম্মত ও ক্লিনিক্যাল এয়ার-চিলড পোল্ট্রি ডেলিভারি সেবা।',
      'footer.quick_links': 'প্রয়োজনীয় লিংক',
      'footer.legal': 'আইনি ও নীতিমালা',
      'footer.copyright': '© ২০২৬ তোমার মুরগি স্টোর (Tomar Murgi Store)। সর্বস্বত্ব সংরক্ষিত।',
      'card.cut_label': 'কাটিং স্টাইল নির্বাচন:',
      'card.add_btn': 'ঝুড়িতে যোগ করুন'
    },
    en: {
      'brand.name': 'Tomar Murgi Store',
      'brand.tagline': 'Farm Fresh & Clinically Hygienic Halal Poultry',
      'topbar.area_label': 'Delivery Hub:',
      'topbar.hours': '6:00 AM - 10:00 PM',
      'topbar.hotline': 'Hotline & WhatsApp:',
      'topbar.mode.retail': 'Home (Retail)',
      'topbar.mode.b2b': 'Restaurant (B2B)',
      'nav.catalog': 'Fresh Poultry',
      'nav.b2b': 'Wholesale (B2B)',
      'nav.hygiene': 'Hygiene Standards',
      'nav.tracking': 'Order Tracking',
      'nav.slots': 'Delivery Slots',
      'nav.privacy': 'Privacy Policy',
      'cart.title': 'Your Cart',
      'hero.badge': '100% Tested Cold-Chain Freshness',
      'hero.title': 'Pure Farm-Fresh Poultry, Straight to Your Kitchen.',
      'hero.subtitle': 'Zero preservatives, zero water injection. Accurate live weight, clinical air-chilled processing, and customized chef-grade cuts.',
      'hero.cta.catalog': 'Explore Today\'s Fresh Cuts',
      'hero.cta.b2b': 'Get Restaurant Bulk Quote',
      'hero.stat.delivery': '45-Minute Quick Delivery',
      'hero.stat.delivery_sub': 'Across covered Dhaka zones',
      'hero.stat.preservative': '0% Preservatives',
      'hero.stat.preservative_sub': '100% chemical & antibiotic-safe',
      'hero.stat.partners': '1,200+ Kitchen Partners',
      'hero.stat.partners_sub': 'Trusted daily poultry supply',
      'trust.halal.title': '100% Halal Slaughtered',
      'trust.halal.desc': 'Strict manual halal cut according to Islamic principles.',
      'trust.dressing.title': 'Clinical Dressing & 0% Water',
      'trust.dressing.desc': 'Zero added water injection to inflate weight. Free custom cuts.',
      'trust.coldchain.title': 'Farm-to-Door Cold Chain',
      'trust.coldchain.desc': 'Delivered in insulated cold-vans maintained at 4°C.',
      'tab.all': 'All Products',
      'tab.broiler': 'Farm Broiler',
      'tab.sonali': 'Sonali Chicken',
      'tab.deshi': 'Pure Deshi',
      'tab.layer': 'Cock & Layer',
      'tab.cuts': 'Boneless & Cuts',
      'tab.eggs': 'Farm & Organic Eggs',
      'slots.section_title': 'Choose Your Delivery Time Slot',
      'slots.section_subtitle': 'Match your cooking schedule with our temperature-controlled delivery slots',
      'b2b.section_badge': 'Hotel, Restaurant & Catering Commercial Partnership',
      'b2b.title': 'Commercial Bulk Poultry Supply Program',
      'b2b.subtitle': 'Dependable, high-grade morning delivery with fixed contract rates for leading restaurants across Dhaka.',
      'b2b.calc_title': 'Bulk Order Price Calculator',
      'b2b.type_label': 'Select Poultry Variety:',
      'b2b.cut_label': 'Cutting Specification:',
      'b2b.vol_label': 'Estimated Daily Volume (Kg):',
      'b2b.slot_label': 'Kitchen Receiving Slot:',
      'b2b.discount_notice': 'Eligible Discount:',
      'b2b.est_price': 'Estimated Bulk Rate:',
      'b2b.name_label': 'Restaurant / Business Name:',
      'b2b.phone_label': 'Manager / Purchase Phone:',
      'b2b.submit_btn': 'Send Bulk Inquiry via WhatsApp',
      'about.title': 'Our Farm & Clinical Hygiene Standards',
      'about.subtitle': 'From bio-secure feed to cold-chain dispatch, every step is rigorously monitored for your family\'s safety.',
      'about.card1.title': 'Air-Chilled & 0% Water Injection',
      'about.card1.desc': 'Wet market vendors inject water to artificially boost meat weight. Our meat is 100% air-chilled for dry, dense, pure protein.',
      'about.card2.title': '100% Halal Manual Slaughter',
      'about.card2.desc': 'Hand-slaughtered by trained butchers according to strict halal standards with thorough natural blood drainage.',
      'about.card3.title': '4°C Controlled Cold Chain',
      'about.card3.desc': 'From our dressing facility to your doorstep, items stay safely chilled at 4°C in insulated delivery units.',
      'about.card4.title': 'Antibiotic-Free Feed',
      'about.card4.desc': 'Raised on natural, herbal and vegetarian feed without harmful growth promoters or unnecessary antibiotics.',
      'about.card5.title': 'Chef-Grade Precision Cutting',
      'about.card5.desc': 'Biryani, roast, curry, or skinless cuts — prepared cleanly on sanitised stainless steel surfaces.',
      'about.card6.title': 'Transparent Live-Weight Guarantee',
      'about.card6.desc': 'Clean dressing from verified live weight with digital weight slips attached to every delivery bag.',
      'tracking.title': 'Live Cold-Chain Order Tracking',
      'tracking.subtitle': 'Enter your order ID to see real-time dressing progress, van location, and temperature.',
      'tracking.track_btn': 'Track Order',
      'track.step1': 'Order Placed & Live Weight Weighed',
      'track.step2': 'Halal Slaughter & Air-Chilled Cutting',
      'track.step3': 'In Transit in 4°C Insulated Cold-Van',
      'track.step4': 'Delivered & Verified at Doorstep',
      'notfound.title': 'Page Not Found',
      'notfound.desc': 'The link you are looking for has been moved or does not exist.',
      'notfound.btn': 'Return to Home',
      'drawer.heading': 'Your Shopping Cart',
      'drawer.items_section': 'Selected Products:',
      'drawer.bill_section': 'Bill & Delivery Breakdown:',
      'drawer.delivery_section': 'Delivery & Payment Information:',
      'drawer.empty': 'Your cart is currently empty.',
      'drawer.empty_action': 'Browse Fresh Poultry',
      'drawer.subtotal': 'Items Total:',
      'drawer.delivery_fee': 'Delivery Fee:',
      'drawer.total': 'Total Payable:',
      'drawer.name_label': 'Your Full Name:',
      'drawer.phone_label': 'Mobile Number (11 digits):',
      'drawer.address_label': 'Full Address (House/Road/Area):',
      'drawer.payment_method': 'Payment Method:',
      'drawer.cod': 'Cash on Delivery',
      'drawer.bkash': 'bKash / Nagad',
      'drawer.place_order': 'Confirm Order',
      'drawer.order_success': 'Order Placed Successfully!',
      'drawer.order_id': 'Order Tracking ID:',
      'drawer.order_msg': 'Our customer agent will call you shortly to confirm your custom cut and exact weight.',
      'placeholder.name': 'e.g. Tanvir Ahmed',
      'placeholder.phone': '017XXXXXXXX',
      'placeholder.address': 'House # 12, Road # 4, Block # C, Banani',
      'privacy.modal_title': 'Customer Privacy & Data Protection Policy',
      'privacy.intro': 'Tomar Murgi Store is committed to upholding the privacy and security of our customers in accordance with Bangladesh digital commerce regulations.',
      'privacy.p1_title': '1. Information Collection & Usage',
      'privacy.p1_body': 'We only collect essential details (name, phone number, delivery address) needed to dispatch fresh orders and verify delivery.',
      'privacy.p2_title': '2. 100% Data Confidentiality',
      'privacy.p2_body': 'We never rent, sell, or disclose your contact details to third-party marketing companies or advertising agencies.',
      'privacy.p3_title': '3. Payment Information Safety',
      'privacy.p3_body': 'We do not store financial PINs or OTPs. All digital transactions are securely routed through certified payment channels.',
      'privacy.p4_title': '4. Freshness & Return Guarantee',
      'privacy.p4_body': 'Customers have the full right to inspect meat upon arrival. Instant replacements or refunds are issued for any weight or quality discrepancy.',
      'privacy.close_btn': 'I Understand & Agree',
      'footer.about': 'Tomar Murgi Store — Dhaka\'s premier clinical-standard, air-chilled halal poultry delivery network.',
      'footer.quick_links': 'Quick Links',
      'footer.legal': 'Legal & Policy',
      'footer.copyright': '© 2026 Tomar Murgi Store. All rights reserved.',
      'card.cut_label': 'Select Cut Style:',
      'card.add_btn': 'Add to Cart'
    }
  };

  const AREA_OPTIONS = {
    bn: [
      { value: 'gulshan', label: 'গুলশান (১ ও ২) - ৳৪০' },
      { value: 'banani', label: 'বনানী ও ডিওএইচএস - ৳৪০' },
      { value: 'dhanmondi', label: 'ধানমন্ডি ও জিগাতলা - ৳৪০' },
      { value: 'uttara', label: 'উত্তরা (সেক্টর ১-১৮) - ৳৫০' },
      { value: 'mirpur', label: 'মিরপুর (১-১৪) - ৳৪৫' },
      { value: 'mohammadpur', label: 'মোহাম্মদপুর ও আদাবর - ৳৪০' },
      { value: 'bashundhara', label: 'বসুন্ধরা আ/এ - ৳৪৫' },
      { value: 'badda', label: 'বাড্ডা ও রামপুরা - ৳৪৫' },
      { value: 'motijheel', label: 'মতিঝিল ও পল্টন - ৳৫০' }
    ],
    en: [
      { value: 'gulshan', label: 'Gulshan (1 & 2) - ৳40' },
      { value: 'banani', label: 'Banani & DOHS - ৳40' },
      { value: 'dhanmondi', label: 'Dhanmondi & Jigatola - ৳40' },
      { value: 'uttara', label: 'Uttara (Sec 1-18) - ৳50' },
      { value: 'mirpur', label: 'Mirpur (1-14) - ৳45' },
      { value: 'mohammadpur', label: 'Mohammadpur & Adabor - ৳40' },
      { value: 'bashundhara', label: 'Bashundhara R/A - ৳45' },
      { value: 'badda', label: 'Badda & Rampura - ৳45' },
      { value: 'motijheel', label: 'Motijheel & Paltan - ৳50' }
    ]
  };

  const B2B_VARIETY_OPTIONS = {
    bn: [
      { value: 'prod-broiler', label: 'তাজা ফার্ম ব্রয়লার মুরগি (লাইভ)' },
      { value: 'prod-sonali', label: 'প্রিমিয়াম সোনালী মুরগি (ক্লাসিক)' },
      { value: 'prod-deshi', label: 'খাঁটি দেশি মুরগি (ফ্রি-রেঞ্জ)' },
      { value: 'prod-boneless-breast', label: 'তাজা বোনলেস চিকেন ব্রেস্ট ফিলে' }
    ],
    en: [
      { value: 'prod-broiler', label: 'Fresh Farm Broiler (Live)' },
      { value: 'prod-sonali', label: 'Premium Sonali Chicken (Classic)' },
      { value: 'prod-deshi', label: 'Authentic Deshi Chicken (Free-Range)' },
      { value: 'prod-boneless-breast', label: 'Fresh Boneless Chicken Breast' }
    ]
  };

  const B2B_CUT_OPTIONS = {
    bn: [
      { value: 'curry', label: 'কারি কাট (৮-১২ পিস)' },
      { value: 'biryani', label: 'বিরিয়ানি কাট (৪ পিস রোস্ট সাইজ)' },
      { value: 'skinless', label: 'স্কিনলেস স্ট্যান্ডার্ড কাট' },
      { value: 'boneless', label: 'বোনলেস কিউব / ডাইস' },
      { value: 'whole', label: 'গোটা মুরগি ড্রেসড' }
    ],
    en: [
      { value: 'curry', label: 'Curry Cut (8-12 pcs)' },
      { value: 'biryani', label: 'Biryani Cut (4 pcs Roast Size)' },
      { value: 'skinless', label: 'Skinless Standard Cut' },
      { value: 'boneless', label: 'Boneless Cubes / Diced' },
      { value: 'whole', label: 'Whole Dressed Chicken' }
    ]
  };

  const B2B_SLOT_OPTIONS = {
    bn: [
      { value: 'restaurant-early', label: 'ভোর ৫:০০ - সকাল ৭:০০ (Early Commercial Slot)' },
      { value: 'morning', label: 'সকাল ৭:০০ - ১০:০০ (Morning Slot)' },
      { value: 'afternoon', label: 'দুপুর ১২:০০ - ৩:০০ (Afternoon Slot)' }
    ],
    en: [
      { value: 'restaurant-early', label: '5:00 AM - 7:00 AM (Early Commercial Slot)' },
      { value: 'morning', label: '7:00 AM - 10:00 AM (Morning Slot)' },
      { value: 'afternoon', label: '12:00 PM - 3:00 PM (Afternoon Slot)' }
    ]
  };

  const BANGLA_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

  function toBanglaNum(num) {
    if (num === null || num === undefined) return '';
    return String(num).replace(/[0-9]/g, d => BANGLA_DIGITS[d]);
  }

  function formatPrice(amount, lang) {
    const formatted = lang === 'bn' ? toBanglaNum(amount) : amount.toLocaleString('en-US');
    return lang === 'bn' ? `৳ ${formatted}` : `৳ ${formatted}`;
  }

  function formatWeight(kg, lang) {
    if (lang === 'bn') {
      return `${toBanglaNum(kg)} কেজি`;
    }
    return `${kg} kg`;
  }

  // ----------------------------------------------------------------------------
  // 3. APPLICATION STATE
  // ----------------------------------------------------------------------------
  const state = {
    lang: localStorage.getItem('tms_lang') || 'bn',
    currentView: 'retail',
    currentCategory: 'all',
    selectedSlot: 'slot-2',
    selectedArea: 'gulshan',
    paymentMethod: 'cod',
    cart: [],
    productSelections: {} // productId -> { cutId: string, qty: number }
  };

  // Load cart from localStorage
  try {
    const savedCart = localStorage.getItem('tms_cart');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
  } catch (e) {
    state.cart = [];
  }

  // Initialize product default selections
  PRODUCTS.forEach(p => {
    state.productSelections[p.id] = {
      cutId: p.cuts && p.cuts.length ? p.cuts[0].id : 'default',
      qty: 1
    };
  });

  function saveCart() {
    try {
      localStorage.setItem('tms_cart', JSON.stringify(state.cart));
    } catch (e) {
      // Ignore quota errors
    }
  }

  function t(key) {
    const dict = I18N[state.lang] || I18N.bn;
    return dict[key] || I18N.bn[key] || key;
  }

  // ----------------------------------------------------------------------------
  // 4. TOAST NOTIFICATIONS
  // ----------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'status');

    const iconSvg = type === 'success'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38DFB0" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EE9C90" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 200ms ease, transform 200ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    }, 2800);
  }

  // ----------------------------------------------------------------------------
  // 5. VIEW ROUTER (SPA Multi-View Engine)
  // ----------------------------------------------------------------------------
  function switchView(viewName) {
    const validViews = ['retail', 'b2b', 'about', 'tracking', 'notfound'];
    const targetView = validViews.includes(viewName) ? viewName : 'retail';
    state.currentView = targetView;

    // Hide all views, show active
    document.querySelectorAll('.app-view').forEach(viewEl => {
      viewEl.classList.remove('active');
    });

    const activeEl = document.getElementById(`view-${targetView}`);
    if (activeEl) {
      activeEl.classList.add('active');
    }

    // Update Header Navigation link active classes
    document.querySelectorAll('.header-nav-menu .nav-link-btn').forEach(btn => {
      const btnView = btn.getAttribute('data-view');
      btn.classList.toggle('active', btnView === targetView);
    });

    // Update Customer Segment Switcher (Retail vs B2B)
    const retailModeBtn = document.getElementById('mode-retail-btn');
    const b2bModeBtn = document.getElementById('mode-b2b-btn');
    if (retailModeBtn && b2bModeBtn) {
      if (targetView === 'b2b') {
        b2bModeBtn.classList.add('active');
        retailModeBtn.classList.remove('active');
      } else {
        retailModeBtn.classList.add('active');
        b2bModeBtn.classList.remove('active');
      }
    }

    // Update URL hash without breaking page scroll if user just clicked
    if (window.location.hash !== `#${targetView}`) {
      window.history.replaceState(null, '', `#${targetView}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleHashChange() {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash || rawHash === 'retail') {
      switchView('retail');
    } else if (rawHash === 'b2b' || rawHash === 'b2b-wholesale') {
      switchView('b2b');
    } else if (rawHash === 'about') {
      switchView('about');
    } else if (rawHash === 'tracking') {
      switchView('tracking');
    } else if (rawHash === 'retail-catalog') {
      switchView('retail');
      setTimeout(() => {
        const cat = document.getElementById('retail-catalog');
        if (cat) cat.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      switchView('notfound');
    }
  }

  // ----------------------------------------------------------------------------
  // 6. PRODUCT CATALOG & CARD RENDERING
  // ----------------------------------------------------------------------------
  function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filtered = state.currentCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === state.currentCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--color-slate-500);">${t('drawer.empty')}</div>`;
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const isBn = state.lang === 'bn';
      const name = isBn ? product.name_bn : product.name_en;
      const desc = isBn ? product.desc_bn : product.desc_en;
      const unit = isBn ? product.unit_bn : product.unit_en;
      const badge = isBn ? product.badge_bn : product.badge_en;

      const currentSel = state.productSelections[product.id] || {
        cutId: product.cuts[0]?.id || 'default',
        qty: 1
      };

      const calculatedLinePrice = product.price * currentSel.qty;

      const cutsHtml = product.cuts.map(cut => {
        const cutName = isBn ? cut.name_bn : cut.name_en;
        const isActive = cut.id === currentSel.cutId ? 'active' : '';
        return `<button type="button" class="cut-chip-btn ${isActive}" data-product-id="${product.id}" data-cut-id="${cut.id}">${cutName}</button>`;
      }).join('');

      const qtyDisplay = isBn ? toBanglaNum(currentSel.qty) : currentSel.qty;
      const priceDisplay = formatPrice(calculatedLinePrice, state.lang);
      const unitPriceDisplay = isBn
        ? `প্রতি ${unit} ${formatPrice(product.price, state.lang)}`
        : `per ${unit} ${formatPrice(product.price, state.lang)}`;

      return `
        <article class="product-card" id="card-${product.id}">
          <div class="product-image-frame">
            <img src="${product.image}" alt="${name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80';" />
            <div class="card-badges-row">
              <span class="badge-pill ${product.badge_class}">${badge}</span>
              <span class="badge-pill badge-halal">${isBn ? '১০০% হালাল' : '100% Halal'}</span>
            </div>
          </div>

          <div class="product-card-body">
            <h3 class="product-title">${name}</h3>
            <p class="product-desc">${desc}</p>

            <div class="weight-yield-box">
              <div class="yield-row">
                <span class="yield-label">${isBn ? 'লাইভ ওজন গ্রস:' : 'Gross Live Weight:'}</span>
                <span class="yield-val tabular-numbers">${isBn ? '১,০০০ গ্রাম' : '1,000 g'}</span>
              </div>
              <div class="yield-row">
                <span class="yield-label">${isBn ? 'এয়ার-চিলড নেট মিট:' : 'Net Chilled Meat:'}</span>
                <span class="yield-val tabular-numbers" style="color: #0F7F63;">${isBn ? '৭৮০ - ৮২০ গ্রাম (১০০% ক্লিন)' : '780 - 820 g (100% Clean)'}</span>
              </div>
            </div>

            <div class="cut-selector-section">
              <div class="cut-selector-title">${t('card.cut_label')}</div>
              <div class="cut-chips-grid">
                ${cutsHtml}
              </div>
            </div>

            <div class="product-card-footer">
              <div class="weight-and-price-row">
                <div class="weight-stepper" aria-label="Quantity Stepper">
                  <button type="button" class="stepper-btn btn-qty-minus" data-product-id="${product.id}" aria-label="Decrease Quantity">−</button>
                  <span class="stepper-value tabular-numbers" id="qty-val-${product.id}">${qtyDisplay} ${unit}</span>
                  <button type="button" class="stepper-btn btn-qty-plus" data-product-id="${product.id}" aria-label="Increase Quantity">+</button>
                </div>
                <div class="card-price-block">
                  <div class="price-main tabular-numbers" id="card-price-${product.id}">${priceDisplay}</div>
                  <div class="price-sub">${unitPriceDisplay}</div>
                </div>
              </div>

              <button type="button" class="btn-add-cart" data-product-id="${product.id}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>${t('card.add_btn')}</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    bindProductCardEvents();
  }

  function bindProductCardEvents() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    // Cut chip selection
    grid.querySelectorAll('.cut-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product-id');
        const cutId = btn.getAttribute('data-cut-id');
        if (!state.productSelections[prodId]) {
          state.productSelections[prodId] = { cutId: 'default', qty: 1 };
        }
        state.productSelections[prodId].cutId = cutId;

        // Update active chip classes in this card
        const card = document.getElementById(`card-${prodId}`);
        if (card) {
          card.querySelectorAll('.cut-chip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // Quantity Minus
    grid.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product-id');
        const current = state.productSelections[prodId] || { cutId: 'default', qty: 1 };
        if (current.qty > 1) {
          current.qty -= 1;
          updateCardPriceDisplay(prodId);
        }
      });
    });

    // Quantity Plus
    grid.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = btn.getAttribute('data-product-id');
        const current = state.productSelections[prodId] || { cutId: 'default', qty: 1 };
        if (current.qty < 50) {
          current.qty += 1;
          updateCardPriceDisplay(prodId);
        }
      });
    });

    // Add to Cart
    grid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = btn.getAttribute('data-product-id');
        const product = PRODUCTS.find(p => p.id === prodId);
        if (!product) return;

        const selection = state.productSelections[prodId] || { cutId: product.cuts[0]?.id || 'default', qty: 1 };
        const selectedCutObj = product.cuts.find(c => c.id === selection.cutId) || product.cuts[0];

        // Create animation feedback
        animateAddToCartFeedback(e.currentTarget);

        // Add or increment in cart
        addToCart(product, selectedCutObj, selection.qty);
      });
    });
  }

  function updateCardPriceDisplay(prodId) {
    const product = PRODUCTS.find(p => p.id === prodId);
    if (!product) return;

    const current = state.productSelections[prodId];
    const isBn = state.lang === 'bn';
    const unit = isBn ? product.unit_bn : product.unit_en;

    const qtyValEl = document.getElementById(`qty-val-${prodId}`);
    if (qtyValEl) {
      qtyValEl.textContent = `${isBn ? toBanglaNum(current.qty) : current.qty} ${unit}`;
    }

    const priceValEl = document.getElementById(`card-price-${prodId}`);
    if (priceValEl) {
      priceValEl.textContent = formatPrice(product.price * current.qty, state.lang);
    }
  }

  function animateAddToCartFeedback(buttonEl) {
    const rect = buttonEl.getBoundingClientRect();
    const floating = document.createElement('div');
    floating.className = 'floating-badge';
    floating.textContent = state.lang === 'bn' ? '+১ টি ঝুড়িতে যুক্ত' : '+1 added to cart';
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${rect.top}px`;
    document.body.appendChild(floating);

    setTimeout(() => {
      if (floating.parentNode) floating.parentNode.removeChild(floating);
    }, 650);
  }

  // ----------------------------------------------------------------------------
  // 7. DELIVERY SLOTS RENDERING
  // ----------------------------------------------------------------------------
  function renderDeliverySlots() {
    const container = document.getElementById('slots-grid');
    if (!container) return;

    const isBn = state.lang === 'bn';

    container.innerHTML = DELIVERY_SLOTS.map(slot => {
      const time = isBn ? slot.time_bn : slot.time_en;
      const title = isBn ? slot.title_bn : slot.title_en;
      const desc = isBn ? slot.desc_bn : slot.desc_en;
      const isActive = slot.id === state.selectedSlot ? 'active' : '';

      return `
        <div class="slot-card ${isActive}" data-slot-id="${slot.id}" role="radio" aria-checked="${slot.id === state.selectedSlot}">
          <div class="slot-header">
            <h3 class="slot-title">${title}</h3>
            <div class="slot-check-icon">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
          <div class="slot-time tabular-numbers">${time}</div>
          <div class="slot-desc">${desc}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.slot-card').forEach(card => {
      card.addEventListener('click', () => {
        const slotId = card.getAttribute('data-slot-id');
        state.selectedSlot = slotId;
        container.querySelectorAll('.slot-card').forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
        showToast(state.lang === 'bn' ? 'ডেলিভারি স্লট নির্বাচিত হয়েছে' : 'Delivery slot updated');
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 8. CART & CHECKOUT DRAWER
  // ----------------------------------------------------------------------------
  function addToCart(product, cutObj, qty) {
    const cutId = cutObj ? cutObj.id : 'default';
    const cutNameBn = cutObj ? cutObj.name_bn : 'স্ট্যান্ডার্ড কাট';
    const cutNameEn = cutObj ? cutObj.name_en : 'Standard Cut';

    const existingIndex = state.cart.findIndex(item => item.productId === product.id && item.cutId === cutId);

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += qty;
    } else {
      state.cart.push({
        productId: product.id,
        name_bn: product.name_bn,
        name_en: product.name_en,
        price: product.price,
        unit_bn: product.unit_bn,
        unit_en: product.unit_en,
        image: product.image,
        cutId: cutId,
        cutName_bn: cutNameBn,
        cutName_en: cutNameEn,
        qty: qty
      });
    }

    saveCart();
    renderCart();
    showToast(state.lang === 'bn' ? `${product.name_bn} ঝুড়িতে যোগ করা হয়েছে` : `${product.name_en} added to cart`);
  }

  function renderCart() {
    const headerCount = document.getElementById('header-cart-count');
    const drawerBadge = document.getElementById('drawer-items-count-badge');
    const emptyState = document.getElementById('empty-cart-state');
    const cartWrapper = document.getElementById('cart-content-wrapper');
    const itemsList = document.getElementById('cart-items-list');
    const footer = document.getElementById('drawer-checkout-footer');

    const totalItemCount = state.cart.reduce((sum, item) => sum + item.qty, 0);

    if (headerCount) {
      headerCount.textContent = state.lang === 'bn' ? toBanglaNum(totalItemCount) : totalItemCount;
    }

    if (drawerBadge) {
      drawerBadge.textContent = state.lang === 'bn'
        ? `${toBanglaNum(totalItemCount)} টি`
        : `${totalItemCount} items`;
    }

    if (!itemsList || !emptyState || !footer) return;

    if (state.cart.length === 0) {
      emptyState.style.display = 'block';
      if (cartWrapper) cartWrapper.style.display = 'none';
      itemsList.innerHTML = '';
      footer.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    if (cartWrapper) cartWrapper.style.display = 'block';
    footer.style.display = 'block';

    const isBn = state.lang === 'bn';

    itemsList.innerHTML = state.cart.map((item, index) => {
      const name = isBn ? item.name_bn : item.name_en;
      const cutName = isBn ? item.cutName_bn : item.cutName_en;
      const unit = isBn ? item.unit_bn : item.unit_en;
      const lineTotal = item.price * item.qty;

      return `
        <div class="cart-item-card" data-cart-index="${index}">
          <img src="${item.image}" alt="${name}" class="cart-item-thumb" />
          <div class="cart-item-info">
            <div class="cart-item-title" title="${name}">${name}</div>
            <div class="cart-item-cut-badge">${cutName}</div>
            <div class="cart-item-footer">
              <div class="weight-stepper" style="border-radius: var(--radius-control);">
                <button type="button" class="stepper-btn cart-qty-minus" data-index="${index}" aria-label="Decrease quantity" style="width:28px; height:28px; font-size:14px;">−</button>
                <span class="stepper-value tabular-numbers" style="padding: 0 6px; font-size:12px;">${isBn ? toBanglaNum(item.qty) : item.qty} ${unit}</span>
                <button type="button" class="stepper-btn cart-qty-plus" data-index="${index}" aria-label="Increase quantity" style="width:28px; height:28px; font-size:14px;">+</button>
              </div>
              <div class="cart-item-price tabular-numbers">${formatPrice(lineTotal, state.lang)}</div>
              <button type="button" class="cart-item-remove-btn" data-index="${index}" aria-label="Remove item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Update Totals
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const deliveryFee = AREA_FEES[state.selectedArea] || 40;
    const grandTotal = subtotal + deliveryFee;

    const subtotalEl = document.getElementById('drawer-subtotal');
    const deliveryFeeEl = document.getElementById('drawer-delivery-fee');
    const grandTotalEl = document.getElementById('drawer-grand-total');
    const stickyTotalEl = document.getElementById('drawer-sticky-total');

    const formattedGrandTotal = formatPrice(grandTotal, state.lang);

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal, state.lang);
    if (deliveryFeeEl) deliveryFeeEl.textContent = formatPrice(deliveryFee, state.lang);
    if (grandTotalEl) grandTotalEl.textContent = formattedGrandTotal;
    if (stickyTotalEl) stickyTotalEl.textContent = formattedGrandTotal;

    // Bind item actions inside cart
    itemsList.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        if (state.cart[idx].qty > 1) {
          state.cart[idx].qty -= 1;
        } else {
          state.cart.splice(idx, 1);
        }
        saveCart();
        renderCart();
      });
    });

    itemsList.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.cart[idx].qty += 1;
        saveCart();
        renderCart();
      });
    });

    itemsList.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        state.cart.splice(idx, 1);
        saveCart();
        renderCart();
        showToast(state.lang === 'bn' ? 'পণ্যটি ঝুড়ি থেকে সরানো হয়েছে' : 'Item removed from cart', 'info');
      });
    });
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // ----------------------------------------------------------------------------
  // 9. B2B BULK CALCULATOR & WHATSAPP DIRECT ORDER
  // ----------------------------------------------------------------------------
  function updateB2BQuote() {
    const varietySelect = document.getElementById('b2b-variety-select');
    const cutSelect = document.getElementById('b2b-cut-select');
    const volumeInput = document.getElementById('b2b-volume-input');
    const discountBadge = document.getElementById('b2b-discount-badge');
    const estTotalEl = document.getElementById('b2b-est-total');

    if (!varietySelect || !volumeInput || !discountBadge || !estTotalEl) return;

    const prodId = varietySelect.value;
    const product = PRODUCTS.find(p => p.id === prodId) || PRODUCTS[1]; // default Sonali
    const volume = Math.max(10, Math.min(1000, parseFloat(volumeInput.value) || 10));

    let discountPercent = 0;
    let discountText = state.lang === 'bn' ? 'কোনো ছাড় প্রযোজ্য নয়' : 'No discount applied';

    if (volume >= 50) {
      discountPercent = 12;
      discountText = state.lang === 'bn' ? '১২% বিশেষ কন্ট্রাক্ট রেট' : '12% Special Contract Discount';
    } else if (volume >= 26) {
      discountPercent = 8;
      discountText = state.lang === 'bn' ? '৮% হোলসেল ডিসকাউন্ট' : '8% Wholesale Discount';
    } else if (volume >= 10) {
      discountPercent = 5;
      discountText = state.lang === 'bn' ? '৫% বাল্ক ডিসকাউন্ট' : '5% Bulk Discount';
    }

    const rawTotal = product.price * volume;
    const discountedTotal = Math.round(rawTotal * (1 - discountPercent / 100));

    discountBadge.textContent = discountText;
    estTotalEl.textContent = formatPrice(discountedTotal, state.lang);
  }

  function handleB2BSubmit(e) {
    e.preventDefault();
    const restNameInput = document.getElementById('b2b-rest-name');
    const phoneInput = document.getElementById('b2b-phone');
    const varietySelect = document.getElementById('b2b-variety-select');
    const cutSelect = document.getElementById('b2b-cut-select');
    const volumeInput = document.getElementById('b2b-volume-input');
    const slotSelect = document.getElementById('b2b-slot-select');

    if (!restNameInput || !phoneInput || !varietySelect || !cutSelect || !volumeInput) return;

    const restName = restNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const volume = volumeInput.value;
    const varietyText = varietySelect.options[varietySelect.selectedIndex]?.text || '';
    const cutText = cutSelect.options[cutSelect.selectedIndex]?.text || '';
    const slotText = slotSelect.options[slotSelect.selectedIndex]?.text || '';

    if (!restName || !phone) {
      showToast(state.lang === 'bn' ? 'অনুগ্রহ করে প্রতিষ্ঠানের নাম ও ফোন নম্বর পূরণ করুন' : 'Please provide business name and phone', 'info');
      return;
    }

    const msg = `*নতুন B2B হোলসেল অনুসন্ধান - তোমার মুরগি স্টোর*\n\n` +
      `🏢 প্রতিষ্ঠানের নাম: ${restName}\n` +
      `📱 ম্যানেজার ফোন: ${phone}\n` +
      `🍗 মুরগির ধরন: ${varietyText}\n` +
      `🔪 কাটিং স্পেক: ${cutText}\n` +
      `⚖️ প্রতিদিনের চাহিদা: ${volume} কেজি\n` +
      `⏰ রিসিভিং স্লট: ${slotText}\n\n` +
      `দয়া করে আজকের কনফার্মড রেট ও সাপ্লাই কন্ট্রাক্ট পাঠান।`;

    const whatsappUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    showToast(state.lang === 'bn' ? 'হোয়াটসঅ্যাপে কোটেশন তৈরি করা হয়েছে' : 'WhatsApp inquiry generated!');
  }

  // ----------------------------------------------------------------------------
  // 10. ORDER TRACKING LOGIC
  // ----------------------------------------------------------------------------
  const MOCK_TRACKING = {
    'TMS-89241': {
      statusStep: 3,
      eta: '২৫ মিনিট বাকি',
      eta_en: '25 mins left',
      rider: 'আরিফুর রহমান',
      van: 'কোল্ড ডেলিভারি ভ্যান #০৪ (গুলশান রুট)',
      temp: '৩.৮° সে. ফ্রেশ কুল',
      times: ['০৮:১৫ AM', '০৮:৩০ AM', '০৮:৪৫ AM', '০৯:১৫ AM']
    },
    'TMS-10482': {
      statusStep: 2,
      eta: '৪৫ মিনিট বাকি',
      eta_en: '45 mins left',
      rider: 'শফিকুল ইসলাম',
      van: 'কোল্ড ডেলিভারি ভ্যান #০২ (ধানমন্ডি রুট)',
      temp: '৪.০° সে. ফ্রেশ কুল',
      times: ['০৯:০০ AM', '০৯:১৫ AM', '০৯:৪৫ AM', '১০:১৫ AM']
    },
    'TMS-55019': {
      statusStep: 4,
      eta: 'সফলভাবে ডেলিভার্ড',
      eta_en: 'Delivered',
      rider: 'মো: কামাল হোসেন',
      van: 'কোল্ড ডেলিভারি ভ্যান #০৭ (উত্তরা রুট)',
      temp: '৩.৬° সে.',
      times: ['০৭:০০ AM', '০৭:২০ AM', '০৭:৪৫ AM', '০৮:১০ AM']
    }
  };

  function trackOrder(orderId, isSilent = false) {
    const cleanId = (orderId || '').trim().toUpperCase();
    const trackData = MOCK_TRACKING[cleanId] || {
      statusStep: 1,
      eta: 'যাচাইকরণ চলছে (৩৫ মিনিট)',
      eta_en: 'Verification in progress (35 mins)',
      rider: 'কোল্ড চেইন কন্ট্রোল টিম',
      van: 'সেন্ট্রাল প্রসেসিং হাব',
      temp: '৩.৯° সে.',
      times: ['১০:০০ AM', '১০:১৫ AM', '১০:৩০ AM', '১১:০০ AM']
    };

    const dispId = document.getElementById('track-disp-id');
    const dispEta = document.getElementById('track-disp-eta');
    const timelineList = document.getElementById('tracking-timeline-list');

    if (dispId) dispId.textContent = cleanId;
    if (dispEta) dispEta.textContent = state.lang === 'bn' ? trackData.eta : trackData.eta_en;

    if (timelineList) {
      const isBn = state.lang === 'bn';
      const steps = [
        { title: t('track.step1'), time: trackData.times[0] },
        { title: t('track.step2'), time: trackData.times[1] },
        { title: t('track.step3'), time: trackData.times[2] },
        { title: t('track.step4'), time: trackData.times[3] }
      ];

      timelineList.innerHTML = steps.map((step, idx) => {
        const stepNum = idx + 1;
        let stepClass = '';
        let statusBadge = '';

        if (stepNum < trackData.statusStep) {
          stepClass = 'completed';
          statusBadge = isBn ? '(সম্পন্ন)' : '(Completed)';
        } else if (stepNum === trackData.statusStep) {
          stepClass = 'current';
          statusBadge = isBn ? '(বর্তমান ধাপ)' : '(Active)';
        } else {
          statusBadge = isBn ? '(প্রক্রিয়াধীন)' : '(Pending)';
        }

        return `
          <div class="timeline-step-item ${stepClass}">
            <div class="timeline-step-dot"></div>
            <div class="timeline-step-title">${step.title}</div>
            <div class="timeline-step-time tabular-numbers">${step.time} ${statusBadge}</div>
          </div>
        `;
      }).join('');
    }

    if (!isSilent) {
      showToast(state.lang === 'bn' ? `অর্ডার ${cleanId} এর তথ্য হালনাগাদ করা হয়েছে` : `Tracking data updated for ${cleanId}`);
    }
  }

  // ----------------------------------------------------------------------------
  // 11. MODALS (Privacy & Success)
  // ----------------------------------------------------------------------------
  function openPrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePrivacyModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  function openOrderSuccessModal(orderId) {
    const modal = document.getElementById('order-success-modal');
    const orderIdEl = document.getElementById('success-order-id');
    if (modal) {
      if (orderIdEl) orderIdEl.textContent = orderId;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeOrderSuccessModal() {
    const modal = document.getElementById('order-success-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // ----------------------------------------------------------------------------
  // 12. LANGUAGE SWITCHER (Full UI Re-render & DOM sync)
  // ----------------------------------------------------------------------------
  function updateDropdowns(lang) {
    // 1. Global Area Select
    const areaSelect = document.getElementById('global-area-select');
    if (areaSelect) {
      const currentVal = areaSelect.value;
      const opts = AREA_OPTIONS[lang] || AREA_OPTIONS.bn;
      areaSelect.innerHTML = opts.map(o => `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label}</option>`).join('');
    }

    // 2. B2B Variety Select
    const varietySelect = document.getElementById('b2b-variety-select');
    if (varietySelect) {
      const currentVal = varietySelect.value;
      const opts = B2B_VARIETY_OPTIONS[lang] || B2B_VARIETY_OPTIONS.bn;
      varietySelect.innerHTML = opts.map(o => `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label}</option>`).join('');
    }

    // 3. B2B Cut Select
    const cutSelect = document.getElementById('b2b-cut-select');
    if (cutSelect) {
      const currentVal = cutSelect.value;
      const opts = B2B_CUT_OPTIONS[lang] || B2B_CUT_OPTIONS.bn;
      cutSelect.innerHTML = opts.map(o => `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label}</option>`).join('');
    }

    // 4. B2B Slot Select
    const slotSelect = document.getElementById('b2b-slot-select');
    if (slotSelect) {
      const currentVal = slotSelect.value;
      const opts = B2B_SLOT_OPTIONS[lang] || B2B_SLOT_OPTIONS.bn;
      slotSelect.innerHTML = opts.map(o => `<option value="${o.value}" ${o.value === currentVal ? 'selected' : ''}>${o.label}</option>`).join('');
    }

    // 5. Placeholders & Dynamic Inputs
    const b2bRestName = document.getElementById('b2b-rest-name');
    if (b2bRestName) {
      b2bRestName.placeholder = lang === 'bn' ? "যেমন: সুলতান'স ডাইন / ধানমন্ডি কিচেন" : "e.g. Sultan's Dine / Dhanmondi Kitchen";
    }

    const trackingInput = document.getElementById('tracking-input-id');
    if (trackingInput) {
      trackingInput.placeholder = lang === 'bn' ? 'যেমন: TMS-89241' : 'e.g. TMS-89241';
    }

    const checkoutName = document.getElementById('checkout-name');
    if (checkoutName) {
      checkoutName.placeholder = lang === 'bn' ? 'যেমন: মো: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed';
    }

    const checkoutAddress = document.getElementById('checkout-address');
    if (checkoutAddress) {
      checkoutAddress.placeholder = lang === 'bn' ? 'বাসা # ১২, রোড # ৪, ব্লক # সি, বনানী' : 'House # 12, Road # 4, Block # C, Banani';
    }
  }

  function setLanguage(lang) {
    state.lang = lang;
    localStorage.setItem('tms_lang', lang);
    document.documentElement.lang = lang;

    const langLabel = document.getElementById('current-lang-label');
    if (langLabel) {
      langLabel.textContent = lang === 'bn' ? 'বাংলা' : 'English';
    }

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = t(key);
      if (translation) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const translation = t(key);
      if (translation) {
        el.placeholder = translation;
      }
    });

    // Update Dropdowns and Select Lists
    updateDropdowns(lang);

    // Re-render Dynamic components
    renderProducts();
    renderDeliverySlots();
    renderCart();
    updateB2BQuote();

    // Refresh Tracking Display if active (silent)
    const trackDispId = document.getElementById('track-disp-id');
    if (trackDispId && trackDispId.textContent) {
      trackOrder(trackDispId.textContent, true);
    }

    // Re-position Category Tab Indicator
    updateTabIndicator();
  }

  function toggleLanguage() {
    const newLang = state.lang === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
    showToast(newLang === 'bn' ? 'ভাষা বাংলায় পরিবর্তিত হয়েছে' : 'Language switched to English');
  }

  // ----------------------------------------------------------------------------
  // 13. TABS INDICATOR ANIMATION
  // ----------------------------------------------------------------------------
  function updateTabIndicator() {
    const nav = document.getElementById('category-tabs-nav');
    const indicator = document.getElementById('tab-active-indicator');
    const activeBtn = nav ? nav.querySelector('.category-tab-btn.active') : null;

    if (nav && indicator && activeBtn) {
      indicator.style.left = `${activeBtn.offsetLeft}px`;
      indicator.style.width = `${activeBtn.offsetWidth}px`;
    }
  }

  // ----------------------------------------------------------------------------
  // 14. EVENT LISTENERS SETUP (Direct & Bulletproof)
  // ----------------------------------------------------------------------------
  function initEventListeners() {
    // Hash routing
    window.addEventListener('hashchange', handleHashChange);

    // Customer Segment Switchers (Header Mode Buttons)
    const retailModeBtn = document.getElementById('mode-retail-btn');
    const b2bModeBtn = document.getElementById('mode-b2b-btn');

    if (retailModeBtn) {
      retailModeBtn.addEventListener('click', () => switchView('retail'));
    }
    if (b2bModeBtn) {
      b2bModeBtn.addEventListener('click', () => switchView('b2b'));
    }

    // Navigation Links
    document.querySelectorAll('[data-view]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = link.getAttribute('data-view');
        switchView(view);
      });
    });

    // Hero CTAs
    const heroBrowseCta = document.getElementById('hero-browse-cta');
    const heroB2bCta = document.getElementById('hero-b2b-cta');

    if (heroBrowseCta) {
      heroBrowseCta.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('retail');
        setTimeout(() => {
          const catalog = document.getElementById('retail-catalog');
          if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    }

    if (heroB2bCta) {
      heroB2bCta.addEventListener('click', () => switchView('b2b'));
    }

    // Language Toggle
    const langBtn = document.getElementById('lang-switch-btn');
    if (langBtn) {
      langBtn.addEventListener('click', toggleLanguage);
    }

    // Cart Drawer Triggers
    const cartTriggerBtn = document.getElementById('cart-trigger-btn');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');
    const emptyBrowseBtn = document.getElementById('drawer-empty-browse-btn');

    if (cartTriggerBtn) cartTriggerBtn.addEventListener('click', openCartDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeCartDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeCartDrawer);
    if (emptyBrowseBtn) {
      emptyBrowseBtn.addEventListener('click', () => {
        closeCartDrawer();
        switchView('retail');
        setTimeout(() => {
          const cat = document.getElementById('retail-catalog');
          if (cat) cat.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    }

    // Global Area Select
    const areaSelect = document.getElementById('global-area-select');
    if (areaSelect) {
      areaSelect.addEventListener('change', (e) => {
        state.selectedArea = e.target.value;
        renderCart();
        showToast(state.lang === 'bn' ? 'ডেলিভারি এরিয়া আপডেট হয়েছে' : 'Delivery area updated');
      });
    }

    // Category Tabs
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentCategory = btn.getAttribute('data-category');
        updateTabIndicator();
        renderProducts();
      });
    });

    // Payment Mode Switcher in Drawer
    const paymentOptions = document.getElementById('payment-method-options');
    if (paymentOptions) {
      paymentOptions.querySelectorAll('.payment-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          paymentOptions.querySelectorAll('.payment-tile').forEach(t => t.classList.remove('active'));
          tile.classList.add('active');
          state.paymentMethod = tile.getAttribute('data-method');
        });
      });
    }

    // Checkout Form Submit
    const checkoutForm = document.getElementById('checkout-form');
    const confirmTriggerBtn = document.getElementById('btn-confirm-order-trigger');

    if (confirmTriggerBtn && checkoutForm) {
      confirmTriggerBtn.addEventListener('click', () => {
        if (checkoutForm.requestSubmit) {
          checkoutForm.requestSubmit();
        } else {
          checkoutForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      });
    }

    if (checkoutForm) {
      checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('checkout-name');
        const phoneInput = document.getElementById('checkout-phone');
        const addressInput = document.getElementById('checkout-address');

        if (!nameInput || !phoneInput || !addressInput) return;

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();

        if (!name || !phone || !address) {
          showToast(state.lang === 'bn' ? 'অনুগ্রহ করে সকল ঘর পূরণ করুন' : 'Please fill all required fields', 'info');
          return;
        }

        if (state.cart.length === 0) {
          showToast(state.lang === 'bn' ? 'আপনার ঝুড়ি খালি' : 'Your cart is empty', 'info');
          return;
        }

        // Generate Order ID
        const newOrderId = `TMS-${Math.floor(10000 + Math.random() * 90000)}`;

        // Save order in mock tracking
        MOCK_TRACKING[newOrderId] = {
          statusStep: 1,
          eta: '৩৫ মিনিট বাকি',
          eta_en: '35 mins left',
          rider: 'মো: আল-আমিন',
          van: 'কোল্ড ডেলিভারি ভ্যান #০৫',
          temp: '৩.৮° সে.',
          times: [
            new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
            'প্রক্রিয়াধীন',
            'প্রক্রিয়াধীন',
            'প্রক্রিয়াধীন'
          ]
        };

        // Clear cart
        state.cart = [];
        saveCart();
        renderCart();
        closeCartDrawer();
        checkoutForm.reset();

        // Show Success Modal
        openOrderSuccessModal(newOrderId);
      });
    }

    // Success Modal Buttons
    const btnSuccessDismiss = document.getElementById('btn-success-dismiss');
    const btnSuccessTrack = document.getElementById('btn-success-track');

    if (btnSuccessDismiss) {
      btnSuccessDismiss.addEventListener('click', closeOrderSuccessModal);
    }
    if (btnSuccessTrack) {
      btnSuccessTrack.addEventListener('click', () => {
        const orderIdEl = document.getElementById('success-order-id');
        const orderId = orderIdEl ? orderIdEl.textContent : 'TMS-89241';
        closeOrderSuccessModal();
        switchView('tracking');
        const trackInput = document.getElementById('tracking-input-id');
        if (trackInput) trackInput.value = orderId;
        trackOrder(orderId);
      });
    }

    // Privacy Modal
    const privacyTrigger = document.getElementById('footer-privacy-trigger');
    const privacyCloseBtn = document.getElementById('privacy-close-btn');
    const privacyAgreeBtn = document.getElementById('privacy-agree-btn');
    const privacyModal = document.getElementById('privacy-modal');

    if (privacyTrigger) privacyTrigger.addEventListener('click', openPrivacyModal);
    if (privacyCloseBtn) privacyCloseBtn.addEventListener('click', closePrivacyModal);
    if (privacyAgreeBtn) privacyAgreeBtn.addEventListener('click', closePrivacyModal);
    if (privacyModal) {
      privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) closePrivacyModal();
      });
    }

    // B2B Quote Form
    const b2bForm = document.getElementById('b2b-quote-form');
    if (b2bForm) {
      b2bForm.addEventListener('submit', handleB2BSubmit);
    }

    const b2bVariety = document.getElementById('b2b-variety-select');
    const b2bVolume = document.getElementById('b2b-volume-input');
    const b2bCut = document.getElementById('b2b-cut-select');
    const b2bSlot = document.getElementById('b2b-slot-select');

    if (b2bVariety) b2bVariety.addEventListener('change', updateB2BQuote);
    if (b2bVolume) b2bVolume.addEventListener('input', updateB2BQuote);
    if (b2bCut) b2bCut.addEventListener('change', updateB2BQuote);
    if (b2bSlot) b2bSlot.addEventListener('change', updateB2BQuote);

    // Tracking Form
    const trackForm = document.getElementById('tracking-search-form');
    const trackInput = document.getElementById('tracking-input-id');

    if (trackForm && trackInput) {
      trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        trackOrder(trackInput.value);
      });
    }

    // Sample Tracking ID Chips
    document.querySelectorAll('.sample-id-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        if (trackInput) trackInput.value = id;
        trackOrder(id);
      });
    });

    // 404 Return Button
    const btnBackHome = document.getElementById('btn-back-home');
    if (btnBackHome) {
      btnBackHome.addEventListener('click', () => switchView('retail'));
    }

    // Escape Key Handler for Modals and Drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closePrivacyModal();
        closeOrderSuccessModal();
      }
    });

    // Window Resize Handler for Tabs
    window.addEventListener('resize', updateTabIndicator);
  }

  // ----------------------------------------------------------------------------
  // 15. INITIALIZATION
  // ----------------------------------------------------------------------------
  function init() {
    setLanguage(state.lang);
    handleHashChange();
    initEventListeners();
    updateTabIndicator();
    updateB2BQuote();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
