const CATEGORY_DATA = {
  'Fashion': {
    business: {
      name: "Viraat Ethnic & Fashion Studio",
      website: "https://viraatfashion.in",
      category: "Fashion & Apparel India",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&auto=format&fit=crop&q=80",
      description: "Handcrafted Indian ethnic wear, pure Banarasi silk sarees, artisan Chikankari kurtis, and contemporary festive apparel.",
      location: "Jaipur, Rajasthan, India",
      rating: 4.86,
      totalReviews: 480,
      verifiedCount: 450,
      nps: 78,
      positiveSentimentPct: 94,
      responseRatePct: 98
    },
    products: [
      {
        id: "PROD-FASH-101",
        name: "Banarasi Pure Katan Silk Zari Saree",
        category: "Ethnic Sarees",
        price: 5499,
        rating: 4.95,
        reviewsCount: 168,
        positivePct: 97,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        description: "Handwoven pure katan silk saree featuring intricate gold zari floral motifs, rich pallu, and unstitched matching blouse piece.",
        attributes: { quality: 5.0, value: 4.8, fit: 5.0, packaging: 4.9 }
      },
      {
        id: "PROD-FASH-102",
        name: "Hand-Embroidered Chanderi Cotton Kurti Set",
        category: "Kurtis & Suits",
        price: 2299,
        rating: 4.88,
        reviewsCount: 124,
        positivePct: 95,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        description: "Breathable Chanderi cotton kurti with delicate Lucknowi thread embroidery, paired with cotton palazzo pants and chiffon dupatta.",
        attributes: { quality: 4.9, value: 4.9, fit: 4.8, packaging: 4.7 }
      },
      {
        id: "PROD-FASH-103",
        name: "Tailored Pure Linen Nehru Jacket",
        category: "Men's Ethnic",
        price: 3199,
        rating: 4.82,
        reviewsCount: 95,
        positivePct: 92,
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80",
        description: "100% natural organic linen sleeveless Modi jacket with mandarin collar, brass metal buttons, and inner satin lining.",
        attributes: { quality: 4.8, value: 4.7, fit: 4.9, packaging: 4.8 }
      },
      {
        id: "PROD-FASH-104",
        name: "Handcrafted Kolhapuri Genuine Leather Mojaris",
        category: "Footwear & Accessories",
        price: 1499,
        rating: 4.78,
        reviewsCount: 82,
        positivePct: 90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
        description: "Vegetable-tanned authentic leather juttis crafted by master artisans with soft cushioned inner sole and anti-slip base.",
        attributes: { quality: 4.7, value: 4.9, fit: 4.6, packaging: 4.8 }
      },
      {
        id: "PROD-FASH-105",
        name: "Festive Gold Tissue Anarkali Gown with Dupatta",
        category: "Festive Gowns",
        price: 4899,
        rating: 4.91,
        reviewsCount: 110,
        positivePct: 96,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
        description: "Shimmering tissue gold fabric flared anarkali suit adorned with gota patti borders, latkan tassels, and scalloped net dupatta.",
        attributes: { quality: 4.9, value: 4.8, fit: 4.9, packaging: 5.0 }
      }
    ],
    reviewTemplates: [
      {
        rating: 5,
        text: "The Banarasi Katan Silk saree is breathtaking! The gold zari weaving is authentic, lightweight on shoulders, and drape is majestic. Received so many compliments at my sister's wedding!",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Impressed by the Chanderi Kurti set! The Lucknowi embroidery is fine and neat without loose threads. Pure cotton lining makes it extremely comfortable for all-day festive events.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "The Nehru jacket fit is tailored to perfection. Pure linen texture gives a very premium royal look with white kurta. The brass buttons add great vintage flair.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, fit: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Superb packaging with tissue butter paper and customized brand garment bag. Felt like unboxing a luxury designer boutique order!",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Anarkali gown flare is massive (almost 4.5 meters)! The gota patti work shimmers beautifully in evening lighting. Sleeves fitting was just slightly snug but easily alterable.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, fit: 4, packaging: 5 }
      },
      {
        rating: 5,
        text: "Authentic Kolhapuri craftsmanship! Pure leather smells genuine and cushioned insole prevented any shoe bite even after 6 hours on feet.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 4, packaging: 4 }
      },
      {
        rating: 5,
        text: "Color shown on website matched 100% with the real saree in natural sunlight. Prompt BlueDart delivery within 48 hours to Delhi NCR.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Fabric quality and stitching finish are top tier. Sizing chart is very accurate. Will definitely recommend to friends and family.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, fit: 5, packaging: 4 }
      },
      {
        rating: 4,
        text: "Very elegant design and rich color saturation. Looks twice as expensive as its price tag. Great Indian artisan craftsmanship.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 5, fit: 4, packaging: 4 }
      },
      {
        rating: 5,
        text: "Loved the soft fall of the silk! It's so pliable and easy to pleat compared to synthetic blends. Totally worth every rupee.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 3,
        text: "Dress fabric and design are gorgeous, but delivery courier took 2 extra days due to festive backlog. Customer support on WhatsApp was prompt though.",
        sentiment: "Neutral",
        attributes: { quality: 4, value: 4, fit: 4, packaging: 3 }
      },
      {
        rating: 5,
        text: "Kurta set fabric did not shrink or bleed color after the first cold wash. Extremely satisfied with dye fastness.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 4 }
      },
      {
        rating: 4,
        text: "Very comfortable fit around shoulders and chest. Nehru jacket pockets are functional and well-constructed.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, fit: 5, packaging: 4 }
      },
      {
        rating: 5,
        text: "Everything about this boutique experience was stellar - from easy UPI checkout to pristine unboxing. 5 stars!",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, fit: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Beautiful festive outfit! Heavy dupatta gives that rich regal appeal. Got countless inquiries where I bought it.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, fit: 4, packaging: 5 }
      }
    ],
    aiInsights: [
      {
        id: "INS-FASH-001",
        title: "Pure fabric drape & authentic zari weaving loved by shoppers",
        severity: "Strength",
        category: "Material & Craftsmanship",
        description: "97% of customer reviews specifically highlight the lightweight drape and authentic handloom luster.",
        actionText: "View fabric feedback",
        filterKeyword: "fabric",
        sentimentImpact: +21.2
      },
      {
        id: "INS-FASH-002",
        title: "Garment bag packaging creates luxury unboxing perception",
        severity: "Strength",
        category: "Packaging & Experience",
        description: "Over 94% of buyers commended the butter paper wrapping and reusable garment bags.",
        actionText: "View packaging reviews",
        filterKeyword: "packaging",
        sentimentImpact: +16.5
      }
    ],
    topics: [
      { name: "Fabric Texture & Fall", count: 320, positivePct: 98, negativePct: 2 },
      { name: "Accurate Size & Tailoring", count: 285, positivePct: 94, negativePct: 6 },
      { name: "True Festive Color", count: 240, positivePct: 96, negativePct: 4 },
      { name: "Express 48h Dispatch", count: 180, positivePct: 91, negativePct: 9 }
    ]
  },
  'Food': {
    business: {
      name: "Manusri Royal Kitchen & Dining",
      website: "https://manusrikitchen.in",
      category: "Food & Dining / Restaurant",
      logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80",
      description: "Authentic Indian gourmet delicacies, Hyderabadi dum biryanis, fresh tandoor breads, and traditional filter coffees.",
      location: "Bengaluru, Karnataka, India",
      rating: 4.88,
      totalReviews: 320,
      verifiedCount: 298,
      nps: 76,
      positiveSentimentPct: 92,
      responseRatePct: 98
    },
    products: [
      {
        id: "PROD-FOOD-101",
        name: "Special Hyderabadi Dum Biryani Feast",
        category: "Biryani & Rice Bowls",
        price: 380,
        rating: 4.95,
        reviewsCount: 142,
        positivePct: 96,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&auto=format&fit=crop&q=80",
        description: "Slow cooked in sealed copper handi with aged basmati rice, aromatic saffron, and tender marinated spices.",
        attributes: { quality: 5.0, value: 4.8, taste: 5.0, packaging: 4.9 }
      },
      {
        id: "PROD-FOOD-102",
        name: "Crispy Masala Butter Dosa Combo",
        category: "South Indian Tiffins",
        price: 190,
        rating: 4.85,
        reviewsCount: 98,
        positivePct: 94,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
        description: "Golden crispy crepe loaded with spiced potato masala, served with pure ghee, sambar, and 3 fresh chutneys.",
        attributes: { quality: 4.9, value: 4.9, taste: 4.9, packaging: 4.7 }
      },
      {
        id: "PROD-FOOD-103",
        name: "Paneer Butter Masala & Garlic Naan Meal",
        category: "North Indian Curries",
        price: 320,
        rating: 4.9,
        reviewsCount: 110,
        positivePct: 95,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
        description: "Cottage cheese cubes simmered in rich creamy tomato and cashew butter gravy with clay oven garlic naan.",
        attributes: { quality: 4.9, value: 4.8, taste: 5.0, packaging: 4.8 }
      },
      {
        id: "PROD-FOOD-104",
        name: "Traditional South Indian Thali",
        category: "Thalis & Combos",
        price: 280,
        rating: 4.8,
        reviewsCount: 85,
        positivePct: 91,
        image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=600&auto=format&fit=crop&q=80",
        description: "Complete wholesome platter with 3 seasonal curries, dal tadka, rasam, hot pooris, fragrant rice, and payasam.",
        attributes: { quality: 4.8, value: 5.0, taste: 4.8, packaging: 4.8 }
      },
      {
        id: "PROD-FOOD-105",
        name: "Artisan Filter Coffee & Dessert Platter",
        category: "Beverages & Desserts",
        price: 180,
        rating: 4.92,
        reviewsCount: 76,
        positivePct: 95,
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=600&auto=format&fit=crop&q=80",
        description: "Authentic chicory blend South Indian brass filter coffee served steaming hot with gulab jamun.",
        attributes: { quality: 5.0, value: 4.9, taste: 4.9, packaging: 4.9 }
      }
    ],
    reviewTemplates: [
      {
        rating: 5,
        text: "The Special Hyderabadi Dum Biryani was phenomenal! Spices were perfectly balanced and the food arrived piping hot in spill-proof tamper-evident packaging.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Best Paneer Butter Masala in Bengaluru! Soft paneer, authentic buttery gravy, and the garlic naan was fresh out of the tandoor.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Crispy Dosa combo with coconut and mint chutney made our morning breakfast delightful. Great hygienic packaging.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, taste: 5, packaging: 4 }
      },
      {
        rating: 4,
        text: "Wholesome South Indian Thali with genuine homestyle flavors. Portions are generous and well organized in insulated containers.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 5, taste: 4, packaging: 5 }
      },
      {
        rating: 5,
        text: "The filter coffee aroma was exceptional! Arrived steaming hot in insulated paper flasks with sweet hot gulab jamuns.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Outstanding taste and portion size! One biryani bowl easily satisfies two people. Real saffron aroma is unmistakable.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Rasam and sambar had that authentic home-ground spice flavor. Very hygienic container lids with zero spillage.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 5, taste: 4, packaging: 5 }
      },
      {
        rating: 3,
        text: "Food taste was wonderful, but during Sunday dinner rush, delivery took 45 minutes instead of 30. Still hot though.",
        sentiment: "Neutral",
        attributes: { quality: 4, value: 3, taste: 4, packaging: 3 }
      },
      {
        rating: 5,
        text: "Paneer was melting in the mouth, and garlic butter naan remained soft without turning rubbery. Will order again!",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Very impressed with the eco-friendly sugarcane bagasse tableware provided with the order. Thoughtful enterprise!",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Mirchi ka salan and dahi raita served with biryani were super fresh and flavorful. Great culinary standard.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, taste: 4, packaging: 4 }
      },
      {
        rating: 5,
        text: "Pure ghee aroma in every bite of the dosa. Reminds me of legendary traditional tiffin centers.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 4 }
      },
      {
        rating: 4,
        text: "Great dinner option for family gatherings. Everyone from kids to grandparents loved the mild yet rich flavors.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, taste: 4, packaging: 4 }
      },
      {
        rating: 5,
        text: "Quick 25 minute express delivery! Food was so hot we had to wait 5 minutes before eating. Excellent thermal boxes.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, taste: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Consistent quality every single week. That's what makes this our go-to Friday night dinner.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, taste: 4, packaging: 4 }
      }
    ],
    aiInsights: [
      {
        id: "INS-FOOD-001",
        title: "Piping hot delivery & hygienic spill-proof packing",
        severity: "Strength",
        category: "Packaging & Delivery",
        description: "96% of verified customer reviews specifically praise the heat retention and tamper-evident container packing.",
        actionText: "View food reviews",
        filterKeyword: "packaging",
        sentimentImpact: +18.4
      },
      {
        id: "INS-FOOD-002",
        title: "Aromatic spice balance & tender paneer loved by families",
        severity: "Strength",
        category: "Food Taste & Quality",
        description: "Over 92% of reviews highlighted genuine authentic spices and fresh cottage cheese quality.",
        actionText: "View taste feedback",
        filterKeyword: "taste",
        sentimentImpact: +15.1
      }
    ],
    topics: [
      { name: "Aroma & Authentic Spices", count: 280, positivePct: 96, negativePct: 4 },
      { name: "Spill-proof Hot Packaging", count: 240, positivePct: 94, negativePct: 6 },
      { name: "Generous Portion Size", count: 195, positivePct: 92, negativePct: 8 },
      { name: "On-time Weekend Delivery", count: 160, positivePct: 88, negativePct: 12 }
    ]
  },
  'Electronics': {
    business: {
      name: "Zaptor Electronics India",
      website: "https://zaptorelectronics.in",
      category: "Consumer Electronics & Smart Tech",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
      description: "India's trusted online hub for high-performance laptops, wireless audio gear, smart wearables, and gaming displays.",
      location: "Bengaluru, Karnataka, India",
      rating: 4.82,
      totalReviews: 5420,
      verifiedCount: 4980,
      nps: 68,
      positiveSentimentPct: 86,
      responseRatePct: 96
    },
    products: [
      {
        id: "PROD-ELEC-101",
        name: "Boat Rockerz 550 Over-Ear Wireless Headphones",
        category: "Audio & Acoustics",
        price: 2999,
        rating: 4.85,
        reviewsCount: 642,
        positivePct: 92,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
        description: "50mm dynamic drivers, 20 hours playback, physical noise isolation, ergonomic plush ear cushions.",
        attributes: { quality: 4.9, value: 4.8, performance: 4.9, battery: 4.7 }
      },
      {
        id: "PROD-ELEC-102",
        name: "Noise ColorFit Pro 4 Smartwatch",
        category: "Smart Wearables",
        price: 3499,
        rating: 4.75,
        reviewsCount: 512,
        positivePct: 88,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
        description: "1.72-inch TruView display, Bluetooth calling, 60Hz refresh rate, 100+ sports modes, SpO2 monitor.",
        attributes: { quality: 4.7, value: 4.8, performance: 4.7, battery: 4.6 }
      },
      {
        id: "PROD-ELEC-103",
        name: "Lenovo ThinkPad E14 Gen 4 Laptop",
        category: "Laptops & PCs",
        price: 64999,
        rating: 4.9,
        reviewsCount: 389,
        positivePct: 95,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
        description: "AMD Ryzen 7 5825U, 16GB DDR4, 512GB SSD, 14-inch FHD IPS display, backlit keyboard, fingerprint reader.",
        attributes: { quality: 5.0, value: 4.7, performance: 5.0, battery: 4.8 }
      },
      {
        id: "PROD-ELEC-104",
        name: "Cosmic Byte Firefly Mechanical Keyboard RGB",
        category: "Gaming Accessories",
        price: 2499,
        rating: 4.65,
        reviewsCount: 290,
        positivePct: 84,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
        description: "Tenkeyless compact RGB gaming keyboard with Outemu Blue mechanical switches, braided cable.",
        attributes: { quality: 4.6, value: 4.9, performance: 4.7, battery: 4.0 }
      }
    ],
    reviewTemplates: [
      {
        rating: 5,
        text: "Sound quality on Boat Rockerz 550 is exceptional! Deep punchy bass, crystal clear treble, and battery easily lasts 3 full days of heavy usage.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Lenovo ThinkPad E14 is a powerhouse for coding and office workloads. Very smooth UPI payment and delivery courier tracking was updated every 4 hours.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Noise ColorFit Smartwatch tracking is very accurate! Heart rate monitoring and step count work seamlessly with Google Fit.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, performance: 5, packaging: 4 }
      },
      {
        rating: 5,
        text: "Mechanical keyboard clicky switches feel tactile and satisfying for long programming sessions. Solid metal backplate.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 4 }
      },
      {
        rating: 5,
        text: "Bluetooth range connects smoothly across two rooms with zero audio stutter. Great microphone clarity during Zoom meetings.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Fast charging works as advertised. 10 minutes plug gives almost 3 hours of wireless music. Solid daily driver.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 5, performance: 4, packaging: 4 }
      },
      {
        rating: 3,
        text: "Device performance is great, but courier outer box had slight dent on edge. Fortunately inside bubble wrap kept it 100% safe.",
        sentiment: "Neutral",
        attributes: { quality: 4, value: 4, performance: 4, packaging: 3 }
      },
      {
        rating: 5,
        text: "Official GST invoice was instantly generated and downloadable. Claimed input tax credit without any hassle.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Bright outdoor display on the smartwatch makes reading notifications under direct sun effortless.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, performance: 4, packaging: 4 }
      },
      {
        rating: 5,
        text: "Outstanding value for money. Better build finish than competing international brands at twice the price.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, performance: 5, packaging: 5 }
      }
    ],
    aiInsights: [
      {
        id: "INS-ELEC-001",
        title: "Customers praise sound quality & battery longevity",
        severity: "Strength",
        category: "Product Performance",
        description: "94% of verified reviews highlight instant pairing and extended playback battery endurance.",
        actionText: "View audio feedback",
        filterKeyword: "audio",
        sentimentImpact: +14.2
      }
    ],
    topics: [
      { name: "Product Build Quality", count: 2140, positivePct: 94, negativePct: 6 },
      { name: "UPI & Fast Checkout", count: 1820, positivePct: 96, negativePct: 4 }
    ]
  },
  'Health': {
    business: {
      name: "AyurVeda Organics India",
      website: "https://ayurvedaorganics.in",
      category: "Ayurveda, Health & Organic",
      logo: "https://images.unsplash.com/photo-1608248597359-009e86c071d7?w=150&auto=format&fit=crop&q=80",
      description: "Pure Himalayan herbs, lab-tested organic supplements, natural wellness tonics, and holistic Ayurvedic care.",
      location: "Dehradun, Uttarakhand, India",
      rating: 4.9,
      totalReviews: 240,
      verifiedCount: 220,
      nps: 82,
      positiveSentimentPct: 95,
      responseRatePct: 99
    },
    products: [
      {
        id: "PROD-HLTH-101",
        name: "Pure Himalayan Shilajit Resin (Gold Grade)",
        category: "Ayurvedic Vitality",
        price: 1299,
        rating: 4.94,
        reviewsCount: 95,
        positivePct: 96,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
        description: "Pure gold-grade resin sourced from 18,000+ feet Himalayan altitudes, enriched with 80+ trace minerals and fulvic acid.",
        attributes: { quality: 5.0, value: 4.9, purity: 5.0, packaging: 4.9 }
      },
      {
        id: "PROD-HLTH-102",
        name: "Cold-Pressed Raw Organic Virgin Coconut Oil",
        category: "Organic Oils",
        price: 499,
        rating: 4.88,
        reviewsCount: 78,
        positivePct: 94,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80",
        description: "Extracted without heat from fresh Kerala coconuts, unrefined, zero additives, ideal for hair and skin nourishing.",
        attributes: { quality: 4.9, value: 5.0, purity: 4.9, packaging: 4.8 }
      }
    ],
    reviewTemplates: [
      {
        rating: 5,
        text: "Genuine Himalayan Shilajit! Lab report certificate enclosed in the box gives complete peace of mind. Noticed remarkable stamina improvement within 10 days.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, purity: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Virgin coconut oil aroma is divine. Completely pure and unadulterated. Great glass bottle packaging with zero leaks.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, purity: 5, packaging: 5 }
      },
      {
        rating: 4,
        text: "Authentic Ayurvedic preparation without synthetic fillers. Will subscribe for monthly replenishment.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, purity: 5, packaging: 4 }
      }
    ],
    aiInsights: [
      {
        id: "INS-HLTH-001",
        title: "Lab certified purity & glass container packaging praised",
        severity: "Strength",
        category: "Purity & Quality",
        description: "96% of customer reviews noted genuine wellness benefits and appreciated the QR-code batch test certificates.",
        actionText: "View purity reviews",
        filterKeyword: "purity",
        sentimentImpact: +22.0
      }
    ],
    topics: [
      { name: "Verified Lab Purity", count: 190, positivePct: 97, negativePct: 3 },
      { name: "Eco Glass Packaging", count: 140, positivePct: 94, negativePct: 6 }
    ]
  },
  'Home': {
    business: {
      name: "Samriddhi Home & Living",
      website: "https://samriddhihome.in",
      category: "Home & Kitchen Appliances",
      logo: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop&q=80",
      description: "Ergonomic furniture, smart kitchen organizers, artisan ceramic dinnerware, and aromatic living essentials.",
      location: "Pune, Maharashtra, India",
      rating: 4.84,
      totalReviews: 310,
      verifiedCount: 285,
      nps: 74,
      positiveSentimentPct: 91,
      responseRatePct: 97
    },
    products: [
      {
        id: "PROD-HOME-101",
        name: "Handmade Ceramic 16-Piece Dinnerware Set",
        category: "Kitchen & Dining",
        price: 3499,
        rating: 4.88,
        reviewsCount: 112,
        positivePct: 95,
        image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=600&auto=format&fit=crop&q=80",
        description: "Lead-free glazed stoneware dining set, microwave and dishwasher safe, crafted in earthy terracotta hues.",
        attributes: { quality: 4.9, value: 4.8, design: 5.0, packaging: 4.9 }
      },
      {
        id: "PROD-HOME-102",
        name: "Ultrasonic Essential Oil Aromatherapy Diffuser",
        category: "Home Decor",
        price: 1899,
        rating: 4.82,
        reviewsCount: 88,
        positivePct: 91,
        image: "https://images.unsplash.com/photo-1583847268964-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
        description: "Whisper-quiet cool mist humidifier with 7 mood LED ambient lights, auto shut-off, and wood grain finish.",
        attributes: { quality: 4.8, value: 4.7, design: 4.9, packaging: 4.8 }
      }
    ],
    reviewTemplates: [
      {
        rating: 5,
        text: "The ceramic dinner set arrived in heavy multi-layer honeycomb paper cushioning with not a single scratch or chip! Elegant glaze and weight.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 5, design: 5, packaging: 5 }
      },
      {
        rating: 5,
        text: "Diffuser mist is so soothing and relaxing. Covers our entire 300 sq ft living room with pleasant lemongrass fragrance.",
        sentiment: "Positive",
        attributes: { quality: 5, value: 4, design: 5, packaging: 4 }
      },
      {
        rating: 4,
        text: "Solid build quality and modern minimalist aesthetic. Upgraded the entire look of our dining table.",
        sentiment: "Positive",
        attributes: { quality: 4, value: 4, design: 5, packaging: 4 }
      }
    ],
    aiInsights: [
      {
        id: "INS-HOME-001",
        title: "Durable ceramic glaze & damage-free delivery commended",
        severity: "Strength",
        category: "Product Durability",
        description: "94% of customers praised safe fragile packaging and microwave-safe durability.",
        actionText: "View home reviews",
        filterKeyword: "ceramic",
        sentimentImpact: +17.5
      }
    ],
    topics: [
      { name: "Fragile Safe Packaging", count: 180, positivePct: 96, negativePct: 4 },
      { name: "Modern Minimalist Design", count: 155, positivePct: 93, negativePct: 7 }
    ]
  }
};

const getCategoryKey = (categoryName = '') => {
  const lower = (categoryName || '').toLowerCase();
  if (lower.includes('fashion') || lower.includes('apparel') || lower.includes('clothing') || lower.includes('saree') || lower.includes('kurti') || lower.includes('wear') || lower.includes('textile')) {
    return 'Fashion';
  } else if (lower.includes('food') || lower.includes('dining') || lower.includes('restaurant') || lower.includes('hotel') || lower.includes('beverage') || lower.includes('spice')) {
    return 'Food';
  } else if (lower.includes('electronics') || lower.includes('tech') || lower.includes('gadget') || lower.includes('computer') || lower.includes('audio') || lower.includes('smart')) {
    return 'Electronics';
  } else if (lower.includes('health') || lower.includes('ayurveda') || lower.includes('organic') || lower.includes('wellness') || lower.includes('herbal')) {
    return 'Health';
  } else if (lower.includes('home') || lower.includes('kitchen') || lower.includes('living') || lower.includes('decor') || lower.includes('appliance')) {
    return 'Home';
  }
  return 'Fashion';
};

const generateCategoryBusinessData = (categoryKey = 'Fashion', customBusiness = {}) => {
  const resolvedKey = getCategoryKey(categoryKey || customBusiness.category);
  const cat = CATEGORY_DATA[resolvedKey] || CATEGORY_DATA['Fashion'];

  const businessId = customBusiness.id || `BUS-IND-${Date.now()}`;
  const business = {
    ...cat.business,
    ...customBusiness,
    id: businessId
  };

  const products = cat.products.map((p, idx) => ({
    ...p,
    id: `PROD-${businessId.slice(-4)}-${idx + 101}`,
    businessId
  }));

  const firstNames = ["Rahul", "Priya", "Amit", "Sneha", "Vikram", "Ananya", "Rohan", "Kavya", "Siddharth", "Neha", "Arjun", "Meera", "Karan", "Pooja", "Dev", "Isha", "Aditya", "Riya", "Naveen", "Tanvi"];
  const lastNames = ["Sharma", "Verma", "Patel", "Gupta", "Rao", "Nair", "Singh", "Joshi", "Kapoor", "Mehta", "Kumar", "Chopra", "Deshmukh", "Bose", "Reddy"];
  const cities = ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh"];

  const customers = [];
  for (let i = 1; i <= 25; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    customers.push({
      id: `CUST-${businessId.slice(-4)}-${100 + i}`,
      businessId,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.in`,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      location: cities[i % cities.length],
      ordersCount: (i % 4) + 1,
      totalSpent: ((i % 4) + 1) * (products[0]?.price || 1500),
      createdAt: new Date(Date.now() - (i * 86400000 * 2)).toISOString()
    });
  }

  const orders = [];
  for (let i = 1; i <= 30; i++) {
    const cust = customers[i % customers.length];
    const prod = products[i % products.length];
    orders.push({
      id: `ORD-${businessId.slice(-4)}-${1000 + i}`,
      businessId,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      productId: prod.id,
      productName: prod.name,
      amount: prod.price,
      status: "Delivered",
      orderDate: new Date(Date.now() - (i * 86400000 * 3)).toISOString(),
      deliveryDate: new Date(Date.now() - (i * 86400000 * 2)).toISOString(),
      invitationSent: i % 2 === 0
    });
  }

  const reviews = [];
  const reviewCount = Math.min(40, cat.reviewTemplates.length * 3);
  for (let i = 1; i <= reviewCount; i++) {
    const cust = customers[i % customers.length];
    const prod = products[i % products.length];
    const ord = orders[i % orders.length];
    const tmpl = cat.reviewTemplates[i % cat.reviewTemplates.length];
    const date = new Date(Date.now() - (i * 36000000)).toISOString();

    reviews.push({
      id: `REV-${businessId.slice(-4)}-${2000 + i}`,
      businessId,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      customerLocation: cust.location,
      productId: prod.id,
      productName: prod.name,
      productImage: prod.image,
      orderId: ord.id,
      reviewType: i % 4 === 0 ? "Company" : "Product",
      rating: tmpl.rating,
      reviewText: tmpl.text,
      sentiment: tmpl.sentiment,
      attributes: tmpl.attributes,
      verified: true,
      status: "Published",
      recommend: tmpl.rating >= 4,
      photos: [],
      invitationToken: `TOK-${ord.id}`,
      createdAt: date
    });
  }

  const total = reviews.length;
  const avg = total > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / total) : 5.0;
  const posCount = reviews.filter(r => r.sentiment === 'Positive').length;

  business.totalReviews = total;
  business.rating = Number(avg.toFixed(2));
  business.verifiedCount = reviews.filter(r => r.verified).length;
  business.positiveSentimentPct = total > 0 ? Math.round((posCount / total) * 100) : 95;

  const aiInsights = cat.aiInsights.map((ins, idx) => ({
    ...ins,
    id: `INS-${businessId.slice(-4)}-${idx + 1}`
  }));

  const invitations = [];
  for (let i = 1; i <= 10; i++) {
    const ord = orders[i];
    invitations.push({
      id: `INV-${businessId.slice(-4)}-${100 + i}`,
      businessId,
      customerId: ord.customerId,
      customerName: ord.customerName,
      customerEmail: ord.customerEmail,
      orderId: ord.id,
      productId: ord.productId,
      productName: ord.productName,
      token: `TOK-INV-${ord.id}`,
      status: i % 3 === 0 ? "Reviewed" : "Sent",
      sentAt: new Date(Date.now() - (i * 86400000)).toISOString()
    });
  }

  return {
    business,
    products,
    customers,
    orders,
    reviews,
    aiInsights,
    topics: cat.topics,
    invitations,
    campaigns: [],
    widgets: []
  };
};

const generateSeedData = () => {
  const initial = generateCategoryBusinessData('Food', {
    id: "BUS-FOOD-101",
    name: "Manusri Royal Kitchen & Dining",
    category: "Food & Dining / Restaurant"
  });

  const users = [
    {
      id: "USER-001",
      name: "Mahek Patel",
      email: "mahek@manusrikitchen.in",
      password: "password123",
      role: "Admin",
      businessId: initial.business.id
    }
  ];

  return {
    users,
    businesses: [initial.business],
    ...initial
  };
};

module.exports = { 
  generateSeedData, 
  generateCategoryBusinessData,
  getCategoryKey,
  CATEGORY_DATA 
};
