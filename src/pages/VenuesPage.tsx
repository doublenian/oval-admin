import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Calendar, Users, ExternalLink } from 'lucide-react';
import { getVenues } from '../utils/importVenues';

interface Venue {
  id: string;
  name: string;
  chinese_name?: string;
  category?: string;
  link?: string;
  built_year?: number;
  update_year?: number;
  region?: string;
  country?: string;
  city?: string;
  architect?: string;
  venue_type?: string;
  capacity?: number;
  height?: number;
  construction_cost?: string;
  events_clubs?: string;
  building_size?: string;
  created_at: string;
}

const VenuesPage: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    region: '',
    country: '',
    category: '',
    minCapacity: '',
    maxCapacity: ''
  });

  useEffect(() => {
    fetchVenues();
  }, [filters]);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const filterParams = {
        region: filters.region || undefined,
        country: filters.country || undefined,
        category: filters.category || undefined,
        minCapacity: filters.minCapacity ? parseInt(filters.minCapacity) : undefined,
        maxCapacity: filters.maxCapacity ? parseInt(filters.maxCapacity) : undefined,
      };
      
      const data = await getVenues(filterParams);
      setVenues(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch venues');
    } finally {
      setLoading(false);
    }
  };

  const formatCapacity = (capacity?: number) => {
    if (!capacity) return 'N/A';
    return capacity.toLocaleString();
  };

  const regions = [...new Set(venues.map(v => v.region).filter(Boolean))];
  const countries = [...new Set(venues.map(v => v.country).filter(Boolean))];
  const categories = [...new Set(venues.map(v => v.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading venues...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-2">Error</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">World Venues Database</h1>
          <p className="text-gray-600">Explore arenas and stadiums from around the world</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>Category {category}</option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Min Capacity"
              value={filters.minCapacity}
              onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            
            <input
              type="number"
              placeholder="Max Capacity"
              value={filters.maxCapacity}
              onChange={(e) => setFilters({ ...filters, maxCapacity: e.target.value })}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{venues.length}</div>
                <div className="text-gray-600">Total Venues</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{countries.length}</div>
                <div className="text-gray-600">Countries</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCapacity(Math.max(...venues.filter(v => v.capacity).map(v => v.capacity!)))}
                </div>
                <div className="text-gray-600">Largest Capacity</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{regions.length}</div>
                <div className="text-gray-600">Regions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {venue.name}
                    </h3>
                    {venue.chinese_name && (
                      <p className="text-sm text-gray-600 mb-2">{venue.chinese_name}</p>
                    )}
                  </div>
                  {venue.category && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {venue.category}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  {venue.city && venue.country && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {venue.city}, {venue.country}
                    </div>
                  )}
                  
                  {venue.capacity && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Capacity: {formatCapacity(venue.capacity)}
                    </div>
                  )}
                  
                  {venue.built_year && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Built: {venue.built_year}
                      {venue.update_year && ` (Updated: ${venue.update_year})`}
                    </div>
                  )}
                  
                  {venue.architect && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      {venue.architect}
                    </div>
                  )}
                </div>
                
                {venue.construction_cost && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">Construction Cost:</p>
                    <p className="text-sm text-gray-700" 
                       dangerouslySetInnerHTML={{ __html: venue.construction_cost }}></p>
                  </div>
                )}
                
                {venue.events_clubs && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Events & Clubs:</p>
                    <p className="text-sm text-gray-700 line-clamp-3" 
                       dangerouslySetInnerHTML={{ __html: venue.events_clubs }}></p>
                  </div>
                )}
                
                {venue.link && (
                  <a
                    href={venue.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {venues.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No venues found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuesPage;