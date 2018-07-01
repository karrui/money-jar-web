export default interface Jar {
  createdAt: Date;
  currentAmount: number;
  goalAmount: number;
  id: string;
  lastUpdated: Date;
  name: string;
  owner: string;
  history: JarHistory[];
}

interface JarHistory {
  amount: number;
  createdAt: Date;
  notes: string;
  type: string;
  userId: string;
  username: string;
}
