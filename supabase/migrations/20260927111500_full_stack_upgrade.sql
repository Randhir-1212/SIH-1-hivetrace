-- Add new roles to the existing enum if they don't exist
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'retailer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'customer';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'lab_inspector';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'processor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'packaging';

-- Update user_roles to accommodate new roles (no schema change needed, just use new enum values)

-- ==========================================
-- BEEKEEPING & HIVE MANAGEMENT
-- ==========================================

-- FARMS
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.farms TO authenticated;
GRANT ALL ON public.farms TO service_role;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER farms_updated_at BEFORE UPDATE ON public.farms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Beekeepers manage their own farms" ON public.farms FOR ALL TO authenticated USING (owner_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- HIVES (Extended)
CREATE TABLE IF NOT EXISTS public.hives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES public.farms(id) ON DELETE CASCADE,
    hive_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- active, inactive, maintenance
    colony_strength TEXT, -- weak, moderate, strong
    queen_status TEXT, -- active, missing, superseded
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hives TO authenticated;
GRANT ALL ON public.hives TO service_role;
ALTER TABLE public.hives ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER hives_updated_at BEFORE UPDATE ON public.hives FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- RLS: Owners of the farm or admin
CREATE POLICY "Beekeepers manage their own hives" ON public.hives FOR ALL TO authenticated 
USING (
    EXISTS (SELECT 1 FROM public.farms f WHERE f.id = hives.farm_id AND f.owner_id = auth.uid()) 
    OR public.has_role(auth.uid(), 'admin')
);

-- HIVE MEDIA (Images/Videos)
CREATE TABLE IF NOT EXISTS public.hive_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hive_id UUID REFERENCES public.hives(id) ON DELETE CASCADE,
    media_type TEXT NOT NULL, -- image, video
    media_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ai_analyzed BOOLEAN DEFAULT false,
    ai_results JSONB DEFAULT '{}'::jsonb,
    ai_confidence DOUBLE PRECISION,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hive_media TO authenticated;
GRANT ALL ON public.hive_media TO service_role;
ALTER TABLE public.hive_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own media" ON public.hive_media FOR ALL TO authenticated USING (uploaded_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- ==========================================
-- HONEY PRODUCTION & PROCESSING
-- ==========================================

-- HONEY COLLECTIONS (Raw harvest)
CREATE TABLE IF NOT EXISTS public.honey_collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hive_id UUID REFERENCES public.hives(id) ON DELETE SET NULL,
    batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
    harvest_date DATE NOT NULL,
    quantity_kg DOUBLE PRECISION NOT NULL,
    floral_source TEXT,
    notes TEXT,
    collected_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.honey_collections TO authenticated;
GRANT ALL ON public.honey_collections TO service_role;
ALTER TABLE public.honey_collections ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER collections_updated_at BEFORE UPDATE ON public.honey_collections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Users manage their own collections" ON public.honey_collections FOR ALL TO authenticated USING (collected_by = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- PURITY TESTS
CREATE TABLE IF NOT EXISTS public.purity_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
    test_type TEXT NOT NULL, -- raw, post-packaging
    tester_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    test_date DATE NOT NULL,
    moisture_pct DOUBLE PRECISION,
    sucrose_pct DOUBLE PRECISION,
    fructose_pct DOUBLE PRECISION,
    glucose_pct DOUBLE PRECISION,
    hmf_mg_kg DOUBLE PRECISION,
    diastase_activity DOUBLE PRECISION,
    adulteration_detected BOOLEAN DEFAULT false,
    ai_interpretation JSONB DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, passed, failed, review
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.purity_tests TO authenticated;
GRANT ALL ON public.purity_tests TO service_role;
ALTER TABLE public.purity_tests ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER purity_tests_updated_at BEFORE UPDATE ON public.purity_tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Testers and Admins manage tests" ON public.purity_tests FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'tester') OR public.has_role(auth.uid(), 'lab_inspector') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Everyone can read passed tests" ON public.purity_tests FOR SELECT TO anon, authenticated USING (status = 'passed');


-- PACKAGING BATCHES
CREATE TABLE IF NOT EXISTS public.packaging_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    honey_batch_id UUID REFERENCES public.batches(id) ON DELETE CASCADE,
    package_id TEXT NOT NULL UNIQUE, -- e.g., HT-HNY-2026-000001
    processor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    packaging_date DATE NOT NULL,
    quantity_units INTEGER NOT NULL,
    unit_size_g INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'packaged',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.packaging_batches TO authenticated;
GRANT ALL ON public.packaging_batches TO service_role;
ALTER TABLE public.packaging_batches ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER packaging_batches_updated_at BEFORE UPDATE ON public.packaging_batches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE POLICY "Processors manage packaging" ON public.packaging_batches FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'processing') OR public.has_role(auth.uid(), 'processor') OR public.has_role(auth.uid(), 'packaging') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public view packages" ON public.packaging_batches FOR SELECT TO anon, authenticated USING (true);


-- QR CODES
CREATE TABLE IF NOT EXISTS public.qr_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id UUID REFERENCES public.packaging_batches(id) ON DELETE CASCADE,
    qr_hash TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL,
    scans INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.qr_codes TO authenticated;
GRANT ALL ON public.qr_codes TO service_role;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read QR codes" ON public.qr_codes FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Processors create QR codes" ON public.qr_codes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'processing') OR public.has_role(auth.uid(), 'admin'));


-- ==========================================
-- BLOCKCHAIN & TRACEABILITY
-- ==========================================
CREATE TABLE IF NOT EXISTS public.blockchain_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_id UUID REFERENCES public.chain_records(id) ON DELETE CASCADE,
    tx_hash TEXT NOT NULL UNIQUE,
    network TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, failed
    timestamp TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.blockchain_transactions TO authenticated;
GRANT ALL ON public.blockchain_transactions TO service_role;
ALTER TABLE public.blockchain_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view blockchain tx" ON public.blockchain_transactions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "System can insert tx" ON public.blockchain_transactions FOR INSERT TO authenticated WITH CHECK (true);


-- ==========================================
-- SYSTEM & AUDIT
-- ==========================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read audit logs" ON public.audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can create audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);


CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    link TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own notifications" ON public.notifications FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "System inserts notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);
