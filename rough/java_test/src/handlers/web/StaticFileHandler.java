package com.surenderthakran.handlers.web;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.StringTokenizer;

import com.surenderthakran.constants.ServerConstants;

public class StaticFileHandler {
  public static void handle(BufferedReader in, PrintWriter out, BufferedOutputStream dataOut) {
    String fileRequested = null;

    try {
      // get first line of the request from the client
			String input = in.readLine();
      System.out.println("input: " + input);
			// we parse the request with a string tokenizer
			StringTokenizer parse = new StringTokenizer(input);
			String method = parse.nextToken().toUpperCase(); // we get the HTTP method of the client
			// we get file requested
			fileRequested = parse.nextToken().toLowerCase();

			// we support only GET and HEAD methods, we check
			if (!method.equals("GET")  &&  !method.equals("HEAD")) {
				if (ServerConstants.LOGGING_VERBOSE) {
					System.out.println("501 Not Implemented : " + method + " method.");
				}

				// we return the not supported file to the client
				File file = new File(ServerConstants.WEB_ROOT, ServerConstants.METHOD_NOT_SUPPORTED);
				int fileLength = (int) file.length();
				String contentMimeType = "text/html";
				//read content to return to client
				byte[] fileData = readFileData(file, fileLength);

				// we send HTTP Headers with data to client
				out.println("HTTP/1.1 501 Not Implemented");
				out.println("Server: Java HTTP Server : 1.0");
				out.println("Date: " + new Date());
				out.println("Content-type: " + contentMimeType);
				out.println("Content-length: " + fileLength);
				out.println(); // blank line between headers and content, very important !
				out.flush(); // flush character output stream buffer
				// file
				dataOut.write(fileData, 0, fileLength);
				dataOut.flush();

			} else {
				// GET or HEAD method
				if (fileRequested.endsWith("/")) {
					fileRequested += ServerConstants.DEFAULT_FILE;
				}

				File file = new File(ServerConstants.WEB_ROOT, fileRequested);
				int fileLength = (int) file.length();
				String content = getContentType(fileRequested);

				if (method.equals("GET")) { // GET method so we return content
					byte[] fileData = readFileData(file, fileLength);

					// send HTTP Headers
					out.println("HTTP/1.1 200 OK");
					out.println("Server: Java HTTP Server : 1.0");
					out.println("Date: " + new Date());
					out.println("Content-type: " + content);
					out.println("Content-length: " + fileLength);
					out.println(); // blank line between headers and content, very important !
					out.flush(); // flush character output stream buffer

					dataOut.write(fileData, 0, fileLength);
					dataOut.flush();
				}

				if (ServerConstants.LOGGING_VERBOSE) {
					System.out.println("File " + fileRequested + " of type " + content + " returned");
				}
      }
    } catch (FileNotFoundException fnfe) {
      try {
				fileNotFound(out, dataOut, fileRequested);
			} catch (IOException ioe) {
				System.err.println("Error with file not found exception : " + ioe.getMessage());
			}
    } catch (IOException ioe) {
			System.err.println("Server error : " + ioe);
		}
  }

  private static byte[] readFileData(File file, int fileLength) throws IOException {
    System.out.println("inside readFileData() " + file.getAbsolutePath());
		FileInputStream fileIn = null;
		byte[] fileData = new byte[fileLength];

		try {
			fileIn = new FileInputStream(file);
			fileIn.read(fileData);
		} finally {
			if (fileIn != null)
				fileIn.close();
		}

		return fileData;
	}

	// return supported MIME Types
	private static String getContentType(String fileRequested) {
		if (fileRequested.endsWith(".htm")  ||  fileRequested.endsWith(".html"))
			return "text/html";
		else
			return "text/plain";
	}

	private static void fileNotFound(PrintWriter out, OutputStream dataOut, String fileRequested) throws IOException {
		File file = new File(ServerConstants.WEB_ROOT, ServerConstants.FILE_NOT_FOUND);
		int fileLength = (int) file.length();
		String content = "text/html";
		byte[] fileData = readFileData(file, fileLength);

		out.println("HTTP/1.1 404 File Not Found");
		out.println("Server: Java HTTP Server from SSaurel : 1.0");
		out.println("Date: " + new Date());
		out.println("Content-type: " + content);
		out.println("Content-length: " + fileLength);
		out.println(); // blank line between headers and content, very important !
		out.flush(); // flush character output stream buffer

		dataOut.write(fileData, 0, fileLength);
		dataOut.flush();

		if (ServerConstants.LOGGING_VERBOSE) {
			System.out.println("File " + fileRequested + " not found");
		}
	}
}
