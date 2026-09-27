-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('hive-images', 'hive-images', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('hive-videos', 'hive-videos', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true) ON CONFLICT (id) DO NOTHING;

-- RLS for Storage Buckets
-- Allow public read access to hive images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'hive-images' OR bucket_id = 'hive-videos' OR bucket_id = 'certificates');

-- Allow authenticated users to upload their own hive images
CREATE POLICY "Auth Upload Access" ON storage.objects FOR INSERT TO authenticated WITH CHECK ((bucket_id = 'hive-images' OR bucket_id = 'hive-videos' OR bucket_id = 'certificates') AND (auth.role() = 'authenticated'));

-- Allow users to update and delete their own uploads
CREATE POLICY "Auth Update Access" ON storage.objects FOR UPDATE TO authenticated USING ((bucket_id = 'hive-images' OR bucket_id = 'hive-videos' OR bucket_id = 'certificates') AND owner = auth.uid());
CREATE POLICY "Auth Delete Access" ON storage.objects FOR DELETE TO authenticated USING ((bucket_id = 'hive-images' OR bucket_id = 'hive-videos' OR bucket_id = 'certificates') AND owner = auth.uid());
