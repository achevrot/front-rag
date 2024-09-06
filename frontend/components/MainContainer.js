import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function MainContainer() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}