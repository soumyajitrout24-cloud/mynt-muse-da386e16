
CREATE TABLE public.featured_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  image_url text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.featured_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active featured models"
  ON public.featured_models FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage featured models"
  ON public.featured_models FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
