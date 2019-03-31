defmodule Algorithms.MixProject do
  use Mix.Project

  def project do
    [
      app: :algorithms,
      version: "0.1.0",
      elixir: "~> 1.7",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  defp deps do
    [
      {:credo, "~> 1.0.0", only: [:dev, :test], runtime: false}
    ]
  end
end
