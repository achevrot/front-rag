import { useState, useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
const fileIcon = require('../asset/resource/File_image.png');


export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null); // New state for uploaded file
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleSendMessage = () => {
        if (inputValue.trim() || uploadedFile) {
            const newMessages = [...messages, { text: inputValue, sender: 'user', file: uploadedFile }];
            setMessages(newMessages);
            setInputValue('');
            setUploadedFile(null); // Clear the uploaded file after sending

            // Simulate chatbot response
            setTimeout(() => {
                setMessages([...newMessages, { text: 'Hello! How can I help you?', sender: 'bot' }]);
            }, 500);
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setUploadedFile(file); // Set the uploaded file state
        } else {
            alert('Please select a PDF file.');
        }
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        adjustTextareaHeight();
    }, [inputValue]);

    return (
        <div className="flex flex-col items-center justify-between h-full w-full bg-gray-900 text-white">
            <header className="w-full p-5 bg-gray-900 text-left text-4xl font-bold">
                Rag Chat
            </header>
            <div className="flex flex-col h-4/5 w-3/4 bg-gray-900 rounded-lg">
                <div className="flex flex-col overflow-y-auto h-full p-4">
                    {messages.map((message, index) => (
                        <MessageBubble
                            key={index}
                            message={message.text}
                            sender={message.sender}
                            file={message.file} // Pass the file to MessageBubble
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <MessageInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleSendMessage={handleSendMessage}
                handleFileUpload={handleFileUpload}
                uploadedFile={uploadedFile}
                fileInputRef={fileInputRef}
                textareaRef={textareaRef}
                handleKeyPress={handleKeyPress}
                fileIcon={fileIcon}
            />
        </div>
    );
}