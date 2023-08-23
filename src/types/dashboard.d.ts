interface StatistikDashboard {
  minCosts: PayloadStat;
  maxCosts: PayloadStat;
  totalCosts: number;
  avgCosts: number;
  count: number;
  year: number;
}
interface ProgressDashboard {
  month: string;
  count: number;
  costs: number;
  progress: ProgressType[];
}

type PayloadStat = {
  id: number;
  name: string;
  costs: number;
  target: Date;
};

type ProgressType = {
  id: number;
  name: string;
  costs: number;
  progress: number;
};

type PayloadFetchDashboard = {
  statistic: StatistikDashboard;
  progress: ProgressDashboard[];
};
