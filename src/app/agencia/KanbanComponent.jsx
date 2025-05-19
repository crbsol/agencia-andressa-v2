'use client';
import { Card, CardContent } from '../../components/ui/card';
import { Kanban } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function KanbanComponent({ allPosts, clients, setClients, statuses }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Kanban size={20} /> Kanban de Postagens
        </h2>
        <DragDropContext
          onDragEnd={(result) => {
            if (!result.destination) return;
            const updatedClients = [...clients];
            const postId = result.draggableId;
            for (let client of updatedClients) {
              const post = client.posts.find((p, i) => `${client.name}-${i}` === postId);
              if (post) {
                post.status = result.destination.droppableId;
                break;
              }
            }
            setClients(updatedClients);
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {statuses.map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="bg-gray-100 p-3 rounded shadow min-h-[200px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h3 className="text-lg font-semibold mb-2 capitalize">{status}</h3>
                    {allPosts
                      .filter(post => post.status === status)
                      .map((post, index) => (
                        <Draggable draggableId={`${post.client}-${index}`} index={index} key={`${post.client}-${index}`}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-2 mb-2 rounded border"
                            >
                              <p className="text-sm font-semibold">{post.date} - {post.client}</p>
                              <p>{post.content}</p>
                              <p className="text-xs text-muted-foreground">{post.strategy}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}
