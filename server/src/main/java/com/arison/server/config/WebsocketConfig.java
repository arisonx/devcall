package com.arison.server.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebsocketConfig implements WebSocketMessageBrokerConfigurer {

   @Override
   public void registerStompEndpoints(StompEndpointRegistry registry) {

       registry.addEndpoint("/connect");
       registry.addEndpoint("/connect").withSockJS();

   }

   @Override
   public void configureMessageBroker(MessageBrokerRegistry registry) {

       registry.enableSimpleBroker(("/chat"));
       registry.setApplicationDestinationPrefixes("/app");

   }

}
