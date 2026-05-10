-- Trigger: provision_new_user
-- Fires when a new user signs up via Supabase Auth
-- Creates a row in public.user as USER / INACTIVE
-- Inserts default rights (all 0) from the rights table

CREATE OR REPLACE FUNCTION provision_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into public user table
  INSERT INTO public.user (
    userId,
    email,
    user_type,
    record_status
  )
  VALUES (
    NEW.id,
    NEW.email,
    'USER',
    'INACTIVE'
  );

  -- Insert default module rights (all set to 0)
  INSERT INTO public.UserModule_Rights (userId, moduleId, rightId, value)
  SELECT NEW.id, moduleId, rightId, 0
  FROM public.rights;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION provision_new_user();