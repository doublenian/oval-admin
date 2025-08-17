/*
  # Add INSERT policy for venues table

  1. Security
    - Add policy to allow authenticated users to insert venue data
    - This enables the import functionality to work properly
*/

-- Add policy to allow authenticated users to insert venues data
CREATE POLICY "Authenticated users can insert venues"
  ON venues
  FOR INSERT
  TO authenticated
  WITH CHECK (true);