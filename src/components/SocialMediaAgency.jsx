'use client';
import React, { useEffect } from 'react';

export default function SocialMediaAgency({ setClients }) {
  useEffect(() => {
    setClients([
      {
        name: "Cliente Exemplo",
        posts: [
          { title: "Post 1", status: "em andamento", date: "2024-05-21" },
          { title: "Post 2", status: "completo", date: "2024-05-23" }
        ],
        paymentDay: "10",
        paymentMethod: "PIX"
      }
    ]);
  }, [setClients]);

  return null;
}