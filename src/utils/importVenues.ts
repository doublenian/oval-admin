import { supabase } from '../lib/supabase';

interface VenueData {
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
  stand_contour?: string;
  ga_tier?: number;
  capacity?: number;
  vip_capacity?: number;
  hospitality_capacity?: number;
  press_capacity?: number;
  disabled_capacity?: number;
  suites_count?: number;
  temperature_capacity?: number;
  height?: number;
  fop?: string;
  screen_area?: string;
  events_clubs?: string;
  total_area?: number;
  construction_cost?: string;
  venue_index?: number;
  additional_link?: string;
  construction_code?: string;
  main_color_code?: string;
  building_size?: string;
}

// CSV data converted to array of objects
const venuesData: VenueData[] = [
  {
    name: "Philippine Arena",
    chinese_name: "菲律宾竞技场",
    category: "B",
    link: "https://en.wikipedia.org/wiki/Philippine_Arena",
    built_year: 2014,
    region: "Asia",
    country: "Philippines",
    city: "Bocaue",
    architect: "POPULOUS",
    venue_type: "P",
    capacity: 51898,
    height: 65,
    construction_cost: "213 million USD",
    building_size: "227/179"
  },
  {
    name: "Mineirinho Arena",
    chinese_name: "米尼尔尼奥竞技场",
    category: "S",
    link: "https://en.wikipedia.org/wiki/Mineirinho",
    built_year: 1980,
    region: "South America",
    country: "Brazil",
    city: "Belo Horizonte",
    venue_type: "Z",
    stand_contour: "Z140000011000002S",
    ga_tier: 2,
    capacity: 24482,
    events_clubs: "2014 FIVB Volleyball Men's Club World Championship"
  },
  {
    name: "Greensboro Coliseum Complex",
    chinese_name: "格林斯伯罗竞技场",
    category: "B",
    link: "https://www.wikiwand.com/en/Greensboro_Coliseum",
    built_year: 1959,
    update_year: 2016,
    region: "North America",
    country: "United States",
    city: "Greensboro",
    architect: "FABRAP",
    venue_type: "Z",
    stand_contour: "Z040000010110700S",
    ga_tier: 2,
    capacity: 23500,
    fop: "64.6/30.2",
    events_clubs: "Greensboro Generals (EHL/SHL) (1959–1975)<br>NCAA Wake Forest Demon Deacons(1959–1989)<br>Carolina Cougars (ABA) (1969–1974)<br>Greensboro Monarchs (ECHL) (1989–1995)<br>Greensboro City Gaters (GBA) (1991–1992)<br>Carolina Monarchs (AHL) (1995–1997)<br>NHL Carolina Hurricanes (1997–1999)<br>Greensboro Generals (ECHL) (1999–2004)<br>Greensboro Prowlers (AF2) (2000–2003)<br>Greensboro Revolution (NIFL) (2006–2008)<br>UNC Greensboro Spartans (NCAA)<br>Greensboro Swarm (NBAGL)<br>Carolina Cobras (NAL)",
    construction_cost: "4.5 million USD<br>(40.4 million USD in 2020)<br>63 million USD(1993 Expansion)"
  },
  {
    name: "Mexico City Arena",
    chinese_name: "墨西哥城竞技场",
    category: "B",
    link: "https://en.wikipedia.org/wiki/Mexico_City_Arena",
    built_year: 2012,
    region: "North America",
    country: "Mexico",
    city: "Mexico City",
    architect: "KMD Architects Mexico",
    venue_type: "Z",
    stand_contour: "Z240000010110700S",
    ga_tier: 2,
    capacity: 22300,
    suites_count: 124,
    screen_area: "700m2",
    events_clubs: "Capitanes de Ciudad de Mexico (NBAGL)",
    total_area: 7.2,
    construction_cost: "300 million USD"
  },
  {
    name: "Enterprise Center",
    chinese_name: "企业中心",
    category: "B",
    link: "https://www.wikiwand.com/en/Enterprise_Center",
    built_year: 1994,
    update_year: 2019,
    region: "North America",
    country: "United States",
    city: "St. Louis",
    architect: "Ellerbe Becket",
    venue_type: "Z",
    stand_contour: "Z040000010110707S",
    ga_tier: 2,
    capacity: 22000,
    events_clubs: "NHL St. Louis Blues",
    construction_cost: "135 million USD<br>(249 million USD in 2020)"
  },
  {
    name: "Alliant Energy Center",
    chinese_name: "艾里安能源中心",
    category: "S",
    link: "https://www.wikiwand.com/en/Alliant_Energy_Center",
    built_year: 1967,
    region: "North America",
    country: "United States",
    city: "Madison",
    venue_type: "Z",
    stand_contour: "Z740000010110500S",
    ga_tier: 1,
    capacity: 10231,
    height: 29.3,
    events_clubs: "Madison Capitols (USHL)"
  },
  {
    name: "SKA Arena",
    chinese_name: "SKA 竞技场",
    category: "B",
    link: "https://ru.wikipedia.org/wiki/СКА_Арена",
    built_year: 2023,
    region: "Europe",
    country: "Russia",
    city: "Saint Petersburg",
    architect: "I. M. ChaikoN. V. BaranovV. F. YakovlevN. A. VladislavevaA. P. Morozov",
    venue_type: "Z",
    stand_contour: "Z040000010220700S",
    ga_tier: 2,
    capacity: 21500,
    construction_cost: "37 billion RUSD"
  },
  {
    name: "Manchester Arena",
    chinese_name: "曼彻斯特竞技场",
    category: "B",
    link: "https://en.wikipedia.org/wiki/Manchester_Arena",
    built_year: 1995,
    update_year: 2017,
    region: "Europe",
    country: "United Kingdom",
    city: "Manchester",
    architect: "DLA Design/Austin-Smith:Lord and Ellerbe Becket",
    venue_type: "Z",
    stand_contour: "Z040000010210700S",
    ga_tier: 2,
    capacity: 21000,
    events_clubs: "Manchester Giants (BBL) (1995–2001)<br>Manchester Storm (BISL, BJL) (1995–2002)<br>Manchester Phoenix (EIHL) (2003–2004)",
    construction_cost: "52 million GBP<br>(108 million GBP in 2022)"
  },
  {
    name: "Nanjing Youth Olympic Sports Park Arena",
    chinese_name: "南京青奥体育公园体育馆",
    category: "B",
    link: "https://baike.baidu.com/item/南京青奥体育公园/4407115",
    built_year: 2017,
    region: "Asia",
    country: "China",
    city: "Nanjing",
    architect: "江苏省建筑设计研究院股份有限公司",
    venue_type: "Z",
    stand_contour: "Z040000010210106S",
    ga_tier: 2,
    capacity: 21000,
    vip_capacity: 1433,
    disabled_capacity: 44,
    suites_count: 38,
    temperature_capacity: 3708,
    total_area: 12.3
  },
  {
    name: "Rupp Arena",
    chinese_name: "鲁普竞技场",
    category: "B",
    link: "https://www.wikiwand.com/en/Rupp_Arena",
    built_year: 1976,
    update_year: 2019,
    region: "North America",
    country: "United States",
    city: "Lexington",
    architect: "Ellerbe Becket",
    venue_type: "Z",
    stand_contour: "Z240020010000000S",
    ga_tier: 2,
    capacity: 20545,
    events_clubs: "NCAA Kentucky Wildcats/AHL Kentucky Thoroughblades (1996–2001)/ECHL Lexington Men O' War (2002–2003)<br>Lexington/Kentucky Horsemen (af2) (2008–2009)",
    construction_cost: "55 million USD<br>(241 million USD in 2020)"
  }
];

export async function importVenues(): Promise<void> {
  try {
    console.log('Starting venue data import...');
    
    // Clear existing data (optional)
    const { error: deleteError } = await supabase
      .from('venues')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
    
    if (deleteError) {
      console.warn('Warning: Could not clear existing venues:', deleteError);
    }
    
    // Insert new data in batches
    const batchSize = 10;
    for (let i = 0; i < venuesData.length; i += batchSize) {
      const batch = venuesData.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('venues')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        throw error;
      }
      
      console.log(`Inserted batch ${i / batchSize + 1}: ${data?.length} venues`);
    }
    
    console.log(`Successfully imported ${venuesData.length} venues!`);
  } catch (error) {
    console.error('Failed to import venues:', error);
    throw error;
  }
}

export async function getVenues(filters?: {
  country?: string;
  region?: string;
  category?: string;
  minCapacity?: number;
  maxCapacity?: number;
}) {
  let query = supabase
    .from('venues')
    .select('*')
    .order('capacity', { ascending: false });
  
  if (filters?.country) {
    query = query.eq('country', filters.country);
  }
  
  if (filters?.region) {
    query = query.eq('region', filters.region);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.minCapacity) {
    query = query.gte('capacity', filters.minCapacity);
  }
  
  if (filters?.maxCapacity) {
    query = query.lte('capacity', filters.maxCapacity);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
  
  return data;
}