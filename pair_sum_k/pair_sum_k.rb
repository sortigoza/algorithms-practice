class Solution
  def find(lis, k)
    @lis = lis
    @k = k
    @n = lis.length
    scan_matrix
  end

  private

  def build_result(i, j)
    { i: i, j: j, pair: [@lis[i], @lis[j]], sum: @lis[i] + @lis[j] }
  end

  def scan_matrix
    (0..@n - 2).each do |i|
      (i + 1..@n - 1).each do |j|
        res = do_check i, j
        return res if res.first
      end
    end
    [false, nil]
  end

  def do_check(i, j)
    res = build_result i, j
    puts res
    return true, res if res[:sum] == @k

    [false, nil]
  end
end

lis = [10, 15, 3, 7]
sol = Solution.new

puts "sol.find(lis, 17) => #{sol.find(lis, 17)}"
puts "sol.find(lis, 22) => #{sol.find(lis, 22)}"
puts "sol.find(lis, 100) => #{sol.find(lis, 100)}"
