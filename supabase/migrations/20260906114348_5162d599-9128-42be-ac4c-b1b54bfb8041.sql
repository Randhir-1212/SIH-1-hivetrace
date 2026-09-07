GRANT SELECT, INSERT ON public.batches TO anon;
GRANT SELECT, INSERT ON public.chain_records TO anon;

CREATE POLICY "Prototype anyone can create batches"
ON public.batches FOR INSERT TO anon
WITH CHECK (created_by IS NULL);

CREATE POLICY "Prototype anyone can append records"
ON public.chain_records FOR INSERT TO anon
WITH CHECK (created_by IS NULL);