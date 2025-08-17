/*
  # Create venues table for arena/stadium data

  1. New Tables
    - `venues`
      - `id` (uuid, primary key)
      - `name` (text, venue name)
      - `chinese_name` (text, Chinese name)
      - `category` (text, venue category)
      - `link` (text, Wikipedia/info link)
      - `built_year` (integer, year built)
      - `update_year` (integer, year updated)
      - `region` (text, geographic region)
      - `country` (text, country)
      - `city` (text, city)
      - `architect` (text, architect/design firm)
      - `venue_type` (text, venue type)
      - `stand_contour` (text, stand configuration)
      - `ga_tier` (integer, general admission tier)
      - `capacity` (integer, seating capacity)
      - `vip_capacity` (integer, VIP seating)
      - `hospitality_capacity` (integer, hospitality seating)
      - `press_capacity` (integer, press seating)
      - `disabled_capacity` (integer, disabled access seating)
      - `suites_count` (integer, number of suites)
      - `temperature_capacity` (integer, temperature related capacity)
      - `height` (numeric, building height)
      - `fop` (text, field of play dimensions)
      - `screen_area` (text, screen area)
      - `events_clubs` (text, events and clubs hosted)
      - `total_area` (numeric, total area)
      - `construction_cost` (text, construction cost)
      - `venue_index` (integer, venue index)
      - `additional_link` (text, additional link)
      - `construction_code` (text, construction code)
      - `main_color_code` (text, main color code)
      - `building_size` (text, building size dimensions)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `venues` table
    - Add policy for public read access to venues data
</*/

CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  chinese_name text,
  category text,
  link text,
  built_year integer,
  update_year integer,
  region text,
  country text,
  city text,
  architect text,
  venue_type text,
  stand_contour text,
  ga_tier integer,
  capacity integer,
  vip_capacity integer,
  hospitality_capacity integer,
  press_capacity integer,
  disabled_capacity integer,
  suites_count integer,
  temperature_capacity integer,
  height numeric,
  fop text,
  screen_area text,
  events_clubs text,
  total_area numeric,
  construction_cost text,
  venue_index integer,
  additional_link text,
  construction_code text,
  main_color_code text,
  building_size text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Anyone can read venues data"
  ON venues
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_venues_country ON venues(country);
CREATE INDEX IF NOT EXISTS idx_venues_region ON venues(region);
CREATE INDEX IF NOT EXISTS idx_venues_capacity ON venues(capacity);
CREATE INDEX IF NOT EXISTS idx_venues_category ON venues(category);