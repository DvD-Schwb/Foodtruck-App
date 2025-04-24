export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: "produzent" | "verkaeufer" | "chef";
          name: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: "produzent" | "verkaeufer" | "chef";
          name: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: "produzent" | "verkaeufer" | "chef";
          name?: string;
        };
      };
      // Weitere Tabellen hier definieren
    };
  };
};
