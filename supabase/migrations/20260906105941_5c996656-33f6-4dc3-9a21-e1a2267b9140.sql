REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.can_edit_stage(UUID, TEXT) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.has_any_role(UUID) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_edit_stage(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_any_role(UUID) TO authenticated;