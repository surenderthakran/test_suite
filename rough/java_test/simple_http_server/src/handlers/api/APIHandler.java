package com.surenderthakran.handlers.api;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.util.Date;

import com.surenderthakran.types.Stock;

public class APIHandler {
  public static void handle(BufferedReader in, PrintWriter out, BufferedOutputStream dataOut) {
    try {
      Gson gson = new GsonBuilder().setPrettyPrinting().create();

      Stock reliance = new Stock();
      reliance.stockId = "123";
      reliance.setSymbol("RELIANCE");
      reliance.title = "Reliance Industries Limited";

      String responseBody = gson.toJson(reliance);
      System.out.println(responseBody);

      // send HTTP Headers
      out.println("HTTP/1.1 200 OK");
      out.println("Server: Java HTTP Server : 1.0");
      out.println("Date: " + new Date());
      out.println("Content-type: application/json");
      out.println("Content-length: " + responseBody.length());
      out.println(); // blank line between headers and content, very important !
      out.flush(); // flush character output stream buffer

      dataOut.write(responseBody.getBytes(Charset.forName("UTF-8")));
      dataOut.flush();
    } catch (IOException ioe) {
			System.err.println("Server error : " + ioe);
		}
  }
}
