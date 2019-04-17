#! elixir pair_sum_k.exs

defmodule Solution do
  def find(lis, k) do
    %{lis: lis, k: k, n: length(lis)} |> scan_matrix
  end

  defp scan_matrix(state) do
    for i <- 0..(state[:n] - 2), j <- (i + 1)..(state[:n] - 1) do
      build_item(state, i, j)
    end
    |> Enum.find(fn x -> x[:sum] == state[:k] end)
  end

  defp build_item(state, i, j) do
    pair = Enum.map([i, j], fn x -> Enum.at(state[:lis], x) end)
    %{i: i, j: j, pair: pair, sum: Enum.sum(pair)}
  end
end

[10, 15, 3, 7]
|> Solution.find(17)
# credo:disable-for-next-line
|> IO.inspect(charlists: :as_lists)
