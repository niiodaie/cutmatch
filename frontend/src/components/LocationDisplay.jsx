import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Star, Phone, Clock, Navigation, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { detectLocation, getNearbyShops } from '../utils/geolocation';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLocationData = async () => {
      try {
        setLoading(true);
        
        // Detect user location
        const locationResult = await detectLocation();
        if (locationResult.success) {
          setLocation(locationResult.data);
          
          // Get nearby shops based on location
          const shopsResult = await getNearbyShops(
            locationResult.data.latitude,
            locationResult.data.longitude
          );
          
          if (shopsResult.success) {
            setShops(shopsResult.data);
          }
        } else {
          setError(locationResult.error);
        }
      } catch (err) {
        setError('Failed to load location data');
      } finally {
        setLoading(false);
      }
    };

    loadLocationData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <MapPin className="w-8 h-8 mx-auto mb-2" />
          <p>Unable to detect location</p>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Location Header */}
      {location && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">
              Your Location: {location.city}, {location.country}
            </h2>
          </div>
          <p className="text-gray-600">
            Showing nearby hair salons and barbershops in your area
          </p>
        </motion.div>
      )}

      {/* Nearby Shops */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shops.map((shop, index) => (
          <motion.div
            key={shop.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-800 mb-1">
                      {shop.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {shop.address}
                    </div>
                    <div className="flex items-center text-sm text-purple-600 font-medium">
                      <Navigation className="w-4 h-4 mr-1" />
                      {shop.distance}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{shop.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">{shop.reviews} reviews</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Shop Image Placeholder */}
                <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-purple-400 text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-1" />
                    <p className="text-xs">Shop Photo</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {shop.specialties.map((specialty, idx) => (
                      <Badge 
                        key={idx} 
                        variant="secondary" 
                        className="text-xs bg-purple-100 text-purple-700"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {shop.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {shop.hours}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => console.log('View details for', shop.name)}
                  >
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                    onClick={() => console.log('Get directions to', shop.name)}
                  >
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {shops.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
            onClick={() => console.log('Load more shops')}
          >
            Load More Shops
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default LocationDisplay;

