import { Kind } from '../enums';
import { Track } from './track';
import { UserShort } from './user';

export interface Playlist {
  kind: Kind.Playlist;
  id: number;
  created_at: string;
  user_id: number;
  last_modified: string;
  sharing: string;
  tag_list: string;
  permalink: string;
  purchase_url: string;
  label_id: null;
  type: null | string;
  playlist_type: null | string;
  ean: null | string;
  description: string;
  genre: string;
  release: null | string;
  purchase_title: string;
  label_name: null | string;
  title: string;
  release_year: number | null;
  release_month: number | null;
  release_day: number | null;
  license: string;
  uri: string;
  permalink_url: string;
  artwork_url: string;
  user: UserShort;
  track_count: number;
  streamable: boolean;
  downloadable: boolean | null;
  embeddable_by: string;
  tracks_uri: string;
  duration: number;
  tracks: Track[];
}
