'use client';
import React, { useState } from 'react';

export default function SocialMediaAgency() {
  const [clients, setClients] = useState([
    {
      name: "Cliente Exemplo",
      posts: [
        { title: "Post 1", status: "em andamento", date: "2024-05-01" },
        { title: "Post 2", status: "completo", date: "2024-05-05" }
      ],
      paymentDay: "10",
      paymentMethod: "PIX"
    }
  ]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Agência de Mídias</h1>
      <ul>
        {clients.map((client, index) => (
          <li key={index} className="mb-2 border-b pb-2">
            <strong>{client.name}</strong>
            <div className="text-sm">
              Dia de Pagamento: {client.paymentDay} <br />
              Método: {client.paymentMethod}
            </div>
            <ul className="ml-4 mt-2 list-disc">
              {client.posts.map((post, i) => (
                <li key={i}>
                  📌 {post.title} - {post.status} ({post.date})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}