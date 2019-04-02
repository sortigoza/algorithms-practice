# 29/mar/19
require 'benchmark'
require 'minitest/autorun'

class Solution
  # use a dept first search approach - has some issues with some combinations

  def find(lis, k)
    @k = k
    # optional validations here: empty list, negative k
    list_first = lis.first
    list_rem = lis[1..-1]

    recurse list_first, list_rem
  end

  private

  def recurse(acc, lis, level = 1)
    list_first = lis.first
    list_rem =  lis[1..-1]

    return true if check_operation(
      acc, list_first, list_rem, level, 'op1'
    ) { |a, b| a + b }
    return true if check_operation(
      acc, list_first, list_rem, level, 'op2'
    ) { |a, b| "#{a}#{b}".to_i }

    false
  end

  def check_operation(acc, list_first, list_rem, level, _operation_name)
    res = yield(acc, list_first)

    return false if res > @k

    if list_rem.empty?
      return true if res == @k
    elsif recurse(res, list_rem, level + 1)
      return true
    end
    false
  end
end

class Solution2
  # use dynamic programming
  # 1234
  # 1 234
  # 12 34
  # 123 4
  # 1 23 4
  # 12 3 4
  # 1 2 3 4

  def find(lis, k)
    @k = k

    res = evaluate_combination([lis])
    return res if res == @k

    combinations lis
  end

  private

  def combinations(lis, e = 0, tail = []) # rubocop:disable Metrics/AbcSize
    return if e >= lis.length - 1

    parts = [lis[0..e], lis[e + 1..lis.length]]

    current_combination = parts + tail
    # puts current_combination.to_s
    res = evaluate_combination(current_combination)
    return res, current_combination if res == @k

    if parts.last.length == 1
      combinations(parts.first, 0, [parts.last] + tail)
    else
      combinations(lis, e + 1, tail)
    end
  end

  def evaluate_combination(combination)
    combination.inject(0) { |acc, val| acc + val.join('').to_i }
  end
end

class GenerateProblem
  def generate(n)
    lis = get_array n
    lis_with_sub_arrays = create_sub_arrays lis
    res = evaluate_combination(lis_with_sub_arrays)
    [lis_with_sub_arrays, res]
  end

  private

  def create_sub_arrays(lis)
    sub_arrays = []
    sub_arrays << lis.shift(rand(1...lis.length)) until lis.length <= 1
    sub_arrays
  end

  def get_array(n)
    Array.new(n) { rand(1...9) }
  end

  def evaluate_combination(combination)
    combination.inject(0) { |acc, val| acc + val.join('').to_i }
  end
end

class TestSolution < Minitest::Test
  def setup
    @sol = Solution2.new
  end

  def test_finds
    lis = [1, 2, 3]
    assert @sol.find(lis, 15), msg: '12 + 3 = 15'
    assert @sol.find(lis, 6), msg: '1 + 2 + 3 = 6'
    assert @sol.find(lis, 24), msg: '1 + 23 = 24'
    assert @sol.find(lis, 123), msg: '123'

    lis2 = [1, 2, 3, 4, 5]
    assert @sol.find(lis2, 12_345)
  end

  def test_not_finds
    lis = [1, 2, 3]

    assert !@sol.find(lis, 4)
    assert !@sol.find(lis, 7)
    assert !@sol.find(lis, 1000)
  end

  def test_finds_with_generator
    puts Benchmark.measure do
      generator = GenerateProblem.new
      10.times do |_n|
        lis, k = generator.generate(10_000)
        assert @sol.find(lis, k), msg: 'generated array = generated k'
      end
    end
  end
end
