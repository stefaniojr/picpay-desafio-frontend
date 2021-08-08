import { SafeResourceUrl } from "@angular/platform-browser";

export interface Tasks {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: SafeResourceUrl;
  isPayed: boolean;
}
