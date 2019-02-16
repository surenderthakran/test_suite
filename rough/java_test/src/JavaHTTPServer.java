package com.surenderthakran;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
import java.util.StringTokenizer;

import com.surenderthakran.constants.ServerConstants;

// Each Client Connection will be managed in a dedicated Thread
public class JavaHTTPServer implements Runnable{

	// Client Connection via Socket Class
	private Socket connect;

	public JavaHTTPServer(Socket c) {
		connect = c;
	}

	public static void main(String[] args) {
		try {
			ServerSocket serverConnect = new ServerSocket(ServerConstants.PORT);
			System.out.println("Server started.\nListening for connections on port : " + ServerConstants.PORT + " ...\n");

			// we listen until user halts server execution
			while (true) {
				JavaHTTPServer myServer = new JavaHTTPServer(serverConnect.accept());

				if (ServerConstants.verbose) {
					System.out.println("Connection opened. (" + new Date() + ")");
				}

				// create dedicated thread to manage the client connection
				Thread thread = new Thread(myServer);
				thread.start();
			}

		} catch (IOException e) {
			System.err.println("Server Connection error : " + e.getMessage());
		}
	}

	@Override
	public void run() {
    System.out.println("inside run()");
		// we manage our particular client connection
		BufferedReader in = null; PrintWriter out = null; BufferedOutputStream dataOut = null;
		String fileRequested = null;

		try {
			// we read characters from the client via input stream on the socket
			in = new BufferedReader(new InputStreamReader(connect.getInputStream()));
			// we get character output stream to client (for headers)
			out = new PrintWriter(connect.getOutputStream());
			// get binary output stream to client (for requested data)
			dataOut = new BufferedOutputStream(connect.getOutputStream());

			// get first line of the request from the client
			String input = in.readLine();
      System.out.println("input: " + input);
			// we parse the request with a string tokenizer
			StringTokenizer parse = new StringTokenizer(input);
			String method = parse.nextToken().toUpperCase(); // we get the HTTP method of the client
      System.out.println("method: " + method);
			// we get file requested
			fileRequested = parse.nextToken().toLowerCase();
      System.out.println("fileRequested: " + fileRequested);

			// we support only GET and HEAD methods, we check
			if (!method.equals("GET")  &&  !method.equals("HEAD")) {
        System.out.println("Method not supported");
				if (ServerConstants.verbose) {
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
        System.out.println("Method supported");
				// GET or HEAD method
				if (fileRequested.endsWith("/")) {
					fileRequested += ServerConstants.DEFAULT_FILE;
				}
        System.out.println("fileRequested: " + fileRequested);

				File file = new File(ServerConstants.WEB_ROOT, fileRequested);
				int fileLength = (int) file.length();
				String content = getContentType(fileRequested);

				if (method.equals("GET")) { // GET method so we return content
          System.out.println("GET method");
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

				if (ServerConstants.verbose) {
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
		} finally {
			try {
				in.close();
				out.close();
				dataOut.close();
				connect.close(); // we close socket connection
			} catch (Exception e) {
				System.err.println("Error closing stream : " + e.getMessage());
			}

			if (ServerConstants.verbose) {
				System.out.println("Connection closed.\n");
			}
		}


	}

	private byte[] readFileData(File file, int fileLength) throws IOException {
    System.out.println("inside readFileData() " + file.getName() + " " + file.getAbsolutePath());
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
	private String getContentType(String fileRequested) {
    System.out.println("inside getContentType()");
		if (fileRequested.endsWith(".htm")  ||  fileRequested.endsWith(".html"))
			return "text/html";
		else
			return "text/plain";
	}

	private void fileNotFound(PrintWriter out, OutputStream dataOut, String fileRequested) throws IOException {
    System.out.println("inside fileNotFound()");
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

		if (ServerConstants.verbose) {
			System.out.println("File " + fileRequested + " not found");
		}
	}

}
