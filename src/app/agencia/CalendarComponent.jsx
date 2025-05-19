'use client';
import { Card, CardContent } from "@/components/ui/card";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarComponent({ allPosts }) {
  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-semibold mb-4">Calendário de Postagens</h2>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ start: "prev,next today", center: "title", end: "dayGridMonth,timeGridWeek" }}
          events={allPosts.map(post => ({
            title: `${post.client}: ${post.content}`,
            date: post.date
          }))}
          locale="pt-br"
          height="auto"
        />
      </CardContent>
    </Card>
  );
}
