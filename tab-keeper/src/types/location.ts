export interface Location {
  id: string;
  name: string;
  address: string;
  place_id: string;
  photo_url?: string;
  created_at: string;
  created_by: string;
  created_by_name: string;
}

export interface Vote {
  id: string;
  location_id: string;
  user_id: string;
  user_name: string;
  vote: 'yes' | 'no';
  created_at: string;
}

export interface LocationWithVotes extends Location {
  votes?: Vote[];
  yesCount?: number;
  noCount?: number;
  userVote?: 'yes' | 'no' | null;
}