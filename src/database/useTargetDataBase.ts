import { useSQLiteContext } from "expo-sqlite";

export type ITargetCreate = {
  name: string;
  amount: number;
};

export type ITargetUpdate = ITargetCreate & {
  id: number;
};

export type ITargetResponse = {
  name: string;
  amount: number;
  id: number;
  current: number;
  percentage: number;
  created_at: Date;
  updated_at: Date;
};

export type ISummary = {
  input: number;
  output: number;
};

export function useTargetDataBase() {
  const dataBase = useSQLiteContext();

  async function create(data: ITargetCreate) {
    const statement = await dataBase.prepareAsync(
      "INSERT INTO targets (name, amount) VALUES ($name, $amount)",
    );

    statement.executeAsync({
      $name: data.name,
      $amount: data.amount,
    });
  }

  function listBySavedValue() {
    return dataBase.getAllAsync<ITargetResponse>(`
        SELECT
          targets.id,
          targets.name,
          targets.amount,
          COALESCE (SUM(transactions.amount), 0) AS current,
          COALESCE ((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
          targets.created_at,
          targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        GROUP BY targets.id, targets.name, targets.amount
        ORDER BY current DESC
      `);
  }

  function getByID(id: number) {
    return dataBase.getFirstAsync<ITargetResponse>(`
        SELECT
          targets.id,
          targets.name,
          targets.amount,
          COALESCE (SUM(transactions.amount), 0) AS current,
          COALESCE ((SUM(transactions.amount) / targets.amount) * 100, 0) AS percentage,
          targets.created_at,
          targets.updated_at
        FROM targets
        LEFT JOIN transactions ON targets.id = transactions.target_id
        WHERE targets.id = ${id}
      `);
  }

  async function updateById(data: ITargetUpdate) {
    const statement = await dataBase.prepareSync(`
    UPDATE targets SET 
     name = $name,
     amount = $amount,
     updated_at = CURRENT_TIMESTAMP
    WHERE id = $id
    `);
    statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $amount: data.amount,
    });
  }

  async function deleteById(id: number) {
    const statement = await dataBase.prepareSync(`
    DELETE FROM targets WHERE id = $id
    `);
    statement.executeAsync({
      $id: id,
    });
  }

  function resume() {
    return dataBase.getFirstAsync<ISummary>(`
    SELECT
      COALESCE(SUM(CASE WHEN amount > 0 THEN amount END), 0) AS input,
      COALESCE(SUM(CASE WHEN amount < 0 THEN amount END), 0) AS output
    FROM transactions
  `);
  }
  return {
    create,
    listBySavedValue,
    getByID,
    updateById,
    deleteById,
    resume,
  };
}
