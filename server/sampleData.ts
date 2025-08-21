import { db } from "./db";
import { products, affiliateDeals, users } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingProducts = await db.select().from(products).limit(1);
    if (existingProducts.length > 0) {
      console.log("Database already seeded");
      return;
    }

    // Add sample products
    const sampleProducts = [
      {
        name: "boAt Rockerz 450 Wireless Headphones",
        description: "Premium wireless headphones with boAt signature sound, 15-hour playback और super comfortable fit. Latest technology के साथ crystal clear audio experience.",
        price: "1999",
        imageUrl: "/src/assets/81djvRJI7UL._UY1100__1755750600277.jpg",
        category: "Audio",
        inStock: true,
        featured: true,
        rating: "4.8",
        reviewCount: 2567
      },
      {
        name: "Apple MacBook Pro M3 16-inch",
        description: "Professional laptop with M3 chip, 16GB RAM, 512GB SSD। Perfect for developers, designers और content creators। Amazing performance और stunning display के साथ।",
        price: "189999",
        imageUrl: "/src/assets/mbp16-silver-cto-hero-202410_FMT_WHH_1755750600152.jpeg",
        category: "Laptops",
        inStock: true,
        featured: true,
        rating: "4.9",
        reviewCount: 456
      },
      {
        name: "Premium Cotton Polo T-Shirt",
        description: "Soft cotton polo tee with modern athletic fit। Comfortable fabric और stylish design। Daily wear के लिए perfect choice। Available in multiple colors.",
        price: "599",
        imageUrl: "/src/assets/images_1755750599979.jpeg",
        category: "Fashion",
        inStock: true,
        featured: false,
        rating: "4.7",
        reviewCount: 892
      },
      {
        name: "Urban Travel Backpack Pro",
        description: "Spacious travel backpack with laptop compartment, water-resistant material और ergonomic design। Perfect for college, office या travel। 35L capacity के साथ।",
        price: "1899",
        imageUrl: "/src/assets/images (2)_1755750600018.jpeg",
        category: "Bags",
        inStock: true,
        featured: true,
        rating: "4.6",
        reviewCount: 1234
      },
      {
        name: "Fresh Orange Juice Combo Pack",
        description: "Pure और fresh orange juice pack। 100% natural, no preservatives। Rich in Vitamin C और healthy nutrients। Pack of 6 bottles for family.",
        price: "199",
        imageUrl: "/src/assets/images (3)_1755750600193.jpeg",
        category: "Food & Beverages",
        inStock: true,
        featured: false,
        rating: "4.9",
        reviewCount: 678
      },
      {
        name: "Samsung Galaxy A54 5G Smartphone",
        description: "Latest Samsung smartphone with 50MP triple camera, 6000mAh battery और 5G connectivity। Stylish design के साथ premium features। 8GB RAM + 128GB storage.",
        price: "32999",
        imageUrl: "/src/assets/images (4)_1755750600475.jpeg",
        category: "Mobiles",
        inStock: true,
        featured: true,
        rating: "4.6",
        reviewCount: 1876
      }
    ];

    await db.insert(products).values(sampleProducts);

    // Add sample affiliate deals
    const sampleDeals = [
      {
        title: "Premium Cosmetics Set - 50% Off",
        description: "Complete beauty collection with makeup essentials. High-quality cosmetics for everyday glamour.",
        imageUrl: "/src/assets/images (5)_1755750600516.jpeg",
        category: "Beauty",
        originalPrice: "3999",
        discountPrice: "1999",
        discountPercentage: 50,
        affiliateUrl: "https://example.com/skincare-deal",
        isActive: true
      },
      {
        title: "Smart Home Device - 40% Off",
        description: "Voice-controlled smart speaker with AI assistant. Perfect for smart home control and entertainment.",
        imageUrl: "/src/assets/images (6)_1755750600555.jpeg",
        category: "Electronics",
        originalPrice: "4999",
        discountPrice: "2999",
        discountPercentage: 40,
        affiliateUrl: "https://example.com/echo-dot-deal",
        isActive: true
      },
      {
        title: "Premium Book Collection - 30% Off",
        description: "Curated collection of bestselling books. Perfect for reading enthusiasts and knowledge seekers.",
        imageUrl: "/src/assets/images (7)_1755750600592.jpeg",
        category: "Books",
        originalPrice: "2999",
        discountPrice: "2099",
        discountPercentage: 30,
        affiliateUrl: "https://example.com/books-deal",
        isActive: true
      },
      {
        title: "Fitness Equipment Set - 45% Off",
        description: "Complete fitness accessories bundle perfect for home workouts and staying healthy.",
        imageUrl: "/src/assets/images (8)_1755750600630.jpeg",
        category: "Fitness",
        originalPrice: "3499",
        discountPrice: "1924",
        discountPercentage: 45,
        affiliateUrl: "https://example.com/yoga-deal",
        isActive: true
      },
      {
        title: "Premium Kitchen Appliance - 40% Off",
        description: "High-quality kitchen appliance for modern cooking. Efficient and stylish design for every home.",
        imageUrl: "/src/assets/images (9)_1755750600667.jpeg",
        category: "Kitchen",
        originalPrice: "5999",
        discountPrice: "3599",
        discountPercentage: 40,
        affiliateUrl: "https://example.com/knife-set-deal",
        isActive: true
      }
    ];

    await db.insert(affiliateDeals).values(sampleDeals);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}