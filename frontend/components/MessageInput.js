import React from 'react';
import Image from 'next/image'
const fileIcon = require('../asset/resource/File_image.png');

export default function MessageInput({
    inputValue,
    setInputValue,
    handleSendMessage,
    handleFileUpload,
    uploadedFile,
    fileInputRef,
    textareaRef,
    handleKeyPress,
    uploadIcon,
    fileIcon
}) {
    return (
        <div className="flex justify-center w-3/4 p-4">
            <div className="flex items-center justify-center w-full bg-gray-700 p-2 rounded">
                <button
                    className="mr-2 p-2 bg-gray-700 hover:bg-gray-800 rounded"
                    onClick={() => fileInputRef.current.click()}
                >
                    <Image src={fileIcon} alt="Upload" className="w-12 h-12" /> {/* Ensure this line is correct */}
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="application/pdf"
                    onChange={handleFileUpload}
                />
                <div className="flex-1 p-2 rounded bg-gray-800 text-white resize-none overflow-auto" style={{ minHeight: '3rem', maxHeight: '10rem' }}>
                    {uploadedFile && (
                        <div className="flex items-center mb-2">
                            <Image src={fileIcon} alt="PDF" className="w-12 h-12 mr-2" />
                            <span>{uploadedFile.name}</span>
                        </div>
                    )}
                    <textarea
                        ref={textareaRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full bg-transparent border-none outline-none"
                        rows="1"
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200"
                >
                    Send
                </button>
            </div>
        </div>
    );
}