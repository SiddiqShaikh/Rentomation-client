
export const howItWorks = [
  {
    icon: "", 
    heading: "Create your account",
    description: "Create your account with an ease",
  },
  {
    icon: "",
    heading: "Verify your document",
    description: "Scanned document for verification",
  },
  {
    icon: "",
    heading: "Put your property on rent",
    description: "Rent out your property and earn",
  },
];

export interface IPropertyData{
coverImage:string;
title:string;
rent:number;
bed:number;
shower:number;
area:number
}
export const propertyData : IPropertyData[] = [
  {
    coverImage:'/images/prop-one.jpg',
    title:'2578 Folsom street, san francisco, CA, 94110',
    rent:1200,
    bed:4,
    shower:2,
    area:2


  },
  {
    coverImage:'/images/prop-two.jpg',
    title:'2578 Folsom street, san francisco, CA, 94110',
    rent:1200,
    bed:4,
    shower:2,
    area:2


  },
  {
    coverImage:'/images/prop-three.jpg',
    title:'2578 Folsom street, san francisco, CA, 94110',
    rent:1200,
    bed:4,
    shower:2,
    area:2


  },
  {
    coverImage:'/images/prop-four.jpg',
    title:'2578 Folsom street, san francisco, CA, 94110',
    rent:1200,
    bed:4,
    shower:2,
    area:2


  },
  {
    coverImage:'/images/prop-five.jpg',
    title:'2578 Folsom street, san francisco, CA, 94110',
    rent:1200,
    bed:4,
    shower:2,
    area:2


  },
]
