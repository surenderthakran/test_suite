package com.surenderthakran.constants;

import java.io.File;

public class ServerConstants {
  public static final File WEB_ROOT = new File("./web");
	public static final String DEFAULT_FILE = "index.html";
	public static final String FILE_NOT_FOUND = "404.html";
	public static final String METHOD_NOT_SUPPORTED = "not_supported.html";

  // port to listen connection
	public static final int PORT = 8080;

	// verbose mode
	public static final boolean verbose = true;
}
