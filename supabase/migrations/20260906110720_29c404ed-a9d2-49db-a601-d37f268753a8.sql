CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN auth.uid() IS NOT NULL AND _user_id IS DISTINCT FROM auth.uid() THEN false
    ELSE EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
  END
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN auth.uid() IS NOT NULL AND _user_id IS DISTINCT FROM auth.uid() THEN false
    ELSE EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id)
  END
$$;

CREATE OR REPLACE FUNCTION public.can_edit_stage(_user_id uuid, _stage text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN auth.uid() IS NOT NULL AND _user_id IS DISTINCT FROM auth.uid() THEN false
    ELSE EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = _user_id
        AND (
          ur.role = 'admin'
          OR (_stage IN ('beekeeper','harvesting') AND ur.role = 'beekeeper')
          OR (_stage = 'testing' AND ur.role = 'tester')
          OR (_stage = 'processing' AND ur.role = 'processing')
          OR (_stage IN ('packaging','distribution') AND ur.role = 'distribution')
        )
    )
  END
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.can_edit_stage(uuid, text) FROM anon, public;