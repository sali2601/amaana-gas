import { supabase } from "./supabase";

// Add new contact message
export const addContactMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: messageData.name,
          phone: messageData.phone,
          email: messageData.email,
          subject: messageData.subject,
          message: messageData.message
        }
      ]);
    
    if (error) throw error;
    console.log("Message sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

// Get all messages
export const getContactMessages = async () => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
  }
};