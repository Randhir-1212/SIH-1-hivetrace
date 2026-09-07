-- ROLES
CREATE TYPE public.app_role AS ENUM ('beekeeper','tester','processing','distribution','admin');

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.can_edit_stage(_user_id UUID, _stage TEXT)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = _user_id
      AND (
        ur.role = 'admin'
        OR (ur.role = 'beekeeper' AND _stage IN ('beekeeper','harvesting'))
        OR (ur.role = 'tester' AND _stage = 'testing')
        OR (ur.role = 'processing' AND _stage = 'processing')
        OR (ur.role = 'distribution' AND _stage IN ('packaging','distribution'))
      )
  );
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id);
$$;

CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins grant roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins revoke roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- BATCHES
CREATE TABLE public.batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  hive_id TEXT NOT NULL DEFAULT '',
  apiary_location TEXT NOT NULL DEFAULT '',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.batches TO anon;
GRANT SELECT, INSERT ON public.batches TO authenticated;
GRANT ALL ON public.batches TO service_role;
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER batches_updated_at BEFORE UPDATE ON public.batches FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Batches are publicly viewable" ON public.batches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff create batches" ON public.batches FOR INSERT TO authenticated WITH CHECK (public.has_any_role(auth.uid()) AND created_by = auth.uid());

-- CHAIN RECORDS
CREATE TABLE public.chain_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id UUID NOT NULL REFERENCES public.batches(id) ON DELETE CASCADE,
  stage TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  prev_hash TEXT NOT NULL,
  hash TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX chain_records_batch_idx ON public.chain_records (batch_id, created_at);
GRANT SELECT ON public.chain_records TO anon;
GRANT SELECT, INSERT ON public.chain_records TO authenticated;
GRANT ALL ON public.chain_records TO service_role;
ALTER TABLE public.chain_records ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER chain_records_updated_at BEFORE UPDATE ON public.chain_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Records are publicly viewable" ON public.chain_records FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Role-matched staff append records" ON public.chain_records FOR INSERT TO authenticated
  WITH CHECK (public.can_edit_stage(auth.uid(), stage) AND created_by = auth.uid());

-- PROFILE AUTO-CREATE
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)), COALESCE(NEW.email, ''))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- DEMO DATA
INSERT INTO public.batches (code, hive_id, apiary_location, created_by_name, created_at) VALUES ('HC1025','H-042','Kaziranga foothills, Assam','Maya Deori','2026-02-28T09:15:00Z');
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'beekeeper','{"beekeeperName":"Maya Deori","hiveId":"H-042","apiaryLocation":"Kaziranga foothills, Assam"}'::jsonb,'GENESIS','e6404d7b26bd2860aeff62e6381aee863096c1e21dee185f43e713e16e13882f','Maya Deori','2026-02-28T09:15:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'harvesting','{"harvestDate":"2026-03-02","quantityKg":"18.5","hiveInfo":"H-042 · Apis cerana · wildflower forage"}'::jsonb,'e6404d7b26bd2860aeff62e6381aee863096c1e21dee185f43e713e16e13882f','33a893330f2850964c287106611f91d322593c5bacf2725c93b4326362f68ed4','Maya Deori','2026-03-02T05:40:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'testing','{"moisturePct":"17.2","purityPct":"98.4","testResult":"Pass"}'::jsonb,'33a893330f2850964c287106611f91d322593c5bacf2725c93b4326362f68ed4','ea3feb5376715a4f7c0b259db2a6669d80f0c3e9a9d3cf1f9200e428cf59fdb3','Dr. Arjun Rao','2026-03-04T11:05:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'processing','{"processingDate":"2026-03-06","facility":"PureHive Extraction Unit, Guwahati"}'::jsonb,'ea3feb5376715a4f7c0b259db2a6669d80f0c3e9a9d3cf1f9200e428cf59fdb3','4b58f0dadbdf15e19941628da9201f388fe2af090ac09138c00a2c1f10b23de2','Sunita Kashyap','2026-03-06T08:20:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'packaging','{"batchId":"HC1025","packagingDate":"2026-03-08"}'::jsonb,'4b58f0dadbdf15e19941628da9201f388fe2af090ac09138c00a2c1f10b23de2','d02a7168cf4abdc57ab85a4fb008f64f3e6af887c08939bfd4f4414ecd77aa23','Rohan Baruah','2026-03-08T13:45:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'distribution','{"shipment":"BlueDart · AWB 741852963","destination":"Kolkata retail hub"}'::jsonb,'d02a7168cf4abdc57ab85a4fb008f64f3e6af887c08939bfd4f4414ecd77aa23','d6a21cc07a89c5d8050280a327d5a56d3bdb144a958085e5d61aeda040dd58dd','Rohan Baruah','2026-03-09T06:10:00Z' FROM public.batches WHERE code='HC1025';
INSERT INTO public.batches (code, hive_id, apiary_location, created_by_name, created_at) VALUES ('HC1026','H-107','Ziro Valley, Arunachal Pradesh','Maya Deori','2026-03-10T07:30:00Z');
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'beekeeper','{"beekeeperName":"Maya Deori","hiveId":"H-107","apiaryLocation":"Ziro Valley, Arunachal Pradesh"}'::jsonb,'GENESIS','a108212b97edaa617315a8eee66b0a395cf1ab4418208dd736e43f9d7d8ab69c','Maya Deori','2026-03-10T07:30:00Z' FROM public.batches WHERE code='HC1026';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'harvesting','{"harvestDate":"2026-03-14","quantityKg":"22.0","hiveInfo":"H-107 · Apis cerana · orange blossom"}'::jsonb,'a108212b97edaa617315a8eee66b0a395cf1ab4418208dd736e43f9d7d8ab69c','cc3db551ac05a99a98345b1fa0aa2e880f79f33df30ba3cd0a0507e2b7038823','Maya Deori','2026-03-14T04:55:00Z' FROM public.batches WHERE code='HC1026';
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'testing','{"moisturePct":"18.9","purityPct":"96.1","testResult":"Pending"}'::jsonb,'cc3db551ac05a99a98345b1fa0aa2e880f79f33df30ba3cd0a0507e2b7038823','22e4735ebb50b137df67a57589f4adab792e9784e6af667bc99fbc313367a4cf','Dr. Arjun Rao','2026-03-16T10:00:00Z' FROM public.batches WHERE code='HC1026';
INSERT INTO public.batches (code, hive_id, apiary_location, created_by_name, created_at) VALUES ('HC1027','H-019','Cherrapunji, Meghalaya','Maya Deori','2026-03-20T08:00:00Z');
INSERT INTO public.chain_records (batch_id, stage, data, prev_hash, hash, created_by_name, created_at) SELECT id,'beekeeper','{"beekeeperName":"Maya Deori","hiveId":"H-019","apiaryLocation":"Cherrapunji, Meghalaya"}'::jsonb,'GENESIS','ba46fd0dec3a48018b136dde6c23c3629f0fb7b42554b63952486d6e39d6daaf','Maya Deori','2026-03-20T08:00:00Z' FROM public.batches WHERE code='HC1027';