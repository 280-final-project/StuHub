"use client";

import { useState } from "react";

const deals = [
  {
    icon: "🎓",
    title: "UNiDAYS",
    desc: "Verify your student status and unlock exclusive discounts at hundreds of brands.",
    previewHours: "Online — always available",
    previewLocation: "unidays.com",
    badges: ["Free to Join", "Hundreds of Brands"],
    fullDescription:
      "UNiDAYS is a free student verification service that connects you with exclusive discounts from top brands in fashion, tech, food, and more. Simply verify your student email and start saving.",
    details: [
      { label: "How to Access", value: "Sign up at unidays.com with your .edu email to verify student status." },
      { label: "Popular Brands", value: "Apple, Nike, Samsung, ASOS, Spotify, and many more." },
      { label: "Discount Range", value: "Typically 10–25% off, with occasional higher flash deals." },
    ],
  },
  {
    icon: "🫘",
    title: "Student Beans",
    desc: "Another top student discount platform with deals across fashion, tech, and food.",
    previewHours: "Online — always available",
    previewLocation: "studentbeans.com",
    badges: ["Free to Join", "Global Brands"],
    fullDescription:
      "Student Beans offers verified student discounts from thousands of brands worldwide. Verify your enrollment and browse deals in categories like fashion, tech, food, travel, and entertainment.",
    details: [
      { label: "How to Access", value: "Create an account at studentbeans.com and verify with your student ID or .edu email." },
      { label: "Popular Brands", value: "ASOS, Topshop, HP, Lenovo, Domino's, and more." },
      { label: "Discount Range", value: "10–30% off depending on the retailer." },
    ],
  },
  {
    icon: "🍎",
    title: "Apple Education Store",
    desc: "Save on Mac, iPad, and accessories through Apple's education pricing.",
    previewHours: "Online — always available",
    previewLocation: "apple.com/shop/education",
    badges: ["Up to $300 Off", "Free AirPods Promo"],
    fullDescription:
      "Apple offers special education pricing on Mac and iPad products. During the annual Back to School promotion, students can also receive free AirPods with qualifying purchases.",
    details: [
      { label: "How to Access", value: "Visit apple.com/shop/education and sign in with your .edu email or UNiDAYS." },
      { label: "Eligible Products", value: "MacBook Air, MacBook Pro, iMac, iPad Pro, iPad Air, and accessories." },
      { label: "Savings", value: "Up to $300 off Mac, up to $100 off iPad, and free AirPods during Back to School." },
    ],
  },
  {
    icon: "💻",
    title: "Microsoft Student",
    desc: "Get Office 365 free and save up to 10% on Surface devices.",
    previewHours: "Online — always available",
    previewLocation: "microsoft.com/en-us/education",
    badges: ["Free Office 365", "Surface Discounts"],
    fullDescription:
      "Microsoft provides free Office 365 Education to students with a valid school email, plus discounts on Surface laptops and accessories through the Microsoft Education Store.",
    details: [
      { label: "How to Access", value: "Go to microsoft.com/education and sign up with your school email." },
      { label: "Free Software", value: "Office 365 including Word, Excel, PowerPoint, OneNote, Teams, and 1 TB OneDrive." },
      { label: "Hardware Discounts", value: "Up to 10% off Surface Pro, Surface Laptop, and accessories." },
    ],
  },
  {
    icon: "🎨",
    title: "Adobe Creative Cloud",
    desc: "Get the full Creative Cloud suite at over 60% off the regular price.",
    previewHours: "Online — always available",
    previewLocation: "adobe.com/creativecloud/plans",
    badges: ["60%+ Off", "All Apps Included"],
    fullDescription:
      "Adobe offers its complete Creative Cloud suite — including Photoshop, Illustrator, Premiere Pro, After Effects, and more — at a steep student discount. Perfect for design, video, and photography coursework.",
    details: [
      { label: "How to Access", value: "Visit adobe.com and select the Students & Teachers plan. Verify with SheerID." },
      { label: "Price", value: "Around $19.99/mo for the full All Apps plan (regularly $54.99/mo)." },
      { label: "Included Apps", value: "Photoshop, Illustrator, Premiere Pro, After Effects, InDesign, Lightroom, and 20+ more." },
    ],
  },
  {
    icon: "🎵",
    title: "Spotify Student",
    desc: "Get Spotify Premium, Hulu, and SHOWTIME bundled for just $5.99/mo.",
    previewHours: "Online — always available",
    previewLocation: "spotify.com/student",
    badges: ["$5.99/mo", "Hulu Included"],
    fullDescription:
      "The Spotify Premium Student plan gives you ad-free music streaming, offline downloads, plus access to Hulu (ad-supported) and SHOWTIME — all for one low monthly price.",
    details: [
      { label: "How to Access", value: "Go to spotify.com/student and verify enrollment through SheerID." },
      { label: "Price", value: "$5.99/mo (regularly $10.99/mo for Premium alone)." },
      { label: "Includes", value: "Spotify Premium, Hulu (ad-supported), and SHOWTIME streaming." },
    ],
  },
  {
    icon: "📦",
    title: "Amazon Prime Student",
    desc: "6-month free trial then 50% off Prime — free shipping, Prime Video, and more.",
    previewHours: "Online — always available",
    previewLocation: "amazon.com/primestudent",
    badges: ["6 Months Free", "50% Off After"],
    fullDescription:
      "Amazon Prime Student offers a generous 6-month free trial, then half-price Prime membership. Enjoy free two-day shipping, Prime Video, Prime Music, Prime Reading, and exclusive student deals.",
    details: [
      { label: "How to Access", value: "Sign up at amazon.com/primestudent with your .edu email." },
      { label: "Price", value: "Free for 6 months, then $7.49/mo or $69/year (regular Prime is $14.99/mo)." },
      { label: "Benefits", value: "Free shipping, Prime Video, Prime Music, Prime Reading, exclusive deals, and more." },
    ],
  },
  {
    icon: "🐙",
    title: "GitHub Student Pack",
    desc: "Free developer tools, cloud credits, domains, and more — valued at thousands of dollars.",
    previewHours: "Online — always available",
    previewLocation: "education.github.com/pack",
    badges: ["Free", "$200k+ in Tools"],
    fullDescription:
      "The GitHub Student Developer Pack bundles free access to dozens of premium developer tools, cloud services, and learning platforms. Includes GitHub Pro, cloud credits, free domains, CI/CD tools, and more.",
    details: [
      { label: "How to Access", value: "Apply at education.github.com/pack with your school email or student ID." },
      { label: "Top Perks", value: "GitHub Pro, DigitalOcean credits, Namecheap free domain, JetBrains IDEs, and more." },
      { label: "Value", value: "Over $200,000 worth of tools and services, all free while you're a student." },
    ],
  },
  {
    icon: "📝",
    title: "Notion Student Plan",
    desc: "Get the Notion Plus plan completely free with your student email.",
    previewHours: "Online — always available",
    previewLocation: "notion.so/students",
    badges: ["Free Plus Plan", "Unlimited Blocks"],
    fullDescription:
      "Notion offers its Plus plan (normally $8/mo) entirely free to students. Organize notes, projects, wikis, and databases with unlimited blocks and file uploads.",
    details: [
      { label: "How to Access", value: "Sign up at notion.so with your .edu email — the Plus plan is applied automatically." },
      { label: "Features", value: "Unlimited blocks, unlimited file uploads, 30-day version history, and guest collaborators." },
      { label: "Use Cases", value: "Class notes, project management, personal wiki, habit tracking, and team collaboration." },
    ],
  },
  {
    icon: "🎨",
    title: "Canva Pro",
    desc: "Free Canva Pro for students — premium templates, Brand Kit, Background Remover, and more.",
    previewHours: "Online — always available",
    previewLocation: "canva.com/education",
    badges: ["Free Pro Access", "100M+ Templates"],
    fullDescription:
      "Canva for Education provides free access to Canva Pro features for students and educators. Create stunning presentations, social media graphics, posters, and more with premium tools.",
    details: [
      { label: "How to Access", value: "Apply at canva.com/education with your school email. Verification may take 24–48 hours." },
      { label: "Pro Features", value: "Brand Kit, Background Remover, Magic Resize, premium stock photos, and 100M+ templates." },
      { label: "Great For", value: "Presentations, flyers, social media posts, resumes, infographics, and class projects." },
    ],
  },
  {
    icon: "👟",
    title: "Nike Student Discount",
    desc: "10% off almost everything at Nike.com with student verification.",
    previewHours: "Online — always available",
    previewLocation: "nike.com",
    badges: ["10% Off", "Via UNiDAYS"],
    fullDescription:
      "Nike offers a 10% student discount on nearly all full-price and sale items through UNiDAYS verification. Stack it with Nike Member rewards for even more savings.",
    details: [
      { label: "How to Access", value: "Verify your student status through UNiDAYS, then apply the code at Nike.com checkout." },
      { label: "Discount", value: "10% off most items (some exclusions on limited releases)." },
      { label: "Tip", value: "Sign up for Nike Membership (free) to get early access, birthday rewards, and free shipping." },
    ],
  },
  {
    icon: "👟",
    title: "Adidas Student Discount",
    desc: "Save 20% on adidas orders with UNiDAYS or Student Beans verification.",
    previewHours: "Online — always available",
    previewLocation: "adidas.com",
    badges: ["20% Off", "Via UNiDAYS"],
    fullDescription:
      "Adidas provides a generous 20% student discount on full-price items. Verify through UNiDAYS or Student Beans and use the promo code at checkout.",
    details: [
      { label: "How to Access", value: "Verify through UNiDAYS or Student Beans and use the promo code at adidas.com." },
      { label: "Discount", value: "20% off full-price items (some exclusions apply)." },
      { label: "Tip", value: "Join adiClub (free) for points, early access, and member-only sales." },
    ],
  },
  {
    icon: "👖",
    title: "Levi's Student Discount",
    desc: "15% off your Levi's order with a verified student email.",
    previewHours: "Online — always available",
    previewLocation: "levi.com",
    badges: ["15% Off", "Via UNiDAYS"],
    fullDescription:
      "Levi's offers 15% off for students through UNiDAYS. Stock up on jeans, jackets, and accessories at a lower price.",
    details: [
      { label: "How to Access", value: "Verify through UNiDAYS and apply the discount code at levi.com." },
      { label: "Discount", value: "15% off your entire order (some exclusions may apply)." },
      { label: "Popular Items", value: "501 Originals, Ribcage jeans, Trucker Jackets, and graphic tees." },
    ],
  },
  {
    icon: "🛍️",
    title: "ASOS Student Discount",
    desc: "10% off everything on ASOS with student verification.",
    previewHours: "Online — always available",
    previewLocation: "asos.com",
    badges: ["10% Off", "Via UNiDAYS"],
    fullDescription:
      "ASOS offers a 10% student discount on all items, all the time. Verify through UNiDAYS or Student Beans and save on fashion, beauty, and accessories.",
    details: [
      { label: "How to Access", value: "Verify through UNiDAYS or Student Beans, then use the code at ASOS checkout." },
      { label: "Discount", value: "10% off everything, including sale items." },
      { label: "Tip", value: "ASOS Premier Delivery ($19.99/year for students) gives unlimited free next-day delivery." },
    ],
  },
  {
    icon: "🖥️",
    title: "Dell Student Discount",
    desc: "Extra savings on Dell laptops and accessories through the Dell University program.",
    previewHours: "Online — always available",
    previewLocation: "dell.com/en-us/lp/students",
    badges: ["Up to $300 Off", "Student Exclusive"],
    fullDescription:
      "Dell offers exclusive student pricing on popular laptops like the XPS, Inspiron, and Latitude series. Access member-only coupons and financing options through Dell University.",
    details: [
      { label: "How to Access", value: "Visit dell.com/students and register with your .edu email for exclusive access." },
      { label: "Savings", value: "Up to $300 off select laptops, plus exclusive coupons and bundles." },
      { label: "Popular Models", value: "XPS 13, XPS 15, Inspiron 14, Inspiron 16, and Dell monitors." },
    ],
  },
  {
    icon: "💻",
    title: "Lenovo Student Discount",
    desc: "Up to 20% off Lenovo laptops and accessories through their education store.",
    previewHours: "Online — always available",
    previewLocation: "lenovo.com/us/en/landingpage/students-and-teachers/",
    badges: ["Up to 20% Off", "Student Store"],
    fullDescription:
      "Lenovo's Education Store offers exclusive pricing on ThinkPad, Yoga, IdeaPad, and Legion laptops. Students also get access to special bundles and financing options.",
    details: [
      { label: "How to Access", value: "Visit Lenovo's education store and verify with ID.me or your .edu email." },
      { label: "Savings", value: "Up to 20% off select laptops and accessories." },
      { label: "Popular Models", value: "ThinkPad X1 Carbon, Yoga 9i, IdeaPad 5, Legion Pro, and Tab P11." },
    ],
  },
  {
    icon: "🏪",
    title: "Best Buy Student Deals",
    desc: "Exclusive student deals on laptops, headphones, and tech through Best Buy's hub.",
    previewHours: "Online — always available",
    previewLocation: "bestbuy.com/student-deals",
    badges: ["Student Hub", "Tech Deals"],
    fullDescription:
      "Best Buy's Student Hub features exclusive pricing and bundles on laptops, tablets, headphones, and dorm essentials. New deals rotate regularly throughout the school year.",
    details: [
      { label: "How to Access", value: "Visit bestbuy.com/site/back-to-school and browse the student deals section." },
      { label: "Types of Deals", value: "Discounted laptops, free accessories with purchase, bundle savings." },
      { label: "Tip", value: "Sign up for My Best Buy (free) for price matching, exclusive offers, and reward points." },
    ],
  },
  {
    icon: "🍔",
    title: "McDonald's Student Deals",
    desc: "Use the McDonald's app for BOGOs, $1 drinks, free fries, and rotating offers.",
    previewHours: "Varies by location",
    previewLocation: "McDonald's App",
    badges: ["App Deals", "BOGOs"],
    fullDescription:
      "While not a student-exclusive program, the McDonald's app consistently offers deals that are perfect for budget-conscious students — BOGOs, $1 any-size drinks, free fries with $1 purchase, and more.",
    details: [
      { label: "How to Access", value: "Download the McDonald's app, create an account, and browse the Deals section." },
      { label: "Common Deals", value: "BOGO Big Mac, $1 large fries, free McFlurry, $2 McCafé drinks." },
      { label: "Tip", value: "Check the app daily — deals refresh frequently and some are one-time-use per day." },
    ],
  },
  {
    icon: "🌯",
    title: "Chipotle Student Deals",
    desc: "Chipotle Rewards earn free food — students can stack with BOGO promos.",
    previewHours: "Varies by location",
    previewLocation: "Chipotle App",
    badges: ["Rewards Program", "Free Entrées"],
    fullDescription:
      "Chipotle's loyalty program earns you 10 points per $1 spent, with free food and extras as rewards. Students can also catch limited-time BOGO and free-delivery promos throughout the semester.",
    details: [
      { label: "How to Access", value: "Download the Chipotle app and join Chipotle Rewards (free)." },
      { label: "How It Works", value: "Earn 10 points per $1 spent. 1,250 points = free entrée." },
      { label: "Student Promos", value: "Watch for BOGO events, free delivery codes, and limited-time challenges." },
    ],
  },
  {
    icon: "🍕",
    title: "Domino's Student Deals",
    desc: "Mix & match deal: 2 or more items for $6.99 each — pizza, pasta, wings, and more.",
    previewHours: "Varies by location",
    previewLocation: "dominos.com",
    badges: ["$6.99 Mix & Match", "Delivery Deals"],
    fullDescription:
      "Domino's Mix & Match deal lets you pick 2 or more items for $6.99 each — medium pizzas, bread bowls, pasta, wings, and more. Great for group orders and late-night study sessions.",
    details: [
      { label: "How to Access", value: "Order online at dominos.com or through the Domino's app and select Mix & Match." },
      { label: "Items Available", value: "Medium 2-topping pizzas, stuffed cheesy bread, pasta, wings, and more." },
      { label: "Tip", value: "Carryout specials are often cheaper — check for $7.99 large 3-topping carryout." },
    ],
  },
  {
    icon: "☕",
    title: "Starbucks Birthday Reward",
    desc: "Free handcrafted drink or food item on your birthday as a Starbucks Rewards member.",
    previewHours: "On your birthday",
    previewLocation: "Any Starbucks",
    badges: ["Free Drink", "Birthday Reward"],
    fullDescription:
      "Starbucks Rewards members receive a free handcrafted drink (any size) or food item during their birthday. Make sure your birthday is set in your profile at least 2 days before.",
    details: [
      { label: "How to Access", value: "Join Starbucks Rewards (free) and set your birthday in your profile." },
      { label: "What You Get", value: "One free handcrafted drink (any size, any customization) or food item." },
      { label: "Requirements", value: "Must have made at least one Star-earning transaction before your birthday." },
    ],
  },
  {
    icon: "💄",
    title: "Sephora Birthday Gift",
    desc: "Free birthday gift set from Sephora Beauty Insider — no purchase required.",
    previewHours: "During your birthday month",
    previewLocation: "Any Sephora",
    badges: ["Free Gift", "No Purchase Needed"],
    fullDescription:
      "Sephora Beauty Insider members receive a free birthday gift during their birthday month. Choose from curated mini-sets from luxury brands — no purchase necessary in-store.",
    details: [
      { label: "How to Access", value: "Join Beauty Insider (free) at sephora.com and set your birthday." },
      { label: "What You Get", value: "A curated mini product set (options change annually). Choose in-store or online (with purchase)." },
      { label: "Tip", value: "Redeem in-store with no purchase required, or online with any order." },
    ],
  },
  {
    icon: "🥞",
    title: "IHOP Birthday Meal",
    desc: "Free stack of Rooty Tooty Fresh 'N Fruity pancakes on your birthday.",
    previewHours: "On your birthday",
    previewLocation: "Any IHOP",
    badges: ["Free Pancakes", "Birthday Reward"],
    fullDescription:
      "IHOP's International Pancake Passport loyalty program gives members a free stack of Rooty Tooty Fresh 'N Fruity pancakes on their birthday. Join the program and set your birthday to redeem.",
    details: [
      { label: "How to Access", value: "Join the International Pancake Passport at ihop.com or through the IHOP app." },
      { label: "What You Get", value: "A free full stack of Rooty Tooty Fresh 'N Fruity pancakes on your birthday." },
      { label: "Tip", value: "You'll also earn PanCoins on every visit that can be redeemed for free menu items." },
    ],
  },
  {
    icon: "🎬",
    title: "AMC Student Tickets",
    desc: "Discounted movie tickets for students on Thursdays at AMC Theatres.",
    previewHours: "Thursdays",
    previewLocation: "AMC Theatres",
    badges: ["Discount Tickets", "Thursdays"],
    fullDescription:
      "AMC offers discounted student tickets on select days (typically Thursdays). Show your valid student ID at the box office or book through the AMC app for reduced pricing.",
    details: [
      { label: "How to Access", value: "Show your valid student ID at the box office or check the AMC app for student pricing." },
      { label: "Discount", value: "Varies by location, typically $3–5 off regular ticket price." },
      { label: "Tip", value: "Join AMC Stubs (free tier available) for additional points and rewards on concessions." },
    ],
  },
  {
    icon: "🚌",
    title: "Student Transit Pass",
    desc: "Discounted VTA transit passes included with SJSU enrollment fees.",
    previewHours: "Active during enrollment",
    previewLocation: "VTA / SJSU Campus",
    badges: ["Included with Fees", "Unlimited Rides"],
    fullDescription:
      "SJSU students receive a SmartPass (VTA transit pass) funded through student fees. It provides unlimited rides on VTA buses and light rail throughout the semester.",
    details: [
      { label: "How to Access", value: "Activate your SmartPass through the Clipper card system with your SJSU Tower Card." },
      { label: "Coverage", value: "Unlimited rides on all VTA bus and light rail routes." },
      { label: "Note", value: "Valid during fall and spring semesters while enrolled. Summer availability may vary." },
    ],
  },
  {
    icon: "📚",
    title: "Coursera / edX Student Discounts",
    desc: "Financial aid and free audit options for online courses from top universities.",
    previewHours: "Online — always available",
    previewLocation: "coursera.org / edx.org",
    badges: ["Financial Aid", "Free Audits"],
    fullDescription:
      "Coursera and edX offer financial aid for paid certificates and most courses can be audited for free. Great for supplementing your major with courses from Stanford, MIT, Harvard, and more.",
    details: [
      { label: "How to Access", value: "Apply for financial aid on Coursera or audit courses for free on edX." },
      { label: "Financial Aid", value: "Coursera offers up to 100% off certificates. edX offers discounted verified certificates." },
      { label: "Popular Courses", value: "Machine Learning, CS50, Data Science, Business Strategy, and UX Design." },
    ],
  },
  {
    icon: "🛍️",
    title: "Urban Outfitters Student Discount",
    desc: "10% off at Urban Outfitters with student verification via UNiDAYS.",
    previewHours: "Online — always available",
    previewLocation: "urbanoutfitters.com",
    badges: ["10% Off", "Via UNiDAYS"],
    fullDescription:
      "Urban Outfitters provides a 10% student discount on full-price items. Verify through UNiDAYS and use the promo code at checkout for savings on clothing, home décor, and accessories.",
    details: [
      { label: "How to Access", value: "Verify student status through UNiDAYS and apply the code at checkout." },
      { label: "Discount", value: "10% off full-price items (exclusions may apply)." },
      { label: "Categories", value: "Clothing, apartment décor, vinyl records, tech accessories, and gifts." },
    ],
  },
  {
    icon: "👟",
    title: "Puma Student Discount",
    desc: "10% off Puma orders with verified student status.",
    previewHours: "Online — always available",
    previewLocation: "puma.com",
    badges: ["10% Off", "Via UNiDAYS"],
    fullDescription:
      "Puma offers a 10% student discount on orders placed through puma.com. Verify through UNiDAYS and grab sneakers, activewear, and accessories at a lower price.",
    details: [
      { label: "How to Access", value: "Verify through UNiDAYS and use the promo code at puma.com checkout." },
      { label: "Discount", value: "10% off most items (some exclusions apply)." },
      { label: "Popular Items", value: "Suede Classic, RS-X, Cali sneakers, training gear, and bags." },
    ],
  },
  {
    icon: "👟",
    title: "New Balance Student Discount",
    desc: "15% off New Balance with student verification through Student Beans.",
    previewHours: "Online — always available",
    previewLocation: "newbalance.com",
    badges: ["15% Off", "Via Student Beans"],
    fullDescription:
      "New Balance provides a 15% student discount on full-price items. Verify your enrollment through Student Beans and use the code at checkout.",
    details: [
      { label: "How to Access", value: "Verify student status through Student Beans and apply the code at newbalance.com." },
      { label: "Discount", value: "15% off full-price items." },
      { label: "Popular Models", value: "574, 990v6, Fresh Foam, FuelCell, and NB apparel." },
    ],
  },
  {
    icon: "🖥️",
    title: "HP Education Store",
    desc: "Up to 40% off HP laptops, desktops, and accessories for students.",
    previewHours: "Online — always available",
    previewLocation: "hp.com/us-en/shop/education",
    badges: ["Up to 40% Off", "Education Store"],
    fullDescription:
      "HP's Education Store offers exclusive student pricing on laptops, desktops, monitors, and accessories. Verify enrollment for access to savings of up to 40% on select products.",
    details: [
      { label: "How to Access", value: "Visit HP's Education Store and verify with your .edu email or student ID." },
      { label: "Savings", value: "Up to 40% off select laptops and accessories." },
      { label: "Popular Models", value: "HP Spectre, Envy, Pavilion, OMEN gaming laptops, and HP monitors." },
    ],
  },
  {
    icon: "♻️",
    title: "Back Market Student Discount",
    desc: "Up to $25 off refurbished devices — phones, laptops, and tablets.",
    previewHours: "Online — always available",
    previewLocation: "backmarket.com",
    badges: ["Student Discount", "Refurbished Tech"],
    fullDescription:
      "Back Market offers student discounts on certified refurbished electronics — iPhones, MacBooks, iPads, Samsung devices, and more. Save money and help the environment.",
    details: [
      { label: "How to Access", value: "Verify student status through Student Beans on the Back Market website." },
      { label: "Discount", value: "Up to $25 off orders, plus regular site-wide sales." },
      { label: "Products", value: "Refurbished iPhones, MacBooks, iPads, Samsung phones, and gaming consoles." },
    ],
  },
  {
    icon: "🥪",
    title: "Subway Student Deals",
    desc: "Subway app deals and footlong combos starting at $6.99 — perfect for quick meals.",
    previewHours: "Varies by location",
    previewLocation: "Subway App",
    badges: ["App Deals", "Combo Deals"],
    fullDescription:
      "Subway's app features rotating deals on footlong subs, combos, and meal deals. While not student-exclusive, the pricing is great for students looking for a quick, affordable meal.",
    details: [
      { label: "How to Access", value: "Download the Subway app, create an account, and browse the Deals section." },
      { label: "Common Deals", value: "BOGO footlongs, $6.99 meal deals, free cookie with purchase." },
      { label: "Tip", value: "Join Subway MVP Rewards to earn points on every purchase for free subs." },
    ],
  },
  {
    icon: "💄",
    title: "Ulta Birthday Gift",
    desc: "Free birthday gift during your birthday month as an Ultamate Rewards member.",
    previewHours: "During your birthday month",
    previewLocation: "Any Ulta Beauty",
    badges: ["Free Gift", "Birthday Month"],
    fullDescription:
      "Ulta Beauty's Ultamate Rewards members receive a free birthday gift during their birthday month. The gift varies by year and may include popular beauty minis.",
    details: [
      { label: "How to Access", value: "Join Ultamate Rewards (free) at ulta.com and set your birthday." },
      { label: "What You Get", value: "A free beauty gift — usually a curated mini product or deluxe sample." },
      { label: "Tip", value: "Ulta also has 2x and 5x points events throughout the year for bigger rewards." },
    ],
  },
  {
    icon: "🍩",
    title: "Dunkin' Birthday Drink",
    desc: "Free beverage on your birthday as a Dunkin' Rewards member.",
    previewHours: "On your birthday",
    previewLocation: "Any Dunkin'",
    badges: ["Free Drink", "Birthday Reward"],
    fullDescription:
      "Dunkin' Rewards members get a free beverage of any size on their birthday. Make sure your birthday is set in your account and you've opted into rewards.",
    details: [
      { label: "How to Access", value: "Join Dunkin' Rewards (free) through the app or dunkindonuts.com." },
      { label: "What You Get", value: "One free beverage of any size on your birthday." },
      { label: "Bonus", value: "Earn 10 points per $1 spent. 250 points = free drink reward." },
    ],
  },
  {
    icon: "🥖",
    title: "Jersey Mike's Birthday Sub",
    desc: "Free regular sub and drink on your birthday through the MyMike's Rewards program.",
    previewHours: "On your birthday",
    previewLocation: "Any Jersey Mike's",
    badges: ["Free Sub", "Birthday Reward"],
    fullDescription:
      "Jersey Mike's MyMike's Rewards members receive a free regular sub and 22 oz drink on their birthday. Sign up and set your birthday to claim the reward.",
    details: [
      { label: "How to Access", value: "Join MyMike's Rewards (free) at jerseymikes.com or through the app." },
      { label: "What You Get", value: "A free regular sub and 22 oz drink on your birthday." },
      { label: "Tip", value: "You also earn points on every purchase that can be redeemed for free subs." },
    ],
  },
  {
    icon: "🐔",
    title: "Chick-fil-A Birthday Reward",
    desc: "Free Chick-fil-A treat on your birthday through the Chick-fil-A One app.",
    previewHours: "On your birthday",
    previewLocation: "Any Chick-fil-A",
    badges: ["Free Treat", "Birthday Reward"],
    fullDescription:
      "Chick-fil-A One members receive a free birthday reward — typically a chocolate chunk cookie or another treat. Make sure your birthday is set in the app.",
    details: [
      { label: "How to Access", value: "Download the Chick-fil-A One app, create an account, and set your birthday." },
      { label: "What You Get", value: "A free treat (usually a chocolate chunk cookie) on your birthday." },
      { label: "Bonus", value: "Earn points on every purchase toward free food, plus surprise rewards at higher tiers." },
    ],
  },
  {
    icon: "🎬",
    title: "Regal Student Discount",
    desc: "Discounted student movie tickets at Regal Cinemas with valid student ID.",
    previewHours: "Varies by location",
    previewLocation: "Regal Cinemas",
    badges: ["Discount Tickets", "Student ID Required"],
    fullDescription:
      "Regal Cinemas offers discounted tickets for students with a valid student ID. Pricing varies by location and showtime, but savings are typically $2–4 per ticket.",
    details: [
      { label: "How to Access", value: "Show your valid student ID at the box office or check the Regal app for student pricing." },
      { label: "Discount", value: "Varies by location — typically $2–4 off regular ticket prices." },
      { label: "Tip", value: "Join Regal Crown Club (free) for points on every purchase toward free popcorn and tickets." },
    ],
  },
  {
    icon: "🎵",
    title: "Apple Music Student",
    desc: "Apple Music for $5.99/mo with Apple TV+ included — verify via UNiDAYS.",
    previewHours: "Online — always available",
    previewLocation: "music.apple.com",
    badges: ["$5.99/mo", "TV+ Included"],
    fullDescription:
      "Apple Music's student plan costs $5.99/mo (regular is $10.99/mo) and includes free Apple TV+ streaming. Verify through UNiDAYS to access millions of songs, playlists, and Spatial Audio.",
    details: [
      { label: "How to Access", value: "Subscribe via the Apple Music app and verify student status through UNiDAYS." },
      { label: "Price", value: "$5.99/mo (regular $10.99/mo). Includes Apple TV+ for free." },
      { label: "Features", value: "100M+ songs, lossless audio, Spatial Audio, curated playlists, and Apple TV+." },
    ],
  },
  {
    icon: "📺",
    title: "Hulu Student Discount",
    desc: "Hulu (ad-supported) for just $1.99/mo with student verification.",
    previewHours: "Online — always available",
    previewLocation: "hulu.com/student",
    badges: ["$1.99/mo", "75% Off"],
    fullDescription:
      "Hulu's student plan offers the ad-supported tier for just $1.99/mo (regularly $7.99/mo). Stream thousands of shows, movies, and Hulu Originals at a fraction of the price.",
    details: [
      { label: "How to Access", value: "Visit hulu.com/student and verify enrollment through SheerID." },
      { label: "Price", value: "$1.99/mo (regularly $7.99/mo) for the ad-supported plan." },
      { label: "What's Included", value: "Full Hulu library with ads — shows, movies, Hulu Originals, and next-day TV." },
    ],
  },
  {
    icon: "▶️",
    title: "YouTube Premium Student",
    desc: "YouTube Premium and YouTube Music for $7.99/mo — ad-free videos and music.",
    previewHours: "Online — always available",
    previewLocation: "youtube.com/premium/student",
    badges: ["$7.99/mo", "Ad-Free"],
    fullDescription:
      "YouTube Premium Student gives you ad-free YouTube, background play, offline downloads, and YouTube Music Premium — all for $7.99/mo (regularly $13.99/mo).",
    details: [
      { label: "How to Access", value: "Go to youtube.com/premium and select the student plan. Verify through SheerID." },
      { label: "Price", value: "$7.99/mo (regularly $13.99/mo)." },
      { label: "Features", value: "Ad-free videos, background play, offline downloads, and YouTube Music Premium." },
    ],
  },
  {
    icon: "🚗",
    title: "Zipcar University Program",
    desc: "Reduced membership rate and hourly rates for students 18+ at partner campuses.",
    previewHours: "24/7 access",
    previewLocation: "SJSU Campus / Nearby Lots",
    badges: ["Reduced Rates", "18+ Students"],
    fullDescription:
      "Zipcar's University program offers discounted membership and hourly rates for students at partner campuses. Cars are parked on or near campus for easy access — gas and insurance included.",
    details: [
      { label: "How to Access", value: "Sign up at zipcar.com/universities with your .edu email. Must be 18+." },
      { label: "Pricing", value: "Reduced annual membership fee ($25/year for students) and lower hourly rates." },
      { label: "Includes", value: "Gas, insurance, and maintenance are all included in the hourly/daily rate." },
    ],
  },
  {
    icon: "✈️",
    title: "StudentUniverse",
    desc: "Exclusive flight and hotel deals for students — save up to 30% on travel.",
    previewHours: "Online — always available",
    previewLocation: "studentuniverse.com",
    badges: ["Exclusive Fares", "Up to 30% Off"],
    fullDescription:
      "StudentUniverse negotiates exclusive flight and hotel rates for verified students. Save up to 30% on airfare and find deals on hotels, tours, and travel packages.",
    details: [
      { label: "How to Access", value: "Sign up at studentuniverse.com and verify with your .edu email or student ID." },
      { label: "Savings", value: "Up to 30% off flights, plus exclusive hotel and tour deals." },
      { label: "Airlines", value: "Delta, United, American Airlines, JetBlue, and many international carriers." },
    ],
  },
  {
    icon: "🧑‍💻",
    title: "Student Software Licenses",
    desc: "Free access to MATLAB, AutoCAD, JetBrains, VMware, and more through SJSU.",
    previewHours: "While enrolled at SJSU",
    previewLocation: "SJSU Software Portal",
    badges: ["Free Software", "SJSU Provided"],
    fullDescription:
      "SJSU provides free or discounted software licenses to enrolled students. Access professional tools like MATLAB, AutoCAD, JetBrains IDEs, VMware, and Microsoft Office through the university portal.",
    details: [
      { label: "How to Access", value: "Log into the SJSU software portal with your SJSU credentials to download available software." },
      { label: "Available Software", value: "MATLAB, AutoCAD, SolidWorks, JetBrains IDEs, VMware, Adobe CC (select colleges)." },
      { label: "Note", value: "Availability varies by college and major. Check your department for additional licenses." },
    ],
  },
];

export default function DealsPage() {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openModal(deal) {
    setSelectedDeal(deal);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedDeal(null);
  }

  return (
    <div className="container resources-page">
      <div className="page-header">
        <h1 className="page-title">Deals</h1>
        <p className="page-subtitle">
          Exclusive discounts and freebies available to SJSU students.
        </p>
      </div>

      <div className="resources-grid">
        {deals.map((deal, i) => (
          <div
            key={i}
            className="info-card resource-card"
            onClick={() => openModal(deal)}
          >
            <div className="icon-chip blue">{deal.icon}</div>
            <h3>{deal.title}</h3>
            <p className="resource-card-desc">{deal.desc}</p>
            <div className="resource-card-meta" style={{ marginTop: "0.75rem" }}>
              <span>🕐 {deal.previewHours}</span>
              <span>📍 {deal.previewLocation}</span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedDeal && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-panel resource-modal-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <h2 className="resource-modal-title">{selectedDeal.title}</h2>
            <div className="badge-row resource-badge-row">
              {selectedDeal.badges.map((b, j) => (
                <span key={j} className="badge">
                  {b}
                </span>
              ))}
            </div>
            <p className="resource-modal-desc">
              {selectedDeal.fullDescription}
            </p>
            <hr className="resource-modal-divider" />
            <div className="resource-modal-details-grid">
              {selectedDeal.details.map((d, k) => (
                <div key={k} className="resource-modal-detail-block">
                  <span className="resource-modal-detail-label">
                    {d.label}
                  </span>
                  <span className="resource-modal-detail-value">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
