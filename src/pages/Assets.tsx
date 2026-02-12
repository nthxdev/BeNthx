import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Star, ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import PaymentModal from "@/components/PaymentModal";
import glassmorphismImage from "@/assets/Glassmorphism UI Kit.png";
import iconPackImage from "@/assets/3D Icon Pack - 200 Icons.png";
import buttonCollectionImage from "@/assets/Animated Button Collection.png";
import gradientToolImage from "@/assets/Gradient Generator Tool.png";
import formComponentsImage from "@/assets/React Form Components.png";
import svgPackImage from "@/assets/SVG Illustration Pack.png";
import particleLibraryImage from "@/assets/Particle Effects Library.png";
import dashboardTemplateImage from "@/assets/Dashboard Template Pro.png";
import loadingPackImage from "@/assets/Loading Animations Pack.png";

const Assets = () => {
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<{
    title: string;
    creator: string;
    price: string;
  } | null>(null);

  const assets = [
    {
      title: "Loading Animations Pack",
      type: "Animation",
      price: "Free",
      rating: "4.7",
      downloads: "18k",
      description: "30+ loading animation components",
      image: loadingPackImage,
      creator: "nthxdev",
    },
    {
      title: "Glassmorphism UI Kit",
      type: "UI Kit",
      price: "Free",
      rating: "4.9",
      downloads: "8.2k",
      description: "Modern glassmorphism components for React",
      image: glassmorphismImage,
    },
    {
      title: "3D Icon Pack - 200 Icons",
      type: "Icons",
      price: "$29",
      rating: "4.8",
      downloads: "5.1k",
      description: "High-quality 3D icons in multiple formats",
      image: iconPackImage,
    },
    {
      title: "Animated Button Collection",
      type: "Components",
      price: "Free",
      rating: "4.7",
      downloads: "12k",
      description: "25+ animated button components",
      image: buttonCollectionImage,
    },
    {
      title: "Gradient Generator Tool",
      type: "Tool",
      price: "Free",
      rating: "4.9",
      downloads: "15k",
      description: "Create beautiful CSS gradients easily",
      image: gradientToolImage,
    },
    {
      title: "React Form Components",
      type: "Components",
      price: "$19",
      rating: "4.8",
      downloads: "3.4k",
      description: "Complete form system with validation",
      image: formComponentsImage,
    },
    {
      title: "SVG Illustration Pack",
      type: "Graphics",
      price: "$39",
      rating: "4.9",
      downloads: "6.7k",
      description: "100+ customizable SVG illustrations",
      image: svgPackImage,
    },
    {
      title: "Particle Effects Library",
      type: "Effects",
      price: "Free",
      rating: "4.6",
      downloads: "9.8k",
      description: "Canvas-based particle system",
      image: particleLibraryImage,
    },
    {
      title: "Dashboard Template Pro",
      type: "Template",
      price: "$49",
      rating: "4.9",
      downloads: "2.1k",
      description: "Full admin dashboard with charts",
      image: dashboardTemplateImage,
    },

  ];

  const categories = ["All", "UI Kits", "Components", "Icons", "Templates", "3D Assets", "Tools"];

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      let newSelected = selectedCategories.filter(c => c !== "All");
      if (newSelected.includes(category)) {
        newSelected = newSelected.filter(c => c !== category);
      } else {
        newSelected = [...newSelected, category];
      }
      // If no categories selected, default to "All"
      if (newSelected.length === 0) {
        newSelected = ["All"];
      }
      setSelectedCategories(newSelected);
    }
  };

  const filteredAssets = selectedCategories.includes("All")
    ? assets
    : assets.filter(asset => selectedCategories.includes(asset.type));

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            UI Assets & <span className="bg-gradient-accent bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download premium UI kits, components, icons, and templates to accelerate your development
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className={selectedCategories.includes(category) ? "bg-primary" : ""}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.slice(0, itemsToShow).map((asset, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group"
            >
              {/* Asset Preview */}
              <div className="aspect-video bg-gradient-hero overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={asset.image}
                  alt={asset.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Asset Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {asset.type}
                    </Badge>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {asset.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{asset.price}</div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {asset.description}
                </p>
                {asset.creator && (
                  <p className="text-sm text-muted-foreground mt-1">
                    by <Link to={`/profile/${asset.creator.toLowerCase()}`} className="hover:text-primary transition-colors font-medium">
                      {asset.creator}
                    </Link>
                  </p>
                )}

                {/* Asset Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{asset.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{asset.downloads}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  variant={asset.price === "Free" ? "default" : "outline"}
                  onClick={asset.price !== "Free" ? () => {
                    setSelectedAsset({
                      title: asset.title,
                      creator: asset.creator,
                      price: asset.price
                    });
                    setIsPaymentModalOpen(true);
                  } : undefined}
                >
                  {asset.price === "Free" ? (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download Free
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {itemsToShow < filteredAssets.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setItemsToShow(prev => prev + 3)}
            >
              Load More Assets
            </Button>
          </div>
        )}
      </div>

      {selectedAsset && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedAsset(null);
          }}
          title={selectedAsset.title}
          creator={selectedAsset.creator}
          price={selectedAsset.price}
          type="asset"
        />
      )}
    </div>
  );
};

export default Assets;
