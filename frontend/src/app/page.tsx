'use client';
import Link from 'next/link';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronDown,
  MapPin,
  Search,
  BookOpen,
  ClipboardList,
  FlaskConical,
  MessageSquare,
  Stethoscope,
  ShoppingCart,
  Menu,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';

const services = [
  { name: 'Consult with a doctor', icon: MessageSquare, href: '#' },
  { name: 'Order Medicines', icon: ShoppingCart, href: '#' },
  { name: 'View medical records', icon: ClipboardList, href: '#' },
  { name: 'Book test', icon: FlaskConical, href: '#', new: true },
  { name: 'Read articles', icon: BookOpen, href: '#' },
  { name: 'For healthcare providers', icon: Stethoscope, href: '#' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/doctors?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Logo className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl">DocFinder</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/doctors" className="text-gray-600  hover:text-primary  hover:border-b-2 hover:border-primary hover:pb-1">
                Find Doctors
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                Video Consult
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary">
                Surgeries
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary focus:outline-none">
                For Corporates <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Health Plans</DropdownMenuItem>
                <DropdownMenuItem>Wellness Programs</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary focus:outline-none">
                For Providers <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Practo Prime</DropdownMenuItem>
                <DropdownMenuItem>Software for providers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-primary focus:outline-none">
                Security & help <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Data security</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="rounded-md">Login / Signup</Button>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  <div className="border-b p-4">
                    <Link href="/" className="flex items-center gap-2 text-primary">
                      <Logo className="h-7 w-7 text-primary" />
                      <span className="font-bold text-xl">DocFinder</span>
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4 p-4">
                    <Link href="/doctors" className="text-lg font-medium text-primary">
                      Find Doctors
                    </Link>
                    <Link href="#" className="text-lg font-medium text-gray-600">
                      Video Consult
                    </Link>
                    <Link href="#" className="text-lg font-medium text-gray-600">
                      Surgeries
                    </Link>
                  </nav>
                  <div className="mt-auto border-t p-4">
                    <Button variant="outline" className="rounded-md w-full">Login / Signup</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative bg-primary text-white py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your home for health</h1>
            <p className="text-xl md:text-2xl mb-8">Find and Book</p>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row p-2">
              <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200">
                <MapPin className="h-5 w-5 mx-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Location"
                  defaultValue="Bangalore"
                  className="w-full h-12 border-none focus:ring-0 text-gray-800"
                  
                />
              </div>
              <div className="flex-1 flex items-center">
                <Search className="h-5 w-5 mx-3 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search doctors, clinics, hospitals, etc."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full h-12 border-none focus:ring-0 text-gray-800"
                />
              </div>
              <Button onClick={handleSearch} className="mt-2 md:mt-0 md:ml-2 h-12">
                Search
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm">
              <span className="font-semibold">Popular searches:</span>
              <Link href="#" className="hover:underline">Dermatologist</Link>
              <Link href="#" className="hover:underline">Pediatrician</Link>
              <Link href="#" className="hover:underline">Gynecologist/Obstetrician</Link>
              <Link href="#" className="hover:underline">Others</Link>
            </div>
          </div>
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "url('https://www.practo.com/fabric/images/fabric-sprite.23.11.2023.png')", backgroundPosition: '-10px -10px', backgroundRepeat: 'no-repeat' }}></div>
        </section>
      </main>

      <footer className="bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-y">
            {services.map((service) => (
              <Link key={service.name} href={service.href} className="flex flex-col items-center justify-center text-center p-4 h-32 hover:bg-blue-50 transition-colors duration-200">
                <div className="relative">
                  <service.icon className="h-8 w-8 text-primary" />
                  {service.new && (
                    <span className="absolute -top-2 -right-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700">{service.name}</span>
              </Link>
            ))}
          </div>
          <div className="py-6 text-center text-gray-500 text-sm">
            <p>Copyright &copy; {new Date().getFullYear()} Practo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
