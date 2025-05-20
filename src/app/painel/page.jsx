'use client';
import { useState } from 'react';

export default function Painel() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState('');
  const [newPost, setNewPost] = useState('');
  const [newDate, setNewDate] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  function handleAddClient() {
    if (!newClient.trim()) return;
    setClients(prev => [...prev, { name: newClient, posts: [] }]);
    setNewClient('');
  }

  function handleAddPost() {
    if (!selectedClient || !newPost || !newDate) return;
    setClients(prev =>
      prev.map(client =>
        client.name === selectedClient
          ? {
              ...client,
              posts: [...client.posts, { title: newPost, date: newDate, status: 'em andamento' }]
            }
          : client
      )
    );
    setNewPost('');
    setNewDate('');
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Painel de Administração</h1>

      <div className="space-y-2">
        <h2 className="font-semibold">Cadastrar Cliente</h2>
        <input
          value={newClient}
          onChange={e => setNewClient(e.target.value)}
          placeholder="Nome do cliente"
          className="border p-2"
        />
        <button onClick={handleAddClient} className="bg-black text-white px-4 py-2 ml-2">
          Adicionar
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Adicionar Postagem</h2>
        <select
          value={selectedClient}
          onChange={e => setSelectedClient(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione um cliente</option>
          {clients.map(c => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>
        <br />
        <input
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          placeholder="Título do post"
          className="border p-2"
        />
        <input
          type="date"
          value={newDate}
          onChange={e => setNewDate(e.target.value)}
          className="border p-2 ml-2"
        />
        <button onClick={handleAddPost} className="bg-blue-600 text-white px-4 py-2 ml-2">
          Adicionar Postagem
        </button>
      </div>

      <div>
        <h2 className="font-semibold mt-6">Resumo</h2>
        {clients.map(client => (
          <div key={client.name} className="mt-2">
            <strong>{client.name}</strong>
            <ul className="ml-4 list-disc">
              {client.posts.map((p, i) => (
                <li key={i}>{p.title} – {p.date}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
