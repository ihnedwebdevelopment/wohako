// Ukázkové 3D studie. Jsou nezávislé na fotkách a realizacích v administraci.
export type ModelKey = 'compact' | 'walkin' | 'kitchen';
export type MaterialKey = 'original' | 'light' | 'dark';
export type ViewKey = 'perspective' | 'top' | 'front';

export const models: { id: ModelKey; name: string; materials: string }[] = [
  { id: 'compact', name: 'Kompaktní koupelna', materials: 'Sprcha · dřevo · šedý kámen' },
  { id: 'walkin', name: 'Walk-in koupelna', materials: 'Sklo · světlé obklady' },
  { id: 'kitchen', name: 'Kuchyně do L', materials: 'Bílá · dřevěná pracovní deska' }
];

export const materialOptions: { id: MaterialKey; label: string }[] = [
  { id: 'original', label: 'Výchozí' },
  { id: 'light', label: 'Světlý' },
  { id: 'dark', label: 'Tmavý' }
];

export const viewOptions: { id: ViewKey; label: string }[] = [
  { id: 'perspective', label: 'Perspektiva' },
  { id: 'top', label: 'Půdorys' },
  { id: 'front', label: 'Zepředu' }
];
