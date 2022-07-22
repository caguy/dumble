export interface User {
  name: string | null;
  isConnected: boolean;
  onlinePlayers: {
    username: string;
  }[];
}
