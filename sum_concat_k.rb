# 29/mar/19
class Solution
  # use a dept first search approach

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

lis = [1, 2, 3]
sol = Solution.new

puts "sol.find(lis, 15) => #{sol.find(lis, 15)}" # true
puts "sol.find(lis, 4) => #{sol.find(lis, 4)}" # false
puts "sol.find(lis, 123) => #{sol.find(lis, 123)}" # true
puts "sol.find(lis, 6) => #{sol.find(lis, 6)}" # true
puts "sol.find(lis, 1000) => #{sol.find(lis, 1000)}" # false

lis2 = [1, 2, 3, 4, 5]
puts "sol.find(lis2, 12345) => #{sol.find(lis2, 12_345)}" # true
