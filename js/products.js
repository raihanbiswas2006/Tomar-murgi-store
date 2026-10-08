/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Product Catalog Data with Bangladeshi Poultry Specifics, Dressed Yields, and CDN Images
 */

export const PRODUCTS = [
  {
    id: 'prod-broiler',
    category: 'broiler',
    nameBn: 'তাজা ফার্ম ব্রয়লার মুরগি (লাইভ)',
    nameEn: 'Fresh Farm Broiler Chicken (Live)',
    descBn: 'দৈনিক ফার্ম ফ্রেশ ব্রয়লার। পরিষ্কার ঠান্ডা পানিতে স্বাস্থ্যসম্মত ড্রেসিং ও স্কিনসহ/ছাড়া ফ্রি কাটিং।',
    descEn: 'Daily farm-fresh broiler. Air-chilled, hygienic free dressing with whole or custom cut option.',
    pricePerKg: 215,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.5,
    minWeight: 1.0,
    maxWeight: 3.5,
    weightStep: 0.25,
    yieldRatio: 0.76, // 76% dressed yield
    badges: ['fresh', 'halal'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['whole', 'curry', 'biryani', 'skinless']
  },
  {
    id: 'prod-sonali',
    category: 'sonali',
    nameBn: 'প্রিমিয়াম সোনালী মুরগি (ক্লাসিক)',
    nameEn: 'Premium Sonali Chicken (Classic)',
    descBn: 'আসল সোনালী মুরগি, শক্ত ও সুস্বাদু মাংস। বিরিয়ানি ও স্পেশাল রোস্টের জন্য শ্রেষ্ঠ পছন্দ।',
    descEn: 'Authentic Sonali chicken, tender and firm texture. Best suited for biryani and traditional roast.',
    pricePerKg: 330,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.2,
    minWeight: 0.8,
    maxWeight: 2.0,
    weightStep: 0.1,
    yieldRatio: 0.72,
    badges: ['fresh', 'halal', 'organic'],
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['whole', 'curry', 'biryani', 'skinless']
  },
  {
    id: 'prod-deshi',
    category: 'deshi',
    nameBn: 'খাঁটি দেশি মুরগি (ফ্রি-রেঞ্জ গ্রাম্য)',
    nameEn: 'Authentic Deshi Free-Range Chicken',
    descBn: 'গ্রামাঞ্চল থেকে সংগৃহীত প্রাকৃতিক খাদ্যে পালিত খাঁটি দেশি মুরগি। শতভাগ নির্ভেজাল পুষ্টি।',
    descEn: 'Naturally grazed free-range village poultry. Rich flavor and 100% natural organic feed.',
    pricePerKg: 640,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.0,
    minWeight: 0.7,
    maxWeight: 1.8,
    weightStep: 0.1,
    yieldRatio: 0.68,
    badges: ['fresh', 'deshi', 'organic'],
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['whole', 'curry', 'biryani']
  },
  {
    id: 'prod-cock-layer',
    category: 'layer',
    nameBn: 'কক / ফার্ম লেয়ার মুরগি',
    nameEn: 'Cock / Red Layer Farm Chicken',
    descBn: 'শক্ত আঁশের সুস্বাদু লাল লেয়ার মুরগি। ঐতিহ্যবাহী লাল ঝোলের কারির জন্য অনন্য।',
    descEn: 'Firm fibrous red layer chicken. Perfect for traditional slow-cooked rich gravies and curry.',
    pricePerKg: 295,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.4,
    minWeight: 1.0,
    maxWeight: 2.5,
    weightStep: 0.2,
    yieldRatio: 0.71,
    badges: ['fresh', 'halal'],
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['whole', 'curry', 'biryani', 'skinless']
  },
  {
    id: 'prod-boneless-breast',
    category: 'cuts',
    nameBn: 'তাজা বোনলেস চিকেন ব্রেস্ট ফিলে',
    nameEn: 'Fresh Boneless Chicken Breast Fillet',
    descBn: '১০০% চর্বিহীন হাড় ছাড়া ফ্রেশ ব্রেস্ট ফিলে। জিম ডায়েট, গ্রিল, নাগেটস ও ফিঙ্গারের জন্য আদর্শ।',
    descEn: '100% lean boneless breast fillet. Ideal for fitness diet, grilling, tenders, and homemade patties.',
    pricePerKg: 490,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.0,
    minWeight: 0.5,
    maxWeight: 5.0,
    weightStep: 0.25,
    yieldRatio: 1.0, // net weight already
    badges: ['fresh', 'halal'],
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['boneless', 'curry']
  },
  {
    id: 'prod-curry-pieces',
    category: 'cuts',
    nameBn: 'ড্রামস্টিক ও স্কিনলেস কারি পিস',
    nameEn: 'Drumsticks & Skinless Curry Cuts',
    descBn: 'রেডি-টু-কুক স্কিনলেস ড্রামস্টিক ও থাই কারি কাট। ধুয়ে সরাসরি রান্নার জন্য প্রস্তুত।',
    descEn: 'Ready-to-cook clean skinless drumsticks and thigh curry cuts. Cleaned and prepped for the wok.',
    pricePerKg: 420,
    unit: 'kg',
    isWeightBased: true,
    defaultWeight: 1.0,
    minWeight: 0.5,
    maxWeight: 4.0,
    weightStep: 0.25,
    yieldRatio: 1.0,
    badges: ['fresh', 'halal'],
    image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&w=800&q=80',
    availableCuts: ['curry', 'biryani']
  },
  {
    id: 'prod-organic-eggs',
    category: 'eggs',
    nameBn: 'ফার্ম ফ্রেশ অর্গানিক লাল ডিম (১২ পিস)',
    nameEn: 'Farm Fresh Organic Red Eggs (12 pcs)',
    descBn: 'প্রাকৃতিক ও ভিটামিন সমৃদ্ধ লাল ডিমের ১ ডজন কেস। অক্ষত ও পরিষ্কার গ্রেডেড প্যাকিং।',
    descEn: 'Farm fresh high-protein graded brown eggs case of 12. Intact hygiene packaging.',
    pricePerKg: 155, // price per dozen case
    unit: 'dozen',
    isWeightBased: false,
    defaultWeight: 1, // 1 dozen
    minWeight: 1,
    maxWeight: 10,
    weightStep: 1,
    yieldRatio: 1.0,
    badges: ['organic', 'fresh'],
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80',
    availableCuts: []
  }
];

export const CUT_OPTIONS = {
  whole: {
    id: 'whole',
    labelBn: 'গোটা মুরগি',
    subBn: 'স্কিনসহ/ছাড়া সম্পূর্ণ ড্রেসড',
    labelEn: 'Whole Bird',
    subEn: 'Complete dressed bird',
    priceMultiplier: 1.0
  },
  curry: {
    id: 'curry',
    labelBn: 'কারি কাট',
    subBn: '৮-১২ পিস রেগুলার সাইজ',
    labelEn: 'Curry Cut',
    subEn: '8-12 regular pieces',
    priceMultiplier: 1.0
  },
  biryani: {
    id: 'biryani',
    labelBn: 'বিরিয়ানি কাট',
    subBn: '৪টি বড় রাজকীয় পিস',
    labelEn: 'Biryani Cut',
    subEn: '4 large roast cuts',
    priceMultiplier: 1.0
  },
  skinless: {
    id: 'skinless',
    labelBn: 'স্কিনলেস কাট',
    subBn: 'চামড়া ছাড়ানো পরিচ্ছন্ন পিস',
    labelEn: 'Skinless Cut',
    subEn: 'Skin removed cuts',
    priceMultiplier: 1.03
  },
  boneless: {
    id: 'boneless',
    labelBn: 'বোনলেস ফিলে',
    subBn: 'হাড় ছাড়া সলিড মাংস',
    labelEn: 'Boneless Fillet',
    subEn: 'Bone-free prime cuts',
    priceMultiplier: 1.15
  }
};

export const DHAKA_AREAS = [
  { id: 'gulshan', nameBn: 'গুলশান (১ ও ২)', nameEn: 'Gulshan (1 & 2)', deliveryFee: 40 },
  { id: 'banani', nameBn: 'বনানী ও ডিওএইচএস', nameEn: 'Banani & DOHS', deliveryFee: 40 },
  { id: 'dhanmondi', nameBn: 'ধানমন্ডি ও জিগাতলা', nameEn: 'Dhanmondi & Jigatola', deliveryFee: 50 },
  { id: 'uttara', nameBn: 'উত্তরা (সেক্টর ১-১৮)', nameEn: 'Uttara (Sectors 1-18)', deliveryFee: 60 },
  { id: 'mirpur', nameBn: 'মিরপুর (১-১৪ ও ডিওএইচএস)', nameEn: 'Mirpur (1-14 & DOHS)', deliveryFee: 50 },
  { id: 'mohammadpur', nameBn: 'মোহাম্মদপুর ও আদাবর', nameEn: 'Mohammadpur & Adabor', deliveryFee: 50 },
  { id: 'bashundhara', nameBn: 'বসুন্ধরা আ/এ', nameEn: 'Bashundhara R/A', deliveryFee: 50 },
  { id: 'badda', nameBn: 'বাড্ডা ও রামপুরা', nameEn: 'Badda & Rampura', deliveryFee: 45 },
  { id: 'motijheel', nameBn: 'মতিঝিল ও পল্টন', nameEn: 'Motijheel & Paltan', deliveryFee: 60 }
];

export const DELIVERY_SLOTS = [
  {
    id: 'morning',
    titleBn: 'সকালের তাজা স্লট',
    titleEn: 'Morning Fresh Slot',
    timeBn: 'সকাল ৭:০০ - ১০:০০',
    timeEn: '7:00 AM - 10:00 AM',
    descBn: 'দিনের প্রথম জবেহের তাজা মুরগি',
    descEn: 'First fresh cold-chain batch of the day'
  },
  {
    id: 'afternoon',
    titleBn: 'দুপুরের এক্সপ্রেস স্লট',
    titleEn: 'Afternoon Fast Slot',
    timeBn: 'দুপুর ১২:০০ - ৩:০০',
    timeEn: '12:00 PM - 3:00 PM',
    descBn: 'দুপুরের রান্নার দ্রুত ডেলিভারি',
    descEn: 'Prompt delivery for family lunch prep'
  },
  {
    id: 'evening',
    titleBn: 'সান্ধ্য ডিনার স্লট',
    titleEn: 'Evening Dinner Slot',
    timeBn: 'বিকাল ৫:০০ - রাত ৮:০০',
    timeEn: '5:00 PM - 8:00 PM',
    descBn: 'অফিস ফেরত সময় ফ্রেশ ডেলিভারি',
    descEn: 'Evening fresh cuts for dinner prep'
  },
  {
    id: 'restaurant-early',
    titleBn: 'রেস্টুরেন্ট কিচেন এক্সপ্রেস',
    titleEn: 'Commercial Kitchen Express',
    timeBn: 'ভোর ৫:০০ - সকাল ৭:০০',
    timeEn: '5:00 AM - 7:00 AM',
    descBn: 'হোটেল ও ক্যাটারিংয়ের বাল্ক সরবরাহ',
    descEn: 'Dedicated early-morning commercial kitchen slot'
  }
];

export const B2B_TIERS = [
  {
    id: 'tier-1',
    minKg: 10,
    maxKg: 25,
    discountPercent: 5,
    labelBn: '১০ কেজি - ২৫ কেজি',
    labelEn: '10kg - 25kg',
    perksBn: '৫% হোলসেল ডিসকাউন্ট',
    perksEn: '5% Wholesale Discount'
  },
  {
    id: 'tier-2',
    minKg: 26,
    maxKg: 50,
    discountPercent: 8,
    labelBn: '২৬ কেজি - ৫০ কেজি',
    labelEn: '26kg - 50kg',
    perksBn: '৮% ডিসকাউন্ট + ফ্রি প্রফেশনাল প্যাকেজিং',
    perksEn: '8% Discount + Free Professional Packaging'
  },
  {
    id: 'tier-3',
    minKg: 51,
    maxKg: 500,
    discountPercent: 12,
    labelBn: '৫০+ কেজি',
    labelEn: '50kg+',
    perksBn: 'বিশেষ কন্ট্রাক্ট রেট + ভোর ৫:০০ টায় ডেলিভারি',
    perksEn: 'Contract Rate + Guaranteed 5:00 AM Dedicated Slot'
  }
];
