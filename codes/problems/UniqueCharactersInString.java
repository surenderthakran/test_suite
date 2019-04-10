import java.util.HashSet;

class UniqueCharactersInString {
  public static void main(String[] args) {
    assert areAllCharactersUnique("abcdef") == true;
    assert areAllCharactersUnique("abbcdef") == false;
  }

  private static boolean areAllCharactersUnique(String str) {
    HashSet<Character> charSet = new HashSet<>();

    for (int i = 0; i < str.length(); i++) {
      if (charSet.contains(str.charAt(i))) {
        return false;
      }
      charSet.add(str.charAt(i));
    }

    return true;
  }
}
