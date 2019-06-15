import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MaxSquaresFromArea {
  public static void main(String[] args) {
    // The input can be 1000000 at most.
    int[] answer = solution(15324);
    System.out.println(Arrays.toString(answer));
  }

  static int[] solution(int area) {
    List<Integer> squares = new ArrayList<>();

    while (area > 0) {
      if (area <= 3) {
        squares.add(1);
        area--;
        continue;
      }
      int sqrRoot = maxSquareRoot(area);
      int square = sqrRoot * sqrRoot;
      squares.add(square);
      area -= square;
    }

    int[] response = new int[squares.size()];
    for (int i = 0; i < squares.size(); i++) {
      response[i] = squares.get(i);
    }
    return response;
  }

  static int maxSquareRoot(int num) {
    // The minimum number we will get in this method is 4, hence the minimum square root we can get
    // is 2;
    int start = 2;

    // The max area is 1000000, hence the max square root is 1000;
    int end = 1000;

    // Since floor of square root of an integer can never be greater than the integer.
    if (end > num/2) end = num/2;

    while (start + 1 < end) {
      int mid = ((end - start) / 2) + start;
      if (mid * mid == num) return mid;
      if (mid * mid < num) {
        start = mid;
      } else {
        end = mid - 1;
      }
    }

    if (end * end < num) return end;
    return start;
  }
}
