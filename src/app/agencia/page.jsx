'use client';
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from 'next/dynamic';

const CalendarWithNoSSR = dynamic(() => import('./CalendarComponent'), { ssr: false });
const KanbanWithNoSSR = dynamic(() => import('./KanbanComponent'), { ssr: false });

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const [clients, setClients] = useState([]);
  const [statuses, setStatuses] = useState(["urgente", "em andamento", "completo"]);
  const allPosts = clients.flatMap(client =>
    client.posts.map(post => ({ ...post, client: client.name }))
  );

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="semanal">
        <TabsList>
          <TabsTrigger value="semanal">Semanal</TabsTrigger>
          <TabsTrigger value="kanban">Kanban</TabsTrigger>
        </TabsList>

        <TabsContent value="semanal">
          <CalendarWithNoSSR allPosts={allPosts} />
        </TabsContent>

        <TabsContent value="kanban">
          <KanbanWithNoSSR
            allPosts={allPosts}
            clients={clients}
            setClients={setClients}
            statuses={statuses}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
