import java.util.HashMap;
import java.util.Map;

public class MinStepsToOne_TopDown {
  public static void main(String[] args) {
    int n = 10;

    if (n == 1) {
      System.out.println(0);
      return;
    }
    Map<Integer, Integer> steps = new HashMap<>();
    System.out.println(findMinSteps(n, steps));
  }

  static int findMinSteps(int n, Map<Integer, Integer> steps) {
    if (n == 1) return 0;
    int divBy2 = Integer.MAX_VALUE;
    int divBy3 = Integer.MAX_VALUE;
    int sub1 = Integer.MAX_VALUE;

    if (n % 2 == 0) {
      int newN = n / 2;
      if (steps.containsKey(newN)) {
        divBy2 = steps.get(newN) + 1;
      } else {
        divBy2 = findMinSteps(newN, steps) + 1;
      }
    }

    if (n % 3 == 0) {
      int newN = n / 3;
      if (steps.containsKey(newN)) {
        divBy3 = steps.get(newN);
      } else {
        divBy3 = findMinSteps(newN, steps) + 1;
      }
    }

    int newN = n - 1;
    if (steps.containsKey(newN)) {
      sub1 = steps.get(newN) + 1;
    } else {
      sub1 = findMinSteps(newN, steps) + 1;
    }

    int min = Math.min(divBy2, Math.min(divBy3, sub1));
    steps.put(n, min);
    return min;
  }
}
