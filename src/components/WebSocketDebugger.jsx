import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { WebSocketContext } from "../context/WebSocketContext"; // 경로는 실제 위치에 맞게 수정

const WebSocketDebugger = () => {
  const { sendMessage, markAtRead, subscribe } = useContext(WebSocketContext);
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState("test-room");
  const [message, setMessage] = useState("Hello from debugger!");

  useEffect(() => {
    // 연결 상태를 주기적으로 체크
    const interval = setInterval(() => {
      const connected = !!window?.stompClient?.connected;
      setIsConnected(connected);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 메시지 수신 테스트
  useEffect(() => {
    const unsub = subscribe(
      roomId,
      (msg) => {
        console.log("📩 수신된 메시지:", msg);
      },
      (readStatus) => {
        console.log("📖 읽음 상태 수신:", readStatus);
      }
    );

    return () => {
      unsub?.();
    };
  }, [roomId, subscribe]);

  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8, maxWidth: 500, margin: "20px auto" }}>
      <h3>🛠 WebSocket Debugger</h3>
      <p>상태: {isConnected ? "🟢 연결됨" : "🔴 끊김"}</p>

      <div style={{ margin: "10px 0" }}>
        <label>Room ID: </label>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Message: </label>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={() => {
            sendMessage({
              roomId,
              message,
              messageType: "TEXT",
            });
            console.log("📤 메시지 전송됨");
          }}
        >
          메시지 전송
        </button>

        <button
          onClick={() => {
            markAtRead(roomId);
            console.log("👁 읽음 처리 요청 전송됨");
          }}
        >
          읽음 처리
        </button>
      </div>
    </div>
  );
};

export default WebSocketDebugger;
