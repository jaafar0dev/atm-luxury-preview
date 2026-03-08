
-- The WITH CHECK (true) policies on inquiries, messages, and consultations are intentional
-- since public users need to submit contact forms and inquiries.
-- Adding rate limiting isn't possible via RLS, but we ensure the policies only allow INSERT, not SELECT/UPDATE/DELETE.
-- The existing policies already correctly restrict SELECT/UPDATE/DELETE to admins only.
-- No changes needed - the warnings are expected for public form submissions.
SELECT 1;
