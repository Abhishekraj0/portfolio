-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update portfolio assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete portfolio assets" ON storage.objects;

-- Create new policies for portfolio-assets bucket
CREATE POLICY "Public can view portfolio assets" ON storage.objects
FOR SELECT USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Authenticated can upload portfolio assets" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'portfolio-assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated can update portfolio assets" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'portfolio-assets' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated can delete portfolio assets" ON storage.objects
FOR DELETE USING (
  bucket_id = 'portfolio-assets' 
  AND auth.role() = 'authenticated'
);