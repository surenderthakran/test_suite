import java.util.Arrays;

public class SortSemanticVersions {
  public static void main(String[] args) {
    String[] input1 = {"1.1.2", "1.0", "1.3.3", "1.0.12", "1.0.2"};
    String[] output1 = {"1.0", "1.0.2", "1.0.12", "1.1.2", "1.3.3"};

    String[] response1 = sortVersion(input1);

    if (Arrays.equals(output1, response1)) {
      System.out.println("pass");
    } else {
      System.out.println("FAIL");
    }
  }

  static String[] sortVersion(String[] versions) {
    return versions;
  }
}
