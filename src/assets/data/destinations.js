const DESTINATIONS = [
  {
    id: 1,
    countrName: "Vietnam",
    countryType: "evisa",
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "2350",
    liveCount: 9,
    subtitle: "Get Visa in 1-3 Business Days",
    bullets: [
      "1200+ visas successfully Processed",
      "online process",
    ],
  },

  {
    id: 2,
    countrName: "Singapore",
    countryType: "evisa",

    VisaManagerFee: "1180",
    AuthorityCharges: "670",
    GovernmentFee: "2100",
    llets: [
      "Visa on arrival / DAC",
      "Fast approval process",
      "No embassy visit required"
    ],
  },

  {
    id: 3,
    countrName: 'South Korea',
    countryType: "evisa",
    VisaManagerFee: "3540",
    AuthorityCharges: "1200",
    GovernmentFee: "5800",
  },

  {
    id: 4,
    countrName: 'Indonesia',
    countryType: "evisa",
    VisaManagerFee: " 590",
    AuthorityCharges: "0",
    GovernmentFee: "2900",
    bullets: [
      "Visa on arrival / DAC",
      "Fast approval process",
      "No embassy visit required"
    ],

  },
  {
    id: 5,
    countrName: 'Hong Kong',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",
    subtitle: "Mandatory for Indain Travellers",
    bullets: [
      "Mandatory for Indain Travellers",
      "15k+ ETAs Processed",
      "Online Process"
    ],
  },

  {
    id: 6,
    countrName: 'Combodia',
    VisaManagerFee: "590",
    AuthorityCharges: "0",
    GovernmentFee: "3500",
    countryType: "evisa",
    subtitle: "Get Visa in 3-5 Working days",
    bullets: [
      "1200 + Visa Successfully Processed",
      "Online Process"
    ],
  },


  {
    id: 7,
    countrName: 'Sri-lanka',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",
    subtitle: "Get Your ETA in just 1 day",
    bullets: [
      "Mandatory for Indain Travellers",
      "15k+ ETAs Processed",
      "Online Process"
    ],
  },

  {
    id: 8,
    countrName: 'Philippines',
    VisaManagerFee: "1180",
    AuthorityCharges: "0",
    GovernmentFee: "5800",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 9,
    countrName: 'Uzbekistan',
    VisaManagerFee: "1770 per traveler",
    AuthorityCharges: "0",
    GovernmentFee: {
      Single: "1721",
      Double: "3012",
      multiple: "4303 "
    },
    countryType: "evisa"

  },

  {
    id: 10,
    countrName: 'Armenia',
    VisaManagerFee: "1770 per traveler",
    AuthorityCharges: "0",
    GovernmentFee: "3600",
    countryType: "evisa"
  },

  {
    id: 11,
    countrName: 'Russia',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "8200",
    countryType: "evisa"
  },

  {
    id: 12,
    countrName: 'France',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "2311.62",
    GovernmentFee: "9100",
    countryType: "Schengen"
  },

  {
    id: 13,
    countrName: 'Italy',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "537",
    GovernmentFee: "9200 ",
    countryType: "Schengen"
  },

  {
    id: 14,
    countrName: 'USA',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "0",
    GovernmentFee: "17020",
    countryType: "Stamp Visa"
  },

  {
    id: 15,
    countrName: 'Sweden',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "8200",
    countryType: "Schengen"

  },

  {
    id: 16,
    countrName: 'Qatar',
    VisaManagerFee: "2949",
    AuthorityCharges: "944",
    GovernmentFee: "5000",
    countryType: "evisa"
  },

  {
    id: 17,
    countrName: 'Romania',
    VisaManagerFee: "2949",
    AuthorityCharges: "944",
    GovernmentFee: "5000",
    countryType: "evisa"
  },

  {
    id: 18,
    countrName: 'Uganda',
    VisaManagerFee: "2949",
    AuthorityCharges: "944",
    GovernmentFee: "6395",
    countryType: "evisa"
  },

  {
    id: 19,
    countrName: 'Uk',
    VisaManagerFee: "4130",
    AuthorityCharges: "0",
    GovernmentFee: "15400 ",
    countryType: "Stamp Visa"
  },

  {
    id: 20,
    countrName: 'Poland',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "9743",
    countryType: "Schengen"
  },

  {
    id: 21,
    countrName: 'Portugal',
    VisaManagerFee: "2950",
    AuthorityCharges: "944",
    GovernmentFee: "9200",
    countryType: "evisa"
  },

  {
    id: 22,
    countrName: 'Norway',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "1740(",
    countryType: "evisa"
  },

  {
    id: 23,
    countrName: 'Nigeria',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "3000",
    countryType: "evisa"
  },

  {
    id: 24,
    countrName: 'Netherland',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "1931.66",
    GovernmentFee: "9200 ",
    countryType: "evisa"
  },

  {
    id: 25,
    countrName: 'Monoglia',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "5720",
    countryType: "evisa"
  },

  {
    id: 26,
    countrName: 'Maldives',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",
    subtitle: "Get Your Visa by 1 day",
    bullets: [
      "Mandatory for Indain Travellers",
      "15k+ ETAs Processed",
      "Online Process"
    ],
  },

  {
    id: 27,
    countrName: 'Malawi',
    VisaManagerFee: "1770",
    AuthorityCharges: "944",
    GovernmentFee: "4306",
    countryType: "evisa"
  },

  {
    id: 28,
    countrName: 'Liechtenstein',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "2500",
    countryType: "evisa"
  },

  {
    id: 29,
    countrName: 'Lebanon',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "10870",
    countryType: "evisa"
  },

  {
    id: 30,
    countrName: 'Finland',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "9100",
    countryType: "Schengen"
  },

  {
    id: 31,
    countrName: 'Colombia',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "6500",
    countryType: "evisa"
  },

  {
    id: 32,
    countrName: 'Australia',
    VisaManagerFee: "4130",
    AuthorityCharges: "0",
    GovernmentFee: "12400",
    countryType: "Stamp Visa"
  },

  {
    id: 33,
    countrName: 'Austria',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "1931.66",
    GovernmentFee: "9100",
    countryType: "Schengen"

  },

  {
    id: 34,
    countrName: 'Bulgaria',
    VisaManagerFee: "2950",
    AuthorityCharges: "2070",
    GovernmentFee: "8600",
    countryType: "Schengen"
  },

  {
    id: 35,
    countrName: 'Malaysia',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",

    subtitle: "Get Your Visa by 1 day",
    bullets: [
      "Mandatory for Indain Travellers",
      "15k+ ETAs Processed",
      "Online Process"
    ],
  },

  {
    id: 36,
    countrName: 'Japan',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "Stamp Visa"
  },

  {
    id: 37,
    countrName: 'Thailand',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",
    subtitle: "Mandatory for Indians",
    bullets: [
      "15K+ visas sucessfully processed",
      "₹1 per adult",
      "₹0 Service Fees",
      "All inclusive final price no additional Charges"
    ],
  },

  {
    id: 38,
    countrName: 'Belgium',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 39,
    countrName: 'Croatia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 40,
    countrName: 'Czechia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 41,
    countrName: 'Denmark',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 42,
    countrName: 'Estonia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 43,
    countrName: 'Germany',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 44,
    countrName: 'Greece',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 45,
    countrName: 'Hungary',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 46,
    countrName: 'Iceland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },
  {
    id: 47,
    countrName: 'Latvia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 48,
    countrName: 'Lithuania',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 49,
    countrName: 'Luxembourg',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 50,
    countrName: 'Malta',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 51,
    countrName: 'Netherland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 52,
    countrName: 'Norway',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 53,
    countrName: 'Portugal',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 54,
    countrName: 'Romania',
    VisaManagerFee: "2950",
    AuthorityCharges: "944",
    GovernmentFee: "5000",
    countryType: "Schengen"
  },

  {
    id: 55,
    countrName: 'Slovakia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 56,
    countrName: 'Spain',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 57,
    countrName: 'Slovenia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 58,
    countrName: 'Switzerland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    countryType: "Schengen"
  },

  {
    id: 59,
    countrName: 'Cyprus',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "9743",
    countryType: "Schengen"
  },

  {
    id: 60,
    countrName: 'Bhutan',
    VisaManagerFee: "800",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC"
  },

  {
    id: 61,
    countrName: "Nepal",
    VisaManagerFee: "0",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa-Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 62,
    countrName: 'Azerbaijan',
    VisaManagerFee: "3540",
    AuthorityCharges: "1200",
    GovernmentFee: "5800",
    countryType: "evisa",
    subtitle: "Get Visa in 1-3 Business Days",
    bullets: [
      "1200+ visas successfully Processed",
      "online process",
    ],
  },

  {
    id: 63,
    countrName: 'Egypt',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 64,
    countrName: 'Kenya',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 65,
    countrName: 'Mauritius',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "DAC",
    subtitle: "Get Your TDA in 1 day",
    bullets: [
      "Mandatory for Indain Travellers",
      "15k+ ETAs Processed",
      "Online Process",
      "All inclusive final price. No additional charges"
    ],
  },

  {
    id: 66,
    countrName: 'Morocco',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 67,
    countrName: 'New Zealand',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 68,
    countrName: 'Oman',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 69,
    countrName: 'Turkey',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 70,
    countrName: 'Ukraine',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 71,
    countrName: 'Georgia',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    countryType: "evisa"
  },

  {
    id: 72,
    countrName: 'China',
    VisaManagerFee: "3540",
    AuthorityCharges: "1951",
    GovernmentFee: "2900",
    countryType: "Stamp Visa"
  },

  {
    id: 73,
    countrName: 'Canada',
    VisaManagerFee: "3540",
    AuthorityCharges: "900",
    GovernmentFee: "11700",
    countryType: "Stamp Visa"
  },

  {
    id: 74,
    countrName: 'Ireland',
    VisaManagerFee: "3540",
    AuthorityCharges: "3700",
    GovernmentFee: "9318",
    countryType: "Stamp Visa"
  },

  {
    id: 75,
    countrName: 'Jamaica',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick & Easy Processed",
      "Visas Processed",
      "24x7 Support"
    ],
  },

  {
    id: 76,
    countrName: 'Micronesia',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 77,
    countrName: 'Fiji',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 78,
    countrName: 'North Korea',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",
    subtitle: "No Visa Required for Indian Travellers",
    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 79,
    countrName: 'British Virgin Islands',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 80,
    countrName: 'Barbados',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 81,
    countrName: 'Cook Islands',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 82,
    countrName: 'El Salvador',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 83,
    countrName: 'Montserrat',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 84,
    countrName: 'Trinidad & Tobago',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 85,
    countrName: 'Dominica',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 86,
    countrName: 'Senegal',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 87,
    countrName: 'Réunion',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 88,
    countrName: 'St. Kitts & Nevis',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 89,
    countrName: 'St. Vincent & Grenadines',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },

  {
    id: 90,
    countrName: 'Niue',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 91,
    countrName: 'Haiti',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },


  {
    id: 92,
    countrName: 'Gambia',
    VisaManagerFee: "1",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    countryType: "Visa Free",

    bullets: [
      "Quick and Easy Process",
      "Visas Processed",
      "24x7 Support",
    ],
  },
];
export default DESTINATIONS;