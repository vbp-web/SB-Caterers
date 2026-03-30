import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  Search, Coffee, Soup, Flame, Zap, ChefHat, 
  Pizza, IceCream, Utensils, ChevronRight, 
  X, ArrowUp, Globe, Map, Salad as SaladIcon, 
  Droplets, Star, CookingPot, Check, FileText,
  LayoutGrid
} from 'lucide-react';

interface MenuItem {
  name: string;
  gujaratiName?: string;
  description: string;
  category: string;
  subCategory?: string;
  tags?: string[];
}

const MENU_DATA: MenuItem[] = [
  // Welcome Drinks
  // Fresh Juice
  { name: 'Orange Juice', gujaratiName: 'ઓરેન્જ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Freshly squeezed orange juice.' },
  { name: 'Coconut Punch', gujaratiName: 'કોકોનટ પંચ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Refreshing coconut based punch.' },
  { name: 'Green Grapes with Tulsi Pudina', gujaratiName: 'ગ્રીન ગ્રેપ્સ વિથ તુલસી પુદીના', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Green grapes blended with holy basil and mint.' },
  { name: 'Green Grapes with Kiwi', gujaratiName: 'ગ્રીન ગ્રેપ્સ વિથ કીવી', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Tangy blend of green grapes and kiwi.' },
  { name: 'Guava Kiwi Juice', gujaratiName: 'જામફળ કીવી જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Sweet guava and tart kiwi juice.' },
  { name: 'Watermelon Black Grapes Juice', gujaratiName: 'તરબૂચ બ્લેક ગ્રેપ્સ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Refreshing watermelon and sweet black grapes.' },
  { name: 'Watermelon Phalsa Juice', gujaratiName: 'તરબૂચ ફાલસા જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Watermelon with the unique tang of phalsa berries.' },
  { name: 'Pineapple Orange Juice', gujaratiName: 'પાઈનેપલ ઓરેન્જ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Classic citrus blend of pineapple and orange.' },
  { name: 'Pineapple Juice', gujaratiName: 'પાઈનેપલ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Pure and fresh pineapple juice.' },
  { name: 'Pineapple Black Grapes Juice', gujaratiName: 'પાઈનેપલ બ્લેક ગ્રેપ્સ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Sweet pineapple and black grapes blend.' },
  { name: 'Pineapple Tulsi Juice', gujaratiName: 'પાઈનેપલ તુલસી જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Pineapple juice with a hint of holy basil.' },
  { name: 'Black Currant Juice', gujaratiName: 'બ્લેક કરંટ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Rich and bold black currant juice.' },
  { name: 'Mosambi Juice', gujaratiName: 'મોસંબી જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Freshly squeezed sweet lime juice.' },
  { name: 'Red Guava (Jamfal)', gujaratiName: 'રેડ જામફળ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Sweet and aromatic red guava juice.' },
  { name: 'Lychee Coconut', gujaratiName: 'લીચી કોકોનટ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Exotic blend of lychee and coconut.' },
  { name: 'Lychee Blossom', gujaratiName: 'લીચી બ્લોસમ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Floral and sweet lychee juice.' },
  { name: 'Watermelon Punch Juice', gujaratiName: 'તરબૂચ પંચ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Refreshing watermelon based punch.' },
  { name: 'Strawberry Juice', gujaratiName: 'સ્ટ્રોબેરી જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Fresh and sweet strawberry juice.' },
  { name: 'Guava with Apple Piece', gujaratiName: 'જામફળ વિથ એપલ પીસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Guava juice served with fresh apple pieces.' },
  { name: 'Strawberry with Apple Piece', gujaratiName: 'સ્ટ્રોબેરી વિથ એપલ પીસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Strawberry juice served with fresh apple pieces.' },
  { name: 'Pina Colada Juice', gujaratiName: 'પીના કોલાડા જ્યુસ', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Tropical pineapple and coconut blend.' },
  { name: 'Fanta Vanilla', gujaratiName: 'ફેન્ટા વેનીલા', category: 'Welcome Drinks', subCategory: 'Fresh Juice', description: 'Fanta with a smooth vanilla twist.' },

  // Fruit Shots
  { name: 'Pineapple Shots', gujaratiName: 'પાઈનેપલ શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Concentrated pineapple flavor in a shot.' },
  { name: 'Orange Paper Shots', gujaratiName: 'ઓરેન્જ પેપર શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Zesty orange shots with a unique twist.' },
  { name: 'Kiwi Exotic Shots', gujaratiName: 'કીવી એક્ઝોટિક શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Exotic kiwi flavor in a shot.' },
  { name: 'Guava Pineapple Shots', gujaratiName: 'જામફળ પાઈનેપલ શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Blend of guava and pineapple in a shot.' },
  { name: 'Mango Shots', gujaratiName: 'મેંગો શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Rich and sweet mango shots.' },
  { name: 'Lychee Kimosa', gujaratiName: 'લીચી કીમોસા', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Lychee based exotic fruit shot.' },
  { name: 'Haunted Black Currant', gujaratiName: 'હોન્ટેડ બ્લેક કરંટ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Bold and mysterious black currant shot.' },
  { name: 'Coconut Mintos', gujaratiName: 'કોકોનટ મિન્ટોસ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Refreshing coconut and mint shot.' },
  { name: 'Peri Cucumber Shots', gujaratiName: 'પેરી ક્યુકમ્બર શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Unique spicy cucumber shot.' },
  { name: 'Strawberry Shots', gujaratiName: 'સ્ટ્રોબેરી શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Sweet and vibrant strawberry shots.' },
  { name: 'Tomato Berry Shots', gujaratiName: 'ટોમેટો બેરી શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Savory tomato and sweet berry blend shot.' },
  { name: 'Curry Leaf Shots', gujaratiName: 'કરી લીફ શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Unique and aromatic curry leaf flavored shot.' },
  { name: 'Jamun Shots', gujaratiName: 'જાંબુ શોર્ટ્સ', category: 'Welcome Drinks', subCategory: 'Fruit Shots', description: 'Traditional Indian blackberry shots.' },

  // Shake
  { name: 'Banana Shake', gujaratiName: 'બનાના શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Creamy and classic banana milkshake.' },
  { name: 'KitKat Shake', gujaratiName: 'કીટકેટ શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Chocolatey shake blended with KitKat pieces.' },
  { name: 'Strawberry Shake', gujaratiName: 'સ્ટ્રોબેરી શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Sweet and creamy strawberry milkshake.' },
  { name: 'Chikoo Shake', gujaratiName: 'ચીકુ શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Rich and earthy chikoo (sapodilla) milkshake.' },
  { name: 'Chocolate Shake', gujaratiName: 'ચોકલેટ શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Indulgent and rich chocolate milkshake.' },
  { name: 'Vanilla Shake', gujaratiName: 'વેનીલા શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Smooth and classic vanilla milkshake.' },
  { name: 'Butter Scotch Shake', gujaratiName: 'બટર સ્કોચ શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Buttery and sweet butterscotch milkshake.' },
  { name: 'Chocolate Hazelnut Shake', gujaratiName: 'ચોકલેટ હેઝલનટ શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Rich chocolate and nutty hazelnut blend.' },
  { name: 'Sitafal Milk Shake', gujaratiName: 'સીતાફળ મિલ્ક શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Exotic custard apple milkshake.' },
  { name: 'Kaju Anjir Shake', gujaratiName: 'કાજુ અંજીર શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Nutritious cashew and fig milkshake.' },
  { name: 'Kaju Strawberry Shake', gujaratiName: 'કાજુ સ્ટ્રોબેરી શેક', category: 'Welcome Drinks', subCategory: 'Shake', description: 'Creamy cashew and strawberry blend.' },

  // Mocktail
  { name: 'Mocktail Bar (10 Flavor)', gujaratiName: 'મોકટેલ બાર (૧૦ ફ્લેવર)', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Assorted mocktail bar with 10 different flavors.' },
  { name: 'Strawberry Sunrise', gujaratiName: 'સ્ટ્રોબેરી સનરાઈઝ', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Vibrant strawberry and citrus mocktail.' },
  { name: 'Green Apple Twist', gujaratiName: 'ગ્રીન એપલ ટ્વિસ્ટ', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Tangy green apple flavored mocktail.' },
  { name: 'Flavor Ice Tea', gujaratiName: 'ફ્લેવર આઈસ ટી', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Refreshing flavored iced tea.' },
  { name: 'Full Sensation', gujaratiName: 'ફુલ સેન્સેશન', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'A sensational blend of fruit flavors.' },
  { name: 'Musk Melon Magic', gujaratiName: 'મસ્ક મેલન મેજિક', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Magic of fresh musk melon in a drink.' },
  { name: 'Tender Berry', gujaratiName: 'ટેન્ડર બેરી', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Soft and sweet berry flavored mocktail.' },
  { name: 'Cinderella', gujaratiName: 'સિન્ડ્રેલા', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'A magical fruity mocktail blend.' },
  { name: 'Blue Heaven', gujaratiName: 'બ્લુ હેવન', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Refreshing blue citrus mocktail.' },
  { name: 'Lemon Pudina Punch', gujaratiName: 'લેમન પુદીના પંચ', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Zesty lemon and mint punch.' },
  { name: 'All of Me', gujaratiName: 'ઓલ ઓફ મી', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'A complete fruit flavor experience.' },
  { name: 'Lychee Margarita', gujaratiName: 'લીચી માર્ગરીટા', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Sweet lychee flavored non-alcoholic margarita.' },
  { name: 'Winter Candy', gujaratiName: 'વિન્ટર કેન્ડી', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Sweet and cool winter themed mocktail.' },
  { name: 'Berry Sweet Heart', gujaratiName: 'બેરી સ્વીટ હાર્ટ', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Heart-warming sweet berry blend.' },
  { name: 'Peach on Beach', gujaratiName: 'પીચ ઓન બીચ', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Classic peach flavored beach mocktail.' },
  { name: 'Pink Lady', gujaratiName: 'પિંક લેડી', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Elegant pink fruity mocktail.' },
  { name: 'Blue Lagoon', gujaratiName: 'બ્લુ લગૂન', category: 'Welcome Drinks', subCategory: 'Mocktail', description: 'Vibrant blue citrus mocktail.' },

  // Smoothie
  { name: 'Berry Smoothie', gujaratiName: 'બેરી સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Thick and creamy mixed berry smoothie.' },
  { name: 'Chocolate Smoothie', gujaratiName: 'ચોકલેટ સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Rich and indulgent chocolate smoothie.' },
  { name: 'Carrot Tomato Smoothie', gujaratiName: 'ગાજર ટમેટા સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Healthy and unique carrot and tomato blend.' },
  { name: 'Strawberry Smoothie', gujaratiName: 'સ્ટ્રોબેરી સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Classic and sweet strawberry smoothie.' },
  { name: 'Paan Smoothie', gujaratiName: 'પાન સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Unique and aromatic betel leaf flavored smoothie.' },
  { name: 'Oreo Cookies Smoothie', gujaratiName: 'ઓરિયો કુકીઝ સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Creamy smoothie with crushed Oreo cookies.' },
  { name: 'KitKat Smoothie', gujaratiName: 'કીટકેટ સ્મૂધી', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Thick smoothie blended with KitKat pieces.' },
  { name: 'Thandai', gujaratiName: 'ઠંડાઈ', category: 'Welcome Drinks', subCategory: 'Smoothie', description: 'Traditional Indian spiced milk drink.' },

  // Combo Juice
  { name: 'Fruit Punch Juice', gujaratiName: 'ફ્રૂટ પંચ જ્યુસ', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'Classic multi-fruit juice blend.' },
  { name: 'Lychee Lover', gujaratiName: 'લીચી લવર', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'A dream for lychee enthusiasts.' },
  { name: 'Kiwi Bonanza', gujaratiName: 'કીવી બોનાન્ઝા', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'A celebration of kiwi flavor.' },
  { name: 'Pineapple Guava Grape', gujaratiName: 'પાઈનેપલ જામફળ દ્રાક્ષ', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'Triple fruit blend of pineapple, guava, and grape.' },
  { name: 'Strawberry Orange', gujaratiName: 'સ્ટ્રોબેરી ઓરેન્જ', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'Sweet strawberry and zesty orange blend.' },
  { name: 'Cocktail', gujaratiName: 'કોકટેલ', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'A classic non-alcoholic fruit cocktail.' },
  { name: 'Bubbly Berry', gujaratiName: 'બબલી બેરી', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'Sparkling berry flavored juice.' },
  { name: 'Pineapple Mosambi', gujaratiName: 'પાઈનેપલ મોસંબી', category: 'Welcome Drinks', subCategory: 'Combo Juice', description: 'Refreshing pineapple and sweet lime blend.' },

  // Mojito
  { name: 'Mint Quick Lime Mojito', gujaratiName: 'મિન્ટ ક્વિક લાઈમ મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Zesty lime and fresh mint mojito.' },
  { name: 'Watermelon Mojito', gujaratiName: 'તરબૂચ મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Refreshing watermelon and mint mojito.' },
  { name: 'Green Apple Mojito', gujaratiName: 'ગ્રીન એપલ મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Tangy green apple and mint mojito.' },
  { name: 'Kiwi Mojito', gujaratiName: 'કીવી મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Exotic kiwi and mint mojito.' },
  { name: 'Mint Mojito', gujaratiName: 'મિન્ટ મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Classic and refreshing mint mojito.' },
  { name: 'Kiwi Apple Mojito', gujaratiName: 'કીવી એપલ મોજીતો', category: 'Welcome Drinks', subCategory: 'Mojito', description: 'Tangy kiwi and green apple mojito.' },
  
  // Soup
  // Healthy Soup
  { name: 'Tomato Cheese Corn Soup', gujaratiName: 'ટોમેટો ચીઝ કોર્ન સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Fresh tomato with cheese and cutting vegetables.' },
  { name: 'Minestrone Soup', gujaratiName: 'મીની સ્ટ્રોન સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Classic Italian vegetable soup.' },
  { name: 'Tomato Beans Soup', gujaratiName: 'ટોમેટો બીન્સ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Hearty tomato and beans blend.' },
  { name: 'Tex Mex Tortilla Soup', gujaratiName: 'ટેક્સ મેક્સ ટોર્ટીલા સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Spicy Mexican soup with tortilla strips.' },
  { name: 'Chilli Beans Soup', gujaratiName: 'ચીલ્લી બીન્સ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Spicy and protein-rich beans soup.' },
  { name: 'Roasted Plum Tomato', gujaratiName: 'રોસ્ટેડ પ્લમ ટોમેટો', category: 'Soup', subCategory: 'Healthy Soup', description: 'Fresh tomato with mint.' },
  { name: 'Sweet Corn Noodles Soup', gujaratiName: 'સ્વીટ કોર્ન નુડલ્સ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Sweet corn soup with noodles.' },
  { name: 'Mexican Soup', gujaratiName: 'મેક્સીકન સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Traditional Mexican flavors in a bowl.' },
  { name: 'Tomato Pasta Soup', gujaratiName: 'ટોમેટો પાસ્તા સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Tomato soup with pasta pieces.' },
  { name: 'Spring Onion Soup', gujaratiName: 'સ્પ્રિંગ ઓનીયન સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Light soup with fresh spring onions.' },
  { name: 'Malabari Soup', gujaratiName: 'મલબારી સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'South Indian inspired vegetable soup.' },
  { name: 'Hot Garlic Ginger Soup', gujaratiName: 'હોટ ગાર્લિક જીંજર સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Spicy ginger and garlic flavored soup.' },
  { name: 'Mexican Chilli Beans Soup', gujaratiName: 'મેક્સીકન ચીલ્લી બીન્સ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Spicy Mexican style beans soup.' },
  { name: 'Tomato Basil Soup', gujaratiName: 'ટોમેટો બેસીલ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Classic tomato and basil combination.' },
  { name: 'Asian Jet Soup', gujaratiName: 'એશીયન જેટ સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Exotic Asian vegetable soup.' },
  { name: 'Sicilian Soup', gujaratiName: 'શીશીલીયાનો સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Italian style hearty vegetable soup.' },
  { name: 'Garden Minestrone Soup', gujaratiName: 'ગાર્ડન મીનીસ્ટ્રોન સુપ', category: 'Soup', subCategory: 'Healthy Soup', description: 'Fresh garden vegetables in minestrone broth.' },

  // Luxury Soup
  { name: 'Cream of Broccoli Soup with Roasted Garlic', gujaratiName: 'ક્રીમ ઓફ બ્રોકલી સુપ વીથ રોસ્ટેડ ગાર્લિક', category: 'Soup', subCategory: 'Luxury Soup', description: 'Rich broccoli cream with golden garlic.' },
  { name: 'Cream of Vegetable Soup with Spinach', gujaratiName: 'ક્રીમ ઓફ વેજીટેબલ સુપ વીથ સ્પીનેચ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Creamy vegetable soup with fresh spinach.' },
  { name: 'Beans and Vegetable Soup', gujaratiName: 'બીન્સ એન્ડ વેજીટેબલ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Nutritious beans and mixed vegetables.' },
  { name: 'Broccoli and Roasted Peanut Soup', gujaratiName: 'બ્રોકલી એન્ડ રોસ્ટેડ પીનટ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Unique broccoli and peanut blend.' },
  { name: 'Almond and Broccoli Soup', gujaratiName: 'આલમંડ એન્ડ બ્રોકલી સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Premium almond and broccoli cream.' },
  { name: 'Basil and Almond Soup', gujaratiName: 'બેસીલ એન્ડ આલમંડ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Fragrant basil with rich almonds.' },
  { name: 'Parmesan Cheese Soup with Cheese Ball', gujaratiName: 'પારમેસન ચીઝ સુપ વીથ ચીઝ બોલ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Rich parmesan soup served with cheese balls.' },
  { name: 'Veg Green Thai Soup', gujaratiName: 'વેજ ગ્રીન થાઈ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Exotic Thai green curry inspired soup.' },
  { name: 'Broccoli Chowder Soup', gujaratiName: 'બ્રોકલી ચાઉડર સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Thick and creamy broccoli chowder.' },
  { name: 'Australian Garlic Bread Soup', gujaratiName: 'ઓસ્ટ્રેલીયન ગાર્લિક બ્રેડ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Unique garlic bread flavored soup.' },
  { name: 'Burnt Garlic & Coconut Soup', gujaratiName: 'બ્રન્ટ ગાર્લિક & કોકોનટ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Coconut milk with burnt garlic, noodles, spinach, and mint.' },
  { name: 'Yellow Cheese Soup', gujaratiName: 'યલો ચીઝ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Creamy and rich yellow cheese soup.' },
  { name: 'Jalapeno Cheese Soup', gujaratiName: 'એલેપીનો ચીઝ સુપ', category: 'Soup', subCategory: 'Luxury Soup', description: 'Spicy jalapeno cheese soup served in a bread bowl.' },

  // Spicy Soup
  { name: 'Salsa Beans Soup', gujaratiName: 'સાલસા બીન્સ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Tangy salsa and beans combination.' },
  { name: 'Veg Manchow Soup', gujaratiName: 'વેજ મનચાઉ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Classic spicy Indo-Chinese soup.' },
  { name: 'Veg Hot and Sour Soup', gujaratiName: 'વેજ હોટ એન્ડ સૌર સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Tangy and spicy vegetable soup.' },
  { name: 'Spicy Tomato Carrot and Coconut Soup', gujaratiName: 'સ્પાઈસી ટોમેટો કેરટ એન્ડ કોકોનટ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Spicy blend of tomato, carrot, and coconut.' },
  { name: 'Chilli Corn Pepper Soup', gujaratiName: 'ચીલી કોર્ન પેપર સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Spicy corn and bell pepper soup.' },
  { name: 'Tom Yum Soup', gujaratiName: 'ટોમ યમ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Traditional Thai spicy and sour soup.' },
  { name: 'Noodles Soup', gujaratiName: 'નુડલ્સ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Spicy vegetable soup with noodles.' },
  { name: 'Sagla Teng Soup', gujaratiName: 'સાગલા ટેંગ સુપ', category: 'Soup', subCategory: 'Spicy Soup', description: 'Exotic spicy vegetable soup.' },

  // Light Soup
  { name: 'Spinach Soup', gujaratiName: 'સ્પીનચ સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Healthy and light spinach broth.' },
  { name: 'Lemon and Pepper Soup', gujaratiName: 'લેમન એન્ડ પેપર સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Zesty lemon and spicy pepper soup.' },
  { name: 'Lemon Coriander Soup', gujaratiName: 'લેમન કોરીએન્ડર સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Refreshing lemon and fresh coriander soup.' },
  { name: 'Hariyali Soup', gujaratiName: 'હરીયાલી સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Green vegetable based light soup.' },
  { name: 'Mushroom Ginger Clear Soup', gujaratiName: 'મશરૂમ જીંજર ક્લીયર સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Light mushroom broth with a hint of ginger.' },
  { name: 'Paneer Mushroom Clear Soup', gujaratiName: 'પનીર મશરૂમ ક્લીયર સુપ', category: 'Soup', subCategory: 'Light Soup', description: 'Clear soup with paneer and mushroom pieces.' },

  // Exotic Accompaniments
  { name: 'Chilli Cheese Corn Bread', gujaratiName: 'ચીલ્લી ચીઝ કોર્ન બ્રેડ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Spicy cheese and corn bread.' },
  { name: 'Crostini Mini', gujaratiName: 'કોસ્ટીની મીની', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Mini toasted bread with toppings.' },
  { name: 'Chilli Vinegar', gujaratiName: 'ચીલ્લી વિનેગર', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Spicy vinegar condiment.' },
  { name: 'Brown Bread', gujaratiName: 'બ્રાઉન બ્રેડ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Healthy whole wheat bread.' },
  { name: 'Soya Sauce', gujaratiName: 'સોયા સોસ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Classic soy sauce condiment.' },
  { name: 'Garlic Sauce', gujaratiName: 'ગાલીક સોસ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Creamy garlic flavored sauce.' },
  { name: 'Chilli Sauce', gujaratiName: 'ચીલ્લી સોસ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Spicy chilli condiment.' },
  { name: 'Popcorn', gujaratiName: 'પોપકોર્ન', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Classic crunchy popcorn.' },
  { name: 'Cheese Ball', gujaratiName: 'ચીઝ બોલ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Crispy fried cheese balls.' },
  { name: 'Tortilla Chips', gujaratiName: 'ટોર્ટીલા ચીપ્સ', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Crunchy Mexican tortilla chips.' },
  { name: 'Bread Stick', gujaratiName: 'બ્રેડ સ્ટીક', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Crunchy baked bread sticks.' },
  { name: 'Hot Bun', gujaratiName: 'હોટ બન', category: 'Soup', subCategory: 'Exotic Accompaniments', description: 'Soft and warm buns.' },

  // Starters
  // Moving Starter (Sweet's)
  { name: 'Chocolate Akhrot Katri', gujaratiName: 'ચોકલેટ અખરોટ કતરી', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Rich chocolate and walnut fudge.' },
  { name: 'Kaju Pista Roll', gujaratiName: 'કાજુ પિસ્તા રોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Classic cashew and pistachio rolls.' },
  { name: 'Kaju Anjir Roll', gujaratiName: 'કાજુ અંજીર રોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Cashew rolls with fig filling.' },
  { name: 'Dryfruit Mix Ball', gujaratiName: 'ડ્રાયફ્રૂટ મીક્ષ બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Assorted dry fruit energy balls.' },
  { name: 'Kaju Pista Patra Roll', gujaratiName: 'કાજુ પિસ્તા પાત્રા રોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Sweet rolls inspired by traditional patra.' },
  { name: 'Dryfruit Patra Roll', gujaratiName: 'ડ્રાયફ્રૂટ પાત્રા રોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Nutty version of the traditional roll.' },
  { name: 'Dryfruit Chikki', gujaratiName: 'ડ્રાયફ્રૂટ ચીક્કી', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Crunchy dry fruit brittle.' },
  { name: 'Assorted Chocolate', gujaratiName: 'અસોર્ટેડ ચોકલેટ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Selection of premium chocolates.' },
  { name: 'Thandai Ball', gujaratiName: 'ઠંડાઈ બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Saffron and nut flavored sweet balls.' },
  { name: 'Paan Ball', gujaratiName: 'પાન બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Betel leaf flavored sweet treats.' },
  { name: 'Sandesh', gujaratiName: 'સંદેશ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Traditional Bengali milk sweet.' },
  { name: 'Pista Lounge', gujaratiName: 'પીસ્તા લોન્ઝ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Creamy pistachio dessert squares.' },
  { name: 'Mango Delight', gujaratiName: 'મેંગો ડીલાઈટ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Refreshing mango flavored sweet.' },
  { name: 'Chocolate Basket', gujaratiName: 'ચોકલેટ બાસ્કેટ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Decorative chocolate cups with filling.' },
  { name: 'Kaju Pista Kamal', gujaratiName: 'કાજુ પિસ્તા કમળ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Lotus-shaped cashew and pistachio sweet.' },
  { name: 'Kaju Kalash', gujaratiName: 'કાજુ કળશ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Pot-shaped traditional cashew sweet.' },
  { name: 'Paan Cake', gujaratiName: 'પાન કેક', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Fusion cake with betel leaf flavor.' },
  { name: 'Badam Lounge', gujaratiName: 'બદામ લોન્ઝ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Rich almond dessert squares.' },
  { name: 'Chocolate Lounge', gujaratiName: 'ચોકલેટ લોન્ઝ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Decadent chocolate dessert squares.' },
  { name: 'Chocolate Almond Ball', gujaratiName: 'ચોકલેટ આલમંડ બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Chocolate coated almond treats.' },
  { name: 'Kaju Pista Ball', gujaratiName: 'કાજુ પિસ્તા બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Cashew and pistachio sweet balls.' },
  { name: 'Cassata', gujaratiName: 'કસાટા', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Layered traditional sweet.' },
  { name: 'Badam Anjir Ball', gujaratiName: 'બદામ અંજીર બોલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Almond and fig sweet balls.' },
  { name: 'Kaju Katri', gujaratiName: 'કાજુ કતરી', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Classic cashew fudge diamonds.' },
  { name: 'Badam Katri', gujaratiName: 'બદામ કતરી', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Premium almond fudge diamonds.' },
  { name: 'Kaju Paan', gujaratiName: 'કાજુ પાન', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Paan-shaped cashew sweet.' },
  { name: 'Dryfruit Apple', gujaratiName: 'ડ્રાયફ્રૂટ એપલ', category: 'Starters', subCategory: "Moving Starter (Sweet's)", description: 'Apple-shaped assorted dry fruit sweet.' },

  // Moving Starter (Continental)
  { name: 'Kaju Badam Roasted', gujaratiName: 'કાજુ બદામ રોસ્ટેડ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Roasted cashews and almonds.' },
  { name: 'Kaju Badam Fry', gujaratiName: 'કાજુ બદામ ફ્રાય', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fried cashews and almonds with spices.' },
  { name: 'Pink Kabab', gujaratiName: 'પીંક કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Unique beetroot-infused vegetable kababs.' },
  { name: 'Green Kabab', gujaratiName: 'ગ્રીન કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fresh spinach and pea kababs.' },
  { name: 'Chinese Cigar', gujaratiName: 'ચાઈનીઝ સિગાર', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy rolls with Chinese vegetable filling.' },
  { name: 'Cheese Corn Roll', gujaratiName: 'ચીઝ કોર્ન રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy rolls with cheese and sweet corn.' },
  { name: 'Cheese Paneer Wonton', gujaratiName: 'ચીઝ પનીર વોગટોન', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy wontons with cheese and paneer.' },
  { name: 'Cheese Paneer Lollipop', gujaratiName: 'ચીઝ પનીર લોલીપોપ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fun paneer and cheese skewers.' },
  { name: 'Mexican Ball', gujaratiName: 'મેક્સીકન બોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spicy Mexican-style vegetable balls.' },
  { name: 'Cheese Paneer Potli', gujaratiName: 'ચીઝ પનીર પોટલી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Money-bag shaped snacks with cheese and paneer.' },
  { name: 'Chinese Potli', gujaratiName: 'ચાઈનીઝ પોટલી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Money-bag shaped snacks with Chinese filling.' },
  { name: 'Cheese Paneer Samosa', gujaratiName: 'ચીઝ પનીર સમોસા', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Mini samosas with cheese and paneer.' },
  { name: 'Cheese Paneer Ball', gujaratiName: 'ચીઝ પનીર બોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Golden fried cheese and paneer balls.' },
  { name: 'Corn Paneer Mini Tikki', gujaratiName: 'કોર્ન પનીર મીની ટીક્કી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Small patties made with corn and paneer.' },
  { name: 'Nachos', gujaratiName: 'નાચોસ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy tortilla chips with toppings.' },
  { name: 'Nachado', gujaratiName: 'નચાડો', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Special fusion nacho snack.' },
  { name: 'Corn Nuts Roll', gujaratiName: 'કોર્ન નટ્સ રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crunchy rolls with corn and nuts.' },
  { name: 'Mexican Corn', gujaratiName: 'મેક્સીકન કોર્ન', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spiced corn with Mexican flavors.' },
  { name: 'Leela Chana Tikki', gujaratiName: 'લીલા ચણા ટીક્કી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Green chickpea patties.' },
  { name: 'Paneer Tikka (Dry)', gujaratiName: 'પનીર ટીક્કા (ડ્રાય)', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Classic tandoori paneer cubes.' },
  { name: 'Fruit Stick', gujaratiName: 'ફ્રુટ સ્ટીક', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fresh seasonal fruit skewers.' },
  { name: 'M.K. Special Stick', gujaratiName: 'M.K. સ્પેશિયલ સ્ટીક', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Chef special vegetable skewers.' },
  { name: 'Cheese Paneer Frankie', gujaratiName: 'ચીઝ પનીર ફ્રેન્કી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Rolls with cheese and paneer filling.' },
  { name: 'Cheese Paneer Cutlet', gujaratiName: 'ચીઝ પનીર કટલેશ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Hearty cheese and paneer patties.' },
  { name: 'Satay Paneer', gujaratiName: 'સાટે પનીર', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Grilled paneer skewers with peanut sauce.' },
  { name: 'Paneer Chilli (Dry)', gujaratiName: 'પનીર ચીલ્લી (ડ્રાય)', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spicy Indo-Chinese paneer.' },
  { name: 'Papad Roll', gujaratiName: 'પાપડ રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy papad rolls with filling.' },
  { name: 'Italian Papad Ball', gujaratiName: 'ઇટાલીયન પાપડ બોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fusion snack with papad and Italian herbs.' },
  { name: 'Paneer Hyderabadi Kabab', gujaratiName: 'પનીર હૈદરાબાદી કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spicy green paneer kababs.' },
  { name: 'Paneer Palak Schezwan Roll', gujaratiName: 'પનીર પાલક સીજવાન રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Fusion rolls with paneer, spinach and schezwan.' },
  { name: 'Papad Paneer Roll', gujaratiName: 'પાપડ પનીર રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Papad rolls stuffed with spiced paneer.' },
  { name: 'Russian Roll', gujaratiName: 'રશીયન રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Creamy vegetable rolls.' },
  { name: 'Cheese Mini Tikki', gujaratiName: 'ચીઝ મીની ટીક્કી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Small cheese-filled patties.' },
  { name: 'Bread Cheese Roll', gujaratiName: 'બ્રેડ ચીઝ રોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Bread rolls with gooey cheese center.' },
  { name: 'Mexican Wonton', gujaratiName: 'મેક્સીકન વોગટોન', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Wontons with Mexican bean filling.' },
  { name: 'Paneer Satay', gujaratiName: 'પનીર સંધાઈ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Grilled paneer skewers.' },
  { name: 'Potato Garlic Ball', gujaratiName: 'પોટેટો ગાર્લિક બોલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Garlicky mashed potato balls.' },
  { name: 'Veg Crispy', gujaratiName: 'વેજ ક્રિસ્પી', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Crispy fried assorted vegetables.' },
  { name: 'China Badam', gujaratiName: 'ચાઈના બદામ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spiced roasted peanuts.' },
  { name: 'Pani Puri Shots', gujaratiName: 'પાણીપુરી શોર્ટ્સ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Modern take on the classic pani puri.' },
  { name: 'Soya Kabab', gujaratiName: 'સોયા કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Healthy and protein-rich soya kababs.' },
  { name: 'Malai Paneer Kabab', gujaratiName: 'મલાઈ પનીર કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Creamy and mild paneer kababs.' },
  { name: 'Garlic Paneer Kabab', gujaratiName: 'ગાર્લિક પનીર કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Garlic flavored paneer kababs.' },
  { name: 'Makai Malai Kabab', gujaratiName: 'મકાઈ મલાઈ કબાલ', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Sweet corn and cream kababs.' },
  { name: 'Jalapeno Cheese Cigar', gujaratiName: 'જેલોપીનો ચીઝ સિગાર', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Spicy jalapeno and cheese rolls.' },
  { name: 'Papdi Pizza', gujaratiName: 'પાપડી પીઝા', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Mini pizzas on papdi base.' },
  { name: 'Satay Baby Potato', gujaratiName: 'સંધાઈ બેબી પોટેટો', category: 'Starters', subCategory: 'Moving Starter (Continental)', description: 'Grilled baby potatoes with sauce.' },

  // Starter
  { name: 'Yogurt & Sesame Kabab', gujaratiName: 'યોગાર્ટ & સીસમ કબાલ', category: 'Starters', subCategory: 'Starter', description: 'Creamy yogurt kababs with sesame crust.' },
  { name: 'Veg Cheese Lollipop', gujaratiName: 'વેજ ચીઝ લોલીપોપ', category: 'Starters', subCategory: 'Starter', description: 'Vegetable and cheese skewers.' },
  { name: 'Veg Crispy', gujaratiName: 'વેજ ક્રિસ્પી', category: 'Starters', subCategory: 'Starter', description: 'Crispy fried vegetables.' },
  { name: 'Paneer Chilli Dry', gujaratiName: 'પનીર ચીલ્લી ડ્રાય', category: 'Starters', subCategory: 'Starter', description: 'Spicy Indo-Chinese paneer.' },
  { name: 'Variety of Kabab', gujaratiName: 'વેરાયટી ઓફ કબાલ', category: 'Starters', subCategory: 'Starter', description: 'Assortment of different kababs.' },
  { name: 'Chinese Frankie', gujaratiName: 'ચાઈનીઝ ફ્રેન્કી', category: 'Starters', subCategory: 'Starter', description: 'Rolls with Chinese vegetable filling.' },
  { name: 'Cheese Spinach Balls', gujaratiName: 'ચીઝ સ્પીનચ બોલ્સ', category: 'Starters', subCategory: 'Starter', description: 'Fried balls with cheese and spinach.' },
  { name: 'Cheese Jalapeno Balls', gujaratiName: 'ચીઝ જલેપીનો બોલ્સ', category: 'Starters', subCategory: 'Starter', description: 'Spicy cheese and jalapeno balls.' },
  { name: 'Dragon Potato', gujaratiName: 'ડ્રેગન પોટેટો', category: 'Starters', subCategory: 'Starter', description: 'Spicy potato fingers.' },
  { name: 'French Fries', gujaratiName: 'ફ્રેન્ચ ફ્રાય', category: 'Starters', subCategory: 'Starter', description: 'Classic crispy potato fries.' },
  { name: 'Cheese Paneer Lifafa', gujaratiName: 'ચીઝ પનીર લીફાફા', category: 'Starters', subCategory: 'Starter', description: 'Envelope shaped snacks with paneer and cheese.' },
  { name: 'Mexican Roll', gujaratiName: 'મેક્સીકન રોલ', category: 'Starters', subCategory: 'Starter', description: 'Rolls with Mexican bean filling.' },
  { name: 'Potato Garlic Ball', gujaratiName: 'પોટેટો ગાર્લિક બોલ', category: 'Starters', subCategory: 'Starter', description: 'Garlicky potato balls.' },
  { name: 'Cheese Grill Sandwich', gujaratiName: 'ચીઝ ગ્રીલ સેન્ડવીચ', category: 'Starters', subCategory: 'Starter', description: 'Grilled sandwiches with loaded cheese.' },
  { name: 'Mexican Sandwich', gujaratiName: 'મેક્સીકન સેન્ડવીચ', category: 'Starters', subCategory: 'Starter', description: 'Sandwiches with Mexican flavors.' },
  { name: 'Corn Cheese Garlic Bread', gujaratiName: 'કોર્ન ચીઝ ગાર્લિક બ્રેડ', category: 'Starters', subCategory: 'Starter', description: 'Garlic bread topped with corn and cheese.' },
  { name: 'Italian Bruschetta', gujaratiName: 'ઇટાલીયો બ્રુસેટો', category: 'Starters', subCategory: 'Starter', description: 'Classic tomato and basil bruschetta.' },
  { name: 'Cheese Corn Toast Bread', gujaratiName: 'ચીઝ કોર્ન ટોસ્ટ બ્રેડ', category: 'Starters', subCategory: 'Starter', description: 'Toasted bread with cheese and corn.' },
  { name: 'Mini Burger', gujaratiName: 'મીની બર્ગર', category: 'Starters', subCategory: 'Starter', description: 'Bite-sized vegetable burgers.' },
  { name: 'Crostini', gujaratiName: 'કોસ્ટીની', category: 'Starters', subCategory: 'Starter', description: 'Italian toasted bread with toppings.' },
  { name: 'Cheese Palak Toast Bread', gujaratiName: 'ચીઝ પાલક ટોસ્ટ બ્રેડ', category: 'Starters', subCategory: 'Starter', description: 'Toasted bread with cheese and spinach.' },
  { name: 'Paneer Cheese Roll', gujaratiName: 'પનીર ચીઝ રોલ', category: 'Starters', subCategory: 'Starter', description: 'Rolls with paneer and cheese.' },
  { name: 'Pudina Paneer Tikka', gujaratiName: 'ફુદીના પનીર ટીક્કા', category: 'Starters', subCategory: 'Starter', description: 'Mint flavored grilled paneer.' },
  { name: 'Aloo Nazakat', gujaratiName: 'આલુ નજાકત', category: 'Starters', subCategory: 'Starter', description: 'Stuffed and grilled potato barrels.' },
  { name: 'Afghani Paneer Tikka', gujaratiName: 'અફઘાની પનીર ટીક્કા', category: 'Starters', subCategory: 'Starter', description: 'Mild and creamy grilled paneer.' },
  { name: 'Ajwaini Kali Mirch Paneer Tikka', gujaratiName: 'અજવાની કાલી મીર્ચ પનીર ટીક્કા', category: 'Starters', subCategory: 'Starter', description: 'Paneer tikka with carom seeds and black pepper.' },
  { name: 'Indonesian Satay Cottage Cheese', gujaratiName: 'ઇન્ડોનેશીય સતાય કોટેજ ચીઝ', category: 'Starters', subCategory: 'Starter', description: 'Indonesian style grilled paneer skewers.' },
  { name: 'Broccoli Cake', gujaratiName: 'બ્રોકલી કેક', category: 'Starters', subCategory: 'Starter', description: 'Savory cakes made with fresh broccoli.' },
  { name: 'Basil Roll', gujaratiName: 'બેસીલ રોલ', category: 'Starters', subCategory: 'Starter', description: 'Rolls with basil and vegetable filling.' },
  { name: 'Spinach Corn Ball', gujaratiName: 'સ્પીનચ કોર્ન બોલ', category: 'Starters', subCategory: 'Starter', description: 'Fried balls with spinach and corn.' },
  { name: 'Spinach Rice and Olive Ball', gujaratiName: 'સ્પીનચ રાઈસ એન્ડ ઓલીવ બોલ', category: 'Starters', subCategory: 'Starter', description: 'Unique rice balls with spinach and olives.' },
  { name: 'Cheese Corn Chilli Ball', gujaratiName: 'ચીઝ કોર્ન ચીલ્લી બોલ', category: 'Starters', subCategory: 'Starter', description: 'Spicy cheese and corn balls.' },
  { name: 'Chunky Masala Potato', gujaratiName: 'ચંકી મસાલા પોટેટો', category: 'Starters', subCategory: 'Starter', description: 'Spiced chunky potato wedges.' },
  { name: 'Mexican Roulette', gujaratiName: 'મેક્સીકન રોલેટ', category: 'Starters', subCategory: 'Starter', description: 'Spicy Mexican vegetable snack.' },
  { name: 'Veg Spring Roll', gujaratiName: 'વેજ સ્પ્રિંગ રોલ', category: 'Starters', subCategory: 'Starter', description: 'Crispy vegetable spring rolls.' },
  { name: 'Baby Corn Fritters', gujaratiName: 'બેબીકોર્ન ફીટર્સ', category: 'Starters', subCategory: 'Starter', description: 'Crispy fried baby corn.' },
  { name: 'Potato Wedges', gujaratiName: 'પોટેટો વેજીસ', category: 'Starters', subCategory: 'Starter', description: 'Seasoned potato wedges.' },
  { name: 'Coconut Ball', gujaratiName: 'કોકોનટ બોલ', category: 'Starters', subCategory: 'Starter', description: 'Sweet and savory coconut treats.' },
  { name: 'Wonton', gujaratiName: 'વોન્ટોન', category: 'Starters', subCategory: 'Starter', description: 'Crispy fried wontons.' },
  { name: 'Mini Tacos', gujaratiName: 'મીની ટાકોઝ', category: 'Starters', subCategory: 'Starter', description: 'Bite-sized Mexican tacos.' },
  { name: 'Mini Bruschetta', gujaratiName: 'મીની બ્રુસેટા', category: 'Starters', subCategory: 'Starter', description: 'Small Italian bruschettas.' },
  { name: 'Mini Tostadas', gujaratiName: 'મીની ટોસ્ટાડાગ', category: 'Starters', subCategory: 'Starter', description: 'Small crispy Mexican tostadas.' },
  { name: 'Garlic Herb Cottage Cheese', gujaratiName: 'ગાર્લિક હર્બ કોટેજ ચીઝ', category: 'Starters', subCategory: 'Starter', description: 'Paneer marinated in garlic and herbs.' },
  { name: 'Mini Paneer Pakoda', gujaratiName: 'મીની પનીર પકોડા', category: 'Starters', subCategory: 'Starter', description: 'Small crispy paneer fritters.' },
  { name: 'Lebanese Roll', gujaratiName: 'લેબેનીઝ રોલ', category: 'Starters', subCategory: 'Starter', description: 'Rolls with Lebanese flavors.' },
  { name: 'Afghani Lollipop', gujaratiName: 'અફઘાની લોલીપોપ', category: 'Starters', subCategory: 'Starter', description: 'Creamy vegetable skewers.' },
  { name: 'Papad Paneer Pops', gujaratiName: 'પાપડ પનીર પોપ્સ', category: 'Starters', subCategory: 'Starter', description: 'Crunchy papad coated paneer bites.' },
  { name: 'Coin Idli', gujaratiName: 'કોઈન ઈડલી', category: 'Starters', subCategory: 'Starter', description: 'Bite-sized steamed rice cakes.' },
  { name: 'Golden Ring', gujaratiName: 'ગોલ્ડન રીંગ', category: 'Starters', subCategory: 'Starter', description: 'Crispy fried onion or vegetable rings.' },
  { name: 'Mexican Pani Puri', gujaratiName: 'મેક્સીકન પાણીની', category: 'Starters', subCategory: 'Starter', description: 'Fusion pani puri with Mexican flavors.' },
  { name: 'Nachado', gujaratiName: 'નચાડો', category: 'Starters', subCategory: 'Starter', description: 'Special fusion nacho snack.' },
  { name: 'Cheese Paneer Frankie', gujaratiName: 'ચીઝ પનીર ફ્રેન્કી', category: 'Starters', subCategory: 'Starter', description: 'Cheese and paneer rolls.' },
  { name: 'Mini Samosa (Cheese, Punjabi, Mutter)', gujaratiName: 'મીની સમોસા ચીઝ, પંજાબી, મટર', category: 'Starters', subCategory: 'Starter', description: 'Assorted mini samosas.' },
  { name: 'Mini Kachori (Mutter, Dal)', gujaratiName: 'મીની કચોરી મટર, દાલ', category: 'Starters', subCategory: 'Starter', description: 'Assorted mini kachoris.' },

  // Chaat Counter
  { name: 'Chandni Chowk ki Tikki', gujaratiName: 'ચાંદની ચોક કી ટીક્કી (બટાકા, વટાણા, ચીઝ, ફ્રાય ઘીમાં)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy potato patties with peas and cheese, fried in pure ghee.' },
  { name: 'American Corn Karari Tikki', gujaratiName: 'અમેરિકન કોર્ન કરારી ટીક્કી (ચીલ્લી, પોટેટો, કોર્ન, ચીઝ, પનીર, ફ્રાય વીથ ઘી)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crunchy corn and paneer patties fried with ghee.' },
  { name: 'Tikki (Soya / Corn / Lucknowi)', gujaratiName: 'ટીક્કી (સોયા / કોર્ન / લખનવી)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Assorted vegetable and soya patties.' },
  { name: 'Rajasthani Chaat', gujaratiName: 'રાજસ્થાની ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Traditional spicy chaat from Rajasthan.' },
  { name: 'Paan Patta Chaat', gujaratiName: 'પાન પત્તા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy betel leaf fritters topped with chutneys.' },
  { name: 'Palak Patta Kurmuri Chaat', gujaratiName: 'પાલક પત્તા કુરમુરી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crunchy spinach leaf chaat.' },
  { name: 'Chilla (Moong / Paneer / Pudina)', gujaratiName: 'ચીલ્લા (મગ / પનીર / ફુદીના)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Savory pancakes with various fillings.' },
  { name: 'Assorted Pudla', gujaratiName: 'અસોર્ટેડ પુડલા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Variety of traditional Gujarati savory pancakes.' },
  { name: 'Bhel Puri', gujaratiName: 'ભેલ પુરી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Classic puffed rice snack with tangy chutneys.' },
  { name: 'Sev Puri', gujaratiName: 'સેવ પુરી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy puris topped with potatoes, onions, and sev.' },
  { name: 'Corn Vada with White Sauce', gujaratiName: 'કોર્ન વડા વીથ વ્હાઈટ સોસ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Corn fritters served with a creamy white sauce.' },
  { name: 'Aage ka Bhalla', gujaratiName: 'આગે કા ભલ્લા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Special soft lentil dumplings in spiced yogurt.' },
  { name: 'Raj Kachori', gujaratiName: 'રાજ કચોરી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'The king of chaats - a large crispy shell filled with goodies.' },
  { name: 'Dahi Bhalla', gujaratiName: 'દહીં ભલ્લા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Soft lentil dumplings soaked in thick sweetened yogurt.' },
  { name: 'Dahi Rani Chaat', gujaratiName: 'દહીં રાણી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Royal yogurt-based chaat with special toppings.' },
  { name: 'Fruit Cream Dahi Vada', gujaratiName: 'ફ્રુટ ક્રીમ દહીં વડા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Fusion dahi vada with fruit cream.' },
  { name: 'Dahi Puri', gujaratiName: 'દહીં પુરી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy puris filled with yogurt and sweet-spicy chutneys.' },
  { name: 'Chocolate Special Bhalla Papdi Chaat', gujaratiName: 'ચોકલેટ સ્પેશિયલ ભલ્લા પાપડી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Unique chocolate flavored bhalla papdi chaat.' },
  { name: 'Chocolate Dahi Bhalla Chaat', gujaratiName: 'ચોકલેટ દહીં ભલ્લા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Innovative chocolate dahi bhalla.' },
  { name: 'Aloo Ratalu Bites', gujaratiName: 'આલુ રતાળુ બાઈટ્સ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy potato and yam bite-sized snacks.' },
  { name: 'Mini Dal Pakwan Chaat', gujaratiName: 'મીની દાળ પકવાન ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Bite-sized version of the classic Sindhi breakfast.' },
  { name: 'Matar Patiala (Mini Kulcha / Matar Ragda)', gujaratiName: 'મટર પટીયાલા (નાના કુલચા / મટર રગડા)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Patiala style peas served with mini kulchas.' },
  { name: 'Dal Moradabadi with Kachori (New)', gujaratiName: 'દાળ મુરાદાબાદી વીથ કચોરી (ન્યુ)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Flavorful Moradabadi dal served with crispy kachori.' },
  { name: 'Neem ke Patte ki Chaat', gujaratiName: 'નીમ કે પત્તે કી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Unique and healthy neem leaf chaat.' },
  { name: 'Palak Patta Chaat', gujaratiName: 'પાલક પત્તા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy spinach leaf fritters with tangy toppings.' },
  { name: 'Dahi Makhan Chaat', gujaratiName: 'દહીં મખન ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Creamy yogurt and butter based chaat.' },
  { name: 'Kadi Kachori Chaat', gujaratiName: 'કઢી કચોરી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy kachori served with tangy kadi.' },
  { name: 'Pani Puri (Sooji)', gujaratiName: 'પાણીપુરી (સોજી)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy semolina puris with flavored water.' },
  { name: 'Kachori Chaat', gujaratiName: 'કચોરી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crushed kachori topped with yogurt and chutneys.' },
  { name: 'Dhokla Chaat', gujaratiName: 'ઢોકળા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Gujarati dhokla served in a tangy chaat style.' },
  { name: 'Mathura Chaat', gujaratiName: 'મથુરા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Authentic street chaat from Mathura.' },
  { name: 'Dryfruit Chaat', gujaratiName: 'ડ્રાયફ્રૂટ ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Healthy and rich assorted dry fruit chaat.' },
  { name: 'American Corn Chaat', gujaratiName: 'અમેરિકન કોર્ન ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Sweet corn tossed with spices and lemon.' },
  { name: 'Hariyali Tikki with Ragda', gujaratiName: 'હરિયાળી ટીક્કી વીથ રગડા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Green vegetable patties served with pea curry.' },
  { name: 'Corn Spinach Chaat', gujaratiName: 'કોર્ન સ્પીનચ ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Healthy mix of corn and spinach in chaat style.' },
  { name: 'Dal Moradabadi with Biscuit', gujaratiName: 'દાળ મુરાદાબાદી વીથ બિસ્કીટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Classic Moradabadi dal served with savory biscuits.' },
  { name: 'Kela ki Tikki', gujaratiName: 'કેળાં ટીક્કી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Unique raw banana patties.' },
  { name: 'Angoori Dahi Vada', gujaratiName: 'અંગુરી દહીંવડા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Miniature lentil dumplings in sweet yogurt.' },
  { name: 'Chole Kulcha', gujaratiName: 'છોલે કુલચા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Spicy chickpeas served with soft leavened bread.' },
  { name: 'Chole Palak Rice', gujaratiName: 'છોલે પાલક રાઈસ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Flavorful mix of chickpeas, spinach, and rice.' },
  { name: 'Palak Paneer Chole Chaat', gujaratiName: 'પાલક પનીર છોલે ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Rich mix of spinach, paneer, and chickpeas.' },
  { name: 'Lahori Chaat', gujaratiName: 'લાહોરી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Spicy and tangy chaat from Lahore.' },
  { name: 'Indori Chaat', gujaratiName: 'ઈન્દોરી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Famous street chaat from Indore.' },
  { name: 'Sabudana Chaat', gujaratiName: 'સાબુદાણા ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Tapioca pearl based chaat, perfect for fasting.' },
  { name: 'Sweet Jalebi Chaat', gujaratiName: 'સ્વીટ જલેબી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Unique sweet and savory jalebi chaat.' },
  { name: 'Brijwasi Tikki', gujaratiName: 'બ્રીજવાસી ટીક્કી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Traditional patties from the Brij region.' },
  { name: 'Mohanbhog Chaat', gujaratiName: 'મોહનભોગ ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Special sweet and savory fusion chaat.' },
  { name: 'Aloo Chole Tikki', gujaratiName: 'આલુ છોલે ટીક્કી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Potato patties served with spicy chickpeas.' },
  { name: 'Ragda Pattice', gujaratiName: 'રગડા પેટીશ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Classic Mumbai street food with pea curry and potato patties.' },
  { name: 'Dahi Rajbhog Chaat', gujaratiName: 'દહીં રાજભોગ ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Premium dahi chaat with royal toppings.' },
  { name: 'Papdi Chaat', gujaratiName: 'પાપડી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy crackers topped with potatoes and chutneys.' },
  { name: 'Delhi Chaat', gujaratiName: 'દિલ્હી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Authentic street flavors from the capital.' },
  { name: 'Pani Puri (Regular)', gujaratiName: 'પાણીપુરી (રેગ્યુલર)', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'The classic favorite crispy puris with spiced water.' },
  { name: 'Cheese Potato Roasty', gujaratiName: 'ચીઝ પોટેટો રોસ્ટી', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy potato roasty with melted cheese.' },
  { name: 'Samosa with Chole Ragda', gujaratiName: 'સમૌસા વીથ છોલે રગડા', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Crispy samosa served with spicy pea curry.' },
  { name: '2 in 1 Tikki Chaat', gujaratiName: 'ટુ ઈન વન ટીક્કી ચાટ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Double flavored potato patty chaat.' },
  { name: 'Kacchi Bowl', gujaratiName: 'કચ્છી બાઉલ', category: 'Chaat Counter', subCategory: 'Chaat Bazar', description: 'Traditional Kutch style chaat bowl.' },

  // Live Counters
  // Live Hot Counter
  { name: 'Pav Bhaji', gujaratiName: 'પાવભાજી', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Classic spicy mashed vegetable curry served with buttered buns.' },
  { name: 'Chole Bhature/Kulcha', gujaratiName: 'છોલે ભટુરે/કુલચા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Spicy chickpeas served with fluffy bhature or soft kulcha.' },
  { name: 'Totha Bread', gujaratiName: 'ટોઠા બ્રેડ', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Spicy North Gujarati delicacy served with bread.' },
  { name: 'Idli Sambhar', gujaratiName: 'ઈડલી સંભાર', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Steamed rice cakes served with flavorful lentil soup.' },
  { name: 'Papad nu Khichu', gujaratiName: 'પાપડનું ખીચુ (કણકી / ચોખા / બાજરી)', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Traditional steamed flour snack available in various grains.' },
  { name: 'Kashmiri Sev Usal', gujaratiName: 'કાશ્મીરી સેવ ઉસળ', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Spicy and tangy dried pea curry topped with crunchy sev.' },
  { name: 'Bataka Vada', gujaratiName: 'બટાકા વડા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Deep-fried spiced potato dumplings.' },
  { name: 'Bhel Puri', gujaratiName: 'ભેળ પુરી', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Crunchy puffed rice snack with tangy chutneys.' },
  { name: 'Sev Khamni', gujaratiName: 'સેવ ખમણી', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Grated and tempered gram flour snack topped with sev.' },
  { name: 'Punjabi Samosa', gujaratiName: 'પંજાબી સમોસા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Classic spiced potato and pea filled pastry.' },
  { name: 'Mirchi Vada', gujaratiName: 'મરચા વડા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Spicy stuffed chili fritters.' },
  { name: 'Bread Pakoda', gujaratiName: 'બ્રેડ પકોડા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Fried bread fritters with potato stuffing.' },
  { name: 'Bataka Pava', gujaratiName: 'બટાકા પૌવા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Flattened rice cooked with potatoes and turmeric.' },
  { name: 'Mix Bhajiya', gujaratiName: 'મિક્સ ભજીયા / ગોંડલીયા ભજીયા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Assorted vegetable fritters including special Gondliya style.' },
  { name: 'Totha Kulcha', gujaratiName: 'ટોઠા કુલચા', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Spicy Totha served with soft kulcha bread.' },
  { name: 'Pani Puri', gujaratiName: 'પાણીપુરી', category: 'Live Counters', subCategory: 'Live Hot Counter', description: 'Crispy puris filled with spiced water and potatoes.' },

  // Sizzler
  { name: 'Paneer Sizzler', gujaratiName: 'પનીર સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Sizzling platter with marinated paneer and veggies.' },
  { name: 'Italian Bake Sizzler', gujaratiName: 'ઈટાલીયન બેક સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Baked Italian delicacies served on a sizzling plate.' },
  { name: 'Mix Combo Sizzler', gujaratiName: 'મીક્સ કોમ્બો સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'A combination of various cuisines served sizzling hot.' },
  { name: 'Veg. Sizzler', gujaratiName: 'વેજ. સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Classic vegetable and cutlet sizzling platter.' },
  { name: 'Thai Sizzler', gujaratiName: 'થાઈ સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Thai flavored rice and veggies on a sizzling plate.' },
  { name: 'Italian Sizzler', gujaratiName: 'ઈટાલીયન સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Pasta and Italian veggies served sizzling.' },
  { name: 'Lebanese Sizzler', gujaratiName: 'લેબેનીઝ સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Hummus, pita, and falafel served on a sizzling plate.' },
  { name: 'Paneer Chilli Sizzler', gujaratiName: 'પનીર ચીલ્લી સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Spicy Indo-Chinese paneer served sizzling.' },
  { name: 'Cottage Cheese Stick Sizzler', gujaratiName: 'કોટેજ ચીઝ સ્ટીક સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Paneer sticks with special sauce on a sizzling plate.' },
  { name: 'Mexican Sizzler', gujaratiName: 'મેક્સીકન સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Mexican rice, beans, and nachos served sizzling.' },
  { name: 'Chinese Sizzler', gujaratiName: 'ચાઈનીઝ સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Manchurian and noodles served on a sizzling platter.' },
  { name: 'Mexican Smoke Sizzler', gujaratiName: 'મેક્સીકન સ્મોક સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Smoky flavored Mexican delicacies served sizzling.' },
  { name: 'Variety of Kabab Sizzler', gujaratiName: 'વેરાયટી ઓફ કબાબ સીઝલર', category: 'Live Counters', subCategory: 'Sizzler', description: 'Assorted kababs served on a sizzling platter.' },

  // Farali
  { name: 'Singoda Shiro', gujaratiName: 'સીંગોડા શીરો', category: 'Live Counters', subCategory: 'Farali', description: 'Sweet pudding made from water chestnut flour.' },
  { name: 'Sabudana Vada', gujaratiName: 'સાબુદાણા વડા', category: 'Live Counters', subCategory: 'Farali', description: 'Crispy sago and potato fritters.' },
  { name: 'Farali Pattice', gujaratiName: 'ફરાળી પેટીસ', category: 'Live Counters', subCategory: 'Farali', description: 'Stuffed potato patties perfect for fasting.' },
  { name: 'Farali Kaju Vada', gujaratiName: 'ફરાળી કાજુ વડા', category: 'Live Counters', subCategory: 'Farali', description: 'Cashew-based fritters for fasting.' },
  { name: 'Sabudana Khichdi', gujaratiName: 'સાબુદાણા ખીચડી', category: 'Live Counters', subCategory: 'Farali', description: 'Tempered sago pearls with peanuts and potatoes.' },
  { name: 'Farali Uttapam', gujaratiName: 'ફરાળી ઉત્તપમ', category: 'Live Counters', subCategory: 'Farali', description: 'Savoury pancakes made with fasting-approved grains.' },
  { name: 'Farali Dosa', gujaratiName: 'ફરાળી ઢોસા', category: 'Live Counters', subCategory: 'Farali', description: 'Crispy crepes made for fasting.' },
  { name: 'Farali Dahivada', gujaratiName: 'ફરાળી દહીંવડા', category: 'Live Counters', subCategory: 'Farali', description: 'Soft dumplings in yogurt, suitable for fasting.' },
  { name: 'Farali Handvo', gujaratiName: 'ફરાળી હાંડવો', category: 'Live Counters', subCategory: 'Farali', description: 'Baked savoury cake made with fasting ingredients.' },
  { name: 'Aloo Sabji with Singoda Puri', gujaratiName: 'આલુ સબ્જી વીથ સીંગોડા પુરી', category: 'Live Counters', subCategory: 'Farali', description: 'Potato curry served with water chestnut flour puris.' },
  { name: 'Farali Chevdo', gujaratiName: 'ફરાળી ચેવડો', category: 'Live Counters', subCategory: 'Farali', description: 'Crunchy potato and nut mix for fasting.' },
  { name: 'Farali Wafers', gujaratiName: 'ફરાળી વેફર્સ', category: 'Live Counters', subCategory: 'Farali', description: 'Crispy potato wafers for fasting.' },

  // Barbeque
  { name: 'Masala Paneer Tikka', gujaratiName: 'મસાલા પનીર ટીક્કા', category: 'Live Counters', subCategory: 'Barbeque', description: 'Spiced and grilled paneer cubes.' },
  { name: 'Sofiyani Paneer', gujaratiName: 'સોફીયાની પનીર', category: 'Live Counters', subCategory: 'Barbeque', description: 'Mild and creamy grilled paneer.' },
  { name: 'Dahi Paneer Tikka', gujaratiName: 'દહીં પનીર ટીક્કા', category: 'Live Counters', subCategory: 'Barbeque', description: 'Paneer marinated in yogurt and spices, then grilled.' },
  { name: 'Malai Tikka', gujaratiName: 'મલાઈ ટીક્કા', category: 'Live Counters', subCategory: 'Barbeque', description: 'Creamy and rich grilled vegetable or paneer skewers.' },
  { name: 'Fruit Tikka', gujaratiName: 'ફ્રૂટ ટીક્કા', category: 'Live Counters', subCategory: 'Barbeque', description: 'Grilled seasonal fruits with a tangy twist.' },

  // Delhi Valley
  { name: 'Chatpata Paneer Paratha', gujaratiName: 'ચટપટા પનીર પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Tangy and spiced paneer stuffed flatbread.' },
  { name: 'Matar Paratha', gujaratiName: 'મટર પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Green pea stuffed flatbread.' },
  { name: 'Paneer Paratha', gujaratiName: 'પનીર પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Classic paneer stuffed flatbread.' },
  { name: 'Muli Paratha', gujaratiName: 'મુલી પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Radish stuffed flatbread.' },
  { name: 'Palak Paratha', gujaratiName: 'પાલક પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Spinach infused flatbread.' },
  { name: 'Aloo Paratha', gujaratiName: 'આલુ પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Classic potato stuffed flatbread.' },
  { name: 'Gobi Paratha', gujaratiName: 'ગોબી પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Cauliflower stuffed flatbread.' },
  { name: 'Onion Paratha', gujaratiName: 'ડુંગળી', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Onion stuffed flatbread.' },
  { name: 'Raita', gujaratiName: 'રાઈતા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Refreshing yogurt side dish.' },
  { name: 'Papad', gujaratiName: 'પાપડ', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Crispy roasted or fried papad.' },
  { name: 'Churmur Paratha', gujaratiName: 'ચૂરમૂર પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Crushed and spiced flaky flatbread.' },
  { name: 'Methi Paratha', gujaratiName: 'મેથી પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Fenugreek leaf flatbread.' },
  { name: 'Dudhi Paratha', gujaratiName: 'દૂધી પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Bottle gourd stuffed flatbread.' },
  { name: 'Chocolate Paratha', gujaratiName: 'ચોકલેટ પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Sweet flatbread with chocolate filling.' },
  { name: 'Matar Pudina Paratha', gujaratiName: 'મટર ફુદીના પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Pea and mint stuffed flatbread.' },
  { name: 'Mag Paratha', gujaratiName: 'મગ પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Moong bean stuffed flatbread.' },
  { name: 'Dal Makhani', gujaratiName: 'દાળ મખ્ખની', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Rich and creamy black lentil curry.' },
  { name: 'Assorted Achar', gujaratiName: 'અસોર્ટેડ આચાર', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Variety of traditional Indian pickles.' },
  { name: 'Cheese Corn Paratha', gujaratiName: 'ચીઝ કોર્ન પરાઠા', category: 'Live Counters', subCategory: 'Delhi Valley', description: 'Flatbread stuffed with cheese and sweet corn.' },

  // Kabab Counter
  { name: 'Chana Chor Garam Kabab', gujaratiName: 'ચણા ચોર ગરમ કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Spiced chickpea based kababs.' },
  { name: 'Palak Cheese Kabab', gujaratiName: 'પાલક ચીઝ કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Spinach and cheese kababs.' },
  { name: 'Dryfruit Coconut Kabab', gujaratiName: 'ડ્રાયફ્રૂટ કોકોનટ કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Exotic kababs with dry fruits and coconut.' },
  { name: 'Soya Chunks Paneer Kabab', gujaratiName: 'સોયા ચંક્સ પનીર કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Protein-rich soya and paneer kababs.' },
  { name: 'Kakori Kabab', gujaratiName: 'કાકોરી કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Melt-in-the-mouth soft vegetable kababs.' },
  { name: 'Kochi Kabab', gujaratiName: 'કરાચી કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Spicy and flavorful Karachi style kababs.' },
  { name: 'Paneer Hyderabadi Kabab', gujaratiName: 'પનીર હૈદરાબાદી કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'Green spiced Hyderabadi style paneer kababs.' },
  { name: 'Variety of Kabab', gujaratiName: 'વેરાયટી ઓફ કબાબ', category: 'Live Counters', subCategory: 'Kabab Counter', description: 'An assortment of chef special kababs.' },

  // Special Wrap & Roll
  { name: 'Smoky Paneer Wrap', gujaratiName: 'સ્મોકી પનીર વ્રેપ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Smoky flavored paneer in a soft wrap.' },
  { name: 'Cheese Corn Wrap', gujaratiName: 'ચીઝ કોર્ન વ્રેપ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Gooey cheese and corn filled wrap.' },
  { name: 'Soyabean Wrap', gujaratiName: 'સોયાબીન વ્રેપ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Healthy soyabean based wrap.' },
  { name: 'Paneer and Salsa Tortilla Wrap', gujaratiName: 'પનીર એન્ડ સાલસા ટોર્ટીલા વ્રેપ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Paneer and tangy salsa in a tortilla.' },
  { name: 'Mexican Cheese Coated Wrap', gujaratiName: 'મેક્સીકન ચીઝ કોટેડ વ્રેપ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Cheese loaded Mexican style wrap.' },
  { name: 'Mexican Beans Roll', gujaratiName: 'મેક્સીકન બીન્સ રોલ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Spiced beans in a Mexican roll.' },
  { name: 'Chinese Noodles Roll', gujaratiName: 'ચાઈનીઝ નુડલ્સ રોલ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Noodles and veggies in a crispy roll.' },
  { name: 'Paneer Palak Schezwan Roll', gujaratiName: 'પનીર પાલક સીજવાન રોલ', category: 'Live Counters', subCategory: 'Special Wrap & Roll', description: 'Paneer, spinach, and spicy schezwan roll.' },

  // Ponk
  { name: 'Fresh Green Ponk', gujaratiName: 'ફ્રેશ ગ્રીન પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Freshly harvested tender green winter sorghum.' },
  { name: 'Uttapam Ponk', gujaratiName: 'ઉત્તપમ પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Savoury pancakes topped with fresh ponk.' },
  { name: 'Spring Roll Ponk', gujaratiName: 'સ્પ્રિંગ રોલ પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Crispy rolls with a fresh ponk filling.' },
  { name: 'Bhajiya Ponk', gujaratiName: 'ભજીયા પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Crispy fritters made with fresh ponk.' },
  { name: 'Stuff Aloo Tikki Ponk', gujaratiName: 'સ્ટફ આલુ ટીક્કી પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Potato patties stuffed with fresh ponk.' },
  { name: 'Khichda Ponk', gujaratiName: 'ખીચડા પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Traditional slow-cooked ponk delicacy.' },
  { name: 'Bhel Ponk', gujaratiName: 'ભેળ પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Tangy and crunchy ponk snack.' },
  { name: 'Khich Ponk', gujaratiName: 'ખીચ પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Steamed ponk snack.' },
  { name: 'Pattice Ponk', gujaratiName: 'પેટીસ પોંક', category: 'Live Counters', subCategory: 'Ponk', description: 'Hearty patties made with fresh ponk.' },

  // World Cuisine
  // Chinese
  { name: 'Chinese Bhel', gujaratiName: 'ચાઈનીઝ ભેલ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crispy noodles tossed with fresh vegetables and spicy Chinese sauces.' },
  { name: 'Dry Manchurian', gujaratiName: 'ડ્રાય મન્ચુરિયન', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crispy vegetable balls tossed in a tangy and spicy soy-based sauce.' },
  { name: 'Dry Manchurian with Paneer Chilli', gujaratiName: 'ડ્રાય મન્ચુરિયન વિથ પનીર ચીલ્લી', category: 'World Cuisine', subCategory: 'Chinese', description: 'A combination of crispy manchurian and spicy paneer chilli.' },
  { name: 'Noodles with Manchurian', gujaratiName: 'નુડલ્સ વિથ મન્ચુરિયન', category: 'World Cuisine', subCategory: 'Chinese', description: 'Stir-fried noodles served with flavorful vegetable manchurian.' },
  { name: 'Noodles with Fried Rice', gujaratiName: 'નુડલ્સ વિથ ફ્રાય રાઈસ', category: 'World Cuisine', subCategory: 'Chinese', description: 'A classic combo of stir-fried noodles and aromatic fried rice.' },
  { name: 'American Corn Bhel', gujaratiName: 'અમેરિકન કોર્ન ભેલ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Sweet corn tossed with crispy noodles and tangy sauces.' },
  { name: 'Chilli Potato with Baby Corn', gujaratiName: 'ચીલ્લી પોટેટો વિથ બેબીકોર્ન', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crispy potatoes and tender baby corn in a spicy chilli sauce.' },
  { name: 'Chinese Bhel with Fried Rice', gujaratiName: 'ચાઈનીઝ ભેલ વિથ ફ્રાય રાઈસ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crunchy Chinese bhel served alongside savory fried rice.' },
  { name: 'Chowmein', gujaratiName: 'ચાઉમીન', category: 'World Cuisine', subCategory: 'Chinese', description: 'Traditional stir-fried noodles with assorted vegetables.' },
  { name: 'Chinese Corn Capsicum Rice', gujaratiName: 'ચાઈનીઝ કોર્ન કેપ્સીકમ રાઈસ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Fried rice cooked with sweet corn and crunchy capsicum.' },
  { name: 'Paneer Chilli', gujaratiName: 'પનીર ચીલ્લી', category: 'World Cuisine', subCategory: 'Chinese', description: 'Cubes of paneer tossed with bell peppers in a spicy soy sauce.' },
  { name: 'Cheese Chong Chilli', gujaratiName: 'ચીઝ ચોંગ ચીલ્લી', category: 'World Cuisine', subCategory: 'Chinese', description: 'Special cheese and chilli based Chinese delicacy.' },
  { name: 'Siliguri Noodles with Thopa', gujaratiName: 'સીલીગુડી નુડલ્સ વિથ થોપા', category: 'World Cuisine', subCategory: 'Chinese', description: 'Unique Siliguri style noodles served with a traditional accompaniment.' },
  { name: 'Chilli Noodles', gujaratiName: 'ચીલ્લી નુડલ્સ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Spicy stir-fried noodles with a kick of red chilli.' },
  { name: 'Chilli Potato Fry', gujaratiName: 'ચીલ્લી પોટેટો ફ્રાય', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crispy fried potato wedges tossed in spicy seasonings.' },
  { name: 'Paneer Manchurian Dry', gujaratiName: 'પનીર મન્ચુરિયન ડ્રાય', category: 'World Cuisine', subCategory: 'Chinese', description: 'Crispy paneer balls in a dry, spicy manchurian sauce.' },
  { name: 'Veg. 65', gujaratiName: 'વેજ. 65', category: 'World Cuisine', subCategory: 'Chinese', description: 'Spicy and deep-fried vegetable appetizer.' },
  { name: 'Veg. Crispy', gujaratiName: 'વેજ. ક્રિસ્પી', category: 'World Cuisine', subCategory: 'Chinese', description: 'Assorted vegetables batter-fried and tossed in a sweet and spicy sauce.' },
  { name: 'Veg. Fried Rice', gujaratiName: 'વેજ. ફ્રાય રાઈસ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Classic fried rice with finely chopped vegetables.' },
  { name: 'Chinese Corn Bhel', gujaratiName: 'ચાઈનીઝ કોર્ન ભેલ', category: 'World Cuisine', subCategory: 'Chinese', description: 'A fusion of sweet corn and crispy Chinese elements.' },
  { name: 'Malaysian Noodles', gujaratiName: 'મલેશીયન નુડલ્સ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Flavorful noodles prepared in Malaysian style.' },
  { name: 'Thai Fried Rice', gujaratiName: 'થાઈ ફ્રાય રાઈસ', category: 'World Cuisine', subCategory: 'Chinese', description: 'Aromatic fried rice with Thai herbs and spices.' },

  // Mexican
  { name: 'Veg. Falafel', gujaratiName: 'વેજ. ફલાફલ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Crispy chickpea patties served with traditional dips.' },
  { name: 'Mexican Red Curry Rice', gujaratiName: 'મેક્સીકન રેડ કરી રાઈસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Spicy red curry served with Mexican flavored rice.' },
  { name: 'Hummus with Pita Bread', gujaratiName: 'હમસ વિથ પીતા બ્રેડ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Creamy chickpea dip served with soft pita bread.' },
  { name: 'Mexican Rice', gujaratiName: 'મેક્સીકન રાઈસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Zesty rice cooked with tomatoes, beans, and Mexican spices.' },
  { name: 'Mexican Titbit Rice', gujaratiName: 'મેક્સીકન ટીટબીટ રાઈસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Flavorful rice with assorted Mexican tidbits.' },
  { name: 'Mexican Wrap', gujaratiName: 'મેક્સીકન વ્રેપ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Tortilla filled with beans, rice, and Mexican flavors.' },
  { name: 'Beans Tacos', gujaratiName: 'બીન્સ ટાકોઝ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Crispy taco shells filled with seasoned beans and toppings.' },
  { name: 'Mexican Pizza', gujaratiName: 'મેક્સીકન પીઝા', category: 'World Cuisine', subCategory: 'Mexican', description: 'Pizza topped with beans, corn, and Mexican spices.' },
  { name: 'Mexican Beans Pizza', gujaratiName: 'મેક્સીકન બીન્સ પીઝા', category: 'World Cuisine', subCategory: 'Mexican', description: 'Special pizza loaded with Mexican beans and cheese.' },
  { name: 'Nachos with Salsa & Cheese Sauce', gujaratiName: 'નાચોસ વિથ સાલસા & ચીઝ સોસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Crunchy tortilla chips served with tangy salsa and warm cheese.' },
  { name: 'Mexican Hotpot', gujaratiName: 'મેક્સીકન હોટપોટ', category: 'World Cuisine', subCategory: 'Mexican', description: 'A hearty one-pot meal with rice, beans, and veggies.' },
  { name: 'Cheese Mexican Wrap', gujaratiName: 'ચીઝ મેક્સીકન વ્રેપ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Cheese-loaded wrap with Mexican fillings.' },
  { name: 'Cottage Cheese Peri Peri Wrap', gujaratiName: 'કોટેજ ચીઝ પેરી પેરી વ્રેપ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Paneer wrap with a spicy peri peri kick.' },
  { name: 'Mexican Tikki', gujaratiName: 'મેક્સીકન ટીક્કી', category: 'World Cuisine', subCategory: 'Mexican', description: 'Spiced vegetable patties with Mexican flavors.' },
  { name: 'Mexican Toaster', gujaratiName: 'મેક્સીકન ટોસ્ટર', category: 'World Cuisine', subCategory: 'Mexican', description: 'Toasted sandwich with Mexican style stuffing.' },
  { name: 'Mexican Cilantro Rice', gujaratiName: 'મેક્સીકન સીલાન્ટ્રો રાઈસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Fragrant rice flavored with fresh cilantro and lime.' },
  { name: 'Mexican Three Beans Curry', gujaratiName: 'મેક્સીકન થ્રી બીન્સ કરી', category: 'World Cuisine', subCategory: 'Mexican', description: 'Nutritious curry made with three types of beans.' },
  { name: 'Mexican Lemon Cilantro Rice', gujaratiName: 'મેક્સીકન લેમન સીલાન્ટ્રો રાઈસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Zesty lemon and cilantro flavored Mexican rice.' },
  { name: 'Mexican Platter', gujaratiName: 'મેક્સીકન પ્લેટર', category: 'World Cuisine', subCategory: 'Mexican', description: 'An assortment of Mexican favorites on one plate.' },
  { name: 'Lebanese Falafel', gujaratiName: 'લેબેનીઝ ફલાફલ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Authentic Lebanese style chickpea fritters.' },
  { name: 'Spaghetti Baked with Beans', gujaratiName: 'સ્પેગેટી બેકડ વિથ બીન્સ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Baked spaghetti dish with a Mexican bean twist.' },
  { name: 'Mexican Tacos with Beans', gujaratiName: 'મેક્સીકન ટાકોઝ વિથ બીન્સ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Traditional tacos filled with seasoned beans.' },
  { name: 'Mexican Frankie with Mayonnaise Sauce', gujaratiName: 'મેક્સીકન ફેન્કી વિથ માયોનીઝ સોસ', category: 'World Cuisine', subCategory: 'Mexican', description: 'Mexican style frankie roll with creamy mayo.' },

  // Italian
  { name: 'Italian Pizza', gujaratiName: 'ઈટાલીયન પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Classic Italian pizza with fresh toppings.' },
  { name: 'Thin Crust Pizza', gujaratiName: 'થીન ક્રસ્ટ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Crispy thin crust pizza with assorted toppings.' },
  { name: 'Margherita Pizza', gujaratiName: 'માર્ગેરીટા પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Simple and classic pizza with tomato, basil, and mozzarella.' },
  { name: 'Assorted Pizza', gujaratiName: 'અસોર્ટેડ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'A variety of pizzas with different toppings.' },
  { name: 'Veg. Burger', gujaratiName: 'વેજ. બર્ગર', category: 'World Cuisine', subCategory: 'Italian', description: 'Hearty vegetable patty in a soft bun with toppings.' },
  { name: 'Italian Sizzler', gujaratiName: 'ઈટાલીયન સીઝલર', category: 'World Cuisine', subCategory: 'Italian', description: 'Pasta and Italian delicacies served on a sizzling plate.' },
  { name: 'Red Pasta', gujaratiName: 'રેડ પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'Pasta in a tangy and spicy tomato-based red sauce.' },
  { name: 'White Pasta', gujaratiName: 'વ્હાઈટ પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'Creamy and rich pasta in a white cheesy sauce.' },
  { name: 'Assorted Pasta', gujaratiName: 'અસોર્ટેડ પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'A mix of different pasta styles and sauces.' },
  { name: 'Ravioli', gujaratiName: 'રેવોયો', category: 'World Cuisine', subCategory: 'Italian', description: 'Stuffed pasta dumplings served with flavorful sauce.' },
  { name: 'Cheese Pasta', gujaratiName: 'ચીઝ પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'Extra cheesy pasta for cheese lovers.' },
  { name: 'Italian Lasagna', gujaratiName: 'ઈટાલીયન લઝાનિયા', category: 'World Cuisine', subCategory: 'Italian', description: 'Layered pasta with veggies, cheese, and sauce.' },
  { name: 'Pesto Pasta with Garlic Bread', gujaratiName: 'પેસ્ટો પાસ્તા વિથ ગાર્લિક બ્રેડ', category: 'World Cuisine', subCategory: 'Italian', description: 'Pasta in fresh basil pesto sauce served with garlic bread.' },
  { name: 'Alfredo Pasta', gujaratiName: 'અલ્ફ્રેડો પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'Classic creamy pasta with parmesan cheese.' },
  { name: 'Variety of Thin & Soft Pizza', gujaratiName: 'વેરાયટી ઓફ થીન & સોફ્ટ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'An assortment of thin crust and soft base pizzas.' },
  { name: 'New York Style Pizza', gujaratiName: 'ન્યુયોર્ક સ્ટાઈલ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Large, thin-crust pizza slices with classic toppings.' },
  { name: 'Mexican Green Wave Pizza', gujaratiName: 'મેક્સીકન ગ્રીન વેવ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Fusion pizza with green veggies and Mexican flavors.' },
  { name: 'Sicilia of Pizza', gujaratiName: 'સીસીલીયા ઓફ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Thick-crust Sicilian style pizza.' },
  { name: 'Baked Penne Pasta with Veggies', gujaratiName: 'બેકડ પેન પાસ્તા વિથ વેજી.', category: 'World Cuisine', subCategory: 'Italian', description: 'Penne pasta baked with assorted vegetables and cheese.' },
  { name: 'Spinach Cheese Coated Ravioli Pasta', gujaratiName: 'સ્પીનચ ચીઝ કોટેડ રેવોયોલી પાસ્તા', category: 'World Cuisine', subCategory: 'Italian', description: 'Ravioli stuffed with spinach and cheese.' },
  { name: 'Pasta with Different Gravy', gujaratiName: 'પાસ્તા વિથ ડીફન્ટ ગ્રેવી', category: 'World Cuisine', subCategory: 'Italian', description: 'Pasta served with a variety of unique sauces.' },
  { name: 'Assorted Pizza Extra', gujaratiName: 'અસોર્ટેડ પીઝા', category: 'World Cuisine', subCategory: 'Italian', description: 'Additional variety of pizzas with special toppings.' },

  // Traditional Counter
  // Rajasthani
  { name: 'Churmu', gujaratiName: 'ચૂરમું', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Traditional Rajasthani sweet made from crushed wheat and jaggery.' },
  { name: 'Dal Bati (Plain/Masala/Dryfruit)', gujaratiName: 'દાલ બાટી (પ્લેન / મસાલા / ડ્રાયફ્રૂટ)', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Iconic Rajasthani baked wheat balls served with spicy lentils.' },
  { name: 'Gatta nu Shaak', gujaratiName: 'ગટ્ટાનું શાક', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Gram flour dumplings in a tangy yogurt-based gravy.' },
  { name: 'Rajasthani Bataki', gujaratiName: 'રાજસ્થાની બટાકી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Spiced baby potatoes prepared in Rajasthani style.' },
  { name: 'Dahi Mirch', gujaratiName: 'દહીં મીર્ચ', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Spicy green chillies marinated in yogurt and fried.' },
  { name: 'Aloo Pyaz', gujaratiName: 'આલુ પ્યાજ', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Classic potato and onion curry with Rajasthani spices.' },
  { name: 'Gulkand Churmu', gujaratiName: 'ગુલકંદ ચૂરમું', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Sweet churmu flavored with fragrant rose petal preserve.' },
  { name: 'Bor Mogri', gujaratiName: 'બોર મોગરી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Traditional Rajasthani dry vegetable preparation.' },
  { name: 'Gadi Methi', gujaratiName: 'ગડી મેથી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fenugreek leaves cooked with traditional spices.' },
  { name: 'Chana Dal Paratha', gujaratiName: 'ચણા દાલ પરાઠા', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Flatbread stuffed with spiced Bengal gram lentils.' },
  { name: 'Lasan ni Chutney', gujaratiName: 'લસણની ચટણી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fiery garlic chutney, a staple Rajasthani accompaniment.' },
  { name: 'Methi ke Gatte', gujaratiName: 'મેથી કે ગટ્ટે', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Gram flour and fenugreek dumplings in a spicy gravy.' },
  { name: 'Malai Ghevar', gujaratiName: 'મલાઈ ઘેવર', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Traditional honeycomb sweet topped with rich cream.' },
  { name: 'Meva Lapsi', gujaratiName: 'મેવા લાપસી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Sweet broken wheat pudding loaded with dry fruits.' },
  { name: 'Bajre ki Roti', gujaratiName: 'બાજરે કી રોટી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Nutritious pearl millet flatbread.' },
  { name: 'Ker Sangri', gujaratiName: 'કેર સાંગરી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Unique desert beans and berries curry from Rajasthan.' },
  { name: 'Rajasthani Aloo', gujaratiName: 'રાજસ્થાની આલુ', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Potatoes cooked with a blend of authentic Rajasthani spices.' },
  { name: 'Lila Haldar ki Sabji', gujaratiName: 'લીલા હળદર કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fresh turmeric root curry, a healthy winter specialty.' },
  { name: 'Panchkuti ki Sabji', gujaratiName: 'પંચકુટી કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'A mix of five different vegetables or lentils.' },
  { name: 'Papad Methi ki Sabji', gujaratiName: 'પાપડ મેથી કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Unique curry made with papad and fenugreek seeds.' },
  { name: 'Dahi Papad ki Sabji', gujaratiName: 'દહીં પાપડ કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Tangy yogurt curry with crispy papad pieces.' },
  { name: 'Green Pyaz ki Sabji', gujaratiName: 'ગ્રીન પ્યાજ કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fresh spring onion curry with Rajasthani spices.' },
  { name: 'Masaledar Rajasthani Bhindi', gujaratiName: 'મસાલેદાર રાજસ્થાની ભીંડી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Spicy and crispy okra prepared Rajasthani style.' },
  { name: 'Bataka Green Mava (Fry)', gujaratiName: 'બટાકા ગ્રીન માવા (ફ્રાય)', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fried potatoes with a special green masala coating.' },
  { name: 'Methi Vadi ki Sabji', gujaratiName: 'મેથી વડી કી સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fenugreek dumplings in a flavorful gravy.' },
  { name: 'Green Chana ni Sabji', gujaratiName: 'ગ્રીન ચણા ની સબ્જી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Fresh green chickpeas cooked with traditional spices.' },
  { name: 'Dahi Vada', gujaratiName: 'દહીં વડા', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Soft lentil dumplings soaked in seasoned yogurt.' },
  { name: 'Mirchi Vada', gujaratiName: 'મિર્ચી વડા', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Spicy stuffed chili fritters, a popular Rajasthani snack.' },
  { name: 'Pyaz Kachori', gujaratiName: 'પ્યાજ કચોરી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Flaky pastry stuffed with a spicy onion filling.' },
  { name: 'Rajasthani Kadhi', gujaratiName: 'રાજસ્થાની કઢી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Spicy and thin yogurt-based curry.' },
  { name: 'Bhindi Kadhi', gujaratiName: 'ભીંડી કઢી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Yogurt curry with fried okra pieces.' },
  { name: 'Rajasthani Khichdi', gujaratiName: 'રાજસ્થાની ખીચડી', category: 'Traditional Counter', subCategory: 'Rajasthani', description: 'Comforting rice and lentil dish with Rajasthani tempering.' },

  // Kathiyawadi
  { name: 'Kathiyawadi / Kadhol', gujaratiName: 'કાઠીયાવાડી / કઠોળ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Assorted Kathiyawadi style pulses and beans.' },
  { name: 'Bhareli Dungli', gujaratiName: 'ભરેલી ડુંગળી', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Small onions stuffed with spicy masala.' },
  { name: 'Ringan nu Bharthu', gujaratiName: 'રીંગણનું ભરથું', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Smoky roasted eggplant mash, a Kathiyawadi classic.' },
  { name: 'Lasaniya Bataka', gujaratiName: 'લસણીયા બટાકા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Garlicky baby potatoes in a spicy red gravy.' },
  { name: 'Sev Tameta', gujaratiName: 'સેવ ટામેટા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Tangy tomato curry topped with crunchy sev.' },
  { name: 'Rajwadi Dhokli', gujaratiName: 'રજવાડી ઢોકળી', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Gram flour pieces in a rich and spicy gravy.' },
  { name: 'Bharela Ravaiya', gujaratiName: 'ભરેલા રવૈયા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Stuffed baby eggplants with traditional spices.' },
  { name: 'Kaju Ganthiya', gujaratiName: 'કાજુ ગાંઠીયા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Unique curry made with cashews and crunchy ganthiya.' },
  { name: 'Tuver Chola', gujaratiName: 'તુવેર ચોળા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Fresh pigeon peas and black-eyed peas curry.' },
  { name: 'Lila Chana', gujaratiName: 'લીલા ચણા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Fresh green chickpeas cooked Kathiyawadi style.' },
  { name: 'Dum Aloo', gujaratiName: 'દમ આલુ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Slow-cooked spiced potatoes in a rich gravy.' },
  { name: 'Dungli Bharela Bataka', gujaratiName: 'ડુંગળી ભરેલા બટાકા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Potatoes stuffed with onions and spices.' },
  { name: 'Dahi Tikhari', gujaratiName: 'દહીં તીખારી', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Spicy tempered yogurt dish.' },
  { name: 'Dhokli nu Shaak', gujaratiName: 'ઢોકળીનું શાક', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Gram flour dumplings in a spicy Kathiyawadi gravy.' },
  { name: 'Hyderabadi Chole Chana', gujaratiName: 'હૈદરાબાદી છોલે ચણા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Spicy chickpeas prepared with a Hyderabadi twist.' },
  { name: 'Panchratna Kadhol', gujaratiName: 'પંચરત્ન કઠોળ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'A nutritious mix of five different pulses.' },
  { name: 'Desi Chana', gujaratiName: 'દેશી ચણા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Traditional black chickpeas in a spicy gravy.' },
  { name: 'Rangoli Val', gujaratiName: 'રંગોળી વાલ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Spiced field beans, a Kathiyawadi specialty.' },
  { name: 'Rasawala Mag', gujaratiName: 'રસવાળા મગ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Whole green moong beans in a thin spicy gravy.' },
  { name: 'Lachko Mag', gujaratiName: 'લચકો મગ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Dry and flavorful whole green moong beans.' },
  { name: 'Kadhol Undhiyu', gujaratiName: 'કઠોળ ઊંધિયું', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Kathiyawadi version of the mixed vegetable delicacy.' },
  { name: 'Rajma', gujaratiName: 'રાજમા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Hearty kidney beans in a thick tomato-based gravy.' },
  { name: 'Fangavela Mag Shaak', gujaratiName: 'ફણગાવેલા મગ શાક', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Healthy sprouted moong bean curry.' },
  { name: 'Live Sukhadi', gujaratiName: 'લાઈવ સુખડી', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Freshly made traditional wheat and jaggery sweet.' },
  { name: 'Live Mohanthal', gujaratiName: 'લાઈવ મોહનથાળ', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Warm and rich gram flour fudge made live.' },
  { name: 'Live Dudh Pak', gujaratiName: 'લાઈવ દૂધ પાક', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Freshly prepared rich rice pudding.' },
  { name: 'Bajri Rotla', gujaratiName: 'બાજરી રોટલા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Classic pearl millet flatbread, handmade.' },
  { name: 'Makai Rotla', gujaratiName: 'મકાઈ રોટલા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Handmade cornmeal flatbread.' },
  { name: 'Gondliya Bhajiya', gujaratiName: 'ગોંડલીયા ભજીયા', category: 'Traditional Counter', subCategory: 'Kathiyawadi', description: 'Specialty vegetable fritters from Gondal.' },

  // South Indian
  { name: 'Mini Dosa', gujaratiName: 'મીની ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Bite-sized crispy rice crepes.' },
  { name: 'Variety of Dosa', gujaratiName: 'વેરાયટી ઓફ ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'An assortment of different types of dosas.' },
  { name: 'Cheese Paneer Dosa', gujaratiName: 'ચીઝ પનીર ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Dosa filled with gooey cheese and spiced paneer.' },
  { name: 'Rava Dosa', gujaratiName: 'રવા ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Crispy and lacy dosa made from semolina.' },
  { name: 'Mysore Masala Dosa', gujaratiName: 'મૈસૂર મસાલા ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Dosa with a spicy red chutney and potato filling.' },
  { name: 'Cheese Paneer Corn Dosa', gujaratiName: 'ચીઝ પનીર કોર્ન ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Loaded dosa with cheese, paneer, and sweet corn.' },
  { name: 'Jodhpuri Dosa (Plain/Pudina/Dryfruit)', gujaratiName: 'જોધપુરી ઢોસા (પ્લેન ફુદીના ડ્રાયફ્રૂટ)', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Specialty dosa with various unique fillings.' },
  { name: 'Steam Masala Dosa', gujaratiName: 'સ્ટીમ મસાલા ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Healthy steamed dosa with a spicy potato filling.' },
  { name: 'Onion Tomato Uttapam', gujaratiName: 'ઓનીયન ટોમેટો ઉત્તપમ', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Thick rice pancake topped with onions and tomatoes.' },
  { name: 'Spring Dosa', gujaratiName: 'સ્પ્રિંગ ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Dosa filled with crunchy spring vegetables.' },
  { name: 'Idli Sambhar', gujaratiName: 'ઇડલી સાંભાર', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Soft steamed rice cakes served with lentil soup.' },
  { name: 'Rasam - Vada', gujaratiName: 'રસમ - વડા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Crispy lentil donuts served with tangy pepper soup.' },
  { name: 'Medu Vada', gujaratiName: 'મેંદુ વડા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Classic deep-fried savory lentil donuts.' },
  { name: 'Idli Takatak', gujaratiName: 'ઇડલી ટકાટક', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Spicy and tangy tossed idli pieces.' },
  { name: 'Idli Masala', gujaratiName: 'ઇડલી મસાલા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Idlis tossed in a flavorful spice mix.' },
  { name: 'Idli Veg.', gujaratiName: 'ઇડલી વેજ.', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Idlis served with a variety of vegetables.' },
  { name: 'Paneer Chilla', gujaratiName: 'પનીર ચીલ્લા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Savoury pancakes made with paneer.' },
  { name: 'Hyderabadi Chilla', gujaratiName: 'હૈદરાબાદી ચીલ્લા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Spicy pancakes prepared in Hyderabadi style.' },
  { name: 'Green Chilla', gujaratiName: 'ગ્રીન ચીલ્લા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Healthy pancakes made with green moong dal.' },
  { name: 'Schezwan Dosa', gujaratiName: 'સીઝવાન ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Dosa with a spicy Indo-Chinese schezwan twist.' },
  { name: 'Indian Bhaji Dosa', gujaratiName: 'ઇંડીયન ભાજી ઢોસા', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Dosa served with a flavorful vegetable bhaji.' },
  { name: 'Coconut Chutney', gujaratiName: 'કોકોનટ ચટણી', category: 'Traditional Counter', subCategory: 'South Indian', description: 'Freshly ground coconut dip.' },

  // Punjabi Dhaba
  { name: 'Chana Masala', gujaratiName: 'ચણા મસાલા', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Classic spicy chickpea curry.' },
  { name: 'Aloo Amritsari', gujaratiName: 'આલુ અમૃતસરી', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Tangy and spiced potatoes from Amritsar.' },
  { name: 'Rajma Chawal', gujaratiName: 'રાજમા ચાવલ', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Comforting kidney bean curry served with rice.' },
  { name: 'Sarso ki Sabji', gujaratiName: 'સરસો કી સબ્જી', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Traditional mustard greens curry.' },
  { name: 'Makke ki Roti', gujaratiName: 'મકે કી રોટી', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Classic cornmeal flatbread.' },
  { name: 'Chole Bhature', gujaratiName: 'છોલે ભટુરે', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Spicy chickpeas served with fluffy deep-fried bread.' },
  { name: 'Punjabi Kulcha', gujaratiName: 'પંજાબી કુલચા', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Soft and leavened Punjabi flatbread.' },
  { name: 'Peshawari Chana', gujaratiName: 'પેશાવરી ચણા', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Rich and flavorful chickpeas in Peshawari style.' },
  { name: 'Patiala Lassi', gujaratiName: 'પટીયાલા લચ્છી', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Thick and creamy sweet yogurt drink.' },
  { name: 'Palak wali Dal', gujaratiName: 'પાલક વાલી દાલ', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Nutritious lentils cooked with fresh spinach.' },
  { name: 'Dal Fry', gujaratiName: 'દાલ ફ્રાય', category: 'Traditional Counter', subCategory: 'Punjabi Dhaba', description: 'Tempered yellow lentils with spices.' },

  // Salad
  // Salad
  { name: 'Decorative Salad Bar', gujaratiName: 'ડેકોરેટીવ સલાડ બાર', category: 'Salad', subCategory: 'Salad', description: 'Beautifully arranged fresh garden vegetables.' },
  { name: 'Fresh Green Salad', gujaratiName: 'ફ્રેશ ગ્રીન સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Classic mix of seasonal fresh green vegetables.' },
  { name: 'American Corn Salad', gujaratiName: 'અમેરિકન કોર્ન સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Sweet corn with bell peppers and tangy dressing.' },
  { name: 'Onion Slice', gujaratiName: 'ઓનીયન સ્લાઈસ', category: 'Salad', subCategory: 'Salad', description: 'Freshly sliced onions served with lemon and salt.' },
  { name: 'Orange Dressing Salad', gujaratiName: 'ઓરેન્જ ડ્રેસીંગ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Fresh vegetables tossed in a zesty orange dressing.' },
  { name: 'Kachumber', gujaratiName: 'કચુંબર', category: 'Salad', subCategory: 'Salad', description: 'Finely chopped onion, tomato, and cucumber with lemon.' },
  { name: 'Kadhol Salad', gujaratiName: 'કઠોળ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Nutritious mixed pulse and bean salad.' },
  { name: 'Kabuli Chana', gujaratiName: 'કાબુલી ચણા', category: 'Salad', subCategory: 'Salad', description: 'Spiced chickpea salad with onions and tomatoes.' },
  { name: 'Corn Bell Pepper', gujaratiName: 'કોર્ન બેલ પેપર', category: 'Salad', subCategory: 'Salad', description: 'Sweet corn and colorful bell pepper salad.' },
  { name: 'Corn with Toast Salad', gujaratiName: 'કોર્ન વીથ ટોસ્ટ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Creamy corn salad served with crispy toast.' },
  { name: 'Cream Kachumber with Mint', gujaratiName: 'ક્રીમ કચુંબર વીથ મીન્ટ', category: 'Salad', subCategory: 'Salad', description: 'Refreshing creamy kachumber with a hint of mint.' },
  { name: 'Green Royal Salad', gujaratiName: 'ગ્રીન રોયલ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Premium mix of fresh green vegetables and herbs.' },
  { name: 'Ghee-Gol-Makhan', gujaratiName: 'ઘી-ગોળ-માખણ', category: 'Salad', subCategory: 'Salad', description: 'Traditional accompaniment of ghee, jaggery, and butter.' },
  { name: 'Chana Masala', gujaratiName: 'ચણા મસાલા', category: 'Salad', subCategory: 'Salad', description: 'Spiced chickpea salad with traditional Indian flavors.' },
  { name: 'German Potato Salad', gujaratiName: 'જર્મન પોટેટો સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Classic potato salad with a tangy vinegar-based dressing.' },
  { name: 'Decorative Salad', gujaratiName: 'ડેકોરેટીવ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Artistically arranged fresh vegetable salad.' },
  { name: 'Peanut Salad', gujaratiName: 'પીનટ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Crunchy peanut salad with onions, tomatoes, and spices.' },
  { name: 'Potato Beans Salad', gujaratiName: 'પોટેટો બીન્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Hearty salad with potatoes and fresh green beans.' },
  { name: 'Fangavelu Kadhol Salad', gujaratiName: 'ફણગાવેલુ કઠોળ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Healthy and protein-rich sprouted beans salad.' },
  { name: 'Fruit Veg. with Mayonnaise Sauce', gujaratiName: 'ફ્રુટ વેજ. વીથ માયોનીઝ સોસ', category: 'Salad', subCategory: 'Salad', description: 'Creamy mix of fruits and vegetables in mayonnaise.' },
  { name: 'Fruit Salad', gujaratiName: 'ફ્રુટ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Refreshing mix of seasonal fresh fruits.' },
  { name: 'Bhindi Kurkure', gujaratiName: 'ભીંડી કુરકુરે', category: 'Salad', subCategory: 'Salad', description: 'Crispy fried okra strips with spices.' },
  { name: 'Mag Chana nu Salad', gujaratiName: 'મગ ચણાનું સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Nutritious moong and chickpea salad.' },
  { name: 'Masala Sing', gujaratiName: 'મસાલા શીંગ', category: 'Salad', subCategory: 'Salad', description: 'Spiced peanuts, a perfect crunchy accompaniment.' },
  { name: 'Mint Potato Salad', gujaratiName: 'મીન્ટ પોટેટો સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Boiled potatoes tossed with fresh mint and spices.' },
  { name: 'Mexican Pasta Salad', gujaratiName: 'મેક્સીકન પાસ્તા સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Pasta tossed with Mexican spices, corn, and beans.' },
  { name: 'Mexican Beans Salad', gujaratiName: 'મેક્સીકન બીન્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Hearty salad with assorted beans and Mexican flavors.' },
  { name: 'Mexican Salad', gujaratiName: 'મેક્સીકન સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Fresh vegetables with a spicy Mexican twist.' },
  { name: 'Russian Salad', gujaratiName: 'રશીયન સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Classic creamy potato and vegetable salad with mayonnaise.' },
  { name: 'Rice and Noodles Salad', gujaratiName: 'રાઈસ એન્ડ નુડલ્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Unique salad combining rice and noodles with veggies.' },
  { name: 'Red Pasta Salad', gujaratiName: 'રેડ પાસ્તા સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Pasta salad with a tangy red sauce dressing.' },
  { name: 'Lila Dungli', gujaratiName: 'લીલી ડુંગળી', category: 'Salad', subCategory: 'Salad', description: 'Fresh spring onions served as a crunchy side.' },
  { name: 'Tandoori Paneer Salad', gujaratiName: 'તંદુરી પનીર સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Grilled paneer cubes with fresh greens and tandoori spices.' },
  { name: 'Thai Noodles Salad', gujaratiName: 'થાઈ નુડલ્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Spicy and tangy noodles salad with Thai flavors.' },
  { name: 'Three in One Beans Salad', gujaratiName: 'થ્રી ઈન વન બીન્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'A mix of three different types of nutritious beans.' },
  { name: 'Pasta White Salad', gujaratiName: 'પાસ્તા વ્હાઈટ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Creamy pasta salad with a white sauce dressing.' },
  { name: 'Sprouted Beans Salad', gujaratiName: 'સ્પ્રાઉટેડ બીન્સ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Healthy sprouted beans with lemon and spices.' },
  { name: 'Smoky Aloo', gujaratiName: 'સ્મોકી આલુ', category: 'Salad', subCategory: 'Salad', description: 'Potatoes with a delicious smoky flavor.' },
  { name: 'Herb Potato Salad', gujaratiName: 'હર્બ પોટેટો સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Potatoes tossed with fresh herbs and olive oil.' },
  { name: 'Watermelon Salad', gujaratiName: 'વોટર મેલન સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Refreshing watermelon cubes with a hint of mint.' },
  { name: 'Waldorf Salad', gujaratiName: 'વોલડ્રોફ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Apple, grape, and walnut salad with a creamy dressing.' },
  { name: 'Singdana with Veg. Salad', gujaratiName: 'શીંગદાણા વીથ વેજી. સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Peanuts mixed with fresh garden vegetables.' },
  { name: 'Sing Papad Salad', gujaratiName: 'શીંગ પાપડ સલાડ', category: 'Salad', subCategory: 'Salad', description: 'Unique salad with peanuts and crushed papad.' },
  { name: 'Stuff Chilli', gujaratiName: 'સ્ટફ ચીલ્લી', category: 'Salad', subCategory: 'Salad', description: 'Green chillies stuffed with a spicy masala.' },

  // Sauce/Chutney
  { name: 'Khajur Amboliya Chutney', gujaratiName: 'ખજૂર આંબોળીયા ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Sweet and tangy date and dry mango chutney.' },
  { name: 'Green Pudina Chutney', gujaratiName: 'ગ્રીન ફુદીના ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Refreshing mint and coriander dip.' },
  { name: 'Kopra Chutney', gujaratiName: 'કોપરા ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Freshly ground coconut chutney.' },
  { name: 'Assorted Chutney', gujaratiName: 'અસોર્ટેડ ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'A variety of traditional Indian chutneys.' },
  { name: 'Kotha Chutney', gujaratiName: 'કોઠા ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Tangy wood apple chutney.' },
  { name: 'Lasan ni Chutney', gujaratiName: 'લસણની ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Fiery garlic chutney.' },
  { name: 'Papaiya Chutney', gujaratiName: 'પપૈયાં ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Sweet and spicy papaya relish.' },
  { name: 'Kachi Keri Papaiya Chutney', gujaratiName: 'કાચી કેરી પપૈયાં ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Raw mango and papaya chutney.' },
  { name: 'Lal Marcha Chutney', gujaratiName: 'લાલ મરચાં ચટણી', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Spicy red chili chutney.' },
  { name: 'Tomato Sauce', gujaratiName: 'ટોમેટો સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Classic sweet and tangy tomato ketchup.' },
  { name: 'Schezwan Sauce', gujaratiName: 'સીજવાન સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Spicy Indo-Chinese schezwan sauce.' },
  { name: 'Mexican Sauce', gujaratiName: 'મેક્સીકન સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Tangy and spicy Mexican style sauce.' },
  { name: 'Thousand Sauce', gujaratiName: 'થાઈઝન સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Creamy thousand island dressing.' },
  { name: 'Peri Peri Sauce', gujaratiName: 'પેરી પેરી સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Hot and spicy peri peri sauce.' },
  { name: 'Cheese Sauce', gujaratiName: 'ચીઝ સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Rich and creamy liquid cheese sauce.' },
  { name: 'Mayonnaise Sauce', gujaratiName: 'માયોનીઝ સોસ', category: 'Salad', subCategory: 'Sauce/Chutney', description: 'Classic creamy mayonnaise.' },

  // Achar
  { name: 'Bengali Achar', gujaratiName: 'બંગાળી આચાર', category: 'Salad', subCategory: 'Achar', description: 'Traditional spicy pickle from Bengal.' },
  { name: 'Mix Achar', gujaratiName: 'મીક્ષ આચાર', category: 'Salad', subCategory: 'Achar', description: 'Assorted vegetable pickle with Indian spices.' },
  { name: 'Keri nu Achar', gujaratiName: 'કેરીનું આચાર', category: 'Salad', subCategory: 'Achar', description: 'Classic spicy raw mango pickle.' },
  { name: 'Keri Draksh Achar', gujaratiName: 'કેરી દ્રાક્ષ આચાર', category: 'Salad', subCategory: 'Achar', description: 'Unique mango and grape pickle.' },
  { name: 'Lili Draksh Achar', gujaratiName: 'લીલી દ્રાક્ષ આચાર', category: 'Salad', subCategory: 'Achar', description: 'Sweet and tangy green grape pickle.' },
  { name: 'Lal Marcha Achar', gujaratiName: 'લાલ મરચાં આચાર', category: 'Salad', subCategory: 'Achar', description: 'Fiery stuffed red chili pickle.' },
  { name: 'Keri Gunda Achar', gujaratiName: 'કેરી ગુંદા આચાર', category: 'Salad', subCategory: 'Achar', description: 'Traditional mango and gunda (glue berry) pickle.' },
  { name: 'Kakdi Achar', gujaratiName: 'કાકડી આચાર', category: 'Salad', subCategory: 'Achar', description: 'Tangy pickled cucumbers.' },
  { name: 'Veg. Achar', gujaratiName: 'વેજ. આચાર', category: 'Salad', subCategory: 'Achar', description: 'Mixed vegetable pickle.' },
  { name: 'Gavar Fadi', gujaratiName: 'ગવાર ફડી', category: 'Salad', subCategory: 'Achar', description: 'Pickled cluster beans.' },
  { name: 'Bhinda Fadi', gujaratiName: 'ભીંડા ફડી', category: 'Salad', subCategory: 'Achar', description: 'Pickled okra pieces.' },
  { name: 'Rayta Marcha', gujaratiName: 'રાયતા મરચાં', category: 'Salad', subCategory: 'Achar', description: 'Green chillies pickled in mustard seeds.' },

  // Raita
  { name: 'Fruit Raita', gujaratiName: 'ફ્રુટ રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Sweet and creamy yogurt with fresh fruit pieces.' },
  { name: 'Veg. Raita', gujaratiName: 'વેજ. રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Seasoned yogurt with chopped vegetables.' },
  { name: 'Kakdi Raita', gujaratiName: 'કાકડી રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Refreshing yogurt with grated cucumber.' },
  { name: 'Darbari Raita', gujaratiName: 'દરબારી રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Rich and royal style seasoned yogurt.' },
  { name: 'Apple Raita', gujaratiName: 'એપલ રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Sweet yogurt with fresh apple chunks.' },
  { name: 'Pineapple Raita', gujaratiName: 'પાઈનેપલ રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Tangy and sweet yogurt with pineapple.' },
  { name: 'Bundi Raita', gujaratiName: 'બુંદી રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Yogurt with crispy gram flour droplets.' },
  { name: 'Corn Raita', gujaratiName: 'કોર્ન રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Seasoned yogurt with sweet corn kernels.' },
  { name: 'Gujarati Raita', gujaratiName: 'ગુજરાતી રાયતું', category: 'Salad', subCategory: 'Raita', description: 'Traditional Gujarati style seasoned yogurt.' },

  // Appropriate Dip
  { name: 'Mint Dip', gujaratiName: 'મીન્ટ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Cool and refreshing mint-based dip.' },
  { name: 'Schezwan Dip', gujaratiName: 'સીઝવાન ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Spicy schezwan flavored dipping sauce.' },
  { name: 'Salsa Dip', gujaratiName: 'સાલસા ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Classic Mexican tomato salsa.' },
  { name: 'Thousand Island Dip', gujaratiName: 'થાઈઝન્ડ ઇસલેન્ડ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Creamy thousand island dipping sauce.' },
  { name: 'Sweet Chutney', gujaratiName: 'સ્વીટ ચટણી', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Sweet and tangy dipping chutney.' },
  { name: 'Shawarma Cream', gujaratiName: 'શવરમા ક્રીમ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Garlicky cream sauce used in shawarma.' },
  { name: 'Pesto Dip', gujaratiName: 'પેસ્ટ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Fragrant basil and nut-based pesto dip.' },
  { name: 'Peanut Butter', gujaratiName: 'પીનટ બટર', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Creamy and rich peanut butter dip.' },
  { name: 'Barbeque Sauce', gujaratiName: 'બાર્બેક્યું સોસ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Smoky and sweet barbeque dipping sauce.' },
  { name: 'Cheese Cream Dip', gujaratiName: 'ચીઝ ક્રીમ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Rich and velvety cheese cream dip.' },
  { name: 'Blue Cheese Dip', gujaratiName: 'બ્લુ ચીઝ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Distinctive and bold blue cheese dip.' },
  { name: 'Fresh Mustard Dip', gujaratiName: 'ફ્રેશ મસ્ટર્ડ ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Zesty and sharp fresh mustard dip.' },
  { name: 'Mayo Mint', gujaratiName: 'માયો મીન્ટ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Creamy mayonnaise with a hint of mint.' },
  { name: 'Chilli Garlic', gujaratiName: 'ચીલ્લી ગાર્લિક', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Spicy and aromatic chili garlic dip.' },
  { name: 'Roasted Garlic', gujaratiName: 'રોસ્ટેડ ગાર્લિક', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Mellow and sweet roasted garlic dip.' },
  { name: 'Roasted Pepper Dip', gujaratiName: 'રોસ્ટેડ પેપર ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Smoky roasted bell pepper dip.' },
  { name: 'Pineapple and Banana Dip', gujaratiName: 'પાઈનેપલ એન્ડ બનાના ડીપ', category: 'Salad', subCategory: 'Appropriate Dip', description: 'Unique sweet fruit-based dipping sauce.' },

  // Sweet's
  // Dryfruit Sweet (Garam)
  { name: 'Tava Sizzler', gujaratiName: 'તવા સીઝલર', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Sizzling platter of assorted dry fruit sweets.' },
  { name: 'Kaju Akhrot Halwa', gujaratiName: 'કાજુ અખરોટ હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Warm and rich cashew and walnut fudge.' },
  { name: 'Akhrot Anjir no Halwa', gujaratiName: 'અખરોટ અંજીરનો હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Warm walnut and fig pudding.' },
  { name: 'Badam Akhrot Anjir no Halwa', gujaratiName: 'બદામ અખરોટ અંજીરનો હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Rich mix of almond, walnut, and fig halwa.' },
  { name: 'Akhrot Butter Scotch Halwa', gujaratiName: 'અખરોટ બટર સ્કોચ હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Walnut halwa with a buttery scotch flavor.' },
  { name: 'Badam Chocolate Halwa', gujaratiName: 'બદામ ચોકલેટ હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Delicious almond and chocolate infused halwa.' },
  { name: 'Pista Halwa', gujaratiName: 'પીસ્તા હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Vibrant and nutty pistachio pudding.' },
  { name: 'Kaju Pista Akhrot no Halwa', gujaratiName: 'કાજુ પીસ્તા અખરોટનો હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'A trio of cashew, pistachio, and walnut in a warm halwa.' },
  { name: 'Kaju Mysore', gujaratiName: 'કાજુ મૈસુર', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Rich cashew-based traditional sweet.' },
  { name: 'Dryfruit Ghari', gujaratiName: 'ડ્રાયફ્રૂટ ઘારી', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Surti specialty sweet filled with rich dry fruits.' },
  { name: 'Anjir Akhrot Vedmi', gujaratiName: 'અંજીર અખરોટ વેડમી', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Sweet flatbread stuffed with fig and walnut.' },
  { name: 'Dryfruit Vedmi', gujaratiName: 'ડ્રાયફ્રૂટ વેડમી', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Traditional sweet flatbread with dry fruit stuffing.' },
  { name: 'Kaju Pizza with Gulkand', gujaratiName: 'કાજુ પીઝા વીથ ગુલકંદ', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Unique cashew base pizza topped with sweet rose preserve.' },
  { name: 'Badam Pizza with Pista Sauce', gujaratiName: 'બદામ પીઝા વીથ પીસ્તા સોસ', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Almond base pizza served with a rich pistachio sauce.' },
  { name: 'Dryfruit Bati with Chocolate Sauce', gujaratiName: 'ડ્રાયફ્રૂટ બાટી વીથ ચોકલેટ સોસ', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Sweet baked balls served with warm chocolate sauce.' },
  { name: 'Badam Pista Halwa', gujaratiName: 'બદામ પીસ્તા હલવો', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Classic almond and pistachio warm pudding.' },
  { name: 'Chocolate Coconut Mysore', gujaratiName: 'ચોકલેટ કોકોનટ મૈસુર', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Fusion of chocolate, coconut, and traditional Mysore pak.' },
  { name: 'Almond with Chennapayi Chocolate', gujaratiName: 'આલમંડ વીથ ચેન્નાપાઈ ચોકલેટ', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Almonds paired with a special chocolate delicacy.' },
  { name: 'Badam Mysore', gujaratiName: 'બદામ મૈસુર', category: "Sweet's", subCategory: 'Dryfruit Sweet (Garam)', description: 'Rich almond-based traditional sweet.' },

  // Mavani Sweet (Garam)
  { name: 'Panchratna Halwa', gujaratiName: 'પંચરત્ન હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'A mix of five different ingredients in a warm halwa.' },
  { name: 'Dudhi no Halwa', gujaratiName: 'દૂધીનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Classic warm bottle gourd pudding.' },
  { name: 'Gajar no Halwa', gujaratiName: 'ગાજરનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Traditional warm carrot pudding.' },
  { name: 'Topra no Halwa', gujaratiName: 'ટોપરાનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Warm and sweet coconut pudding.' },
  { name: 'Gajar Topra no Halwa with Nana Gulabjamun', gujaratiName: 'ગાજર ટોપરાનો હલવો વીથ નાના ગુલાબજાંબુ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Carrot and coconut halwa served with mini gulabjamuns.' },
  { name: 'Beet no Halwa', gujaratiName: 'બીટનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Nutritious and sweet warm beetroot pudding.' },
  { name: 'Lila Nariyal no Halwa', gujaratiName: 'લીલા નારીયેલનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Fresh green coconut warm halwa.' },
  { name: 'Majum', gujaratiName: 'માજુમ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Traditional rich mava-based sweet.' },
  { name: 'Dryfruit Majum', gujaratiName: 'ડ્રાયફ્રૂટ માજુમ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Rich majum loaded with assorted dry fruits.' },
  { name: 'Orange Halwa', gujaratiName: 'ઓરેન્જ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Zesty and sweet warm orange pudding.' },
  { name: 'Pineapple Halwa', gujaratiName: 'પાઈનેપલ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Tangy and sweet warm pineapple pudding.' },
  { name: 'Chikoo Halwa', gujaratiName: 'ચીકુ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Sweet and earthy warm chikoo pudding.' },
  { name: 'Lila Chana no Halwa', gujaratiName: 'લીલા ચણાનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Unique warm halwa made from fresh green chickpeas.' },
  { name: 'Chanapai Halwa', gujaratiName: 'ચનાપાઈ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Specialty warm mava pudding.' },
  { name: 'Mava Tava Mahefil', gujaratiName: 'માવા તવા મહેફિલ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'A grand assortment of mava sweets served on a tava.' },
  { name: 'Afghani Tava Halwa', gujaratiName: 'અફઘાની તવા હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Rich Afghani style warm halwa.' },
  { name: 'Dryfruit Mava Mohanthal', gujaratiName: 'ડ્રાયફ્રૂટ માવા મોહનથાળ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Rich gram flour fudge with mava and dry fruits.' },
  { name: 'Live Magaj', gujaratiName: 'લાઈવ મગજ', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Freshly prepared traditional gram flour sweet.' },
  { name: 'Live Mava Sukhadi', gujaratiName: 'લાઈવ માવા સુખડી', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Freshly made wheat and mava sweet.' },
  { name: 'Apple no Halwa', gujaratiName: 'એપલનો હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Sweet and fruity warm apple pudding.' },
  { name: 'Kesar Dryfruit Halwa', gujaratiName: 'કેસર ડ્રાયફ્રૂટ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet (Garam)', description: 'Saffron flavored halwa with rich dry fruits.' },

  // Mavani Sweet
  { name: 'Dryfruit Halwa', gujaratiName: 'ડ્રાયફ્રૂટ હલવો', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Classic halwa loaded with assorted dry fruits.' },
  { name: 'Chocolate Barfi', gujaratiName: 'ચોકલેટ બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Rich chocolate flavored mava fudge.' },
  { name: 'Kaju Barfi', gujaratiName: 'કાજુ બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Classic cashew fudge.' },
  { name: 'Akhrot Anjir Barfi', gujaratiName: 'અખરોટ અંજીર બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Fudge made with walnuts and figs.' },
  { name: 'Chikoo Barfi', gujaratiName: 'ચીકુ બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Sweet chikoo flavored mava fudge.' },
  { name: 'Chocolate Orange Barfi', gujaratiName: 'ચોકલેટ ઓરેન્જ બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Unique blend of chocolate and orange in a fudge.' },
  { name: 'Strawberry Barfi', gujaratiName: 'સ્ટ્રોબેરી બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Sweet and fruity strawberry mava fudge.' },
  { name: 'Topra Pak', gujaratiName: 'ટોપરા પાક', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Traditional sweet coconut fudge.' },
  { name: 'Mohanthal', gujaratiName: 'મોહનથાળ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Classic Gujarati gram flour fudge.' },
  { name: 'Dryfruit Ghau na Ladoo', gujaratiName: 'ડ્રાયફ્રૂટ ઘઉંના લાડુ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Nutritious wheat flour balls with dry fruits.' },
  { name: 'Magaj na Laddu', gujaratiName: 'મગજના લાડુડી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Traditional gram flour sweet balls.' },
  { name: 'Motichur na Ladoo', gujaratiName: 'મોતીચૂરના લાડુ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Classic tiny gram flour pearl sweets.' },
  { name: 'Boondi na Ladoo', gujaratiName: 'બુંદીના લાડુ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Traditional sweet gram flour droplet balls.' },
  { name: 'Shahi Gulabjamun', gujaratiName: 'શાહી ગુલાબજાંબુ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Royal sized soft milk dumplings in syrup.' },
  { name: 'Kala Jamun', gujaratiName: 'કાલા જાંબુ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Deep-fried dark milk dumplings in syrup.' },
  { name: 'Santra Barfi', gujaratiName: 'સંતરા બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Zesty orange flavored mava fudge.' },
  { name: 'Kalakand', gujaratiName: 'કલાકન્દ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Grainy and rich milk-based sweet.' },
  { name: 'Mava Kachori', gujaratiName: 'માવા કચોરી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Sweet pastry stuffed with rich mava.' },
  { name: 'Coconut Barfi', gujaratiName: 'કોકોનટ બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Classic sweet coconut fudge.' },
  { name: 'Cherry Barfi', gujaratiName: 'ચેરી બરફી', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Sweet mava fudge with cherry bits.' },
  { name: 'Thandi Barfi Sweet', gujaratiName: 'ઠંડી બરફ સ્વીટ', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Refreshing cold mava sweet.' },
  { name: 'Makhan Gola', gujaratiName: 'મખન ગોલા', category: "Sweet's", subCategory: 'Mavani Sweet', description: 'Traditional buttery sweet delicacy.' },

  // Dryfruit Sweet
  { name: 'Kaju Katri', gujaratiName: 'કાજુ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Classic and thin cashew fudge diamonds.' },
  { name: 'Badam Katri', gujaratiName: 'બદામ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Thin and rich almond fudge diamonds.' },
  { name: 'Kaju Anjir Roll', gujaratiName: 'કાજુ અંજીર રોલ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Cashew and fig fudge rolls.' },
  { name: 'Kaju Pista Roll', gujaratiName: 'કાજુ પીસ્તા રોલ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Cashew and pistachio fudge rolls.' },
  { name: 'Kaju Dryfruit Roll', gujaratiName: 'કાજુ ડ્રાયફ્રૂટ રોલ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Cashew fudge roll loaded with dry fruits.' },
  { name: 'Kaju Kasata', gujaratiName: 'કાજુ કસાટા', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Layered cashew sweet with dry fruits.' },
  { name: 'Kaju Kamal', gujaratiName: 'કાજુ કમલ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Artistically shaped cashew sweet.' },
  { name: 'Kaju Tadbuch', gujaratiName: 'કાજુ તડબૂચ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Watermelon shaped cashew sweet.' },
  { name: 'Choko Kaju Katri', gujaratiName: 'ચોકો કાજુ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Chocolate flavored cashew fudge.' },
  { name: 'Anjir Katri', gujaratiName: 'અંજીર કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Rich fig fudge diamonds.' },
  { name: 'Chocolate Kaju Katri', gujaratiName: 'ચોકલેટ કાજુ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Cashew fudge with a chocolate coating.' },
  { name: 'Kaju Pista Sandwich', gujaratiName: 'કાજુ પીસ્તા સેન્ડવીચ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Layered cashew and pistachio sweet.' },
  { name: 'Kaju Pista Pan', gujaratiName: 'કાજુ પીસ્તા પાન', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Betel leaf shaped cashew and pistachio sweet.' },
  { name: 'Kaju Pan', gujaratiName: 'કાજુ પાન', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Betel leaf shaped cashew sweet.' },
  { name: 'Badam Pista Sandwich', gujaratiName: 'બદામ પીસ્તા સેન્ડવીચ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Layered almond and pistachio sweet.' },
  { name: 'Dryfruit Katri', gujaratiName: 'ડ્રાયફ્રૂટ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Mixed dry fruit fudge diamonds.' },
  { name: 'Kaju Gulkand Katori', gujaratiName: 'કાજુ ગુલકંદ કટોરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Cashew cup filled with sweet rose preserve.' },
  { name: 'Dryfruit Patra Roll', gujaratiName: 'ડ્રાયફ્રૂટ પાત્રા રોલ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Unique dry fruit roll shaped like patra.' },
  { name: 'Pista Diamond', gujaratiName: 'પીસ્તા ડાયમંડ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Rich pistachio fudge diamonds.' },
  { name: 'Sandwich Katri', gujaratiName: 'સેન્ડવીચ કતરી', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Layered mixed dry fruit fudge.' },
  { name: 'Choko Almond', gujaratiName: 'ચોકો આલમંડ', category: "Sweet's", subCategory: 'Dryfruit Sweet', description: 'Chocolate coated almonds.' },

  // Counter Sweet
  { name: 'Kesar Jalebi', gujaratiName: 'કેસર જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Crispy saffron-infused sweet spirals.' },
  { name: 'Rabdi Jalebi', gujaratiName: 'રબડી જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Crispy jalebis served with rich thickened milk.' },
  { name: 'Imarti', gujaratiName: 'ઇમરતી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Traditional flower-shaped deep-fried sweet.' },
  { name: 'Imarti Rabdi', gujaratiName: 'ઇમરતી રબડી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Imarti served with creamy rabdi.' },
  { name: 'Garam Gulabjamun', gujaratiName: 'ગરમ ગુલાબજાંબુ', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Warm milk dumplings in sugar syrup.' },
  { name: 'Gulabjamun Patra with Rabdi', gujaratiName: 'ગુલાબજાંબુ પાત્રા વીથ રબડી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Specialty gulabjamun served with rabdi.' },
  { name: 'Malpuva', gujaratiName: 'માલપુઆ', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Sweet deep-fried pancakes.' },
  { name: 'Malpuva with Rabdi', gujaratiName: 'માલપુઆ વીથ રબડી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Sweet pancakes served with rich thickened milk.' },
  { name: 'Pineapple Jalebi', gujaratiName: 'પાઈનેપલ જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Unique pineapple flavored sweet spirals.' },
  { name: 'Gulabjamun with Vanilla Ice Cream', gujaratiName: 'ગુલાબજાંબુ વીથ વેનીલા આઈસ્ક્રીમ', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Warm dumplings served with cold vanilla ice cream.' },
  { name: 'Keshariya Dudh with Jalebi', gujaratiName: 'કેશરીયા દૂધ વીથ જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Saffron milk served with crispy jalebis.' },
  { name: 'Ghevar with Jalebi', gujaratiName: 'ઘેવર વીથ જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Traditional honeycomb sweet served with jalebis.' },
  { name: 'Apple Jalebi', gujaratiName: 'એપલ જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Fruity apple flavored sweet spirals.' },
  { name: 'Dryfruit Jalebi', gujaratiName: 'ડ્રાયફ્રૂટ જલેબી', category: "Sweet's", subCategory: 'Counter Sweet', description: 'Jalebis loaded with crushed dry fruits.' },

  // Liquid Sweet's
  // Basundi
  { name: 'K.P. Basundi', gujaratiName: 'કે.પી.બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Classic rich thickened milk with premium nuts.' },
  { name: 'Anguri Basundi', gujaratiName: 'અંગુરી બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Thickened milk with small cottage cheese balls.' },
  { name: 'Anjir Kaju Basundi', gujaratiName: 'અંજીર કાજુ બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Rich basundi flavored with figs and cashews.' },
  { name: 'Sitafal Basundi', gujaratiName: 'સીતાફળ બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Creamy basundi with fresh custard apple pulp.' },
  { name: 'Pineapple Apple Pie Basundi', gujaratiName: 'પાઈનેપલ એપલ પાઈ', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Unique fusion of fruit pie flavors in basundi.' },
  { name: 'Sutarfeni Basundi', gujaratiName: 'સુતરફેણી બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Basundi topped with fine vermicelli sweet.' },
  { name: 'Rajwadi Basundi', gujaratiName: 'રજવાડી બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Royal style basundi with abundant dry fruits.' },
  { name: 'Chhanani Basundi', gujaratiName: 'છન્નાણી બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Traditional textured thickened milk sweet.' },
  { name: 'Brownie Basundi', gujaratiName: 'બ્રાઉની બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Modern fusion of chocolate brownie and basundi.' },
  { name: 'Dryfruit Basundi', gujaratiName: 'ડ્રાયફ્રૂટ બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Basundi loaded with a variety of dry fruits.' },
  { name: 'Chocolate Badam Basundi', gujaratiName: 'ચોકલેટ બદામ બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Chocolate flavored basundi with almond bits.' },
  { name: 'Fresh Strawberry Basundi', gujaratiName: 'ફ્રેશ સ્ટ્રોબેરી બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Seasonal basundi with fresh strawberry chunks.' },
  { name: 'Sitafal Anjir Basundi', gujaratiName: 'સીતાફળ અંજીર બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Combination of custard apple and fig in basundi.' },
  { name: 'Anjir Akhrot Basundi', gujaratiName: 'અંજીર અખરોટ બાસુંદી', category: "Liquid Sweet's", subCategory: 'Basundi', description: 'Nutritious basundi with figs and walnuts.' },

  // Cream Base
  { name: 'American Fudge', gujaratiName: 'અમેરીકન ફજ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Rich and creamy American style chocolate fudge.' },
  { name: 'Dryfruit Salad', gujaratiName: 'ડ્રાયફ્રૂટ સલાડ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Creamy dessert with assorted dry fruits.' },
  { name: 'Pistachio', gujaratiName: 'પીસ્તાચીઓ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Smooth and nutty pistachio flavored cream.' },
  { name: 'Cream Pleasure', gujaratiName: 'ક્રિમ પ્લેઝર', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'A delightful blend of rich cream and flavors.' },
  { name: 'French Berry', gujaratiName: 'ફ્રેન્ચ બેરી', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Exotic berry flavored creamy dessert.' },
  { name: 'Green Apple Pie', gujaratiName: 'ગ્રીન એપલપાઈ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Tangy green apple flavor in a creamy base.' },
  { name: 'Royal Cream Salad', gujaratiName: 'રોયલ ક્રિમ સલાડ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Premium fruit and cream salad.' },
  { name: 'Arabian Fudge', gujaratiName: 'અરેબીયન ફજ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Exotic Arabian style creamy fudge.' },
  { name: 'Pine Fudge', gujaratiName: 'પાઈના ફજ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Unique pineapple flavored creamy fudge.' },
  { name: 'Red Velvet Fudge', gujaratiName: 'રેડ વોલ્વેટ ફજ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Creamy dessert with red velvet cake flavors.' },
  { name: 'Carrot Bonanza', gujaratiName: 'કેરેટ બોનાન્ઝા', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Sweet carrot flavored creamy delight.' },
  { name: 'Hazelnut Hurricane', gujaratiName: 'હેઝલનટ હેરીકેન', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Intense hazelnut flavored creamy dessert.' },
  { name: 'Orange Cookie Cream', gujaratiName: 'ઓરેન્જ કુકી ક્રિમ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Zesty orange and crunchy cookie cream.' },
  { name: 'Sitafal Bonanza', gujaratiName: 'સીતાફળ બોનાન્ઝા', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Rich custard apple flavored creamy treat.' },
  { name: 'Ras Madhuri', gujaratiName: 'રસ માધુરી', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Sweet and succulent creamy dessert.' },
  { name: 'Kiwi Bonanza', gujaratiName: 'કીવી બોનાન્ઝા', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Refreshing kiwi flavored creamy delight.' },
  { name: 'Pineapple Apple Pie', gujaratiName: 'પાઈનેપલ એપલપાઈ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Fusion of pineapple and apple pie in cream.' },
  { name: 'Vanilla Delight', gujaratiName: 'વેનીલા ડેલાઈટ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Classic smooth vanilla cream dessert.' },
  { name: 'Cream Fruit Salad', gujaratiName: 'ક્રિમ ફ્રુટ સલાડ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Assorted fresh fruits in rich whipped cream.' },
  { name: 'Almond Pleasure', gujaratiName: 'આલમંડ પ્લેઝર', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Creamy dessert with crunchy almond bits.' },
  { name: 'Mango Pleasure', gujaratiName: 'મેંગો પ્લેઝર', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Delightful mango flavored creamy treat.' },
  { name: 'Mango Delight', gujaratiName: 'મેંગો ડેલાઈટ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Creamy mango dessert with fruit chunks.' },
  { name: 'Mango Cream Ras', gujaratiName: 'મેંગો ક્રિમ રસ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Rich mango pulp blended with cream.' },
  { name: 'Mango Fruit Cocktail', gujaratiName: 'મેંગો ફ્રુટ કોકટેલ', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Mixed fruits in a mango flavored cream.' },
  { name: 'Mango Magic', gujaratiName: 'મેંગો મેજીક', category: "Liquid Sweet's", subCategory: 'Cream Base', description: 'Special magical blend of mango and cream.' },

  // Special Matho
  { name: 'Lonavala Matho', gujaratiName: 'લોનાવલી', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Specialty matho inspired by Lonavala flavors.' },
  { name: 'Panchratna Matho', gujaratiName: 'પંચરત્ન', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Matho with five types of dry fruits.' },
  { name: 'Mango Tango Matho', gujaratiName: 'મેંગો ટેંગો', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Zesty and sweet mango flavored matho.' },
  { name: 'Kachi Keri Matho', gujaratiName: 'કાચી કેરી', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Unique tangy raw mango flavored matho.' },
  { name: 'Sitafal Matho', gujaratiName: 'સીતાફળ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Creamy matho with custard apple pulp.' },
  { name: 'Chocolate Marble Matho', gujaratiName: 'ચોકલેટ માર્બલ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Matho with a chocolate marble effect.' },
  { name: 'Strawberry Punch Matho', gujaratiName: 'સ્ટ્રોબેરી પંચ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Refreshing strawberry flavored matho.' },
  { name: 'Kesar Rajbhog Matho', gujaratiName: 'કેસર રાજભોગ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Royal saffron flavored matho with nuts.' },
  { name: 'Chatako Matho', gujaratiName: 'ચટાકો', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Spicy and sweet flavored specialty matho.' },
  { name: 'Golden Pearl Matho', gujaratiName: 'ગોલ્ડન પર્લ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Premium matho with a golden touch.' },
  { name: 'American Dream Matho', gujaratiName: 'અમેરીકન ડ્રીમ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Exotic flavored creamy matho.' },
  { name: 'Chhappan Bhog Matho', gujaratiName: 'છપ્પન ભોગ', category: "Liquid Sweet's", subCategory: 'Special Matho', description: 'Rich matho with a variety of ingredients.' },

  // Bengali Sweets
  { name: 'Rasmalai', gujaratiName: 'રસમલાઈ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Soft cottage cheese patties in saffron milk.' },
  { name: 'Malai Chaap', gujaratiName: 'મલાઈ ચાપ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Creamy and soft Bengali milk sweet.' },
  { name: 'Kalajam', gujaratiName: 'કાલાજામ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Dark fried milk dumplings in syrup.' },
  { name: 'Choko Fudge Bengali', gujaratiName: 'ચોકો ફજ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Chocolate flavored Bengali sweet.' },
  { name: 'Sandwich Bengali', gujaratiName: 'સેન્ડવીચ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Layered Bengali milk sweet.' },
  { name: 'Kamal / Choko', gujaratiName: 'કમલ / ચોકીટો', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Lotus shaped or chocolate flavored sweet.' },
  { name: 'Marble Jambu', gujaratiName: 'માર્બલ જાંબુ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Gulab jamun with a marble texture.' },
  { name: 'Sitafal Roll Bengali', gujaratiName: 'સીતાફળ રોલ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Custard apple flavored milk roll.' },
  { name: 'Cham Cham', gujaratiName: 'ચમચમ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Traditional cylindrical Bengali sweet.' },
  { name: 'Rajarani', gujaratiName: 'રાજારાણી', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Royal Bengali sweet with rich filling.' },
  { name: 'Chhena Toast', gujaratiName: 'છેના ટોસ્ટ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Sweetened cottage cheese toast.' },
  { name: 'Malai Roll', gujaratiName: 'મલાઈ રોલ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Soft rolls filled with fresh cream.' },
  { name: 'Cherry Almond Bengali', gujaratiName: 'ચેરી આલમંડ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Bengali sweet with cherry and almond.' },
  { name: 'Gulab Jambu Bengali', gujaratiName: 'ગુલાબજાંબુ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Classic milk dumplings in sugar syrup.' },
  { name: 'Kamalbhog', gujaratiName: 'કમળભોગ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Large saffron flavored rasgulla.' },
  { name: 'Hiramoti', gujaratiName: 'હીરામોતી', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Small pearl-like Bengali sweets.' },
  { name: 'Pineapple Sandwich Bengali', gujaratiName: 'પાઈનેપલ સેન્ડવીચ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Pineapple flavored layered sweet.' },
  { name: 'Kiwi Sandwich Bengali', gujaratiName: 'કીવી સેન્ડવીચ', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Kiwi flavored layered sweet.' },
  { name: 'Malai Batti', gujaratiName: 'મલાઈ બાટી', category: "Liquid Sweet's", subCategory: 'Bengali Sweets', description: 'Rich cream filled Bengali sweet.' },

  // Premium Sweets (Kuldi)
  { name: 'Lychee Blossom', gujaratiName: 'લીચી બ્લોસમ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Exotic lychee flavored creamy dessert in kuldi.' },
  { name: 'Chandra Malai Lachha', gujaratiName: 'ચંદ્ર મલાઈ લચ્છા', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Traditional layered cream dessert.' },
  { name: 'Strawberry King', gujaratiName: 'સ્ટ્રોબેરી કીંગ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Premium strawberry dessert in kuldi.' },
  { name: 'Gulkand Dryfruit Kuldi', gujaratiName: 'ગુલકંદ ડ્રાયફ્રૂટ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Rose preserve and dry fruit dessert.' },
  { name: 'Mango Malta', gujaratiName: 'મેંગો માલતા', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Exotic mango and citrus blend in kuldi.' },
  { name: 'Gulab Shahi', gujaratiName: 'ગુલાબ શાહી', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Royal rose flavored creamy dessert.' },
  { name: 'Saffron Delight', gujaratiName: 'સેફ્રોન ડેલાઈટ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Rich saffron flavored dessert in kuldi.' },
  { name: 'Choko Pina', gujaratiName: 'ચોકો પીના', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Chocolate and pineapple fusion dessert.' },
  { name: 'Fruit Fanta', gujaratiName: 'ફ્રુટ ફન્ટા', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Fruity and refreshing dessert in kuldi.' },
  { name: 'Rose Treat', gujaratiName: 'રોઝ ટ્રીટ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Delicate rose flavored creamy treat.' },
  { name: 'Dryfruit Kuldi', gujaratiName: 'ડ્રાયફ્રૂટ કુલડી', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Mixed dry fruits in a creamy base in kuldi.' },
  { name: 'Kiwi Delight Kuldi', gujaratiName: 'કીવી ડેલાઈટ', category: "Liquid Sweet's", subCategory: 'Premium Sweets', description: 'Refreshing kiwi dessert served in kuldi.' },

  // Rabdi
  { name: 'Rajwadi Lachha Rabdi', gujaratiName: 'રાજવાડી લચ્છા રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Traditional layered thickened milk.' },
  { name: 'Santra Rabdi', gujaratiName: 'સંતરા રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Thickened milk with fresh orange segments.' },
  { name: 'Mango Rabdi', gujaratiName: 'મેંગો રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Thickened milk with fresh mango pulp.' },
  { name: 'Sitafal Rabdi', gujaratiName: 'સીતાફળ રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Thickened milk with custard apple pulp.' },
  { name: 'Anjir Rabdi', gujaratiName: 'અંજીર રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Thickened milk with sweet fig pieces.' },
  { name: 'Jambu Veeth Rabdi', gujaratiName: 'જાંબુ વીથ રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Specialty rabdi with jamun fruit.' },
  { name: 'Dryfruit Rabdi', gujaratiName: 'ડ્રાયફ્રૂટ રબડી', category: "Liquid Sweet's", subCategory: 'Rabdi', description: 'Rich rabdi loaded with mixed dry fruits.' },

  // Garvi Gujarat Counter
  // Farsan
  { name: 'Samosa (Corn/Mutter/Dal/Cheese)', gujaratiName: 'સમોસા (કોર્ન/મટર/દાળ/ચીઝ)', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Assorted crispy fried pastries with various fillings.' },
  { name: 'Ghughra', gujaratiName: 'ઘુઘરા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Traditional sweet and savory fried dumplings.' },
  { name: 'Corn Tikki', gujaratiName: 'કોર્ન ટીક્કી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy and delicious sweet corn patties.' },
  { name: 'Lilva na Envelope', gujaratiName: 'લીલવાના એન્વલોપ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Unique envelope-shaped pastry with pigeon pea filling.' },
  { name: 'Ratalu Roll', gujaratiName: 'રતાળુ રોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy rolls made from purple yam.' },
  { name: 'Kothmir Vadi', gujaratiName: 'કોથમીર વડી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Steamed and fried coriander cakes.' },
  { name: 'Aalu Mutter Pudina na Roll', gujaratiName: 'આલુ મટર ફુદીના ના રોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Potato and pea rolls with a refreshing mint flavor.' },
  { name: 'Kachori (Lilva/Corn/Mutter/Chana Dal)', gujaratiName: 'કચોરી (લીલવા/કોર્ન/મટર/ચણા દાળ)', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Assorted crispy fried balls with various lentil and vegetable stuffings.' },
  { name: 'Cutlet (Aalu/Ratalu/Vatana)', gujaratiName: 'કટલેશ (આલુ/રતાળુ/વટાણા)', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy patties made from potato, yam, or peas.' },
  { name: 'Vada (Bataka/Dabeli/Kela)', gujaratiName: 'વડા (બટાકા/દાબેલી/કેળા)', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Assorted fried fritters made from potato, dabeli mix, or banana.' },
  { name: 'Dahi Vada', gujaratiName: 'દહીં વડા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Soft lentil dumplings soaked in seasoned yogurt.' },
  { name: 'Petis (Lilva/Tuver/Surti)', gujaratiName: 'પેટીસ (લીલવા/તૂવેર/સુરતી)', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Traditional stuffed patties with various lentil fillings.' },
  { name: 'Methi Bhajiya', gujaratiName: 'મેથી ભજીયા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy fenugreek leaf fritters.' },
  { name: 'Butter Sweet Corn Lilafa', gujaratiName: 'બટર સ્વીટ કોર્ન લીલાફા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Buttery sweet corn filled pastries.' },
  { name: 'Bombay Bread Roll with Cheese Sauce', gujaratiName: 'બોમ્બે બ્રેડ રોલ વીથ ચીઝ સોસ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy bread rolls served with a creamy cheese sauce.' },
  { name: 'Vanmor', gujaratiName: 'વનમોર', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Specialty fried snack with a unique blend of spices.' },
  { name: 'Corn Ghughra', gujaratiName: 'કોર્ન ઘુઘરા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Fried dumplings with a sweet corn filling.' },
  { name: 'Veg Kurkure', gujaratiName: 'વેજ કુરકુરે', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crunchy and spicy mixed vegetable snacks.' },
  { name: 'Bombay Marble', gujaratiName: 'બોમ્બે માર્બલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Unique marble-textured savory snack.' },
  { name: 'Dryfruit Kachori', gujaratiName: 'ડ્રાયફ્રૂટ કચોરી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy kachori stuffed with rich dry fruits.' },
  { name: 'Aalu Lilva Petis', gujaratiName: 'આલુ લીલવા પેટીસ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Potato patties stuffed with fresh pigeon peas.' },
  { name: 'Manchurian Dragon Roll', gujaratiName: 'મંચુરીયન ડ્રેગન રોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Fusion roll with spicy manchurian filling.' },
  { name: 'Chinese Marble', gujaratiName: 'ચાઈનીઝ માર્બલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Savory snack with Chinese-inspired flavors.' },
  { name: 'Lilva na Corn Marble', gujaratiName: 'લીલવાના કોર્ન માર્બલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Unique snack combining pigeon peas and corn.' },
  { name: 'Mexican Corn', gujaratiName: 'મેક્સીકન કોર્ન', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Spicy and tangy Mexican style corn snack.' },
  { name: 'Italian Jahaj', gujaratiName: 'ઈટાલીયન જહાજ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Boat-shaped pastry with Italian flavors.' },
  { name: 'Mexican Roll', gujaratiName: 'મેક્સીકન રોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy roll with a spicy Mexican filling.' },
  { name: 'Vogaton Marble', gujaratiName: 'વોગટોન માર્બલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Specialty marble-textured savory treat.' },
  { name: 'Sesame Finger', gujaratiName: 'સીસમ ફીંગર', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crunchy fingers coated with sesame seeds.' },
  { name: 'Chinese Cutlet', gujaratiName: 'ચાઈનીઝ કટલેશ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Cutlets with a blend of Chinese spices and vegetables.' },
  { name: 'Corn Paneer Cheese Samosa', gujaratiName: 'કોર્ન પનીર ચીઝ સમોસા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Rich samosa with corn, paneer, and cheese.' },
  { name: 'Lilva Chana ni Tikki', gujaratiName: 'લીલા ચણાની ટીક્કી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Patties made from fresh green chickpeas.' },
  { name: 'Veg Kachori', gujaratiName: 'વેજ કચોરી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy pastry stuffed with mixed vegetables.' },
  { name: 'Chinese Sev Roll', gujaratiName: 'ચાઈનીઝ સેવરોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Crispy roll topped with crunchy sev.' },
  { name: 'Chinese Badam', gujaratiName: 'ચાઈનીઝ બદામ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Almond-shaped savory snack with Chinese flavors.' },
  { name: 'Veg Dragon Roll', gujaratiName: 'વેજ ડ્રેગન રોલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Spicy and crunchy mixed vegetable roll.' },
  { name: 'Gondliya Bhajiya', gujaratiName: 'ગોંડલીયા ભજીયા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Specialty fritters from the Gondal region.' },
  { name: 'Lilva ni Kachori', gujaratiName: 'લીલવાની કચોરી', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Traditional kachori with fresh pigeon pea stuffing.' },
  { name: 'Chinese Corn', gujaratiName: 'ચાઈનીઝ કોર્ન', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Corn snack with a spicy Chinese twist.' },
  { name: 'Lilva na Corn', gujaratiName: 'લીલવાના કોર્ન', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Savory snack with pigeon peas and corn.' },
  { name: 'Vogaton Samosa', gujaratiName: 'વોગટોન સમોસા', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Specialty samosa with a unique filling.' },
  { name: 'Mexican Vogaton', gujaratiName: 'મેક્સીકન વોગટોન', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Vogaton snack with Mexican spices.' },
  { name: 'Mexican Marble', gujaratiName: 'મેક્સીકન માર્બલ', category: 'Garvi Gujarat Counter', subCategory: 'Farsan', description: 'Marble-textured snack with Mexican flavors.' },

  // Gujarat Se...
  { name: 'Live Dhokla', gujaratiName: 'લાઈવ ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Freshly steamed fermented rice and lentil cakes.' },
  { name: 'Live Handvo', gujaratiName: 'લાઈવ હાંડવો', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Savory lentil cake with a crispy tempered crust.' },
  { name: 'Palak Cheese Dhokla', gujaratiName: 'પાલક ચીઝ ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Steamed dhokla with spinach and cheese.' },
  { name: 'Live Cheese Handvo / Paneer Handvo', gujaratiName: 'લાઈવ ચીઝ હાંડવો / પનીર હાંડવો', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Handvo enriched with cheese or paneer.' },
  { name: 'Palak Dhokla', gujaratiName: 'પાલક ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Healthy steamed dhokla with fresh spinach.' },
  { name: 'Variety of Khaman', gujaratiName: 'વેરાયટી ઓફ ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted types of soft gram flour cakes.' },
  { name: 'Tam Tam Khaman', gujaratiName: 'ટમટમ ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Spicy and tangy tempered khaman.' },
  { name: 'Dahi Khaman', gujaratiName: 'દહીં ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Soft khaman served with seasoned yogurt.' },
  { name: 'Pudina Khaman', gujaratiName: 'ફુદીના ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Refreshing mint flavored khaman.' },
  { name: 'Vibrant Gujarat', gujaratiName: 'વાઈબ્રન્ટ ગુજરાત', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Specialty platter representing Gujarati flavors.' },
  { name: 'Khushbu Gujarat Ki', gujaratiName: 'ખુશ્બુ ગુજરાત કી', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'A fragrant and flavorful Gujarati snack assortment.' },
  { name: 'Khandvi', gujaratiName: 'ખાંડવી', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Silky smooth gram flour rolls with tempering.' },
  { name: 'Rasadar Patra', gujaratiName: 'રસાદાર પાત્રા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Colocasia leaf rolls in a flavorful gravy.' },
  { name: 'Sandwich Dhokla', gujaratiName: 'સેન્ડવીચ ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Layered dhokla with chutney filling.' },
  { name: 'Vatidal Khaman', gujaratiName: 'વાટીદાળ ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Traditional khaman made from soaked and ground lentils.' },
  { name: 'Nylon Khaman', gujaratiName: 'નાયલોન ખમણ', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Extra soft and spongy gram flour cakes.' },
  { name: 'Pizza Dhokla', gujaratiName: 'પીઝા ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Fusion dhokla with pizza toppings and flavors.' },
  { name: 'Surti Locho', gujaratiName: 'સુરતી લોચો', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Famous Surat street food made from steamed lentils.' },
  { name: 'Lasaniya Dhokla', gujaratiName: 'લસણીયા ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Dhokla with a bold garlic flavor.' },
  { name: 'Stuff Khandvi', gujaratiName: 'સ્ટફ ખાંડવી', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Khandvi rolls with a savory stuffing.' },
  { name: 'Green Dhokla', gujaratiName: 'ગ્રીન ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Dhokla made with green lentils or spinach.' },
  { name: 'Corn Dhokla', gujaratiName: 'કોર્ન ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Steamed dhokla with sweet corn.' },
  { name: 'Khamani Dhokla', gujaratiName: 'ખમણી ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Crumbled khaman served as a savory snack.' },
  { name: 'Paneer Dhokla', gujaratiName: 'પનીર ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Dhokla enriched with paneer pieces.' },
  { name: 'Khichu', gujaratiName: 'ખીચું', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Traditional dough-like snack made from rice flour.' },
  { name: 'Dudhi Palak Dhokla', gujaratiName: 'દૂધી પાલક ઢોકળા', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Healthy dhokla with bottle gourd and spinach.' },
  { name: 'Muthiya (Dudhi / Methi)', gujaratiName: 'મુઠીયા (દૂધી / મેથી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Steamed dumplings made from bottle gourd or fenugreek.' },
  { name: 'Handvo (Hariyali / Soya / Corn)', gujaratiName: 'હાંડવો (હરીયાળી / સોયા / કોર્ન)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted varieties of savory lentil cakes.' },
  { name: 'Patra (Kela / Chola ni Dal / Surti)', gujaratiName: 'પાત્રા (કેળા / ચોળાની દાળ / સુરતી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted colocasia leaf rolls with various fillings.' },
  { name: 'Khichu (Pauva / Rice / Bajri)', gujaratiName: 'ખીચું (પૌવા / રાઈસ / બાજરી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted varieties of traditional khichu.' },
  { name: 'Idada (Sandwich / Surti)', gujaratiName: 'ઇદડાં (સેન્ડવીચ / સુરતી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Steamed white lentil cakes, plain or layered.' },
  { name: 'Dhokla (Corn / Palak / Moong Dal / Dabeli)', gujaratiName: 'ઢોકળા (કોર્ન / પાલક / મુંગ દાળ / દાબેલી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted varieties of steamed dhokla.' },
  { name: 'Bhakharwadi (Lilva / Tuver / Makai)', gujaratiName: 'ભાખરવડી (લીલવા / તુવેર / મકાઈ)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted crispy fried rolls with savory fillings.' },
  { name: 'Khaman (Sandwich / Nylon / Surti)', gujaratiName: 'ખમણ (સેન્ડવીચ / નાયલોન / સુરતી)', category: 'Garvi Gujarat Counter', subCategory: 'Gujarat Se...', description: 'Assorted varieties of soft gram flour cakes.' },

  // Main Course - Gujarati Vegetable
  { name: 'Lila Chana Tameta Muthiya', gujaratiName: 'લીલા ચણા ટામેટા મુઠીયા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Green chickpeas with tomato and dumplings.' },
  { name: 'Green Hariyali Gravy', gujaratiName: 'ગ્રીન હરીયાળી ગ્રેવી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Fresh green vegetable gravy.' },
  { name: 'Spe. M. K. Green Goramor Dry', gujaratiName: 'સ્પે. એમ. કે. ગ્રીન ગોરામોર ડ્રાય', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Special green goramor dry preparation.' },
  { name: 'Dana Muthiya Patra Khandvi', gujaratiName: 'દાણા મુઠીયા પાત્રા ખાંડવી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Assorted Gujarati snacks in a main course style.' },
  { name: 'Mini Undhiyu Tawa', gujaratiName: 'મીની ઊંધીયુ તવા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Mini version of the classic mixed vegetable dish.' },
  { name: 'Desi Undhiyu Tawa', gujaratiName: 'દેશી ઊંધીયુ તવા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Traditional rustic mixed vegetable preparation.' },
  { name: 'Surti Undhiyu', gujaratiName: 'સુરતી ઊંધિયું', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Authentic Surat style mixed vegetable delicacy.' },
  { name: 'Green Cauliflower', gujaratiName: 'ગ્રીન ફુલાવર', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Cauliflower cooked with green herbs and spices.' },
  { name: 'Green Bataki', gujaratiName: 'ગ્રીન બટાકી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Baby potatoes in a green masala.' },
  { name: 'Turiya Patra Vatana', gujaratiName: 'તુરીયા પાત્રા વટાણા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Ridge gourd with colocasia rolls and peas.' },
  { name: 'Beans with Muthiya', gujaratiName: 'બીન્સ વીથ મુઠીયા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Green beans cooked with savory dumplings.' },
  { name: 'Kathol Undhiyu', gujaratiName: 'કઠોળ ઊંધીયુ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Mixed pulses and vegetables preparation.' },
  { name: 'Batakanu Mix', gujaratiName: 'બટાકાનું મીક્સ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Mixed potato preparation.' },
  { name: 'Kakadi Vatana', gujaratiName: 'કાકડી વટાણા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Cucumber and peas curry.' },
  { name: 'Kela Kone Capsicum', gujaratiName: 'કેળા કોને કેપ્સીકમ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Banana and capsicum specialty.' },
  { name: 'Lila Vatana Shak', gujaratiName: 'લીલા વટાણા શાક', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Fresh green peas curry.' },
  { name: 'Kakadi Parvar Muthiya', gujaratiName: 'કાકડી પરવર મુઠીયા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Cucumber, pointed gourd, and dumplings.' },
  { name: 'Gilodi with Dhokli', gujaratiName: 'ગીલોડી વીથ ઢોકળી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Ivy gourd with wheat flour dumplings.' },
  { name: 'Dahi Bhindi', gujaratiName: 'દહીં ભીંડી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Okra in a spiced yogurt gravy.' },
  { name: 'Crispy Bhinda with Potato', gujaratiName: 'ક્રિસ્પી ભીંડા વીથ પોટેટો', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Crispy fried okra with potatoes.' },
  { name: 'Stuff Parvar', gujaratiName: 'સ્ટફ પરવર', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Stuffed pointed gourd.' },
  { name: 'Vatana Makai Fansi Capsicum', gujaratiName: 'વટાણા મકાઈ ફણસી કેપ્સીકમ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Peas, corn, beans, and capsicum mix.' },
  { name: 'Vatana Makai Patra', gujaratiName: 'વટાણા મકાઈ પાત્રા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Peas and corn with colocasia rolls.' },
  { name: 'Bhindi Do Pyaza', gujaratiName: 'ભીંડી દો પ્યાઝ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Okra cooked with plenty of onions.' },
  { name: 'Karela Masaledar', gujaratiName: 'કારેલા મસાલેદાર', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Spicy bitter gourd preparation.' },
  { name: 'Chatpata Chana', gujaratiName: 'ચટપટા ચણા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Tangy and spicy chickpeas.' },
  { name: 'Rajasthani Bataki', gujaratiName: 'રાજસ્થાની બટાકી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Spicy Rajasthani style potatoes.' },
  { name: 'Green Sukhibhaji', gujaratiName: 'ગ્રીન સુકીભાજી', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Dry potato dish with green herbs.' },
  { name: 'Vogaton Mix', gujaratiName: 'વોગટોન મીક્સ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Mixed vegetable specialty.' },
  { name: 'Live Bhindi Masala', gujaratiName: 'લાઈવ ભીંડી મસાલા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Freshly prepared spiced okra.' },
  { name: 'Lila Chana with Dryfruit', gujaratiName: 'લીલા ચણા વીથ ડ્રાયફ્રૂટ', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Green chickpeas with nuts.' },
  { name: 'American Green', gujaratiName: 'અમેરીકન ગ્રીન', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'American style green vegetable mix.' },
  { name: 'Green Tawa Masala', gujaratiName: 'ગ્રીન તવા મસાલા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Vegetables cooked on tawa with green masala.' },
  { name: 'Kaju Karela', gujaratiName: 'કાજુ કારેલા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Bitter gourd with cashews.' },
  { name: 'Bhindi Masala', gujaratiName: 'ભીંડી મસાલા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Spiced okra curry.' },
  { name: 'Panchratna Karela', gujaratiName: 'પંચરત્ન કારેલા', category: 'Main Course', subCategory: 'Gujarati Vegetable', description: 'Bitter gourd with five types of spices/ingredients.' },

  // Main Course - Punjabi Vegetable
  { name: 'Paneer Afghani', gujaratiName: 'પનીર અફઘાની', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Rich and creamy paneer in Afghani style.' },
  { name: 'Paneer Lababdar', gujaratiName: 'પનીર લબાબદાર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a luscious tomato and cream gravy.' },
  { name: 'Paneer Bombay Masala', gujaratiName: 'પનીર બોમ્બે મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Spicy paneer preparation Bombay style.' },
  { name: 'Paneer Amritsari', gujaratiName: 'પનીર અમૃતસરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer cooked with Amritsari spices.' },
  { name: 'Paneer Toofani', gujaratiName: 'પનીર તુફાની', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Extra spicy and flavorful paneer curry.' },
  { name: 'Badam Rogan Paneer', gujaratiName: 'બદામ રોગન પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a rich almond and spice gravy.' },
  { name: 'Kaju Paneer', gujaratiName: 'કાજુ પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer and cashews in a creamy gravy.' },
  { name: 'Paneer Corn Capsicum', gujaratiName: 'પનીર કોર્ન કેપ્સીકમ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer with sweet corn and bell peppers.' },
  { name: 'Shahi Paneer', gujaratiName: 'શાહી પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Royal paneer preparation in a white/yellow gravy.' },
  { name: 'Tawa Paneer', gujaratiName: 'તવા પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer cooked on a flat griddle with spices.' },
  { name: 'Cheese Butter Masala', gujaratiName: 'ચીઝ બટર મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Creamy gravy with cheese cubes.' },
  { name: 'Cheese Paneer Masala', gujaratiName: 'ચીઝ પનીર મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'A combination of cheese and paneer in a spicy gravy.' },
  { name: 'Cheese Kofta', gujaratiName: 'ચીઝ કોફતા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Cheese dumplings in a rich gravy.' },
  { name: 'Malai Kofta', gujaratiName: 'મલાઈ કોફતા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Soft dumplings in a creamy white gravy.' },
  { name: 'Kaju Koya', gujaratiName: 'કાજુ કોયા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Cashews and khoya in a sweet and savory gravy.' },
  { name: 'Lychee Almond', gujaratiName: 'લીચી આલમંડ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Exotic combination of lychee and almonds in gravy.' },
  { name: 'Veg. Handi', gujaratiName: 'વેજ. હાંડી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Mixed vegetables cooked in a traditional handi.' },
  { name: 'Babycorn Capsicum Masala', gujaratiName: 'બેબીકોર્ન કેપ્સીકમ મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Tender babycorn and capsicum in a spiced gravy.' },
  { name: 'Paneer Makhanwala', gujaratiName: 'પનીર મખ્ખનવાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a buttery tomato gravy.' },
  { name: 'Italian Veg. Mix', gujaratiName: 'ઇટાલીયન વેજ. મીક્ષ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Mixed vegetables with an Italian twist.' },
  { name: 'Veg. Tawa Masala', gujaratiName: 'વેજ. તવા મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Mixed vegetables cooked on a tawa.' },
  { name: 'Paneer Bhurji', gujaratiName: 'પનીર ભુરજી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Scrambled paneer with spices.' },
  { name: 'Palak Paneer', gujaratiName: 'પાલક પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a smooth spinach gravy.' },
  { name: 'Palak Corn Curry', gujaratiName: 'પાલક કોર્ન કરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Spinach and sweet corn curry.' },
  { name: 'Palak Corn Cheese', gujaratiName: 'પાલક કોર્ન ચીઝ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Spinach, corn, and cheese combination.' },
  { name: 'Kaju Curry', gujaratiName: 'કાજુ કરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Rich cashew nut curry.' },
  { name: 'Kaju Masala', gujaratiName: 'કાજુ મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Spiced cashew nut preparation.' },
  { name: 'Paneer in White Gravy', gujaratiName: 'પનીર ઇન વ્હાઇટ ગ્રેવી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a creamy white sauce.' },
  { name: 'Tawa Mehfil', gujaratiName: 'તવા મહેફીલ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Assorted vegetables cooked together on a tawa.' },
  { name: 'Methi Malai Mutter', gujaratiName: 'મેથી મલાઈ મટર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Fenugreek, cream, and peas in a mild gravy.' },
  { name: 'Mix Veg. with Paneer', gujaratiName: 'મીક્ષ વેજ. વીથ પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Mixed vegetables with paneer cubes.' },
  { name: 'Navratan Korma', gujaratiName: 'નવરત્ન કોર્મા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Nine gems vegetable curry in a creamy sauce.' },
  { name: 'Veg. Jaipuri', gujaratiName: 'વેજ.જયપુરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Mixed vegetables in a spicy Jaipuri style.' },
  { name: 'Veg. Kolhapuri', gujaratiName: 'વેજ. કોલ્હાપુરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Very spicy mixed vegetable curry.' },
  { name: 'Paneer Beans Masala', gujaratiName: 'પનીર બીન્સ મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer and green beans in a spiced gravy.' },
  { name: 'Veg. Agrain', gujaratiName: 'વેજ. અગ્રેઇન', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Vegetable Agrain specialty.' },
  { name: 'Baked Macaroni with Soya', gujaratiName: 'બેક મેકોની વીથ સોયા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Baked macaroni with soya chunks.' },
  { name: 'Mix Veg. Jaipuri with Paneer', gujaratiName: 'મીક્ષ વેજ. જયપુરી વીથ પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Jaipuri style mixed vegetables with paneer.' },
  { name: 'Kaju Paneer Corn Capsicum', gujaratiName: 'કાજુ પનીર કોર્ન કેપ્સીકમ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Cashews, paneer, corn, and capsicum mix.' },
  { name: 'Paneer Pasanda', gujaratiName: 'પનીર પસાંદા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Stuffed paneer slices in a rich gravy.' },
  { name: 'Makhan Arabi Masala', gujaratiName: 'મખની અરબી મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Colocasia in a buttery masala.' },
  { name: 'Mix Veg. Jahangiri', gujaratiName: 'મીક્ષ વેજ. જહાંગીરી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Royal mixed vegetable preparation.' },
  { name: 'Lychee Paneer', gujaratiName: 'લીચી પનીર', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer with lychee in a creamy gravy.' },
  { name: 'Paneer Almond Broccoli', gujaratiName: 'પનીર આલમંડ બ્રોકોલી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Healthy mix of paneer, almonds, and broccoli.' },
  { name: 'Mutter Maharani', gujaratiName: 'મટર મહારાણી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Royal peas preparation.' },
  { name: 'Paneer Rogan Josh', gujaratiName: 'પનીર રોગન જોશ', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Paneer in a spicy Rogan Josh style gravy.' },
  { name: 'Smoke Paneer in Red Gravy', gujaratiName: 'સ્મોક પનીર ઇન રેડ ગ્રેવી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Smoked paneer in a vibrant red gravy.' },
  { name: 'Nizami Handi', gujaratiName: 'નીઝામી હાંડી', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Hyderabadi style mixed vegetable curry.' },
  { name: 'Corn Capsicum Masala', gujaratiName: 'કોર્ન કેપ્સીકમ મસાલા', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Sweet corn and bell peppers in a spiced gravy.' },
  { name: 'Kofta (Malai/Lasaniya)', gujaratiName: 'કોફતા (મલાઈ/લસણ)', category: 'Main Course', subCategory: 'Punjabi Vegetable', description: 'Assorted kofta preparations.' },

  // Main Course - Pulav
  { name: 'Vegetable Pulav/Biryani', gujaratiName: 'વેજીટેબલ (પુલાવ/બિરયાની)', category: 'Main Course', subCategory: 'Pulav', description: 'Classic basmati rice with mixed vegetables.' },
  { name: 'Matar Pulav', gujaratiName: 'મટર પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Basmati rice cooked with fresh green peas.' },
  { name: 'Tawa Pulav', gujaratiName: 'તવા પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Street-style spicy rice prepared on a flat griddle.' },
  { name: 'Kashmiri Pulav', gujaratiName: 'કાશ્મીરી પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Sweet and aromatic rice with dry fruits and saffron.' },
  { name: 'Masala Pulav', gujaratiName: 'મસાલા પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Spiced vegetable rice preparation.' },
  { name: 'Green Peas Pulav', gujaratiName: 'ગ્રીન પીસ પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Rice cooked with tender green peas.' },
  { name: 'Rajasthani Pulav', gujaratiName: 'રાજસ્થાની પુલાવ', category: 'Main Course', subCategory: 'Pulav', description: 'Spicy and flavorful Rajasthani style rice.' },
  { name: 'Dum Biryani', gujaratiName: 'દમ બિરયાની', category: 'Main Course', subCategory: 'Pulav', description: 'Slow-cooked aromatic vegetable biryani.' },
  { name: 'Paneer Biryani', gujaratiName: 'પનીર બિરયાની', category: 'Main Course', subCategory: 'Pulav', description: 'Fragrant rice cooked with spiced paneer cubes.' },
  { name: 'Handi Biryani', gujaratiName: 'હાંડી બિરયાની', category: 'Main Course', subCategory: 'Pulav', description: 'Biryani cooked in a traditional clay pot.' },
  { name: 'Hyderabadi Biryani', gujaratiName: 'હૈદરાબાદી બિરયાની', category: 'Main Course', subCategory: 'Pulav', description: 'Spicy and authentic Hyderabadi style biryani.' },
  { name: 'Hariyali Biryani', gujaratiName: 'હરિયાળી બિરયાની', category: 'Main Course', subCategory: 'Pulav', description: 'Biryani flavored with fresh green herbs.' },

  // Main Course - Rice
  { name: 'Dryfruit Bhat', gujaratiName: 'ડ્રાયફ્રૂટ ભાત', category: 'Main Course', subCategory: 'Rice', description: 'Rich rice preparation with assorted dry fruits.' },
  { name: 'Fry Rice', gujaratiName: 'ફ્રાય રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Stir-fried rice with vegetables and spices.' },
  { name: 'Jeera Rice', gujaratiName: 'જીરા રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Basmati rice tempered with cumin seeds.' },
  { name: 'Taj-Laving Rice', gujaratiName: 'તજ-લવીંગ રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Rice flavored with cinnamon and cloves.' },
  { name: 'Lemon Rice', gujaratiName: 'લેમન રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Tangy rice flavored with lemon and curry leaves.' },
  { name: 'Plain Rice', gujaratiName: 'પ્લેન રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Steamed plain basmati rice.' },
  { name: 'Bamboo Rice', gujaratiName: 'બામ્બુ રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Unique rice variety with a distinct flavor.' },
  { name: 'Tirangi Rice', gujaratiName: 'ત્રીરંગી રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Three-colored layered rice dish.' },
  { name: 'Vegetable Korma Rice', gujaratiName: 'વેજીટેબલ કોરમા રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Rice served with rich vegetable korma.' },
  { name: 'Green Rice', gujaratiName: 'ગ્રીન રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Rice cooked with green leafy vegetables and herbs.' },
  { name: 'Brown Rice', gujaratiName: 'બ્રાઉન રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Healthy whole grain brown rice.' },
  { name: 'Mexican Rice', gujaratiName: 'મેક્સીકન રાઈસ', category: 'Main Course', subCategory: 'Rice', description: 'Spicy rice with tomatoes, corn, and beans.' },
  { name: 'Rajwadi Khichdi', gujaratiName: 'રજવાડી ખીચડી', category: 'Main Course', subCategory: 'Rice', description: 'Rich and buttery traditional khichdi.' },
  { name: 'Veg. Khichdi', gujaratiName: 'વેજ. ખીચડી', category: 'Main Course', subCategory: 'Rice', description: 'Comforting rice and lentil mix with vegetables.' },
  { name: 'Palak Khichdi', gujaratiName: 'પાલક ખીચડી', category: 'Main Course', subCategory: 'Rice', description: 'Healthy khichdi made with spinach puree.' },
  { name: 'Mahakali Spe. Khichdi', gujaratiName: 'મહાકાળી સ્પે. ખીચડી', category: 'Main Course', subCategory: 'Rice', description: 'Special spicy khichdi preparation.' },
  { name: 'Mexican Khichdi', gujaratiName: 'મેક્સીકન ખીચડી', category: 'Main Course', subCategory: 'Rice', description: 'Fusion khichdi with Mexican flavors.' },

  // Main Course - Dal
  { name: 'Gujarati Dal', gujaratiName: 'ગુજરાતી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Sweet and tangy traditional Gujarati lentil soup.' },
  { name: 'Dal Fry', gujaratiName: 'દાળ ફ્રાય', category: 'Main Course', subCategory: 'Dal', description: 'Yellow lentils tempered with onions, tomatoes, and spices.' },
  { name: 'Dal Tadka', gujaratiName: 'દાળ તડકા', category: 'Main Course', subCategory: 'Dal', description: 'Yellow lentils with a smoky cumin and garlic tempering.' },
  { name: 'Amritsari Dal', gujaratiName: 'અમૃતસરી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Thick and creamy black lentils Amritsari style.' },
  { name: 'Lakhnavi Dal', gujaratiName: 'લખનવી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Rich and aromatic lentils from Lucknow.' },
  { name: 'Dal Makhani', gujaratiName: 'દાળ મખની', category: 'Main Course', subCategory: 'Dal', description: 'Slow-cooked black lentils with cream and butter.' },
  { name: 'Panchkuti Dal', gujaratiName: 'પંચકુટી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'A blend of five different lentils cooked together.' },
  { name: 'Rajasthani Dal', gujaratiName: 'રાજસ્થાની દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Spicy and thick Rajasthani style lentils.' },
  { name: 'Panchratna Dal', gujaratiName: 'પંચરત્ન દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Five-gem lentil preparation.' },
  { name: 'Adad ni Dal', gujaratiName: 'અડદની દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Split black gram lentils cooked with spices.' },
  { name: 'Surti Dal', gujaratiName: 'સુરતી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Authentic Surat style sweet and sour dal.' },
  { name: 'Mogar ni Dal Chhuti', gujaratiName: 'મોગરની દાળ છુટ્ટી', category: 'Main Course', subCategory: 'Dal', description: 'Dry yellow moong dal preparation.' },
  { name: 'Chana Dal (Punjabi)', gujaratiName: 'ચણા દાળ (પંજાબી)', category: 'Main Course', subCategory: 'Dal', description: 'Spiced split chickpeas Punjabi style.' },
  { name: 'Kali Dal', gujaratiName: 'કાળી દાળ', category: 'Main Course', subCategory: 'Dal', description: 'Whole black lentils cooked to perfection.' },
  { name: 'Mexican Curry', gujaratiName: 'મેક્સીકન કરી', category: 'Main Course', subCategory: 'Dal', description: 'Fusion curry with Mexican spices and beans.' },

  // Main Course - Kadhi
  { name: 'Gujarati Kadhi', gujaratiName: 'ગુજરાતી કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Sweet and spicy yogurt-based curry.' },
  { name: 'Rajasthani Kadhi', gujaratiName: 'રાજસ્થાની કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Spicy and tangy yogurt curry from Rajasthan.' },
  { name: 'Boondi Kadhi', gujaratiName: 'બૂંદી કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Yogurt curry with crispy gram flour droplets.' },
  { name: 'Dapka Kadhi', gujaratiName: 'ડપકા કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Kadhi with steamed gram flour dumplings.' },
  { name: 'Cream Kadhi', gujaratiName: 'ક્રીમ કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Rich and creamy yogurt-based curry.' },
  { name: 'Bhindi Kadhi', gujaratiName: 'ભીંડા કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Yogurt curry with fried okra.' },
  { name: 'Punjabi Kadhi', gujaratiName: 'પંજાબી કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Thick yogurt curry with onion pakoras.' },
  { name: 'Kathiyawadi Kadhi', gujaratiName: 'કાઠીયાવાડી કઢી', category: 'Main Course', subCategory: 'Kadhi', description: 'Spicy and rustic yogurt curry from Kathiyawad.' },

  // Main Course - Papad
  { name: 'Roasted Papad', gujaratiName: 'રોસ્ટેડ પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Crispy roasted lentil crackers.' },
  { name: 'Fry Papad', gujaratiName: 'ફ્રાય પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Deep-fried crispy lentil crackers.' },
  { name: 'Chokha Papad', gujaratiName: 'ચોખા પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Crispy rice flour crackers.' },
  { name: 'Mix Papad', gujaratiName: 'મીક્ષ પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Assorted variety of papads.' },
  { name: 'Masala Papad', gujaratiName: 'મસાલા પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Roasted papad topped with spiced onions and tomatoes.' },
  { name: 'Marwadi Papad', gujaratiName: 'મારવાડી પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Authentic Marwadi style spicy papad.' },
  { name: 'Nana Chokha na Papad', gujaratiName: 'નાના ચોખાના પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Small crispy rice crackers.' },
  { name: 'Nana Adad na Papad', gujaratiName: 'નાના અડદના પાપડ', category: 'Main Course', subCategory: 'Papad', description: 'Small crispy lentil crackers.' },
  { name: 'Fryums', gujaratiName: 'ફ્રાયમ્સ', category: 'Main Course', subCategory: 'Papad', description: 'Colorful and crispy fried snacks.' },

  // Roti / Bread
  // Roti / Bread - Roti
  { name: 'Phulka Roti', gujaratiName: 'ફુલકા રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Soft and thin whole wheat flatbread.' },
  { name: 'Tandoori Roti', gujaratiName: 'તંદૂરી રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Whole wheat bread cooked in a clay oven.' },
  { name: 'Makai Roti', gujaratiName: 'મકાઈ રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Traditional corn flour flatbread.' },
  { name: 'Missi Roti', gujaratiName: 'મીસી રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Spiced gram flour and wheat flatbread.' },
  { name: 'Rumali Roti', gujaratiName: 'રૂમાલી રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Paper-thin soft flatbread.' },
  { name: 'Pudina Roti', gujaratiName: 'ફુદીના રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Whole wheat bread flavored with fresh mint.' },
  { name: 'Methi na Thepla', gujaratiName: 'મેથીના થેપલા', category: 'Roti / Bread', subCategory: 'Roti', description: 'Spiced flatbread with fresh fenugreek leaves.' },
  { name: 'Bajri na Rotla', gujaratiName: 'બાજરીના રોટલા', category: 'Roti / Bread', subCategory: 'Roti', description: 'Traditional pearl millet flatbread.' },
  { name: 'Coin Biscuit Bhakri', gujaratiName: 'કોઈન બીસ્કીટ ભાખરી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Small, crispy and thick wheat crackers.' },
  { name: 'Reshmi Roti', gujaratiName: 'રેશમી રોટી', category: 'Roti / Bread', subCategory: 'Roti', description: 'Silky soft tandoori flatbread.' },

  // Roti / Bread - Paratha
  { name: 'Paratha (Plain/Paneer/Veg)', gujaratiName: 'પરાઠા (પ્લેન/પનીર/વેજીટેબલ)', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Assorted stuffed or plain layered flatbreads.' },
  { name: 'Lachha Paratha', gujaratiName: 'લચ્છા પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Multi-layered crispy whole wheat flatbread.' },
  { name: 'Aloo Paratha', gujaratiName: 'આલુ પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Flatbread stuffed with spiced mashed potatoes.' },
  { name: 'Cheese Paneer Matar Paratha', gujaratiName: 'ચીઝ પનીર મટર પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Rich flatbread stuffed with cheese, paneer, and peas.' },
  { name: 'Veg. Paratha', gujaratiName: 'વેજી. પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Flatbread stuffed with mixed seasonal vegetables.' },
  { name: 'Palak Paratha', gujaratiName: 'પાલક પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Healthy flatbread made with spinach puree.' },
  { name: 'Achari Paratha', gujaratiName: 'આચારી પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Flatbread flavored with tangy Indian pickle spices.' },
  { name: 'Aloo Gobi Paratha', gujaratiName: 'આલુ ગોબી પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Flatbread stuffed with spiced potatoes and cauliflower.' },
  { name: 'Matar Paneer Paratha', gujaratiName: 'મટર પનીર પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Flatbread stuffed with green peas and paneer.' },
  { name: 'Mirchi Paratha', gujaratiName: 'મિર્ચી પરાઠા', category: 'Roti / Bread', subCategory: 'Paratha', description: 'Spicy flatbread flavored with green chilies.' },

  // Roti / Bread - Puri
  { name: 'Plain Puri', gujaratiName: 'પ્લેન પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Deep-fried puffed whole wheat bread.' },
  { name: 'Palak Puri', gujaratiName: 'પાલક પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Deep-fried puffed bread with spinach.' },
  { name: 'Loya Puri', gujaratiName: 'લોયા પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Traditional soft puffed bread.' },
  { name: 'Masala Puri', gujaratiName: 'મસાલા પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Deep-fried puffed bread with spices.' },
  { name: 'Pudina Puri', gujaratiName: 'ફુદીના પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Deep-fried puffed bread with mint flavor.' },
  { name: 'Tomato Puri', gujaratiName: 'ટોમેટો પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Deep-fried puffed bread with tomato flavor.' },
  { name: 'Tirangi Puri', gujaratiName: 'ત્રીરંગી પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Three-colored puffed bread.' },
  { name: 'Bhature Puri', gujaratiName: 'ભટુરે પુરી', category: 'Roti / Bread', subCategory: 'Puri', description: 'Large, fluffy deep-fried leavened bread.' },

  // Roti / Bread - Kulcha
  { name: 'Plain Kulcha', gujaratiName: 'પ્લેન કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Soft leavened tandoori bread.' },
  { name: 'Butter Kulcha', gujaratiName: 'બટર કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Soft leavened bread with a dollop of butter.' },
  { name: 'Masala Kulcha', gujaratiName: 'મસાલા કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Kulcha stuffed with spiced vegetable filling.' },
  { name: 'Paneer Kulcha', gujaratiName: 'પનીર કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Kulcha stuffed with spiced paneer.' },
  { name: 'Onion Kulcha', gujaratiName: 'ઓનિયન કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Kulcha stuffed with finely chopped onions.' },
  { name: 'Amritsari Kulcha', gujaratiName: 'અમૃતસરી કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Crispy layered stuffed bread from Amritsar.' },
  { name: 'Pudina Kulcha', gujaratiName: 'ફુદીના કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Soft bread flavored with fresh mint.' },
  { name: 'Shahi Cheese Kulcha', gujaratiName: 'શાહી ચીઝ કુલચા', category: 'Roti / Bread', subCategory: 'Kulcha', description: 'Royal kulcha stuffed with rich cheese.' },

  // Roti / Bread - Naan
  { name: 'Baby Naan', gujaratiName: 'બેબી નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Small sized soft leavened bread.' },
  { name: 'Naan (Plain/Paneer/Cheese/Pudina)', gujaratiName: 'નાન (પ્લેન/પનીર/ચીઝ/ફુદીના)', category: 'Roti / Bread', subCategory: 'Naan', description: 'Assorted varieties of tandoori naan.' },
  { name: 'Garlic Naan', gujaratiName: 'ગાર્લિક નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Naan flavored with garlic and fresh herbs.' },
  { name: 'Butter Naan', gujaratiName: 'બટર નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Soft leavened bread brushed with butter.' },
  { name: 'Hariyali Naan', gujaratiName: 'હરિયાળી નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Naan flavored with green herbs and spinach.' },
  { name: 'Sesame Naan', gujaratiName: 'સીસમ નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Naan topped with toasted sesame seeds.' },
  { name: 'Cheese Garlic Naan', gujaratiName: 'ચીઝ ગાર્લિક નાન', category: 'Roti / Bread', subCategory: 'Naan', description: 'Naan stuffed with cheese and topped with garlic.' },

  // Desserts
  // Desserts - Ice Cream
  { name: 'Ben & Berry', gujaratiName: 'બેન એન્ડ બેરી', category: 'Desserts', subCategory: 'Ice Cream', description: 'Premium Ben & Berry ice cream.' },
  { name: 'Cold Stone', gujaratiName: 'કોલ્ડ સ્ટોન', category: 'Desserts', subCategory: 'Ice Cream', description: 'Cold stone style mixed ice cream.' },
  { name: 'Blue Bell', gujaratiName: 'બ્લુ બેલ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Classic Blue Bell ice cream.' },
  { name: 'Tender Coconut', gujaratiName: 'ટેન્ડર કોકોનટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Refreshing tender coconut flavored ice cream.' },
  { name: 'Kesar Pista', gujaratiName: 'કેસર પિસ્તા', category: 'Desserts', subCategory: 'Ice Cream', description: 'Traditional saffron and pistachio ice cream.' },
  { name: 'Butter Scotch', gujaratiName: 'બટર સ્કોચ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Crunchy butter scotch flavored ice cream.' },
  { name: 'Kaju Gulkand', gujaratiName: 'કાજુ ગુલકંદ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Rich cashew and rose petal preserve ice cream.' },
  { name: 'Belgium Chocolate', gujaratiName: 'બેલ્જિયમ ચોકલેટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Rich and dark Belgian chocolate ice cream.' },
  { name: 'Ferrero Rocher', gujaratiName: 'ફેરેરો રોચર', category: 'Desserts', subCategory: 'Ice Cream', description: 'Hazelnut chocolate Ferrero Rocher flavored ice cream.' },
  { name: 'White Chocolate Blue Berry', gujaratiName: 'વ્હાઇટ ચોકલેટ બ્લુ બેરી', category: 'Desserts', subCategory: 'Ice Cream', description: 'White chocolate ice cream with blueberry swirl.' },
  { name: 'Mango Pulp', gujaratiName: 'મેંગો પલ્પ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Pure mango pulp flavored ice cream.' },
  { name: 'Lemon Ginger', gujaratiName: 'લેમન જીંજર', category: 'Desserts', subCategory: 'Ice Cream', description: 'Zesty lemon and ginger flavored ice cream.' },
  { name: 'French Vanilla', gujaratiName: 'ફ્રેન્ચ વેનીલા', category: 'Desserts', subCategory: 'Ice Cream', description: 'Classic smooth French vanilla ice cream.' },
  { name: 'American Dryfruit', gujaratiName: 'અમેરીકન ડ્રાયફ્રૂટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Ice cream loaded with assorted American dry fruits.' },
  { name: 'Caramel Chocolate', gujaratiName: 'કારમેલ ચોકલેટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Sweet caramel and chocolate mixed ice cream.' },
  { name: 'Chocolate with Brownie', gujaratiName: 'ચોકલેટ વિથ બ્રાઉની', category: 'Desserts', subCategory: 'Ice Cream', description: 'Chocolate ice cream with brownie chunks.' },
  { name: 'Black Forest', gujaratiName: 'બ્લેક ફોરેસ્ટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Black forest cake flavored ice cream.' },
  { name: 'Hand Made Ice Cream', gujaratiName: 'હેન્ડ મેડ આઈસક્રીમ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Traditional hand-churned ice cream.' },
  { name: 'Rolling Stone Ice Cream', gujaratiName: 'રોલીંગ સ્ટોન આઈસક્રીમ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Live rolling stone style ice cream.' },
  { name: 'Mava Malai Kulfi', gujaratiName: 'માવા મલાઈ કુલ્ફી', category: 'Desserts', subCategory: 'Ice Cream', description: 'Rich and creamy traditional mava malai kulfi.' },
  { name: 'Cheese Cake', gujaratiName: 'ચીઝ કેક', category: 'Desserts', subCategory: 'Ice Cream', description: 'Creamy cheesecake flavored ice cream.' },
  { name: 'Coffee Nuts', gujaratiName: 'કોફી નટ્સ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Coffee flavored ice cream with crunchy nuts.' },
  { name: 'Lychee Cake', gujaratiName: 'લીચી કેક', category: 'Desserts', subCategory: 'Ice Cream', description: 'Lychee fruit flavored cake ice cream.' },
  { name: 'Fresh Fruit', gujaratiName: 'ફ્રેશ ફ્રુટ', category: 'Desserts', subCategory: 'Ice Cream', description: 'Ice cream made with fresh seasonal fruits.' },
  { name: 'Alphonso Mango', gujaratiName: 'અલફાન્સો મેંગો', category: 'Desserts', subCategory: 'Ice Cream', description: 'Premium Alphonso mango flavored ice cream.' },
  { name: 'Gulmohar Kulfi', gujaratiName: 'ગુલમોહર કુલ્ફી', category: 'Desserts', subCategory: 'Ice Cream', description: 'Special Gulmohar flavored traditional kulfi.' },

  // Desserts - Pastry
  { name: 'Hazelnut Pastry', gujaratiName: 'હેઝલ નટ્સ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Rich hazelnut flavored pastry.' },
  { name: 'Oreo Pastry', gujaratiName: 'ઓરીઓ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Pastry with Oreo cookie crumbles.' },
  { name: 'Marble Pastry', gujaratiName: 'માર્બલ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Swirled chocolate and vanilla marble pastry.' },
  { name: 'Dark and White', gujaratiName: 'ડાર્ક એન્ડ વ્હાઇટ', category: 'Desserts', subCategory: 'Pastry', description: 'Dark and white chocolate layered pastry.' },
  { name: 'Ferrero Rocher Pastry', gujaratiName: 'ફેરેરો રોચર પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Ferrero Rocher hazelnut chocolate pastry.' },
  { name: 'Mint Chocolate Pastry', gujaratiName: 'મીન્ટ ચોકલેટ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Refreshing mint and chocolate flavored pastry.' },
  { name: 'Opera Pastry', gujaratiName: 'ઓપેરા પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Classic French layered coffee and chocolate pastry.' },
  { name: 'Pineapple Pastry', gujaratiName: 'પાઈનેપલ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Light and fruity pineapple flavored pastry.' },
  { name: 'Swiss Truffle Pastry', gujaratiName: 'સ્વિસ ટ્રફલ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Rich Swiss chocolate truffle pastry.' },
  { name: 'Zebra Tart Pastry', gujaratiName: 'ઝેબ્રા ટાર્ટ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Striking zebra patterned tart pastry.' },
  { name: 'Red Velvet Pastry', gujaratiName: 'રેડ વેલ્વેટ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Classic red velvet pastry with cream cheese frosting.' },
  { name: 'Chocolate Truffle Pastry', gujaratiName: 'ચોકલેટ ટ્રફલ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Decadent chocolate truffle pastry.' },
  { name: 'Chocolate Cup', gujaratiName: 'ચોકલેટ કપ', category: 'Desserts', subCategory: 'Pastry', description: 'Small chocolate cups filled with mousse or cream.' },
  { name: 'Truffle', gujaratiName: 'ટ્રફલ', category: 'Desserts', subCategory: 'Pastry', description: 'Rich chocolate truffle bite.' },
  { name: 'Orange Tart', gujaratiName: 'ઓરેન્જ ટાર્ટ', category: 'Desserts', subCategory: 'Pastry', description: 'Zesty orange flavored tart.' },
  { name: 'Fruit Tart', gujaratiName: 'ફ્રુટ ટાર્ટ', category: 'Desserts', subCategory: 'Pastry', description: 'Tart filled with custard and fresh fruits.' },
  { name: 'Moussi', gujaratiName: 'માઉસી', category: 'Desserts', subCategory: 'Pastry', description: 'Light and airy chocolate mousse pastry.' },
  { name: 'Mix Fruit Pastry', gujaratiName: 'મીક્સ ફ્રુટ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Pastry loaded with assorted fresh fruits.' },
  { name: 'Tiramisu', gujaratiName: 'ટીઝામીશુ', category: 'Desserts', subCategory: 'Pastry', description: 'Classic Italian coffee-flavored dessert.' },
  { name: 'Cheese Cake Pastry', gujaratiName: 'ચીઝ કેક પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Creamy and rich cheesecake pastry.' },
  { name: 'Black Forest Pastry', gujaratiName: 'બ્લેક ફોરેસ્ટ પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Classic black forest pastry with cherries and cream.' },
  { name: 'Lemon Cake Pastry', gujaratiName: 'લેમન કેક પેસ્ટ્રી', category: 'Desserts', subCategory: 'Pastry', description: 'Zesty and light lemon flavored cake pastry.' },
  { name: 'Corn Berry Cake', gujaratiName: 'કોન બેરી કેક', category: 'Desserts', subCategory: 'Pastry', description: 'Unique corn and berry flavored cake.' },
  { name: 'Safal', gujaratiName: 'સફલ', category: 'Desserts', subCategory: 'Pastry', description: 'Special Safal dessert.' },
  { name: 'Ice Dish', gujaratiName: 'આઈસ ડીસ', category: 'Desserts', subCategory: 'Pastry', description: 'Refreshing flavored shaved ice dish.' },

  // Desserts - Pudding
  { name: 'Fresh Orange Pudding', gujaratiName: 'ફ્રેશ ઓરેન્જ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Pudding made with fresh orange juice.' },
  { name: 'Fresh Mango Pudding', gujaratiName: 'ફ્રેશ મેંગો પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Pudding made with fresh mango pulp.' },
  { name: 'Fresh Strawberry Pudding', gujaratiName: 'ફ્રેશ સ્ટ્રોબેરી પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Pudding made with fresh strawberries.' },
  { name: 'Fresh Kiwi Pudding', gujaratiName: 'ફ્રેશ કીવી પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Pudding made with fresh kiwi fruit.' },
  { name: 'Fresh Pineapple Orange Pudding', gujaratiName: 'ફ્રેશ પાઇના ઓરેન્જ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Fusion pudding with pineapple and orange.' },
  { name: 'Fresh Pineapple Strawberry Pudding', gujaratiName: 'ફ્રેશ પાઇના સ્ટ્રોબેરી પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Fusion pudding with pineapple and strawberry.' },
  { name: 'Fresh Coconut Orange Pudding', gujaratiName: 'ફ્રેશ કોકોનટ ઓરેન્જ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Fusion pudding with coconut and orange.' },
  { name: 'Chocolate Walnut Orange Pudding', gujaratiName: 'ચોકલેટ વોલનટ ઓરેન્જ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Rich chocolate pudding with walnuts and orange.' },
  { name: 'Fresh Strawberry Dryfruit Pudding', gujaratiName: 'ફ્રેશ સ્ટ્રોબેરી ડ્રાયફલ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Strawberry pudding with assorted dry fruits.' },
  { name: 'Chocolate Orange Pudding', gujaratiName: 'ચોકલેટ ઓરેન્જ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Classic chocolate and orange flavored pudding.' },
  { name: 'Black Forest Pudding', gujaratiName: 'બ્લેક ફોરેસ્ટ પુડીંગ', category: 'Desserts', subCategory: 'Pudding', description: 'Black forest cake style pudding.' },

  // Desserts - Donut
  { name: 'Raspberry Stream Donut', gujaratiName: 'રાસબરી સ્ટ્રોમ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Donut with raspberry filling and glaze.' },
  { name: 'Coco Lo Co Donut', gujaratiName: 'કોકો લો કો ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Coconut flavored chocolate donut.' },
  { name: 'Full Blue Ice Donut', gujaratiName: 'ફુલ બ્લુ આઈસ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Donut with blue icing and cool flavor.' },
  { name: 'Strawberry Cream Donut', gujaratiName: 'સ્ટ્રોબેરી ડ્રીમ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Donut filled with strawberry cream.' },
  { name: 'The Chocolate Spot Donut', gujaratiName: 'ધ ચોકલેટ સ્પોટ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Rich chocolate glazed donut.' },
  { name: 'Original Spot Donut', gujaratiName: 'ઓરીજનલ સ્પોટ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Classic original glazed donut.' },
  { name: 'Original Glied Donut', gujaratiName: 'ઓરીજનલ ગલીડ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Original style glazed donut.' },
  { name: 'Chocolate Med with Sprinkles Donut', gujaratiName: 'ચોકલેટ મેડ વિથ સ્પ્રીંકલ્સ ડોનટ', category: 'Desserts', subCategory: 'Donut', description: 'Chocolate donut topped with colorful sprinkles.' },

  // Desserts - Coffee Shop
  { name: 'Kesariya Kadhai Milk', gujaratiName: 'કેશરીયા કઢાઈ મિલ્ક', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Traditional saffron flavored hot milk.' },
  { name: 'Hazelnut Cappuccino', gujaratiName: 'હોઝલનટ કેપેચીનો', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Cappuccino with rich hazelnut flavor.' },
  { name: 'Cream Caramel Light', gujaratiName: 'ક્રિમ કેરેમલ લાઈટ', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Light coffee with creamy caramel.' },
  { name: 'Triple Shake', gujaratiName: 'ટ્રિપલ શેક', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Rich and thick triple flavored milkshake.' },
  { name: 'Green Apple Cooler', gujaratiName: 'ગ્રીન એપલ કુલર', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Refreshing green apple flavored drink.' },
  { name: 'Passion Fruit Cooler', gujaratiName: 'પેશન ફુટ કુલર', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Tropical passion fruit flavored drink.' },
  { name: 'Butter Scotch Coffee', gujaratiName: 'બટર સ્કોચ કોફી', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Coffee with butter scotch flavor.' },
  { name: 'Coconut Coffee', gujaratiName: 'કોકોનટ કોફી', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Exotic coconut flavored coffee.' },
  { name: 'Black Berry Coffee', gujaratiName: 'બ્લેક બેરી કોફી', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Unique blackberry flavored coffee.' },
  { name: 'Lime Ginger Coffee', gujaratiName: 'લાઇમ જીંજર કોફી', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Zesty lime and ginger flavored coffee.' },
  { name: 'Swiss Mocha', gujaratiName: 'સ્વીસ મોચા', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Rich Swiss chocolate mocha.' },
  { name: 'Hazelnut Fep', gujaratiName: 'હોઝલનટ ફેપ', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Hazelnut flavored frappe.' },
  { name: 'Ice Tea', gujaratiName: 'આઈસ ટી', category: 'Desserts', subCategory: 'Coffee Shop', description: 'Refreshing chilled iced tea.' },

  // Desserts - Tea Stall
  { name: 'Kashmiri Kahwa', gujaratiName: 'કાશ્મીરી કાવા', category: 'Desserts', subCategory: 'Tea Stall', description: 'Traditional Kashmiri green tea with spices and nuts.' },
  { name: 'Darjeeling Tea', gujaratiName: 'દાજીર્લિંગ ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Premium black tea from Darjeeling.' },
  { name: 'Green Tea', gujaratiName: 'ગ્રીન ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Healthy and refreshing green tea.' },
  { name: 'Fullar Tea', gujaratiName: 'ફુલર ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Traditional clay pot tea.' },
  { name: 'Jasmine Tea', gujaratiName: 'જસમીન ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Fragrant jasmine flavored tea.' },
  { name: 'Herbal Tea', gujaratiName: 'હર્બલ ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Soothing tea made with assorted herbs.' },
  { name: 'Masala Tea', gujaratiName: 'મસાલા ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Traditional Indian spiced milk tea.' },
  { name: 'Ice Tea (Tea Stall)', gujaratiName: 'આઈસ ટી (ટી સ્ટોલ)', category: 'Desserts', subCategory: 'Tea Stall', description: 'Refreshing chilled iced tea from the stall.' },
  { name: 'Elaichi Tea', gujaratiName: 'ઈલાયચી ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Milk tea flavored with cardamom.' },
  { name: 'Ginger Tea', gujaratiName: 'જિંજર ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Milk tea flavored with fresh ginger.' },
  { name: 'Mint Tea', gujaratiName: 'મીન્ટ ટી', category: 'Desserts', subCategory: 'Tea Stall', description: 'Refreshing tea flavored with fresh mint.' },
];

const CATEGORIES = [
  { id: 'All', icon: <LayoutGrid size={18} /> },
  { id: 'Welcome Drinks', icon: <Coffee size={18} /> },
  { id: 'Soup', icon: <Soup size={18} /> },
  { id: 'Starters', icon: <Flame size={18} /> },
  { id: 'Chaat Counter', icon: <Zap size={18} /> },
  { id: 'Live Counters', icon: <CookingPot size={18} /> },
  { id: 'World Cuisine', icon: <Globe size={18} /> },
  { id: 'Traditional Counter', icon: <Map size={18} /> },
  { id: 'Salad', icon: <SaladIcon size={18} /> },
  { id: "Sweet's", icon: <Star size={18} /> },
  { id: "Liquid Sweet's", icon: <Droplets size={18} /> },
  { id: 'Garvi Gujarat Counter', icon: <Utensils size={18} /> },
  { id: 'Main Course', icon: <ChefHat size={18} /> },
  { id: 'Roti / Bread', icon: <Pizza size={18} /> },
  { id: 'Desserts', icon: <IceCream size={18} /> },
];

const MenuSection = React.memo(({ 
  cat, 
  items, 
  categoryRef,
  selectedItems,
  onToggleItem
}: { 
  cat: typeof CATEGORIES[0], 
  items: MenuItem[], 
  categoryRef: (el: HTMLDivElement | null) => void,
  selectedItems: MenuItem[],
  onToggleItem: (item: MenuItem) => void
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={(el) => {
        // @ts-ignore
        sectionRef.current = el;
        categoryRef(el);
      }}
      className="scroll-mt-40 min-h-[200px]"
    >
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-gold/10 border border-gold/20 rounded-full text-gold">
          {cat.icon}
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">{cat.id}</h2>
          <div className="w-16 h-1 bg-gold mt-2"></div>
        </div>
      </div>

      {isVisible ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => {
            const isSelected = selectedItems.some(si => si.name === item.name && si.subCategory === item.subCategory);
            return (
              <div
                key={`${item.name}-${item.subCategory}-${idx}`}
                onClick={() => onToggleItem(item)}
                className={`group border p-6 transition-all relative overflow-hidden cursor-pointer ${
                  isSelected 
                    ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]' 
                    : 'bg-white/5 border-white/10 hover:border-gold/40'
                }`}
              >
                <div className={`absolute inset-0 bg-gold/5 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                
                {isSelected && (
                  <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden z-20">
                    <div className="absolute top-0 right-0 w-full h-full bg-gold transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                    <Check className="absolute top-1 right-1 text-premium-black w-4 h-4 z-30" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`text-lg font-bold transition-colors ${isSelected ? 'text-gold' : 'text-white group-hover:text-gold'}`}>{item.name}</h3>
                      {item.gujaratiName && (
                        <h4 className="text-sm font-medium text-gold/80 mb-1 font-serif">{item.gujaratiName}</h4>
                      )}
                      {item.subCategory && (
                        <span className="text-[10px] text-gold/60 uppercase tracking-widest">{item.subCategory}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-4">
                    {item.description}
                  </p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-gold/10 text-gold border border-gold/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
});

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentSection, setCurrentSection] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
  const lastScrollY = useRef(0);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleItemSelection = (item: MenuItem) => {
    setSelectedItems(prev => {
      const isAlreadySelected = prev.some(si => si.name === item.name && si.subCategory === item.subCategory);
      if (isAlreadySelected) {
        return prev.filter(si => !(si.name === item.name && si.subCategory === item.subCategory));
      } else {
        return [...prev, item];
      }
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(24);
    doc.text('SB CATERERS', 105, 20, { align: 'center' });
    
    // Sort items by category order
    const categoryOrder = CATEGORIES.map(c => c.id);
    const sortedItems = [...selectedItems].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA !== indexB) return indexA - indexB;
      return a.name.localeCompare(b.name);
    });

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('SELECTED MENU ITEMS', 105, 30, { align: 'center' });
    
    // Table Data
    const tableData = sortedItems.map((item, index) => [
      index + 1,
      item.name,
      item.category,
      item.subCategory || '-'
    ]);
    
    autoTable(doc, {
      startY: 50,
      head: [['#', 'Item Name', 'Category', 'Sub-Category']],
      body: tableData,
      headStyles: { fillColor: [212, 175, 55], textColor: [10, 10, 10] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 50 },
    });
    
    // Footer
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text('Contact: +91 8200428348 / 9727403655', 105, 285, { align: 'center' });
    }
    
    return doc.output('datauristring');
  };

  const handleBookNow = () => {
    const pdfData = generatePDF();
    navigate('/booking', { 
      state: { 
        selectedItems: selectedItems,
        pdfData: pdfData
      } 
    });
  };

  useEffect(() => {
    if (location.state?.category) {
      const categoryId = location.state.category;
      // Small delay to ensure refs are populated and layout is ready
      const timer = setTimeout(() => {
        scrollToCategory(categoryId);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowScrollTop(currentScrollY > 500);

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
      
      // Update current section based on scroll position
      const scrollPos = currentScrollY + 200;
      let found = false;
      for (const cat of CATEGORIES) {
        if (cat.id === 'All') continue;
        const element = categoryRefs.current[cat.id];
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setCurrentSection(cat.id);
          found = true;
          break;
        }
      }
      if (!found && currentScrollY < 100) {
        setCurrentSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, searchQuery]);

  const filteredMenu = useMemo(() => {
    return MENU_DATA.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.gujaratiName && item.gujaratiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedMenu = useMemo(() => {
    const groups: { [key: string]: MenuItem[] } = {};
    filteredMenu.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredMenu]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    
    // Small delay to allow layout to update if filtering
    setTimeout(() => {
      if (id === 'All') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = categoryRefs.current[id];
      if (element) {
        const offset = 140; // Height of sticky header + nav
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className="bg-premium-black min-h-screen text-white pt-20">
      {/* Search & Category Nav Header */}
      <div className={`sticky top-20 z-40 bg-premium-black/95 backdrop-blur-lg border-b border-gold/20 pt-6 pb-2 transition-transform duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={20} />
            <input 
              type="text"
              placeholder="Search for your favorite dish..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                // If searching and not in 'All' mode, switch to 'All' to show global results
                if (e.target.value !== '' && activeCategory !== 'All') {
                  setActiveCategory('All');
                }
              }}
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-12 focus:outline-none focus:border-gold transition-all text-white placeholder:text-white/30"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Category Navigation */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-4">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id || (activeCategory === 'All' && currentSection === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                    isActive 
                      ? 'bg-gold text-premium-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                      : 'bg-white/5 text-white/60 border-white/10 hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {cat.icon}
                  {cat.id}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div id="menu-content-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-32">
            <Search size={48} className="text-gold/20 mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold mb-2">No dishes found</h3>
            <p className="text-white/40">Try searching for something else or browse categories.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {CATEGORIES.map((cat) => {
              if (cat.id === 'All') return null;
              
              const items = groupedMenu[cat.id] || [];
              if (items.length === 0) return null;

              // Filter logic: show if All is selected, or if this category is selected
              const shouldShow = activeCategory === 'All' || activeCategory === cat.id;
              if (!shouldShow) return null;

              return (
                <MenuSection 
                  key={cat.id}
                  cat={cat}
                  items={items}
                  categoryRef={el => categoryRefs.current[cat.id] = el}
                  selectedItems={selectedItems}
                  onToggleItem={toggleItemSelection}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Selection Bar */}
      <AnimatePresence>
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-auto md:min-w-[400px] z-50"
          >
            <div className="bg-premium-black border border-gold/50 p-4 md:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center text-gold">
                  <Utensils size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm md:text-base">{selectedItems.length} Items Selected</h4>
                  <button 
                    onClick={() => setSelectedItems([])}
                    className="text-gold/60 text-xs hover:text-gold transition-colors flex items-center gap-1"
                  >
                    <X size={12} /> Clear all
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handleBookNow}
                  className="flex-1 md:flex-none bg-gold text-premium-black px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-gold-light transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Book with Selection
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-24 bg-gold mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-premium-black mb-8">Love our menu? <br /> Let's bring it to your event.</h2>
          <p className="text-premium-black/70 text-lg mb-12 max-w-2xl mx-auto">
            Our chefs are ready to create these culinary delights for your special occasion.
          </p>
          <button 
            onClick={selectedItems.length > 0 ? handleBookNow : undefined}
            className={`inline-block px-12 py-5 font-bold uppercase tracking-widest text-sm transition-all transform hover:scale-105 shadow-2xl ${
              selectedItems.length > 0 
                ? 'bg-premium-black text-white hover:bg-black/90' 
                : 'bg-premium-black text-white hover:bg-black/90'
            }`}
          >
            {selectedItems.length > 0 ? 'Book with Selection' : 'Book Now'}
          </button>
          {selectedItems.length === 0 && (
            <Link 
              to="/booking"
              state={{ source: 'menu', message: "I've reviewed your menu and would like to discuss catering for my event." }}
              className="hidden"
              id="hidden-booking-link"
            ></Link>
          )}
          {selectedItems.length === 0 && (
            <button 
              onClick={() => document.getElementById('hidden-booking-link')?.click()}
              className="inline-block bg-premium-black text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all transform hover:scale-105 shadow-2xl"
            >
              Book Now
            </button>
          )}
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-28 right-8 z-50 bg-gold text-premium-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating CTA (Mobile Only) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden">
        {selectedItems.length === 0 ? (
          <Link 
            to="/booking"
            state={{ source: 'menu-mobile', message: "I've reviewed your menu and would like to discuss catering for my event." }}
            className="bg-gold text-premium-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl flex items-center gap-2"
          >
            Book Now <ChevronRight size={18} />
          </Link>
        ) : (
          <button 
            onClick={handleBookNow}
            className="bg-gold text-premium-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm shadow-2xl flex items-center gap-2"
          >
            Book with Selection <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
