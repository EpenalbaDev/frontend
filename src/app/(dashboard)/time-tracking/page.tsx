import { TimeTracker } from "@/components/time-tracking/TimeTracker";

export default function TimeTrackingPage() {
  return (
    <section className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Time Tracking</h1>
      <TimeTracker />
    </section>
  );
} 