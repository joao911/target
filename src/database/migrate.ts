import { parseRouteSegments } from "expo-router/build/getReactNavigationConfig";
import { type SQLiteDatabase } from "expo-sqlite";

export async function migrate(dataBase: SQLiteDatabase) {
  await dataBase.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS targets (
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        amount FLOAT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        
      );

      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT NOT NULL PRIMARY KEY,
        target_id INTEGER NOT NULL,
        amount FLOAT NOT NULL,
        observation TEXT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT fk_targets_transactions
          FOREIGN KEY (target_id)
          REFERENCES targets (id)
          ON DELETE CASCADE
          
      );
   `);
}
