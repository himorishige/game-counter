export type CounterList = {
  uid: string;
  userId: string;
  timestamp: string;
  flag: string;
};

export type LogList = {
  userId: string;
  timestamp: string;
  totalTime: string;
};

export type QueryParams = {
  name: string;
  timestamp: string;
  endtimestamp: string;
};

export type QueryParams2 = {
  name: string;
  timestamp: string;
};
