/**
 * TOMAR MURGI STORE (তোমার মুরগি স্টোর)
 * Dual-Language Localization Engine (BN & EN)
 * Bengali Numeral Formatting & Contract Rules
 */

export const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num) {
  if (num === null || num === undefined) return '';
  const str = String(num);
  return str.replace(/[0-9]/g, digit => BENGALI_DIGITS[parseInt(digit, 10)]);
}

export function formatPrice(amount, lang = 'bn') {
  const rounded = Math.round(amount);
  if (lang === 'bn') {
    return `${toBanglaNumber(rounded)} ৳`;
  }
  return `৳ ${rounded}`;
}

export function formatWeight(weight, unit = 'kg', lang = 'bn') {
  const formattedVal = Number(weight).toFixed(weight % 1 === 0 ? 0 : 2);
  if (lang === 'bn') {
    if (unit === 'dozen') {
      return `${toBanglaNumber(formattedVal)} ডজন`;
    }
    return `${toBanglaNumber(formattedVal)} কেজি`;
  }
  if (unit === 'dozen') {
    return `${formattedVal} dozen`;
  }
  return `${formattedVal} kg`;
}

export const TRANSLATIONS = {
  bn: {
    // Topbar
    'topbar.area_label': 'ডেলিভারি এলাকা:',
    'topbar.hotline': 'হটলাইন ও হোয়াটসঅ্যাপ:',
    'topbar.hours': 'সকাল ৬:০০ - রাত ১০:০০',
    'topbar.mode.retail': 'বাসার বাজার (Retail)',
    'topbar.mode.b2b': 'রেস্টুরেন্ট সাপ্লাই (B2B)',

    // Header & Brand
    'brand.name': 'তোমার মুরগি স্টোর',
    'brand.tagline': 'ফার্ম ফ্রেশ ও স্বাস্থ্যসম্মত হালাল পোল্ট্রি',
    'nav.catalog': 'তাজা মুরগির বাজার',
    'nav.b2b': 'হোলসেল সাপ্লাই',
    'nav.slots': 'ডেলিভারি সময়',
    'nav.hygiene': 'হাইজিং গ্যারান্টি',
    'nav.privacy': 'গোপনীয়তা নীতিমালা',
    'cart.title': 'আপনার ঝুড়ি',
    'cart.items_count': 'আইটেম',

    // Hero Section
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

    // Trust Pillars
    'trust.halal.title': '১০০% হালাল জবেহ',
    'trust.halal.desc': 'শরীয়ত সম্মত হস্তনির্মিত জবেহ ও রক্তক্ষরণ নিশ্চিতকরণ।',
    'trust.dressing.title': 'ক্লিনিক্যাল ড্রেসিং ও জিরো ওয়াটার',
    'trust.dressing.desc': 'ওজন বৃদ্ধির জন্য কোনো পানি ইনজেকশন দেওয়া হয় না। ফ্রি প্রফেশনাল কাটিং।',
    'trust.coldchain.title': 'ফার্ম টু ডোর কোল্ড-চেইন',
    'trust.coldchain.desc': '৪° সে. নিয়ন্ত্রিত তাপমাত্রায় সংরক্ষিত তাজা ডেলিভারি।',

    // Catalog Tabs
    'tab.all': 'সব পণ্য',
    'tab.broiler': 'ফার্ম ব্রয়লার',
    'tab.sonali': 'সোনালী মুরগি',
    'tab.deshi': 'খাঁটি দেশি',
    'tab.layer': 'কক ও লেয়ার',
    'tab.cuts': 'বোনলেস ও কাট পিস',
    'tab.eggs': 'ফার্ম ও অর্গানিক ডিম',

    // Product Card
    'card.badge.fresh': 'আজকের তাজা',
    'card.badge.halal': '১০০% হালাল',
    'card.badge.organic': 'অর্গানিক ফিড',
    'card.badge.deshi': 'গ্রাম্য দেশি',
    'card.live_weight': 'লাইভ ওজন:',
    'card.dressed_est': 'ড্রেসিং পরবর্তী ওজন:',
    'card.cut_choice': 'পছন্দের কাটিং নির্ধারণ করুন:',
    'card.weight_adjust': 'ওজন নির্ধারণ:',
    'card.add_btn': 'ঝুড়িতে যোগ করুন',
    'card.added': 'যোগ করা হয়েছে (+১ কেজি)',
    'card.per_kg': '/কেজি',
    'card.per_dozen': '/ডজন',

    // Delivery Slot Selector
    'slots.section_title': 'ডেলিভারির সুবিধাজনক সময় বেছে নিন',
    'slots.section_subtitle': 'আপনার রান্নার সময়ের সাথে মিলিয়ে কোল্ড-চেইন স্লট বাছাই করুন',

    // B2B Wholesale Module
    'b2b.section_badge': 'হোটেল, রেস্টুরেন্ট ও ক্যাটারিং পার্টনারশিপ',
    'b2b.title': 'কমার্শিয়াল বাল্ক পোল্ট্রি সাপ্লাই প্রোগ্রাম',
    'b2b.subtitle': 'ঢাকার শীর্ষ রেস্টুরেন্ট ও কিচেন সমূহে ভোরবেলা নির্ভরযোগ্য, নিয়ন্ত্রিত মূল্যে মানসম্মত মুরগি সরবরাহ।',
    'b2b.calc_title': 'বাল্ক অর্ডার প্রাইস ক্যালকুলেটর',
    'b2b.vol_label': 'প্রতিদিনের সম্ভাব্য পরিমাণ (কেজি):',
    'b2b.type_label': 'মুরগির ধরন নির্বাচন করুন:',
    'b2b.cut_label': 'রান্নার কাটিং স্পেসিফিকেশন:',
    'b2b.slot_label': 'কিচেন রিসিভিং স্লট:',
    'b2b.name_label': 'রেস্টুরেন্ট / ব্যবসা প্রতিষ্ঠানের নাম:',
    'b2b.phone_label': 'ম্যানেজার / পারচেজ ফোন নম্বর:',
    'b2b.discount_notice': 'প্রযোজ্য ছাড়:',
    'b2b.est_price': 'আনুমানিক বাল্ক রেট:',
    'b2b.submit_btn': 'হোয়াটসঅ্যাপে বাল্ক কোটেশন পাঠান',

    // Cart Drawer
    'drawer.heading': 'আপনার অর্ডারের ঝুড়ি',
    'drawer.empty': 'আপনার ঝুড়িতে এখনো কোনো পণ্য যোগ করা হয়নি।',
    'drawer.empty_action': 'তাজা মুরগি দেখুন',
    'drawer.cut_lbl': 'কাটিং:',
    'drawer.subtotal': 'পণ্যের মূল্য:',
    'drawer.delivery_fee': 'ডেলিভারি চার্জ:',
    'drawer.total': 'সর্বমোট প্রদেয়:',
    'drawer.checkout_btn': 'অর্ডার সম্পন্ন করুন',
    'drawer.area_select': 'ডেলিভারি এরিয়া:',
    'drawer.address_label': 'সম্পূর্ণ ঠিকানা (বাসা/রোড/ফ্ল্যাট):',
    'drawer.name_label': 'আপনার নাম:',
    'drawer.phone_label': 'মোবাইল নম্বর (১১ ডিজিট):',
    'drawer.payment_method': 'পেমেন্ট মাধ্যম:',
    'drawer.cod': 'ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ)',
    'drawer.bkash': 'বিকাশ / নগদ (মার্চেন্ট পেমেন্ট)',
    'drawer.bkash_note': 'মার্চেন্ট নম্বর: 01700-000000 (অর্ডার পরবর্তী ট্রানজেকশন আইডি দিন)',
    'drawer.place_order': 'অর্ডার নিশ্চিত করুন',
    'drawer.order_success': 'অর্ডার সফলভাবে গৃহীত হয়েছে!',
    'drawer.order_id': 'অর্ডার ট্র্যাকিং আইডি:',
    'drawer.order_msg': 'আমাদের প্রতিনিধি অবিলম্বে কল করে আপনার কাটিং ও ওজন কনফার্ম করবেন।',

    // Privacy Policy
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

    // Footer
    'footer.about': 'তোমার মুরগি স্টোর — ঢাকা শহরের প্রথম স্বাস্থ্যসম্মত ও ক্লিনিক্যাল এয়ার-চিলড পোল্ট্রি ডেলিভারি সেবা।',
    'footer.quick_links': 'প্রয়োজনীয় লিংক',
    'footer.legal': 'আইনি ও নীতিমালা',
    'footer.copyright': '© ২০২৬ তোমার মুরগি স্টোর (Tomar Murgi Store)। সর্বস্বত্ব সংরক্ষিত।'
  },

  en: {
    // Topbar
    'topbar.area_label': 'Delivery Area:',
    'topbar.hotline': 'Hotline & WhatsApp:',
    'topbar.hours': '6:00 AM - 10:00 PM',
    'topbar.mode.retail': 'Retail Store (B2C)',
    'topbar.mode.b2b': 'Restaurant Wholesale (B2B)',

    // Header & Brand
    'brand.name': 'Tomar Murgi Store',
    'brand.tagline': 'Farm-Fresh & Hygienic Halal Poultry',
    'nav.catalog': 'Fresh Poultry',
    'nav.b2b': 'Wholesale Supply',
    'nav.slots': 'Delivery Slots',
    'nav.hygiene': 'Hygiene Guarantee',
    'nav.privacy': 'Privacy Policy',
    'cart.title': 'Your Cart',
    'cart.items_count': 'Items',

    // Hero Section
    'hero.badge': '100% Tested Cold-Chain Freshness',
    'hero.title': 'Pristine Farm-Fresh Poultry, Straight to Your Kitchen.',
    'hero.subtitle': 'Zero preservatives or water injection. Authentic live weight, clinical air-chilled dressing, and customized cuts prepared on order.',
    'hero.cta.catalog': 'Browse Fresh Catalog',
    'hero.cta.b2b': 'B2B Bulk Quote',
    'hero.stat.delivery': '45-Min Fast Delivery',
    'hero.stat.delivery_sub': 'Covered Dhaka Hubs',
    'hero.stat.preservative': '0% Preservatives',
    'hero.stat.preservative_sub': 'All-Natural Cold Chain',
    'hero.stat.partners': '1,200+ Kitchen Partners',
    'hero.stat.partners_sub': 'Daily Reliable Supply',

    // Trust Pillars
    'trust.halal.title': '100% Halal Slaughter',
    'trust.halal.desc': 'Strict hand-slaughtered Shariah compliance and complete bleed-out.',
    'trust.dressing.title': 'Clinical Dressing & Zero Water',
    'trust.dressing.desc': 'Zero water injection for false weight gain. Free professional custom butchery.',
    'trust.coldchain.title': 'Farm-to-Kitchen Cold Chain',
    'trust.coldchain.desc': 'Continuous 4°C chilled logistics ensuring farm-to-table freshness.',

    // Catalog Tabs
    'tab.all': 'All Products',
    'tab.broiler': 'Farm Broiler',
    'tab.sonali': 'Sonali Chicken',
    'tab.deshi': 'Deshi Free-Range',
    'tab.layer': 'Cock & Layer',
    'tab.cuts': 'Boneless & Cuts',
    'tab.eggs': 'Farm & Organic Eggs',

    // Product Card
    'card.badge.fresh': 'Fresh Today',
    'card.badge.halal': '100% Halal',
    'card.badge.organic': 'Organic Feed',
    'card.badge.deshi': 'Free-Range',
    'card.live_weight': 'Live Weight:',
    'card.dressed_est': 'Est. Dressed Weight:',
    'card.cut_choice': 'Select Butchery Cut:',
    'card.weight_adjust': 'Adjust Weight:',
    'card.add_btn': 'Add to Cart',
    'card.added': 'Added (+1 kg)',
    'card.per_kg': '/kg',
    'card.per_dozen': '/dozen',

    // Delivery Slot Selector
    'slots.section_title': 'Choose Preferred Delivery Window',
    'slots.section_subtitle': 'Match your cooking schedule with our cold-chain transit slots',

    // B2B Wholesale Module
    'b2b.section_badge': 'Hotel, Restaurant & Cloud Kitchen Supply',
    'b2b.title': 'Commercial Bulk Poultry Supply Program',
    'b2b.subtitle': 'Reliable, early-morning kitchen supplies for Dhaka’s premier restaurants and catering houses at verified wholesale rates.',
    'b2b.calc_title': 'Wholesale Volume Calculator',
    'b2b.vol_label': 'Daily Requirement Volume (kg):',
    'b2b.type_label': 'Select Poultry Variety:',
    'b2b.cut_label': 'Culinary Cut Specification:',
    'b2b.slot_label': 'Kitchen Receiving Window:',
    'b2b.name_label': 'Restaurant / Enterprise Name:',
    'b2b.phone_label': 'Manager / Procurement Contact:',
    'b2b.discount_notice': 'Applied Discount:',
    'b2b.est_price': 'Estimated Wholesale Price:',
    'b2b.submit_btn': 'Send WhatsApp Bulk Inquiry',

    // Cart Drawer
    'drawer.heading': 'Your Order Basket',
    'drawer.empty': 'Your basket is currently empty.',
    'drawer.empty_action': 'Browse Fresh Poultry',
    'drawer.cut_lbl': 'Cut:',
    'drawer.subtotal': 'Subtotal:',
    'drawer.delivery_fee': 'Delivery Fee:',
    'drawer.total': 'Total Payable:',
    'drawer.checkout_btn': 'Proceed to Checkout',
    'drawer.area_select': 'Delivery Neighborhood:',
    'drawer.address_label': 'Detailed Address (House/Road/Apt):',
    'drawer.name_label': 'Full Name:',
    'drawer.phone_label': 'Mobile Number (11 digits):',
    'drawer.payment_method': 'Payment Mode:',
    'drawer.cod': 'Cash on Delivery (Verify upon arrival)',
    'drawer.bkash': 'bKash / Nagad (Digital Merchant)',
    'drawer.bkash_note': 'Merchant No: 01700-000000 (Provide TrxID after ordering)',
    'drawer.place_order': 'Confirm Order',
    'drawer.order_success': 'Order Placed Successfully!',
    'drawer.order_id': 'Tracking Order ID:',
    'drawer.order_msg': 'Our dispatch agent will call shortly to confirm live weight and cut requirements.',

    // Privacy Policy
    'privacy.modal_title': 'Data Privacy & Consumer Security Policy',
    'privacy.intro': 'Tomar Murgi Store is fully committed to user privacy and customer trust in accordance with Bangladesh E-Commerce & Digital Commerce guidelines:',
    'privacy.p1_title': '1. Information Collection & Purpose',
    'privacy.p1_body': 'We strictly collect only necessary information (Name, WhatsApp/Phone number, and Delivery address) required to execute cold-chain orders and schedule logistics.',
    'privacy.p2_title': '2. Zero Third-Party Data Sharing',
    'privacy.p2_body': 'We never sell, rent, lease, or share personal contact details with third-party marketing agencies or external data brokers.',
    'privacy.p3_title': '3. Payment Credential Protection',
    'privacy.p3_body': 'No financial credentials, bKash/Nagad PINs, or OTPs are ever retained on our systems. All digital payments occur via verified official channels.',
    'privacy.p4_title': '4. Hygiene & Return Warranty',
    'privacy.p4_body': 'Customers have the right to inspect package integrity in front of the delivery partner. Instant replacement or full refund is provided for unsatisfactory goods.',
    'privacy.close_btn': 'Understood & Agree',

    // Footer
    'footer.about': 'Tomar Murgi Store — Dhaka’s premier air-chilled, hygienic fresh poultry direct supply network.',
    'footer.quick_links': 'Quick Navigation',
    'footer.legal': 'Legal & Trust',
    'footer.copyright': '© 2026 Tomar Murgi Store. All rights reserved.'
  }
};
