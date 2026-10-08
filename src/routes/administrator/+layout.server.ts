import { isDbConfigured } from '../../lib/server/db';
import { isAdminConfigured } from '../../lib/server/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => ({
  admin: locals.admin,
  dbConfigured: isDbConfigured(),
  adminConfigured: isAdminConfigured()
});
