DROP POLICY IF EXISTS "Staff create batches" ON public.batches;
DROP POLICY IF EXISTS "Role-matched staff append records" ON public.chain_records;

DROP TABLE IF EXISTS public.user_roles;
DROP TABLE IF EXISTS public.profiles;

DROP FUNCTION IF EXISTS public.can_edit_stage(uuid, text);
DROP FUNCTION IF EXISTS public.has_any_role(uuid);
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.assign_first_admin() CASCADE;
DROP TYPE IF EXISTS public.app_role;