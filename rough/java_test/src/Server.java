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
import com.surenderthakran.handlers.web.StaticFileHandler;

// Each Client Connection will be managed in a dedicated Thread
public class Server implements Runnable{

	// Client Connection via Socket Class
	private Socket connect;

	public Server(Socket c) {
		connect = c;
	}

	public static void main(String[] args) {
		try {
			ServerSocket serverConnect = new ServerSocket(ServerConstants.PORT);
			System.out.println("Server started.\nListening for connections on port : " + ServerConstants.PORT + " ...\n");

			// we listen until user halts server execution
			while (true) {
				Server myServer = new Server(serverConnect.accept());

				if (ServerConstants.LOGGING_VERBOSE) {
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
		// we manage our particular client connection
		BufferedReader in = null;
		PrintWriter out = null;
		BufferedOutputStream dataOut = null;

		try {
			// we read characters from the client via input stream on the socket
			in = new BufferedReader(new InputStreamReader(connect.getInputStream()));
			// we get character output stream to client (for headers)
			out = new PrintWriter(connect.getOutputStream());
			// get binary output stream to client (for requested data)
			dataOut = new BufferedOutputStream(connect.getOutputStream());

			// Mark the current position in the stream.
			in.mark(100000000);

			// Get first line of the request from the client.
			String input = in.readLine();
      System.out.println("Request: " + input);
			// Parse the request with a string tokenizer.
			StringTokenizer parse = new StringTokenizer(input);
			// Get the HTTP method of the request.
			String method = parse.nextToken().toUpperCase();
			// Get request path
			String requestPath = parse.nextToken().toLowerCase();

			// Reset stream to the last marked position.
			in.reset();

			if (requestPath.startsWith("/api/")) {
				// TODO(surenderthakran): Handle api calls.
			} else {
				StaticFileHandler.handle(in, out, dataOut);
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

			if (ServerConstants.LOGGING_VERBOSE) {
				System.out.println("Connection closed.\n");
			}
		}
	}
}
