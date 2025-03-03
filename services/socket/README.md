# Socket Service Architecture

This directory contains the modular socket service implementation for the Game Lobby Web application. The architecture is designed to provide a clean separation of concerns, improved maintainability, and extensibility for socket-based communication.

## Overview

The socket service architecture follows a modular approach with specialized services for different domains:

```
                    ┌───────────────────┐
                    │  SocketService    │
                    └─────────┬─────────┘
                              │
         ┌────────────────────┼─────────────────────┐
         │                    │                     │
┌────────▼─────────┐ ┌────────▼─────────┐ ┌─────────▼────────┐
│ RoomSocketService│ │ ChatSocketService│ │ GameSocketService│
└──────────────────┘ └──────────────────┘ └──────────────────┘
         │                    │                     │
         └────────────────────┼─────────────────────┘
                              │
                     ┌────────▼────────┐
                     │ BaseSocketService│
                     └─────────────────┘
```

## Key Components

### BaseSocketService

The `BaseSocketService` provides the core functionality for socket event handling, including:

- Socket instance management
- Event registration and cleanup
- Type-safe event listening
- Resource disposal

### SocketService

The `SocketService` is the main entry point for socket operations, providing:

- Central coordination for all specialized socket services
- Socket connection lifecycle management
- Access to domain-specific socket services
- Global socket event handling (connect/disconnect)

### Specialized Socket Services

#### RoomSocketService

Handles room-related socket operations:

- Joining/leaving rooms
- Player ready status
- Host changes
- Game start/end events

#### ChatSocketService

Manages chat-specific operations:

- Sending messages
- Joining/leaving chat rooms

#### GameSocketService

Handles game lifecycle events:

- Game-specific event registration
- Custom game event handling

## Usage

The socket services are designed to be used through specialized hooks:

```typescript
// Access the main socket service
const { socketService } = useSocketCore();

// Access specialized services
const roomService = useRoomService();
const chatService = useChatroomService();

// Example: Listen for room events
useEffect(() => {
  const handlePlayerJoin = (player) => {
    console.log(`Player joined: ${player.name}`);
  };

  roomService.onPlayerJoin(handlePlayerJoin);

  return () => {
    roomService.offPlayerJoin(handlePlayerJoin);
  };
}, [roomService]);
```

## Design Principles

1. **Separation of Concerns**: Each service handles a specific domain of socket operations.
2. **Type Safety**: All event handlers and payloads are strongly typed.
3. **Resource Management**: Proper cleanup of event listeners to prevent memory leaks.
4. **Extensibility**: Easy to add new specialized services or extend existing ones.
5. **Backward Compatibility**: Maintains compatibility with existing code.

## Future Considerations

- Add more specialized game event handlers
- Create more granular service interfaces
- Implement more robust error handling
- Add comprehensive logging for socket events
