ALTER TABLE public.batches ADD COLUMN IF NOT EXISTS batch_no text;
CREATE UNIQUE INDEX IF NOT EXISTS batches_code_key ON public.batches (code);

CREATE SEQUENCE IF NOT EXISTS public.batch_code_seq START WITH 1028;
CREATE SEQUENCE IF NOT EXISTS public.batch_no_seq START WITH 5;

CREATE TABLE IF NOT EXISTS public.batch_arrivals (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_id uuid NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  stage text NOT NULL,
  confirmed_by_name text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (batch_id, stage)
);

GRANT SELECT, INSERT ON public.batch_arrivals TO anon, authenticated;
GRANT ALL ON public.batch_arrivals TO service_role;

ALTER TABLE public.batch_arrivals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Arrivals are publicly viewable"
  ON public.batch_arrivals FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Prototype anyone can confirm arrivals"
  ON public.batch_arrivals FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TRIGGER batch_arrivals_updated_at
  BEFORE UPDATE ON public.batch_arrivals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.create_batch(
  _hive_id text,
  _apiary_location text,
  _created_by_name text
)
RETURNS public.batches
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_row public.batches;
BEGIN
  INSERT INTO public.batches (code, hive_id, apiary_location, created_by_name)
  VALUES ('HC' || nextval('public.batch_code_seq'), coalesce(_hive_id, ''), coalesce(_apiary_location, ''), coalesce(_created_by_name, ''))
  RETURNING * INTO new_row;
  RETURN new_row;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_batch(text, text, text) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.assign_batch_no(
  _batch_id uuid,
  _hive_id text,
  _beekeeper_id text,
  _harvest_date text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing text;
  hive text;
  bk text;
  d text;
  seq bigint;
BEGIN
  SELECT batch_no INTO existing FROM public.batches WHERE id = _batch_id;
  IF existing IS NOT NULL AND existing <> '' THEN
    RETURN existing;
  END IF;

  hive := upper(regexp_replace(coalesce(nullif(trim(_hive_id), ''), 'HIVE'), '\s+', '-', 'g'));
  bk := upper(coalesce(nullif(trim(_beekeeper_id), ''), 'BK000'));
  d := left(regexp_replace(coalesce(_harvest_date, ''), '\D', '', 'g'), 8);
  IF length(d) < 8 THEN
    d := '00000000';
  END IF;

  seq := nextval('public.batch_no_seq');
  existing := hive || '-' || bk || '-' || d || '-' || lpad(seq::text, 3, '0');

  UPDATE public.batches SET batch_no = existing WHERE id = _batch_id;
  RETURN existing;
END;
$$;

GRANT EXECUTE ON FUNCTION public.assign_batch_no(uuid, text, text, text) TO anon, authenticated;
