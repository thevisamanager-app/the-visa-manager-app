const DESTINATIONS = [
  {
    id: 1,
    source: require('../images/vietnam.jpeg'),
    title: '07 NOV 11:42 AM',
    countrName: 'Vietnam',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "2350",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 2,
    source: require('../images/singapore.jpeg'),
    title: '08 DEC 12:15 PM',
    countrName: 'Singapore',
    VisaManagerFee: "799",
    AuthorityCharges: "999",
    GovernmentFee: "1900",
    currency: "",
    countryType: "evisa"

  },
  {
    id: 3,
    source: require('../images/South Korea.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'South Korea',
    VisaManagerFee: "3540",
    AuthorityCharges: "1200",
    GovernmentFee: "5800",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 4,
    source: require('../images/indonesia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Indonesia',
    VisaManagerFee: " 590",
    AuthorityCharges: "0",
    GovernmentFee: "2900",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 5,
    source: require('../images/Hong-Kong.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Hong Kong',
    VisaManagerFee: "588.82",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 6,
    source: require('../images/Cambodia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Cambodia',
    VisaManagerFee: "1770",
    AuthorityCharges: "944",
    GovernmentFee: "3100",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 7,
    source: require('../images/Sri lanka.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sri-Lanka',
    VisaManagerFee: "800",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    currency: "",
    countryType: "DAC"
  },
  {
    id: 8,
    source: require('../images/philippines.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Philippines',
    VisaManagerFee: "1180",
    AuthorityCharges: "0",
    GovernmentFee: "5800",
    currency: "",
    countryType: "evisa"
  },
  {
    id: 9,
    source: require('../images/Uzbekistan.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uzbekistan',
    VisaManagerFee: "1770 per traveler",
    AuthorityCharges: "0",
    GovernmentFee: {
      Single: "1721",
      Double: "3012",
      multiple: "4303 "
    },
    currency: "",
    countryType: "evisa"

  },

  {
    id: 10,
    source: require('../images/Armenia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Armenia',
    VisaManagerFee: "1770 per traveler",
    AuthorityCharges: "0",
    GovernmentFee: "3600",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 11,
    source: require('../images/Russia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Russia',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "8200",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 12,
    source: require('../images/France.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'France',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "2311.62",
    GovernmentFee: "9100",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 13,
    source: require('../images/Italy.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Italy',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "537",
    GovernmentFee: "9200 ",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 14,
    source: require('../images/Usa.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'USA',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "0",
    GovernmentFee: "17020",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 15,
    source: require('../images/Sweden.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sweden',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "8200",
    currency: "",
    countryType: "Schengen"

  },

  {
    id: 16,
    source: require('../images/Qatar.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Qatar',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "5000",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 17,
    source: require('../images/Romania.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Romania',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "5000",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 18,
    source: require('../images/Uganda.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uganda',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "6395",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 19,
    source: require('../images/Uk.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uk',
    VisaManagerFee: "4130",
    AuthorityCharges: "0",
    GovernmentFee: "15400 ",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 20,
    source: require('../images/Poland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Poland',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "9743",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 21,
    source: require('../images/Portugal.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Portugal',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "9200",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 22,
    source: require('../images/Norway.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Norway',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "1740(",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 23,
    source: require('../images/Nigeria.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Nigeria',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "3000",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 24,
    source: require('../images/Netherland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Netherland',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "1931.66",
    GovernmentFee: "9200 ",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 25,
    source: require('../images/Monoglia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Monoglia',
    VisaManagerFee: "3540",
    AuthorityCharges: "944",
    GovernmentFee: "5720",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 26,
    source: require('../images/Maldives.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Maldives',
    VisaManagerFee: "590",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    currency: "",
    countryType:"DAC"
  },

  {
    id: 27,
    source: require('../images/malawi.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Malawi',
    VisaManagerFee: "1770",
    AuthorityCharges: "944",
    GovernmentFee: "4306",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 28,
    source: require('../images/Liechtenstein.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Liechtenstein',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "2500",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 29,
    source: require('../images/Lebanon.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Lebanon',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "10870",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 30,
    source: require('../images/Finland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Finland',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "9100",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 31,
    source: require('../images/Colombia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Colombia',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "944",
    GovernmentFee: "6500",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 32,
    source: require('../images/Australia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Australia',
    VisaManagerFee: "4130",
    AuthorityCharges: "0",
    GovernmentFee: "12400",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 33,
    source: require('../images/Austria.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Austria',
    VisaManagerFee: "2948.82",
    AuthorityCharges: "1931.66",
    GovernmentFee: "9100",
    currency: "",
    countryType: "Schengen"

  },

  {
    id: 34,
    source: require('../images/Bulgaria.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Bulgaria',
    VisaManagerFee: "2950",
    AuthorityCharges: "2070",
    GovernmentFee: "8600",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 35,
    source: require('../images/Malaysia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Malaysia',
    VisaManagerFee: "590",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    currency: "",
    countryType: "DAC"
  },

  {
    id: 36,
    source: require('../images/Japan.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Japan',
    VisaManagerFee: "1770",
    AuthorityCharges: "750",
    GovernmentFee: "550",
    currency: "",
    countryType: "evisa"
  },

  {
    id: 37,
    source: require('../images/Thailand.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Thailand',
    VisaManagerFee: "590",
    AuthorityCharges: "0",
    GovernmentFee: "0",
    currency: "",
    countryType: "DAC"
  },

  {
    id: 38,
    source: require('../images/Belgium.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Belgium',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 39,
    source: require('../images/Croatia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Croatia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 40,
    source: require('../images/Czechia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Czechia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 41,
    source: require('../images/Denmark.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Denmark',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 42,
    source: require('../images/Estonia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Estonia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 43,
    source: require('../images/Germany.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Germany',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 44,
    source: require('../images/Greece.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Greece',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 45,
    source: require('../images/Hungary.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Hungary',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 46,
    source: require('../images/Iceland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Iceland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },
  {
    id: 47,
    source: require('../images/Latvia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Latvia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 48,
    source: require('../images/Lithuania.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Lithuania',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 49,
    source: require('../images/Luxembourg.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Luxembourg',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 50,
    source: require('../images/Malta.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Malta',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 51,
    source: require('../images/Netherland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Netherland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 52,
    source: require('../images/Norway.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Norway',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 53,
    source: require('../images/Poland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Poland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 54,
    source: require('../images/Portugal.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Portugal',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 55,
    source: require('../images/Romania.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Romania',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 56,
    source: require('../images/Poland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Poland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 57,
    source: require('../images/Slovakia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Slovakia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 58,
    source: require('../images/Slovenia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Slovenia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 59,
    source: require('../images/Slovenia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Slovenia',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

  {
    id: 60,
    source: require('../images/Switzerland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Switzerland',
    VisaManagerFee: "2950",
    AuthorityCharges: "0",
    GovernmentFee: "9200",
    currency: "",
    countryType: "Schengen"
  },

];
export default DESTINATIONS;