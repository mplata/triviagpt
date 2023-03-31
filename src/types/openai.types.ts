export interface Answer {
  t: string;
}

export interface Question {
  t: string;
  ca: number;
  ct: string;
  a: Answer[];
};

export interface Category {
  name: string,
};