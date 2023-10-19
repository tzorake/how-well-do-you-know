export interface ILevels {
  title: string;
  levels: Array<ILevel>;
}

export interface ILevel {
  actual_answer: string;
  image: string;
  opened: Array<number>;
}
