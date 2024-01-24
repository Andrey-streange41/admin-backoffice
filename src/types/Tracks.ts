export interface IInsertTrack {
  title: string;
  audio: string;
  picture: string;
  text: string;
}

export interface ITrack extends IInsertTrack {
  id: number;
  listens: number;
}
