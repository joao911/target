import { randomUUID } from "expo-crypto";
import { useSQLiteContext } from "expo-sqlite";

export type TransactionCreate = {
  target_id: number;
  amount: number;
  observation?: string;
};

export type TransactionResponse = {
  id: number;
  target_id: number;
  amount: number;
  observation?: string;
  created_at: Date;
  updated_at: Date;
};

export function useTransactionsDatabase() {
  const database = useSQLiteContext();

  async function create(data: TransactionCreate) {
    const statement = await database.prepareAsync(`
        INSERT INTO transactions
          (id, target_id, amount, observation)
        VALUES
          ($id, $target_id, $amount, $observation)
      `);

    try {
      await statement.executeAsync({
        $id: randomUUID(),
        $target_id: data.target_id,
        $amount: data.amount,
        $observation: data.observation ?? null,
      });
    } finally {
      await statement.finalizeAsync();
    }
  }

  function listById(id: string) {
    return database.getAllAsync<TransactionResponse>(`
      SELECT id, target_id, amount, observation, created_at, updated_at FROM transactions WHERE target_id = ${id} ORDER BY created_at DESC
      `);
  }

  async function remove(id: string) {
    const statement = await database.prepareAsync(`
      DELETE FROM transactions WHERE id = $id
    `);

    try {
      await statement.executeAsync({
        $id: id,
      });
    } finally {
      await statement.finalizeAsync();
    }
  }

  return { create, listById, remove };
}
