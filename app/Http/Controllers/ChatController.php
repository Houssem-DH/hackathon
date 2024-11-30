<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Chat;
use App\Models\Message;


use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function getOrCreateChatSession($userId)
    {


        $currentUserId = Auth::user()->id;

        // Find existing chat or create a new one if it doesn't exist
        $chat = Chat::where(function ($query) use ($currentUserId, $userId) {
            $query->where('user_one_id', $currentUserId)
                ->where('user_two_id', $userId);
        })->orWhere(function ($query) use ($currentUserId, $userId) {
            $query->where('user_one_id', $userId)
                ->where('user_two_id', $currentUserId);
        })->first();





        if (!$chat) {
            $chat = Chat::create([
                'user_one_id' => $currentUserId,
                'user_two_id' => $userId,
            ]);
        }

        return response()->json(['chatId' => $chat->id]);
    }



    public function getChatSession()
    {
        $currentUserId = Auth::user()->id;

        // Find existing chat or create a new one if it doesn't exist
        $chat = Chat::where('user_one_id', $currentUserId)
            ->orWhere('user_two_id', $currentUserId)
            ->first();

        if ($chat) {
            // Get the timestamp of the latest message in the chat
            $latestMessage = Message::where('chat_id', $chat->id)
                ->latest('created_at')
                ->first();

            // If there is a latest message, get its timestamp
            $lastMessageTimestamp = $latestMessage ? $latestMessage->created_at : null;

            // Get the new messages since the last timestamp
            $newMessages = Message::where('chat_id', $chat->id)
                ->where('created_at', '>', $lastMessageTimestamp)
                ->get();

            // Return the chat ID if new messages exist
            if ($newMessages->count() > 0) {
                return response()->json(['chatId' => $chat->id]);
            }

            // Return the chat ID if no new messages are found
            return response()->json(['chatId' => $chat->id]);
        }

        // Handle the case where no chat is found (create a new one if needed)
        return response()->json(['error' => 'No chat session found'], 404);
    }

}
