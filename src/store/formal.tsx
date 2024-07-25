const data = [
  {
    id: 1,
    title: 'The Modern Stretch Suit Jacket',
    colors: ['charcoal', 'black', 'brown', 'burgundy'],
    sizes: ['small', 'medium', 'large', 'x-large'],
    category: ['formal'],
    details: `
      Model Height: 6'2 - Wearing Large \n
      Big & Tall: Height 6'3 - Wearing XXXL \n
      Available In Charcoal. \n
      Pointed Lapels \n
      Front Pocket \n
      Button Front \n
      Pair with The Modern Stretch Slim Trouser \n
      Shell 65% Polyester 33% Viscose 2% Spandex \n
      Lining 100% Polyester \n
      Imported \n
    `,
    product_summary: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    images: [
      'https://www.fashionnova.com/cdn/shop/products/02-17-22SuitingEditorial_CE_09-08-12_Look4_0589_KL_WG_DM_468x.jpg?v=1646354343',
      'https://www.fashionnova.com/cdn/shop/products/02-17-22SuitingEditorial_CE_09-07-38_Look4_0572_KL_DM_468x.jpg?v=1649374040'
    ],
    current_price: 2100,
    previous_price: 3100,
    stock: 10,
    reviews: [
      {
        name: 'Samantha D.',
        message: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
        date: 'August 14, 2023',
        verified: true,
        rating_count: 4.5
      },
      {
        name: 'Alex M.',
        message: `"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."`,
        date: 'August 15, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Ethan R.',
        message: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
        date: 'August 16, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Olivia P.',
        message: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
        date: 'August 14, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Liam K.',
        message: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
        date: 'August 18, 2023',
        verified: true,
        rating_count: 4.5
      },
      {
        name: 'Ava H.',
        message: `"I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."`,
        date: 'August 19, 2023',
        verified: false,
        rating_count: 4.5
      },
    ]
  },
  {
    id: 2,
    title: 'Bahamas Linen Suit Jacket',
    colors: ['green', 'blue', 'black'],
    sizes: ['small', 'medium', 'large'],
    category: ['formal'],
    details: `
      Available In Green.\n
      Button Closure\n
      Pointed Lapels\n
      Front Pockets\n
      Pair With "Bahamas Linen Suit Trousers"\n
      Shell: 55% Linen 45% Cotton\n
      Lining: 100% Polyester\n
      Imported\n
    `,
    product_summary: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    images: [
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_55_ZDF01U420004_Blue_CZ_DJ_13-34-17_102810_CM_468x.jpg?v=1717446658',
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_55_ZDF01U420004_Blue_CZ_DJ_13-34-00_102803_CM_468x.jpg?v=1717446658',
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_55_ZDF01U420004_Blue_CZ_DJ_13-34-40_102817_CM_468x.jpg?v=1717446655'
    ],
    current_price: 2500,
    previous_price: 0,
    stock: 13,
    reviews: [
      {
        name: 'Mellisa C.',
        message: `
          "Nice and lined but runs large."  
        `,
        date: 'July 10, 2024',
        verified: true,
        rating_count: 3
      },
      {
        name: 'Jon',
        message: `"you can get away with it but wouldn't recommend this for the biggest guys"`,
        date: 'July 9, 2024',
        verified: true,
        rating_count: 3
      },
      {
        name: 'Ethan R.',
        message: `"the material runs small"`,
        date: 'July 6, 4',
        verified: true,
        rating_count: 3
      }
    ]
  },
  {
    id: 3,
    title: 'Bahamas Linen Suit Jacket',
    colors: ['green', 'iceblue', 'oatmeal'],
    sizes: ['small', 'medium', 'large'],
    category: ['formal'],
    details: `
      Available In Green.\n
      Button Closure\n
      Pointed Lapels\n
      Front Pockets\n
      Pair With "Bahamas Linen Suit Trousers"\n
      Shell: 55% Linen 45% Cotton\n
      Lining: 100% Polyester\n
      Imported\n
    `,
    product_summary: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    images: [
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_61_ZDF01U420004_Green_CZ_DJ_13-53-06_102906_CM_468x.jpg?v=1717447071',
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_61_ZDF01U420004_Green_CZ_DJ_13-52-41_102900_CM_468x.jpg?v=1717447071',
      'https://www.fashionnova.com/cdn/shop/files/05-30-24_S7_61_ZDF01U420004_Green_CZ_DJ_13-54-29_102910_CM_468x.jpg?v=1717447068'
    ],
    current_price: 2500,
    previous_price: 0,
    stock: 13,
    reviews: [
      {
        name: 'Mellisa C.',
        message: `
          "Nice and lined but runs large."  
        `,
        date: 'July 10, 2024',
        verified: true,
        rating_count: 3
      },
      {
        name: 'Jon',
        message: `"you can get away with it but wouldn't recommend this for the biggest guys"`,
        date: 'July 9, 2024',
        verified: true,
        rating_count: 3
      },
      {
        name: 'Ethan R.',
        message: `"the material runs small"`,
        date: 'July 6, 4',
        verified: true,
        rating_count: 3
      }
    ]
  },
  {
    id: 4,
    title: 'Event Ready Car Coat',
    colors: ['green', 'iceblue', 'oatmeal'],
    sizes: ['small', 'medium', 'large'],
    category: ['formal'],
    details: `
      Model Height: 6'2 - Wearing Large\n
      Big & Tall: Height 6'3 - Wearing XXXL\n
      Fold Down Collar\n
      3 Button Closure\n
      2 Side Hand Pockets\n
      Disclaimer: To Keep The Aesthetic Of This Garment, Please Follow The Care Instructions Carefully.\n
      Shell: 71% Polyester 14% Cotton 6% Rayon 5% Wool 2% Acrylic 2% Nylon\n
      Lining: 100% Polyester\n
      Imported\n
    `,
    product_summary: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    images: [
      'https://www.fashionnova.com/cdn/shop/files/09-18-23Studio7_CC_DJ_13-42-25_22_FNMK263_Blackcombo_P_46949_MP_468x.jpg?v=1695417277',
      'https://www.fashionnova.com/cdn/shop/files/09-18-23Studio7_CC_DJ_13-42-52_22_FNMK263_Blackcombo_P_46957_MP_468x.jpg?v=1695417277',
      'https://www.fashionnova.com/cdn/shop/files/09-18-23Studio7_CC_DJ_13-43-04_22_FNMK263_Blackcombo_P_46961_MP_468x.jpg?v=1695417277'
    ],
    current_price: 4100,
    previous_price: 0,
    stock: 2,
    reviews: [
      {
        name: 'ADRIAN R.',
        message: `
          "Runs true to size I wear a 3x and ordered a 3x. Great quality very warm.. I would recommend the purchase"  
        `,
        date: 'October 31, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Shakara F.',
        message: `"Fiancé loved it"`,
        date: 'February 2, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Christopher S.',
        message: `"Overcoat fit perfectly and the color combo really looks good in pictures!"`,
        date: 'January 28, 2023',
        verified: true,
        rating_count: 5
      },
      {
        name: 'Juan R.',
        message: `"My son loves it"`,
        date: 'December 17, 2022',
        verified: true,
        rating_count: 5
      },
    ]
  },
]

export default data