// chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            content:
                "👋 Hi there! I’m your expert mechanic assistant — ask me anything about cars, engines, maintenance, or upgrades",
            timestamp: new Date()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    const chatRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    const sendMessage = async () => {
        if (!userInput.trim()) {
            setError('⚠ Please enter a message.');
            return;
        }

        setError(null);
        setIsLoading(true);

        const newUserMessage = {
            role: 'user',
            content: userInput,
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, newUserMessage]);
        const currentInput = userInput;
        setUserInput('');

        try {
            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization:
                            'Bearer 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',
                        'HTTP-Referer': 'https://wordpress.com/',
                        'X-Title': 'Wordpress',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'google/gemini-2.0-flash-exp:free',
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'text',
                                        text: currentInput
                                    }
                                ]
                            }
                        ],
                        max_tokens: 70,
                        // temperature: 0.7
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${ response.status }`);
            }

            const data = await response.json();
            const aiResponse =
                data.choices?.[0]?.message?.content ||
                "Sorry, I couldn't generate a response.";

            const newBotMessage = {
                role: 'bot',
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error('Error:', error);
            setError(
               ` Error: ${ error.message }.Please check your internet connection and API key.`
      );
        } finally {
            setIsLoading(false);
        }
    };

    // Optional: Speak bot messages (remove if not needed)
    const textToSpeech = (text) => {
        if (!window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'bot') {
                textToSpeech(lastMessage.content);
            }
        }
    }, [messages]);

    return (
        <>
            {/* Chat Popup */}
            <div
                className={`fixed bottom-24 right-5 z-50 shadow-xl bg-white rounded-2xl h-[500px] w-[350px] flex flex-col justify-between ${isChatOpen ? 'flex' : 'hidden'
                    }`}
            >
                <button
                    className="close py-2 bg-gray-900 text-white rounded-t-2xl text-sm"
                    onClick={() => setIsChatOpen(false)}
                >
                    <X className="w-4 h-4 mx-auto" />
                </button>

                <div
                    className="chat flex-1 p-3 overflow-y-auto flex flex-col gap-2"
                    ref={chatRef}
                >
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`${message.role === 'user' ? 'flex justify-end' : ''
                                } ${message.role === 'error' ? 'justify-center' : ''}`}
                        >
                            <p
                                className={`
                rounded-2xl text-sm p-3 max-w-[80%]
                ${message.role === 'bot' ? 'bg-gray-100' : ''}
                ${message.role === 'user' ? 'bg-blue-500 text-white' : ''}
                ${message.role === 'error' ? 'bg-red-100 text-red-700 text-center' : ''}
              `}
                            >
                                {message.content}
                            </p>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="loader-container flex justify-start">
                            <div className="loader w-10 opacity-40 aspect-w-4 aspect-h-1 bg-gradient-to-r from-black via-gray-400 to-black bg-[length:33%_100%] bg-no-repeat animate-pulse"></div>
                        </div>
                    )}
                </div>

                <div className="input-area h-16 flex justify-center items-center p-2 border-t border-gray-300">
                    <input
                        ref={inputRef}
                        className="h-10 flex-1 border-none bg-gray-100 rounded-2xl pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-70"
                        placeholder="Ask me anything..."
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                    />
                    <button
                        className="send-btn h-10 w-10 rounded-full border-none ml-2 bg-blue-500 text-white flex justify-center items-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-md transition-shadow"
                        onClick={sendMessage}
                        disabled={isLoading}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Floating Chat Button */}
            <div
                className="chat-button fixed bottom-5 right-5 z-40 bg-gray-900 text-white w-14 h-14 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                onClick={() => setIsChatOpen(true)}
            >
                <MessageCircle className="w-7 h-7" />
            </div>
        </>
    );
};

export default Chatbot;