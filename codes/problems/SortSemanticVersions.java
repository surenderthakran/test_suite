import java.util.Arrays;

public class SortSemanticVersions {
  public static void main(String[] args) {
    String[] input1 = {"1.1.2", "1.0", "1.3.3", "1.0.12", "1.0.2"};
    String[] output1 = {"1.0", "1.0.2", "1.0.12", "1.1.2", "1.3.3"};

    String[] input2 = {"1.11", "2.0.0", "1.2", "2", "0.1", "1.2.1", "1.1.1", "2.0"};
    String[] output2 = {"0.1", "1.1.1", "1.2", "1.2.1", "1.11", "2", "2.0", "2.0.0"};

    String[][] testCases = {input1, output1, input2, output2};

    for (int i = 0; i < testCases.length-1; i += 2) {
      String[] response = sortVersion(testCases[0]);

      if (Arrays.equals(testCases[1], response)) {
        System.out.println("pass");
      } else {
        System.out.println("FAIL");
      }
    }
  }

  static String[] sortVersion(String[] versions) {
    return versions;
  }
}
