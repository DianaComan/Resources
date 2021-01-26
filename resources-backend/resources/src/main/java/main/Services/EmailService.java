package main.Services;

public interface EmailService {
    public void sendMessage(String to, String subject, String text);
}
