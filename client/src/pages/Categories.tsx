import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Headphones, Laptop, Shirt, Home, Car } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      name: "Smartphones",
      icon: Smartphone,
      description: "Latest mobile phones से लेकर flagship devices तक",
      count: "500+ Products",
      color: "bg-blue-500"
    },
    {
      name: "Audio & Earphones",
      icon: Headphones,
      description: "Best sound quality के लिए premium headphones",
      count: "200+ Products", 
      color: "bg-red-500"
    },
    {
      name: "Laptops & Computers",
      icon: Laptop,
      description: "Work से लेकर gaming तक, सब कुछ यहाँ मिलेगा",
      count: "150+ Products",
      color: "bg-green-500"
    },
    {
      name: "Fashion & Clothing",
      icon: Shirt,
      description: "Trendy clothes और accessories की complete range",
      count: "800+ Products",
      color: "bg-purple-500"
    },
    {
      name: "Home & Living",
      icon: Home,
      description: "घर को बनाएं smart और beautiful",
      count: "300+ Products",
      color: "bg-yellow-500"
    },
    {
      name: "Automotive",
      icon: Car,
      description: "Car accessories और bike parts की variety",
      count: "100+ Products",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Shop by <span className="text-red-600">Categories</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              हर category में best products मिलेंगे यहाँ - Quality guaranteed!
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-red-300">
                  <CardContent className="p-6 lg:p-8 text-center">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 lg:mb-6">
                      {category.description}
                    </p>
                    <p className="text-sm text-red-600 font-semibold mb-4">
                      {category.count}
                    </p>
                    <Button 
                      className="bg-red-600 text-white hover:bg-red-700 w-full"
                      onClick={() => window.location.href = "/shop"}
                    >
                      Browse Category
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}