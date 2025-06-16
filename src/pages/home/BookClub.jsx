import { Users, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookClub = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Monthly Book Discussion",
      book: "The Seven Husbands of Evelyn Hugo",
      date: "Dec 15, 2024",
      time: "7:00 PM",
      participants: 24,
    },
    {
      id: 2,
      title: "Author Meet & Greet",
      book: "Virtual Session with Local Authors",
      date: "Dec 20, 2024",
      time: "6:30 PM",
      participants: 18,
    },
    {
      id: 3,
      title: "Reading Challenge Kickoff",
      book: "2025 Reading Goals Planning",
      date: "Jan 1, 2025",
      time: "12:00 PM",
      participants: 156,
    },
  ];
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Join Our Book Club</h2>
          <p className="text-lg">
            Connect with fellow readers and join exciting discussions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Book club info */}
          <div className="animate-fade-in">
            <div className="border border-primary rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">
                Why Join Our Community?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold  mb-1">
                      Connect with Readers
                    </h4>
                    <p className="">
                      Meet like-minded book enthusiasts and build lasting
                      friendships
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Engaging Discussions</h4>
                    <p className="">
                      Share insights, ask questions, and dive deep into your
                      favorite books
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold  mb-1">Regular Events</h4>
                    <p className="">
                      Participate in book discussions, author sessions, and
                      reading challenges
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-8 bg-primary hover:bg-green-700 text-white">
                Join Our Community
              </Button>
            </div>
          </div>

          {/* Right side - Upcoming events */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Upcoming Events</h3>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className=" border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      {event.participants}
                    </div>
                  </div>

                  <p className=" mb-3">{event.book}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {event.date} • {event.time}
                    </div>
                    <Button variant="outline" size="sm">
                      Join Event
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <Button variant="outline">View All Events</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClub;
