# 1/abr/19
# This problem was asked by Uber.
#
# Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
#
# For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
#
# Follow-up: what if you can't use division?
class Solution
  # with multiplication

  def run(lis)
    @lis = lis

    all_product = @lis.reduce(:*)
    @lis.map { |x| all_product / x }
  end
end

class Solution2
  # without multiplication

  def run(lis)
    @lis = lis
    @n = @lis.length
    @lis << @lis.first unless @n.even?
    @lis.each_slice(2) { |e| e[0] * e[1] }
  end

  private

  # def memonized_multiply(a, b)
  #   @memonized_hash ||= {}
  #   if a < b
  #     first, second = a, b
  #   else
  #     first, second = b, a
  #   end
  #   @memonized_hash[first] ||= {}
  #   val = @memonized_hash[first][second]
  #   return val if val
  #   val = first * second
  #   @memonized_hash[first][b] = val
  #   val
  # end
end

class Solution3
  # without multiplication

  def run(lis)
    prepare_lists(lis)
    res = []
    (0...lis.length).each do |i|
      res << compute_index(i)
    end
    res
  end

  def compute_index(i)
    # puts "i: #{i}"
    # find level 1
    e = i + 1
    first_prod = if e.even?
                   e - 1
                 else
                   e + 1
    end - 1
    # puts "first_prod: #{first_prod}"

    # find level 2
    second_bin_to_exclude = i / 2
    # puts "second_bin_to_exclude: #{second_bin_to_exclude}"
    product = 1
    @lists_vector[1].each_with_index do |ele, index|
      next if index == second_bin_to_exclude

      product *= ele
    end
    product * @lists_vector[0][first_prod]
  end

  private

  def prepare_lists(lis)
    @lists_vector = []
    @lists_lengths_vector = []

    first_level = lis
    # puts "first_level: #{first_level}"
    @lists_vector << first_level
    @lists_lengths_vector << first_level.length

    second_level = pairs_product(first_level)
    # puts "second_level: #{second_level}"
    @lists_vector << second_level
    @lists_lengths_vector << second_level.length
    # puts @lists_vector.to_s, @lists_lengths_vector.to_s
  end

  def pairs_product(lis)
    n = lis.length
    lis << lis.first unless n.even?
    new_list = []
    lis.each_slice(2) { |e| new_list << e[0] * e[1] }
    new_list
  end
end

lis = [1, 2, 3, 4, 5, 6]

sol1 = Solution.new
puts sol1.run(lis).to_s

sol = Solution3.new

puts sol.run(lis).to_s
# for i in (0...lis.length)
# sol.compute_index(i)
# end
