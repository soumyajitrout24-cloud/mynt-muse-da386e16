DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'featured_models' AND column_name = 'location_name'
  ) THEN
    ALTER TABLE public.featured_models ADD COLUMN location_name text;
  END IF;
END $$;

UPDATE public.featured_models
SET location_name = city
WHERE location_name IS NULL;

ALTER TABLE public.featured_models
ALTER COLUMN location_name SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'gallery-images') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('gallery-images', 'gallery-images', true);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'featured-models') THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('featured-models', 'featured-models', true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can view gallery-images'
  ) THEN
    CREATE POLICY "Public can view gallery-images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'gallery-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can upload gallery-images'
  ) THEN
    CREATE POLICY "Admins can upload gallery-images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update gallery-images'
  ) THEN
    CREATE POLICY "Admins can update gallery-images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'))
    WITH CHECK (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete gallery-images'
  ) THEN
    CREATE POLICY "Admins can delete gallery-images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'gallery-images' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Public can view featured-models'
  ) THEN
    CREATE POLICY "Public can view featured-models"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'featured-models');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can upload featured-models'
  ) THEN
    CREATE POLICY "Admins can upload featured-models"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'featured-models' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can update featured-models'
  ) THEN
    CREATE POLICY "Admins can update featured-models"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'featured-models' AND public.has_role(auth.uid(), 'admin'))
    WITH CHECK (bucket_id = 'featured-models' AND public.has_role(auth.uid(), 'admin'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects' AND policyname = 'Admins can delete featured-models'
  ) THEN
    CREATE POLICY "Admins can delete featured-models"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'featured-models' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;