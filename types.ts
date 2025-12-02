import { LucideIcon } from 'lucide-react';
import React from 'react';

export enum ToolCategory {
  MATH = 'Math & Finance',
  CONVERTERS = 'Converters',
  HEALTH = 'Health & Daily',
  DEV = 'Developer & Text',
  DESIGN = 'Web Design & Graphics',
  PDF = 'PDF Tools',
}

export interface ToolDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  category: ToolCategory;
  component: React.FC;
}