
import { Scenario, ScenarioType, MarketingVideo, Branch, ComparisonLink } from './types';

export const FURNISHING_COST_PER_UNIT = 40000;

export const SCENARIOS: Scenario[] = [
  {
    id: 'study_a',
    type: ScenarioType.LONG_TERM,
    name: 'Study A: Executive Living',
    color: '#2A5B64', // Teal
    description: 'Furnished apartments (Executive Living) model for 16 Hotel Grade Studio Apartments. Standard management fee applies with flexible contract durations.',
    
    financials: {
        worst: {
            revenue: 1037952, // 5,406 * 12 * 16
            mabaatShare: 259488, // 25%
            netIncome: 778464, 
            roi: 0
        },
        base: {
            revenue: 1161600, // 6,050 * 12 * 16
            mabaatShare: 290400, // 25%
            netIncome: 871200, 
            roi: 0
        },
        best: {
            revenue: 1285248, // 6,694 * 12 * 16
            mabaatShare: 321312, // 25%
            netIncome: 963936, 
            roi: 0
        }
    },

    propertyValue: 0, 
    
    unitCount: 16,
    unitLabel: 'Studios',
    occupancyDurationLabel: 'Flexible Contracts',
    
    unitMix: [
        { 
            name: 'Hotel Grade Studio', 
            count: 16, 
            avgPrice: 72600, // 6,050 * 12
            priceRange: { 
                min: 64872, // 5,406 * 12
                avg: 72600, // 6,050 * 12
                max: 80328  // 6,694 * 12
            }, 
        }
    ],
  },
  {
    id: 'study_b',
    type: ScenarioType.LONG_TERM,
    name: 'Study B: Corporate Lease',
    color: '#8A6E99', // Purple
    description: 'Entire building rented to a single corporate tenant (16 Studios). No vacancy risk (100% occupancy assumed) and no management fee applied.',
    
    financials: {
        worst: {
            revenue: 604800, // 37,800 * 16 (10% decrease)
            mabaatShare: 0,
            netIncome: 604800, 
            roi: 0
        },
        base: {
            revenue: 604800, // Fixed
            mabaatShare: 0,
            netIncome: 604800,
            roi: 0
        },
        best: {
            revenue: 604800, // Fixed
            mabaatShare: 0,
            netIncome: 604800,
            roi: 0
        }
    },

    propertyValue: 0, 
    
    unitCount: 16, 
    unitLabel: 'Studios',
    occupancyDurationLabel: 'Single Contract',
    
    unitMix: [
        { 
            name: 'Studio (Corporate Rate)', 
            count: 16, 
            avgPrice: 37800, 
            priceRange: { min: 37800, avg: 37800, max: 37800 }, 
        }
    ],
  }
];

export const MARKETING_VIDEOS: MarketingVideo[] = [
    {
        id: 'v1',
        title: 'Community Overview',
        thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://drive.google.com/file/d/1u6i_7MN74iogQP0qwdS9o2GYOHtWTZA4/view?usp=sharing',
    },
    {
        id: 'v2',
        title: 'Interior Walkthrough',
        thumbnailUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://drive.google.com/file/d/1dO3W-8IX8JultVN768H1hyxVVmxC4F2I/view?usp=sharing',
    }
];

export const COMPARISON_LINKS: Record<string, ComparisonLink[]> = {
  study_a: [
    {
        title: "استديو جديد ومؤثث للايجار في حي القدس (اول ساكن)",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87729037.html",
        location: "Al Quds",
        type: "Studio",
        price: 4500,
        period: "/mo"
    },
    {
        title: "شقق مفروشه ايجار شهرى مجددة بالكامل حى القدس",
        platform: "Haraj",
        url: "https://haraj.com.sa/tags/%D8%AD%D9%8A_%D8%A7%D9%84%D9%82%D8%AF%D8%B3_%D8%B4%D9%82%D9%82_%D9%85%D9%81%D8%B1%D9%88%D8%B4%D8%A9",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4000,
        period: "/mo"
    },
    {
        title: "شقق عوائل مفروشه للايجار حي القدس",
        platform: "Haraj",
        url: "https://haraj.com.sa/tags/%D8%AD%D9%8A_%D8%A7%D9%84%D9%82%D8%AF%D8%B3_%D8%B4%D9%82%D9%82_%D8%B9%D9%88%D8%A7%D8%A6%D9%84",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4000,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع الأمير سعود الكبير بن عبدالعزيز آل سعود",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6417078",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4000,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع محمد إبراهيم بن ماضي",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6510624",
        location: "Al Quds",
        type: "Studio",
        price: 3000,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع الأمير محمد بن سعود بن عبدالعزيز",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6504635",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 2700,
        period: "/mo"
    },
    {
        title: "شقة من غرفة نوم واحدة للإيجار في القدس، الرياض",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87731743.html",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3000,
        period: "/mo"
    },
    {
        title: "شقة استوديو للإيجار في القدس، الرياض",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87731834.html",
        location: "Al Quds",
        type: "Studio",
        price: 2700,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في القدس, شرق الرياض",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87622557.html",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3300,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في حي القدس، شرق الرياض",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87731569.html",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3200,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع جرير بن عبدالله البجلي",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6520525",
        location: "Mughrizat",
        type: "1 Bedroom",
        price: 3000,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع الامير مقرن بن عبدالعزيز",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6352279",
        location: "Mughrizat",
        type: "1 Bedroom",
        price: 4700,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع جرش",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6395064",
        location: "Mughrizat",
        type: "1 Bedroom",
        price: 3500,
        period: "/mo"
    },
    {
        title: "شقة للإيجار في شارع الامير مقرن بن عبدالعزيز",
        platform: "Aqar",
        url: "https://sa.aqar.fm/ad/6424976",
        location: "Mughrizat",
        type: "1 Bedroom",
        price: 4000,
        period: "/mo"
    },
    {
        title: "شقة للايجار في المغرزات, شمال الرياض",
        platform: "Bayut",
        url: "https://www.bayut.sa/ar/property/details-87620884.html",
        location: "Mughrizat",
        type: "1 Bedroom",
        price: 3750,
        period: "/mo"
    },
    {
        title: "ملاذ - القدس - استديو 3",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22ملاذ+-+القدس+-+استديو+3%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6823,
        period: "/mo"
    },
    {
        title: "استديو في القدس - دخول ذاتي",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+في+القدس+-+دخول+ذاتي%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6491,
        period: "/mo"
    },
    {
        title: "إقامه قصيرة",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22إقامه+قصيرة%22+Riyadh",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4650,
        period: "/mo"
    },
    {
        title: "Modern cozy 1bd apartment",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Modern+cozy+1bd+apartment%22+Riyadh",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6781,
        period: "/mo"
    },
    {
        title: "Reefy studio 3",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Reefy+studio+3%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5874,
        period: "/mo"
    },
    {
        title: "Al Quds (7)3 Palma Exclusive فاخر",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Palma+Exclusive+فاخر%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6488,
        period: "/mo"
    },
    {
        title: "The countryside studio offers a warm atmosphere.",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22The+countryside+studio+offers+a+warm+atmosphere%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 7167,
        period: "/mo"
    },
    {
        title: "استيديو انيق بتصميم فاخر",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استيديو+انيق+بتصميم+فاخر%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4857,
        period: "/mo"
    },
    {
        title: "استديو مودرن بدخول ذاتي 7C",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+مودرن+بدخول+ذاتي+7C%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4888,
        period: "/mo"
    },
    {
        title: "شقة مريحة بصالة وغرفة نوم في حي القدس",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22شقة+مريحة+بصالة+وغرفة+نوم+في+حي+القدس%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6299,
        period: "/mo"
    },
    {
        title: "Comfort lives here. #RafaStay",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Comfort+lives+here.+%23RafaStay%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 8069,
        period: "/mo"
    },
    {
        title: "استيديو انيق وهادئ",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استيديو+انيق+وهادئ%22+Riyadh",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4191,
        period: "/mo"
    },
    {
        title: "شقة بغرفة نوم وصاله بتصميم هادئ",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22شقة+بغرفة+نوم+وصاله+بتصميم+هادئ%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 9273,
        period: "/mo"
    },
    {
        title: "سويت أنيق بدخول ذاتي",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22سويت+أنيق+بدخول+ذاتي%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5973,
        period: "/mo"
    },
    {
        title: "استديو واسع وفخم دخول ذاتي فخامة القدس 1",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+واسع+وفخم+دخول+ذاتي+فخامة+القدس+1%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3408,
        period: "/mo"
    },
    {
        title: "شقه فاخرة حي القدس دخول ذكي c-4",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22شقه+فاخرة+حي+القدس+دخول+ذكي+c-4%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 7858,
        period: "/mo"
    },
    {
        title: "استديو رواق عسيب",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+رواق+عسيب%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3455,
        period: "/mo"
    },
    {
        title: "استديو هادئ وجميل بموقع مميز",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+هادئ+وجميل+بموقع+مميز%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 3333,
        period: "/mo"
    },
    {
        title: "Al Quds (2) 1 Studio Cozy استوديو دافئ",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Al+Quds+%282%29+1+Studio+Cozy%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5111,
        period: "/mo"
    },
    {
        title: "استديو أنيق في موقع ممتاز B5",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+أنيق+في+موقع+ممتاز+B5%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5796,
        period: "/mo"
    },
    {
        title: "بجانب شقق ابات حي القدس",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22بجانب+شقق+ابات+حي+القدس%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6114,
        period: "/mo"
    },
    {
        title: "شقة أنيقة وصالة بدخول ذاتي",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22شقة+أنيقة+وصالة+بدخول+ذاتي%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5796,
        period: "/mo"
    },
    {
        title: "استديو واسع وفخم دخول ذاتي",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+واسع+وفخم+دخول+ذاتي%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4625,
        period: "/mo"
    },
    {
        title: "استديو فاخر بتصميم عصري وأنيق",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+فاخر+بتصميم+عصري+وأنيق%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5149,
        period: "/mo"
    },
    {
        title: "Al Quds (7) 1 Luxury Business فاخر أعمال",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Al+Quds+%287%29+1+Luxury+Business%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6488,
        period: "/mo"
    },
    {
        title: "Private apartments",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Private+apartments%22+Riyadh",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5707,
        period: "/mo"
    },
    {
        title: "شقة مودرن A4 - دخول ذكي- شاشة سمارت 4K65 -عازل صوت",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22شقة+مودرن+A4%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5720,
        period: "/mo"
    },
    {
        title: "استديو أنيق بدخول ذاتي - 3A",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+أنيق+بدخول+ذاتي+-+3A%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5796,
        period: "/mo"
    },
    {
        title: "Comfortable accommodation next to Nakheel Mall1",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Comfortable+accommodation+next+to+Nakheel+Mall1%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4922,
        period: "/mo"
    },
    {
        title: "Superior Suite | Private Entry",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Superior+Suite+%7C+Private+Entry%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 6176,
        period: "/mo"
    },
    {
        title: "8, Big Cozy Suit, Self check-in",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%228%2C+Big+Cozy+Suit%2C+Self+check-in%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5723,
        period: "/mo"
    },
    {
        title: "استديو فاخر بمدخل جانبي خاص بدخول ثاني - 5S",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22استديو+فاخر+بمدخل+جانبي+خاص+بدخول+ثاني+-+5S%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5796,
        period: "/mo"
    },
    {
        title: "10, Cozy Suit, Center of Riyadh, Self Check-in",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%2210%2C+Cozy+Suit%2C+Center+of+Riyadh%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 5270,
        period: "/mo"
    },
    {
        title: "2, Big Suit, Self Check-in, Cozy",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%222%2C+Big+Suit%2C+Self+Check-in%2C+Cozy%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 4726,
        period: "/mo"
    },
    {
        title: "Luxuries Apt, Self-Entry 65” 4K Smart TV",
        platform: "Airbnb",
        url: "https://www.google.com/search?q=site%3Aairbnb.sa+%22Luxuries+Apt%2C+Self-Entry+65%E2%80%9D+4K+Smart+TV%22",
        location: "Al Quds",
        type: "1 Bedroom",
        price: 7264,
        period: "/mo"
    }
  ],
  study_b: []
};

export const MABAAT_SHARE_PERCENTAGE = 0.25;
export const BRANCHES: Branch[] = [];
