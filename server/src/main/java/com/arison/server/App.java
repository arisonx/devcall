package com.arison.server;

import com.arison.server.config.Msg;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class App {
    @MessageMapping("/chatMessage")
    @SendTo("/chat")

    public Msg sendMessage (Msg message){
        System.out.println(message);
        System.out.println(message.getUser());
        return message;
    }
}
