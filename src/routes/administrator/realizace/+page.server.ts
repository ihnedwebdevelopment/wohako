import { deleteProject, loadSite, reorderProjects, saveProject } from '../../../lib/server/repo';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { projects, photos } = await loadSite();
  return { projects, photos: photos.map(({ id, thumb }) => ({ id, thumb })) };
};

const id = (form: FormData) => String(form.get('id') ?? '').slice(0, 100);

export const actions: Actions = {
  move: async ({ request }) => {
    const form = await request.formData();
    const { projects } = await loadSite();
    const ids = projects.map((project) => project.id);
    const index = ids.indexOf(id(form));
    const target = index + (form.get('direction') === 'up' ? -1 : 1);
    if (index < 0 || target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    await reorderProjects(ids);
  },
  toggle: async ({ request }) => {
    const form = await request.formData();
    const { projects } = await loadSite();
    const project = projects.find((item) => item.id === id(form));
    if (project) await saveProject({ ...project, published: !project.published });
  },
  delete: async ({ request }) => {
    const form = await request.formData();
    await deleteProject(id(form));
    return { deleted: true };
  }
};
