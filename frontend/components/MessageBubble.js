export default function MessageBubble({ message, sender }) {
    const bubbleClass = sender === 'user'
        ? 'bg-blue-500 text-white self-end mr-4'
        : 'bg-gray-700 text-white self-start ml-4';

    return (
        <div className={`p-4 rounded-lg max-w-xl ${bubbleClass}`}>
            {message}
        </div>
    );
}