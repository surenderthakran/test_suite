import java.time.Instant;
import java.util.HashMap;

class JavaTest {
  public static void main(String[] args) {
    System.out.println("Hello World!");

    HashMap<String, Integer> hashMap = new HashMap<String, Integer>();

    Instant start = Instant.now();

    for (int i = 0; i < 10000000; i++) {
      hashMap.put(Integer.toString(i), i);
    }

    Instant end = Instant.now();
    System.out.println(start);
    System.out.println(end);

    // hashMap.put(null, null);

    System.out.println(String.format("Size of hashMap is: %d", hashMap.size()));

    // System.out.println(String.format("Value of key: %s is %d", "99999", hashMap.get("99999")))
  }
}
