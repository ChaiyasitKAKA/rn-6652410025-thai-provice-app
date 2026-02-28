// type.ts
export type Sakonnaja = {
  id: string;
  name: string;
  category?: string;
  address: string;
  description: string;
  latitude: number;
  longitude: number;
  image_url: string;
  phone: string | null;
};

export interface Highlight {
  id: number | string;
  name: string;
  date: string;
  description: string;
  image_url: string;
}
