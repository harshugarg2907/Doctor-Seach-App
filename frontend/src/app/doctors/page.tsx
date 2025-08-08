'use client';

import { DoctorSearchAndFilter } from '@/components/doctor-search-and-filter';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function DoctorsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Logo className="h-7 w-7 text-primary" />
            <span className="font-bold text-xl text-gray-800">DocFinder</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <DoctorSearchAndFilter searchQuery={searchQuery} />
      </main>
      <footer className="py-6 text-center text-muted-foreground text-sm border-t bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <p>&copy; {new Date().getFullYear()} Practo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
