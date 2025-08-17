/*
  # Insert venues data from provided table
  
  1. Data insertion
    - Insert all venue records from the provided markdown table
    - Each record includes name, chinese name, capacity, location, and other details
    
  2. Data fields
    - All venue information including capacity, location, architect, costs, etc.
    - Properly formatted for database storage
*/

-- Insert venues data
INSERT INTO venues (
  name, chinese_name, category, link, built_year, update_year, 
  region, country, city, architect, venue_type, stand_contour,
  ga_tier, capacity, vip_capacity, hospitality_capacity, press_capacity,
  disabled_capacity, suites_count, temperature_capacity, height, fop,
  screen_area, events_clubs, total_area, construction_cost, venue_index,
  additional_link, construction_code, main_color_code, building_size
) VALUES 
('Philippine Arena', '菲律宾竞技场', 'B', 'https://en.wikipedia.org/wiki/Philippine_Arena', 2014, NULL, 'Asia', 'Philippines', 'Bocaue', 'POPULOUS', 'P', NULL, NULL, 51898, NULL, NULL, NULL, NULL, NULL, NULL, 65, NULL, NULL, NULL, NULL, '213 million USD', NULL, NULL, NULL, NULL, '227/179'),

('Mineirinho Arena', '米尼尔尼奥竞技场', 'S', 'https://en.wikipedia.org/wiki/Mineirinho', 1980, NULL, 'South America', 'Brazil', 'Belo Horizonte', NULL, 'Z', 'Z140000011000002S', 2, 24482, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2014 FIVB Volleyball Men''s Club World Championship', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

('Greensboro Coliseum Complex', '格林斯伯罗竞技场', 'B', 'https://www.wikiwand.com/en/Greensboro_Coliseum', 1959, 2016, 'North America', 'United States', 'Greensboro', 'FABRAP', 'Z', 'Z040000010110700S', 2, 23500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '64.6/30.2', NULL, 'Greensboro Generals (EHL/SHL) (1959–1975); NCAA Wake Forest Demon Deacons(1959–1989); Carolina Cougars (ABA) (1969–1974); Greensboro Monarchs (ECHL) (1989–1995); Greensboro City Gaters (GBA) (1991–1992); Carolina Monarchs (AHL) (1995–1997); NHL Carolina Hurricanes (1997–1999); Greensboro Generals (ECHL) (1999–2004); Greensboro Prowlers (AF2) (2000–2003); Greensboro Revolution (NIFL) (2006–2008); UNC Greensboro Spartans (NCAA); Greensboro Swarm (NBAGL); Carolina Cobras (NAL)', NULL, '4.5 million USD (40.4 million USD in 2020); 63 million USD(1993 Expansion)', NULL, NULL, NULL, NULL, NULL),

('Mexico City Arena', '墨西哥城竞技场', 'B', 'https://en.wikipedia.org/wiki/Mexico_City_Arena', 2012, NULL, 'North America', 'Mexico', 'Mexico City', 'KMD Architects Mexico', 'Z', 'Z240000010110700S', 2, 22300, NULL, NULL, NULL, NULL, 124, NULL, NULL, NULL, '700m2', 'Capitanes de Ciudad de Mexico (NBAGL)', 7.2, '300 million USD', NULL, NULL, NULL, NULL, NULL),

('Enterprise Center', '企业中心', 'B', 'https://www.wikiwand.com/en/Enterprise_Center', 1994, 2019, 'North America', 'United States', 'St. Louis', 'Ellerbe Becket', 'Z', 'Z040000010110707S', 2, 22000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL St. Louis Blues', NULL, '135 million USD (249 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Alliant Energy Center', '艾里安能源中心', 'S', 'https://www.wikiwand.com/en/Alliant_Energy_Center', 1967, NULL, 'North America', 'United States', 'Madison', NULL, 'Z', 'Z740000010110500S', 1, 10231, NULL, NULL, NULL, NULL, NULL, NULL, 29.3, NULL, NULL, 'Madison Capitols (USHL)', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

('SKA Arena', 'SKA 竞技场', 'B', 'https://ru.wikipedia.org/wiki/%D0%A1%D0%9A%D0%90_%D0%90%D1%80%D0%B5%D0%BD%D0%B0', 2023, NULL, 'Europe', 'Russia', 'Saint Petersburg', 'I. M. ChaikoN. V. BaranovV. F. YakovlevN. A. VladislavevaA. P. Morozov', 'Z', 'Z040000010220700S', 2, 21500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '37 billion RUSD', NULL, NULL, NULL, NULL, NULL),

('Manchester Arena', '曼彻斯特竞技场', 'B', 'https://en.wikipedia.org/wiki/Manchester_Arena', 1995, 2017, 'Europe', 'United Kingdom', 'Manchester', 'DLA Design/Austin-Smith:Lord and Ellerbe Becket', 'Z', 'Z040000010210700S', 2, 21000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Manchester Giants (BBL) (1995–2001); Manchester Storm (BISL, BJL) (1995–2002); Manchester Phoenix (EIHL) (2003–2004)', NULL, '52 million GBP (108 million GBP in 2022)', NULL, NULL, NULL, NULL, NULL),

('Nanjing Youth Olympic Sports Park Arena', '南京青奥体育公园体育馆', 'B', 'https://baike.baidu.com/item/%E5%8D%97%E4%BA%AC%E9%9D%92%E5%A5%A5%E4%BD%93%E8%82%B2%E5%85%AC%E5%9B%AD/4407115', 2017, NULL, 'Asia', 'China', 'Nanjing', '江苏省建筑设计研究院股份有限公司', 'Z', 'Z040000010210106S', 2, 21000, 1433, NULL, NULL, 44, 38, 3708, NULL, NULL, NULL, NULL, 12.3, NULL, NULL, NULL, NULL, NULL, NULL),

('Rupp Arena', '鲁普竞技场', 'B', 'https://www.wikiwand.com/en/Rupp_Arena', 1976, 2019, 'North America', 'United States', 'Lexington', 'Ellerbe Becket', 'Z', 'Z240020010000000S', 2, 20545, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NCAA Kentucky Wildcats/AHL Kentucky Thoroughblades (1996–2001)/ECHL Lexington Men O'' War (2002–2003); Lexington/Kentucky Horsemen (af2) (2008–2009)', NULL, '55 million USD (241 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Amalie Arena', '阿美来竞技场', 'A', 'https://www.wikiwand.com/en/Amalie_Arena', 1996, NULL, 'North America', 'United States', 'Tampa', 'Ellerbe Becket', 'Z', 'Z040000010220700S', 3, 20500, NULL, NULL, NULL, NULL, 71, NULL, 40.7, NULL, NULL, 'NHL Tampa Bay Lightning/NBA Toronto Raptors (2020–2021)/AFL Tampa Bay Storm (1997–2017)/NCAA South Florida Bulls (2011–2012)/LFL Tampa Breeze (2009–2012)', NULL, '139 million USD (243 million USD in 2020)', NULL, NULL, NULL, NULL, '150/150'),

('Beijing National Indoor Stadium', '北京国家体育馆', 'A', 'https://baike.baidu.com/item/%E5%9B%BD%E5%AE%B6%E4%BD%93%E8%82%B2%E9%A6%86/7481073?fr=aladdin', 2007, NULL, 'Asia', 'China', 'Beijing', '北京市建筑设计研究院股份有限公司/北京城建设计研究总院', 'Z', 'Z040000010110706S', 2, 20050, NULL, NULL, NULL, NULL, 19, 2000, 42.47, NULL, NULL, NULL, 8.09, '650 million CNY', NULL, NULL, NULL, NULL, NULL),

('Amerant Bank Arena', '大西洋银行中心', 'B', 'https://www.wikiwand.com/en/FLA_Live_Arena', 1998, NULL, 'North America', 'United States', 'Sunrise', 'Ellerbe Becket', 'Z', 'Z031001010110700S', 2, 20737, NULL, 2623, NULL, NULL, 70, NULL, NULL, NULL, NULL, 'NHL Florida Panthers; Florida ThunderCats (NPSL) 1998–1999; Florida Bobcats (AFL) 1999–2001; Florida Pit Bulls (ABA) 2005–2006; Miami Caliente (LFL) 2009–2010', 8.1, '184 million USD (305 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('American Airlines Center', '美国航线中心体育馆', 'A', 'https://www.wikiwand.com/en/American_Airlines_Center', 2001, NULL, 'North America', 'United States', 'Dallas', 'David M. Schwarz/Architectural Services/HKS/Johnson/McKibben Architects', 'Z', 'Z040000010221000S', 3, 19200, NULL, NULL, NULL, NULL, 138, NULL, NULL, NULL, NULL, 'NBA Dallas Mavericks/NHL Dallas Stars', 7.8, '420 million USD (614 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Coliseo Amauta', '阿莫塔体育馆', 'S', 'https://en.wikipedia.org/wiki/Coliseo_Amauta', 1948, 2012, 'South America', 'Peru', 'Lima', 'Emilio Harth Terre/Eduardo/Sixto Albareda', 'Z', 'Z740000010000000S', 2, 20000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1982 FIVB Women''s Volleyball World Championship', 9, NULL, NULL, NULL, NULL, NULL, NULL),

('Amway Center', '奥兰多安利球馆', 'A', 'https://www.wikiwand.com/en/Amway_Center', 2010, NULL, 'North America', 'United States', 'Orlando', 'POPULOUS/Chand Tarneja Windows/C.T. Hsu + Associates/Baker Barrios Architects', 'Z', 'Z040000010130700S', 3, 18846, NULL, 1428, NULL, NULL, 140, NULL, NULL, NULL, NULL, 'NBA Orlando Magic/Orlando Predators (AFL) (2011–2013, 2015–2016); Orlando Solar Bears (ECHL); Orlando Predators (NAL); WWE ThunderDome (pro wrestling) (2020)', NULL, '480 million USD (577 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Nansha Citizen Cultural and Sports Complex Arena', '南沙全民文化体育综合体体育馆', 'B', NULL, 2025, NULL, 'Asia', 'China', 'Nansha', 'Zaha Hadid Architects/广东省建筑设计研究院有限公司', 'Z', 'Z040000010210105S', 2, 20000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),

('The O2 Arena', '氧气竞技场', 'A', 'https://en.wikipedia.org/wiki/The_O2_Arena', 2007, NULL, 'Europe', 'United Kingdom', 'London', 'HOK', 'Z', 'Z040001010220100S', 2, 20000, NULL, NULL, NULL, NULL, NULL, NULL, 52, NULL, NULL, '2012 Summer Olympics/2012 Summer Paralympics; ATP Finals (2009–2020)', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

('Scotiabank Arena', '丰业银行体育馆', 'A', 'https://en.wikipedia.org/wiki/Scotiabank_Arena', 1999, NULL, 'North America', 'Canada', 'Toronto', 'Brisbin Brook Beynon Architects/HOK', 'Z', 'Z040000010240700S', 2, 19800, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL Toronto Maple Leafs/NBA Toronto Raptors/NLL Toronto Rock (2001–2020)/AFL Toronto Phantoms (2001–2002)/AHL Toronto Marlies (2010–present, occasional home games)/Raptors 905 (NBA G League) (2015–present, occasional home games)', NULL, '265 million CUSD (391 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Antwerp''s Sport Palace', '安特卫普体育宫', 'B', 'https://en.wikipedia.org/wiki/Sportpaleis', 1933, 2013, 'Europe', 'Belgium', 'Antwerp', 'Apostel Mampaey Family', 'Z', 'Z640000010110700S', 2, 18575, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019 Basketball Champions League Final Four', NULL, '175 million USD (306 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('PNC Arena', '国家警察竞技场', 'B', 'https://www.wikiwand.com/en/PNC_Arena', 1999, 2018, 'North America', 'United States', 'Raleigh', 'Odell Associates', 'Z', 'Z040000010210100S', 2, 19722, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL Carolina Hurricanes/NCAA March Madness (2004, 2008, 2014, 2016, 2025)/AFL Carolina Cobras(2000–2002)/NC State Wolfpack (ACC)', 6.5, '158 million USD (245 million USD in 2020, adjted for inflation.)', NULL, NULL, NULL, NULL, NULL),

('Oakland Arena', '奥克兰竞技场', 'N', 'https://www.wikiwand.com/en/Oakland_Arena', 1966, 1997, 'North America', 'United States', 'Oakland', 'SOM/HNTB(renovation)', 'Z', 'Z240000010210107S', 2, 19596, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'California Seals (WHL) 1966–1967; Oakland Oaks (ABA) 1967–1969; California Golden Seals (NHL) 1967–1976; NBA Golden State Warriors 1971–1996; 1997–2019; San Francisco Golden Gaters (WTT) 1974–1978; Golden Bay Earthquakes (NASL/MISL) 1982–1984; Oakland Skates (RHI) 1993–1995; NCAA California Golden Bears 1997–1999', NULL, '24 million USD (original); $121 million (1996–97 renovation)', NULL, NULL, NULL, NULL, NULL),

('Lanxess Arena', '兰克斯尼斯竞技场', 'B', 'https://en.wikipedia.org/wiki/K%C3%B6lnarena', 1998, NULL, 'Europe', 'Germany', 'Cologne', 'Peter Bohm', 'Z', 'Z240000010120700S', 2, 19500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2007 World Men''s Handball Championship', NULL, '153 million EUR', NULL, NULL, NULL, NULL, NULL),

('Nationwide Arena(Ohio)', '国家体育馆（俄亥俄州）', 'A', 'https://www.wikiwand.com/en/Nationwide_Arena', 2000, NULL, 'North America', 'United States', 'Columbus', 'Heinlein Schrock Stearns/NBBJ', 'Z', 'Z040000010110100S', 2, 19500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL Columbus Blue Jackets; Columbus Landsharks (NLL) (2001–2003); Columbus Destroyers (AFL) (2004–2008, 2019); Ohio Junior Blue Jackets (USHL) (2006–2008); Columbus Wild Dogs (IFL) (2024)', NULL, '175 million USD (278 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Rogers Place', '罗杰斯广场', 'A', 'https://en.wikipedia.org/wiki/Rogers_Place', 2016, NULL, 'North America', 'Canada', 'Edmonton', '360 Architecture/DIALOG/Manica Architecture/Arndt Tkalcic/Bengert', 'Z', 'Z040000010220100S', 2, 19500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL Edmonton Oilers; Edmonton Oil Kings(WHL)', NULL, '480 million CUSD (512 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Rocket Mortgage FieldHouse', '速贷球馆', 'A', 'https://www.wikiwand.com/en/Rocket_Mortgage_FieldHouse', 1994, NULL, 'North America', 'United States', 'Cleveland', 'Ellerbe Becket', 'Z', 'Z040000010220700S', 3, 19432, NULL, 2000, NULL, NULL, 93, NULL, NULL, NULL, NULL, 'NBA Cleveland Cavaliers; Cleveland Lumberjacks (IHL) (1994–2001); Cleveland Rockers (WNBA) (1997–2003); Cleveland Barons (AHL) (2001–2006); Cleveland Monsters (AHL); Cleveland Gladiators (AFL) (2008–2017); Cleveland Crush (LFL) (2011–2013); Cleveland State Vikings (NCAA) (secondary; 2015–present)', NULL, '100 million USD (175 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Hangzhou International Sports Center Arena', '杭州未来科技城体育中心体育馆', 'A', 'https://baike.baidu.com/item/%E6%9D%AD%E5%B7%9E%E6%9C%AA%E6%9D%A5%E7%A7%91%E6%8A%80%E6%96%87%E5%8C%96%E4%B8%AD%E5%BF%83%E5%9B%BD%E9%99%85%E4%BD%93%E8%82%B2%E4%B8%AD%E5%BF%83/62061160?fr=aladdin', 2027, NULL, 'Asia', 'China', 'Hanghzou', 'Zaha Hadid Architects/浙江省建筑设计研究院', 'Z', 'Z040010010210106S', 2, 19000, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 7.1, NULL, NULL, NULL, NULL, NULL, NULL),

('PPG Paints Arena', '油漆竞技场', 'A', 'https://www.wikiwand.com/en/PPG_Paints_Arena', 2010, NULL, 'North America', 'United States', 'Pittsburgh', 'POPULOUS/Astorino/Architectural Innovations/Fukui Architects/Lami Grubb', 'Z', 'Z040000010220500S', 2, 19000, NULL, 1950, NULL, NULL, 66, NULL, NULL, NULL, NULL, 'NHL Pittsburgh Penguins; Pittsburgh Power (AFL) (2011–2014)', 6.7, '321 million USD (386 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Arena Stozice', '斯托齐切竞技场', 'N', 'https://en.wikipedia.org/wiki/Arena_Sto%C5%BEice', 2010, NULL, 'Europe', 'Slovenia', 'Ljubljana', 'Sadar Vuga architects', 'Z', 'Z240000010210100S', 2, 12480, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '66.3 million EUR', NULL, NULL, NULL, NULL, NULL),

('Saitama Super Arena', '埼玉超级竞技场', 'N', 'https://en.wikipedia.org/wiki/Saitama_Super_Arena', 2000, NULL, 'Asia', 'Japan', 'Saitama', '日建设计', 'Z', 'Z040030010110106S', 2, 19000, NULL, NULL, NULL, NULL, NULL, NULL, 66, NULL, NULL, NULL, 4.37, '65 billion JPY', NULL, NULL, NULL, NULL, NULL),

('T Mobile Center', 'T Mobile 中心', 'A', 'https://www.wikiwand.com/en/T-Mobile_Center', 2007, NULL, 'North America', 'United States', 'Kansas City', 'HOK/360 Architecture/Ellerbe Becket/Rafael Architects', 'Z', 'Z440005510120100S', 2, 18972, NULL, NULL, NULL, NULL, 72, NULL, NULL, NULL, NULL, 'Kansas City Command (AFL) (2008, 2011–2012); Big 12 men''s basketball tournament (2008, 2010–present)', NULL, '276 million USD ($344 million in 2020)', NULL, NULL, NULL, NULL, NULL),

('Freedom Hall', '自由厅', 'N', 'https://www.wikiwand.com/en/Freedom_Hall', 1956, 1984, 'North America', 'United States', 'Louisville', NULL, 'Z', 'Z240000010110700S', 2, 18865, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Louisville Cardinals men''s basketball (NCAA) (1956–2010); Louisville Rebels (IHL) (1957–1960); Kentucky Colonels (ABA) (1970–1976); Louisville Cardinals women''s basketball (NCAA) (1975–2010); Louisville Panthers (AHL) (1999–2001); Louisville Fire (af2) (2001–2008); Kentucky Stickhorses (NALL) (2012–2013); Kentucky Xtreme (CIFL) (2013–2014); Bellarmine Knights men''s basketball (NCAA) (2020–present); Bellarmine Knights women''s basketball (NCAA) (2020–present)', NULL, NULL, NULL, NULL, NULL, NULL, NULL),

('Prudential Center', '保德信中心', 'B', 'https://www.wikiwand.com/en/Prudential_Center', 2007, NULL, 'North America', 'United States', 'Newark', 'HOK/Morris Adjmi Architects (Exterior)/El Taller Colaborativo', 'Z', 'Z040000010220100S', 2, 18711, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'NHL New Jersey Devils/NBA New Jersey Nets(2010–2012); NCAA Seton Hall Pirates(2007–present); New Jersey Rockets (USPHL) (2007–present); New York Titans (NLL) (2007–2009); New Jersey Ironmen (XSL) (2007–2009); NJIT Highlanders (NCAA) (2008–present); New York Liberty (WNBA) (2011–2013); Metropolitan Riveters (NWHL) (2016–2019, 2021)', NULL, '375 million USD', NULL, NULL, NULL, NULL, NULL),

('Coliseo de Puerto Rico, Jose Miguel Agrelot', '何塞·米格尔·阿格莱洛特体育馆', 'N', 'https://en.wikipedia.org/wiki/Jos%C3%A9_Miguel_Agrelot_Coliseum', 2004, NULL, 'North America', 'Puerto Rico', 'San Juan', 'HOK', 'Z', 'Z040000010210700S', 2, 18500, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '252.6 million USD', NULL, NULL, NULL, NULL, NULL),

('AT&T Center', 'AT&T中心球馆', 'A', 'https://www.wikiwand.com/en/AT%26T_Center', 2002, NULL, 'North America', 'United States', 'San Antonio', 'Ellerbe Becket/Kell Munoz Architects/Lake Flato Architects', 'Z', 'Z240000010210702S', 2, 18418, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'AHL San Antonio Rampage (2002–2020); NBA San Antonio Spurs; WNBA San Antonio Silver Stars/Stars (2003–2014, 2016–2017)', 6.9, '186 million USD (268 million USD in 2020)', NULL, NULL, NULL, NULL, NULL),

('Smoothie King Center', '冰沙王中心', 'A', 'https://www.wikiwand.com/en/Smoothie_King_Center', 1999, 2013, 'North America', 'United States', 'New Orleans', 'Arthur Q. Davis and Partners/Billes-Manning Architects/Hewitt Washington and Associates', 'Z', 'Z040000010220700S', 2, 18500, NULL, 2800, NULL, NULL, 56, NULL, NULL, NULL, NULL, 'New Orleans Brass (ECHL) (1999–2002); NBA New Orleans Hornets/Pelicans(2002–2005, 2007–present); New Orleans VooDoo (AFL) (2004–2005, 2007–2008, 2011–2015)', NULL, '114 million USD (177 million USD in 2020)', NULL, NULL, NULL, NULL, NULL);