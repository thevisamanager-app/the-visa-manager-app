const DESTINATIONS = [
  {
    id: 1,
    source: require('../images/vietnam.jpeg'),
    title: '07 NOV 11:42 AM',
    countrName: 'Vietnam',
    VisaManagerFee:"1770",
    AuthorityCharges:"750",
    GovernmentFee:"2350",
    currency:"",
    countryType:"eVisa", //  or eVisa or DAC 
  },
  {
    id: 2,
    source: require('../images/singapore.jpeg'),
    title: '08 DEC 12:15 PM',
    countrName: 'Singapore',
    VisaManagerFee:"799",
    AuthorityCharges:"999",
    GovernmentFee:"1900",
    currency:""
  },
  {
    id: 3,
    source: require('../images/South Korea.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'South Korea',
    VisaManagerFee:"3540",
    AuthorityCharges:"1200",
    GovernmentFee:"5800",
    currency:""
  },
  {
    id: 4,
    source: require('../images/indonesia.jpeg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Indonesia',
    VisaManagerFee:" 590",
    AuthorityCharges:"0",
    GovernmentFee:"2900",
    currency:""
  },
  {
    id: 5,
    source: require('../images/Hong-Kong.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Hong Kong',
    VisaManagerFee:"588.82",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
  {
    id: 6,
    source: require('../images/Cambodia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Cambodia',
    VisaManagerFee:"1770",
    AuthorityCharges:"944",
    GovernmentFee:"3100",
    currency:""
  },
  {
    id: 7,
    source: require('../images/Sri lanka.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sri-Lanka',
    VisaManagerFee:"800",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
  {
    id: 8,
    source: require('../images/philippines.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Philippines',
    VisaManagerFee:"1180",
    AuthorityCharges:"0",
    GovernmentFee:"5800",
    currency:""
  },
  {
    id: 9,
    source: require('../images/Uzbekistan.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uzbekistan',
    VisaManagerFee:"1770 per traveler",
    AuthorityCharges:"0",
    GovernmentFee:{
        Single:"1721",
        Double:"3012",
        multiple:"4303 "
    },
    currency:""
  },
  {
    id: 10,
    source: require('../images/Armenia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Armenia',
    VisaManagerFee:"1770 per traveler",
    AuthorityCharges:"0",
    GovernmentFee:"3600",
    currency:""
  },
  {
    id: 11,
    source: require('../images/Russia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Russia',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"8200",
    currency:""
  },
 {
    id: 12,
    source: require('../images/France.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'France',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"2311.62",
    GovernmentFee:"9100",
    currency:""
  },
   {
    id: 13,
    source: require('../images/Italy.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Italy',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"537",
    GovernmentFee:"9200 ",
    currency:""
  },
   {
    id: 14,
    source: require('../images/Usa.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'USA',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"0",
    GovernmentFee:"17020",
    currency:""
  },
   {
    id: 15,
    source: require('../images/Sweden.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Sweden',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"8200",
    currency:""
  },
   {
    id: 16,
    source: require('../images/Qatar.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Qatar',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"5000",
    currency:""
  },
   {
    id: 17,
    source: require('../images/Romania.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Romania',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"5000",
    currency:""
  },
   {
    id: 18,
    source: require('../images/Uganda.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uganda',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"6395",
    currency:""
  },
   {
    id: 19,
    source: require('../images/Uk.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Uk',
    VisaManagerFee:"4130",
    AuthorityCharges:"0",
    GovernmentFee:"15400 ",
    currency:""
  },
   {
    id: 20,
    source: require('../images/Poland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Poland',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"9743",
    currency:""
  },
   {
    id: 21,
    source: require('../images/Portugal.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Portugal',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"9200",
    currency:""
  },
   {
    id: 22,
    source: require('../images/Norway.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Norway',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"1740(",
    currency:""
  },
   {
    id: 23,
    source: require('../images/Nigeria.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Nigeria',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"3000",
    currency:""
  },
   {
    id: 24,
    source: require('../images/Netherland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Netherland',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"1931.66",
    GovernmentFee:"9200 ",
    currency:""
  },
   {
    id: 25,
    source: require('../images/Monoglia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Monoglia',
    VisaManagerFee:"3540",
    AuthorityCharges:"944",
    GovernmentFee:"5720",
    currency:""
  },
   {
    id: 26,
    source: require('../images/Maldives.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Maldives',
    VisaManagerFee:"590",
    AuthorityCharges:"0",
    GovernmentFee:"0",
    currency:""
  },
   {
    id: 27,
    source: require('../images/malawi.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Malawi',
    VisaManagerFee:"1770",
    AuthorityCharges:"944",
    GovernmentFee:"4306",
    currency:""
  },
   {
    id: 28,
    source: require('../images/Liechtenstein.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Liechtenstein',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"2500",
    currency:""
  },
   {
    id: 29,
    source: require('../images/Lebanon.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Lebanon',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"10870",
    currency:""
  },
   {
    id: 30,
    source: require('../images/Finland.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Finland',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"9100",
    currency:""
  },
   {
    id: 31,
    source: require('../images/Colombia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Colombia',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"944",
    GovernmentFee:"6500",
    currency:""
  },
  {
    id: 32,
    source: require('../images/Australia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Australia',
    VisaManagerFee:"4130",
    AuthorityCharges:"0",
    GovernmentFee:"12400",
    currency:""
  },
  {
    id: 33,
    source: require('../images/Austria.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Austria',
    VisaManagerFee:"2948.82",
    AuthorityCharges:"1931.66",
    GovernmentFee:"9100",
    currency:""
  },
  {
    id: 34,
    source: require('../images/Bularia.jpg'),
    title: '09 JAN 11:00 AM',
    countrName: 'Bularia',
    VisaManagerFee:"2950",
    AuthorityCharges:"2070",
    GovernmentFee:"8600",
    currency:""
  },

];
export default DESTINATIONS;