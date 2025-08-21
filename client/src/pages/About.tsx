import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, TrendingUp } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Users,
      title: "50k+ Happy Customers",
      description: "Trusted by thousands of satisfied customers across India"
    },
    {
      icon: Target,
      title: "Quality Focus",
      description: "हमारा मकसद है best quality products affordable prices में देना"
    },
    {
      icon: Award,
      title: "5 Star Rating",
      description: "Excellent customer service और product quality के लिए rated"
    },
    {
      icon: TrendingUp,
      title: "Growing Fast",
      description: "India's fastest growing e-commerce platform बनने की direction में"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-red-900 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-red-400">Digital Aryan 21</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-200 mb-8">
                हमारी शुरुआत एक simple idea से हुई - Best quality products को affordable prices में लोगों तक पहुंचाना। आज हम India के leading e-commerce platforms में से एक हैं।
              </p>
              <Button 
                className="bg-red-600 text-white hover:bg-red-700 px-8 py-3"
                onClick={() => window.location.href = "/shop"}
              >
                Shop Now
              </Button>
            </div>
            <div className="relative">
              <div className="bg-red-600/20 rounded-lg p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-200">
                  Quality products को affordable prices में पहुंचाना और customers को best shopping experience देना। हमारा vision है कि हर Indian को अच्छे products easily available हों।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-red-600">Us?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              हमें choose करने के कई reasons हैं - Quality, affordability, और excellent service
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
                <p className="text-gray-600 mb-4">
                  2021 में जब हमने Digital Aryan 21 शुरू किया, तो हमारा goal था कि quality products को reasonable prices में provide करना। हमने देखा कि market में बहुत सारे overpriced products हैं।
                </p>
                <p className="text-gray-600 mb-4">
                  आज हमारे पास 1000+ products हैं और 50,000+ satisfied customers हैं। हमारी success का secret है - customer satisfaction और quality assurance।
                </p>
                <p className="text-gray-600">
                  हमारी team constantly work करती है better products find करने के लिए और customers को best deals provide करने के लिए।
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">1000+</div>
                  <div className="text-sm">Products</div>
                </div>
                <div className="bg-gray-900 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">50k+</div>
                  <div className="text-sm">Customers</div>
                </div>
                <div className="bg-green-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-sm">Cities</div>
                </div>
                <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-2">4.8/5</div>
                  <div className="text-sm">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                हम सिर्फ authentic और high-quality products ही sell करते हैं। Customer satisfaction हमारी priority है।
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Pricing</h3>
              <p className="text-gray-600">
                हमारा belief है कि good products expensive नहीं होने चाहिए। सबको affordable prices मिलें।
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Care</h3>
              <p className="text-gray-600">
                हमारी team हमेशा ready है help करने के लिए। Any problem हो तो we are here for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}