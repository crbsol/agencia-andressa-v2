'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// ✅ Corrigir importações dos componentes de abas
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '../../components/ui/tabs';

// ✅ Corrigir caminho para o SocialMediaAgency
import SocialMediaAgency from '../../components/SocialMediaAgency';

// ✅ Importações dinâmicas (sem SSR) dos componentes de calendário e kanban
const CalendarWithNoSSR = dynamic(() => import('./CalendarComponent'), { ssr: false });
const KanbanWithNoSSR = dynamic(() => import('./KanbanComponent'), { ssr: false });

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState([]);
  const [statuses, setStatuses] = useState(['urgente', 'em andamento', 'completo']);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const allPosts = clients.flatMap(client =>
    (client.posts || []).map(post => ({ ...post, client: client.name }))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Define os dados simulados dos clientes */}
      <SocialMediaAgency setClients={setClients} />

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